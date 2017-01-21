// DEV SERVER - ONLY FOR TESTING PURPOSE

const PREFIX = '/tank-game/ajax/game';

var mapSize = [12, 12];
var terrainsTags = ['E', 'S', 'G', 'W', 'B', 'P'];
var terrain = [];
for(var i = 0; i < mapSize[0]*mapSize[1]; ++i)
	terrain.push(terrainsTags[Math.floor(Math.random()*2)]);

var tanks = [
 {
  "id": 0,
  "playerId": 0,
  "x": 10, "y": 1,
  "direction": "down",
  "bonus": ""
 },
 {
  "id": 1,
  "playerId": 0,
  "x": 1, "y": 3,
  "direction": "right",
  "bonus": "armor"
 }
];

function getStateHandle(req, res, next) {
	res.setHeader("Content-Type", "application/json");
	res.end(JSON.stringify({
		errors: "",
		map: terrain,
		tanks: tanks
	}));
}

function startGameHandle(req, res, next) {
	res.setHeader("Content-Type", "application/json");
	res.end(JSON.stringify({
		errors: "",
		mapId: 123
	}));
}

function stopGameHandle(req, res, next) {
	res.setHeader("Content-Type", "application/json");
	res.end(JSON.stringify({
		errors: ""
	}));
}

function createGameHandle(req, res, next) {
	res.setHeader("Content-Type", "application/json");

	res.end(JSON.stringify({
		errors: "",
		gameId: 123
	}));
}

function getGameInfoHandle(req, res, next) {
	res.setHeader("Content-Type", "application/json");
	res.end(JSON.stringify({
		errors: "",
		mapWidth: mapSize[0],
		mapHeight: mapSize[1],
		map: terrain,
		playerId: 0,
		mapId: 1
	}));
}


export const middleware = [
	{
		route: (PREFIX + '/creategame'),
		handle: createGameHandle
	},
	{
		route: (PREFIX + '/startgame'),
		handle: startGameHandle
	},
	{
		route: (PREFIX + '/stopgame'),
		handle: stopGameHandle
	},
	{
		route: (PREFIX + '/getgameinfo'),
		handle: getGameInfoHandle
	},
	{
		route: (PREFIX + '/getstate'),
		handle: getStateHandle
	}
];

