// надо добавить єто в refs
const logo = document.querySelector('.js-logo');
const home = document.querySelector('.js-nav-home');
const library = document.querySelector('.js-nav-library');
const overlay = document.querySelector('.js-overlay');
const searchForm = document.querySelector('#search-form');
const btnsLibrary = document.querySelector('[data-action="btn-library-show"]');
const btnWatched = document.querySelector('[data-action="btn-watched"]');
const btnQueue = document.querySelector('[data-action="btn-queue"]');
//и потом импортнуть GetRefs

logo.addEventListener('click', navToHome);
home.addEventListener('click', navToHome);
library.addEventListener('click', navToLibrary);

function navToHome() {
  library.classList.remove('nav-link-current');
  home.classList.add('nav-link-current');
  searchForm.classList.remove('is-hidden');
  btnsLibrary.classList.add('is-hidden');
  overlay.classList.remove('library-open');
}

function navToLibrary(e) {
  e.preventDefault();
  library.classList.add('nav-link-current');
  home.classList.remove('nav-link-current');
  searchForm.classList.add('is-hidden');
  btnsLibrary.classList.remove('is-hidden');
  overlay.classList.add('library-open');
  showWatched();
}

console.log(overlay);

// переключение кнопок Просмотр/Очередь

btnWatched.addEventListener('click', showWatched);
btnQueue.addEventListener('click', showQueue);

function showWatched() {
  btnWatched.classList.add('btn-active');
  btnQueue.classList.remove('btn-active');
}

function showQueue() {
  btnQueue.classList.add('btn-active');
  btnWatched.classList.remove('btn-active');
}
