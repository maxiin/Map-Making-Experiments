export interface MapNode {
    x: number;
    y: number;
    type?: number;
}

//let middle: number; // half of the diameter of the board
let width: number;
let height: number;
let roomCount: number;

let rooms: Array<Array<number>>;
let taken: Array<MapNode>;

const up = ({x, y}: MapNode) => ({x: x-1, y});
const right = ({x, y}: MapNode) => ({x, y: y+1});
const left = ({x, y}: MapNode) => ({x, y: y-1});
const bottom = ({x, y}: MapNode) => ({x: x+1, y});

export function makeMap(newCount = 10, newHeight = 10, newWidth = 10) {
    taken = [];
    roomCount = newCount;
    height = newHeight;
    width = newWidth;
    //middle = newHalf;
    return initBoard();
}

function initBoard() {
    // set a maximum roomCount
    if (roomCount > width * 2 || roomCount > height * 2) {
        roomCount = Math.round(((width * 2) + (height * 2)) / 2);
    }
    // create and fill array;
    rooms = new Array(height * 2).fill(null).map(() => new Array(width * 2).fill(null));
    return initMap();
}

function initMap() {
    // set middle to number 0;
    rooms[height][width] = 0;
    taken.push({x: height, y: width});
    return createRooms();
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
        rooms[pos.x][pos.y] = 1;
        taken.push(pos);
    }
    return rooms;
}

function newPosition(selective?: boolean) {
    let x = 0, y = 0;
    let pos = {x: height, y: width};
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
    } while (alreadyTaken(pos) || x >= height * 2 || x < 0 || y >= width * 2 || y < 0);
    return pos;
}

function neighborNumber({x,y}: MapNode) {
    let ret = 0
    if(alreadyTaken(up({x,y}))){
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

function alreadyTaken({x,y}: MapNode) {
    return !!taken.find((v) => (v.x === x && v.y === y));
}
