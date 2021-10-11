import './sass/main.scss';
import getRefs from './js/components/refs';
import { getAllGenres, fetchTrendingMovies } from './js/components/api';
import { appendMarkUp } from './js/components/mark-up';
import './js/components/nav';

// изначальные настройки при открытии страницы

// получение рефов
const refs = getRefs();
// установка счетчика страниц на 1
sessionStorage.setItem('pageCounter', 1);
// получение массива жанров с их ид
getAllGenres();
// изначальное добавление разметки популярных фильмов
appendMarkUp(fetchTrendingMovies).then(() => refs.spiner.classList.add('loaded'));
