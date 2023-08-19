const profilePopup = document.querySelector('.popup_type_profile-edit');
const elementPopup = document.querySelector('.popup_type_element-edit');
const picturePopup = document.querySelector('.popup_type_picture-show');
const profileButton = document.querySelector('.profile__edit');
const elementButton = document.querySelector('.profile__button');
const popupImage = document.querySelector('.popup__picture-image');
const popupImageTitle = document.querySelector('.popup__picture-title');
const closeButtons = document.querySelectorAll('.popup__close');
const profilePopupForm = document.querySelector('.popup__form[name="profile-form"]');
const elementPopupForm = document.querySelector('.popup__form[name="element-form"]');
const elements = document.querySelector('.elements');
const profileName = document.querySelector('.profile__title');
const jobName = document.querySelector('.profile__description');
const popupInputName = document.querySelector('.popup__field_value_name');
const popupInputJob = document.querySelector('.popup__field_value_job');
const popupInputElementName = document.querySelector('.popup__field_element_name');
const popupInputElementLink = document.querySelector('.popup__field_element_link');
const popups = document.querySelectorAll('.popup');
const popupButton = elementPopup.querySelector('.popup__button');

function editProfile() {
    openPopup(profilePopup);
    popupInputName.value = profileName.textContent;
    popupInputJob.value = jobName.textContent;
};

function editElement() {
    openPopup(elementPopup);
    disableButton(popupButton, selectors);
    elementPopupForm.reset();
};

profilePopupForm.addEventListener('submit', submitForm);
elementPopupForm.addEventListener('submit', submitElementForm);

function showPicture(name, link) {
    openPopup(picturePopup);
    popupImage.setAttribute('src', link);
    popupImage.setAttribute('alt', name);
    popupImageTitle.textContent = (name);
};

function openPopup(popupType) {
    popupType.classList.add('popup_opened');
    document.addEventListener('keydown', closeOnEscape)
};

function closePopup(popupType) {
    popupType.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeOnEscape)
};

profileButton.addEventListener('click', editProfile);
elementButton.addEventListener('click', editElement);

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) =>
    {
      if (evt.target.classList.contains('popup_opened'))
        closePopup(popup);
    })
});

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

function closeOnEscape (event) {
    const key = event.key;
    if (key === "Escape") {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
};

function submitForm(evt) {
    evt.preventDefault();
    profileName.textContent = popupInputName.value;
    jobName.textContent = popupInputJob.value;
    closePopup(profilePopup);
}

function submitElementForm(evt) {
    evt.preventDefault();
    const element = createCardElement(popupInputElementName.value, popupInputElementLink.value);
    elements.prepend(element);
    closePopup(elementPopup);
}

function createCardElement(name, link) {
    const elementTemplate = document.querySelector('.elements__template').content;
    const element = elementTemplate.querySelector('.elements__element').cloneNode(true);
    const image = element.querySelector('.elements__image');
    const trash = element.querySelector('.elements__delete');
    const title = element.querySelector('.elements__title');
    const likeButton = element.querySelector('.elements__button');
    image.setAttribute('src', link);
    image.setAttribute('alt', name);
    title.textContent = (name);

    trash.addEventListener('click', () => {
        deleteCardElement(element)
    });
    likeButton.addEventListener('click', () => {
        setLike(likeButton)
    });
    image.addEventListener('click', () => {
        showPicture(name, link)
    });

    return element;
}

initialCards.forEach((el) => {
    const element = createCardElement(el.name, el.link);
    elements.appendChild(element);
});

function setLike(element) {
    element.classList.toggle('elements__button-active');
}

function deleteCardElement(element) {
    element.remove();
}