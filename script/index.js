import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const formValidationElements = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error',
};

const popupArray = Array.from(document.querySelectorAll('.popup'));
const popupFormArray = Array.from(document.querySelectorAll('.popup__form'));

// элементы popup-profile
const popupEditProfile = document.querySelector('#popup-edit');
const popupEditProfileContainer = popupEditProfile.querySelector(
  '.popup__container',
);
const popupEditProfileForm = popupEditProfileContainer.querySelector(
  '.popup__form',
);
const popupEditProfileInputTitle = popupEditProfileContainer.querySelector(
  '#input-title',
);
const popupEditProfileInputSubtitle = popupEditProfileContainer.querySelector(
  '#input-subtitle',
);
const popupEditProfileButtonClose = popupEditProfile.querySelector(
  '.popup__button-close',
);

// элементы popupAddCard
const popupAddCard = document.querySelector('#popup-add-card');
const popupAddCardContainer = popupAddCard.querySelector('.popup__container');
const popupAddCardForm = popupAddCardContainer.querySelector('.popup__form');
const popupAddCardInputTitle = popupAddCardContainer.querySelector(
  '#input-title',
);
const popupAddCardInputSubtitle = popupAddCardContainer.querySelector(
  '#input-subtitle',
);
const popupAddCardButtonClose = popupAddCard.querySelector(
  '.popup__button-close',
);

// элементы секции  profile
const profile = document.querySelector('.profile');
const profileTitle = profile.querySelector('.profile__title');
const profileSubtitle = profile.querySelector('.profile__subtitle');
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');

// cекция с карточками
const cardSection = document.querySelector('.cards');

// массив с карточками, которые загружаются по умолчанию
const initialCards = [
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


const resetPopupError = (formElement) => {
  const inputErrorElements = Array.from(formElement.querySelectorAll(`.${formValidationElements.errorClass}`));
  inputErrorElements.forEach((errorElement) => {
    errorElement.textContent = '';
  });
  const inputElements = Array.from(formElement.querySelectorAll(formValidationElements.inputSelector));
  inputElements.forEach((inputElement) => {
    inputElement.classList.remove(formValidationElements.inputErrorClass);
  });
};


const resetButtonState = (formElement) => {
  const submitButton = formElement.querySelector(formValidationElements.submitButtonSelector);
  submitButton.disabled = true;
  submitButton.classList.add(formValidationElements.inactiveButtonClass);
};

// включаем валидацию
const enableValidation = (validationElements, formSelector) => {
  const addCardValidation = new FormValidator(validationElements, formSelector);
  return addCardValidation.enableValidation();
};

// отрисовываем popup редактирования профиля
const renderEditProfilePopup = () => {
  popupEditProfileInputTitle.value = profileTitle.textContent;
  popupEditProfileInputSubtitle.value = profileSubtitle.textContent;
  resetPopupError(popupEditProfileForm);
  resetButtonState(popupEditProfile);
};

const renderAddCardPopup = () => {
  popupAddCardForm.reset();
  resetPopupError(popupAddCardForm);
  resetButtonState(popupAddCardForm);
};
// поменять класс у popup
const togglePopup = (popup) => {
  popup.classList.toggle('popup_opened');
};

// закрытие  по Esc
const addEsc = (evt) => {
  if (evt.key === 'Esc' || evt.key === 'Escape') {
    popupArray.forEach((popupElemet) => {
      if (popupElemet.classList.contains('popup_opened')) {
        togglePopup(popupElemet);
        document.removeEventListener('keyup', addEsc);
      }
    });
  }
};
// закрытие по клику на оверлей
const addOvelayClick = (evt) => {
  if (evt.target.classList.contains('popup__overlay')) {
    const popup = evt.target.closest('.popup');
    togglePopup(popup);
    document.removeEventListener('keyup', addEsc);
  }
};

const handleEvents = (popup) => {
  if (!popup.classList.contains('popup_opened')) {
    document.addEventListener('keyup', addEsc);
    popup.addEventListener('click', addOvelayClick);
  } else {
    document.removeEventListener('keyup', addEsc);
  }
};

const openOrClosePopup = (popup) => {
  if (popup === popupEditProfile && !popupEditProfile.classList.contains('popup_opened')) {
    renderEditProfilePopup();
  }
  if (popup === popupAddCard && !popupAddCard.classList.contains('popup_opened')) {
    renderAddCardPopup();
  }
  handleEvents(popup);
  togglePopup(popup);
};


const addCard = (cardItem) => {
  const newCard = new Card(cardItem, '#card');
  const cardElement = newCard.createCard();
  cardSection.prepend(cardElement);
};

// функция добавления карточек по умолчанию
const addDefaultCards = () => {
  initialCards.forEach((item) => {
    addCard(item);
  });
};


const profileFormSubmitHandler = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = popupEditProfileInputTitle.value;
  profileSubtitle.textContent = popupEditProfileInputSubtitle.value;
  openOrClosePopup(popupEditProfile);
  popupEditProfileForm.reset();
};

const addCardFormSubmitHandler = (evt) => {
  evt.preventDefault();
  const cardItem = {
    name: popupAddCardInputTitle.value,
    link: popupAddCardInputSubtitle.value,
  };
  addCard(cardItem);
  openOrClosePopup(popupAddCard);
  popupAddCardForm.reset();
};

// открываем popup edit
editButton.addEventListener('click', () => openOrClosePopup(popupEditProfile));


// открываем popup-add
addButton.addEventListener('click', () => openOrClosePopup(popupAddCard));


// закрываем popupAddCard
popupAddCardButtonClose.addEventListener('click', () => openOrClosePopup(popupAddCard));

// закрываем popup edit
popupEditProfileButtonClose.addEventListener('click', () => openOrClosePopup(popupEditProfile));
// отправляем изменения в profile
popupEditProfileForm.addEventListener('submit', profileFormSubmitHandler);

// создаем карточки
popupAddCardForm.addEventListener('submit', addCardFormSubmitHandler);

// загружаем карточки по умолчанию

addDefaultCards();
// включаем валидацию
popupFormArray.forEach((popupForm) => {
  enableValidation(formValidationElements, popupForm);
})