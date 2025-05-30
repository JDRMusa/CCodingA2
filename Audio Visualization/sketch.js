let sound, fft;
let fileInput;
let img;
let w = 1980;
let h = 1080;

function preload(){
  img = loadImage("BG.png")
}

function setup() {
  createCanvas(w/1.5, h/1.5);
  angleMode(DEGREES);
  noFill();
  fft = new p5.FFT();

  fileInput = createFileInput(handleFile);
  fileInput.position(10, 10);

  colorMode(HSL, 360, 100, 100, 1);
  strokeCap(ROUND);
}

function draw() {
  image(img,0,0,w/1.5,h/1.5)
  translate(width / 2, height / 2 + 50);

  if (!sound || !sound.isPlaying()) {
    noStroke();
    fill(210, 50, 90);
    textAlign(CENTER);
    textSize(18);
    text('Load and play an audio file', 0, 0);
    return;
  }

  let waveform = fft.waveform();

  let radius = 150;
  let barCount = 70;
  let maxBarLength = 130;

  strokeWeight(4);

  for (let glowAlpha of [0.12, 0.07, 0.03]) {
    stroke(200, 100, 70, glowAlpha);
    drawWaveHalfCircle(waveform, radius, maxBarLength, barCount, true);
    drawWaveHalfCircle(waveform, radius, maxBarLength, barCount, false);
  }

  for (let i = 0; i < barCount; i++) {
    let leftHue = map(i, 0, barCount - 1, 180, 220);
    stroke(leftHue, 90, 60);
    drawSingleBar(waveform, radius, maxBarLength, barCount, i, true);


    let rightHue = map(i, 0, barCount - 1, 330, 290);
    stroke(rightHue, 90, 60);
    drawSingleBar(waveform, radius, maxBarLength, barCount, i, false);
  }
}

function drawWaveHalfCircle(waveform, radius, maxLen, count, isLeft) {
  for (let i = 0; i < count; i++) {
    let angle = isLeft
      ? map(i, 0, count - 1, 180, 0)
      : map(i, 0, count - 1, 0, -180);
    let index = floor(map(i, 0, count - 1, 0, waveform.length - 1));
    let amp = waveform[index];
    let len = map(amp, -1, 1, 20, maxLen);

    let x1 = radius * cos(angle);
    let y1 = radius * sin(angle);

    let x2 = (radius + len) * cos(angle);
    let y2 = (radius + len) * sin(angle);

    line(x1, y1, x2, y2);
  }
}

function drawSingleBar(waveform, radius, maxLen, count, i, isLeft) {
  let angle = isLeft
    ? map(i, 0, count - 1, 180, 0)
    : map(i, 0, count - 1, 0, -180);
  let index = floor(map(i, 0, count - 1, 0, waveform.length - 1));
  let amp = waveform[index];
  let len = map(amp, -1, 1, 20, maxLen);

  let x1 = radius * cos(angle);
  let y1 = radius * sin(angle);

  let x2 = (radius + len) * cos(angle);
  let y2 = (radius + len) * sin(angle);

  line(x1, y1, x2, y2);
}

function handleFile(file) {
  if (file.type === 'audio') {
    if (sound) sound.stop();
    sound = loadSound(file.data, () => {
      sound.play();
    });
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
