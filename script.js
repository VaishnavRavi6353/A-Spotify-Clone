console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let flag = 0;
let shuffle = document.getElementById("shuffle");
let repeat = document.getElementById("repeat");

let songs = [
  {
    songName: "Ae Dil Hai Mushkil - Title Track",
    filePath: "songs/1.mp3",
    coverPath: "covers/1.jpg",
    duration: "04:29",
  },
  {
    songName: "Chaand_ne_Kaho",
    filePath: "songs/2.mp3",
    coverPath: "covers/2.jpg",
    duration: "03:06",
  },
  {
    songName: "Dhadak_-_Title_Track",
    filePath: "songs/3.mp3",
    coverPath: "covers/3.jpg",
    duration: "03:35",
  },
  {
    songName: "hamdard",
    filePath: "songs/4.mp3",
    coverPath: "covers/4.jpg",
    duration: "04:20",
  },
  {
    songName: "Hasi (Male)",
    filePath: "songs/5.mp3",
    coverPath: "covers/5.jpg",
    duration: "04:32",
  },
  {
    songName: "Ishq_Mubarak",
    filePath: "songs/6.mp3",
    coverPath: "covers/6.jpg",
    duration: "04:56",
  },
  {
    songName: "Jo Bheji Thi Dua",
    filePath: "songs/7.mp3",
    coverPath: "covers/7.jpg",
    duration: "04:20",
  },
  {
    songName: "Jogi (RaagJatt.com)",
    filePath: "songs/8.mp3",
    coverPath: "covers/8.jpg",
    duration: "04:33",
  },
  {
    songName: "Phir Bhi Tumko Chaahunga",
    filePath: "songs/9.mp3",
    coverPath: "covers/9.jpg",
    duration: "05:50",
  },
  {
    songName: "Samjhawan",
    filePath: "songs/10.mp3",
    coverPath: "covers/10.jpg",
    duration: "04:29",
  },
];

function random() {
  const min = 1;
  const max = 10;
  const randomNumberInRange = Math.random() * (max - min + 1) + min;
  console.log(randomNumberInRange);
  return parseInt(randomNumberInRange); // Outputs a random number between 1 and 10 (inclusive)
}
songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
  element.getElementsByClassName("duration")[0].innerText = songs[i].duration;
});
const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-pause-circle");
      element.classList.add("fa-play-circle");
    }
  );
};

// Handle play/pause click
masterPlay.addEventListener("click", () => {
  if (flag == 0) {
    if (audioElement.paused || audioElement.currentTime <= 0) {
      audioElement.play();
      masterPlay.classList.remove("fa-play-circle");
      masterPlay.classList.add("fa-pause-circle");
      gif.style.opacity = 1;
      masterSongName.innerText = songs[0].songName;
      flag = 1;
    } else {
      audioElement.pause();
      masterPlay.classList.remove("fa-pause-circle");
      masterPlay.classList.add("fa-play-circle");
      gif.style.opacity = 0;
      makeAllPlays();
      flag = 1;
    }
  } else {
    if (audioElement.paused || audioElement.currentTime <= 0) {
      audioElement.play();
      masterPlay.classList.remove("fa-play-circle");
      masterPlay.classList.add("fa-pause-circle");
      gif.style.opacity = 1;
      flag = 1;
    } else {
      audioElement.pause();
      masterPlay.classList.remove("fa-pause-circle");
      masterPlay.classList.add("fa-play-circle");
      gif.style.opacity = 0;
      makeAllPlays();
      flag = 1;
    }
  }
});
// Listen to Events
audioElement.addEventListener("timeupdate", () => {
  // Update Seekbar
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      makeAllPlays();
      songIndex = parseInt(e.target.id);
      e.target.classList.remove("fa-play-circle");
      e.target.classList.add("fa-pause-circle");
      audioElement.src = `songs/${songIndex + 1}.mp3`;
      masterSongName.innerText = songs[songIndex].songName;
      audioElement.currentTime = 0;
      audioElement.play();
      gif.style.opacity = 1;
      masterPlay.classList.remove("fa-play-circle");
      masterPlay.classList.add("fa-pause-circle");
      flag = 1;
    });
  }
);

document.getElementById("next").addEventListener("click", () => {
  if (songIndex >= 9) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
  makeAllPlays();
  let minorplay = document.getElementById(songIndex);
  minorplay.classList.remove("fa-play-circle");
  minorplay.classList.add("fa-pause-circle");
  flag = 1;
});

document.getElementById("previous").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 0;
  } else {
    songIndex -= 1;
  }
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
  makeAllPlays();
  let minorplay = document.getElementById(songIndex);
  minorplay.classList.remove("fa-play-circle");
  minorplay.classList.add("fa-pause-circle");
  flag = 1;
});

audioElement.addEventListener("ended", () => {
  if (songIndex == 9) {
    songIndex = 0;
  } else {
    songIndex = songIndex + 1;
  }
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  audioElement.play();
  masterSongName.innerText = songs[songIndex].songName;
  makeAllPlays();
  let minorplay = document.getElementById(songIndex);
  minorplay.classList.remove("fa-play-circle");
  minorplay.classList.add("fa-pause-circle");
});

repeat.style.color = "green";
repeat.addEventListener("click", () => {
  repeat.style.color = "green";
  shuffle.style.color = "white";
  audioElement.addEventListener("ended", () => {
    if (songIndex == 9) {
      songIndex = 0;
    } else {
      songIndex = songIndex + 1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    audioElement.play();
    masterSongName.innerText = songs[songIndex - 1].songName;
    makeAllPlays();
    let minorplay = document.getElementById(songIndex);
    minorplay.classList.remove("fa-play-circle");
    minorplay.classList.add("fa-pause-circle");
  });
  document.getElementById("next").addEventListener("click", () => {
    if (songIndex >= 9) {
      songIndex = 0;
    } else {
      songIndex += 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    makeAllPlays();
    let minorplay = document.getElementById(songIndex);
    minorplay.classList.remove("fa-play-circle");
    minorplay.classList.add("fa-pause-circle");
    flag = 1;
  });

  document.getElementById("previous").addEventListener("click", () => {
    if (songIndex <= 0) {
      songIndex = 0;
    } else {
      songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    makeAllPlays();
    let minorplay = document.getElementById(songIndex);
    minorplay.classList.remove("fa-play-circle");
    minorplay.classList.add("fa-pause-circle");
    flag = 1;
  });
});
shuffle.addEventListener("click", () => {
  repeat.style.color = "white";
  shuffle.style.color = "green";
  audioElement.addEventListener("ended", () => {
    songIndex = random();
    console.log(songIndex);
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    audioElement.play();
    masterSongName.innerText = songs[songIndex].songName;
    makeAllPlays();
    let minorplay = document.getElementById(songIndex);
    minorplay.classList.remove("fa-play-circle");
    minorplay.classList.add("fa-pause-circle");
  });
  document.getElementById("next").addEventListener("click", () => {
    songIndex = random();
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    makeAllPlays();
    let minorplay = document.getElementById(songIndex);
    minorplay.classList.remove("fa-play-circle");
    minorplay.classList.add("fa-pause-circle");
    flag = 1;
  });
});
