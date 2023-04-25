
// Variables
const   canvas = document.querySelector("canvas");
const   ctx = canvas.getContext("2d");      // for painting on <canvas>
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
ctx.lineWidth = 2;

// Functions
function onMove(event) {
    if (isPainting) {
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return ;
    }
    ctx.moveTo(event.offsetX, event.offsetY);
}

function startPainting(event) {
    isPainting = true;
}

function cancelPainting(event) {
    isPainting = false;
}

// Events
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
