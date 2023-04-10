import {showBigPicture} from './fullsize.js';

const similarListElement = document.querySelector('.pictures');
const similarPictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const renderSimilarList = (objects) => {

  const similarListFragment = document.createDocumentFragment();

  objects.forEach((obj) => {
    const pictureElement = similarPictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = obj.url;
    pictureElement.querySelector('.picture__likes').textContent = obj.likes;
    pictureElement.querySelector('.picture__comments').textContent = obj.comments.length;
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
