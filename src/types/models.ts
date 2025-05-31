import { Product, CartItem, OrderForm } from './index';
import { OrderResponse } from './api';

//интерфейсы для моделей
export interface IProductModel {
    getProducts(): Promise<Product[]>;
    getProduct(id: string): Promise<Product>;
}

export interface ICartModel {
    items: CartItem[];
    addItem(product: Product): void;
    removeItem(id: string): void;
    clearCart(): void;
    getTotal(): number;
    getItems(): CartItem[];
}

export interface IOrderModel {
    createOrder(order: OrderForm): Promise<OrderResponse>;
}