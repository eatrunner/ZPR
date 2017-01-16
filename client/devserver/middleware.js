const PREFIX = '/tank-game/ajax/game';

var mapSize = [12, 12];
var terrainsTags = ['E', 'S', 'G', 'W', 'B', 'P'];
var terrain = [];
for(var i = 0; i < mapSize[0]*mapSize[1]; ++i)
	terrain.push(terrainsTags[Math.floor(Math.random()*terrainsTags.length)])


function startGameHandle(req, res, next) {
	res.setHeader("Content-Type", "application/json");
	res.end(JSON.stringify({
		errors: "",
		mapId: 123
	}));
}

function getMapInfo(req, res, next) {
	res.setHeader("Content-Type", "application/json");
	res.end(JSON.stringify({
		size: mapSize,
		map: terrain,
		errors: ""
	}));
}

function stopGameHandle(req, res, next) {
	res.setHeader("Content-Type", "application/json");
	res.end(JSON.stringify({
		errors: ""
	}));
}

function getMapHandle(req, res, next) {
	terrain = [];
	for(var i = 0; i < mapSize[0]*mapSize[1]; ++i)
		terrain.push(terrainsTags[Math.floor(Math.random()*terrainsTags.length)]);

	res.setHeader("Content-Type", "application/json");
	res.end(JSON.stringify({
		map: terrain,
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
		gameInfo: {
			mapSize: mapSize,
			map: terrain,
			gameFps: 1
		}
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
		route: (PREFIX + '/getmap'),
		handle: getMapHandle
	},
	{
		route: (PREFIX + '/getmapinfo'),
		handle: getMapInfo
	},
	{
		route: (PREFIX + '/getgameinfo'),
		handle: getGameInfoHandle
	}
];

