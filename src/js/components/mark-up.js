import getRefs from './refs';
import { getMovies } from './work-with-movies';
import makeCard from '../../palets/card.hbs';
import makeLibraryCard from '../../palets/library-card.hbs';
import arrowLeft from '../../palets/arrow-left.hbs';
import arrowRight from '../../palets/arrow-right.hbs';
import notFound from '../../palets/not-found.hbs';
import { getWatchedMovies, getQueueMovies } from './api';

const refs = getRefs();

async function makeMarkUp(callBack) {
  const movies = await getMovies(callBack, JSON.parse(sessionStorage.getItem('pageCounter')));

  if (!movies || movies.length === 0) {
    return 0;
  }

  let markUp = null;
  if (callBack === getWatchedMovies || callBack === getQueueMovies) {
    markUp = movies.map(makeLibraryCard).join('');
  } else {
    markUp = '';
    markUp = movies.map(makeCard).join('');
  }

  return markUp;
}

function clearGallery() {
  refs.galleryTrending.innerHTML = '';
  refs.paginationMenu.querySelector('.pagination__container').innerHTML = '';
}

async function appendMarkUp(callBack) {
  clearGallery();

  refs.notFoundContainer.innerHTML = '';
  refs.spiner.classList.remove('loaded');

  const markUp = await makeMarkUp(callBack);

  if (markUp === 0) {
    refs.spiner.classList.add('loaded');
    refs.notFoundContainer.innerHTML = notFound();
    return;
  }

  refs.galleryTrending.insertAdjacentHTML('beforeend', markUp);
  updatePaginationMenu(
    JSON.parse(sessionStorage.getItem('pageCounter')),
    JSON.parse(sessionStorage.getItem('totalPages')),
  );
  refs.spiner.classList.add('loaded');
}

function updatePaginationMenu(page, totalPages = 20) {
  let markUp = '';

  if (totalPages <= 1) {
    refs.paginationMenu.querySelector('.pagination__container').innerHTML = markUp;
    return;
  }

  markUp += arrowLeft();

  // 'https://raw.githubusercontent.com/caraset/filmoteka/main/src/images/no-poster.jpg';

  refs.paginationMenu.querySelector('.pagination__container').innerHTML = '';

  if (window.innerWidth < 768) {
    if (totalPages <= 5) {
      markUp = '';
      for (let i = 1; i <= totalPages; i++) {
        if (i === page) {
          markUp += `<button class="pagination__number pagination__number--current" type="button">${page}</button>`;
          continue;
        }
        markUp += `<button class="pagination__number" type="button">${i}</button>`;
      }

      refs.paginationMenu.querySelector('.pagination__container').innerHTML = markUp;
      return;
    }

    if (page < 5) {
      if (page === 1) {
        markUp = '';
      }
      for (let i = 1; i <= 5; i++) {
        if (i === page) {
          markUp += `<button class="pagination__number pagination__number--current" type="button">${page}</button>`;
          continue;
        }
        markUp += `<button class="pagination__number" type="button">${i}</button>`;
      }
    } else if (page > totalPages - 4) {
      markUp = arrowLeft();
      for (let i = totalPages - 4; i <= totalPages; i++) {
        if (i === page) {
          markUp += `<button class="pagination__number pagination__number--current" type="button">${page}</button>`;
          continue;
        }
        markUp += `<button class="pagination__number" type="button">${i}</button>`;
      }
    } else {
      markUp += `
  <button class="pagination__number" type="button">${page - 2}</button>
  <button class="pagination__number" type="button">${page - 1}</button>
  <button class="pagination__number pagination__number--current" type="button">${page}</button>
  <button class="pagination__number" type="button">${page + 1}</button>
  <button class="pagination__number" type="button">${page + 2}</button>`;
    }
  } else {
    // начало пагинации не под мобилку
    if (totalPages < 10) {
      markUp = '';
      for (let i = 1; i <= totalPages; i++) {
        if (i === page) {
          markUp += `<button class="pagination__number pagination__number--current" type="button">${page}</button>`;
          continue;
        }
        markUp += `<button class="pagination__number" type="button">${i}</button>`;
      }

      refs.paginationMenu.querySelector('.pagination__container').innerHTML = markUp;
      return;
    }

    // адаптировано
    if (page < 6) {
      for (let i = 1; i <= 6; i++) {
        if (i === page) {
          markUp += `<button class="pagination__number pagination__number--current" type="button">${page}</button>`;
          continue;
        }
        markUp += `<button class="pagination__number" type="button">${i}</button>`;
      }
      markUp += `<div class="dots">...</div>
  <button class="pagination__number" type="button">${totalPages}</button>`;
    }

    // адаптировано
    else if (page > totalPages - 5) {
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
      markUp += `
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
  }

  if (page !== totalPages) {
    markUp += arrowRight();
  }

  refs.paginationMenu.querySelector('.pagination__container').innerHTML = markUp;
}

export { appendMarkUp, clearGallery };
