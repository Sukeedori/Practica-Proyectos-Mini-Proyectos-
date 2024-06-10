let songsList = [
    {
        name: "Outsider",
        artist: "Eve",
        src: "assets/outsider-eve.mp3",
        cover: "assets/outsider-cover.jpg"
    },
    {
        name: "Dramaturgy",
        artist: "Eve",
        src: "assets/dramaturgy-eve.mp3",
        cover: "assets/dramaturgy-cover.jpg"
    },
    {
        name: "Raison d'etre",
        artist: "Eve",
        src: "assets/raisondetre-eve.mp3",
        cover: "assets/raisondetre-cover.jpg"
    },
    {
        name: "Things That Make It Warm",
        artist: "Cavetown",
        src: "assets/things_that_make_it_warm-cavetown.mp3",
        cover: "assets/things_that_make_it_warm-cover.jpg"
    },
    {
        name: "The Saddest Song",
        artist: "Alec Benjamin",
        src: "assets/the_saddest_song-alec_benjamin.mp3",
        cover: "assets/the_saddest_song-cover.jpg"
    },
    {
        name: "Mrs Magic",
        artist: "Strawberry Guy",
        src: "assets/mrs_magic-strawberry_guy.mp3",
        cover: "assets/mrs_magic-cover.jpg"
    },
    {
        name: "These Days",
        artist: "Wallows",
        src: "assets/these_days-wallows.mp3",
        cover: "assets/these_days-cover.jpg"
    },
    {
        name: "Byoushinwo Kamu",
        artist: "ZUTOMAYO",
        src: "assets/byoushinwo_kamu-ZUTOMAYO.mp3",
        cover: "assets/byoushinwo_kamu-cover.jpg"
    },
    {
        name: "Last Dance",
        artist: "Eve",
        src: "assets/last_dance-eve.mp3",
        cover: "assets/last_dance-cover.jpg"
    }
];

const artistName = document.querySelector('.artist-name');
const musicName = document.querySelector('.song-name');
const fillBar = document.querySelector('.fill-bar');
const time = document.querySelector('.time');
const cover = document.getElementById('cover');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const prog = document.querySelector('.progress-bar');

let song = new Audio();
let currentSong = 0;
let playing = false;

document.addEventListener('DOMContentLoaded', () => {
    songsList = shuffleArray(songsList); 
    loadSong(currentSong);
    song.addEventListener('timeupdate', updateProgress);
    song.addEventListener('ended', nextSong);
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    playBtn.addEventListener('click', togglePlayPause);
    prog.addEventListener('click', seek);
});

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function loadSong(index) {
    const { name, artist, src, cover: thumb } = songsList[index];
    artistName.innerText = artist;
    musicName.innerText = name;
    song.src = src;
    cover.style.backgroundImage = `url(${thumb})`;
}

function updateProgress() {
    if (song.duration) {
        const pos = (song.currentTime / song.duration) * 100;
        fillBar.style.width = `${pos}%`;

        const duration = formatTime(song.duration);
        const currentTime = formatTime(song.currentTime);
        time.innerText = `${currentTime} - ${duration}`;
    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function togglePlayPause() {
    if (playing) {
        song.pause();
    } else {
        song.play();
    }
    playing = !playing;
    playBtn.classList.toggle('fa-pause', playing);
    playBtn.classList.toggle('fa-play', !playing);
    cover.classList.toggle('active', playing);
}

function nextSong() {
    currentSong = (currentSong + 1) % songsList.length;
    playMusic();
}

function prevSong() {
    currentSong = (currentSong - 1 + songsList.length) % songsList.length;
    playMusic();
}

function playMusic() {
    loadSong(currentSong);
    song.play();
    playing = true;
    playBtn.classList.add('fa-pause');
    playBtn.classList.remove('fa-play');
    cover.classList.add('active');
}

function seek(e) {
    const pos = (e.offsetX / prog.clientWidth) * song.duration;
    song.currentTime = pos;
}