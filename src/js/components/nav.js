import getRefs from './refs';
const refs = getRefs();

import { onHomeClick } from '../../index';

// import { debounce } from 'lodash';

refs.logo.addEventListener('click', navToHome);
refs.home.addEventListener('click', navToHome);
refs.library.addEventListener('click', navToLibrary);

function navToHome(e) {
  e.preventDefault();
  refs.library.classList.remove('nav-link-current');
  refs.home.classList.add('nav-link-current');
  refs.searchForm.classList.remove('is-hidden');
  refs.btnsLibrary.classList.add('is-hidden');
  refs.overlay.classList.remove('library-open');
  // сюда подключить отрисовку популярных фильмов
  onHomeClick();
}

function navToLibrary(e) {
  e.preventDefault();
  refs.library.classList.add('nav-link-current');
  refs.home.classList.remove('nav-link-current');
  refs.searchForm.classList.add('is-hidden');
  refs.btnsLibrary.classList.remove('is-hidden');
  refs.overlay.classList.add('library-open');
  showWatched();
}

// переключение кнопок Просмотр/Очередь

refs.btnWatched.addEventListener('click', showWatched);
refs.btnQueue.addEventListener('click', showQueue);

function showWatched() {
  refs.btnWatched.classList.add('btn-active');
  refs.btnQueue.classList.remove('btn-active');
  // сюда подключить список просмотренных
}

function showQueue() {
  refs.btnQueue.classList.add('btn-active');
  refs.btnWatched.classList.remove('btn-active');
  // сюда подключить очередь просмотра
}
