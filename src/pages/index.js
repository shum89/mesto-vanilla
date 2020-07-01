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
    editAvatarInput,
    editPopupAvatar,
    editButton,
    addButton,
    formValidationElements,
    editPopupOccupation,
    editPopupName,
    addCardPlace,
    addCardLink,
    addCardPopup,
    editProfilePopup,
    avatar
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
            }).catch((err) => console.log(err)).finally(() => {
                popupEdit.renderLoading(false)
                popupEdit.close();
            })
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
// попап аватар
const popupUpdateAvatar = new PopupWithForm(
    popupElements.popupUpdateAvatarSelector,
    {
        handleFormSubmit: (data) => {
            popupUpdateAvatar.renderLoading(true)
            api.updateUserAvatar({
                avatar: data.avatar,
            }).then(() => {
                userInfo.setUserAvatar(data)
            }).catch((err) => {
                console.log(err)
            }).finally(() => {
                popupUpdateAvatar.renderLoading(false)
            })
            popupUpdateAvatar.close()
        },
        setInputFields: () => {
           editAvatarInput.value = '';
        },
        resetValidation: () => {
            formValidationAvatar.setDefaultState();
        },
    }
)
// генерируем карточку
const generateCard = (item) => {
    const card = new Card({
        data: item,
        handleCardClick: popupImage.open.bind(popupImage),
        handleDeleteClick: (item) => {
            popupDeleteCard.open(item)
        },
        handleCardLike: (item, isLiked) => api.like(item, isLiked),
    },
        cardElements.cardSelector, userInfo.getUserId());
    return card.createCard();
};

// класс добавления новых карточек
const popupAdd = new PopupWithForm(
    popupElements.popupAddCardSelector,
    {
        handleFormSubmit: (cardItem) => {
            let newCard;
            popupAdd.renderLoading(true)
            api.postNewCard(cardItem).then((result) => {

                newCard = new Section({
                    data:[result],
                    renderer:(item) => {
                        newCard.addItem(generateCard(item))
                    }},cardElements.cardSectionSelector)
                newCard.renderItems();
            })
                .catch((err) => {
                console.log(err)
            }).finally(() => {
                popupAdd.renderLoading(false)
                popupAdd.close();
            })

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

// открываем popup-avatar
avatar.addEventListener('click', () => popupUpdateAvatar.open());

// включаем валидацию
validationClassArray.forEach((validationElement) => {
    validationElement.enableValidation();
});


const userInfo = new UserInfo({
    userName: profileElements.userNameSelector,
    userOccupation: profileElements.userOccupationSelector,
    userAvatar: profileElements.userAvatarImageSelector,
});

api.getUserInfo().then((result) => {
    userInfo.setUserInfo(result)
})

// загружаем карточки по умолчанию
let cardListIn;

api.getInitialCards().then((result) => {
    cardListIn = new Section({
        data: result,
        renderer: (item) => {
            cardListIn.addDefaultItem(generateCard(item))
        }
    }, cardElements.cardSectionSelector)
    cardListIn.renderItems()
});
