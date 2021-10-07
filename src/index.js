import './sass/main.scss';
import makeCard from './palets/card.hbs';

const refs = {
  search: document.querySelector('.search-input'),
  galleryTrending: document.querySelector('.gallery-trending__list'),
  clearBtn: document.querySelector('.js-first-btn'),
  paginationMenu: document.querySelector('.pagination'),
};

const genres = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary,' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
];

refs.search.addEventListener('input', e => console.log(e.target.value));

let pageCounter = 1;

let totalPages = 0;

const KEY = '94f703750c3e0771d8c2babc592efc94';

// функция которая возвращает массив объектов фильмов, аргументом передаеться номер страницы для пагинации (колекция популярных фильмов)

async function fetchTrendingMovies(pageNum) {
  const firstRespons = await fetch(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=${KEY}&page=${pageNum}`,
  );

  const parsedRespons = await firstRespons.json();

  totalPages = parsedRespons.total_pages;

  // с сервера приходит объект запроса, массив с фильмами в свойстве result
  return parsedRespons.results;
}

// обрабатывает полученный массив фильмов убирая ненужные свойства и преобразуя id жанров в слова
async function getMovies(callBack, page) {
  const movies = await callBack(page);

  const genresArr = movies.map(getGenres);

  const formatedMovies = [];

  for (let i = 0; i < movies.length; i++) {
    const { id, title, release_date, poster_path, vote_average } = movies[i];
    formatedMovies.push({ id, title, release_date, poster_path, vote_average });
    formatedMovies[i].genres = genresArr[i];

    if (formatedMovies[i].genres.length > 3) {
      formatedMovies[i].genres = formatedMovies[i].genres.slice(0, 3);
      formatedMovies[i].genres.push('Other');
    }

    formatedMovies[i].genres = formatedMovies[i].genres.join(', ');
  }

  return formatedMovies;
}

getMovies(fetchTrendingMovies, 1);

// функция для превращенния жанров (изначально в объекте фильма в свойстве жанры хранятся id) в читабельный вариант
function getGenres({ genre_ids: gen }) {
  const gens = [];

  // перебирает массив id жанров в фильме, сравнивает с существующим массивом и формирует новый индивидуальный массив для одного фильма
  for (let i = 0; i < gen.length; i += 1) {
    for (let j = 0; j < genres.length; j += 1) {
      if (genres[j].id === gen[i]) {
        gens.push(genres[j].name);
      }
    }
  }

  // возвращает массив жанров словами
  return gens;
}

// getFormatedMovies();

// возможные размеры для постера

// "poster_sizes": [
//       "w92",
//       "w154",
//       "w185",
//       "w342",
//       "w500",
//       "w780",
//       "original"
//     ]

// size examples - w500
async function getPoster(size, { poster_path }) {
  const poster = await fetch(`https://image.tmdb.org/t/p/${size}&w780${poster_path}`);
  console.log(poster);
  return poster;
}

async function makeMarkUp() {
  const movies = await getMovies(fetchTrendingMovies, 1);

  const markUp = movies.map(makeCard).join('');

  return markUp;
}

// console.log(makeMarkUp());

async function appendMarkUp() {
  refs.galleryTrending.insertAdjacentHTML('beforeend', await makeMarkUp());
}

function clearPage() {
  refs.galleryTrending.innerHTML = '';
}

refs.paginationMenu.addEventListener('click', clearPage);

appendMarkUp();

// fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${KEY}&page=2`)
//   .then(e => e.json())
//   .then(e => console.log(e.results));
