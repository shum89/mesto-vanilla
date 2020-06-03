const popupImage = document.querySelector('#popup-image');
const popupImagePhoto = popupImage.querySelector('.popup__photo');
const popupImageCaption = popupImage.querySelector('.popup__caption');

export class Card {
  constructor(data, cardSelector) {
    this._cardSelector = cardSelector;
    this._name = data.name;
    this._link = data.link;
  }
// получаем шаблон
  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);
    return cardElement;
  }

// тогглим лайк
  _toggleLike() {
    this._card.querySelector('.card__like').classList.toggle('card__like_active');
  }

// удаляем карточку
  _deleteCard() {
    this._card.remove();
  }

// отрисовываем попап с изображением
  _renderImagePopup() {
    const targetPhoto = this._card.querySelector('.card__photo');
    popupImagePhoto.src = targetPhoto.src;
    popupImageCaption.textContent = targetPhoto.alt;
    popupImageCaption.textContent = targetPhoto.alt;
    popupImage.classList.add('popup_opened');
  }

// закрываем по клику
  _addClick(evt) {
    if (evt.target.classList.contains('popup__overlay') || evt.target.classList.contains('popup__button-close')) {
      popupImage.classList.remove('popup_opened');
    }
  }

// закрываем по Esc
  _addEscClose(evt) {
    if (evt.key === 'Esc' || evt.key === ('Escape')) {
      popupImage.classList.remove('popup_opened');
    }
  }

// вешаем слушаетелей
  _setEventListeners() {
    document.addEventListener('keyup', (evt) => {
      this._addEscClose(evt);
    });
    popupImage.addEventListener('click', (evt) => { this._addClick(evt); });
    this._card.querySelector('.card__like').addEventListener('click', () => { this._toggleLike(); });
    this._card.querySelector('.card__delete-button').addEventListener('click', () => { this._deleteCard(); });
    this._card.querySelector('.card__photo').addEventListener('click', () => { this._renderImagePopup(); });
  }
  
// создаем карточку
  createCard() {
    this._card = this._getTemplate();
    this._setEventListeners();
    const cardPhoto = this._card.querySelector('.card__photo');
    const cardTitle = this._card.querySelector('.card__title');
    cardPhoto.alt = this._name;
    cardPhoto.src = this._link;
    cardTitle.textContent = this._name;
    return this._card;
  }
}
