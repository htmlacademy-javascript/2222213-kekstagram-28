import {getObjects} from './data.js';
import {showBigPicture} from './fullsize.js';

const similarListElement = document.querySelector('.pictures');
const similarPictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const similarPictures = getObjects();

const renderSimilarList = () => {

  const similarListFragment = document.createDocumentFragment();

  similarPictures.forEach((obj) => {
    const pictureElement = similarPictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = obj.url;
    pictureElement.querySelector('.picture__likes').textContent = obj.likes;
    pictureElement.querySelector('.picture__comments').textContent = obj.comment.length;
    pictureElement.addEventListener('click', (evt) => {
      evt.stopPropagation();
      showBigPicture(obj);

    });
    similarListFragment.append(pictureElement);
  });

  similarListElement.append(similarListFragment);
};

const clearSimilarList = () => {
  similarListElement.innerHTML = '';
};

export {renderSimilarList, clearSimilarList};
