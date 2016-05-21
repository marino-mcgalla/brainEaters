//map generation
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext("2d");
var img = new Image();
var img2 = new Image();
img.src = "images/background.png";
img2.src = "images/maze.png";
var mapArray = [
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
var background = new Image();
var maze = new Image();
background.src = "images/background.png";
maze.src = "images/maze.png";
var posX = 0;
var posY = 0;
img.onload = function () {
    for (var i = 0; i < mapArray.length; i++) {
        for (var j = 0; j < mapArray[i].length; j++) {
            if (mapArray[i][j] == 0) {
                context.drawImage(img, posX, posY, 32, 32);
            }
            if (mapArray[i][j] == 1) {
                context.drawImage(img2, posX, posY, 32, 32);
            }
            posX += 32;
        }
        posX = 0;
        posY += 32;
    }
};
//player movement
var y = 8;
var x = 8;
var player = document.getElementById('player');
player.style.position = 'absolute';
player.style.top = y + 32 + 'px';
player.style.left = x + 32 + 'px';
document.addEventListener('keydown', function (e) {
    //up
    if (e.keyCode == 38) {
        y = y - 32;
    }
    //down
    if (e.keyCode == 40) {
        y = y + 32;
    }
    //left
    player.style.top = x + 'px';
    if (e.keyCode == 37) {
        x = x - 32;
    }
    //right
    player.style.top = x + 'px';
    if (e.keyCode == 39) {
        x = x + 32;
    }
    player.style.top = y + 32 + 'px';
    player.style.left = x + 32 + 'px';
});
//# sourceMappingURL=brainEaters.js.map