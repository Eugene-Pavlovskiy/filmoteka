export default function getRefs() {
  return {
    form: document.querySelector('.search-form'),
    error: document.querySelector('.error'),
    errorText: document.querySelector('.error-text'),
    searchInput: document.querySelector('.search-input'),
    galleryTrending: document.querySelector('.gallery-trending__list'),
    innerContainer: document.querySelector('.inner-container'),
    notFoundContainer: document.querySelector('.not-found-container'),
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
    btnAddToWatched: document.querySelector('.poster-button'),
    btnAddToQueue: document.querySelector('[data-action="toggle-queue"]'),

    modalContentBox: document.querySelector('[data-film="popap"]'),

    // модалка
    modalClose: document.querySelector('.modal-close'),
    modalFilm: document.querySelector('.modal'),
    backdrop: document.querySelector('.backdrop'),
  };
}

{
  /* <input type="text" class="search-input" /><button class="input-btn" type="submit"></button> */
}
