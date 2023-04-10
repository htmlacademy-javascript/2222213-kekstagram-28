const STEP = 25;
const MIN_STEP = 25;
const MAX_STEP = 100;
const DEFAULT = 100;

const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');
const controlValue = document.querySelector('.scale__control--value');
const imageElement = document.querySelector('.img-upload__preview img');

const scaleImage = (value) => {
  imageElement.style.transform = `scale(${value / 100})`;
  controlValue.value = `${value}%`;
};

const onSmallerButtonClick = () => {
  const newElement = parseInt(controlValue.value, 10);
  let newValue = newElement - STEP;
  if(newValue < MIN_STEP) {
    newValue = MIN_STEP;
  }
  scaleImage(newValue);
};

const onBiggerButtonClick = () => {
  const newElement = parseInt(controlValue.value, 10);
  let newValue = newElement + STEP;
  if(newValue > MAX_STEP) {
    newValue = MAX_STEP;
  }
  scaleImage(newValue);
};

const resetScale = () => scaleImage(DEFAULT);

smallerButton.addEventListener('click', onSmallerButtonClick);
biggerButton.addEventListener('click', onBiggerButtonClick);

export {resetScale};
