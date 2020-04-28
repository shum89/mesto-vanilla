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
const cardsTemplate = document.querySelector('#cards').content;


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


function addCards () {
  card.prepend(cardsElement);
};
// добавляем карточки
function createCards(name, link) {
  const cardsElement = cardsTemplate.cloneNode(true);
const cardsPhoto = cardsElement.querySelector('.cards__photo');
const cardsTitle = cardsElement.querySelector('.cards__title');
const cardsLikeButton = cardsElement.querySelector('.cards__like');
const cardsDeletButton = cardsElement.querySelector('.cards__delete-button');
cardsPhoto.setAttribute('src', link);
cardsPhoto.setAttribute('alt', name);
cardsTitle.textContent = name;
card.prepend(cardsElement)


  // cтавим лайки к карточкам
  cardsLikeButton.addEventListener('click', function (evt) {
    evt.target.classList.toggle('cards__like_active');
  });

  //удаляем карточки
  cardsDeletButton.addEventListener('click', function (evt) {
    evt.target.parentNode.remove();
  });
};
// отрисовываем popup редактирования профиля
function renderEditProfilePopup () {
     popupEditProfileInputTitle.value = profileTitle.textContent;
     popupEditProfileInputSubtitle.value = profileSubtitle.textContent;
};
// отрисовывваем popup карточек
function renderAddCardsPopup () {
  popupAddCardInputTitle.value = '';
  popupAddCardInputSubtitle.value = '';
};




// открывающая и закрывающая popup функиця теперь с параметром title
function openOrClosePopup(id) {
  switch (id) {
    case 'popup-edit':
      popupEditProfile.classList.toggle('popup_hidden');
      popupEditProfile.classList.toggle('popup_opened');
      break;
    case 'popup-add': 
    popupAddCard.classList.toggle('popup_hidden');
    popupAddCard.classList.toggle('popup_opened');
    break;
    case 'popup-image':
    
    
};
};

// отправляем изменения в profile или создаем карточку
function formSubmitHandler(evt, id) {
  evt.preventDefault();
  //проверка какая из форм открыта
  if (id === 'popup-edit'){
    profileTitle.textContent = popupEditProfileInputTitle.value;
    profileSubtitle.textContent = popupEditProfileInputSubtitle.value;
    openOrClosePopup('popup-edit');
  } else {
    
  };
};

// загружаем карточки по умолчанию
initialCards.forEach((item) => {
  createCards(item.name, item.link);
});

// передаем title в event listener
editButton.addEventListener('click', function () {
  openOrClosePopup('popup-edit');
  renderEditProfilePopup();
});

addButton.addEventListener('click', function () {
  openOrClosePopup('popup-add');
  renderAddCardsPopup();
});

// отправляем изменния в форме
// popupForm.addEventListener('submit', formSubmitHandler);

// закрываем popupAddCard
popupAddCardButtonClose.addEventListener('click', function () {
   return openOrClosePopup('popup-add')
});
// закрываем popup edit
popupEditProfileButtonClose.addEventListener('click', function () {
  return openOrClosePopup('popup-edit')
});
// отправляем изменения в profile
popupEditProfileForm.addEventListener('submit', function(evt) {
  formSubmitHandler(evt, 'popup-edit');
});
