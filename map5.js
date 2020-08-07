const middle = 10;
const roomCount = 10;

let rooms;
let taken = [];

const top = ({x, y}) => ({x: x-1, y});
const right = ({x, y}) => ({x, y: y+1});
const left = ({x, y}) => ({x, y: y-1});
const bottom = ({x, y}) => ({x: x+1, y});

function initBoard() {
    if (roomCount > Math.pow(middle * 2)) {
        roomCount = Math.pow(middle * 2);
    }
    rooms = new Array(middle * 2).fill(0).map(() => new Array(middle * 2).fill(0));
    initMap();
}

function initMap() {
    rooms[middle][middle] = 'X';
    taken.push({x: middle, y: middle});
    createRooms();
}

function createRooms() {
    for (let i = 0; i < roomCount; i++) {
        const randomBranching = i / roomCount;
        const random = (0.2 * randomBranching) + 0.1;

        let pos = newPosition();

        if(neighborNumber(pos) > 1 && Math.random() > random) {
            let iterations = 0;
            do {
                pos = newPosition(true);
                iterations++;
            } while (neighborNumber(pos) > 1 && iterations < roomCount);
        }
        rooms[pos.x][pos.y] = '_';
        taken.push(pos);
    }
}

function newPosition(selective) {
    let x = 0, y = 0;
    let pos = {x: middle, y: middle};
    do {
        let index = Math.floor(Math.random() * taken.length);
        if(selective){
            let iterations = 0;
            while(neighborNumber(taken[index]) > 1 && iterations < roomCount){
                index = Math.floor(Math.random() * taken.length);
                iterations++;
            }
        }
        x = taken[index].x;
        y = taken[index].y;

        let up = Math.random() < .5;
        let right = Math.random() < .5;
        if (up) {
            if (right) {
                y += 1;
            } else {
                y -= 1;
            }
        } else {
            if (right) {
                x += 1;
            } else {
                x -= 1;
            }
        }
        pos = {x,y}
    } while (alreadyTaken(pos) || x >= middle * 2 || x < 0 || y >= middle * 2 || y < 0);
    return pos;
}

function neighborNumber({x,y}) {
    let ret = 0
    if(alreadyTaken(top({x,y}))){
        ret++;
    }
    if(alreadyTaken(right({x,y}))){
        ret++;
    }
    if(alreadyTaken(bottom({x,y}))){
        ret++;
    }
    if(alreadyTaken(left({x,y}))){
        ret++;
    }
    return ret;
}

function alreadyTaken({x,y}) {
    return !!taken.find((v) => (v.x === x && v.y === y));
}

console.time('third')
initBoard();
console.timeEnd('third')
console.log(`taken: ${JSON.stringify(taken)}`)
console.log(rooms.reduce((ac, val) => ac + val.reduce((ac, val) => ac + val == 0 ? 0 : 1, 0), 0));
console.log(rooms.map((l) => l.join('|')));
