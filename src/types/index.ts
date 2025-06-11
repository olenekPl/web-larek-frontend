 //типы для товара
 export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
}

//мод окно способ оплаты
export interface IPaymentForm {
    payment: string;
    address: string;
}

//мод окно эмеил
export interface IContactForm {
    email: string;
    phone: string;
}

//форма заказа
export interface IOrder extends IPaymentForm, IContactForm {
    total: number;
    items: string[];
}

//типы для корзины
export interface ICart {
    items: HTMLElement[]; //список товаров в корзине
    total: number; //получившаяся сумма
}

//главная страница
export interface IAppState {
    catalog: IProduct[];
    cart: string[];
    preview: string | null; //предпросмотр
    order: IOrder | null;
    loading: boolean; //загрузка
}

//результат оформления заказа
export interface IOrderResult {
    id: string;
    total: number;
}

//ошибка в форме
export type FormErrors = Partial<Record<keyof IOrder, string>>;

//карточка
export interface ICards extends IProduct {
    index?: string;
    buttonTitle?: string;
}

//главная страница
export interface IPage {
    counter: number; //счетчик
    gallery: HTMLElement[];
}

//данные событий
export interface IActions {
    onClick: (event: MouseEvent) => void; //событие по клику
}