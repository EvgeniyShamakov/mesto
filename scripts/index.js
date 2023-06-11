let popup = document.querySelector('.popup');
let editButton  = document.querySelector('.profile__edit');
let closeButton = document.querySelector('.popup__close');
let profileName = document.querySelector('.profile__title');
let jobName = document.querySelector('.profile__description');
let popupInputName =  document.querySelector('.popup__field_value_name');
let popupInputJob = document.querySelector('.popup__field_value_job');
let popupForm = document.querySelector('.popup__form');

function openPopup () {
  popup.classList.add('popup_opened');
  popupInputName.value = profileName.textContent;
  popupInputJob.value = jobName.textContent ;
};

function closePopup () {
  popup.classList.remove('popup_opened');
};

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

function submitForm (evt) {
    evt.preventDefault(); 

    profileName.textContent = popupInputName.value;
    jobName.textContent = popupInputJob.value;
    closePopup();
}

popupForm.addEventListener('submit', submitForm); 