export default function getRefs() {
  return {
    form: document.querySelector('.search'),
    searchInput: document.querySelector('.search-input'),
    btn: document.querySelector('.input-btn'),
    galleryTrending: document.querySelector('.gallery-trending__list'),
    clearBtn: document.querySelector('.js-first-btn'),
    paginationMenu: document.querySelector('.pagination'),

    logo: document.querySelector('.js-logo'),
    home: document.querySelector('.js-nav-home'),
    library: document.querySelector('.js-nav-library'),
    overlay: document.querySelector('.js-overlay'),
    searchForm: document.querySelector('#search-form'),
    btnsLibrary: document.querySelector('[data-action="btn-library-show"]'),
    btnWatched: document.querySelector('[data-action="btn-watched"]'),
    btnQueue: document.querySelector('[data-action="btn-queue"]'),
  };
}

{
  /* <input type="text" class="search-input" /><button class="input-btn" type="submit"></button> */
}
