import Popup from './Popup.js';
import { popupElements } from '../constants/constants.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupPhoto = this._popup.querySelector(popupElements.popupPhotoSelector);
    this._popupCaption = this._popup.querySelector(popupElements.popupCaptionSelector);
  }

  open(data) {
    this._popupPhoto.src = data.link;
    this._popupPhoto.alt = data.name;
    this._popupCaption.textContent = data.name;
    super.open();
  }
}
