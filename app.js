const musicName = ['Block Party - This modern love', 'Moby - Why Does My Heart Feel So Bad', 'PinkPantheress - Just For Me', 'rap2'];

const player = document.querySelector('.wrapper')
let playBtn = document.querySelector("#play");
let prevBtn = document.querySelector("#prev");
let nextBtn = document.querySelector("#next");
let title = document.querySelector('.music-title');
let playImg = document.querySelector("#play_img");
let range = document.querySelector("#range");
let progressContainer = document.querySelector('.progress_container');
let progress = document.querySelector('.progress');
let audio = document.querySelector('#audio');
let setVolume = document.querySelector('#volume')
let isPlaying = false;

let musicIndex = 0;




function loadSong(song){
      title.innerHTML = song
      audio.src = `music/${song}.mp3`; 
}
loadSong(musicName[musicIndex])

function playSong(){
      audio.play();
      playImg.src = 'src/pause.png';
}

function pauseSong(){
      audio.pause();
      playImg.src = 'src/play.png';
}

playBtn.addEventListener('click', () => {
      if (!isPlaying){
            isPlaying = true;
            playSong(); 
}
      else{
            isPlaying = false;
            pauseSong();
}
})

function nextSong(){
      musicIndex++
      isPlaying = true;
      if (musicIndex > musicName.length -1) {
            musicIndex = 0
}
      loadSong(musicName[musicIndex]);
      playSong();

}
nextBtn.addEventListener('click', nextSong)

function prevSong(){
      musicIndex--
      isPlaying = true;
      if (musicIndex < 0) {
            musicIndex = musicName.length - 1
      }
      loadSong(musicName[musicIndex]);
      playSong();
}
prevBtn.addEventListener('click', prevSong);

function updateProgress(e){
      const {duration, currentTime} = e.srcElement;
      const progressPercents = (currentTime / duration) * 100;
      progress.style.width = `${progressPercents}%`;
}
audio.addEventListener('timeupdate', updateProgress);

function setProgress(e){
      const width = this.clientWidth;
      const clickX = e.offsetX;
      const duration = audio.duration;
      audio.currentTime = (clickX / width) * duration
}

progressContainer.addEventListener('click', setProgress);

audio.addEventListener('ended', nextSong);

setVolume.onchange = function(e){
      e.preventDefault()
      audio.volume = parseFloat(this.value / 10)
}