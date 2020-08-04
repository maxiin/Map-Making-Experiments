const boardInit = [
    ['O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O'],
    ['O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O'],
    ['O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O'],
    ['O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O'],
    ['O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O'],
    ['O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O'],
    ['O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O'],
    ['O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O'],
    ['O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O'],
    ['O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O'],
    ['O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O'],
    ['O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O'],
    ['O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O'],
    ['O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O'],
    ['O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O'],
    ['O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O'],
    ['O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O'],
    ['O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O'],
    ['O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O'],
    ['O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O'],
    ['O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O'],
]
// clone array so i don't lose a reference to the original one (for testing more than once)
var board = boardInit.map(function(arr) {
    return arr.slice();
});
/* const board = [
    ['O','O','O','O','O'],
    ['O','O','O','O','O'],
    ['O','O','O','O','O'],
    ['O','O','O','O','O'],
    ['O','O','O','O','O'],
]; */
const maxIndex = board.length - 1;
let movesLeft = 20;
let biggestIndex = 0;

const top = ({x, y}) => ({x: x-1, y});
const right = ({x, y}) => ({x, y: y+1});
const left = ({x, y}) => ({x, y: y-1});
const bottom = ({x, y}) => ({x: x+1, y});

const center = () => ({x: maxIndex/2, y: maxIndex/2});

const rand = () => Boolean(Math.round(Math.random() * 2));

function valid({x, y}) {
    if(x < 0 || x > maxIndex || y < 0 || y > maxIndex) {
        return false;
    }
    if(board[x][y] !== 'O'){
        return false;
    }
    return true;
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function getMoves(from, moves) {
    let available = ['TOP', 'RIGHT', 'BOTTOM', 'LEFT'];
    // remove the ability for nodes to trackback
    switch(from) {
        case 'TOP':
            available.splice(2, 1); // remove bottom :(
            break;
        case 'RIGHT':
            available.splice(3, 1); // remove left
            break;
        case 'BOTTOM':
            available.splice(0, 1); // remove up
            break;
        case 'LEFT':
            available.splice(1, 1); // remove right
            break;
    }
    const move = [];
    // run to the number of available moves and set random movements;
    for(let i = 0; i < moves; i++) {
        const randd = Math.floor(Math.random() * available.length);
        move.push(available[randd]);
        available.splice(randd, 1);
    }
    return shuffleArray(move);
}

function fill({x, y}, from, index = 0) {
    // id valid, has moves left, line is not bigger than half of the max
    if(valid({x,y}) && movesLeft && index < movesLeft/2){
        //board[x][y] = {TOP: '^', RIGHT: '>', LEFT: '<', BOTTOM: '_', CENTER: 'X'}[from]; // print last move in cell
        //board[x][y] = '_'; // print a simple _
        board[x][y] = from === 'CENTER' ? 'X' : '_'; // print a simple _
        //board[x][y] = index; // print index of the line
        movesLeft--; // remove one from the global max moves
        move = getMoves(from, from === 'CENTER' ? 4 : 1); // all nodes can move one except the center that can create the 4 initial nodes
        move.forEach((m) => {
            switch(m) {
                case 'TOP':
                    fill(top({x,y}), 'TOP', index + 1);
                    break;
                case 'RIGHT':
                    fill(right({x,y}), 'RIGHT', index + 1);
                    break;
                case 'BOTTOM':
                    fill(bottom({x,y}), 'BOTTOM', index + 1);
                    break;
                case 'LEFT':
                    fill(left({x,y}), 'LEFT', index + 1);
                    break;
            }
        });

        //debug
        if(index > biggestIndex) {
            biggestIndex = index;
        }
    }
}

// test one
fill(center(), 'CENTER');
console.log(board.map((l) => l.join('|')))

// test multiple
/* for(_ in '_'.repeat(20)) {
    fill(center(), 'CENTER');
    console.log(`Line size: ${20 - movesLeft}\nBiggest Line: ${biggestIndex}`)
    var board = boardInit.map(function(arr) {
        return arr.slice();
    });
    movesLeft = 20;
    biggestIndex = 0;
} */
