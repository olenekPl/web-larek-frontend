import { EventEmitter } from './components/base/events';
import './scss/styles.scss';
import { cloneTemplate, ensureElement } from './utils/utils';

import AppState, { CatalogChangeEvent } from './components/AppState';
import Basket from './components/Basket';
import Card from './components/Card';
import { ContactForm } from './components/ContactForm';
import Order from './components/OrderForm';
import Page from './components/Page';
import Product from './components/Product';
import ShopApi from './components/ShopApi';
import Modal from './components/common/Modal';
import Success from './components/Success';

import { IContactForm, IPaymentForm } from './types';
import { API_URL, CDN_URL, PaymentTypes } from './utils/constants';

//для взаимодействия с сервером
const api = new ShopApi(CDN_URL, API_URL);
const events = new EventEmitter();

//отладка
events.onAll(({eventName, data}) => {
    console.log(eventName, data);
})

const successTemplate = ensureElement<HTMLTemplateElement>('#success');
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const previewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const appState = new AppState({}, events);
const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

const basket = new Basket(cloneTemplate(basketTemplate), events);
const order = new Order(cloneTemplate(orderTemplate), events, {
    onClick: (ev: Event) => events.emit('payment:toggle', ev.target)
  });
const contactForm = new ContactForm(cloneTemplate(contactsTemplate), events);

//изменение каталога
events.on<CatalogChangeEvent>('items:change', () => {
  const newGalleryItems = appState.catalog.map(currentItem => {
    const cardInstance = new Card(cloneTemplate(cardCatalogTemplate), {
      onClick: () => events.emit('card:select', currentItem)
    });
    return cardInstance.render({
      title: currentItem.title,
      image: currentItem.image,
      price: currentItem.price,
      category: currentItem.category
    });
  });
  page.gallery = newGalleryItems;
});

//получение товаров с сервера
function getItems() {
    api.getItemList()
    .then((catalog) => {
        appState.setCatalog(catalog);
    })
    .catch((err) => {
        console.error(err)
    })
}

getItems();

//блокировка прокрутки страницы при открытой модалки
function blockModal() {
    page.locked = true;
}

//разблокировка
function unblockModal() {
    page.locked = false;
}

events.on('modal:open', blockModal);
events.on('modal:close', unblockModal);

//изменение выбранного товара
const handlePreviewChanged = (item: Product) => {
    const card = new Card(cloneTemplate(previewTemplate), {
      onClick: () => {
        events.emit('product:toggle', item);
        card.buttonText = (appState.basket.indexOf(item) < 0) ? 'В корзину' : 'Удалить из корзины'
      }
    });

    const buttonText = (appState.basket.indexOf(item) < 0) ? 'В корзину' : 'Удалить из корзины';

    card.buttonText = buttonText;

    //карточка товара в модалке
    modal.render({
      content: card.render({
        title: item.title,
        description: item.description,
        image: item.image,
        price: item.price,
        category: item.category,
        buttonTitle: buttonText
      })
    })
};

events.on('card:select', handlePreviewChanged);

//открытие корзины
events.on('cart:open', () => {
    modal.render({
        content: basket.render({})
    })
});

//добавление или удаление товара в корзине
events.on('product:toggle', (item: Product) => {
    if (appState.basket.indexOf(item) < 0) {
        events.emit('product:add', item);
    }
    else {
        events.emit('product:delete', item);
    }
});
  
events.on('product:add', (item: Product) => {
    appState.handleBasketAction('add', item);
});
  
events.on('product:delete', (item: Product) => {
    appState.handleBasketAction('remove', item)
});

//отображение корзины при изменениях
events.on('cart:changed', (items: Product[]) => {
    basket.items = items.map((item, index) => {
        const card = new Card(cloneTemplate(cardBasketTemplate), {
            onClick: () => {
                events.emit('product:delete', item);
        }
    });
    return card.render({
        index: (index + 1).toString(),
        title: item.title,
        price: item.price,
    });
    });
  
    //пересчет суммы
    const total = items.reduce((total, item) => total + item.price, 0);
    basket.total = total;
    appState.order.total = total;
    basket.toggleButton(total === 0);
});

//счетчик товаров
events.on('counter:changed', (item: string[]) => {
    page.counter = appState.basket.length;
});

//открытие формы с контактами
events.on('contact:open', () => {
    modal.render({
        content: contactForm.render({
            email: '',
            phone: '',
            valid: false,
            errors: []
        })
    });
})

//открытие формы заказа
events.on('order:open', () => {
    modal.render({
        content: order.render({
            address: '',
            payment: '',
            valid: false,
            errors: []
        })
    });
})

//обработка ошибок валидации заказа
events.on('orderErrors:change', ({ payment, address }: Partial<IPaymentForm>) => {
  order.valid = !(payment || address);
  order.errors = Object.values({ payment, address }).filter(Boolean).join('; ');
});

//обработка ошибок валидации контактной формы
events.on('formErrors:change', ({ email, phone }: Partial<IContactForm>) => {
  contactForm.valid = !(email || phone);
  contactForm.errors = Object.values({ email, phone }).filter(Boolean).join('; ');
});

//обработка изменения полей заказа
events.on(/^order\..*:change/, (data: { field: keyof IPaymentForm, value: string }) => {
    appState.setOrderForm(data.field, data.value)
})

//обработка изменения полей контактов
events.on(/^contacts\..*:change/, (data: { field: keyof IContactForm, value: string }) => {
    appState.setContactForm(data.field, data.value)
})

//обновление превью при изменениях
events.on('preview:changed', handlePreviewChanged);

//когда заказ готов к отправке
events.on('order:ready', () => {
    order.valid = true;
})
  
//когда котнактная форма готова к отправке
events.on('contact:ready', () => {
    contactForm.valid = true;
})

//обработка отправки формы заказа
events.on('contacts:submit', handleOrderSubmit);

//отправка заказа на сервер
function handleOrderSubmit() {
    api.orderItems(appState.order)
    .then((result) => {
        appState.clearBasket();
        appState.clearOrder();
        const success = new Success(cloneTemplate(successTemplate), {
          onClick: () => {
            modal.close();
          }
        });
        success.description = result.total.toString();
  
        modal.render({
          content: success.render({})
        });
      })
    .catch(err => {
        console.error(err);
    });
}

//переключение режима оплаты
events.on('payment:toggle', (target: HTMLElement) => {
    if (!target.classList.contains('button_alt-active')) {
      order.toggleButton(target);
      appState.order.payment = PaymentTypes[target.getAttribute('name')];
      console.log(appState.order)
    }
});

//открытие формы заказа
events.on('order:open', () => {
    modal.render({
      content: order.render({
        payment: '',
        address: '',
        valid: false,
        errors: []
      })
    });
    appState.order.items = appState.basket.map(item => item.id);
});
  
//финальная отправка заказа
events.on('order:submit', () => {
    events.emit('contact:open')
});