
var shapes = new Array();
var currentShape;
var height = 15;
var width = 10;
var state = 1;      // 1 running - 0 paused - 2 game over
var colors = ['black', 'orange', 'red', 'blue'];
var move = 0;
var occupiedblocks = new Array();
var direction = "";
var points = 0;



function createBoard()
{
    var board = document.getElementsByClassName('tetris-board')[0];
    board.innerHTML = '';
    var counter = 0;
    for (var y = 0; y < height; y++)
    {
        var row = document.createElement('div');
        row.className = 'row';
        row.dataset.row = y;
        
        for (var x = 0; x < width; x++)
        {
            var block = document.createElement('div');
            block.className = 'block';
            block.dataset.x = x;
            block.dataset.y = y;
            block.dataset.index = counter;
            block.dataset.state = 0;
            block.innerHTML = "0 : " + counter;
            row.appendChild(block);
            counter++;
        }
        
        board.appendChild(row);
    }
}



function createShapes()
{
    var other = [[1, 0], [0,1], [1,1],[2,1]]; // 
    var line = [[0, 0], [0, 1], [0, 2], [0, 3]]; // line
    var square = [[0, 0], [0, 1], [1, 0], [1, 1]];
    var l = [[2,0], [0, 1], [1, 1], [2,1]];
    shapes.push(square);
    shapes.push(line);
    shapes.push(other);
    shapes.push(l);
}


function drawShape()
{
    // draw the current shape onto board
    var shape = currentShape.shape;
    var location = currentShape.location;

    // update status to unoccupied of current block
    clearCurrent();

    // based on direction of block, set the offset
    if (direction=="down")
        currentShape.location[1]++;
    else if(direction=="left")
        currentShape.location[0]--;
    else if (direction=="right")
        currentShape.location[0]++;
    
    // redraw the shape onto the board
    for(var i = 0; i < shape.length; i++)
    {
        var x = shape[i][0] + location[0];    //  x + offset
        var y = shape[i][1] + location[1];    // y + offset
        var block = document.querySelector('[data-x="' + x + '"][data-y="' + y + '"]');
        block.classList.add('filled');
        block.style.backgroundColor = currentShape.color;
    }

    currentShape.indexes = getBlockNumbers(currentShape.shape, currentShape.location);
}


function clearCurrent()
{
    // reset all blocks
    var shape = currentShape.shape;
    var location = currentShape.location;
    
    for(var i = 0; i < shape.length; i++)
    {
        var x = shape[i][0] + location[0];
        var y = shape[i][1] + location[1];
        var block = document.querySelector('[data-x="' + x + '"][data-y="' + y + '"]');
        block.classList.remove('filled');
        block.style.backgroundColor="";
    }
}


function checkKey(e) {
    e.preventDefault();

    e = e || window.event;

    if (e.keyCode == '40') {
        // down arrow
        direction="down";
    }
    else if (e.keyCode == '37') {
        // left arrow
        direction="left";
    }
    else if (e.keyCode == '39') {
        // right arrow
        direction="right";
    }

    drawShape();
}


function start()
{
    createBoard();
    createShapes();
    createShape();
    drawShape();
    document.onkeydown = checkKey;
}

window.addEventListener('load', function(){
    start();
});
