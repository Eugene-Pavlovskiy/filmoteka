import makeModal from '../../palets/modal.hbs';
import getRefs from './refs';
import { getButton } from './adding-to-library';
import { closeVideoModal } from './trailers-modal';
const refs = getRefs();

function onCardClick(e) {
  if (e.target.nodeName !== 'LI') {
    return;
  }
  
  const arr = JSON.parse(localStorage.getItem('currentColection'));

  const a = e.target.dataset.index;
 

   

  const modal = makeModal(arr[a]);
  


  refs.modalFilm.insertAdjacentHTML('afterbegin', modal);
  refs.backdrop.classList.add('is-open');
  
  
  document.body.classList.add('backdrop-scroll');


  refs.backdrop.addEventListener('click', closeModal);
  refs.modalFilm.addEventListener('click', getButton);
}

function closeModal(e) {
  if (e.target.dataset.action !== 'close-modal') {
    return;
  }

  refs.modalFilm.innerHTML = '';
  refs.backdrop.classList.remove('is-open');
  document.body.classList.remove('backdrop-scroll');
  refs.backdrop.removeEventListener('click', closeModal);
  refs.modalFilm.removeEventListener('click', getButton);
  closeVideoModal()
}

export { onCardClick, closeModal };
