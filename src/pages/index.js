import './index.css';
import Api from "../scripts/Api";
import { Card } from '../scripts/Card.js';
import { FormValidator } from '../scripts/FormValidator.js';
import Section from '../scripts/Section.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import UserInfo from '../scripts/UserInfo.js';
import PopupDeleteCard from "../scripts/PopupDeleteCard";
import {
    baseUrl,
    headers,
    popupElements,
    profileElements,
    cardElements,
    editPopupAvatar,
    editButton,
    addButton,
    formValidationElements,
    editPopupOccupation,
    editPopupName,
    addCardPopup,
    editProfilePopup,
    avatar,
    popupAvatarForm,
    popupAddCardForm,
} from '../constants/constants.js';


// класс api
const api = new Api({ baseUrl, headers})

// создаем классы для валидации попапов
const formValidationAddCard = new FormValidator(formValidationElements, addCardPopup);
const formValidationEdit = new FormValidator(formValidationElements, editProfilePopup);
const formValidationAvatar = new FormValidator(formValidationElements, editPopupAvatar)

// создаем массив из классов, чтобы потом включить валидацию
const validationClassArray = [formValidationAddCard, formValidationEdit, formValidationAvatar];

// попап изображения
const popupImage = new PopupWithImage(popupElements.popupImageSelector);

//попап удаления карточки
const popupDeleteCard = new PopupDeleteCard(popupElements.popupDeleteSelector, {handleConfirm: ({id, deleteCard}) => {
    api.deleteCard(id).then(() => {
    }).catch((err) => console.log(err))
        deleteCard();
        popupDeleteCard.close()
}
} )


const userInfo = new UserInfo({
    userName: profileElements.userNameSelector,
    userOccupation: profileElements.userOccupationSelector,
    userAvatar: profileElements.userAvatarImageSelector,
});

// генерируем карточку
const generateCard = (item) => {
    const card = new Card({
            data: item,
            handleCardClick: popupImage.open,
            handleDeleteClick: (item) => {
                popupDeleteCard.open(item)
            },
            handleCardLike: (item, isLiked) => api.like(item, isLiked),
        },
        cardElements.cardSelector, userInfo.getUserId());
    return card.createCard();
};


let cardList = new Section({
    renderer: (item) => {
        cardList.addDefaultItem(generateCard(item))
    }
}, cardElements.cardSectionSelector)

Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, cards]) => {
        userInfo.setUserInfo(userData);
        cardList.renderItems(cards);
    }).catch(err => console.log(err))

// класс редактирования профиля
const popupEdit = new PopupWithForm(
    popupElements.popupEditSelector,
    {
        handleFormSubmit: (data) => {
            popupEdit.renderLoading(true)
            api.updateUserInfo({
                name: data.name,
                about: data.occupation,
            }).then((result) => {
                userInfo.setUserInfo(result)
                popupEdit.close();
            }).catch((err) => console.log(err)).finally(() => {
                popupEdit.renderLoading(false)
            })
        },
        setInputFields: () => {
            const getUserInfo = userInfo.getUserInfo();
            editPopupName.value = getUserInfo.name;
            editPopupOccupation.value = getUserInfo.occupation;
        },
        resetValidation: () => {
            formValidationEdit.setDefaultState();
        },
    },
);
// попап аватар
const popupUpdateAvatar = new PopupWithForm(
    popupElements.popupUpdateAvatarSelector,
    {
        handleFormSubmit: (data) => {
            popupUpdateAvatar.renderLoading(true)
            api.updateUserAvatar({
                avatar: data.avatar,
            }).then((result) => {
                popupUpdateAvatar.close()
                userInfo.setUserAvatar(result)
            }).catch((err) => {
                console.log(err)
            }).finally(() => {
                popupUpdateAvatar.renderLoading(false)
            })
        },
        setInputFields: () => {
           popupAvatarForm.reset()
        },
        resetValidation: () => {
            formValidationAvatar.setDefaultState();
        },
    }
)

// класс добавления новых карточек
const popupAdd = new PopupWithForm(
    popupElements.popupAddCardSelector,
    {
        handleFormSubmit: (cardItem) => {
            popupAdd.renderLoading(true)
            api.postNewCard(cardItem).then((result) => {
                cardList.addItem(generateCard(result))
                popupAdd.close();
            })
                .catch((err) => {
                console.log(err)
            }).finally(() => {
                popupAdd.renderLoading(false)
            })

        },
        setInputFields: () => {
            popupAddCardForm.reset();
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

// открываем popup-avatar
avatar.addEventListener('click', () => popupUpdateAvatar.open());

// включаем валидацию
validationClassArray.forEach((validationElement) => {
    validationElement.enableValidation();
});








