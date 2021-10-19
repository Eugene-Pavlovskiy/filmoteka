let offset = 0;
const sliderLine = document.querySelector('.slider-line');

document.querySelector('.slider-next').addEventListener('click', function () {
    offset = offset + 290;
    if (offset > 1450) {
        offset = 0;
    }
    sliderLine.style.left = -offset + 'px';
});

document.querySelector('.slider-previous').addEventListener('click', function() {
    offset = offset - 290;
    if (offset < 0) {
        offset = 1450;
    }
    sliderLine.style.left = -offset + 'px';
});