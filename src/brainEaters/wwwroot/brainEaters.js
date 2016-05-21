var canvas = document.getElementById('myCanvas');
var context = canvas.getContext("2d");
var redWall = new Image();
var blackWall = new Image();
var marioX = 0;
var marioY = 0;
blackWall.src = "images/background.png";
redWall.src = "images/maze.png";
//---------------------------------random map generation---------------------------------------------------------------------------------
var borderRow = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var hollowRow = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0];
var randomizedRow = [1, 1, 1, 0, 0, 0, 0, 0, 0, 0]; //for more wall tiles, add more 1's to this array
//randomize order of tiles in randomizedRow array
function shuffleArray(randomizedRow) {
    for (var i = randomizedRow.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = randomizedRow[i];
        randomizedRow[i] = randomizedRow[j];
        randomizedRow[j] = temp;
    }
    return randomizedRow;
}
shuffleArray(randomizedRow);
//build map
var mapArray = [];
//build border rows at first and last row, hollow row every odd row, random row every even row
for (var i = 0; i < 9; i++) {
    if (i == 0 || i == 8) {
        mapArray.push(borderRow);
    }
    else if (i % 2 != 0) {
        mapArray.push(hollowRow);
    }
    else if (i % 2 == 0 && i != 8) {
        shuffleArray(randomizedRow);
        var randomRow = randomizedRow.slice();
        randomRow.splice(0, 0, 0);
        randomRow.splice(11, 0, 0);
        mapArray.push(randomRow);
    }
}
//draw map in canvas
var posX = 0;
var posY = 0;
blackWall.onload = function () {
    for (var i = 0; i < mapArray.length; i++) {
        for (var j = 0; j < mapArray[i].length; j++) {
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
};
//--------------------------------------------player movement---------------------------------------------------
var y = 8;
var x = 8;
var player = document.getElementById('player');
player.style.position = 'absolute';
player.style.top = y + 32 + 'px';
player.style.left = x + 32 + 'px';
var currentMario;
document.addEventListener('keydown', function (e) {
    switch (e.keyCode) {
        case 38:
            y = y - 32; //up arrow
            marioY += 1;
            break;
        case 40:
            y = y + 32; //down arrow
            marioY -= 1;
            break;
        case 37:
            x = x - 32; //left arrow
            marioX -= 1;
            break;
        case 39:
            x = x + 32; //right arrow
            marioX += 1;
            break;
        default: break;
    }
    //map current coordinates of the player object when a movement occurs
    currentMario = "(" + marioX + "," + marioY + ")";
    player.style.top = y + 32 + 'px';
    player.style.left = x + 32 + 'px';
});
//# sourceMappingURL=brainEaters.js.map