const socialLikes = document.querySelector('.social__likes');
const likesNumber = document.querySelector('.likes-count');

socialLikes.addEventListener('click', () => {
  if (socialLikes.classList.contains('added')) {
    likesNumber.textContent--;
  } else {
    likesNumber.textContent++;
  }
  socialLikes.classList.toggle('added');
});
