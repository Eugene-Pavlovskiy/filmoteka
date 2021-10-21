import getRefs from './refs';
import { getWatchedMovies, getQueueMovies, getCurrentColection } from './api';
import { updateGallery } from './updateGallery';
import { appendMarkUp, makeMarkUp } from './mark-up';
// import { forListenerRemoval } from './search';

const refs = getRefs();

let forListenerRemoval = null;

const libPagWatched = libraryPagination(getWatchedMovies);
const libPagQueue = libraryPagination(getQueueMovies);

function loadWatched() {
  sessionStorage.setItem('pageCounter', 1);

  appendMarkUp(getWatchedMovies, false);

  // refs.paginationMenu.removeEventListener('click', forListenerRemoval);
  refs.paginationMenu.removeEventListener('click', libPagQueue);
  refs.paginationMenu.addEventListener('click', libPagWatched);
}

// refs.paginationMenu.removeEventListener('click', libPagQueue);
// refs.paginationMenu.removeEventListener('click', libPagWatched);

function loadQueue() {
  sessionStorage.setItem('pageCounter', 1);

  appendMarkUp(getQueueMovies, false);

  refs.paginationMenu.removeEventListener('click', libPagWatched);
  refs.paginationMenu.addEventListener('click', libPagWatched);
}

function libraryPagination(callBack) {
  return function (e) {
    updateGallery(e, callBack);
  };
}

function updateWatchedOnClick(e) {
  const btn = e.target;
  if (btn.dataset.action === 'toggle-watched' || btn.dataset.action === 'toggle-queue') {
    loadWatched();
    refs.galleryTrending.classList.remove('animation');
    // console.log(refs.galleryTrending);
  }
}

function updateQueueOnClick(e) {
  const btn = e.target;
  if (btn.dataset.action === 'toggle-watched' || btn.dataset.action === 'toggle-queue') {
    loadQueue();
    refs.galleryTrending.classList.remove('animation');
  }
}

function updateMainGal(e) {
  const btn = e.target;
  if (btn.dataset.action !== 'toggle-watched' && btn.dataset.action !== 'toggle-queue') {
    return;
  }
  appendMarkUp(getCurrentColection, false);
  refs.galleryTrending.classList.remove('animation');
}

export {
  loadWatched,
  loadQueue,
  updateWatchedOnClick,
  updateQueueOnClick,
  updateMainGal,
  libPagWatched,
  libPagQueue,
};
