import getRefs from "./refs";
import videoTpl from '../../palets/video-modal.hbs'
import notFoundTpl from '../../palets/video-not-found.hbs'
const KEY = '94f703750c3e0771d8c2babc592efc94';
const refs = getRefs();

let a = 0;

async function fetchVideos(index) {
    const videoRespons = await fetch(
      `https://api.themoviedb.org/3/movie/${index}/videos?api_key=${KEY}&language=en-US`,
    );
  
    const parsedRespons = await videoRespons.json();
   
    return parsedRespons.results;
  }
  


  function getCloseVideo(e) {
      closeVideo(e);
  
  }
  function openVideo(e) {

    const posterClicked = e.target;
  
    if (e.target.nodeName !== 'BUTTON') {
      return;
    }
  
    const index = e.target.dataset.index;
    const btn = e.target;
  
    const moviesArr = JSON.parse(localStorage.getItem('currentColection'));
    
    if(posterClicked.dataset.action === 'toggle-video')
    {
      openVideoModal(moviesArr[index],btn)
      refs.videoClose.classList.remove('display-btn')
    }

    else {
      
    }
    
  }

  function openVideoModal(index, btn) {
   
    console.log(index.id)
    fetchVideos(index.id)
  .then(response => {
    if(response.length > 0){
    const videoMarkUp = videoTpl((response[0]))
    refs.videoCont.insertAdjacentHTML('beforeend', videoMarkUp);
    }
    else {
      refs.videoCont.insertAdjacentHTML('beforeend', notFoundTpl(index));
    }
    console.log(response)
    return response
  })
  
  }
  function closeVideo(e) {

    const posterClicked = e.target;
  
    if (e.target.nodeName !== 'BUTTON') {
      return;
    }

    
    if(posterClicked.dataset.action === 'toggle-video-close')
    {
      closeVideoModal()
    }

  }

  refs.videoClose.addEventListener('click', closeVideoModal)

  function closeVideoModal() {

    refs.videoCont.innerHTML = '';
    refs.videoClose.classList.add('display-btn')
  }
  export{openVideo, closeVideo, closeVideoModal}