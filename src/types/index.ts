//типы для товара
export interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  price: number | null;
}

//типы для корзины
export interface CartItem {
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

export interface OrderForm {
  payment: PaymentMethod;
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
}