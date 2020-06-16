import Popup from './Popup.js';
import { popupElements } from '../constants/constants.js';

export default class PopupWithImage extends Popup {
  constructor(data, popupSelector) {
    super(popupSelector);
    this._link = data.link;
    this._name = data.name;
  }

  open() {
    // передаем значения из карточки в попап с изображения
    this._popupSelector.querySelector(popupElements.popupPhotoSelector).src = this._link;
    this._popupSelector.querySelector(popupElements.popupCaptionSelector).textContent = this._name;
    super.open();
  }
}
