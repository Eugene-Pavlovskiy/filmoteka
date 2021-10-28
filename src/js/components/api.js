// функции для работы с API

const KEY = '94f703750c3e0771d8c2babc592efc94';
const URL = `https://api.themoviedb.org/3/`;

// добавляет в локальное хранилище массив всех возможных жанров который будет использоваться для формирования списка жанров фильма
async function getAllGenres() {
  // if (localStorage.getItem('genres')) {
  //   return;
  // }
  const respons = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${KEY}&language=en-US`,
  );

  const { genres } = await respons.json();

  const kidsGenres = genres.filter(genre => genre.name === 'Family' || genre.name === 'Animation');
  const kidsGenresIDs = kidsGenres.map(g => g.id);

  localStorage.setItem('kidsGenresId', JSON.stringify(kidsGenresIDs));
  localStorage.setItem('genres', JSON.stringify(genres));
}

// получаем ID детских жанров
// const allGenres = localStorage.getItem('genres');
// console.log('allGenres: ', allGenres);
// const kidsGenres = JSON.parse(allGenres).filter(
//   genre => genre.name === 'Family' || genre.name === 'Animation',
// );
// const kidsGenresIDs = kidsGenres.map(g => g.id);

// Функции для детского режима

let searchOpts = `trending/movie/week`;
let searchOpts2 = ``;

async function checkKidsMode() {
  const kidsMode = localStorage.getItem('theme');
  const kidsGenresIDs = JSON.parse(localStorage.getItem('kidsGenresId'));
  if (kidsMode === 'kids-theme') {
    searchOpts = `discover/movie`;
    searchOpts2 = `&with_genres=${kidsGenresIDs[0]}&with_genres=${kidsGenresIDs[1]}&sort_by=popularity.desc`;
  } else {
    searchOpts = `trending/movie/week`;
    searchOpts2 = ``;
  }
}

async function checkKidsLib(films) {
  const kidsMode = localStorage.getItem('theme');
  if (kidsMode === 'kids-theme') {
    films = films.filter(film => film.genres.includes('Animation'));
  } else {
    films;
  }
  return films;
}

// функция для получения массива популярных фильмов (передает в локальное хранили общее количество страниц)
async function fetchTrendingMovies(pageNum) {
  checkKidsMode();
  const firstRespons = await fetch(
    `${URL}${searchOpts}?api_key=${KEY}${searchOpts2}&page=${pageNum}`,
  );
  // `https://api.themoviedb.org/3/trending/movie/week?api_key=${KEY}&page=${pageNum}`,
  // `discover/movie?api_key=${KEY}&with_genres=${kidsGenresIDs[0]}&with_genres=${kidsGenresIDs[1]}&sort_by=popularity.desc&page=${pageNum}`;

  const parsedRespons = await firstRespons.json();

  sessionStorage.setItem('totalPages', parsedRespons.total_pages);

  // с сервера приходит объект запроса, массив с фильмами в свойстве result
  return parsedRespons.results;
}

async function fetchMovies(query) {
  return async function (page) {
    const respons = await fetch(`${URL}search/movie?api_key=${KEY}&query=${query}&page=${page}`);
    const movies = await respons.json();

    sessionStorage.setItem('totalPages', movies.total_pages);
    return movies.results;
  };
}

function getWatchedMovies(pageNum) {
  let movies = JSON.parse(localStorage.getItem('moviesInWatched'));
  const kidsMode = localStorage.getItem('theme');

  if (kidsMode === 'kids-theme') {
    return (movies = JSON.parse(localStorage.getItem('moviesInWatched')).filter(film =>
      film.genres.includes('Family' || 'Animation'),
    ));
  }

  if (!movies) {
    return 0;
  }

  sessionStorage.setItem('totalPages', Math.ceil(movies.length / 20));

  const res = movies.splice((pageNum - 1) * 20, 20);

  return res;
}

function getQueueMovies(pageNum) {
  let movies = JSON.parse(localStorage.getItem('moviesInQueue'));
  const kidsMode = localStorage.getItem('theme');

  if (kidsMode === 'kids-theme') {
    return (movies = JSON.parse(localStorage.getItem('moviesInQueue')).filter(film =>
      film.genres.includes('Family' || 'Animation'),
    ));
  }

  if (!movies) {
    return 0;
  }

  sessionStorage.setItem('totalPages', Math.ceil(movies.length / 20));

  const res = movies.splice((pageNum - 1) * 20, 20);

  return res;
}

function getCurrentColection(pageNum) {
  const movies = JSON.parse(localStorage.getItem('currentColection'));

  if (!movies) {
    return 0;
  }

  // sessionStorage.setItem('totalPages', Math.ceil(movies.length / 20));

  // const res = movies.splice((pageNum - 1) * 20, 20);

  return movies;
}

export {
  getAllGenres,
  fetchTrendingMovies,
  fetchMovies,
  getWatchedMovies,
  getQueueMovies,
  getCurrentColection,
  checkKidsMode,
};
