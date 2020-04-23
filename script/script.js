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

const card = document.querySelector('.cards');



const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];
// добавляем карточки
function addCards (name, link) {
    const cardsTemplate = document.querySelector('#cards').content;


            const cardsElement = cardsTemplate.cloneNode(true);
        
            let cardsPhoto = cardsElement.querySelector('.cards__photo');
        
            let cardsTitle = cardsElement.querySelector('.cards__title');
        
            cardsPhoto.setAttribute('src',`${link}`);
            cardsPhoto.setAttribute('alt',`${name}`);
            cardsTitle.textContent = `${name}`;
            card.append(cardsElement);   
}
    


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

window.onload = initialCards.forEach((item) => {
    addCards(item.name, item.link);
})

popupForm.addEventListener('submit',formSubmitHandler);

editButton.addEventListener('click', openOrClosePopup);

buttonClose.addEventListener('click', openOrClosePopup);


