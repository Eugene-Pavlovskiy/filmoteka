import getRefs from './refs';
import { trendingPagination, onFormInput, onHomeClick, onFormInputDebounce } from './search';
import { loadWatched, loadQueue, updateWatchedOnClick, updateQueueOnClick } from './library';
import { getButton } from './adding-to-library';
import { onCardClick } from './modal';
const refs = getRefs();

refs.logo.addEventListener('click', navToHome);
refs.home.addEventListener('click', navToHome);
refs.library.addEventListener('click', navToLibrary);
refs.galleryTrending.addEventListener('click', onCardClick);

refs.galleryTrending.addEventListener('click', getButton);

// добавляет слушатель на меню пагинации для переключения между страницами популярных фильмов
refs.paginationMenu.addEventListener('click', trendingPagination);
// добавляет слушатель на строку для поиска

// const onFormInputDebounce = debounce(onFormInput, 400);
refs.form.addEventListener('input', onFormInputDebounce);

function navToHome(e) {
  e.preventDefault();
  refs.library.classList.remove('nav-link-current');
  refs.home.classList.add('nav-link-current');
  refs.searchForm.classList.remove('is-hidden');
  refs.btnsLibrary.classList.add('is-hidden');
  refs.overlay.classList.remove('library-open');
  refs.galleryTrending.removeEventListener('click', updateWatchedOnClick);
  refs.galleryTrending.removeEventListener('click', updateQueueOnClick);
  // сюда подключить отрисовку популярных фильмов
  onHomeClick();
}

function navToLibrary(e) {
  refs.paginationMenu.removeEventListener('click', trendingPagination);
  e.preventDefault();
  refs.library.classList.add('nav-link-current');
  refs.home.classList.remove('nav-link-current');
  refs.searchForm.classList.add('is-hidden');
  refs.btnsLibrary.classList.remove('is-hidden');
  refs.overlay.classList.add('library-open');
  showWatched();
  refs.galleryTrending.removeEventListener('click', updateWatchedOnClick);
  refs.galleryTrending.addEventListener('click', updateWatchedOnClick);
}

// function updateWatchedOnClick(e) {
//   const btn = e.target;
//   if (btn.dataset.action === 'toggle-watched' || btn.dataset.action === 'toggle-queue') {
//     loadWatched();
//   }
// }

// function updateQueueOnClick(e) {
//   const btn = e.target;
//   if (btn.dataset.action === 'toggle-watched' || btn.dataset.action === 'toggle-queue') {
//     loadQueue();
//   }
// }

// переключение кнопок Просмотр/Очередь

refs.btnWatched.addEventListener('click', showWatched);
refs.btnQueue.addEventListener('click', showQueue);

function showWatched() {
  refs.btnWatched.classList.add('btn-active');
  refs.btnQueue.classList.remove('btn-active');

  refs.galleryTrending.removeEventListener('click', updateWatchedOnClick);
  refs.galleryTrending.addEventListener('click', updateWatchedOnClick);
  // сюда подключить список просмотренных
  loadWatched();
}

function showQueue() {
  refs.btnQueue.classList.add('btn-active');
  refs.btnWatched.classList.remove('btn-active');

  refs.galleryTrending.removeEventListener('click', updateQueueOnClick);
  refs.galleryTrending.addEventListener('click', updateQueueOnClick);
  // сюда подключить очередь просмотра
  loadQueue();
}
