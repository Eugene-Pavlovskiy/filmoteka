export default function getRefs() {
  return {
    form: document.querySelector('.search-form'),
    error: document.querySelector('.error'),
    errorText: document.querySelector('.error-text'),
    searchInput: document.querySelector('.search-input'),
    galleryTrending: document.querySelector('.gallery-trending__list'),
    paginationContainer: document.querySelector('.pagination-container'),
    paginationMenu: document.querySelector('.pagination'),
    spiner: document.querySelector('.js-spiner'),

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
