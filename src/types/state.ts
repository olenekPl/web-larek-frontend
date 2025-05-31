import { Product, CartItem, OrderForm, PaymentMethod } from './index';
import { OrderResponse } from './api';

export interface AppState {
    products?: Product[];
    selectedProduct?: Product;
    cartItems: CartItem[];
    cartTotal: number;
    isCartOpen: boolean;
    orderForm: OrderForm;
    currentOrderStep: 'address' | 'contacts' | 'confirmation';
    orderResponse?: OrderResponse;
    openedModal: 'product' | 'cart' | 'order' | null;
    isOrderReady: boolean;
    validationError: string | null;
    
    loadProducts(): Promise<void>;
    selectProduct(id: string): void;
    addToCart(product: Product): void;
    removeFromCart(id: string): void;
    updateCartItem(id: string, quantity: number): void;
    openModal(modal: 'product' | 'cart' | 'order'): void;
    closeModal(): void;
    updateOrderForm(field: keyof OrderForm, value: string | number | string[]): void;
    setPaymentMethod(method: PaymentMethod): void;
    submitOrder(): Promise<void>;
    resetOrder(): void;
}