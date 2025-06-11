import { ICart } from "../types";
import { createElement, ensureElement } from "../utils/utils";
import { Component } from "./base/Component";
import { EventEmitter } from "./base/events";

export default class Basket extends Component<ICart> {
    protected _list: HTMLElement;
    protected _total: HTMLElement;
    protected _button: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: EventEmitter) {
        super(container);

        this._list = ensureElement<HTMLElement>('.basket__list', this.container);
        this._total = this.container.querySelector('.basket__price');
        this._button = this.container.querySelector('.basket__button');

        if (this._button) {
            this._button.addEventListener('click', () => {
                events.emit('order:open');
            });
        }

        this.items = [];
        this.toggleButton(true)
    }

    //включает или выключает кнопку
    toggleButton(isDisabled: boolean){
        if (this._button) {
          this._button.disabled = isDisabled;
        }
    }
  
    //обновляет содержимое списка товаров в корзине
    set items(items: HTMLElement[]) {
        if (items.length) {
            this._list.replaceChildren(...items);
        } else {
            this._list.replaceChildren(createElement<HTMLParagraphElement>('p', {
                textContent: 'Корзина пуста'
            }));
        }
    }

    //обновляет отображение суммы
    set total(total: number) {
        this.setText(this._total, `${total.toString()} синапсов`)
    }
}