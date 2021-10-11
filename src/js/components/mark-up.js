import getRefs from './refs';
import { getMovies } from './work-with-movies';
import makeCard from '../../palets/card.hbs';

const refs = getRefs();

async function makeMarkUp(callBack) {
  const movies = await getMovies(callBack, JSON.parse(sessionStorage.getItem('pageCounter')));

  if (!movies) {
    return;
  }

  const markUp = movies.map(makeCard).join('');

  return markUp;
}

function clearGallery() {
  refs.galleryTrending.innerHTML = '';
}

async function appendMarkUp(callBack) {
  clearGallery();
  refs.spiner.classList.remove('loaded');
  refs.galleryTrending.insertAdjacentHTML('beforeend', await makeMarkUp(callBack));
  updatePaginationMenu(
    JSON.parse(sessionStorage.getItem('pageCounter')),
    JSON.parse(sessionStorage.getItem('totalPages')),
  );
  refs.spiner.classList.add('loaded');
}

function updatePaginationMenu(page, totalPages = 20) {
  let markUp = '';

  markUp += `<button class="pagination__arrow js-arrow-left">
          <svg class="pagination__arrow-logo" width="16px" height="16px">
            <use href="/filmoteka/sprite.ef4b9d06.svg#arrow-left"></use>
          </svg>
        </button>`;

  refs.paginationMenu.querySelector('.pagination__container').innerHTML = '';

  console.log(window.innerWidth);
  if (window.innerWidth < 768) {
    if (totalPages < 5) {
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
      for (let i = 1; i <= 5; i++) {
        if (i === page) {
          markUp += `<button class="pagination__number pagination__number--current" type="button">${page}</button>`;
          continue;
        }
        markUp += `<button class="pagination__number" type="button">${i}</button>`;
      }
      markUp += `<div class="dots">...</div>`;
    } else if (page > totalPages - 5) {
      markUp += `<div class="dots">...</div>`;
      for (let i = totalPages - 5; i <= totalPages; i++) {
        if (i === page) {
          markUp += `<button class="pagination__number pagination__number--current" type="button">${page}</button>`;
          continue;
        }
        markUp += `<button class="pagination__number" type="button">${i}</button>`;
      }
    } else {
      markUp += `
  <div class="dots">...</div>
  <button class="pagination__number" type="button">${page - 2}</button>
  <button class="pagination__number" type="button">${page - 1}</button>
  <button class="pagination__number pagination__number--current" type="button">${page}</button>
  <button class="pagination__number" type="button">${page + 1}</button>
  <button class="pagination__number" type="button">${page + 2}</button>
  <div class="dots">...</div>`;
    }
  } else {
    // начало пагинации не под мобилку
    // адаптировано под мобилку
    if (totalPages < 10) {
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

  //   // начало пагинации не под мобилку
  //   // адаптировано под мобилку
  //   if (totalPages < 10) {
  //     for (let i = 1; i <= totalPages; i++) {
  //       if (i === page) {
  //         markUp += `<button class="pagination__number pagination__number--current" type="button">${page}</button>`;
  //         continue;
  //       }
  //       markUp += `<button class="pagination__number" type="button">${i}</button>`;
  //     }

  //     refs.paginationMenu.querySelector('.pagination__container').innerHTML = markUp;
  //     return;
  //   }

  // // адаптировано
  //   if (page < 5) {
  //     for (let i = 1; i <= 5; i++) {
  //       if (i === page) {
  //         markUp += `<button class="pagination__number pagination__number--current" type="button">${page}</button>`;
  //         continue;
  //       }
  //       markUp += `<button class="pagination__number" type="button">${i}</button>`;
  //     }
  //     markUp += `<div class="dots">...</div>
  //   <button class="pagination__number" type="button">${totalPages}</button>`;
  //   }

  //   // адаптировано
  //   else if (page > totalPages - 5) {
  //     markUp += `
  //     <button class="pagination__number" type="button">1</button>
  //     <div class="dots">...</div>
  //     `;
  //     for (let i = totalPages - 5; i <= totalPages; i++) {
  //       if (i === page) {
  //         markUp += `<button class="pagination__number pagination__number--current" type="button">${page}</button>`;
  //         continue;
  //       }
  //       markUp += `<button class="pagination__number" type="button">${i}</button>`;
  //     }
  //   }
  //   else {
  //     markUp = `
  //   <button class="pagination__number" type="button">1</button>
  //   <div class="dots">...</div>
  //   <button class="pagination__number" type="button">${page - 2}</button>
  //   <button class="pagination__number" type="button">${page - 1}</button>
  //   <button class="pagination__number pagination__number--current" type="button">${page}</button>
  //   <button class="pagination__number" type="button">${page + 1}</button>
  //   <button class="pagination__number" type="button">${page + 2}</button>
  //   <div class="dots">...</div>
  //   <button class="pagination__number" type="button">${totalPages}</button>`;
  //   }

  markUp += `<button class="pagination__arrow js-arrow-right">
          <svg class="pagination__arrow-logo" width="16px" height="16px">
            <use href="/filmoteka/sprite.ef4b9d06.svg#arrow-right"></use>
          </svg>
        </button>`;

  // refs.paginationMenu.querySelector('.js-arrow').insertAdjacentHTML('afterend', markUp);
  refs.paginationMenu.querySelector('.pagination__container').innerHTML = markUp;
}

export { appendMarkUp };
