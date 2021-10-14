import { debounce } from 'lodash';
import getRefs from './refs';
import { fetchTrendingMovies, fetchMovies, getWatchedMovies, getQueueMovies } from './api';
import { updateGallery } from './updateGallery';
import { appendMarkUp } from './mark-up';
import { trendingPagination } from './search';

const refs = getRefs();

let forListenerRemoval = null;

function loadWatched() {
  sessionStorage.setItem('pageCounter', 1);

  appendMarkUp(getWatchedMovies);

  // refs.paginationMenu.removeEventListener('click', forListenerRemoval);
  refs.paginationMenu.removeEventListener('click', trendingPagination);
  refs.paginationMenu.removeEventListener('click', libraryPagination(getQueueMovies));
  refs.paginationMenu.addEventListener('click', libraryPagination(getWatchedMovies));
}

function loadQueue() {
  sessionStorage.setItem('pageCounter', 1);

  appendMarkUp(getQueueMovies);

  refs.paginationMenu.removeEventListener('click', libraryPagination(getWatchedMovies));
  refs.paginationMenu.addEventListener('click', libraryPagination(getQueueMovies));
}

// function libraryPagination(e) {
//   updateGallery(e, getWatchedMovies);
// }

function libraryPagination(callBack) {
  return function (e) {
    updateGallery(e, callBack);
  };
}

export { loadWatched, loadQueue };
