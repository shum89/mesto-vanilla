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
  popupFormArray,
  formValidationElements,
  editPopupOccupation,
  editPopupName,
  addCardPlace,
  addCardLink,
} from '../constants/constants.js';

// функция добавления карточек по умолчанию
const userInfo = new UserInfo({
  userName: profileElements.userNameSelector,
  userOccupation: profileElements.userOccupationSelector,
});

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
            handleCardClick: () => {
              const popupImage = new PopupWithImage(item, popupElements.popupImageSelector);
              popupImage.open();
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
  },
);

// открываем popup edit
editButton.addEventListener('click', () => popupEdit.open());

// открываем popup-add
addButton.addEventListener('click', () => popupAdd.open());

// включаем валидацию
const enableValidation = (validationElements, formSelector) => {
  const validationClass = new FormValidator(validationElements, formSelector);
  return validationClass.enableValidation();
};

popupFormArray.forEach((popupForm) => {
  enableValidation(formValidationElements, popupForm);
});

// загружаем карточки по умолчанию
const cardList = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const card = new Card({
        data: item,
        handleCardClick: () => {
          const popupImage = new PopupWithImage(item, popupElements.popupImageSelector);
          popupImage.open();
        },
      }, cardElements.cardSelector);
      const cardElement = card.createCard();
      cardList.addItem(cardElement);
    },
  }, cardElements.cardSectionSelector,
);

cardList.renderItems();
