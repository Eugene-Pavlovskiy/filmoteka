import './sass/main.scss';
import makeCard from './palets/card.hbs';

const refs = {
  search: document.querySelector('.search-input'),
  galleryTrending: document.querySelector('.gallery-trending__list'),
  clearBtn: document.querySelector('.js-first-btn'),
  paginationMenu: document.querySelector('.pagination__container'),
};

const KEY = '94f703750c3e0771d8c2babc592efc94';

// const genres = [
//   { id: 28, name: 'Action' },
//   { id: 12, name: 'Adventure' },
//   { id: 16, name: 'Animation' },
//   { id: 35, name: 'Comedy' },
//   { id: 80, name: 'Crime' },
//   { id: 99, name: 'Documentary,' },
//   { id: 18, name: 'Drama' },
//   { id: 10751, name: 'Family' },
//   { id: 14, name: 'Fantasy' },
//   { id: 36, name: 'History' },
//   { id: 27, name: 'Horror' },
//   { id: 10402, name: 'Music' },
//   { id: 9648, name: 'Mystery' },
//   { id: 10749, name: 'Romance' },
//   { id: 878, name: 'Science Fiction' },
//   { id: 10770, name: 'TV Movie' },
//   { id: 53, name: 'Thriller' },
//   { id: 10752, name: 'War' },
//   { id: 37, name: 'Western' },
// ];

async function getAllGenres() {
  if (localStorage.getItem('genres')) {
    return;
  }
  const respons = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${KEY}&language=en-US`,
  );

  const genres = await respons.json();

  console.log(genres.genres);

  window.localStorage.setItem('genres', JSON.stringify(genres.genres));
}

getAllGenres();

console.log('local: ', JSON.parse(window.localStorage.getItem('genres')));

// refs.search.addEventListener('input', e => console.log(e.target.value));

let pageCounter = 1;

let totalPages = 0;

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

// getMovies(fetchTrendingMovies, pageCounter);

// функция для превращенния жанров (изначально в объекте фильма в свойстве жанры хранятся id) в читабельный вариант
function getGenres({ genre_ids: gen }) {
  const gens = [];
  const allGenres = JSON.parse(localStorage.getItem('genres'));

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

async function makeMarkUp() {
  const movies = await getMovies(fetchTrendingMovies, pageCounter);

  const markUp = movies.map(makeCard).join('');

  return markUp;
}

async function appendMarkUp() {
  clearPage();
  refs.galleryTrending.insertAdjacentHTML('beforeend', await makeMarkUp());
  updatePaginationMenu(pageCounter, totalPages);
}

appendMarkUp();

function clearPage() {
  refs.galleryTrending.innerHTML = '';
}

function updatePaginationMenu(page, totalPages = 20) {
  let markUp = '';

  refs.paginationMenu.innerHTML = '';

  if (page < 5) {
    for (let i = 1; i <= 5; i++) {
      if (i === page) {
        markUp += `<button class="pagination__number pagination__number--current" type="button">${page}</button>`;
        continue;
      }
      markUp += `<button class="pagination__number" type="button">${i}</button>`;
    }
    markUp += `<div class="dots">...</div>
  <button class="pagination__number" type="button">${totalPages}</button>`;
  } else if (page > totalPages - 5) {
    markUp += `
    <button class="pagination__number" type="button">1</button>
    <div class="dots">...</div>
    `;
    for (let i = totalPages - 5; i <= totalPages; i++) {
      if (i === page) {
        markUp += `<button class="pagination__number pagination__number--current" type="button">${page}</button>`;
        continue;
      }
      markUp += `<button class="pagination__number" type="button">${i}</button>`;
    }
  } else {
    markUp = `
  <button class="pagination__number" type="button">1</button>
  <div class="dots">...</div>
  <button class="pagination__number" type="button">${page - 2}</button>
  <button class="pagination__number" type="button">${page - 1}</button>
  <button class="pagination__number pagination__number--current" type="button">${page}</button>
  <button class="pagination__number" type="button">${page + 1}</button>
  <button class="pagination__number" type="button">${page + 2}</button>
  <div class="dots">...</div>
  <button class="pagination__number" type="button">${totalPages}</button>`;
  }

  // refs.paginationMenu.querySelector('.js-arrow').insertAdjacentHTML('afterend', markUp);
  refs.paginationMenu.innerHTML = markUp;
}

refs.paginationMenu.addEventListener('click', changePage);

function changePage(e) {
  e.preventDefault();
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }

  pageCounter = Number(e.target.textContent);

  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });

  // updatePaginationMenu(pageCounter);
  appendMarkUp();
}

// updatePaginationMenu(pageCounter, totalPages);
