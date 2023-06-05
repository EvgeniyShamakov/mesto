let popup = document.querySelector('.popup');
let editButton  = document.querySelector('.profile__edit');
let closeButton = document.querySelector('.popup__close');
let profileName = document.querySelector('.profile__title');
let jobName = document.querySelector('.profile__description');
let popupInputName =  document.querySelector('.popup__input_name');
let popupInputJob = document.querySelector('.popup__input_job');
let submitButton = document.querySelector('.popup__button');

function openPopup () {
  popup.classList.add('popup__opened');
};

function closePopup () {
  popup.classList.remove('popup__opened');
};

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

function submitForm (evt) {
    evt.preventDefault(); 

    profileName.textContent = popupInputName.value;
    jobName.textContent = popupInputJob.value;
    closePopup();
}

submitButton.addEventListener('click', submitForm); 