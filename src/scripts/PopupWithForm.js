import Popup from './Popup.js';
import { formValidationElements, popupElements } from '../constants/constants';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit, setInputFields }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._setInputFields = setInputFields;
  }

  // сбрасываем ошибки
  _resetInputError() {
    this._inputErrorElements = this._popupSelector.querySelectorAll(formValidationElements.errorSelector);
    this._inputList = this._popupSelector.querySelectorAll(formValidationElements.inputSelector);
    this._inputErrorElements.forEach((inputErrorElement) => {
      inputErrorElement.textContent = '';
    });
    this._inputList.forEach((input) => {
      input.classList.remove(formValidationElements.inputErrorClass);
    });
  }

  // сбрасываем состояние кнопки
  _resetButtonState() {
    this._submitButton = this._popupSelector.querySelector(popupElements.popupButtonSubmitSelector);
    this._submitButton.disabled = true;
    this._submitButton.classList.add(formValidationElements.inactiveButtonClass);
  }

  // собираем значения с инпутов и помещаем их в объект
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => this._formValues[input.name] = input.value);
    return this._formValues;
  }

  _setEventListeners() {
    // хендлер для отправки значений из формы
    const handleFormSubmit = (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
      this._popupSelector.querySelector(popupElements.formSelector).removeEventListener('submit', handleFormSubmit);
    };

    this._popupSelector.querySelector(popupElements.formSelector).addEventListener('submit', handleFormSubmit);
    super._setEventListeners();
  }

  open() {
    this._resetInputError();
    this._resetButtonState();
    this._setInputFields();
    super.open();
  }

  close() {
    // reset форм
    this._popupSelector.querySelector(popupElements.formSelector).reset();
    super.close();
  }
}
