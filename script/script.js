/* eslint-disable comma-dangle */
// элементы popup-profile
const popupEditProfile = document.querySelector('#popup-edit');
const popupEditProfileContainer = popupEditProfile.querySelector(
  '.popup__container'
);
const popupEditProfileForm = popupEditProfileContainer.querySelector(
  '.popup__form'
);
const popupEditProfileInputTitle = popupEditProfileContainer.querySelector(
  '.popup__input-title'
);
const popupEditProfileInputSubtitle = popupEditProfileContainer.querySelector(
  '.popup__input-subtitle'
);
const popupEditProfileButtonClose = popupEditProfile.querySelector(
  '.popup__button-close'
);

// элементы popupAddCard
const popupAddCard = document.querySelector('#popup-add-card');
const popupAddCardContainer = popupAddCard.querySelector('.popup__container');
const popupAddCardForm = popupAddCardContainer.querySelector('.popup__form');
const popupAddCardInputTitle = popupAddCardContainer.querySelector(
  '.popup__input-title'
);
const popupAddCardInputSubtitle = popupAddCardContainer.querySelector(
  '.popup__input-subtitle'
);
const popupAddCardButtonClose = popupAddCard.querySelector(
  '.popup__button-close'
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

// отрисовываем popup редактирования профиля
function renderEditProfilePopup() {
  popupEditProfileInputTitle.value = profileTitle.textContent;
  popupEditProfileInputSubtitle.value = profileSubtitle.textContent;
}

function renderAddCardPopup() {
  popupAddCardInputTitle.value = '';
  popupAddCardInputSubtitle.value = '';
}

// открывающая и закрывающая popup функиция
function openOrClosePopup(popup) {
  if (popup === popupEditProfile && popupEditProfile.classList.contains('popup_hidden')) {
    renderEditProfilePopup();
  }

  if (popup === popupAddCard && popupAddCard.classList.contains('popup_hidden')) {
    renderAddCardPopup();
  }

  popup.classList.toggle('popup_hidden');
}

// Отрисовываем карточки
function renderImagePopup(evt) {
  const targetPhoto = evt.target;
  popupImagePhoto.setAttribute('src', targetPhoto.src);
  popupImagePhoto.setAttribute('alt', targetPhoto.alt);
  popupImageCaption.textContent = targetPhoto.alt;
  openOrClosePopup(popupImage);
}

// функция ставим лайки
function toggleLike(evt) {
  evt.target.classList.toggle('card__like_active');
}

// функция удаления карточки
function removeCard(evt) {
  const parentElement = evt.target.closest('.card');
  parentElement.remove();
}

// создаем карточки
function createCard(name, link) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardPhoto = cardElement.querySelector('.card__photo');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLikeButton = cardElement.querySelector('.card__like');
  const cardDeletButton = cardElement.querySelector('.card__delete-button');
  cardPhoto.setAttribute('src', link);
  cardPhoto.setAttribute('alt', name);
  cardTitle.textContent = name;

  // cтавим лайки к карточкам
  cardLikeButton.addEventListener('click', toggleLike);

  // удаляем карточки
  cardDeletButton.addEventListener('click', removeCard);

  // popup photo
  cardPhoto.addEventListener('click', renderImagePopup);

  return cardElement;
}

// функция добавления карточек по умолчанию
function addDefaultCards() {
  initialCards.forEach((item) => {
    card.prepend(createCard(item.name, item.link));
  });
}

function profileFormSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = popupEditProfileInputTitle.value;
  profileSubtitle.textContent = popupEditProfileInputSubtitle.value;
  openOrClosePopup(popupEditProfile);
  popupEditProfileForm.reset();
}

function addCardFormSubmitHandler(evt) {
  evt.preventDefault();
  card.prepend(createCard(popupAddCardInputTitle.value, popupAddCardInputSubtitle.value));
  openOrClosePopup(popupAddCard);
  popupAddCardForm.reset();
}

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


// загружаем карточки по умолчанию

addDefaultCards();
