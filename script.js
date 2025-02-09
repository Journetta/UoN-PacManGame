
// CONFIGURE GAME //
// WELCOME TO SPEEDY 40, PACMAN GAME MADE BY MAISY JONES //
// IF YOU WOULD LIKE TO CHANGE THE CONDITIONS OF THE GAME, YOU MAY DO SO BELOW //

// AMOUNT OF ENEMIES IN THE MAZE THAT U WANT
// DEFAULT 2
const maxEnemies = 2;
// wingame Condition: you can edit this to change the win condition.
// DEFAULT: 40
const wincondition = 40;
// CHANGE AMOUNT OF NAMES SHOWN ON SCOREBOARD
// DEFAULT: 7
const NO_OF_HIGH_SCORES = 7;
// TIME LIMIT
// Default: 120 seconds
const maxtime = 120;
// By Making These Values Higher, you make it harder to loose a life, by lowering these values it's easier to loose a life
// Default: Life1 = 10, Life2 = 50, Life3 = 100 //
const Life1 = 10;
const Life2 = 50;
const Life3 = 100;


// variables for the rest of the javascript
let hasBeenCalled = false;
// HOW MANY LIVES ARE LOST
let Lost1Life = false;
let Lost2Life = false;
let Lost3Life = false;
let LostLife = false;
// Controls Status
let upPressed = false;
let downPressed = false;
let leftPressed = false;
let rightPressed = false;
// TIMER
let timer = 0;

// random wall / point 
let rs = [];

for (let i = 0; i < 17; i++) {
    rs[i] = Math.round(Math.random() * 1);
}

const main = document.querySelector('main');

//Player = 2, Wall = 1, Enemy = 3, Point = 0
//10 by 10 maze
let maze = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 0, 0, 0, rs[16], 0, 0, 0, 1],
    [1, 0, 0, rs[1], 0, 0, 0, rs[14], rs[15], 1],
    [1, 0, 0, 0, rs[2], 0, 0, 0, 0, 1],
    [1, 0, rs[4], rs[3], 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, rs[5], rs[6], 1],
    [1, 0, 0, rs[7], 0, 0, 0, 0, 0, 1],
    [1, rs[8], 0, rs[9], 0, rs[11], 0, rs[12], 0, 1],
    [1, 0, 0, rs[10], 0, rs[2], 0, rs[13], 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

// Player starting position
let playerX, playerY;
for (let y = 0; y < maze.length; y++) {
    for (let x = 0; x < maze[y].length; x++) {
        if (maze[y][x] === 2) {
            playerX = x;
            playerY = y;
            break;
        }
    }
}

let placedEnemies = 0;

// Random enemy Position, calling player starting, to ensure they dont spawn next to the player
while (placedEnemies < maxEnemies) {
    const randomY = Math.floor(Math.random() * maze.length);
    const randomX = Math.floor(Math.random() * maze[randomY].length);

    const distance = Math.abs(randomX - playerX) + Math.abs(randomY - playerY);
    if (maze[randomY][randomX] === 0 && distance >= 3) {
        maze[randomY][randomX] = 3;
        placedEnemies++;
    }
}

// Maze Generation
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

function LivesCreate() {
    // create the lives via javascript
    var livesContainer = document.querySelector('.lives');

    var livetit = document.createElement('h1');
    livetit.className = 'livestag';
    livetit.textContent = 'Lives:';
    livesContainer.appendChild(livetit);
    var ul = document.createElement('ul');

    for (var i = 1; i <= 3; i++) {
        var li = document.createElement('li');
        li.className = 'livescolour';
        li.id = i.toString();
        ul.appendChild(li);
    }

    livesContainer.appendChild(ul);

}

function StartTimer() {
    clock = setInterval(function () {
        const time = document.getElementById('currenttime');
        timer++;
        totaltimer = timer + "s";
        time.firstChild.nodeValue = totaltimer;
        // Dead after maxtime
        if (timer == maxtime) {
            Lost1();
            Lost2();
            LostAll();
            Refresh();
        }
    }, 1000)
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
// Onscreen Button Movement

// ONSCREEN LEFT BUTTON MOVEMENT
const leftButton = document.getElementById('lbttn');
leftButton.addEventListener('mousedown', () => {
    downPressed = false;
    upPressed = false;
    rightPressed = false;
    leftPressed = true;

});
leftButton.addEventListener('mouseup', () => {
    downPressed = false;
    upPressed = false;
    rightPressed = false;
    leftPressed = false;

});


// RIGHT BUTTON ONSCREEN MOVEMENT
const RightButton = document.getElementById('rbttn')
RightButton.addEventListener('mousedown', () => {
    downPressed = false;
    upPressed = false;
    rightPressed = true;
    leftPressed = false;

});
RightButton.addEventListener('mouseup', () => {
    downPressed = false;
    upPressed = false;
    rightPressed = false;
    leftPressed = false;

});
// END OF RIGHT BUTTON ONSCREEN MOVEMENT


// UP BUTTON ONSCREEN MOVEMENT
const upButton = document.getElementById('ubttn')
upButton.addEventListener('mousedown', () => {
    upPressed = true;
    rightPressed = false;
    leftPressed = false;
    downPressed = false;

});


upButton.addEventListener('mouseup', () => {
    upPressed = false;
    rightPressed = false;
    leftPressed = false;
    downPressed = false;

});
// END OF UP BUTTON ONSCREEN MOVEMENT


// DOWN BUTTON ONSCREEN MOVEMENT
const DownButton = document.getElementById('dbttn')
DownButton.addEventListener('mousedown', () => {
    downPressed = true;
    upPressed = false;
    rightPressed = false;
    leftPressed = false;

});
DownButton.addEventListener('mouseup', () => {
    downPressed = false;
    upPressed = false;
    rightPressed = false;
    leftPressed = false;

});
// END OF DOWN BUTTON


const player = document.querySelector('#player');
const playerMouth = player.querySelector('.mouth');
let playerTop = 0;
let playerLeft = 0;
let enemyTop = 0;
let enemyLeft = 0;
const wall = document.querySelector('.wall');

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

function EnableControls() {
    stopControls = setInterval(function () {
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

function GameStarts() {
    console.log("Game Start! was pressed");
    document.getElementById("GameStarter").style.display = 'none';
    LivesCreate();
    StartTimer();
    EnableControls();
}

// points
let tp = 0;


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
        }
    }
    if (tp == wincondition) {
        gameWin();
    }
}

deaths = 0
GameWinCalled = false;

// Game Win condition
function gameWin() {
    if (GameWinCalled == false) {
        GameWinCalled = true;
        saveHighScore();
        console.log("40 Points! Gained!");
        h1 = document.getElementById("TT");
        score = document.querySelector(".currentscore");
        console.log('win');
        h1 = document.getElementById("gameover");
        start = document.getElementById("TT");
        document.getElementById("GameStarter").style.display = 'flex';
        start.firstChild.nodeValue = "‎";
        h1.firstChild.nodeValue = "Game Win!";
        console.log("Time: " + timer + "s");
        score.firstChild.nodeValue = ("Win!");
        document.removeEventListener('keydown', keyDown);
        // stops the timer
        clearInterval(clock);
        clearInterval(stopcontrols);
        Restart();
    }

}

// loose lifes
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
        if (deaths > Life1) {
            Lost1();
        }
        if (deaths > Life2) {
            Lost2();
        }
        if (deaths > Life3) {
            LostAll();


        }
    }
}

// Reset Player to Starting Position
function Reset() {
    if (player.classList.contains = ("hit")) {
        clearInterval(stopControls);
    }


    setTimeout(function () {
        playerTop = 0;
        playerLeft = 0;
    }, 750)

    setTimeout(function () {
        playerTop = 0;
        playerLeft = 0;
        EnableControls();
        playercolour.style.backgroundColor = selectedColor;

    },
        1500);

}


// Loosing Lives
function Lost1() {
    if (Lost1Life == false) {
        Lost1Life = true;
        document.getElementById("1").style.display = "none";
        console.log("2 Lives Left!");
        player.classList.add('hit');
        Reset();
    }
}
function Lost2() {
    if (Lost2Life == false) {
        Lost2Life = true;
        document.getElementById("2").style.display = "none";
        console.log("1 Life Left!");
        player.classList.add('hit');
        Reset();
    }
}
function LostAll() {
    if (Lost3Life == false) {
        Lost3Life = true;
        player.classList.add = ("hit");
        document.getElementById("3").style.display = "none";
        console.log("you Died!");
        Refresh();
        LIFETAG = document.getElementById("livestag");
        LIFETAG.firstChild.nodeValue = "DEAD";
        LIFETAG.style.color = "red";
        // stops the timer
        clearInterval(clock);
        clearInterval(stopControls);
        Refresh();
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
                document.removeEventListener('keydown', keyDown);
                downPressed = false;
                upPressed = false;
                leftPressed = false;
                rightPressed = false;
            }


        },
            500);
    }
}


// Restart After Gameover, Asking if they'd like to restart.
function Restart() {
    setTimeout(function () {
        if (confirm("Score: " + tp + " Time: " + timer + "s | " + "Would you like to refresh?") == true) {
            console.log("Refreshing!");
            clearInterval(stopControls);
            location.reload();
        } else {
            console.log("fine don't refresh");
            h1 = document.getElementById("gameover");
            h1.firstChild.nodeValue = "Game Over! Press F5 to Refresh";
            clearInterval(stopControls);
        }


    },
        500);

}

// The Rainbow Machine - With help from w3schools

const colorPicker = document.getElementById('colorPicker');
const playercolour = document.querySelector('#player');
const enemyColour = document.querySelectorAll('.enemy');
colorPicker.addEventListener('input', () => {
    const selectedColor = colorPicker.value;
    playercolour.style.backgroundColor = selectedColor;
    invertColor(selectedColor);
});

function RevertPlayerColour() {
    playercolour.style.backgroundColor = selectedColor;
}

function invertColor(hexcolor) {
    const r = parseInt(hexcolor.slice(1, 3), 16);
    const g = parseInt(hexcolor.slice(3, 5), 16);
    const b = parseInt(hexcolor.slice(5, 7), 16);

    const invertedR = 255 - r;
    const invertedG = 255 - g;
    const invertedB = 255 - b;

    const invertedhexcolor = `#${invertedR.toString(16).padStart(2, '0')}${invertedG.toString(16).padStart(2, '0')}${invertedB.toString(16).padStart(2, '0')}`;

    enemyColour[0].style.backgroundColor = invertedhexcolor;
    enemyColour[1].style.backgroundColor = invertedhexcolor;
}


// Leaderboard

// High Scores
const HIGH_SCORES = 'highScores';
const highScoreString = localStorage.getItem(HIGH_SCORES);
const highScores = JSON.parse(highScoreString) ?? [];

NameASK = false;
const SlowestTime = highScores[NO_OF_HIGH_SCORES - 1]?.timer ?? 999;

function saveHighScore() {
    if (NameASK == false) {
        NameASK = true;

        const username = prompt('Please Enter Your Username');
        const newRecord = { username, timer };

        highScores.push(newRecord);
        highScores.sort((a, b) => a.timer - b.timer);

        highScores.splice(NO_OF_HIGH_SCORES);
        localStorage.setItem(HIGH_SCORES, JSON.stringify(highScores));
    }
};
function showHighScores() {
    const highScores = JSON.parse(localStorage.getItem(HIGH_SCORES)) ?? [];
    const highScoreList = document.getElementById(HIGH_SCORES);

    highScoreList.innerHTML = highScores
        .map((score) => `<li>${score.timer} - ${score.username}`)
        .join('');
}
showHighScores();





// DEV TOOLS
function LEADRESET() {
    localStorage.clear();
    showHighScores();
    console.log('Leaderboard was reset');

}

MoveLeft = false;
MoveRight = false;
MoveTop = false;
MoveBottom = false;
