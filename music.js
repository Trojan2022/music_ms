const playListContainerTag = document.getElementsByClassName('palyListContainer')[0];
const audioTag = document.getElementsByClassName('audioTag')[0];
const currentAndTotalTimeTag = document.getElementsByClassName('currentAndTotalTime')[0];
const currentProgressTag = document.getElementById('currentProgress');
const playButtonTag = document.getElementsByClassName('playButton')[0];
const pauseButtonTag = document.getElementsByClassName('pauseButton')[0];
const previousButtonTag = document.getElementsByClassName('previousButton')[0];
const nextButtonTag = document.getElementsByClassName('nextButton')[0];


const musiclist = [
    { musicId: "music/Bird(G-fatt).mp3", title: "Bird ---G-fatt" }
    , { musicId: "music/BrNyar.mp3", title: "BrNyar" }
    , { musicId: "music/NgaYawHokeYaeLr.mp3", title: "NgaYawHokeYaeLr" }
    , { musicId: "music/TaKharPhwint HtarParTal(ShweHtoo).mp3", title: "TaKharPhwint HtarPrTal ---ShweHtoo" }
    , { musicId: "music/Today(G-fatt).mp3", title: "Today---G-fatt" }
]

//1 getting title and playing with touch

for (let i = 0; i < musiclist.length; i++) {
    const musicTag = document.createElement('div');
    musicTag.addEventListener('click', () => {
        const musicId = musiclist[i].musicId;
        audioTag.src = musicId;
        audioTag.play();
        isplaying = true;
        updatePlayAndPauseBtn();
        playId = i;
    })
    musicTag.classList.add("musicItem");
    const title = (i + 1).toString() + ". " + musiclist[i].title;
    musicTag.textContent = title;
    playListContainerTag.append(musicTag);
}
//1 End

//2 getting minutes and seconds from the related music
let durationText = "00:00";
let duration = 0;
audioTag.addEventListener('loadeddata', () => {
    duration = Math.floor(audioTag.duration);
    durationText = createMinuteAndSecondText(duration);

})

audioTag.addEventListener('timeupdate', () => {
    const currentTime = Math.floor(audioTag.currentTime);
    const currentTimeText = createMinuteAndSecondText(currentTime);
    const currentTimeTextAnddurationText = currentTimeText + " / " + durationText;
    currentAndTotalTimeTag.textContent = currentTimeTextAnddurationText;
    updateProgressBar(currentTime);
});
//2 End

//3 method of changing minutes and seconds
const createMinuteAndSecondText = (totalSecond) => {
    const minute = Math.floor(totalSecond / 60);
    const second = totalSecond % 60;

    const minuteText = minute < 10 ? "0" + minute : minute;
    const secondText = second < 10 ? "0" + second : second;
    return minuteText + ":" + secondText;
};
//3 End

//4 Make to run the progress bar
const updateProgressBar = (currentTime) => {
    const changingPx = (500 / duration) * currentTime;
    currentProgressTag.style.width = changingPx + "px";
}
//4 End

//5 Making Buttons to Live
let playId = 0;
let isplaying = false;
playButtonTag.addEventListener('click', () => {
    const currentTime = Math.floor(audioTag.currentTime);
    isplaying = true;
    if (currentTime === 0) {
        const playingBtn = musiclist[playId].musicId;
        audioTag.src = playingBtn;
        audioTag.play();

        updatePlayAndPauseBtn();
    }
    else {
        audioTag.play();
        updatePlayAndPauseBtn();
    }


});

pauseButtonTag.addEventListener('click', () => {
    isplaying = false;
    audioTag.pause();
    updatePlayAndPauseBtn();
})

const updatePlayAndPauseBtn = () => {
    if (isplaying) {
        playButtonTag.style.display = "none";
        pauseButtonTag.style.display = "inline";
    }
    else {
        playButtonTag.style.display = "inline";
        pauseButtonTag.style.display = "none";
    }
}


previousButtonTag.addEventListener('click', () => {
    if (playId === 0) {
        return;
    }
    else {
        playId -= 1;
        playSong();
    }
})

nextButtonTag.addEventListener('click', () => {
    if (playId === musiclist.length - 1) {
        return;
    }
    else {
        playId += 1;
        playSong();
    }
})

const playSong = () => {
    const songToPlay = musiclist[playId].musicId;
    isplaying = true;
    audioTag.src = songToPlay;
    audioTag.play();
    updatePlayAndPauseBtn();
    audioTag.style.backgroundColor='red';
}


