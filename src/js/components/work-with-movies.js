import getRefs from './refs';
import { getWatchedMovies, getQueueMovies } from './api';

const refs = getRefs();

let moviesArr = null;

async function getMovies(callBack, page) {
  // callBack === getWatchedMovies;
  if (callBack === getWatchedMovies || callBack === getQueueMovies) {
    return callBack(page);
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
      id,
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
      id,
    });
    formatedMovies[i].genres = genresArr[i];
    formatedMovies[i].formated = true;
    formatedMovies[i].index = i;

    if (formatedMovies[i].genres.length > 3) {
      formatedMovies[i].genresMin = formatedMovies[i].genres.slice(0, 3);
      formatedMovies[i].genresMin.push('Other');
    } else {
      formatedMovies[i].genresMin = formatedMovies[i].genres.slice(0, 3);
    }

    formatedMovies[i].genresMin = formatedMovies[i].genresMin.join(', ');

    if (formatedMovies[i].genresMin.length < 1) {
      formatedMovies[i].genresMin = 'unknown';
    }

    if (formatedMovies[i].release_date === undefined) {
      formatedMovies[i].release_date = 'un';
    }
    formatedMovies[i].release_date = formatedMovies[i].release_date.slice(0, 4);
  }

  moviesArr = formatedMovies;
  // saveGallery(formatedMovies);
  return formatedMovies;
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
