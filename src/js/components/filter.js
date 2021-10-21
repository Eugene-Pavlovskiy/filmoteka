import { clearGallery } from './mark-up';
import { trendingPagination, onFormInput, onHomeClick, onFormInputDebounce } from './search';
import { loadWatched, loadQueue, updateWatchedOnClick, updateQueueOnClick } from './library';
import { checkKidsMode } from './api';
import getRefs from './refs';
import { showWatched, showQueue } from './nav';

const refs = getRefs();

console.log(JSON.parse(localStorage.getItem('currentColection')));

const Theme = {
  KIDS: 'kids-theme',
  ADULT: 'adult-theme',
};

const THEME_KEY = 'theme';

const themeSwitcher = document.querySelector('.theme-switch__toggle');
themeSwitcher.addEventListener('change', switchTheme);

makeSavedTheme();

function switchTheme(e) {
  if (e.target.checked) {
    replaceTheme(Theme.ADULT, Theme.KIDS);
  } else {
    replaceTheme(Theme.KIDS, Theme.ADULT);
  }
  e.preventDefault();
  if (refs.home.classList.contains('nav-link-current')) {
    onHomeClick();
    checkKidsMode();
  } else if (refs.btnWatched.classList.contains('btn-active')) {
    showWatched();
  } else if (refs.btnQueue.classList.contains('btn-active')) {
    showQueue();
  }
}

function replaceTheme(oldTheme, newTheme) {
  refs.overlay.classList.add(newTheme);
  refs.overlay.classList.remove(oldTheme);
  localStorage.setItem(THEME_KEY, newTheme);
}

function makeSavedTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === Theme.KIDS) {
    themeSwitcher.checked = true;
    replaceTheme(Theme.ADULT, Theme.KIDS);
  } else {
    replaceTheme(Theme.KIDS, Theme.ADULT);
  }
}
