import { popupElements } from '../constants/constants.js';

export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleClickClose = (evt) => {
      this._clickClose(evt);
    };
    this._handleEscClose = (evt) => {
      this._escClose(evt);
    };
  }

  // закрываем Попап
  close() {
    this._removeEvents();
    this._popup.classList.remove(popupElements.popupOpenClass);
  }

  // закрываем по Esc
  _escClose(evt) {
    if (evt.key === 'Esc' || evt.key === ('Escape')) {
      this.close();
    }
  }

  // закрываем по клику
  _clickClose(evt) {
    if (evt.target.classList.contains(popupElements.popupButtonCloseClass) || evt.target.classList.contains(popupElements.popupOverlayClass)) {
      this.close();
    }
  }

  // устанавливаем слушателей
  _setEventListeners() {
    document.addEventListener('keyup', this._handleEscClose);
    this._popup.addEventListener('click', this._handleClickClose);
  }

  _removeEvents () {
    document.removeEventListener('keyup', this._handleEscClose);
    this._popup.removeEventListener('click', this._handleClickClose);
  }

  // открываем попап
  open() {
    this._setEventListeners();
    this._popup.classList.add(popupElements.popupOpenClass);
  }
}
