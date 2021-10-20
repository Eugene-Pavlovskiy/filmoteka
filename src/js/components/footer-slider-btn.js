import { id } from './footer-modal';

let offset = 0;
const sliderLine = document.querySelector('.slider-line');

// document.querySelector('.slider-next').addEventListener('click', function () {
//     offset = offset + 290;
//     if (offset > 1450) {
//         offset = 0;
//     }
//     sliderLine.style.left = -offset + 'px';
// });

// document.querySelector('.slider-previous').addEventListener('click', function() {
//     offset = offset - 290;
//     if (offset < 0) {
//         offset = 1450;
//     }
//     sliderLine.style.left = -offset + 'px';
// });

document.querySelector('.slider-next').addEventListener('click', onNextClick);

document.querySelector('.slider-previous').addEventListener('click', onPreviousClick);

function onNextClick() {
  next();
  if (id) {
    clearInterval(id);
  }
}

function onPreviousClick() {
  previous();
  if (id) {
    clearInterval(id);
  }
}

function next() {
  offset = offset + 290;
  if (offset > 1450) {
    offset = 0;
  }
  sliderLine.style.left = -offset + 'px';
}

function previous() {
  offset = offset - 290;
  if (offset < 0) {
    offset = 1450;
  }
  sliderLine.style.left = -offset + 'px';
}

export { next };
