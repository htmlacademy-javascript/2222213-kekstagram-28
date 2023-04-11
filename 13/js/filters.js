const PICTURES_COUNT = 10;
const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const filterElement = document.querySelector('.img-filters');
let currentFilter = Filter.DEFAULT;
let pictures = [];

const sortRandom = () => Math.random() - 0.5;

const sortComments = (pictureA, pictureB) =>
  pictureB.comments.length - pictureA.comments.length;

const getFilteredPictures = () => {
  const list = document.querySelector('.pictures');
  const items = list.querySelectorAll('a');
  switch (currentFilter) {
    case Filter.RANDOM:
      items.forEach((item) => {
        item.remove();
      });
      return [...pictures].sort(sortRandom).slice(0, PICTURES_COUNT);
    case Filter.DISCUSSED:
      items.forEach((item) => {
        item.remove();
      });
      return [...pictures].sort(sortComments);
    default:
      items.forEach((item) => {
        item.remove();
      });
      return [...pictures];
  }
};

const setOnFilterClick = (cb) => {
  filterElement.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }

    const clickedButton = evt.target;
    if (clickedButton.id === currentFilter) {
      return;
    }

    filterElement
      .querySelector('.img-filters__button--active')
      .classList.remove('img-filters__button--active');
    clickedButton.classList.add('img-filters__button--active');
    currentFilter = clickedButton.id;
    cb(getFilteredPictures());
  });
};

const init = (loadedPictures, cb) => {
  filterElement.classList.remove('img-filters--inactive');
  pictures = [...loadedPictures];
  setOnFilterClick(cb);
};

export {init, getFilteredPictures};
