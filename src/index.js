import './sass/main.scss';
import getRefs from './js/components/refs';
import { getAllGenres, fetchTrendingMovies, getWatchedMovies } from './js/components/api';
import { appendMarkUp } from './js/components/mark-up';
import './js/components/nav';
import { moviesArr } from './js/components/work-with-movies';

getAllGenres();
// изначальные настройки при открытии страницы

// получение рефов
const refs = getRefs();
// установка счетчика страниц на 1
sessionStorage.setItem('pageCounter', 1);
// получение массива жанров с их ид
// изначальное добавление разметки популярных фильмов
appendMarkUp(fetchTrendingMovies).then(() => refs.spiner.classList.add('loaded'));

refs.galleryTrending.addEventListener('click', onCardClick);

function onCardClick(e) {
  if (e.target.nodeName !== 'LI') {
    console.log('ne li');
    return;
  }
  console.log(moviesArr);

  console.log(e.target.dataset.index);

  const index = e.target.dataset.index;

  addToWatched(moviesArr[index]);

  // return moviesArr[index];
}

function addToWatched(movie) {
  let watchedMoviesArr = JSON.parse(localStorage.getItem('moviesInWatched'));
  if (!watchedMoviesArr) {
    watchedMoviesArr = [];
  }

  watchedMoviesArr.push(movie);

  const arch = JSON.stringify(watchedMoviesArr);

  localStorage.setItem('moviesInWatched', arch);
}
