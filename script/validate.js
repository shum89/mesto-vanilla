const formValidationElements = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error',
};
// проверяем есть ли невалидный инпут
const hasInvalidInput = (inputList) => inputList.some((inputElement) => !inputElement.validity.valid);

// устанавливаем состояние кнопки
const setButtonState = (buttonElement, inactivebuttonClass, mark) => {
  if (mark === true) {
    buttonElement.classList.remove(inactivebuttonClass);
    buttonElement.disabled = false;
  }

  if (mark === false) {
    buttonElement.classList.add(inactivebuttonClass);
    buttonElement.disabled = true;
  }
};

// тогглим состояние кнопки
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (!hasInvalidInput(inputList)) {
    setButtonState(buttonElement, inactiveButtonClass, true);
  } else {
    setButtonState(buttonElement, inactiveButtonClass, false);
  }
};
// показываем ошибку
const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};
// прячем ошибку
const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.add(errorClass);
  errorElement.textContent = '';
};
// проверяем валидность инпутов
const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

// вешаем слушатели
const setEventListeners = (formElement, inputErrorClass, errorClass, inputSelector, submitButtonSelector, inactiveButtonClass) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};
// запускаем валидацию
const enableValidation = (validationElements) => {
  const formArray = Array.from(document.querySelectorAll(validationElements.formSelector));
  formArray.forEach((formElement) => {
    setEventListeners(formElement, validationElements.inputErrorClass, validationElements.errorClass, validationElements.inputSelector, validationElements.submitButtonSelector, validationElements.inactiveButtonClass);
  });
};

enableValidation(formValidationElements);
