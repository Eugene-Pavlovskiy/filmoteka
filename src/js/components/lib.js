import getRefs from './refs';
const refs = getRefs();
import { debounce } from 'lodash';
import './api';

refs.galleryTrending.addEventListener('click', getButton);

function getButton(e) {
  console.dir(e.target);
  console.log(e.target.dataset.action);
  posterToLibrary(e);
}

console.log(localStorage);
const movies = JSON.parse(localStorage.getItem('currentColection'));
console.log(movies);
// console.log(movies[0].title);

let watchedMovies = [];
let queueMovies = [];

function posterToLibrary(e) {
  const posterClicked = e.target;
  const posterTitle = posterClicked.closest('.card-thumb').children[1].textContent;

  if (posterClicked.dataset.action === 'toggle-watched') {
    console.log('Добавить к просмотренным', posterTitle);
    addToWatched(posterTitle);
    console.log(watchedMovies);
    localStorage.setItem('watched library', JSON.stringify(watchedMovies));
  } else if (posterClicked.dataset.action === 'toggle-queue') {
    console.log('Добавить в очередь', posterTitle);
    addToQueue(posterTitle);
    console.log(queueMovies);
  } else {
    console.log('Ничего не делай');
  }
}

function addToWatched(title) {
  const movieToAdd = movies.find(movie => movie.title === title);
  return watchedMovies.push(movieToAdd);
}

function addToQueue(title) {
  const movieToAdd = movies.find(movie => movie.title === title);
  return queueMovies.push(movieToAdd);
}
