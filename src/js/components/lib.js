import getRefs from './refs';
const refs = getRefs();
import { debounce } from 'lodash';
import { moviesArr } from './work-with-movies';
import {
  getAllGenres,
  fetchTrendingMovies,
  fetchMovies,
  getWatchedMovies,
  getQueueMovies,
} from './api';

// refs.galleryTrending.addEventListener('click', getButton);

function getButton(e) {
  // console.dir(e.target);
  // console.log(e.target.dataset.action);
  posteToLibrary(e);
  // sync();
}

// console.log(localStorage);
const movies = JSON.parse(localStorage.getItem('currentColection'));
// console.log(movies);
// console.log(movies[0].title);

let watchedMovies = [];
let queueMovies = [];

function posteToLibrary(e) {
  const posterClicked = e.target;
  // console.log(e.currentTarget);
  // const posterTitle = posterClicked.closest('.card-thumb').children[1].textContent;

  if (e.target.nodeName !== 'BUTTON') {
    // console.log('ne LI');
    return;
  }

  const index = e.target.dataset.index;
  const btn = e.target;

  // addToWatched(moviesArr[index]);

  // addToLibrary(moviesArr[index], btn);

  if (posterClicked.dataset.action === 'toggle-watched') {
    // console.log('Добавить к просмотренным', posterTitle);
    addToWatched(moviesArr[index], btn);
    // console.log(watchedMovies);
    // localStorage.setItem('watched library', JSON.stringify(watchedMovies));
  } else if (posterClicked.dataset.action === 'toggle-queue') {
    // console.log('Добавить в очередь', posterTitle);
    addToQueue(moviesArr[index], btn);
    // console.log(queueMovies);
  } else {
    // console.log('Ничего не делай');
  }
}

function addToWatched(movie, btn) {
  // const movieToAdd = movies.find(movie => movie.title === title);
  // return watchedMovies.push(movieToAdd);

  let watchedMoviesArr = JSON.parse(localStorage.getItem('moviesInWatched'));
  let queueMoviesArr = JSON.parse(localStorage.getItem('moviesInQueue'));
  if (!watchedMoviesArr) {
    watchedMoviesArr = [];
  }

  if (!queueMoviesArr) {
    queueMoviesArr = [];
  }

  const includedInWatched = watchedMoviesArr.find(el => el.id === movie.id);
  const includedInQueue = queueMoviesArr.find(el => el.id === movie.id);
  // const btn = document.querySelector(`[data-index="${btnIndex}"]`);

  const indexInW = watchedMoviesArr.indexOf(includedInQueue);
  const indexInQ = queueMoviesArr.indexOf(includedInQueue);

  if (includedInWatched && includedInQueue) {
    // includedInWatched.addedToWatched = false;
    watchedMoviesArr.splice(indexInW, 1);

    btn.classList.remove('btn-active');
    btn.textContent = 'Add to watched';

    queueMoviesArr[indexInQ].addedToWatched = false;
  } else if (includedInWatched) {
    const index = watchedMoviesArr.indexOf(includedInWatched);

    // includedInWatched.addedToWatched = false;
    watchedMoviesArr.splice(index, 1);

    btn.classList.remove('btn-active');
    btn.textContent = 'Add to watched';
  } else {
    if (includedInQueue) {
      movie.addedToQueue = true;
      queueMoviesArr[indexInQ].addedToWatched = true;
    }
    btn.classList.add('btn-active');
    btn.textContent = 'Remove from watched';
    movie.addedToWatched = true;
    watchedMoviesArr.push(movie);
  }

  const archQ = JSON.stringify(queueMoviesArr);
  const archW = JSON.stringify(watchedMoviesArr);

  localStorage.setItem('moviesInQueue', archQ);
  localStorage.setItem('moviesInWatched', archW);
}

function addToQueue(movie, btn) {
  // const movieToAdd = movies.find(movie => movie.title === title);
  // return queueMovies.push(movieToAdd);

  let queueMoviesArr = JSON.parse(localStorage.getItem('moviesInQueue'));
  let watchedMoviesArr = JSON.parse(localStorage.getItem('moviesInWatched'));
  if (!queueMoviesArr) {
    queueMoviesArr = [];
  }

  if (!watchedMoviesArr) {
    watchedMoviesArr = [];
  }

  const includedInQueue = queueMoviesArr.find(el => el.id === movie.id);
  const includedInWatched = watchedMoviesArr.find(el => el.id === movie.id);

  // console.log(includedInWatched);
  // const btn = document.querySelector(`[data-index="${btnIndex}"]`);

  const indexInQ = queueMoviesArr.indexOf(includedInQueue);
  const indexInW = watchedMoviesArr.indexOf(includedInWatched);

  if (includedInQueue && includedInWatched) {
    // includedInQueue.addedToQueue = false;
    queueMoviesArr.splice(indexInQ, 1);

    btn.classList.remove('btn-active');
    btn.textContent = 'Add to queue';

    // queueMoviesArr[indexInQ].splice(indexInQ, 1);
    watchedMoviesArr[indexInW].addedToQueue = false;
  } else if (includedInQueue) {
    const index = queueMoviesArr.indexOf(includedInQueue);

    // includedInQueue.addedToQueue = false;
    queueMoviesArr.splice(index, 1);

    btn.classList.remove('btn-active');
    btn.textContent = 'Add to queue';
  } else {
    if (includedInWatched) {
      movie.addedToWatched = true;
      watchedMoviesArr[indexInW].addedToQueue = true;
    }
    btn.classList.add('btn-active');
    btn.textContent = 'Remove from queue';
    movie.addedToQueue = true;
    queueMoviesArr.push(movie);
  }

  // queueMoviesArr.push(movie);

  const archQ = JSON.stringify(queueMoviesArr);
  const archW = JSON.stringify(watchedMoviesArr);

  localStorage.setItem('moviesInQueue', archQ);
  localStorage.setItem('moviesInWatched', archW);
}

export { addToWatched, addToQueue, getButton };
