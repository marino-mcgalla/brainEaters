var canvas = document.getElementById('myCanvas');
var context = canvas.getContext("2d");
var redWall = new Image();
var blackWall = new Image();
var marioX = 1;
var marioY = 1;
blackWall.src = "images/background.png";
redWall.src = "images/maze.png";
//--------------------------------------------------------random map generation---------------------------------------------------------------------------------
var borderRow = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var hollowRow = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0];
var randomizedRow = [1, 1, 1, 1, 1, 1, 2, 0, 0, 0]; //for more wall tiles, add more 1's to this array
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
var hallTiles = [];
for (var i = 0; i < 9; i++) {
    if (i == 0 || i == 8) {
        mapArray.push(borderRow);
    }
    else if (i % 2 != 0) {
        mapArray.push(hollowRow);
        for (var m = 0; m < hollowRow.length; m++) {
            if (hollowRow[m] == 1) {
                hallTiles.push({ x: m, y: i });
            }
        }
    }
    else if (i % 2 == 0 && i != 8) {
        shuffleArray(randomizedRow);
        var randomRow = randomizedRow.slice();
        randomRow.splice(0, 0, 0);
        randomRow.splice(11, 0, 0);
        mapArray.push(randomRow);
        for (var m = 0; m < randomizedRow.length; m++) {
            if (randomizedRow[m] == 1) {
                hallTiles.push({ x: m + 1, y: i });
            }
        }
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
};
//---------------------------------------------------------player movement------------------------------------------------------------------------
var y = 8;
var x = 8;
var player = document.getElementById('player');
player.style.position = 'absolute';
player.style.top = y + 32 + 'px';
player.style.left = x + 32 + 'px';
var currentMario = [{ x: 1, y: 1 }];
document.addEventListener('keydown', function (e) {
    if (e.keyCode == 38) {
        for (var i = 0; i < hallTiles.length; i++) {
            if ((currentMario[0].x == hallTiles[i].x) &&
                (currentMario[0].y == hallTiles[i].y + 1)) {
                y = y - 32;
                marioY -= 1;
            }
        }
    }
    else if (e.keyCode == 40) {
        for (var i = 0; i < hallTiles.length; i++) {
            if ((currentMario[0].x == hallTiles[i].x) &&
                (currentMario[0].y == hallTiles[i].y - 1)) {
                y = y + 32;
                marioY += 1;
            }
        }
    }
    else if (e.keyCode == 37) {
        for (var i = 0; i < hallTiles.length; i++) {
            if ((currentMario[0].x == hallTiles[i].x + 1) &&
                (currentMario[0].y == hallTiles[i].y)) {
                x = x - 32;
                marioX -= 1;
            }
        }
    }
    if (e.keyCode == 39) {
        for (var i = 0; i < hallTiles.length; i++) {
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
});
//------------------------------------------------------------------Zombies--------------------------------------------------------------------
var zombie1 = document.getElementById('zombie1');
//# sourceMappingURL=brainEaters.js.map