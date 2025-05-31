import { OrderResponse } from './api';
import { CartItem, Product } from './index';

export enum EventTypes {
    CartUpdated = 'cart:updated',
    OrderCreated = 'order:created',
    ProductSelected = 'product:selected',
    ModalOpen = 'modal:open',
    ModalClose = 'modal:close'
}

export interface EventMap {
    [EventTypes.CartUpdated]: { items: CartItem[] };
    [EventTypes.OrderCreated]: { order: OrderResponse };
    [EventTypes.ProductSelected]: { product: Product };
    [EventTypes.ModalOpen]: { content: HTMLElement };
    [EventTypes.ModalClose]: void;
}

export interface IEventEmitter {
    on<T extends EventTypes>(event: T, callback: (payload: EventMap[T]) => void): void;
    emit<T extends EventTypes>(event: T, payload: EventMap[T]): void;
}