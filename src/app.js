
// Variables
const   canvas = document.querySelector("canvas");
const   ctx = canvas.getContext("2d");      // for painting on <canvas>
const   myLineWidth = document.querySelector("#line-width");
const   myLineColor = document.querySelector("#line-color");
const   myPalette = Array.from(
    document.getElementsByClassName("color-option")
);

let     isPainting = false;

// Inits
canvas.width = 600;
canvas.height = 600;
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

function onColorClick(event){
    ctx.strokeStyle = event.target.dataset.color;
    ctx.fillStyle = event.target.dataset.color;
    myLineColor.value = event.target.dataset.color;
}
