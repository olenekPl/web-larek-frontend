import { FormErrors, IAppState, IContactForm, IOrder, IPaymentForm, IProduct } from "../types";
import Product from "./Product";
import { Model } from "./base/Model";
import Card from "./Card";

export type CatalogChangeEvent = {
    catalog: IProduct[];
}

export default class AppState extends Model<IAppState> {
    basket: Product[] = [];
    catalog: Product[];
    loading: boolean;
    order: IOrder = {
        payment: 'online',
        address: '',
        email: '',
        phone: '',
        total: 0,
        items: []
    };
    preview: string | null;
    formErrors: FormErrors = {};
    currentCard: Card | null = null;

    //обновляет состояние корзины и вызывает события для обновления счетчика или отображения корзины
    refreshBasket() {
        this.emitChanges('counter:changed', this.basket);
        this.emitChanges('cart:changed', this.basket);
    }

    //очищает корзину и обновляет состояние
    clearBasket() {
        this.basket = [];
        this.refreshBasket();
    }

    //сбрасывает данные заказа в начальное состояние
    clearOrder() {
        this.order = {
            payment: 'online',
            address: '',
            email: '',
            phone: '',
            total: 0,
            items: []
        }
    }

    //устанавливает каталог товаров, преобразуя их в объекты Product и уведомляя об изменениях
    setCatalog(items: IProduct[]) {
        this.catalog = items.map(item => new Product(item, this.events));
        this.emitChanges('items:change', {catalog: this.catalog})
    }

    //устанавливает текущий предпросмотр товара
    setPreview(item: Product) {
        this.preview = item.id;
        this.emitChanges('preview:changed');
    }

    //обновляет поле формы контакта и валидирует его, вызывая событие при успешной проверке
    setContactForm(field: keyof IContactForm, value: string) {
        this.order[field] = value;
        if (this.validateContactForm()) {
            this.events.emit('contact:ready', this.order);
        }
    }

    //обновляет поле формы заказа, валидирует и вызывает событие
    setOrderForm(field: keyof IPaymentForm, value: string) {
        this.order[field] = value;
        if (this.validateOrderForm()) {
            this.events.emit('order:ready', this.order);
        }
    }

    //валидирует контактные данные
    validateContactForm() {
        const errors: typeof this.formErrors = {};
        if (!this.order.email) {
            errors.email = 'Необходимо указать email';
        }
        if (!this.order.phone) {
            errors.phone = 'Необходимо указать телефон';
        }
        this.formErrors = errors;
        this.events.emit('formErrors:change', this.formErrors);
        return Object.keys(errors).length === 0;
    }
    
    //валидирует форму заказа
    validateOrderForm() {
        const errors: typeof this.formErrors = {};
        if (!this.order.address) {
            errors.address = 'Необходимо указать адрес доставки';
        }
        this.formErrors = errors;
        this.events.emit('orderErrors:change', this.formErrors);
        return Object.keys(errors).length === 0;
    }

    //добавляет или удаляет товар из корзины и обновляет состояние
    handleBasketAction(action: string, item: Product): void {
    switch (action) {
        case 'add':
            if (!this.basket.includes(item)) {
            this.basket.push(item);
            }
            break;
        case 'remove':
            this.basket = this.basket.filter(el => el !== item);
            break;
        default:
            break;
        }
        this.refreshBasket();
    }
}