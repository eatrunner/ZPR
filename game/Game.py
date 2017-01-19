from Tank import Tank
from random import randint

class Game:
	CONTROL = ["left", "right", "up", "down"]

	def __init__(self, map):
		self.observers = []
		self.tanks = []
		self.input = 0
		self.map = map
		self.playerTank = Tank(0, map.playerPos, self.map)
		self.playerTank.setMaxBullets(2)
		self.tanks.append(self.playerTank)
		self.avalMaps = []
		self.avalMaps.append(1)

	#Returns a list of available maps' id numbers
	def getAvalMaps(self):
		return avalMaps

	def getMap(self):
		return self.map.array

	#Returns the map size - all maps are square
	def getMapSize(self):
		return self.map.size

	#Notifies all obsevers about tank's position change
	def notifyTankPosition(self, tank):
		for observer in self.observers:
				observer.updateTankPosition(tank.id, tank.currPos, tank.faceDirection)

	def notifyBulletPosition(self, bullet):
		for observer in self.observers:
				observer.updateBulletPosition(bullet.id,bullet.currPos, bullet.direction)
	
	def notifyAddTank(self, tank):
		for observer in self.observers:
			observer.addTank(tank.id, tank.currPos, tank.faceDirection)

	def notifyRemoveTank(self, tank):
		for observer in self.observers:
			observer.removeTank(tank.id)

	def notifyAddBullet(self, bullet):
		for observer in self.observers:
			observer.addBullet(bullet.id, bullet.currPos, bullet.direction)

	def notifyRemoveBullet(self, bullet):
		for observer in self.observers:
			observer.removeBullet(bullet.id)

	#if possible moves a tank in a direction
	def moveTank(self, id, direction):
		for tank in self.tanks:
			if tank.id == id:
				if (tank.move(direction)):
					self.notifyTankPosition(tank)

	def addTank(self, tank):
		self.tanks.append(tank)
		self.notifyAddTank(tank)

	def removeTank(self, tank):
		self.notifyRemoveTank(tank)
		self.tanks.remove(tank)

	def shoot(self,id):
		for tank in self.tanks:
			if tank.id == id:
				if (len(tank.bullets) < tank.maxBullets):
					bullet = tank.createBullet()
					self.notifyAddBullet(bullet)


	def addObserver(self,observer):
		self.observers.append(observer)
		for tank in self.tanks:
			observer.addTank(tank.id, tank.currPos, tank.faceDirection)
			if(tank.bullets != []):
				for bullet in tank.bullets:
					observer.addBullet(bullet.id, bullet.currPos, bullet.direction)

	def processGame(self):
		for tank in self.tanks:
			if (tank.bullets != []):
				for bullet in tank.bullets:
					if(tank.moveBullet(bullet) == True):
						self.notifyBulletPosition(bullet)
					else:
						self.notifyRemoveBullet(bullet)
						tank.removeBullet(bullet)

from Map import Map
game = Game(Map(0,13))