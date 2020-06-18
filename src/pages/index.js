import './index.css';
import { Card } from '../scripts/Card.js';
import { FormValidator } from '../scripts/FormValidator.js';
import Section from '../scripts/Section.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import UserInfo from '../scripts/UserInfo.js';
import {
  popupElements,
  profileElements,
  cardElements,
  initialCards,
  editButton,
  addButton,
  formValidationElements,
  editPopupOccupation,
  editPopupName,
  addCardPlace,
  addCardLink,
  addCardPopup,
  editProfilePopup,
} from '../constants/constants.js';

// функция добавления карточек по умолчанию
const userInfo = new UserInfo({
  userName: profileElements.userNameSelector,
  userOccupation: profileElements.userOccupationSelector,
});

// создаем классы для валидации попапов
const formValidationAddCard = new FormValidator(formValidationElements, addCardPopup);
const formValidationEdit = new FormValidator(formValidationElements, editProfilePopup);

// создаем массив из классов, чтобы потом включить валидацию
const validationClassArray = [formValidationAddCard, formValidationEdit];

const popupImage = new PopupWithImage(popupElements.popupImageSelector);

// класс редактирования профиля
const popupEdit = new PopupWithForm(
  popupElements.popupEditSelector,
  {
    handleFormSubmit: (data) => {
      userInfo.setUserInfo(data);
      popupEdit.close();
    },
    setInputFields: () => {
      editPopupName.value = userInfo.getUserInfo().name;
      editPopupOccupation.value = userInfo.getUserInfo().occupation;
    },
    resetValidation: () => {
      formValidationEdit.setDefaultState();
    },
  },
);

// класс добавления новых карточек
const popupAdd = new PopupWithForm(
  popupElements.popupAddCardSelector,
  {
    handleFormSubmit: (cardItem) => {
      const newCard = new Section({
        data: [cardItem],
        renderer: (item) => {
          const card = new Card({
            data: item,
            handleCardClick: (evt) => {
              popupImage.open(evt);
            },
          }, cardElements.cardSelector);
          const cardElement = card.createCard();
          newCard.addItem(cardElement);
        },
      }, cardElements.cardSectionSelector);
      newCard.renderItems();
      popupAdd.close();
    },
    setInputFields: () => {
      addCardPlace.value = '';
      addCardLink.value = '';
    },
    resetValidation: () => {
      formValidationAddCard.setDefaultState();
    },
  },
);

// открываем popup edit
editButton.addEventListener('click', () => popupEdit.open());

// открываем popup-add
addButton.addEventListener('click', () => popupAdd.open());

// включаем валидацию
validationClassArray.forEach((validationElement) => {
  validationElement.enableValidation();
});

// загружаем карточки по умолчанию
const cardList = new Section(
  {
    data: initialCards.reverse(),
    renderer: (item) => {
      const card = new Card({
        data: item,
        handleCardClick: (evt) => {
          popupImage.open(evt);
        },
      }, cardElements.cardSelector);
      const cardElement = card.createCard();
      cardList.addItem(cardElement);
    },
  }, cardElements.cardSectionSelector,
);

cardList.renderItems();
