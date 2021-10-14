import getRefs from './refs';
import { getWatchedMovies, getQueueMovies } from './api';

const refs = getRefs();

let moviesArr = null;

async function getMovies(callBack, page) {
  if (callBack === getWatchedMovies || callBack === getQueueMovies) {
    const m = callBack(page);
    for (let i = 0; i < m.length; i++) {
      m[i].index = i;
    }
    saveGallery(m);
    return m;
  }
  const movies = await callBack(page);

  if (movies === undefined || movies === null || movies.length < 1) {
    refs.error.innerHTML = `<div class="error-text">
        Search result not successful. Enter the correct movie name!
      </div>`;
    refs.paginationMenu.classList.add('visually-hidden');
    return 0;
  }

  refs.error.innerHTML = '';

  if (movies.length <= 20 && sessionStorage.getItem('totalPages') < 2) {
    refs.paginationMenu.classList.add('visually-hidden');
  } else if (refs.paginationMenu.classList.contains('visually-hidden')) {
    refs.paginationMenu.classList.remove('visually-hidden');
  }

  const genresArr = movies.map(getGenres);

  const formatedMovies = [];

  for (let i = 0; i < movies.length; i++) {
    const {
      title,
      id,
      release_date,
      poster_path,
      vote_average,
      overview,
      vote_count,
      original_title,
      popularity,
    } = movies[i];
    formatedMovies.push({
      title,
      id,
      release_date,
      poster_path,
      vote_average,
      overview,
      vote_count,
      original_title,
      popularity,
    });
    formatedMovies[i].genres = genresArr[i];
    formatedMovies[i].formated = true;
    formatedMovies[i].index = i;
    formatedMovies[i].popularity =
      Math.round((formatedMovies[i].popularity + Number.EPSILON) * 10) / 10;

    if (formatedMovies[i].genres.length > 3) {
      formatedMovies[i].genresMin = formatedMovies[i].genres.slice(0, 3);
      formatedMovies[i].genresMin.push('Other');
    } else {
      formatedMovies[i].genresMin = formatedMovies[i].genres.slice(0, 3);
    }

    let str = formatedMovies[i].genresMin.join(', ');

    for (let i = 0; str.length > 31; i++) {
      str = str.split(', ');
      str = str.slice(0, str.length - 2);
      str.push('Other');
      str = str.join(', ');
    }

    formatedMovies[i].genresMin = str;

    if (formatedMovies[i].genresMin.length < 1) {
      formatedMovies[i].genresMin = 'unknown';
    }

    if (formatedMovies[i].release_date === undefined || formatedMovies[i].release_date === '') {
      formatedMovies[i].release_date = 'unknown';
    } else {
      formatedMovies[i].release_date = formatedMovies[i].release_date.slice(0, 4);
    }
  }

  const res = chek(formatedMovies);
  moviesArr = res;
  saveGallery(res);
  return formatedMovies;
}

function chek(moviesArr) {
  let watchedMoviesArr = JSON.parse(localStorage.getItem('moviesInWatched'));
  let queueMoviesArr = JSON.parse(localStorage.getItem('moviesInQueue'));
  if (!watchedMoviesArr) {
    watchedMoviesArr = [];
  }

  if (!queueMoviesArr) {
    queueMoviesArr = [];
  }

  for (let i = 0; i < moviesArr.length; i++) {
    for (let j = 0; j < watchedMoviesArr.length; j++) {
      if (moviesArr[i].id === watchedMoviesArr[j].id) {
        moviesArr[i].addedToWatched = true;
      }
    }

    for (let j = 0; j < queueMoviesArr.length; j++) {
      if (moviesArr[i].id === queueMoviesArr[j].id) {
        moviesArr[i].addedToQueue = true;
      }
    }
  }

  return moviesArr;
}

function getGenres({ genre_ids: gen }) {
  const gens = [];
  const allGenres = JSON.parse(localStorage.getItem('genres'));

  if (!gen) {
    return;
  }

  // перебирает массив id жанров в фильме, сравнивает с существующим массивом и формирует новый индивидуальный массив для одного фильма
  for (let i = 0; i < gen.length; i += 1) {
    for (let j = 0; j < allGenres.length; j += 1) {
      if (allGenres[j].id === gen[i]) {
        gens.push(allGenres[j].name);
      }
    }
  }

  // возвращает массив жанров словами
  return gens;
}

function saveGallery(movies) {
  localStorage.setItem('currentColection', JSON.stringify(movies));
}

export { getMovies, moviesArr };
