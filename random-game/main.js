const canvas = document.getElementById("game");
const context = canvas.getContext("2d");

const bw = 400;
// Box height
const bh = 400;
// Padding
const p = 10;

let tileCount = 10;
let tileSize = canvas.width / tileCount - 2;
let headX = 21;
let headY = 21;

let xMove = 0;
let yMove = 0;

function drawBoard() {
    for (let x = 0; x <= bw; x += 40) {
        context.moveTo(0.5 + x + p, p);
        context.lineTo(0.5 + x + p, bh + p);
    }

    for (let x = 0; x <= bh; x += 40) {
        context.moveTo(p, 0.5 + x + p);
        context.lineTo(bw + p, 0.5 + x + p);
    }
    context.strokeStyle = "white";
    context.stroke();

    changePosition();
    drawSnake();
}

drawBoard();

function drawSnake() {
    context.fillStyle = 'white';
    context.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function changePosition() {
    headX = headX + xMove;
    headY = headY + yMove;
}

document.body.addEventListener('keydown', keyDown);

function keyDown(event) {
    if (event.keyCode == 38) {
        yMove = -1;
        xMove = 0;
    }

    if (event.keyCode == 40) {
        yMove = 1;
        xMove = 0;
    }
}