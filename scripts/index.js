const profilePopup = document.querySelector('.popup_profile');
const elementPopup = document.querySelector('.popup_element');
const picturePopup = document.querySelector('.popup_picture');
const profileButton = document.querySelector('.profile__edit');
const elementButton = document.querySelector('.profile__button');
const popupImage = document.querySelector('.popup__picture_image');
const popupImageTitle = document.querySelector('.popup__picture_title');
const popupProfileButton = document.querySelector('.popup__close_profile');
const popupElementButton = document.querySelector('.popup__close_element');
const popupPictureButton = document.querySelector('.popup__close_picture');
const profilePopupForm = document.querySelector('.popup__form[name="profile-form"]');
const elementPopupForm = document.querySelector('.popup__form[name="element-form"]');
const elements = document.querySelector('.elements');

let profileName = document.querySelector('.profile__title');
let jobName = document.querySelector('.profile__description');
let popupInputName = document.querySelector('.popup__field_value_name');
let popupInputJob = document.querySelector('.popup__field_value_job');
let popupInputElementName = document.querySelector('.popup__field_element_name');
let popupInputElementLink = document.querySelector('.popup__field_element_link');

function openPopup() {
    profilePopup.classList.add('popup_opened');
    popupInputName.value = profileName.textContent;
    popupInputJob.value = jobName.textContent;
    profilePopupForm.onsubmit = submitForm;
    document.addEventListener("keydown", this.handleEscape);
};

function closePopup() {
    profilePopup.classList.remove('popup_opened');
};

function openElementPopup() {
    elementPopup.classList.add('popup_opened');
    popupInputElementName.value = '';
    popupInputElementLink.value = '';
    elementPopupForm.onsubmit = submitElementForm;
};

function closeElementPopup() {
    elementPopup.classList.remove('popup_opened');
};

function openPicturePopup(name, link) {
    picturePopup.classList.add('popup_opened');
    popupImage.setAttribute('src', link);
    popupImage.setAttribute('alt', name);
    popupImageTitle.textContent = (name);
};

function closePicturePopup() {
    picturePopup.classList.remove('popup_opened');
};

profileButton.addEventListener('click', openPopup);

popupProfileButton.addEventListener('click', closePopup);

elementButton.addEventListener('click', openElementPopup);
popupElementButton.addEventListener('click', closeElementPopup);

popupPictureButton.addEventListener('click', closePicturePopup);

function submitForm(evt) {
    evt.preventDefault();
    profileName.textContent = popupInputName.value;
    jobName.textContent = popupInputJob.value;
    closePopup();
}

function submitElementForm(evt) {
    evt.preventDefault();
    const element = createCardElement(popupInputElementName.value, popupInputElementLink.value);
    elements.prepend(element);
    closeElementPopup();
}

const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

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
        openPicturePopup(name, link)
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

function handleEscape(evt) {
    if (evt.key === "Escape") {
        this.close();
    }
}