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



function openPopup() {
    popup.classList.toggle('popup_hidden');
    popup.classList.add('popup_opened');
    popupInputTitle.value = profileTitle.textContent;
    popupInputSubtitle.value = profileSubtitle.textContent;
    
};

function closePopup() {
    popup.classList.toggle('popup_hidden');
    popup.classList.toggle('popup_opened');
};


function formSubmitHandler (evt) {
    evt.preventDefault();
    profileTitle.textContent = popupInputTitle.value;
    profileSubtitle.textContent = popupInputSubtitle.value;
    closePopup();
}


popupForm.addEventListener('submit',formSubmitHandler);

editButton.addEventListener('click', openPopup);

buttonClose.addEventListener('click', closePopup);

