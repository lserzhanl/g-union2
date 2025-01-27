let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');
let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');
let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');
let background = document.querySelector('.background');
let player = document.querySelector('.player');
let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

/*
const music_list = [{
        artist: "Linkin Park",
        name: "Numb (piano)",
        path: "./assets/audio/1_linkin-park-linkin-park-numb-piano.mp3",
        img: "./assets/img/1_linkinpark_numb.jpg",
        durationTime: "2:57",
    },
    {
        artist: "Dr. Dre ft. Snoop Dogg",
        name: "Still DRE",
        path: "./assets/audio/2_Dr. Dre ft. Snoop Dogg - Still DRE.mp3",
        img: "./assets/img/2_still-dre.jpg",
        durationTime: "4:30",
    },
    {
        artist: "Usher",
        name: "Yeah",
        path: "./assets/audio/3_usher-yeah.mp3",
        img: "./assets/img/3_usher-yeah-img.jpg",
        durationTime: "4:10",
    },
    {
        artist: "Zhu",
        name: "Faded (Original Mix)",
        path: "./assets/audio/4_Zhu_-_Faded_(Original_Mix).mp3",
        img: "./assets/img/4_Zhu_-_Faded-img.jpg",
        durationTime: "3:43",
    },
    {
        artist: "Ian Carey",
        name: "Keep On Rising",
        path: "./assets/audio/5_ian_carey_feat_michelle_shellers-keep_on_rising.mp3",
        img: "./assets/img/600x600bb.webp",
        durationTime: "3:06",
    }
];
*/

const music_list = [
  {
    artist: 'galaxykz',
    name: 'UNION',
    path: './assets/audio/1_Гильдия_UNION_примет_в_свои_ряды_активны.mp3',
    img: './assets/img/1_linkinpark_numb.jpg',
    durationTime: '2:57',
  },
  {
    artist: 'galaxykz',
    name: 'This is Show',
    path: './assets/audio/2_В_жопу_шоу,_смотри_как_Данте_и_Октавия_у.mp3',
    img: './assets/img/600x600bb.webp',
    durationTime: '3:06',
  },
];

loadTrack(track_index);

function loadTrack(track_index) {
  clearInterval(updateTimer);
  reset();

  curr_track.src = music_list[track_index].path;
  curr_track.load();

  background.style.backgroundImage = 'url(' + music_list[track_index].img + ')';
  track_art.style.backgroundImage = 'url(' + music_list[track_index].img + ')';
  track_name.textContent = music_list[track_index].name;
  track_artist.textContent = music_list[track_index].artist;
  total_duration.textContent = music_list[track_index].durationTime;

  updateTimer = setInterval(setUpdate, 1000);

  curr_track.addEventListener('ended', nextTrack);
}

function reset() {
  curr_time.textContent = '00:00';
  total_duration.textContent = '00:00';
  seek_slider.value = 0;
}

function randomTrack() {
  isRandom ? pauseRandom() : playRandom();
}

function playRandom() {
  isRandom = true;
  randomIcon.classList.add('randomActive');
}

function pauseRandom() {
  isRandom = false;
  randomIcon.classList.remove('randomActive');
}

function repeatTrack() {
  let current_index = track_index;
  loadTrack(current_index);
  playTrack();
}

function playpauseTrack() {
  isPlaying ? pauseTrack() : playTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  track_art.classList.add('rotate');
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  track_art.classList.remove('rotate');
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack() {
  if (track_index < music_list.length - 1 && isRandom === false) {
    track_index += 1;
  } else if (track_index < music_list.length - 1 && isRandom === true) {
    let random_index = Number.parseInt(Math.random() * music_list.length);
    track_index = random_index;
  } else {
    track_index = 0;
  }
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0) {
    track_index -= 1;
  } else {
    track_index = music_list.length - 1;
  }
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function setUpdate() {
  let seekPosition = 0;
  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(
      curr_track.currentTime - currentMinutes * 60
    );
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(
      curr_track.duration - durationMinutes * 60
    );

    if (currentSeconds < 10) {
      currentSeconds = '0' + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = '0' + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = '0' + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = '0' + durationMinutes;
    }

    curr_time.textContent = currentMinutes + ':' + currentSeconds;
    // total_duration.textContent = durationMinutes + ":" + durationMinutes;
  }
}
