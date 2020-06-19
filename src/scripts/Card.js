
import { cardElements } from '../constants/constants.js';

export class Card {
  constructor({ data, handleCardClick }, cardSelector) {
    this._data = data;
    this._cardSelector = cardSelector;
    this._name = data.name;
    this._link = data.link;
    this._hanldeCardClick = handleCardClick;
  }

  // получаем шаблон
  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector(cardElements.cardElementSelector).cloneNode(true);
    return cardElement;
  }

  // тогглим лайк
  _toggleLike() {
    this._element.querySelector(cardElements.cardLikeSelector).classList.toggle(cardElements.cardLikeActiveClass);
  }

  // удаляем карточку
  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  // вешаем слушаетелей
  _setEventListeners() {
    this._element.querySelector(cardElements.cardLikeSelector).addEventListener('click', () => { this._toggleLike(); });
    this._element.querySelector(cardElements.cardDeleteButtonSelector).addEventListener('click', () => { this._deleteCard(); });
    this._element.querySelector(cardElements.cardPhotoSelector).addEventListener('click', () => { this._hanldeCardClick(this._data);});
  }

  // создаем карточку
  createCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    const cardPhoto = this._element.querySelector(cardElements.cardPhotoSelector);
    const cardTitle = this._element.querySelector(cardElements.cardTitleSelector);
    cardPhoto.alt = this._name;
    cardPhoto.src = this._link;
    cardTitle.textContent = this._name;
    return this._element;
  }
}
