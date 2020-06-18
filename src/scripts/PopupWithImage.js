import Popup from './Popup.js';
import { popupElements } from '../constants/constants.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(evt) {
    // передаем значения из карточки в попап с изображения
    this._popup.querySelector(popupElements.popupPhotoSelector).src = evt.target.src;
    this._popup.querySelector(popupElements.popupPhotoSelector).alt = evt.target.alt;
    this._popup.querySelector(popupElements.popupCaptionSelector).textContent = evt.target.alt;
    super.open();
  }
}
