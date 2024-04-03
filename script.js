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
        // below is equivilent to downPressed == true
        if (downPressed) {
            let position = player.getBoundingClientRect()
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
            playerTop--;
            player.style.top = playerTop + 'px';
            playerMouth.classList = 'up';
        }
        else if (leftPressed) {
            playerLeft--;
            player.style.left = playerLeft + 'px';
            playerMouth.classList = 'left';
        }
        else if (rightPressed) {
            playerLeft++;
            player.style.left = playerLeft + 'px';
            playerMouth.classList = 'right';
        }
    }, 10);
}

console.log('The height of the screen = ' + window.innerHeight);
console.log('The Width of the Screen is =' + window.innerWidth);
width = window.innerWidth;
height = window.innerHeight;
console.log(wallpos);
console.log(playerpos);

// dead animation? idk
//player.classList.add(dead);
//setTimeout() player.classList.remove(dead);
//classList.add(GAMEOVER);


//parseFloat() turns string into text.