
export class FormValidator {
  constructor(data, formSelector) {
    this._formSelector = formSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._inputList = Array.from(this._formSelector.querySelectorAll(this._inputSelector));
    this._submitButton = this._formSelector.querySelector(this._submitButtonSelector);
  }

  // проверяем есть ли невалидный инпут
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  // устанавливаем состояние кнопки
  _setButtonState(mark) {
    if (mark === false) {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    }
    if (mark === true) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
    }
  }

  // тогглим состояние кнопки
  _toggleButtonState() {
    this._setButtonState(this._hasInvalidInput());
  }

  // показываем ошибку
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formSelector.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }


  // прячем ошибку
  _hideInputError(inputElement) {
    const errorElement = this._formSelector.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  // проверяем валидность инпутов
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  // вешаем слушатели
  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  // сбрасываем ошибки
  setDefaultState() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._setButtonState(true);
  }

  // запускаем валидацию
  enableValidation() {
    this._setEventListeners();
  }
}
