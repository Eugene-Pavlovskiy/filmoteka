// import getRefs from './js/components/refs';
import { getAllGenres, fetchTrendingMovies } from './api';
import { appendMarkUp } from './mark-up';

// function updateGallery(e, callBack) {
//   e.preventDefault();
//   if (e.target.nodeName !== 'BUTTON') {
//     return;
//   }

//   let pageCounter = JSON.parse(sessionStorage.getItem('pageCounter'));
//   console.log(pageCounter);

//   if (e.target.classList.contains('js-arrow-left') && pageCounter > 1) {
//     pageCounter -= 1;
//     sessionStorage.setItem('pageCounter', pageCounter);

//     appendMarkUp(fetchTrendingMovies);
//     window.scrollTo(0, 0);
//     return;
//   }

//   if (e.target.classList.contains('js-arrow-right') && pageCounter < totalPages) {
//     pageCounter += 1;
//     sessionStorage.setItem('pageCounter', pageCounter);

//     appendMarkUp(fetchTrendingMovies);
//     window.scrollTo(0, 0);
//     return;
//   }

//   if (e.target.classList.contains('pagination__number')) {
//     pageCounter = Number(e.target.textContent);
//     sessionStorage.setItem('pageCounter', pageCounter);

//     appendMarkUp(fetchTrendingMovies);
//     window.scrollTo(0, 0);
//     return;
//   }

//   console.log('2: ', pageCounter);

//   // window.scrollTo({
//   //   top: 0,
//   //   behavior: 'smooth',
//   // });
// }

function updateGallery(e, callBack) {
  e.preventDefault();

  if (e.target.nodeName !== 'BUTTON' && e.target.nodeName !== 'FORM') {
    return;
  }

  let pageCounter = JSON.parse(sessionStorage.getItem('pageCounter'));
  let totalPages = JSON.parse(sessionStorage.getItem('totalPages'));
  console.log(pageCounter);

  if (e.target.classList.contains('js-arrow-left') && pageCounter > 1) {
    pageCounter -= 1;
    sessionStorage.setItem('pageCounter', pageCounter);

    appendMarkUp(callBack);
    window.scrollTo(0, 0);
    return;
  }

  if (e.target.classList.contains('js-arrow-right') && pageCounter < totalPages) {
    pageCounter += 1;
    sessionStorage.setItem('pageCounter', pageCounter);

    appendMarkUp(callBack);
    window.scrollTo(0, 0);
    return;
  }

  if (e.target.classList.contains('pagination__number')) {
    pageCounter = Number(e.target.textContent);
    sessionStorage.setItem('pageCounter', pageCounter);

    appendMarkUp(callBack);
    window.scrollTo(0, 0);
    return;
  }

  console.log('2: ', pageCounter);

  // window.scrollTo({
  //   top: 0,
  //   behavior: 'smooth',
  // });
}

export { updateGallery };
