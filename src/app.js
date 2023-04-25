
// Variables
const   canvas = document.querySelector("canvas");
const   ctx = canvas.getContext("2d");      // for painting on <canvas>
const   myLineWidth = document.querySelector("#line-width");
const   myLineColor = document.querySelector("#line-color");
const   colors = [
    "#e74c3c",
    "#e67e22",
    "#f1c40f",
    "#2ecc71",
    "#3498db",
    "#34495e",
    "#9b59b6",
    "#95a5a6",
    "#ecf0f1"
];
let     isPainting = false;

// Inits
canvas.width = 600;
canvas.height = 600;
ctx.lineWidth = myLineWidth.value;

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

// Events
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
myLineWidth.addEventListener("change", onLineWidthChange);
myLineColor.addEventListener("change", onColorChanage);