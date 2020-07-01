// элементы валидации формы
export const formValidationElements = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error',
};

// элементы Popup
export const popupElements = {
  popupSelector: '.popup',
  popupEditSelector: '#popup-edit',
  popupAddCardSelector: '#popup-add-card',
  popupImageSelector: '#popup-image',
  popupDeleteSelector: '#popup-delete',
  popupUpdateAvatarSelector: '#popup-avatar',
  inputTitleSelector: '#input-title',
  inputSubtitleSelector: '#input-subtitle',
  popupButtonSubmitSelector: '.popup__button-submit',
  popupButtonSubmitLoading: 'popup__button-submit_loading',
  popupPhotoSelector: '.popup__photo',
  popupCaptionSelector: '.popup__caption',
  formSelector: '.popup__form',
  popupOpenClass: 'popup_opened',
  popupOverlayClass: 'popup__overlay',
  popupButtonCloseClass: 'popup__button-close',
  inputSelector: '.popup__input',
};

// элементы профайла
export const profileElements = {
  userNameSelector: '.profile__title',
  userOccupationSelector: '.profile__subtitle',
  editButtonSelector: '.profile__edit-button',
  addButtonSelector: '.profile__add-button',
  userAvatarImageSelector: '.profile__avatar-image',
  userAvatarSelector: '.profile__avatar',
};

// элементы карточек
export const cardElements = {
  cardSelector: '#card',
  cardSectionSelector: '.cards',
  cardElementSelector: '.card',
  cardLikeSelector: '.card__like',
  cardDeleteButtonSelector: '.card__delete-button',
  cardPhotoSelector: '.card__photo',
  cardTitleSelector: '.card__title',
  cardLikeActiveClass: 'card__like_active',
  cardLikeCounter: '.card__like-counter',
};

// попапы
export const addCardPopup = document.querySelector(popupElements.popupAddCardSelector);
export const editProfilePopup = document.querySelector(popupElements.popupEditSelector);
export const  editPopupAvatar = document.querySelector(popupElements.popupUpdateAvatarSelector);

// инпуты попапа с карточками и редактирования профайла
export const addCardPlace = addCardPopup.querySelector(popupElements.inputTitleSelector);
export const addCardLink = addCardPopup.querySelector(popupElements.inputSubtitleSelector);
export const editPopupName = editProfilePopup.querySelector(popupElements.inputTitleSelector);
export const editPopupOccupation = editProfilePopup.querySelector(popupElements.inputSubtitleSelector);
export const editButton = document.querySelector(profileElements.editButtonSelector);
export const addButton = document.querySelector(profileElements.addButtonSelector);
export const editAvatarInput = editPopupAvatar.querySelector(popupElements.inputTitleSelector);
export const avatar = document.querySelector(profileElements.userAvatarSelector);

// пути для аpi
export const urlPath = {
  userInfo: 'users/me/',
  cards: 'cards/',
  avatar: 'avatar',
  likes: 'likes/',
}
// ссылка
export const baseUrl = 'https://mesto.nomoreparties.co/v1/cohort-12/';

// headers с токеном
export const headers = {
  authorization: 'd2854785-f942-4a21-9d80-03fbc6fb281b',
      'Content-Type': 'application/json',
};