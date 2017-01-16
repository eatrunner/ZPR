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
		self.tanks.append(self.playerTank)

	def getMap(self):
		return self.map.array

	def getMapSize(self):
		return self.map.size


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


	def moveTank(self, tank, direction):
		if (tank.move(direction)):
			self.notifyTankPosition(tank)

	def addTank(self, tank):
		self.tanks.append(tank)

	def removeTank(self, tank):
		self.notifyRemoveTank(tank)
		self.tanks.remove(tank)

	def fireBullet(self, tank):
		if (tank.bullet == None):
			tank.createBullet()
			self.notifyAddBullet(tank.bullet)


	def addObserver(self,observer):
		self.observers.append(observer)
		for tank in self.tanks:
			observer.addTank(tank.id, tank.currPos, tank.faceDirection)
			if(tank.bullet != None):
				observer.addBullet(tank.bullet.id, tank.bullet.currPos, tank.bullet.direction)

	def processGame(self):
		for tank in self.tanks:
			if (tank.bullet != None):
				if(tank.moveBullet() == True):
					self.notifyBulletPosition(tank.bullet)
				else:
					self.notifyRemoveBullet(tank.bullet)
					tank.removeBullet()

from Map import Map
game = Game(Map(0,13))