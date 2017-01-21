// DEV SERVER - ONLY FOR TESTING PURPOSE

const PREFIX = '/tank-game/ajax/game';

var mapSize = [12, 12];
var mapWidth = mapSize[0];
var mapHeight = mapSize[1];
var directions = ["up", "down", "left", "right"];
var terrainsTags = ['E', 'B', 'G', 'W', 'S', 'P'];
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

var bullets = [
 {
  "id": 0,
  "x": 1, "y": 2,
  "direction": "up",
  "ownerId": 0
 },
 {
  "id": 1,
  "x": 4, "y": 3,
  "direction": "right",
  "ownerId": 1
 }
];
var nextBulletId = 2;

function getStateHandle(req, res, next) {
	if(Math.random() <= 0.25) {
		bullets.push( {
			"id": nextBulletId++,
			"x": Math.floor(Math.random() * mapWidth) , "y": Math.floor(Math.random() * mapHeight) ,
			"direction": directions[Math.floor(Math.random() * directions.length)] ,
			"ownerId": 1
		});
	}

	for(var i in bullets) {
		var dir = bullets[i].direction;
		switch(dir) {
			case 'up':
				bullets[i].y--;
				break;
			case 'down':
				bullets[i].y++;
				break;
			case 'right':
				bullets[i].x++;
				break;
			case 'left':
				bullets[i].x--;
				break;
		}

		if(bullets[i].x < 0 || bullets[i].x >= mapWidth || bullets[i].y < 0 || bullets[i].y >= mapHeight)
			bullets.splice(i, 1);
	}

	for(var i in tanks) {
		var changeX = Math.random() >= 0.5;
		var increment = Math.random() >= 0.5;
		var tank = tanks[i];
		if(changeX) {
			if(increment) {
				if(tank.x <= mapWidth - 2) {
					tank.x++;
					tank.direction = "right";
				}
			} else { // !increment
				if(tank.x > 0) {
					tank.x--;
					tank.direction = "left";
				}
			}
		} else { // !changeX
			if(increment) {
				if(tank.y <= mapHeight - 2) {
					tank.y++;
					tank.direction = "down";
				}
			} else { // !increment
				if(tank.y > 0) {
					tank.y--;
					tank.direction = "up";
				}
			}
		}
	}
 
	res.setHeader("Content-Type", "application/json");
	res.end(JSON.stringify({
		errors: "",
		map: terrain,
		tanks: tanks,
		bullets: bullets
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

