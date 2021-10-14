import getRefs from './refs';
import { getMovies } from './work-with-movies';
import makeCard from '../../palets/card.hbs';
import makeLibraryCard from '../../palets/library-card.hbs';
import notFound from '../../palets/not-found.hbs';
import { getWatchedMovies, getQueueMovies } from './api';

const refs = getRefs();

async function makeMarkUp(callBack) {
  const movies = await getMovies(callBack, JSON.parse(sessionStorage.getItem('pageCounter')));
  // console.log('movies from markUp: ', movies);

  if (!movies) {
    return 0;
  }

  // let a = JSON.parse(localStorage.getItem('moviesInWatched'));
  // let b = JSON.parse(localStorage.getItem('moviesInQueue'));

  // if (!a) {
  //   a = [];
  // }

  // if (!b) {
  //   b = [];
  // }
  // console.log(movies);

  let markUp = null;
  if (callBack === getWatchedMovies || callBack === getQueueMovies) {
    markUp = movies.map(makeLibraryCard).join('');
  } else {
    markUp = '';
    markUp = movies.map(makeCard).join('');
    // for (let i = 0; i < movies.length; i++) {
    //   for (let j = 0; j < a.length; j++) {
    //     if (movies[i].id === a[j].id) {
    //       movies[i].addedToWatched = true;
    //       // makeCard(movies[i]);
    //       continue;
    //     }

    //     // markUp += makeCard(movies[i]).join('');
    //   }

    //   for (let j = 0; j < b.length; j++) {
    //     if (movies[i].id === b[j].id) {
    //       movies[i].addedToQueue = true;
    //       // makeCard(movies[i]);
    //       continue;
    //     }
    //   }
    //   markUp += makeCard(movies[i]);
    //   // markUp.join('');
    //   // console.log(markUp);
    // }
  }

  // for (let i = 0; i < movies.length; i++) {
  //   for (let j = 0; i < lib; j++){
  //     if (movies[i] === lib[j]) {
  //       makeCard(movies[i], a = true)
  //     }

  //     markUp += makeCard(movies[i])
  //   }
  // }

  // console.log(markUp);

  return markUp;
}

function clearGallery() {
  refs.galleryTrending.innerHTML = '';
}

async function appendMarkUp(callBack) {
  clearGallery();

  refs.notFoundContainer.innerHTML = '';
  refs.spiner.classList.remove('loaded');

  const markUp = await makeMarkUp(callBack);

  if (markUp === 0) {
    refs.spiner.classList.add('loaded');
    // refs.galleryTrending.replaceWith(notFound());
    // refs.innerContainer.insertAdjacentHTML('beforebegin', notFound());
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

  markUp += `<button class="pagination__arrow js-arrow-left">
          <svg class="pagination__arrow-logo" width="16px" height="16px">
            <use href="https://raw.githubusercontent.com/caraset/filmoteka/main/src/images/arrow-left.svg"></use>
          </svg>
        </button>`;

  // 'https://raw.githubusercontent.com/caraset/filmoteka/main/src/images/no-poster.jpg';

  refs.paginationMenu.querySelector('.pagination__container').innerHTML = '';

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
            <use href="https://raw.githubusercontent.com/caraset/filmoteka/main/src/images/arrow-right.svg"></use>
          </svg>
        </button>`;

  // refs.paginationMenu.querySelector('.js-arrow').insertAdjacentHTML('afterend', markUp);
  refs.paginationMenu.querySelector('.pagination__container').innerHTML = markUp;
}

export { appendMarkUp };
