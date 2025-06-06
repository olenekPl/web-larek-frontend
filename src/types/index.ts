//типы для товара
export interface IProduct {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  price: number | null;
}

//массив товаров с сервера (приходят)
export interface IProductList {
  total: number;
  items: IProduct[];
}

//типы для корзины
export interface ICartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
}

//типы для оформления заказа
export enum PaymentMethod {
  Online = 'online',
  OnDelivery = 'onDelivery'
}

//форма заказа
export interface IOrderForm {
  payment: PaymentMethod;
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
}

//мод окно способ оплаты
export type IPaymentForm = Pick<IOrderForm, 'payment' | 'address'>;

//мод окно эмеил
export type IContactForm = Pick<IOrderForm, 'email' | 'phone'>;

//результат оформления заказа
export interface IOrderResult {
  id: string;
  total: number;
}

//главная страница
export interface IAppState {
	catalog: IProduct[]; 
	order: IOrderForm | null;
	cart: ICartItem;	
}

//ошибка в форме
export type FormErrors = Partial<Record<keyof IOrderForm, string>>;