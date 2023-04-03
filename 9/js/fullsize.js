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

  obj.comment.forEach((element) => {
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

function closeUserModal () {
  userPictureElement.classList.add('hidden');

  document.addEventListener('keydown', onDocumentKeydown);
}

userPictureCloseElement.addEventListener('click', () => {
  closeUserModal();
});

export {showBigPicture};
