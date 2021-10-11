import { debounce } from 'lodash';
import getRefs from './refs';
import { fetchTrendingMovies, fetchMovies } from './api';
import { updateGallery } from './updateGallery';
import { appendMarkUp } from './mark-up';

const refs = getRefs();

const onFormInputDebounce = debounce(onFormInput, 400);
// refs.form.addEventListener('input', onFormInputDebounce);

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

export { trendingPagination, onFormInput, onHomeClick, onFormInputDebounce };
