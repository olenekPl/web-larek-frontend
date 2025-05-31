import { Product, OrderForm } from './index';

export interface ProductsResponse {
    total: number;
    items: Product[];
}

export interface OrderResponse {
    id: string;
    total: number;
}

//типы ошибок api
export interface ApiError {
    error: string;
}

//интерфейсы для api клиента
export interface IApiClient {
    getProducts(): Promise<ProductsResponse>;
    getProduct(id: string): Promise<Product>;
    createOrder(order: OrderForm): Promise<OrderResponse>;
}