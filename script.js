let upPressed = false;
let downPressed = false;
let leftPressed = false;
let rightPressed = false;

const main = document.querySelector('main');

//Player = 2, Wall = 1, Enemy = 3, Point = 0
//10 by 10 maze
let maze = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 0, 0, 0, 0, 0, 0, 3, 1],
    [1, 0, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 1, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 3, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

//Populates the maze in the HTML
for (let y of maze) {
    for (let x of y) {
        let block = document.createElement('div');
        block.classList.add('block');

        switch (x) {
            case 1:
                block.classList.add('wall');
                break;
            case 2:
                block.id = 'player';
                let mouth = document.createElement('div');
                mouth.classList.add('mouth');
                block.appendChild(mouth);
                break;
            case 3:
                block.classList.add('enemy');
                break;
            default:
                block.classList.add('point');
                block.style.height = '1vh';
                block.style.width = '1vh';
        }

        main.appendChild(block);
    }
}

//Player movement
function keyUp(event) {
    if (event.key === 'ArrowUp') {
        upPressed = false;
    } else if (event.key === 'ArrowDown') {
        downPressed = false;
    } else if (event.key === 'ArrowLeft') {
        leftPressed = false;
    } else if (event.key === 'ArrowRight') {
        rightPressed = false;
    }
}

function keyDown(event) {
    if (event.key === 'ArrowUp') {
        upPressed = true;
    } else if (event.key === 'ArrowDown') {
        downPressed = true;
    } else if (event.key === 'ArrowLeft') {
        leftPressed = true;
    } else if (event.key === 'ArrowRight') {
        rightPressed = true;
    }
}

const player = document.querySelector('#player');
const playerMouth = player.querySelector('.mouth');
let playerTop = 0;
let playerLeft = 0;
const wall = document.querySelector('.wall');

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);


function GameStarts() {
    document.getElementById("GameStarter").style.display = 'none';
    setInterval(function () {

        const position = player.getBoundingClientRect();
        // below is equivilent to downPressed == true
        if (downPressed) {
            GainPoint();
            let newBottom = position.bottom + 1;

            let btmL = document.elementFromPoint(position.left, newBottom);
            let btmR = document.elementFromPoint(position.right, newBottom);

            // below is equivilent to playerTop + 1
            if (btmL.classList.contains('wall') == false && btmR.classList.contains('wall') == false) {
                playerTop++;
                player.style.top = playerTop + 'px';
            }
            playerMouth.classList = 'down';
        }
        else if (upPressed) {
            GainPoint();
            let newTop = position.top - 1;
            let topL = document.elementFromPoint(position.left, newTop);
            let topR = document.elementFromPoint(position.right, newTop);

            if (topL.classList.contains('wall') == false && topR.classList.contains('wall') == false) {
            playerTop--;
            player.style.top = playerTop + 'px';
            }
            playerMouth.classList = 'up';
        }
        else if (leftPressed) {
            GainPoint();
            let newLeft = position.top - 1;
            let lefL = document.elementFromPoint(position.left, newLeft);
            let lefR = document.elementFromPoint(position.left, newLeft);

            if (lefL.classList.contains('wall') == false && lefR.classList.contains('wall') == false) {
            playerLeft--;
            player.style.left = playerLeft + 'px';
            }
            playerMouth.classlist = 'left';
        }
        else if (rightPressed) {
            GainPoint();
            let newRight = position.top - 1;
            let ritL = document.elementFromPoint(position.right, newRight);
            let ritR = document.elementFromPoint(position.right, newRight);

            // below is equivilent to playerTop + 1
            if (ritL.classList.contains('wall') == false && ritR.classList.contains('wall') == false) {
            playerLeft++;
            player.style.left = playerLeft + 'px';
            }
            playerMouth.classlist = 'left';
        }   
    } ,10);
}

function GainPoint() {
   const position = player.getBoundingClientRect();
   const points = document.querySelectorAll('.point');
   let score = document.querySelector("currentscore");
    for (let i = 0; i < points.length; i++) {
    let pointPosition = points[i].getBoundingClientRect();

    if (
        position.right > pointPosition.left &&
        position.left < pointPosition.right &&
        position.bottom > pointPosition.top &&
        position.top < pointPosition.bottom
    ) {
        points[i].style.height = '0';
    }
}
}

console.log('The height of the screen = ' + window.innerHeight);
console.log('The Width of the Screen is =' + window.innerWidth);
width = window.innerWidth;
height = window.innerHeight;

// dead animation? idk
//player.classList.add(dead);
//setTimeout() player.classList.remove(dead);
//classList.add(GAMEOVER);


//parseFloat() turns string into text.