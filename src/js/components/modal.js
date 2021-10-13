import modalTpl from '../../palets/modal.hbs';

// refs
const refs = {
  galleryTrendContainer : document.querySelector('.gallery-trending__list'),
  modalClose : document.querySelector('.modal-close'),
  modalFilm :document.querySelector('.modal'),
  backdrop : document.querySelector('.backdrop')
}

const API_KEY = '94f703750c3e0771d8c2babc592efc94';
const BASE_URL = 'https://api.themoviedb.org/3';


refs.backdrop.addEventListener('click', onBackDropClick);
refs.galleryTrendContainer.addEventListener('click', (e) => {
    if(e.target.nodeName !=='IMG'){
      return
  }
//const filmId = e.target.id  
  const filmId = e.target;
  console.log(filmId)
  fetchSelectedMovie(filmId)
})

function fetchSelectedMovie(filmId) {
  return fetch(`${BASE_URL}/movie/${filmId}?api_key=${API_KEY}`)
    .then(r => {
        if (r.ok) {
            return r.json()
        }
    })
   .then(r => {
      renderMovies(r)
      })
}



function renderMovies(r) {

    const markUp = modalTpl(r);
   
    refs.modalClose.addEventListener('click', onBtnClose)
    window.addEventListener('keydown', onEscPress)

    if (refs.modalFilm.children[1]) {
        refs.modalFilm.children[1].remove();
    }
    if (refs.modalFilm.children[1]) {
        refs.modalFilm.children[1].remove();
    }
    
    refs.modalFilm.insertAdjacentHTML('beforeend', markUp);
    refs.backdrop.classList.add('is-open');

    document.body.classList.add('backdrop-scroll');
}

function onBtnClose() {
    refs.backdrop.classList.remove('is-open')
    document.body.classList.remove('backdrop-scroll')
    window.removeEventListener('keydown', onEscPress)
}

  function onEscPress(evt){
    if(evt.code === 'Escape'){
      onBtnClose();
    }
}
  function onBackDropClick(evt){
    if(evt.currentTarget === evt.target){
      onBtnClose();
    }
}

