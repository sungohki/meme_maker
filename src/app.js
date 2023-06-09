
// Variables
const   CANVAS_WIDTH = 800;
const   CANVAS_HEIGHT = 800;

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
const   fileInput = document.querySelector("input#file");
const   textInput = document.querySelector("input#text");
const   saveBtn = document.querySelector("button#save");

let     isPainting = false;
let     isFilling = false;

// Inits
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = myLineWidth.value;
ctx.lineCap = "round";

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
fileInput.addEventListener("change", onFileChange);
canvas.addEventListener("dblclick", onDoubleClick);
saveBtn.addEventListener("click", onSaveClick);

// Functions
function onMove(event) {
    if (isPainting) {
        ctx.lineTo(event.offsetX, event.offsetY);
        // offsetX, offsetY : coordinate of mouse on canvas tag when event happened
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

function onFileChange(event) {
    const   file = event.target.files[0];
    const   url = URL.createObjectURL(file);
    const   image = new Image();
    image.src = url;
    image.onload = function() {
        ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        fileInput.value = null;
    };
}

function onDoubleClick(event) {
    const   text = textInput.value;
    if (text === "")
        return ;
    ctx.save();     // save ctx's current status ==> color, style, etc...
    ctx.lineWidth = 1;
    ctx.font = "48px serif";
    ctx.fillText(text, event.offsetX, event.offsetY);
    // ctx.strokeText(text, event.offsetX, event.offsetY);
    ctx.restore();  // restore saved status of ctx;
}

function onSaveClick(event) {
    const   url = canvas.toDataURL();     // return img incoded by base64;
    const   a = document.createElement("a");
    a.href = url;
    a.download = "myDrawing.png";
    a.click();
}