//настройки отображения карточки товара в каталоге
export interface CatalogCardSettings {
    categoryClass: string; //например: "card__category_soft", "card__category_other"
    titleClass: string; //"card__title"
    imageClass: string; //"card__image"
    priceClass: string; //"card__price"
    buttonClass: string; //"button"
    compactMode: boolean; 
}

//настройки детального просмотра товара
export interface ProductDetailsSettings {
    fullCardClass: string; //"card card_full"
    columnClass: string; //"card__column"
    rowClass: string; //"card__row"
    textClass: string; //"card__text"
    buttonText: string; //"в корзину" или "убрать"
    pricePrefix: string; //"синапсы" 
}

//настройки корзины
export interface BasketSettings {
    itemClass: string; //"basket__item card card_compact"
    indexClass: string; //"basket__item-index"
    deleteButtonClass: string; //"basket__item-delete"
    priceClass: string; //"basket__price"
    checkoutButtonText: string; //"оформить"
    emptyBasketText: string; //текст при пустой корзине
}

//настройки оформления заказа
export interface OrderSettings {
    formClass: string; //"form"
    fieldClass: string; //"order__field"
    inputClass: string; //"form__input"
    labelClass: string; //"form__label"
    buttonClasses: {
        primary: string; //"button"
        secondary: string; //"button button_alt"
    };
    paymentMethods: {
        online: string; //"онлайн"
        onDelivery: string; //при получении"
    };
    errorClass: string; //"form__errors"
}

//настройки успешного заказа
export interface OrderSuccessSettings {
    titleClass: string; //"order-success__title"
    descriptionClass: string; //"order-success__description"
    buttonClass: string; //"button order-success__close"
    buttonText: string; //"за новыми покупками!"
}

//настройки модальных окон
export interface ModalSettings {
    containerClass: string; //"modal__container"
    contentClass: string; //"modal__content"
    closeButtonClass: string; //"modal__close"
    titleClass: string; //"modal__title"
    actionsClass: string; //"modal__actions"
}

//главный интерфейс настроек отображения
export interface DisplaySettings {
    catalogCard: CatalogCardSettings;
    productDetails: ProductDetailsSettings;
    basket: BasketSettings;
    order: OrderSettings;
    orderSuccess: OrderSuccessSettings;
    modal: ModalSettings;
}