import { Form } from './common/Form'; 
import { IContactForm } from '../types'; 
import { IEvents } from '../components/base/events';

export class ContactForm extends Form<IContactForm> {
    private _phoneInput: HTMLInputElement;
    private _emailInput: HTMLInputElement;

    constructor(container: HTMLFormElement, events: IEvents) {
      super(container, events);
      this._phoneInput = this.container.elements.namedItem('phone') as HTMLInputElement;
      this._emailInput = this.container.elements.namedItem('email') as HTMLInputElement;
    } 

    get phone(): string {
      return this._phoneInput.value;
    }

    set phone(value: string) {
      this._phoneInput.value = value;
    }

    get email(): string {
      return this._emailInput.value;
    }

    set email(value: string) {
      this._emailInput.value = value;
    }
}