const modal = document.getElementById('myModal');
const btn = document.getElementById('myBtn');
const span = document.getElementsByClassName('close')[0];
btn.onclick = function () {
  modal.style.display = 'block';
  document.body.classList.add('backdrop-scroll');
};
span.onclick = function () {
  modal.style.display = 'none';
  document.body.classList.remove('backdrop-scroll');
};
window.onclick = function (event) {
  if (event.target == modal) {
    document.body.classList.remove('backdrop-scroll');
    modal.style.display = 'none';
  }
};

// document.body.classList.remove('backdrop-scroll');
