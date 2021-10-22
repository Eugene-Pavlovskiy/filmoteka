import './sass/main.scss';
import getRefs from './js/components/refs';
import { getAllGenres, fetchTrendingMovies } from './js/components/api';
import { appendMarkUp } from './js/components/mark-up';
import './js/components/filter';
import './js/components/nav';
import './js/components/footer-modal';
import './js/components/footer-slider-btn';
import './js/components/btn-to-top';
import './js/components/switcher';

getAllGenres();
// изначальные настройки при открытии страницы

// получение рефов
const refs = getRefs();
// установка счетчика страниц на 1
sessionStorage.setItem('pageCounter', 1);
// получение массива жанров с их ид
// изначальное добавление разметки популярных фильмов
appendMarkUp(fetchTrendingMovies).then(() => refs.spiner.classList.add('loaded'));

// refs.galleryTrending.addEventListener('click', onCardClick);
// refs.galleryTrending.addEventListener('click', getButton);
