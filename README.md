# MapMakingExperiments
Trying to make a map system for a game i'm working on, just 4 fun.

## Trying to document everything any question please ask.

## Usage
`node map.js` or `node map2.js`

## Diffs
The first one can make more like "corridors" while the second usually gives big blobs

The times are about the same 500-600ms per 21x21 20ish nodes map, and about 600-700 for a 21x21 40ish nodes map;

~~Still need to figure out how to make a "minimum" for the first sistem, i liked it more, but sometimes it can have less than 20/40 nodes;~~ Did a "minimum" for map1, changed so much i decided to make a new file (map3).

Not for using somewhere for real, this is just 4 fun :p

map5 is a js implementation of [Six Dot's](https://www.youtube.com/watch?v=nADIYwgKHv4) map generation (originally c#/unity)

## TODO

Probably will only work on map 3 onwards

simplify everything to only use that doWhile (L170) 

remove as many duplicate code as possible
