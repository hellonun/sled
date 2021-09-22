let vid;
let nativeWidth = 1080;
let nativeHeight = 1242;
let nativeNum = 7;
let nativeSlicewidth = nativeWidth / nativeNum;

let sliceWidth, sliceHeight;
let num;
let w, h, a; // width, height, aspect ratio

let seqs = []; // video sequence
let vids = [];
let completions = [];
let pcompletions = [];

let playing = false;

function setup() {
  calculateCanvassize();
  canvas = createCanvas(w, h);
  canvas.id("myCanvas");
}

function draw() {
  background(220);
  if (!playing) {
    background(0);
    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    text("Click to start", width / 2, height / 2);
  } else {
    for (i = 0; i < num; i++) {
      // sequence
      vids[i].width = a * nativeNum * height;
      vids[i].height = height;
      image(
        vids[i],
        i * sliceWidth,
        0,
        sliceWidth,
        sliceHeight,
        seqs[i] * sliceWidth,
        0,
        sliceWidth,
        sliceHeight
      );

      completions[i] = vids[i].time() / vids[i].duration();
      if (completions[i] < pcompletions[i]) {
        vids[i].speed(random(0.8, 1.5));
        seqs[i] = floor(random(nativeNum));
      }
      pcompletions[i] = completions[i];
    }
  }
}

function mousePressed() {
  if (playing == false) {
    loadVideo();
    playing = true;
  }
}

function calculateCanvassize() {
  a = nativeSlicewidth / nativeHeight;
  sliceHeight = windowHeight;
  sliceWidth = sliceHeight * a;

  if (windowWidth % sliceWidth > 0.9 * sliceWidth) {
    // if it's almost full, make it full by adding 1 more
    // canvas is bigger than screen - positioned in the middle
    num = floor(windowWidth / sliceWidth) + 1;
    w = sliceWidth * num;
    h = sliceHeight;
  } else {
    // otherwise resize height to fit screen - cut off top/bottom
    num = floor(windowWidth / sliceWidth);
    sliceWidth = windowWidth / num;
    sliceHeight = sliceWidth / a;
    w = windowWidth;
    h = sliceHeight;
  }
}

function loadVideo() {
  for (i = 0; i < num; i++) {
    let vid = createVideo(
      "https://player.vimeo.com/external/539781319.hd.mp4?s=fabb4f223302f594a118d56167f9158d34d06484&profile_id=175"
    );

    vid.loop();
    vid.hide();
    vid.speed(random(0.8, 1.5));
    vids.push(vid);
    seqs.push(floor(random(nativeNum)));
  }
  shuffle(seqs, true);
}
