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
            let position = player.getBoundingClientRect();
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
            let position = player.getBoundingClientRect();
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
            let position = player.getBoundingClientRect();
            let newLeft = position.left - 1;

            let lefL = document.elementFromPoint(position.left, newLeft);
            let lefR = document.elementFromPoint(position.right, newLeft);

            if (lefL.classList.contains('wall') == false && lefR.classlist.contains('wall') == false) {
            playerLeft--;
            player.style.left = playerLeft + 'px';
            }
            playerMouth.classlist = 'left';
        }
        else if (rightPressed) {
            let position = player.getBoundingClientRect();
            let newRight= position.right + 1;

            let ritL = document.elementFromPoint(position.left, newRight);
            let ritR = document.elementFromPoint(position.right, newRight);

            // below is equivilent to playerTop + 1
            if (ritL.classList.contains('wall') == false && ritR.classList.contains('wall') == false) {
            playerLeft++;
            player.style.left = playerLeft + 'px';
            }
            playerMouth.classlist = 'left';
        }   
    }, 10);
}

function GainPoint() {
    const position = player.getBoundingClientRect();

    const point1 = document.querySelectorAll('.point')[0];
    const point2 = document.querySelectorAll('.point')[1];
    const point3 = document.querySelectorAll('.point')[2];
    const point4 = document.querySelectorAll('.point')[3];
    const point5 = document.querySelectorAll('.point')[4];
    const point6 = document.querySelectorAll('.point')[5];
    const point7 = document.querySelectorAll('.point')[6];
    const point8 = document.querySelectorAll('.point')[7];
    const point9 = document.querySelectorAll('.point')[8];
    const point10 = document.querySelectorAll('.point')[9];
    const point11 = document.querySelectorAll('.point')[9];
    const point12 = document.querySelectorAll('.point')[10];
    const point13 = document.querySelectorAll('.point')[11];
    const point14 = document.querySelectorAll('.point')[12];
    const point15 = document.querySelectorAll('.point')[13];
    const point16 = document.querySelectorAll('.point')[14];
    const point17 = document.querySelectorAll('.point')[15];
    const point18 = document.querySelectorAll('.point')[16];
    const point19 = document.querySelectorAll('.point')[17];
    const point20 = document.querySelectorAll('.point')[18];
    const point21 = document.querySelectorAll('.point')[19];


    const p1Position = point1.getBoundingClientRect();
    const p2Poisition = point2.getBoundingClientRect();
    const p3Position = point3.getBoundingClientRect();
    const p4Poisition = point4.getBoundingClientRect();
    const p5Position = point5.getBoundingClientRect();
    const p6Poisition = point6.getBoundingClientRect();
    const p7Position = point7.getBoundingClientRect();
    const p8Poisition = point8.getBoundingClientRect();
    const p9Position = point9.getBoundingClientRect();
    const p10Poisition = point10.getBoundingClientRect();
    const p11Position = point11.getBoundingClientRect();
    const p12oisition = point12.getBoundingClientRect();
    const p13Position = point13.getBoundingClientRect();
    const p14Poisition = point14.getBoundingClientRect();
    const p15Position = point15.getBoundingClientRect();
    const p16Poisition = point16.getBoundingClientRect();
    const p17Position = point17.getBoundingClientRect();
    const p18Poisition = point18.getBoundingClientRect();
    const p19Position = point19.getBoundingClientRect();
    const p20Poisition = point20.getBoundingClientRect();
    const p21Position = point21.getBoundingClientRect();

    // Point 1 Collect
    if (
        position.right > p1Position.left &&
        position.left < p1Position.right &&
        position.bottom > p1Poisition.top &&
        position.top  < p1Position.bottom )
    {
        point1.style.display='none';
    }
        // Point 2 Collect
    if (
        position.right > p2Position.left &&
        position.left < p2Position.right &&
        position.bottom > p2Poisition.top &&
        position.top  < p2Position.bottom )
    {
        point2.style.display='none';
    }
        // Point 3 Collect
    if (
        position.right > p3Position.left &&
        position.left < p3Position.right &&
        position.bottom > p3Poisition.top &&
        position.top  < p3Position.bottom )
    {
        point3.style.display='none';
    }
    // Point 4 Collect
    if (
        position.right > p1Position.left &&
        position.left < p1Position.right &&
        position.bottom > p1Poisition.top &&
        position.top  < p1Position.bottom )
    {
        point1.style.display='none';
    }
    // Point 5 Collect
    if (
        position.right > p5Position.left &&
        position.left < p5Position.right &&
        position.bottom > p5Poisition.top &&
        position.top  < p5Position.bottom )
    {
        point5.style.display='none';
    }
        // Point 6 Collect
    if (
        position.right > p6Position.left &&
        position.left < p6Position.right &&
        position.bottom > p6Poisition.top &&
        position.top  < p6Position.bottom )
    {
        point6.style.display='none';
    }
    // Point 7 Collect
    if (
        position.right > p7Position.left &&
        position.left < p7Position.right &&
        position.bottom > p7Poisition.top &&
        position.top  < p7Position.bottom )
    {
        point7.style.display='none';
    }
    // Point 8 Collect
    if (
        position.right > p8Position.left &&
        position.left < p8Position.right &&
        position.bottom > p8Poisition.top &&
        position.top  < p8Position.bottom )
    {
        point8.style.display='none';
    }
    if (
        position.right > p1Position.left &&
        position.left < p1Position.right &&
        position.bottom > p1Poisition.top &&
        position.top  < p1Position.bottom )
    {
        point1.style.display='none';
    }
    if (
        position.right > p1Position.left &&
        position.left < p1Position.right &&
        position.bottom > p1Poisition.top &&
        position.top  < p1Position.bottom )
    {
        point1.style.display='none';
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