
const hasInvalidInput = (inputList) => inputList.some((inputElement) => !inputElement.validity.valid);

const setButtonState = (buttonElement, inactivebuttonClass, mark) => {
  if (mark === true) {
    buttonElement.classList.remove(inactivebuttonClass);
  }

  if (mark === false) {
    buttonElement.classList.add(inactivebuttonClass);
  }
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (!hasInvalidInput(inputList)) {
    setButtonState(buttonElement, inactiveButtonClass, true);
  } else {
    setButtonState(buttonElement, inactiveButtonClass, false);
  }
};

const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.add(errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};


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

const enableValidation = ({ ...data }) => {
  const formArray = Array.from(document.querySelectorAll(data.formSelector));
  formArray.forEach((formElement) => {
    setEventListeners(formElement, data.inputErrorClass, data.errorClass, data.inputSelector, data.submitButtonSelector, data.inactiveButtonClass);
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error',
});
