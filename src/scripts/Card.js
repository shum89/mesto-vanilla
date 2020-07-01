import { cardElements } from '../constants/constants.js';

export class Card {
  constructor({ data, handleCardClick, handleDeleteClick, handleCardLike }, cardSelector, userId) {
    this._data = data;
    this._cardId = data._id;
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._cardSelector = cardSelector;
    this._likes = data.likes;
    this._name = data.name;
    this._link = data.link;
    this._handleLike = handleCardLike;
    this._hanldeCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  // получаем шаблон
  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector(cardElements.cardElementSelector).cloneNode(true);
    return cardElement;
  }
  // получаем элементы
_getCardElements () {
  this._likeCounterElement = this._element.querySelector(cardElements.cardLikeCounter);
  this._deleteCardElement = this._element.querySelector(cardElements.cardDeleteButtonSelector);
  this._cardPhoto = this._element.querySelector(cardElements.cardPhotoSelector);
  this._cardTitle = this._element.querySelector(cardElements.cardTitleSelector);
  this._likeElement = this._element.querySelector(cardElements.cardLikeSelector)
}

// устанавливаем иконку удаления
  _setDeleteIcon  () {
    if(this._ownerId !== this._userId) {
       this._deleteCardElement.remove();
       this._deleteCardElement = null;

    }
  }
// получить количество лайков
  _getLikesCount () {
    this._likeCounterElement.textContent = this._likes.length;
  }

  // тогглим лайк, получаем айди карточки, проверяем поставил пользователь лайк
  _toggleLike() {
    this._handleLike(this._cardId, (this._likes.some(item => item._id === this._userId))).then((result) => {
      this._likes = result.likes;
      this._likeCounterElement.textContent = this._likes.length;
      this._likeElement.classList.toggle(cardElements.cardLikeActiveClass);
    }).catch((err) => console.log(err))
  }

// проверяем поставил пользователь лайк
  _setUserLikes () {
   if (this._likes.some(item => item._id === this._userId)) {
     this._likeElement.classList.add(cardElements.cardLikeActiveClass);
   }
  }

  // удаляем карточку
  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  // вешаем слушаетелей
  _setEventListeners() {
    this._likeElement.addEventListener('click', () => this._toggleLike());
    this._deleteCardElement.addEventListener('click', () => { this._handleDeleteClick({
      id: this._cardId,
      deleteCard: this._deleteCard.bind(this),
    })});
    this._cardPhoto.addEventListener('click', () => { this._hanldeCardClick(this._data);});
  }

  // создаем карточку
  createCard() {
    this._element = this._getTemplate();
    this._getCardElements();
    this._setEventListeners();
     this._setDeleteIcon();
     this._getLikesCount();
     this._setUserLikes();
    this._cardPhoto.alt = this._name;
    this._cardPhoto.src = this._link;
    this._cardTitle.textContent = this._name;
    return this._element;
  }
}