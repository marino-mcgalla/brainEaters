let canvas = <HTMLCanvasElement>document.getElementById('myCanvas');
let context = canvas.getContext("2d");
let redWall = new Image();
let blackWall = new Image();
let marioX = 0;
let marioY = 0;
blackWall.src = "images/background.png";
redWall.src = "images/maze.png";

//---------------------------------random map generation---------------------------------------------------------------------------------
let borderRow = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let hollowRow = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0];
let randomizedRow = [1, 1, 1, 0, 0, 0, 0, 0, 0, 0]; //for more wall tiles, add more 1's to this array

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
for (let i = 0; i < 9; i++) {
    if (i == 0 || i == 8) {
        mapArray.push(borderRow);
    }
    else if (i % 2 != 0) {
        mapArray.push(hollowRow);
    }
    else if (i % 2 == 0 && i != 8) {
        shuffleArray(randomizedRow);
        let randomRow = randomizedRow.slice();
        randomRow.splice(0, 0, 0);
        randomRow.splice(11, 0, 0);
        mapArray.push(randomRow);
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
            posX += 32;           
        }
        posX = 0;
        posY += 32;
    } 
}

//--------------------------------------------player movement---------------------------------------------------
let y = 8;
let x = 8;
let player = <HTMLImageElement>document.getElementById('player');
player.style.position = 'absolute'
player.style.top = y + 32 + 'px';
player.style.left = x + 32 + 'px';
let currentMario;

document.addEventListener('keydown', (e) => {
    switch (e.keyCode) {
        case 38: y = y - 32; //up arrow
            marioY += 1;
            break;
        case 40: y = y + 32; //down arrow
            marioY -= 1;
            break;
        case 37: x = x - 32; //left arrow
            marioX -= 1;
            break;
        case 39: x = x + 32; //right arrow
            marioX += 1;
            break;
        default: break;
    }
    //map current coordinates of the player object when a movement occurs
    currentMario = `(${marioX},${marioY})`;
    player.style.top = y + 32 + 'px'; 
    player.style.left = x + 32 + 'px';
});


