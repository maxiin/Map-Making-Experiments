import { makeMap, MapNode } from "./implementation5.js";

const canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

let map = [];
let lastPosition: MapNode;

function showNewMap() {
        const height = 8;
        const width = 11;
        const roomNumber = 20;

        map = makeMap(roomNumber, height, width);
        lastPosition = {x: height, y: width};

        updateMap();
}

function updateMap() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cellSide = 10;

    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
        let x = j * cellSide;
        let y = i * cellSide;

        let cellColor;
        switch(map[i][j]) {
            case 0:
                cellColor = 'rgb(30, 167, 225)';
                break;
            case 1: 
                cellColor = 'rgb(158, 164, 173)';
                break;
        }
        if(map[i][j] !== null){
            ctx.beginPath();
            ctx.fillStyle = cellColor;
            ctx.fillRect(x, y, cellSide, cellSide);
            ctx.beginPath();
            ctx.strokeStyle = 'black'
            ctx.strokeRect(x, y, cellSide, cellSide);
        }
        }
    }
}
