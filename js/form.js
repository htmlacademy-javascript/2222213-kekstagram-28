import './fullsize.js';
import { isEscapeKey } from './util.js';
import { resetScale } from './scale.js';
import { resetEffects } from './effect.js';
import { sendData } from './api.js';

const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG = 5;
const HASHTAG_ERROR_TEXT = 'НЕПРАВИЛЬНО ЗАПОЛНЕНЫ ХЭШТЕГИ';

const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

const form = document.querySelector('.img-upload__form');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const upload = document.querySelector('#upload-file');
const body = document.querySelector('body');
const uploadCancel = document.querySelector('#upload-cancel');
const hashtagText = document.querySelector('.text__hashtags');
const commentText = document.querySelector('.text__description');
const submitButton = document.querySelector('.img-upload__submit');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

upload.addEventListener('change', () => {
  resetScale();
  resetEffects();
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      uploadOverlay.classList.add('hidden');
      body.classList.remove('modal-open');
    }
  });
});

const uploadModalClose = () => {
  form.reset();
  resetScale();
  resetEffects();
  pristine.reset();
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  upload.value = '';
};

uploadCancel.addEventListener('click', () => {
  uploadModalClose();
});


const isValidTag = (tag) => VALID_SYMBOLS.test(tag);

const validCount = (tags) => tags.length <= MAX_HASHTAG;

const uniqueHashtag = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateTags = (value) => {
  const tags = value.trim().split(' ').filter((tag) => tag.trim().length);
  return validCount(tags) && uniqueHashtag(tags) && tags.every(isValidTag);
};

pristine.addValidator(hashtagText, validateTags, HASHTAG_ERROR_TEXT);

const onFormSubmit = () => {
  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      const formData = new FormData(form);
      blockSubmitButton();
      await sendData(formData);
      unblockSubmitButton();
    }
  });
};

submitButton.addEventListener('click', () => {
  onFormSubmit();
});

commentText.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
});

hashtagText.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
});

export {uploadModalClose, unblockSubmitButton};
