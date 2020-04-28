// элементы popup-profile
const popupEditProfile = document.querySelector('#popup-edit');
const popupEditProfileContainer = popupEditProfile.querySelector('.popup__container');
const popupTitle = popupEditProfileContainer.querySelector('.popup__title');
const popupEditProfileForm = popupEditProfileContainer.querySelector('.popup__form');
const popupEditProfileInputTitle = popupEditProfileContainer.querySelector('.popup__input-title');
const popupEditProfileInputSubtitle = popupEditProfileContainer.querySelector('.popup__input-subtitle');
const popupEditProfileButtonSubmit = popupEditProfileContainer.querySelector('.popup__button-submit');
const popupEditProfileButtonClose = popupEditProfile.querySelector('.popup__button-close');
// элементы popupAddCard
const popupAddCard = document.querySelector('#popup-add');
const popupAddCardContainer = popupAddCard.querySelector('.popup__container');
const popupAddCardTitle = popupAddCardContainer.querySelector('.popup__title');
const popupAddCardForm = popupAddCardContainer.querySelector('.popup__form');
const popupAddCardInputTitle = popupAddCardContainer.querySelector('.popup__input-title');
const popupAddCardInputSubtitle = popupAddCardContainer.querySelector('.popup__input-subtitle');
const popupAddCardButtonSubmit = popupAddCardContainer.querySelector('.popup__button-submit');
const popupAddCardButtonClose = popupAddCard.querySelector('.popup__button-close');

// элементы popup-image
const popupImage = document.querySelector('#popup-image');
const popupImageContainer = popupImage.querySelector('.popup__image-container');
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

// функция ставим лайки
function toggleLike (evt) {
  return evt.target.classList.toggle('card__like_active');
};
// функция удаления карточки
function removeCard (evt) {
  return evt.target.closest('.card').remove();
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
  cardLikeButton.addEventListener('click', function (evt) {
    toggleLike(evt);
  });

  //удаляем карточки
  cardDeletButton.addEventListener('click', function (evt) {
    removeCard(evt)
  });

  return cardElement;
};
// отрисовываем popup редактирования профиля
function renderEditProfilePopup () {
     popupEditProfileInputTitle.value = profileTitle.textContent;
     popupEditProfileInputSubtitle.value = profileSubtitle.textContent;
};
// отрисовывваем popup  с добавлением карточек
function renderAddCardsPopup () {
  popupAddCardInputTitle.value = '';
  popupAddCardInputSubtitle.value = '';
};

// 

// открывающая и закрывающая popup функиця теперь с параметром title
function openOrClosePopup(id) {
  switch (id) {
    case popupEditProfile.id:
      popupEditProfile.classList.toggle('popup_hidden');
      popupEditProfile.classList.toggle('popup_opened');
      break;
    case popupAddCard.id: 
    popupAddCard.classList.toggle('popup_hidden');
    popupAddCard.classList.toggle('popup_opened');
    break;
    case popupImage.id:
};
};

// отправляем изменения в profile или создаем карточку
function formSubmitHandler(evt, id) {
  evt.preventDefault();
  //проверка какая из форм открыта
  if (id === popupEditProfile.id){
    profileTitle.textContent = popupEditProfileInputTitle.value;
    profileSubtitle.textContent = popupEditProfileInputSubtitle.value;
    openOrClosePopup(popupEditProfile.id);
  } else {
    card.prepend(createCard(popupAddCardInputTitle.value, popupAddCardInputSubtitle.value));
    openOrClosePopup(popupAddCard.id);
  };
};

// загружаем карточки по умолчанию
initialCards.forEach((item) => {
  card.prepend(createCard(item.name, item.link));
});

// передаем title в event listener
editButton.addEventListener('click', function () {
  openOrClosePopup(popupEditProfile.id);
  renderEditProfilePopup();
});

addButton.addEventListener('click', function () {
  openOrClosePopup(popupAddCard.id);
  renderAddCardsPopup();
});


// закрываем popupAddCard
popupAddCardButtonClose.addEventListener('click', function () {
   return openOrClosePopup(popupAddCard.id)
});
// закрываем popup edit
popupEditProfileButtonClose.addEventListener('click', function () {
  return openOrClosePopup(popupEditProfile.id)
});
// отправляем изменения в profile
popupEditProfileForm.addEventListener('submit', function(evt) {
  formSubmitHandler(evt, popupEditProfile.id);
});
// создаем карточки
popupAddCardForm.addEventListener('submit', function(evt){
  formSubmitHandler(evt, popupAddCard.id);
});
