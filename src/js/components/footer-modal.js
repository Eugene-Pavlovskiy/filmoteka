import { next } from './footer-slider-btn';

let id = null;

const modal = document.getElementById('myModal');
const btn = document.getElementById('myBtn');
const span = document.getElementsByClassName('close')[0];
btn.onclick = function () {
  modal.style.display = 'block';
  document.body.classList.add('backdrop-scroll');
  setSliding();
};
span.onclick = function () {
  modal.style.display = 'none';
  document.body.classList.remove('backdrop-scroll');
  if (id) {
    clearInterval(id);
  }
};
window.onclick = function (event) {
  if (event.target == modal) {
    document.body.classList.remove('backdrop-scroll');
    modal.style.display = 'none';
    if (id) {
      clearInterval(id);
    }
  }
};

function setSliding() {
  if (id) {
    clearInterval(id);
  }

  id = setInterval(next, 2500);
}

export { id };

// document.body.classList.remove('backdrop-scroll');
