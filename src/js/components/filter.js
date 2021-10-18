import { updateMainGal } from './updateGallery';

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
}

function replaceTheme(oldTheme, newTheme) {
  document.body.classList.add(newTheme);
  document.body.classList.remove(oldTheme);
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
