const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");

const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");

const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");


const music = document.querySelector("audio");

const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

const canvas = document.getElementById("myCanvas");


//visualiser
function createVisualiser() {
    this.audioContext = new window.AudioContext();
    const analyser = audioContext.createAnalyser();
    // const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext('2d');
    this.src = audioContext.createMediaElementSource(music);
    this.src.connect(analyser);
    analyser.connect(audioContext.destination);

    let freqs = new Uint8Array(analyser.frequencyBinCount);

    function draw(){
        let radius = 75;
        let bars = 100;

        // Draw Background
        ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw Circle
        ctx.arc(
            canvas.width / 2,
            canvas.height / 2,
            radius,
            0,
            2 * Math.PI
        );

        ctx.stroke();
        analyser.getByteFrequencyData(freqs);
        
        //Draw Label
        ctx.font = "500 24px Helvetica Neue";
        const avg =
          [...Array(255).keys()].reduce((acc, curr) => acc + freqs[curr], 0) /
          255;
        ctx.fillStyle = "rgb(" + 200 + ", " + (200 - avg) + ", " + avg + ")";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillText("SUPER", canvas.width / 2, canvas.height / 2 - 24);
        ctx.fillText("MUSIC", canvas.width / 2, canvas.height / 2 + 6);
        
        //Draw bars
        for (var i = 0; i < bars; i++){
            let radians = (Math.PI * 2)/bars;
            let bar_height = freqs[i] * 0.5;

            let x = canvas.width / 2 + Math.cos(radians * i) * radius;
            let y = canvas.height /2 + Math.sin(radians * i) * radius;

            let x_end = canvas.width / 2 + Math.cos(radians * i) * (radius + bar_height);
            let y_end = canvas.height / 2 + Math.sin(radians * i) * (radius + bar_height);
            let color =
            "rgb(" + 200 + ", " + (200 - freqs[i]) + ", " + freqs[i] + ")";
            ctx.strokeStyle = color;
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x_end, y_end);
            ctx.stroke();
            }

        requestAnimationFrame(draw);
      }  
      requestAnimationFrame(draw);
    }

    

//Music
const songs = [
    // create object
    {
        name: "music01",
        displayName: "Summer",
        artist: "Jeo Hisaishi",
    },
    {
        name: "music02",
        displayName: "Shake It Off",
        artist: "Taylor Swift",
    },
    {
        name: "music03",
        displayName: "Do You Want Build a Snowman",
        artist: "Frozen Songs",
    },
    {
        name: "music04",
        displayName: "African Skies",
        artist: "African Folk",
    },
    {
        name: "music05",
        displayName: "Loud Thought",
        artist: "Bass Nation",
    }
];

//Check if Playing
//default is false
//it won't play unless you hit the button
let isPlaying = false;

//create a boolean object
let runCanvas = {
    value: false
};




//Play
function playSong(){
    isPlaying = true;
    playBtn.classList.replace("fa-play", "fa-pause");
    playBtn.setAttribute("title", "Pause");
    music.play();
}

//Pause
function pauseSong(){
    isPlaying = false;
    playBtn.classList.replace("fa-pause", "fa-play");
    playBtn.setAttribute("title", "Play");
    music.pause();
}

//Play or Pause Event Listener
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

//update Dom
function loadSong(song){
    //change the value of the title
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    //here use template string
    //make a string with a variable inside of it
    music.src = `music/${song.name}.mp3`;
    // image.src = `img/${song.name}.jpg`;
}

//Current Song
let songIndex = 0;


// Prev Song
function prevSong(){
    songIndex--;
    if (songIndex < 0){
        songIndex = songs.length -1;
    }
    loadSong(songs[songIndex]);
    playSong();
}


// Next Song
function nextSong(){
    songIndex++;
    if (songIndex > songs.length - 1){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

//On Load - Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
function updateProgressBar(e){
    if (isPlaying){
        const {duration, currentTime} = e.srcElement;
        //console.log(duration, currentTime);
        //update progress bar width in percentage
        const progressPercent = (currentTime/duration) * 100;
        //console.log(progressPercent);
        //cast it to string
        progress.style.width = `${progressPercent}%`;


        // Calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        //console.log("minute", durationMinutes);
        let durationSeconds = Math.floor(duration % 60);
        // Format the durationSeconds
        if(durationSeconds < 10){
            durationSeconds = `0${durationSeconds}`;
        }
        //console.log("seconds", durationSeconds);
        
        
        // Delay switching duration Element to avoid NaN
        // The Math deplay the display
        // Display only when it has duration
        if (durationSeconds){
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }


       // Calculate display for current
       // Similar to duration
       const currentMinutes = Math.floor(currentTime / 60);
       let currentSeconds = Math.floor(currentTime % 60);
       if(currentSeconds < 10){
           currentSeconds = `0${currentSeconds}`;
       }
       currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;

    }
}

// Set Progress Bar
function setProgressBar(e){
    //srcElement->clientWidth
    const width = this.clientWidth;
    const clickX = e.offsetX;
    //object destructuring
    //extract duration
    const {duration} = music;
    music.currentTime = (clickX / width) * duration;
}


//Event Listeners
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);

//Automated switch to the next song
music.addEventListener("ended", nextSong);

//when click on the canvas load the animation
canvas.addEventListener("click", function(){
    if (isPlaying && !runCanvas.value){
        createVisualiser();
        runCanvas.value = true;
    }
});