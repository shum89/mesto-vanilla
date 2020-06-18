import Popup from './Popup.js';
import { popupElements } from '../constants/constants';


export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit, setInputFields, resetValidation }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._setInputFields = setInputFields;
    this._resetValidation = resetValidation;
    this._form = this._popup.querySelector(popupElements.formSelector);
    this._inputList = this._popup.querySelectorAll(popupElements.inputSelector);
    this._handleSubmit = (evt) => {
      this._submitFormHandler(evt);
    };
  }

  // собираем значения с инпутов и помещаем их в объект
  _getInputValues () {
    this._formValues = {};
    this._inputList.forEach((input) => this._formValues[input.name] = input.value);
    return this._formValues;
  }

  _submitFormHandler (evt) {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
  }

  _setEventListeners () {
    this._form.addEventListener('submit', this._handleSubmit);
    super._setEventListeners();
  }

  _removeEvents () {
    this._form.removeEventListener('submit', this._handleSubmit);
    super._removeEvents();
  }

  open() {
    this._resetValidation();
    this._setInputFields();
    super.open();
  }

  close() {
    // reset форм
    this._removeEvents();
    this._form.reset();
    super.close();
  }
}
