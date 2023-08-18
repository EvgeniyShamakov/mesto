const selectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
};

function showInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.style.borderBottom = "1px solid red";
  errorElement.textContent = inputElement.validationMessage;
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
  });
};

function toggleButtonState(inputList, buttonElement, selectors) {
  if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(selectors.inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
  } else {
      buttonElement.classList.remove(selectors.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
  }
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.style.borderBottom = "1px solid rgba(0, 0, 0, 0.2)";
  errorElement.textContent = '';
};

function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement);
  } else {
      hideInputError(formElement, inputElement);
  }
};

function setEventListeners(formElement, selectors) {
  const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
  const buttonElement = formElement.querySelector(selectors.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, selectors);

  inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function() {
          checkInputValidity(formElement, inputElement, selectors);
          toggleButtonState(inputList, buttonElement, selectors);
      });
  });
};

function enableValidation(selectors) {
  const formList = Array.from(document.querySelectorAll(selectors.formSelector));
  formList.forEach((formElement) => {
      formElement.addEventListener('submit', function(evt) {
          evt.preventDefault();
      });
      formElement.setAttribute('novalidate', true);
      setEventListeners(formElement, selectors);
  });
};

enableValidation(selectors);