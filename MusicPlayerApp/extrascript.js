// This version is for basic bar visualization of sound

//visualiser
function createVisualiser() {
    this.audioContext = new window.AudioContext();
    const analyser = audioContext.createAnalyser();
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext('2d');
    this.src = audioContext.createMediaElementSource(music);
    this.src.connect(analyser);
    analyser.connect(audioContext.destination);

    analyser.fftSize = 128;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const barWidth = (canvas.width / bufferLength) * 2.5;

    let barHeight;
    let bar;
        
    function renderFrame() {
        requestAnimationFrame(renderFrame);
        bar = 0;
        analyser.getByteFrequencyData(dataArray);
      
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      
        for (let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i] - 75;
            const r = barHeight + (25 * (i/bufferLength));
            ctx.fillStyle = `rgb(${r}, 100, 50)`;
            ctx.fillRect(bar, canvas.height - barHeight, barWidth, barHeight);
            bar += barWidth + 2;
        
        }
    }
    renderFrame();
}
