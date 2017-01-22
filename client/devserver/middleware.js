// DEV SERVER - ONLY FOR TESTING PURPOSE

const PREFIX = '/tank-game/ajax/game';

var mapSize = [16, 16];
var mapWidth = mapSize[0];
var mapHeight = mapSize[1];
var directions = ["up", "down", "left", "right"];
var terrainsTags = ['E', 'B', 'G', 'W', 'S', 'P'];
var terrain = [];
for(var i = 0; i < mapSize[0]*mapSize[1]; ++i)
	terrain.push(terrainsTags[Math.floor(Math.random()*2)]);

var playerTank =  {
  "id": 0,
  "playerId": 0,
  "x": 10, "y": 1,
  "direction": "down",
  "bonus": ""
 };

var tanks = [
	playerTank
];

var bullets = [
];
var nextBulletId = 2;
var nextTankId = 2;

function getStateHandle(req, res, next) {
	if(Math.random() <= 0.25) {
		tanks.splice(Math.floor(Math.random() * tanks.length), 1);
	}

	if(tanks.length > 0 && Math.random() <= 0.25) {
		var tank = tanks[Math.floor(Math.random() * tanks.length)];
		bullets.push( {
			"id": nextBulletId++,
			"x": tank.x , "y": tank.y ,
			"direction": tank.direction ,
			"ownerId": tank.id
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

	if(Math.random() <= 0.25) {
		tanks.push({
			"id": nextTankId++,
			"x": Math.floor(Math.random() * mapWidth) , "y": Math.floor(Math.random() * mapHeight) ,
			"direction": directions[Math.floor(Math.random() * directions.length)] ,
			"ownerId": 1,
			"playerId": 1
		});
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
		tanks: tanks.concat(playerTank),
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

function movePlayerHandle(req, res, next) {
	var changeX = Math.random() >= 0.5;
	var increment = Math.random() >= 0.5;
	var tank = playerTank;
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
	res.setHeader("Content-Type", "application/json");
	res.end(JSON.stringify({
		errors: ""
	}));
}

function playerShootHandle(req, res, next) {
	var tank = playerTank;
	bullets.push( {
		"id": nextBulletId++,
		"x": tank.x , "y": tank.y ,
		"direction": tank.direction ,
		"ownerId": tank.id
	});
	res.setHeader("Content-Type", "application/json");
	res.end(JSON.stringify({
		errors: ""
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
	},
	{
		route: (PREFIX + '/moveplayer'),
		handle: movePlayerHandle
	},
	{
		route: (PREFIX + '/playershoot'),
		handle: playerShootHandle
	}
];

