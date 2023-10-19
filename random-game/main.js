const canvas = document.getElementById("game");
const context = canvas.getContext("2d");

class SnakePart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

let speed = 7;

let tileCount = 21;
let tileSize = canvas.width / tileCount - 3;
let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 2;

let wormX = 3;
let wormY = 3;

let xMove = 0;
let yMove = 0;

let score = 0;

function drawBoard() {

    changePosition();
    let result = isGameOver();
    if (result) {
        return;
    }

    checkWormCollision();
    clearBoard();
    drawSnake();
    drawWorm();
    drawScore();

    if (score > 2) {
        speed = 11;
    }
    if (score > 5) {
        speed = 15;
    }

    setTimeout(drawBoard, 1000 / speed);
}

function isGameOver() {
    let gameOver = false;

    if (xMove === 0 && yMove === 0) {
        return false;
    }

    if (headX < 0) {
        gameOver = true;
    }

    else if (headX > tileCount) {
        gameOver = true;
    }

    else if (headY < 0) {
        gameOver = true;
    }

    else if (headY > tileCount) {
        gameOver = true;
    }

    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        if (part.x === headX && part.y === headY) {
            gameOver = true;
            break;
        }
    }

    if (gameOver) {
        context.fillStyle = "white";
        context.font = "50px Verdana";

        context.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);

        let results = JSON.parse(localStorage.getItem("scores")) || [];
        results.push({ gameNumber: results.length, score: score });
        results.sort((a, b) => b - a);
        results = results.slice(0, 10);
        localStorage.setItem("scores", JSON.stringify(results));
        // if (localStorage.getItem("scores") === null) {
        //     localStorage.setItem("scores", score);
        // } else {
        //     let result = localStorage.getItem("scores");
        //     let results = [];
        //     results.push(score);
        //     results.push(result);
        //     localStorage.setItem("scores", results);
        // }
    }

    return gameOver;
}

function drawScore() {
    context.fillStyle = "white";
    context.font = "10px Verdana";
    context.fillText("Score " + score, canvas.width - 50, 10);
}


function clearBoard() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    context.fillStyle = 'green';
    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        context.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }

    snakeParts.push(new SnakePart(headX, headY))
    if (snakeParts.length > tailLength) {
        snakeParts.shift();
    }

    context.fillStyle = 'white';
    context.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function drawWorm() {
    context.fillStyle = 'red';
    context.fillRect(wormX * tileCount, wormY * tileCount, tileSize, tileSize);
}

function checkWormCollision() {
    if (wormX === headX && wormY === headY) {
        wormX = Math.floor(Math.random() * tileCount);
        wormY = Math.floor(Math.random() * tileCount);
        tailLength++;
        score++;
    }
}

drawBoard();

document.body.addEventListener("keydown", keyDown);

function keyDown(event) {
    if (event.keyCode == 37) {
        if (xMove == 1) {
            return
        }
        xMove = -1;
        yMove = 0;
    }

    if (event.keyCode == 38) {
        if (yMove == 1) {
            return
        }
        xMove = 0;
        yMove = -1;
    }

    if (event.keyCode == 39) {
        if (xMove === -1) {
            return
        }
        xMove = 1;
        yMove = 0;
    }

    if (event.keyCode == 40) {
        if (yMove === -1) {
            return
        }
        xMove = 0;
        yMove = 1;
    }
}

function changePosition() {
    headX = headX + xMove;
    headY = headY + yMove;
}



