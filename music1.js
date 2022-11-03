const musicListTag = document.getElementsByClassName('musicList')[0];
const audioTag = document.getElementsByClassName("audio")[0];
const progressBarTag = document.getElementsByClassName('progressBar')[0];
const currentProgressBarTag = document.getElementsByClassName("currentProgressBar")[0];
const preBtn = document.getElementsByClassName('previousBtn')[0];
const playBtn = document.getElementsByClassName('playBtn')[0];
const pauseBtn = document.getElementsByClassName('pauseBtn')[0];
const nextBtn = document.getElementsByClassName('nextBtn')[0];
const currentandTotalTime = document.getElementsByClassName('currentandTotalTime')[0];

const musicListArr = [
    { musicId: "music/Bird(G-fatt).mp3", title: "Bird ---G-fatt" }
    , { musicId: "music/BrNyar.mp3", title: "BrNyar" }
    , { musicId: "music/NgaYawHokeYaeLr.mp3", title: "NgaYawHokeYaeLr" }
    , { musicId: "music/TaKharPhwint HtarParTal(ShweHtoo).mp3", title: "TaKharPhwint HtarPrTal ---ShweHtoo" }
    , { musicId: "music/Today(G-fatt).mp3", title: "Today---G-fatt" }
];

for (let i = 0; i < musicListArr.length; i++) {
    const musicListHolder = document.createElement('div');
    musicListHolder.classList.add('musicListHolder');
    const musicTitle = [i + 1] + '. ' + musicListArr[i].title;
    musicListHolder.append(musicTitle);
    musicListTag.append(musicListHolder);
    musicListHolder.addEventListener('click', () => {
        musicIdtoPlay = i;
        songtoPlay = musicListArr[i].musicId;
        audioTag.src = songtoPlay;
        audioTag.play();
        isplaying = true;
        updateBtn();
    });
}



let musicTotalTime = '00:00', totalTime = 0;
audioTag.addEventListener('loadeddata', () => {
    totalTime = Math.floor(audioTag.duration);
    musicTotalTime = createMinuteandSecond(totalTime);

})

audioTag.addEventListener('timeupdate', () => {
    const currentTime = Math.floor(audioTag.currentTime)
    const musicCurrentTime = createMinuteandSecond(currentTime);
    const musicCurrentTimeandTotalTime = musicCurrentTime + ' / ' + musicTotalTime;
    currentandTotalTime.textContent = musicCurrentTimeandTotalTime;
    updateCurrentProgressBar(currentTime);
})

const createMinuteandSecond = (total) => {
    const minute = Math.floor(total / 60);
    const second = (total % 60);
    const minuteText = minute < 10 ? '0' + minute : minute;
    const secondText = second < 10 ? '0' + second : second;
    return minuteText + ':' + secondText;
}

const updateCurrentProgressBar = (currentTime) => {
    const mustPx = (500 / totalTime) * currentTime;
    currentProgressBarTag.style.width = mustPx.toString() + 'px';
}
let musicIdtoPlay = 0;
const playing = () => {
    songtoPlay = musicListArr[musicIdtoPlay].musicId;
    audioTag.src = songtoPlay;
    audioTag.play();
    isplaying = true;
    updateBtn();
}

playBtn.addEventListener('click', () => {
    isplaying = true;
    const currentTime = Math.floor(audioTag.currentTime);
    if (currentTime === 0) {
        songtoPlay = 0;
        playing();
    }
    else {
        audioTag.play();
        updateBtn();
    }

})

pauseBtn.addEventListener('click', () => {
    isplaying = false;
    updateBtn();
    audioTag.pause();
})

preBtn.addEventListener('click', () => {
    if (musicIdtoPlay === 0) {
        return;
    }
    else {
        musicIdtoPlay -= 1;
        playing();
    }
})

nextBtn.addEventListener('click', () => {
    if (musicIdtoPlay === musicListArr.length - 1) {
        return;
    }
    else {
        musicIdtoPlay += 1;
        playing();
    }
})

let isplaying = false;
const updateBtn = () => {
    if (isplaying) {
        playBtn.style.display = 'none';
        pauseBtn.style.display = 'inline';
    }
    else {
        playBtn.style.display = 'inline';
        pauseBtn.style.display = 'none';
    }
}

