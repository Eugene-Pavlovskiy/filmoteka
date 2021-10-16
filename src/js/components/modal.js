import makeModal from '../../palets/modal.hbs';
import getRefs from './refs';
import { getButton } from './adding-to-library';
import { updateQueueOnClick, updateWatchedOnClick, updateMainGal } from './library';

const refs = getRefs();

function onCardClick(e) {
  if (e.target.nodeName !== 'LI') {
    return;
  }

  const arr = JSON.parse(localStorage.getItem('currentColection'));

  const a = e.target.dataset.index;

  sessionStorage.setItem('modalMovie', JSON.stringify(arr[a]));

  const modal = makeModal(arr[a]);

  refs.modalFilm.insertAdjacentHTML('beforeend', modal);
  refs.backdrop.classList.add('is-open');

  document.body.classList.add('backdrop-scroll');

  refs.backdrop.addEventListener('click', closeModal);
  refs.modalFilm.addEventListener('click', getButton);
  document.addEventListener('keydown', closeModal);

  if (refs.home.classList.contains('nav-link-current')) {
    refs.backdrop.addEventListener('click', updateMainGal);
    return;
  }
  if (refs.btnWatched.classList.contains('btn-active')) {
    refs.backdrop.addEventListener('click', updateWatchedOnClick);
    return;
  }

  refs.backdrop.addEventListener('click', updateQueueOnClick);
}

function closeModal(e) {
  if (e.target.dataset.action !== 'close-modal' && e.key !== 'Escape') {
    return;
  }

  refs.backdrop.removeEventListener('click', updateWatchedOnClick);
  refs.backdrop.removeEventListener('click', updateQueueOnClick);

  refs.modalFilm.innerHTML = '';
  refs.backdrop.classList.remove('is-open');
  document.body.classList.remove('backdrop-scroll');
  refs.backdrop.removeEventListener('click', closeModal);
  refs.modalFilm.removeEventListener('click', getButton);
  document.removeEventListener('keydown', closeModal);
}

export { onCardClick, closeModal };
