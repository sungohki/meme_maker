
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

// Inits
canvas.width = 600;
canvas.height = 600;
ctx.lineWidth = 2;

// Functions
function onClick(event) {
    // console.log(event);
    const   lineColor = colors[Math.floor(Math.random() * colors.length)];
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.strokeStyle = lineColor;
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
}

// Events
canvas.addEventListener("mousemove", onClick);
