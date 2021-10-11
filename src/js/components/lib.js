import getRefs from './refs';
const refs = getRefs();

// refs.btnAddToWatched.addEventListener('click', addToWatched);
// refs.btnAddToWatched.addEventListener('click', removeFromWatched);

// function addToWatched() {
//   console.log('Add to watched clicked');
// }

// function removeFromWatched() {
//   console.log('Remove from watched clicked');
// }
console.log(refs.galleryTrending.children);
refs.galleryTrending.addEventListener('click', getButton);
function getButton(e) {
  console.log(e.target);
}
