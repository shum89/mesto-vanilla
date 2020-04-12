const popup = document.querySelector('.popup');
const popupContainer = popup.querySelector('.popup__container');
const popupForm = popupContainer.querySelector('.popup__form');
let popupInputTitle = popupContainer.querySelector('.popup__input-title');
let popupInputSubtitle = popupContainer.querySelector('.popup__input-subtitle');
const buttonSubmit = popupContainer.querySelector('.popup__button-submit');
const buttonClose = popupContainer.querySelector('.popup__button-close');

const profile = document.querySelector('.profile');
let profileTitle = profile.querySelector('.profile__title');
let profileSubtitle = profile.querySelector('.profile__subtitle');
const editButton = profile.querySelector('.profile__edit-button');


// открывающая и закрывающая popup функиця
function openOrClosePopup() {
    // проверяем есть ли класс скрывающий popup
    popup.classList.toggle('popup_hidden');
    popup.classList.toggle('popup_opened');
    if (popup.classList.contains('popup_opened')) {
    popupInputTitle.value = profileTitle.textContent;
    popupInputSubtitle.value = profileSubtitle.textContent;
    } 
};

// отправляем изменения в profile

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileTitle.textContent = popupInputTitle.value;
    profileSubtitle.textContent = popupInputSubtitle.value;
    openOrClosePopup();
}


popupForm.addEventListener('submit',formSubmitHandler);

editButton.addEventListener('click', openOrClosePopup);

buttonClose.addEventListener('click', openOrClosePopup);

