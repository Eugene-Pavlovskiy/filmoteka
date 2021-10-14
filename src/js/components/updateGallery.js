import { appendMarkUp } from './mark-up';

function updateGallery(e, callBack) {
  e.preventDefault();

  if (e.target.nodeName !== 'BUTTON' && e.target.nodeName !== 'FORM') {
    return;
  }

  let pageCounter = JSON.parse(sessionStorage.getItem('pageCounter'));
  let totalPages = JSON.parse(sessionStorage.getItem('totalPages'));

  if (e.target.classList.contains('js-arrow-left') && pageCounter > 1) {
    pageCounter -= 1;
    sessionStorage.setItem('pageCounter', pageCounter);

    appendMarkUp(callBack);

    setTimeout(scrollUp, 350);

    return;
  }

  if (e.target.classList.contains('js-arrow-right') && pageCounter < totalPages) {
    pageCounter += 1;
    sessionStorage.setItem('pageCounter', pageCounter);

    appendMarkUp(callBack);

    setTimeout(scrollUp, 350);

    return;
  }

  if (e.target.classList.contains('pagination__number')) {
    pageCounter = Number(e.target.textContent);
    sessionStorage.setItem('pageCounter', pageCounter);

    appendMarkUp(callBack);

    setTimeout(scrollUp, 350);

    return;
  }
}

function scrollUp() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

export { updateGallery };
