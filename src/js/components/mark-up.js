import getRefs from './refs';
import { getMovies } from './work-with-movies';
import makeCard from '../../palets/card.hbs';

const refs = getRefs();

async function makeMarkUp(callBack) {
  const movies = await getMovies(callBack, JSON.parse(sessionStorage.getItem('pageCounter')));

  const markUp = movies.map(makeCard).join('');

  console.log('movies from makeMarkUp: ', movies);

  return markUp;
}

function clearGallery() {
  refs.galleryTrending.innerHTML = '';
}

async function appendMarkUp(callBack) {
  clearGallery();
  refs.galleryTrending.insertAdjacentHTML('beforeend', await makeMarkUp(callBack));
  updatePaginationMenu(
    JSON.parse(sessionStorage.getItem('pageCounter')),
    JSON.parse(sessionStorage.getItem('totalPages')),
  );
}

function updatePaginationMenu(page, totalPages = 20) {
  let markUp = '';

  refs.paginationMenu.querySelector('.pagination__container').innerHTML = '';

  if (page < 5) {
    for (let i = 1; i <= 5; i++) {
      if (i === page) {
        markUp += `<button class="pagination__number pagination__number--current" type="button">${page}</button>`;
        continue;
      }
      markUp += `<button class="pagination__number" type="button">${i}</button>`;
    }
    markUp += `<div class="dots">...</div>
  <button class="pagination__number" type="button">${totalPages}</button>`;
  } else if (page > totalPages - 5) {
    markUp += `
    <button class="pagination__number" type="button">1</button>
    <div class="dots">...</div>
    `;
    for (let i = totalPages - 5; i <= totalPages; i++) {
      if (i === page) {
        markUp += `<button class="pagination__number pagination__number--current" type="button">${page}</button>`;
        continue;
      }
      markUp += `<button class="pagination__number" type="button">${i}</button>`;
    }
  } else {
    markUp = `
  <button class="pagination__number" type="button">1</button>
  <div class="dots">...</div>
  <button class="pagination__number" type="button">${page - 2}</button>
  <button class="pagination__number" type="button">${page - 1}</button>
  <button class="pagination__number pagination__number--current" type="button">${page}</button>
  <button class="pagination__number" type="button">${page + 1}</button>
  <button class="pagination__number" type="button">${page + 2}</button>
  <div class="dots">...</div>
  <button class="pagination__number" type="button">${totalPages}</button>`;
  }

  // refs.paginationMenu.querySelector('.js-arrow').insertAdjacentHTML('afterend', markUp);
  refs.paginationMenu.querySelector('.pagination__container').innerHTML = markUp;
}

export { appendMarkUp };
