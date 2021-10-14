import './sass/main.scss';
import getRefs from './js/components/refs';
import { getAllGenres, fetchTrendingMovies, getWatchedMovies } from './js/components/api';
import { appendMarkUp } from './js/components/mark-up';
import './js/components/nav';

import './js/components/footer-modal';

import { moviesArr } from './js/components/work-with-movies';

import './js/components/lib';

getAllGenres();
// изначальные настройки при открытии страницы

// получение рефов
const refs = getRefs();
// установка счетчика страниц на 1
sessionStorage.setItem('pageCounter', 1);
// получение массива жанров с их ид
// изначальное добавление разметки популярных фильмов
appendMarkUp(fetchTrendingMovies).then(() => refs.spiner.classList.add('loaded'));
