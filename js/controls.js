
//Player movement

// KEYBOARD EVENTS MOVEMENT
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

// END OF KEYBOARD EVENTS MOVEMENT //

// Onscreen Button Movement //

// Left Button Onscreen
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

// Right Button OnScreen
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

// Up Button OnScreen
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

// Down Button OnScreen
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

// END OF ONSCREEN BUTTONS //
