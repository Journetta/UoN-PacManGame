let upPressed = false;
let downPressed = false;
let leftPressed = false;
let rightPressed = false;

let rs = [];

for (let i = 0; i < 17; i++) {
    rs[i] = Math.round(Math.random() * 1);
}


const main = document.querySelector('main');

//Player = 2, Wall = 1, Enemy = 3, Point = 0
//10 by 10 maze
let maze = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 0, 0, 0, rs[16], 0, 0, 3, 1],
    [1, 0, 0, rs[1], 0, 0, 0, rs[14], rs[15], 1],
    [1, 0, 0, 0, rs[2], 0, 0, 0, 0, 1],
    [1, 0, rs[4], rs[3], 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, rs[5], rs[6], 1],
    [1, 0, 0, rs[7], 0, 0, 0, 0, 0, 1],
    [1, rs[8], 0, rs[9], 0, rs[11], 0, rs[12], 0, 1],
    [1, 3, 0, rs[10], 0, rs[2], 0, rs[13], 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

// Populates the maze in the HTML.
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
    console.log("Game Start! was pressed");
    document.getElementById("GameStarter").style.display = 'none';
    clock = setInterval(function () {
        const time = document.getElementById('currenttime');
        timer++;
        totaltimer = timer + "s";
        time.firstChild.nodeValue = totaltimer;
        // Dead after 120 Seconds
        if (timer == 120) {
            Lost1();
            Lost2();
            LostAll();
            Refresh();
        }
    }, 1000)
    setInterval(function () {
        const position = player.getBoundingClientRect();
        // below is equivilent to downPressed == true
        if (downPressed) {
            GainPoint();
            killer();
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
            killer();
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
            killer();
            let newLeft = position.left - 1;
            let lefL = document.elementFromPoint(newLeft, position.bottom);
            let lefR = document.elementFromPoint(newLeft, position.top);

            if (lefL.classList.contains('wall') == false && lefR.classList.contains('wall') == false) {
                playerLeft--;
                player.style.left = playerLeft + 'px';
            }
            playerMouth.classlist = 'left';
        }
        else if (rightPressed) {
            GainPoint();
            killer();
            let newRight = position.right - 1;
            let ritL = document.elementFromPoint(newRight, position.bottom);
            let ritR = document.elementFromPoint(newRight, position.top);

            // below is equivilent to playerTop + 1
            if (ritL.classList.contains('wall') == false && ritR.classList.contains('wall') == false) {
                playerLeft++;
                player.style.left = playerLeft + 'px';
            }
            playerMouth.classlist = 'right';
        }
    }, 10);
}

let tp = 0;
let wingame = 6;
let timer = 0;

function GainPoint() {
    const position = player.getBoundingClientRect();
    let score = document.querySelector(".currentscore");
    const points = document.querySelectorAll('.point');
    for (let i = 0; i < points.length; i++) {
        let pointPosition = points[i].getBoundingClientRect();

        if (
            position.right > pointPosition.left &&
            position.left < pointPosition.right &&
            position.bottom > pointPosition.top &&
            position.top < pointPosition.bottom
        ) {
            console.log("+1 Point");
            tp++;
            score.firstChild.nodeValue = tp;
            points[i].classList.remove("point");
            wingame--;
        }
    }
    if (tp == 40) {
        console.log("40 Points! Gained!");
        h1 = document.getElementById("TT");
        LeaderBoard();
        setTimeout(function () {
            console.log('win');
            h1 = document.getElementById("gameover");
            start = document.getElementById("TT");
            document.getElementById("GameStarter").style.display = 'flex';
            start.firstChild.nodeValue = "‎";
            h1.firstChild.nodeValue = "Game Win!";
            console.log("Score: " + tp);
            console.log("Time: " + timer + "s");
            score.firstChild.nodeValue = ("Win!");
            document.removeEventListener('keydown', keyDown);
            // stops the timer
            clearInterval(clock);
            upPressed = false;
            downPressed = false;
            leftPressed = false;
            rightPressed = false;
        }, 500)
    }
}
console.log('The height of the screen = ' + window.innerHeight);
console.log('The Width of the Screen is =' + window.innerWidth);
width = window.innerWidth;
height = window.innerHeight;


deaths = 0

// lowercase stuff
function killer() {
    const position = player.getBoundingClientRect();
    const enemy = document.querySelectorAll('.enemy');
    for (let i = 0; i < enemy.length; i++) {
        let enemyPosition = enemy[i].getBoundingClientRect();
        if (
            position.right > enemyPosition.left &&
            position.left < enemyPosition.right &&
            position.bottom > enemyPosition.top &&
            position.top < enemyPosition.bottom
        ) {
            setTimeout(function () {
                deaths++;
            }, 300)
        }
        if (deaths > 10) {
            Lost1();
        }
        if (deaths > 50) {
            Lost2();
        }
        if (deaths > 100) {
            LostAll();

        }
    }
}

let hasBeenCalled = false;
let Lost1Life = false;
let Lost2Life = false;
let Lost3Life = false;


function Reset() {
    playerTop = 0;
    playerLeft = 0;
}


function Lost1() {
    if (Lost1Life == false) {
        Lost1Life = true;
        document.getElementById("1").style.display = "none";
        console.log("2 Lives Left!");
        Reset();
    }
}

function Lost2() {
    if (Lost2Life == false) {
        Lost2Life = true;
        document.getElementById("2").style.display = "none";
        console.log("1 Life Left!");
        Reset();
    }
}

function LostAll() {
    if (Lost3Life == false) {
        Lost3Life = true;
        document.getElementById("3").style.display = "none";
        console.log("you Died!");
        Refresh();
        LIFETAG = document.getElementById("livestag");
        LIFETAG.firstChild.nodeValue = "DEAD";
        LIFETAG.style.color = "red";
        // stops the timer
        clearInterval(clock);
        document.removeEventListener('keydown', keyDown);
        upPressed = false;
        downPressed = false;
        leftPressed = false;
        rightPressed = false;
    }
}

// Javascript to ask the user if they would like to refresh after a gameover. 
function Refresh() {
    if (hasBeenCalled == false) {
        hasBeenCalled = true;
        h1 = document.getElementById("gameover");
        start = document.getElementById("TT");
        document.getElementById("GameStarter").style.display = 'flex';
        start.firstChild.nodeValue = "‎";
        h1.firstChild.nodeValue = "Game Over!";
        console.log("Showing GameOver Screen");
        console.log("Score: " + tp);
        console.log("Time: " + timer + "s");
        setTimeout(function () {
            if (confirm("Score: " + tp + " Time: " + timer + "s | " + "Would you like to refresh?") == true) {
                console.log("Refreshing!");
                location.reload();
            } else {
                console.log("fine don't refresh");
                h1 = document.getElementById("gameover");
                h1.firstChild.nodeValue = "Game Over! Press F5 to Refresh";
            }


        },
            500);
    }
}




// The Rainbow Machine - With help from w3schools

const colorPicker = document.getElementById('colorPicker');
const playercolour = document.querySelector('#player');
const life1 = document.getElementById('1');
const life2 = document.getElementById('2');
const life3 = document.getElementById('3');
const enemyColour = document.querySelectorAll('.enemy');

colorPicker.addEventListener('input', () => {
    const selectedColor = colorPicker.value;
    playercolour.style.backgroundColor = selectedColor;
    life1.style.backgroundColor = selectedColor;
    life2.style.backgroundColor = selectedColor;
    life3.style.backgroundColor = selectedColor;
    invertColor(selectedColor);
});



function invertColor(hexcolor) {
    // Convert hexadecimal color to RGB
    const r = parseInt(hexcolor.slice(1, 3), 16);
    const g = parseInt(hexcolor.slice(3, 5), 16);
    const b = parseInt(hexcolor.slice(5, 7), 16);

    // Invert the RGB values
    const invertedR = 255 - r;
    const invertedG = 255 - g;
    const invertedB = 255 - b;

    // Convert inverted RGB values back to hexadecimal
    const invertedhexcolor = `#${invertedR.toString(16).padStart(2, '0')}${invertedG.toString(16).padStart(2, '0')}${invertedB.toString(16).padStart(2, '0')}`;

    enemyColour[0].style.backgroundColor = invertedhexcolor;
    enemyColour[1].style.backgroundColor = invertedhexcolor;
}


// Leaderboard

NameASK = false;

function LeaderBoard() {
    if (NameASK == false) {
        NameASK = true;
    username = prompt("Enter Your Name");
    localStorage.setItem('Name', username);
    localStorage.setItem('Time', timer);
    Refresh();
}}

first = document.getElementById('1st');
firstname = localStorage.getItem('Name');
firstclock = localStorage.getItem('Time');
first.firstChild.nodeValue = firstname + ' :  ' + firstclock + 's';