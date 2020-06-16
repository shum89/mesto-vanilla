import { popupElements } from '../constants/constants.js';

export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
  }

  // закрываем Попап
  close() {
    this._popupSelector.classList.remove(popupElements.popupOpenClass);
  }

  // закрываем по Esc
  _handleEscClose(evt) {
    if (evt.key === 'Esc' || evt.key === ('Escape')) {
      this.close();
    }
  }

  // закрываем по клику
  _handleClickClose(evt) {
    if (evt.target.classList.contains(popupElements.popupButtonCloseClass) || evt.target.classList.contains(popupElements.popupOverlayClass)) {
      this.close();
    }
  }

  // устанавливаем слушателей
  _setEventListeners() {
    document.addEventListener('keyup', (evt) => {
      this._handleEscClose(evt);
    });
    this._popupSelector.addEventListener('click', (evt) => {
      this._handleClickClose(evt);
    });
  }

  // открываем попап
  open() {
    this._setEventListeners();
    this._popupSelector.classList.add(popupElements.popupOpenClass);
  }
}
