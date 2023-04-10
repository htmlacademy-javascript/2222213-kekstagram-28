import {isEscapeKey} from './util.js';
import './rendering.js';
import './count.js';


const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

const userPictureElement = document.querySelector('.big-picture');
const commentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const body = document.querySelector('body');
const userPictureCloseElement = document.querySelector('.big-picture__cancel');


const showBigPicture = (obj) => {
  userPictureElement.classList.remove('hidden');
  body.classList.add('modal-open');
  commentsLoader.classList.add('hidden');
  commentCount.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeydown);

  userPictureElement.querySelector('.social__caption').textContent = obj.description;

  userPictureElement.querySelector('.big-picture__img img').src = obj.url;
  userPictureElement.querySelector('.likes-count').textContent = obj.likes;

  const commentsListElement = userPictureElement.querySelector('.social__comments');
  commentsListElement.innerHTML = '';
  const showComments = (comments) => {
    comments.forEach((element) => {
      const liElement = document.createElement('li');
      liElement.classList.add('social__comment');

      const imgElement = document.createElement('img');
      imgElement.classList.add('social__picture');
      imgElement.src = element.avatar;
      imgElement.alt = element.name;

      const socialText = document.createElement('p');
      socialText.classList.add('social__text');
      socialText.textContent = element.message;

      liElement.append(imgElement, socialText);

      commentsListElement.append(liElement);
    });
  };

  const START = 0;
  const STEP = 5;

  let showedComments = [];
  let currentlength = 5;

  const getComments = (currentStart, length) => {
    if (currentlength === obj.comments.length) {
      commentsLoader.classList.add('hidden');
    }
    commentCount.textContent = `${currentlength} из ${obj.comments.length}`;
    showedComments = [];
    commentsListElement.innerHTML = '';

    for (let index = currentStart; index < length; index++) {
      const element = obj.comments[index];
      showedComments.push(element);
    }
    if ((currentlength + STEP) <= obj.comments.length) {
      currentlength = currentlength + STEP;
    } else {
      const diff = obj.comments.length - currentlength;
      currentlength = currentlength + diff;
    }
  };

  if (obj.comments.length <= currentlength) {
    showComments(obj.comments);
  } else if (obj.comments.length > currentlength) {
    getComments(START, currentlength);
    showComments(showedComments);
    commentCount.classList.remove('hidden');
    commentsLoader.classList.remove('hidden');
  }

  commentsLoader.addEventListener('click', () => {
    getComments(START, currentlength);
    showComments(showedComments);
  });
};


function closeUserModal () {
  userPictureElement.classList.add('hidden');

  document.addEventListener('keydown', onDocumentKeydown);
}

userPictureCloseElement.addEventListener('click', () => {
  closeUserModal();
});

export {showBigPicture};
