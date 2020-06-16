// элементы валидации формы
export const formValidationElements = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error',
  errorSelector: '.popup__input-error',
};

// элементы Popup
export const popupElements = {
  popupSelector: '.popup',
  popupEditSelector: '#popup-edit',
  popupAddCardSelector: '#popup-add-card',
  popupImageSelector: '#popup-image',
  inputTitleSelector: '#input-title',
  inputSubtitleSelector: '#input-subtitle',
  popupButtonSubmitSelector: '.popup__button-submit',
  popupPhotoSelector: '.popup__photo',
  popupCaptionSelector: '.popup__caption',
  formSelector: '.popup__form',
  popupOpenClass: 'popup_opened',
  popupOverlayClass: 'popup__overlay',
  popupButtonCloseClass: 'popup__button-close',
 
};

// элементы профайла
export const profileElements = {
  userNameSelector: '.profile__title',
  userOccupationSelector: '.profile__subtitle',
  editButtonSelector: '.profile__edit-button',
  addButtonSelector: '.profile__add-button',
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
};

const addCardPopup = document.querySelector(popupElements.popupAddCardSelector);
const editProfilePopup = document.querySelector(popupElements.popupEditSelector);

// инпуты попапа с карточками и редактирования профайла
export const addCardPlace = addCardPopup.querySelector(popupElements.inputTitleSelector);
export const addCardLink = addCardPopup.querySelector(popupElements.inputSubtitleSelector);
export const editPopupName = editProfilePopup.querySelector(popupElements.inputTitleSelector);
export const editPopupOccupation = editProfilePopup.querySelector(popupElements.inputSubtitleSelector);
export const editButton = document.querySelector(profileElements.editButtonSelector);
export const addButton = document.querySelector(profileElements.addButtonSelector);

// массивы попапов и форм
export const popupArray = Array.from(document.querySelectorAll(popupElements.popup));
export const popupFormArray = Array.from(document.querySelectorAll(popupElements.formSelector));


// массив с карточками, которые загружаются по умолчанию
export const initialCards = [
  {
    name: 'Архыз',
    link:
        'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link:
        'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link:
        'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link:
        'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link:
        'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link:
        'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];
