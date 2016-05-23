let canvas = <HTMLCanvasElement>document.getElementById('myCanvas');
let context = canvas.getContext("2d");
let redWall = new Image();
let blackWall = new Image();
let marioX = 1;
let marioY = 1;
blackWall.src = "images/mariobrick.jpg";
redWall.src = "images/background.png";

//--------------------------------------------------------random map generation---------------------------------------------------------------------------------
let borderRow = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let hollowRow = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0];
let randomizedRow = [1, 1, 1, 1, 1, 1, 2, 0, 0, 0]; //for more wall tiles, add more 1's to this array

//randomize order of tiles in randomizedRow array
function shuffleArray(randomizedRow) {
    for (let i = randomizedRow.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = randomizedRow[i];
        randomizedRow[i] = randomizedRow[j];
        randomizedRow[j] = temp;
    }
    return randomizedRow;
}
shuffleArray(randomizedRow);

//build map
let mapArray = [];

//build border rows at first and last row, hollow row every odd row, random row every even row
let hallTiles = [];
let currentZombies = [];
let staticZombies = [];

for (let i = 0; i < 9; i++) {
    if (i == 0 || i == 8) {
        mapArray.push(borderRow);
    }
    else if (i % 2 != 0) {
        mapArray.push(hollowRow);
        for (let m = 0; m < hollowRow.length; m++) {
            if (hollowRow[m] == 1) {
                hallTiles.push({ x: m, y: i });
            }
        }
    }
    else if (i % 2 == 0 && i != 8) {
        shuffleArray(randomizedRow);
        let randomRow = randomizedRow.slice();
        randomRow.splice(0, 0, 0);
        randomRow.splice(11, 0, 0);
        mapArray.push(randomRow);
        for (let m = 0; m < randomizedRow.length; m++) {
            if (randomizedRow[m] == 1) {
                hallTiles.push({ x: m + 1, y: i });
            }
            if (randomizedRow[m] == 2) {
                currentZombies.push({ x: m + 1, y: i });
                staticZombies.push({ x: m + 1, y: i });
                hallTiles.push({ x: m + 1, y: i });
            }
        }
    }
}

//draw map in canvas
let posX = 0;
let posY = 0;

blackWall.onload = () => {
    for (let i = 0; i < mapArray.length; i++) {

        for (let j = 0; j < mapArray[i].length; j++) {
            if (mapArray[i][j] == 0) {
                context.drawImage(blackWall, posX, posY, 32, 32);
            }

            if (mapArray[i][j] == 1) {
                context.drawImage(redWall, posX, posY, 32, 32);
            }
            if (mapArray[i][j] == 2 && mapArray[i][j] != 1) {
                context.drawImage(redWall, posX, posY, 32, 32);
                zombie1.style.position = 'absolute';
                zombie1.style.left = posX + 8 + 'px';
                zombie1.style.top = posY + 8 + 'px';

            }
            posX += 32;
        }
        posX = 0;
        posY += 32;
    }
}

//-----------------------------------------------------------------------------------------------horrific death--------------------------------------------------------------------------------------
function gameOver() {

    if ((currentZombies[2].x == currentMario[0].x) &&
        (currentZombies[2].y == currentMario[0].y)) {
        player.src = "images/mariodeath.gif";
        player.style.position = 'absolute';
        player.style.right = 8 + 'px';
        player.style.top = 8 + 'px';
        player.height = 300;
        player.width = 300;
        clearInterval(gameTime);
      
    }
}

//---------------------------------------------------------------------------------------------player movement----------------------------------------------------------------------------------------
let y = 8;
let x = 8;
let player = <HTMLImageElement>document.getElementById('player');
player.style.position = 'absolute'
player.style.top = y + 32 + 'px';
player.style.left = x + 32 + 'px';
let currentMario = [{ x: 1, y: 1 }];

document.addEventListener('keydown', (e) => {

    if (e.keyCode == 38) {
        for (let i = 0; i < hallTiles.length; i++) {
            if ((currentMario[0].x == hallTiles[i].x) &&
                (currentMario[0].y == hallTiles[i].y + 1)) {
                y = y - 32;
                marioY -= 1;

            }
        }
    }
    else if (e.keyCode == 40) {
        for (let i = 0; i < hallTiles.length; i++) {
            if ((currentMario[0].x == hallTiles[i].x) &&
                (currentMario[0].y == hallTiles[i].y - 1)) {
                y = y + 32;
                marioY += 1;

            }
        }
    }
    else if (e.keyCode == 37) {
        for (let i = 0; i < hallTiles.length; i++) {
            if ((currentMario[0].x == hallTiles[i].x + 1) &&
                (currentMario[0].y == hallTiles[i].y)) {
                x = x - 32;
                marioX -= 1;

            }
        }
    }
    else if (e.keyCode == 39) {
        for (let i = 0; i < hallTiles.length; i++) {
            if ((currentMario[0].x == hallTiles[i].x - 1) &&
                (currentMario[0].y == hallTiles[i].y)) {
                x = x + 32;
                marioX += 1;

            }
        }
    }
    currentMario.length = 0;
    currentMario.push({ x: marioX, y: marioY });
    player.style.top = y + 32 + 'px';
    player.style.left = x + 32 + 'px';
    gameOver();
});

//--------------------------------------------------------------------------------------------------Zombies---------------------------------------------------------------------------------------------------

let zombie1 = <HTMLImageElement>document.getElementById('zombie1');
let zombie2 = <HTMLImageElement>document.getElementById('zombie2');
let zombie3 = <HTMLImageElement>document.getElementById('zombie3');
let zombieY = (currentZombies[2].y * 32) + 8;
let zombieX = (currentZombies[2].x * 32) + 8;

function zombie1MoveUp() {

    for (let i = 0; i < hallTiles.length; i++) {

        if ((currentZombies[2].x == hallTiles[i].x) &&
            (currentZombies[2].y - 1 == hallTiles[i].y)) {
            zombieY = zombieY - 32;
            currentZombies[2].y -= 1;
            zombie1.style.top = currentZombies[2].y * 32 + 8 + 'px';
            currentZombies[2].y = (zombieY - 8) / 32;
            gameOver();
            break;
        }
    }
}

function zombie1MoveLeft() {

    for (let i = 0; i < hallTiles.length; i++) {
        if ((((currentZombies[2].y == hallTiles[i].y) ||
            (currentZombies[2].x - 1 == staticZombies[2].x)) &&
            (currentZombies[2].x == hallTiles[i].x + 1))) {
            zombieX = zombieX - 32;
            currentZombies[2].x -= 1;
            currentZombies[2].x = (zombieX - 8) / 32;
            zombie1.style.left = currentZombies[2].x * 32 + 8 + 'px';
            gameOver();
            break;
        }
    }
}

function zombie1MoveDown() {

    for (let i = 0; i < hallTiles.length; i++) {
        if ((currentZombies[2].x == hallTiles[i].x) &&
            (currentZombies[2].y + 1 == hallTiles[i].y)) {
            zombieY = zombieY + 32;
            currentZombies[2].y += 1;
            currentZombies[2].y = (zombieY - 8) / 32;
            zombie1.style.top = currentZombies[2].y * 32 + 8 + 'px';
            gameOver();
            break;
        }
    }
}

function zombie1MoveRight() {

    for (let i = 0; i < hallTiles.length; i++) {
        if ((((currentZombies[2].y == hallTiles[i].y) ||
            (currentZombies[2].x + 1 == staticZombies[2].x)) &&
            (currentZombies[2].x == hallTiles[i].x - 1))) {
            zombieX = zombieX + 32;
            currentZombies[2].x += 1;
            currentZombies[2].x = (zombieX - 8) / 32;
            zombie1.style.left = currentZombies[2].x * 32 + 8 + 'px';
            gameOver();
            break;
        }
    }
}


function followMario() {
    let random = Math.floor(Math.random() * 2);

    //up and left
    if ((currentMario[0].x <= currentZombies[2].x) &&
        (currentMario[0].y <= currentZombies[2].y)) {

        if (random == 0) {
            zombie1MoveUp();
            console.log('random up');
        } else if (random == 1) {
            zombie1MoveLeft()
            console.log('random left');
        };
    }

    //up and right
    else if ((currentMario[0].x >= currentZombies[2].x) &&
        (currentMario[0].y <= currentZombies[2].y)) {

        if (random == 0) {
            zombie1MoveUp();
            console.log('random up');
        } else if (random == 1) {
            zombie1MoveRight();
            console.log('random right')
        }
    }

    //down and right
    else if ((currentMario[0].x >= currentZombies[2].x) &&
        (currentMario[0].y >= currentZombies[2].y)) {

        if (random == 0) {
            zombie1MoveDown();
            console.log('random down');
        } else if (random == 1) {
            zombie1MoveRight();
            console.log('random right');
        }
    }
    //down and left
    else if ((currentMario[0].x <= currentZombies[2].x) &&
        (currentMario[0].y > currentZombies[2].y)) {

        if (random == 0) {
            zombie1MoveDown();
            console.log('random down');
        } else if (random == 1) {
            zombie1MoveLeft();
            console.log('random left');
        }
    }
}

    //// Y level and left
    //if ((currentMario[0].y = currentZombies[2].y) &&
    //    (currentMario[0].x < currentZombies[2].x)) {
    //    zombie1MoveLeft();
    //    console.log('left');
    //}
    //// X level and up
    //if ((currentMario[0].x = currentZombies[2].x) &&
    //    (currentMario[0].y < currentZombies[2].y)) {
    //    zombie1MoveUp();
    //    console.log('up');
    //}
    ////X level and down
    //if ((currentMario[0].x = currentZombies[2].x) &&
    //    (currentMario[0].y > currentZombies[2].y)) {
    //    zombie1MoveDown();
    //    console.log('down');

    ////Y level and right
    //if ((currentMario[0].x > currentZombies[2].x) &&
    //    (currentMario[0].y = currentZombies[2].y)) {
    //    zombie1MoveRight();
    //    console.log('right');
    //}

//function zombie1MoveUp() {

//function zombie1MoveUp() {

//    for (let i = 0; i < hallTiles.length; i++) {

//        if ((currentZombies[2].x == hallTiles[i].x) &&
//            (currentZombies[2].y - 1 == hallTiles[i].y)) {
//            zombieY = zombieY - 32;
//            currentZombies[2].y -= 1;
//            zombie1.style.top = currentZombies[2].y * 32 + 8 + 'px';
//            currentZombies[2].y = (zombieY - 8) / 32;
//            gameOver();
//            break;
//        }
//    }
//}

let gameTime = setInterval(function () { followMario(); }, 700);

//zombieMove(zombieX, currentZombies[2].x, -1, "left");

//function zombieMove(zombie, currentZombiesCoordinate, operation, zombieStyle) {
//    //zombieY = zombieY - 32;
//    //        currentZombies[2].y -= 1;
//    //        zombie1.style.top = currentZombies[2].y * 32 + 8 + 'px';
//    //        currentZombies[2].y = (zombieY - 8) / 32;
//    //        gameOver();
//    zombieY = zombieY - 32;
//    currentZombies[2].y -= 1;
//    zombie1.style.top = currentZombies[2].y * 32 + 8 + 'px';
//    currentZombies[2].y = (zombieY - 8) / 32;
//    gameOver();
//}