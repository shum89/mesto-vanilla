import Popup from "./Popup";
import {popupElements} from "../constants/constants";
export default class PopupDeleteCard extends Popup {
    constructor(popupSelector, {handleConfirm}) {
        super(popupSelector);
        this._handleConfirm = handleConfirm;

    }
// открываем попап удаления карточки, передаем айди карточки и удаление карточки
    open(data) {
        this._id = data.id;
        this._deleteCard = data.deleteCard;
        super.open();
    }
// устанавливаем слушателей
    _setEventListeners() {
        this._form = this._popup.querySelector(popupElements.formSelector);
       this._form.addEventListener('submit', (evt) => {
           evt.preventDefault();
           this._handleConfirm({
               id: this._id,
               deleteCard: this._deleteCard,
           })
       })
        super._setEventListeners();
    }

}