import './sass/main.scss';
import makeCard from './palets/card.hbs';

const refs = {
  search: document.querySelector('.search-input'),
  galleryTrending: document.querySelector('.gallery-trending__list'),
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

const KEY = '94f703750c3e0771d8c2babc592efc94';

// функция которая возвращает массив объектов фильмов, аргументом передаеться номер страницы для пагинации (колекция популярных фильмов)

async function fetchMovies(pageNum) {
  const firstRespons = await fetch(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=${KEY}&page=${pageNum}`,
  );

  const parsedRespons = await firstRespons.json();

  // с сервера приходит объект запроса, массив с фильмами в свойстве result
  return parsedRespons.results;
}

// обрабатывает полученный массив приводя каждый объект фильма в новый формат(правильная ссылка на постер, жанры словами(в оригинальном массиве только id) и т.д.)
async function getFormatedMovies() {
  const movies = await fetchMovies(1);

  const g = movies.map(getGenres);
  // const posters = movies.map()

  // console.log('g: ', g);
  return g;
}

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

getFormatedMovies();

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

// fetchMovies(1).then(r => console.log(r[0]));

// async function a(num) {
//   const arr = await fetchMovies(num);
//   // console.log(arr[0].poster_path);
//   const poster = await fetch(`https://image.tmdb.org/t/p/w342${arr[0].poster_path}`);
//   // console.log(poster);
// }

// a(1);

async function makeMarkUp() {
  const movies = await fetchMovies(1);
  const genres = movies.map(getGenres);

  for (let i = 0; i < movies.length; i++) {
    movies[i].genre_ids = genres[i].join(', ');
    movies[i].release_date = movies[i].release_date.slice(0, 4);

    console.log(genres[i].join(' '));
  }

  const markUp = movies.map(makeCard).join('');

  console.log(movies[0]);
  // console.log('markup: ', markUp);
  return markUp;
}

// console.log(makeMarkUp());

async function appendMarkUp() {
  refs.galleryTrending.insertAdjacentHTML('beforeend', await makeMarkUp());
}

appendMarkUp();
