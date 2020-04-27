// элементы popup
const popup = document.querySelector(".popup");
const popupContainer = popup.querySelector(".popup__container");
const popupForm = popupContainer.querySelector(".popup__form");
let popupTitle = popupContainer.querySelector(".popup__title");
let popupInputTitle = popupContainer.querySelector(".popup__input-title");
let popupInputSubtitle = popupContainer.querySelector(".popup__input-subtitle");
const buttonSubmit = popupContainer.querySelector(".popup__button-submit");
const buttonClose = document.querySelectorAll(".button-close");

// элементы секции  profile
const profile = document.querySelector(".profile");
let profileTitle = profile.querySelector(".profile__title");
let profileSubtitle = profile.querySelector(".profile__subtitle");
const editButton = profile.querySelector(".profile__edit-button");
const addButton = profile.querySelector(".profile__add-button");

// элементы  popup-image
const popupImage = document.querySelector(".popup-image");
let popupImagePhoto = popupImage.querySelector(".popup-image__photo");
let popupImageCaption = popupImage.querySelector(".popup-image__caption");

// cекция с карточками
const card = document.querySelector(".cards");

// массив с карточками, которые загружаются по умолчанию
const initialCards = [
  {
    name: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// добавляем карточки
function addCards(name, link) {
  const cardsTemplate = document.querySelector("#cards").content;

  const cardsElement = cardsTemplate.cloneNode(true);
  let cardsPhoto = cardsElement.querySelector(".cards__photo");
  let cardsTitle = cardsElement.querySelector(".cards__title");
  let cardsLikeButton = cardsElement.querySelector(".cards__like");
  const cardsDeletButton = cardsElement.querySelector(".cards__delete-button");

  cardsPhoto.setAttribute("src", `${link}`);
  cardsPhoto.setAttribute("alt", `${name}`);
  cardsTitle.textContent = `${name}`;

  card.prepend(cardsElement);

  //открываем popup-image
  cardsPhoto.addEventListener("click", function () {
    popupImageCaption.textContent = cardsTitle.textContent;
    popupImagePhoto.setAttribute("src", `${link}`);
    popupImagePhoto.setAttribute("alt", `${name}`);
    return openOrClosePopup(`${cardsTitle.textContent}`);
  });

  // cтавим лайки к карточкам
  cardsLikeButton.addEventListener("click", function (evt) {
    evt.target.classList.toggle("cards__like_active");
  });

  //удаляем карточки
  cardsDeletButton.addEventListener("click", function (evt) {
    evt.target.parentNode.remove();
  });
}

// открывающая и закрывающая popup функиця теперь с параметром title
function openOrClosePopup(title) {
  // выводим title в заголовок
  // проверяем есть ли класс скрывающий popup

  //тк два popup идентичны по функционалу и различатются только названием делаем проверку
  switch (title) {
    case "Редактировать Профиль": {
      popupTitle.textContent = title;
      popupInputTitle.value = profileTitle.textContent;
      popupInputSubtitle.value = profileSubtitle.textContent;
      popupInputTitle.setAttribute("placeholder", "ФИО");
      popupInputSubtitle.setAttribute("placeholder", "Профессия");
      buttonSubmit.textContent = "Сохранить";
      popup.classList.toggle("popup_hidden");
      popup.classList.toggle("popup_opened");
      break;
    }
    case "Новое Место": {
      //очищаем форму, если надо добавить карточки
      popupInputTitle.value = "";
      popupInputSubtitle.value = "";
      //добавляем placeholder
      popupInputTitle.setAttribute("placeholder", "Название");
      popupInputSubtitle.setAttribute("placeholder", "Ссылка на картинку");
      buttonSubmit.textContent = "Cоздать";
      popup.classList.toggle("popup_hidden");
      popup.classList.toggle("popup_opened");
      popupTitle.textContent = title;
      break;
    }
    // часть функции которая открывает и закрывает popup-image
    case `${popupImageCaption.textContent}`: {
      popupImage.classList.toggle("popup-image_opened");
      popupImage.classList.toggle("popup-image_closed");
      break;
    }
  }
}

// отправляем изменения в profile или создаем карточку
function formSubmitHandler(evt) {
  evt.preventDefault();
  //проверка какая из форм открыта
  if (popupTitle.textContent === "Редактировать Профиль") {
    profileTitle.textContent = popupInputTitle.value;
    profileSubtitle.textContent = popupInputSubtitle.value;
    openOrClosePopup(popupTitle.textContent);
  } else {
    addCards(popupInputTitle.value, popupInputSubtitle.value);
    openOrClosePopup(popupTitle.textContent);
  }
}

// загружаем карточки по умолчанию
window.onload = initialCards.forEach((item) => {
  addCards(item.name, item.link);
});

// передаем title в event listener
editButton.addEventListener("click", function () {
  return openOrClosePopup("Редактировать Профиль");
});

addButton.addEventListener("click", function () {
  return openOrClosePopup("Новое Место");
});

// отправляем изменния в форме
popupForm.addEventListener("submit", formSubmitHandler);

// закрываем popup
buttonClose.forEach((item) => {
  item.addEventListener("click", function (evt) {
    // проверяем в каком из popup находится кнопка закрытие
    if (evt.target.parentNode.classList.contains("popup__container")) {
      return openOrClosePopup(popupTitle.textContent);
    } else {
      return openOrClosePopup(`${popupImageCaption.textContent}`);
    }
  });
});
