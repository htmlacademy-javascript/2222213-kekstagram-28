import {getObjects} from './data.js';

const FullDisplay = document.querySelector('.overlay');
FullDisplay.classList.remove('hidden');

const similarListElement = FullDisplay.querySelector('.big-picture__img');
const similarPictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const similarPictures = getObjects();

const similarListFragment = document.createDocumentFragment();

similarPictures.forEach(({url, likes, comment}) => {
  const pictureElement = similarPictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comment.length;
  similarListFragment.append(pictureElement);
});

similarListElement.append(similarListFragment);
