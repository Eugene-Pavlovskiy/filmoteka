import './sass/main.scss';
import getRefs from './js/components/refs';
import { getAllGenres, fetchTrendingMovies, fetchMovies } from './js/components/api';
import { appendMarkUp } from './js/components/mark-up';
import { updateGallery } from './js/components/updateGallery';
import './js/components/nav';

import { throttle } from 'lodash';
import { debounce } from 'lodash';

// изначальные настройки при открытии страницы

// получение рефов
const refs = getRefs();
// установка счетчика страниц на 1
sessionStorage.setItem('pageCounter', 1);
// получение массива жанров с их ид
getAllGenres();
// изначальное добавление разметки популярных фильмов
appendMarkUp(fetchTrendingMovies);

const onFormInputDebounce = debounce(onFormInput, 400);

// добавляет слушатель на меню пагинации для переключения между страницами популярных фильмов
refs.paginationMenu.addEventListener('click', trendingPagination);
// добавляет слушатель на строку для поиска
refs.form.addEventListener('input', onFormInputDebounce);

// отдельная функция для слушателя выше что бы потом снять его
function trendingPagination(e) {
  updateGallery(e, fetchTrendingMovies);
}

function onHomeClick() {
  refs.searchInput.value = '';
  sessionStorage.setItem('pageCounter', 1);
  appendMarkUp(fetchTrendingMovies);

  refs.paginationMenu.removeEventListener('click', forListenerRemoval);
  refs.paginationMenu.addEventListener('click', trendingPagination);

  refs.form.removeEventListener('input', onFormInputDebounce);
  refs.form.addEventListener('input', onFormInputDebounce);

  refs.home.disbled = true;
}

// в теле функции генерируеться другая функция через колбеки которая меняеться при каждом новом запросе, нужна глобальная переменная что бы хранить предыдущее значение для снятия слушателя, пока что не придумал вариант получше
let forListenerRemoval = null;

// логика отрисовки фильмов по запросу, не закончена
// TODO: если не нашлись фильмы нужно выводить сообщение о ненахождении
async function onFormInput(e) {
  e.preventDefault();

  if (refs.searchInput.value === '') {
    sessionStorage.setItem('pageCounter', 1);
    appendMarkUp(fetchTrendingMovies);
    refs.paginationMenu.removeEventListener('click', forListenerRemoval);
    refs.paginationMenu.addEventListener('click', trendingPagination);
    return;
  }

  sessionStorage.setItem('pageCounter', 1);

  // const query = e.currentTarget.query.value;
  const query = refs.searchInput.value;

  const f = await fetchMovies(query);

  async function onSub(e) {
    updateGallery(e, f);
  }

  refs.paginationMenu.removeEventListener('click', forListenerRemoval);
  forListenerRemoval = onSub;

  refs.paginationMenu.removeEventListener('click', trendingPagination);

  refs.paginationMenu.addEventListener('click', onSub);

  appendMarkUp(f);
}

// просто для тестов
// const KEY = '94f703750c3e0771d8c2babc592efc94'
// fetch(`https://api.themoviedb.org/3/search/movie?api_key=${KEY}&query=cat&page=2`)
//   .then(r => r.json())
//   .then(r => console.log(r));

export { onHomeClick };
