// элементы popup-profile
const popupArray = Array.from(document.querySelectorAll('.popup'));
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

const popupInput = document.querySelectorAll('.popup__input');


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

// элементы popup-image
const popupImage = document.querySelector('#popup-image');
const popupImageButtonClose = popupImage.querySelector('.popup__button-close');
const popupImagePhoto = popupImage.querySelector('.popup__photo');
const popupImageCaption = popupImage.querySelector('.popup__caption');

// элементы секции  profile
const profile = document.querySelector('.profile');
const profileTitle = profile.querySelector('.profile__title');
const profileSubtitle = profile.querySelector('.profile__subtitle');
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');

// cекция с карточками
const card = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card').content;

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


const handlePopupError = (formElement) => {
  popupInput.forEach((inputElement) => {
    if (inputElement.classList.contains('popup__input_type_error')) {
      hideInputError(formElement, inputElement, 'popup__input_type_error', 'popup__input-error');
    }
  });
};


// открывающая и закрывающая popup функиция


// отрисовываем popup редактирования профиля
const renderEditProfilePopup = () => {
  const submitButton = popupEditProfile.querySelector('.popup__button-submit');
  popupEditProfileInputTitle.value = profileTitle.textContent;
  popupEditProfileInputSubtitle.value = profileSubtitle.textContent;
  handlePopupError(popupEditProfileForm);
  setButtonState(submitButton, 'popup__button-submit_disabled', false);
};

const renderAddCardPopup = () => {
  const submitButton = popupAddCard.querySelector('.popup__button-submit');
  popupAddCardForm.reset();
  handlePopupError(popupAddCardForm);
  setButtonState(submitButton, 'popup__button-submit_disabled', false);
};

const addEsc = (evt) => {
  if (evt.key === 'Esc' || evt.key === 'Escape') {
    popupArray.forEach((popupElemet) => {
      if (!popupElemet.classList.contains('popup_hidden')) {
        openOrClosePopup(popupElemet);
      }
    });
  }
};

const addOvelayClick = (evt) => {
  if (evt.target.classList.contains('popup__overlay')) {
    openOrClosePopup(evt.target.parentElement);
  }
};

const handleEvents = (popup) => {
  if (popup.classList.contains('popup_hidden')) {
    document.addEventListener('keyup', addEsc);
    popup.addEventListener('click', addOvelayClick);
  } else {
    document.removeEventListener('keyup', addEsc);
    popup.removeEventListener('click', addOvelayClick);
  }
};

const openOrClosePopup = (popup) => {
  if (popup === popupEditProfile && popupEditProfile.classList.contains('popup_hidden')) {
    renderEditProfilePopup();
  }
  if (popup === popupAddCard && popupAddCard.classList.contains('popup_hidden')) {
    renderAddCardPopup();
  }
  handleEvents(popup);

  popup.classList.toggle('popup_hidden');
};


// Отрисовываем карточки
const renderImagePopup = (evt) => {
  const targetPhoto = evt.target;
  popupImagePhoto.setAttribute('src', targetPhoto.src);
  popupImagePhoto.setAttribute('alt', targetPhoto.alt);
  popupImageCaption.textContent = targetPhoto.alt;
  openOrClosePopup(popupImage);
};


// функция ставим лайки
const toggleLike = (evt) => {
  evt.target.classList.toggle('card__like_active');
};

// функция удаления карточки
const removeCard = (evt) => {
  const parentElement = evt.target.closest('.card');
  parentElement.remove();
};


// создаем карточки
const createCard = (name, link) => {
  const cardElement = cardTemplate.cloneNode(true);
  const cardPhoto = cardElement.querySelector('.card__photo');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLikeButton = cardElement.querySelector('.card__like');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  cardPhoto.setAttribute('src', link);
  cardPhoto.setAttribute('alt', name);
  cardTitle.textContent = name;

  // cтавим лайки к карточкам
  cardLikeButton.addEventListener('click', toggleLike);

  // удаляем карточки


  cardDeleteButton.addEventListener('click', removeCard);

  // popup photo
  cardPhoto.addEventListener('click', renderImagePopup);

  return cardElement;
};

// функция добавления карточек по умолчанию
const addDefaultCards = () => {
  initialCards.forEach((item) => {
    card.prepend(createCard(item.name, item.link));
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
  card.prepend(createCard(popupAddCardInputTitle.value, popupAddCardInputSubtitle.value));
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


// закрываем popup image
popupImageButtonClose.addEventListener('click', () => openOrClosePopup(popupImage));

// отправляем изменения в profile
popupEditProfileForm.addEventListener('submit', profileFormSubmitHandler);

// создаем карточки
popupAddCardForm.addEventListener('submit', addCardFormSubmitHandler);

// добавляем оверлею функцию закрытия по клику.


// загружаем карточки по умолчанию

addDefaultCards();
