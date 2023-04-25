
// Variables
const   CANVAS_WIDTH = 600;
const   CANVAS_HEIGHT = 600;

const   canvas = document.querySelector("canvas");
const   ctx = canvas.getContext("2d");      // for painting on <canvas>
const   myLineWidth = document.querySelector("#line-width");
const   myLineColor = document.querySelector("#line-color");
const   myPalette = Array.from(
    document.getElementsByClassName("color-option")
);
const   modeBtn = document.querySelector("#mode-btn");
const   destroyBtn = document.querySelector("#destroy-btn");
const   eraseBtn = document.querySelector("#erase-btn");

let     isPainting = false;
let     isFilling = false;

// Inits
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = myLineWidth.value;

// Events
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
myLineWidth.addEventListener("change", onLineWidthChange);
myLineColor.addEventListener("change", onColorChanage);
myPalette.forEach(
    (arg) => arg.addEventListener("click", onColorClick)
);
modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click", onDestroyClick);
eraseBtn.addEventListener("click", onEraseClick);
canvas.addEventListener("click", onCanvasClick);

// Functions
function onMove(event) {
    if (isPainting) {
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return ;
    }
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
}

function startPainting(event) {
    if (!isFilling)
        isPainting = true;
}

function cancelPainting(event) {
    isPainting = false;
}

function onLineWidthChange(event) {
    ctx.lineWidth = event.target.value;
}

function onColorChanage(event) {
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
}

function onColorClick(event) {
    ctx.strokeStyle = event.target.dataset.color;
    ctx.fillStyle = event.target.dataset.color;
    myLineColor.value = event.target.dataset.color;
}

function onModeClick(event) {
    if (isFilling) {
        isFilling = false;
        modeBtn.innerText = "Fill";
    }
    else {
        isFilling = true;
        modeBtn.innerText = "Draw";
    }
}

function onCanvasClick(event) {
    if (isFilling) {
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}

function onDestroyClick(event) {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onEraseClick(event) {
    ctx.strokeStyle = "white";
    isFilling = false;
    modeBtn.innerText = "Fill";
}