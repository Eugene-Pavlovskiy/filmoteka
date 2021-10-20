import { openVideo, closeVideo } from "./trailers-modal";
function getButton(e) {
  posteToLibrary(e);
  openVideo(e)
  closeVideo(e)
}

function posteToLibrary(e) {
  const posterClicked = e.target;

  if (e.target.nodeName !== 'BUTTON') {
    return;
  }

  const index = e.target.dataset.index;
  const btn = e.target;

  const moviesArr = JSON.parse(localStorage.getItem('currentColection'));

  if (posterClicked.dataset.action === 'toggle-watched') {
    addToWatched(moviesArr[index], btn);
  } else if (posterClicked.dataset.action === 'toggle-queue') {
    addToQueue(moviesArr[index], btn);
  } else {
  }
}

function addToWatched(movie, btn) {
  let watchedMoviesArr = JSON.parse(localStorage.getItem('moviesInWatched'));
  let queueMoviesArr = JSON.parse(localStorage.getItem('moviesInQueue'));
  let currentColection = JSON.parse(localStorage.getItem('currentColection'));
  if (!watchedMoviesArr) {
    watchedMoviesArr = [];
  }

  if (!queueMoviesArr) {
    queueMoviesArr = [];
  }

  const includedInWatched = watchedMoviesArr.find(el => el.id === movie.id);
  const includedInQueue = queueMoviesArr.find(el => el.id === movie.id);
  const includedInColection = currentColection.find(el => el.id === movie.id);

  const indexInW = watchedMoviesArr.indexOf(includedInWatched);
  const indexInQ = queueMoviesArr.indexOf(includedInQueue);
  const indexInC =
    currentColection.indexOf(includedInColection) || currentColection.indexOf(includedInColection);

  if (includedInWatched && includedInQueue) {
    watchedMoviesArr.splice(indexInW, 1);

    btn.classList.remove('btn-active');
    btn.textContent = 'Add to watched';

    queueMoviesArr[indexInQ].addedToWatched = false;
    currentColection[indexInC].addedToWatched = false;
  } else if (includedInWatched) {
    const index = watchedMoviesArr.indexOf(includedInWatched);

    currentColection[indexInC].addedToWatched = false;
    watchedMoviesArr.splice(indexInW, 1);

    btn.classList.remove('btn-active');
    btn.textContent = 'Add to watched';
  } else {
    if (includedInQueue) {
      movie.addedToQueue = true;
      queueMoviesArr[indexInQ].addedToWatched = true;
    }
    btn.classList.add('btn-active');
    btn.textContent = 'Remove from watched';
    movie.addedToWatched = true;
    currentColection[indexInC].addedToWatched = true;
    watchedMoviesArr.push(movie);
  }

  const archQ = JSON.stringify(queueMoviesArr);
  const archW = JSON.stringify(watchedMoviesArr);
  const archC = JSON.stringify(currentColection);

  localStorage.setItem('moviesInQueue', archQ);
  localStorage.setItem('moviesInWatched', archW);
  localStorage.setItem('currentColection', archC);
}

function addToQueue(movie, btn) {
  let queueMoviesArr = JSON.parse(localStorage.getItem('moviesInQueue'));
  let watchedMoviesArr = JSON.parse(localStorage.getItem('moviesInWatched'));
  let currentColection = JSON.parse(localStorage.getItem('currentColection'));
  if (!queueMoviesArr) {
    queueMoviesArr = [];
  }

  if (!watchedMoviesArr) {
    watchedMoviesArr = [];
  }

  const includedInQueue = queueMoviesArr.find(el => el.id === movie.id);
  const includedInWatched = watchedMoviesArr.find(el => el.id === movie.id);
  const includedInColection = currentColection.find(el => el.id === movie.id);

  const indexInQ = queueMoviesArr.indexOf(includedInQueue);
  const indexInW = watchedMoviesArr.indexOf(includedInWatched);
  const indexInC =
    currentColection.indexOf(includedInColection) || currentColection.indexOf(includedInColection);

  if (includedInQueue && includedInWatched) {
    queueMoviesArr.splice(indexInQ, 1);

    btn.classList.remove('btn-active');
    btn.textContent = 'Add to queue';

    watchedMoviesArr[indexInW].addedToQueue = false;
    currentColection[indexInC].addedToQueue = false;
  } else if (includedInQueue) {
    const index = queueMoviesArr.indexOf(includedInQueue);

    currentColection[indexInC].addedToQueue = false;
    queueMoviesArr.splice(index, 1);

    btn.classList.remove('btn-active');
    btn.textContent = 'Add to queue';
  } else {
    if (includedInWatched) {
      movie.addedToWatched = true;
      watchedMoviesArr[indexInW].addedToQueue = true;
    }
    btn.classList.add('btn-active');
    btn.textContent = 'Remove from queue';
    movie.addedToQueue = true;
    currentColection[indexInC].addedToQueue = true;
    queueMoviesArr.push(movie);
  }

  const archQ = JSON.stringify(queueMoviesArr);
  const archW = JSON.stringify(watchedMoviesArr);
  const archC = JSON.stringify(currentColection);

  localStorage.setItem('moviesInQueue', archQ);
  localStorage.setItem('moviesInWatched', archW);
  localStorage.setItem('currentColection', archC);
}

export { addToWatched, addToQueue, getButton };
