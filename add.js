const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const repeatButton = document.getElementById("repeat");
const shuffleButton = document.getElementById("shuffle");
const audio = document.getElementById("audio");
const songImage = document.getElementById("song-image");
const songName = document.getElementById("song-name");
const songArtist = document.getElementById("song-artist");
const pauseButton = document.getElementById("pause");
const playButton = document.getElementById("play");
const playListButton = document.getElementById("playlist");

const maxDuration = document.getElementById("max-duration");
const currentTimeRef = document.getElementById("current-time");

const progressBar = document.getElementById("progress-bar");
const playListContainer = document.getElementById("playlist-container");
const closeButton = document.getElementById("close-button");
const playListSong = document.getElementById("playlist-song");

const currentProgress = document.getElementById("current-progress");

// şarkı sırası
let index;

// döngü durumu
let loop = true;

// şarkı listesi obje olarak
const songsList = [
  {
    name: "Affet",
    link: "./mp3/Affet.mp3",
    artist: "Müslüm Gürses",
    image: "./resim/Affet.png",
  },
  {
    name: "Çeşmi Siyahım",
    link: "./mp3/Çeşmi Siyahım.mp3",
    artist: "Ahmet Aslan",
    image: "./resim/Çeşmi Siyahım.png",
  },
  {
    name: "Dönence",
    link: "./mp3/Dönence.mp3",
    artist: "Barış Manço",
    image: "./resim/Dönence.png",
  },
  {
    name: "Elfida",
    link: "./mp3/Elfida.mp3",
    artist: "Haluk Levent",
    image: "./resim/Elfida.png",
  },
  {
    name: "Islak Islak",
    link: "./mp3/Islak Islak.mp3",
    artist: "Cem Karaca",
    image: "./resim/Islak Islak.png",
  },
  {
    name: "Kaç Kadeh Kırıldı Sarhoş Gönlümde",
    link: "./mp3/Kaç Kadeh Kırıldı Sarhoş Gönlümde.mp3",
    artist: "Müslüm Gürses",
    image: "./resim/Kaç Kadeh Kırıldı Sarhoş Gönlümde.png",
  },
  {
    name: "Sen Gel Diyorsun Öf Öf",
    link: "./mp3/Sen Gel Diyorsun Öf Öf.mp3",
    artist: "Cem Adrian",
    image: "./resim/Sen Gel Diyorsun Öf Öf.png",
  },
  {
    name: "Vasiyet",
    link: "./mp3/Vasiyet.mp3",
    artist: "Sagopa Kajmer",
    image: "./resim/Vasiyet.png",
  },
  {
    name: "Yaz Dostum",
    link: "./mp3/Yaz Dostum.mp3",
    artist: "Barış Manço",
    image: "./resim/Yaz Dostum.png",
  },
];

//zaman düzenleme
const timeFormatter = (timeInput) => {
  let minute = Math.floor(timeInput / 60); // saniye cinsinden geldiğin de 60 a böl önüne sıfır ekle
  minute = minute < 10 ? "0" + minute : minute;

  let second = Math.floor(timeInput % 60); // modunu aldığımızda da kalanı verdğimizde bu
  second = second < 10 ? "0" + second : second;

  return `${minute}:${second}`;
};

// sarkı atama
const setSong = (arrayIndex) => {
  let { name, link, artist, image } = songsList[arrayIndex];

  audio.src = link;
  songName.innerHTML = name;
  songArtist.innerHTML = artist;
  songImage.src = image;

  audio.onloadeddata = () => {
    maxDuration = innerText = timeFormatter(audio.duration);
  };

  playListContainer.classList.add("hide");
  playAudio();
};

//sesi ac
const playAudio = () => {
  audio.play();
  pauseButton.classList.remove("hide");
  playButton.classList.add("hide");
};

// ses ilerlemesi
progressBar.addEventListener("click", (event) => {
  let coordStart = progressBar.getBoundingClientRect().left;

  let coordEnd = event.clientX;

  let progress = (coordEnd - coordStart) / progressBar.offsetWidth;

  currentProgress.style.width = progress * 100 + "%";

  audio.currentTime = progress * audio.duration;

  audio.play();
  pauseButton.classList.remove("hide");
  playButton.classList.add("hide");
});

setInterval(() => {
  currentTimeRef.innerHTML = timeFormatter(audio.currentTime);
  currentProgress.style.width =
    (audio.currentTime / audio.duration.toFixed(3)) * 100 + "%";
}, 1000);

audio.addEventListener("timeupdate", () => {
  currentTimeRef.innerText = timeFormatter(audio.currentTime);
});

// sonraki sarkı
const nextSong = () => {
  if (loop) {
    if (index == songsList.length - 1) {
      index = 0;
    } else {
      index = index + 1;
    }
    setSong(index);
  } else {
    let randIndex = Math.floor(Math.random() * songsList.length);
    setSong(randIndex);
  }
};

// sarkı bittiğinde
audio.onended = () => {
  nextSong();
};

// tekrar durumu
repeatButton.addEventListener("click", () => {
  if (repeatButton.classList.contains("active")) {
    repeatButton.classList.remove("active");
    audio.loop = false;
  } else {
    repeatButton.classList.add("active");
    audio.loop = true;
  }
});

//karıstırıcı ac
shuffleButton.addEventListener("click", () => {
  if (shuffleButton.classList.contains("active")) {
    shuffleButton.classList.remove("active");
    audio.loop = true;
  } else {
    shuffleButton.classList.add("active");
    audio.loop = false;
  }
});

const previousSong = () => {
  if (index > 0) {
    //sarkıyı durdur
    index -= 1;
  } else {
    index = songsList.length - 1;
  }
  setSong(index);
};

const pauseAudio = () => {
  audio.pause();
  pauseButton.classList.add("hide");
  playButton.classList.remove("hide");
};

// sarkı listesi ac
playListButton.addEventListener("click", () => {
  playListContainer.classList.remove("hide");
});

//sarkı listesi kapat
closeButton.addEventListener("click", () => {
  playListContainer.classList.add("hide");
});

// sarkı listesini olustur
const initializePlaylist = () => {
  for (let i in songsList) {
    playListSong.innetHTML += `<li class="playlistSongs"
    onclick="setSong(${i})">
    <div class="playlist-image-container">
    <img src="${songsList[i].image}">
    </div>
    <div class="playlist-song-details">
      <span id="playlist-song-name">
         ${songsList[i].name}
      </span>
      <span id="playlist-song-artist-name">
      ${songsList[i].artist}
   </span>
    </div>
    </li>
    `;
  }
};
// ekran yüklenildiğinde
window.onload = () => {
  index = 0;
  setSong(index);
  playAudio();
  pauseAudio();
  initializePlaylist();
};

playButton.addEventListener("click", playAudio);

//next button
nextButton.addEventListener("click", nextSong);

// prev button
prevButton.addEventListener("click", previousSong);

//pause button
pauseButton.addEventListener("click", pauseAudio);

