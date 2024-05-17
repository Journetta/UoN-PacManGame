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