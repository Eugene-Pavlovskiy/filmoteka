const body = document.querySelector('body');
const switcher = document.querySelector('.colorTheme-switch__toggle');
const footer = document.querySelector('.footer');
const modal = document.querySelector('.modal');

const ColorTheme = {
  LIGHT: 'light-ColorTheme',
  DARK: 'dark-ColorTheme',
};

body.classList.add(ColorTheme.LIGHT);
switcher.addEventListener('change', setClassList);
switcher.addEventListener('change', saveData);
footer.classList.add(ColorTheme.LIGHT);
modal.classList.add(ColorTheme.LIGHT);

function setClassList(evt) {
  evt.preventDefault(evt);

  if (switcher.checked) {
    body.classList.add(ColorTheme.DARK);
    body.classList.remove(ColorTheme.LIGHT);
    footer.classList.add(ColorTheme.DARK);
    footer.classList.remove(ColorTheme.LIGHT);
    modal.classList.add(ColorTheme.DARK);
    modal.classList.remove(ColorTheme.LIGHT);
  } else {
    body.classList.add(ColorTheme.LIGHT);
    body.classList.remove(ColorTheme.DARK);
    footer.classList.add(ColorTheme.LIGHT);
    footer.classList.remove(ColorTheme.DARK);
    modal.classList.add(ColorTheme.LIGHT);
    modal.classList.remove(ColorTheme.DARK);
  }
}

function saveData(evt) {
  if (switcher.checked) {
    localStorage.setItem('ColorTheme', ColorTheme.DARK);
  } else {
    localStorage.removeItem('ColorTheme');
    localStorage.setItem('ColorTheme', ColorTheme.LIGHT);
  }
}

const currentColorTheme = localStorage.getItem('ColorTheme');

if (currentColorTheme === ColorTheme.DARK) {
  body.classList.add(ColorTheme.DARK);
  footer.classList.add(ColorTheme.DARK);
  modal.classList.add(ColorTheme.DARK);
  switcher.checked = true;
}
