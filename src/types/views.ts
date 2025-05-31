import { Product, PaymentMethod } from './index';

//интерфейсы для отображений
export interface IView {
    render(): HTMLElement;
}

export interface IProductView extends IView {
    onAddToCart: (product: Product) => void;
    onOpenDetails: (product: Product) => void;
}

export interface ICartView extends IView {
    onCheckout: () => void;
    onRemoveItem: (id: string) => void;
}

export interface ICheckoutView extends IView {
    onPaymentMethodSelect: (method: PaymentMethod) => void;
    onDeliveryInfoSubmit: (address: string) => void;
    onCustomerInfoSubmit: (email: string, phone: string) => void;
    onPay: () => void;
}

export interface IModalView extends IView {
    onClose: () => void;
}

//типы для карточки товара в каталоге
export interface ProductCardView {
    id: string;
    title: string;
    category: string;
    image: string;
    price: string;
    isInCart: boolean;
    onAddToCart: () => void;
    onOpenDetails: () => void;
}

//типы для детального просмотра товара
export interface ProductDetailsView {
    id: string;
    title: string;
    description: string;
    image: string;
    category: string;
    price: string;
    isInCart: boolean;
    buttonText: string;
    onCartAction: () => void;
    onClose: () => void;
}

//типы для корзины
export interface CartView {
    items: {
        id: string;
        title: string;
        price: string;
        quantity: number;
        total: string;
        onRemove: () => void;
        onQuantityChange: (newQuantity: number) => void;
    }[];
    total: string;
    isEmpty: boolean;
    onCheckout: () => void;
    onClose: () => void;
}

//типы для оформления заказа
export interface CheckoutStepView {
    step: 'address' | 'contacts' | 'confirmation';
    paymentMethod?: PaymentMethod;
    address?: string;
    email?: string;
    phone?: string;
    isValid: boolean;
    errors: Record<string, string>;
    onChange: (field: string, value: string) => void;
    onNext: () => void;
    onBack: () => void;
    onSubmit: () => void;
}

//типы для успешного заказа
export interface OrderSuccessView {
    orderId: string;
    total: string;
    onClose: () => void;
}

//типы для модальных окон
export interface ModalView {
    title: string;
    content: HTMLElement;
    onClose: () => void;
}