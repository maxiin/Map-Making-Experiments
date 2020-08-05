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
const maxIndex = board.length - 1;

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
    return {x,y};
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

function getPoint({x,y}) {
    return board[x][y];
}

const available = [center()];
let currentIndex = 0;
const biggestIndex = 20;

function getAvailable({x,y}) {
    let repeat = 2;
    let area = [
        valid(top({x,y})),
        valid(right({x,y})),
        valid(bottom({x,y})),
        valid(left({x,y}))];
    area = shuffleArray(area);
    for(let move of area) {
        if(move && repeat) {
            available.push(move);
            repeat--;
        }
    }
}

function run() {
    const selectedIndex = Math.floor(Math.random() * available.length);
    const selected = available[selectedIndex];
    available.splice(selectedIndex, 1);
    board[selected.x][selected.y] = '_';
    currentIndex++;
    getAvailable(selected);
    if(currentIndex < biggestIndex) {
        run();
    }
}

// test one
console.time("runTime");
run();
console.timeEnd("runTime");
console.log(board.map((l) => l.join('|')))
