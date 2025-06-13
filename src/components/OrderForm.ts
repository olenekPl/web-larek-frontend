import { IActions, IPaymentForm } from "../types";
import { ensureElement } from "../utils/utils";
import { IEvents } from "./base/events";
import { Form } from "./common/Form";

export default class Order extends Form<IPaymentForm> {
    protected _cardPaymentButton: HTMLButtonElement;
    protected _cashPaymentButton: HTMLButtonElement;

    constructor(container: HTMLFormElement, events: IEvents, actions?: IActions) {
        super(container, events);

        this._cardPaymentButton = ensureElement<HTMLButtonElement>('button[name="card"]', this.container);
        this._cashPaymentButton = ensureElement<HTMLButtonElement>('button[name="cash"]', this.container);
        this.toggleClass(this._cardPaymentButton, 'button_alt-active', true);

        if (actions?.onClick) {
            this.addButtonClickHandler(actions.onClick);
        }
    }

    private addButtonClickHandler(onClick?: (event: MouseEvent) => void) {
        if (onClick) {
            this._cardPaymentButton.addEventListener('click', onClick);
            this._cashPaymentButton.addEventListener('click', onClick);
        }
    }

    set address(value: string) {
        (this.container.elements.namedItem('address') as HTMLInputElement).value = value;
    }

    toggleButton(toggleOn: HTMLElement) {
        this.toggleClass(this._cardPaymentButton, 'button_alt-active', toggleOn === this._cardPaymentButton);
        this.toggleClass(this._cashPaymentButton, 'button_alt-active', toggleOn === this._cashPaymentButton);
    }
}