from Tank import Tank
from random import randint

class Game:
	CONTROL = ["left", "right", "up", "down"]

	def __init__(self, map):
		self.observers = []
		self.input = 0
		self.map = map
		self.playerTank = Tank(0, map.playerPos, self.map)

	def getMap(self):
		return self.map.array

	def getMapSize(self):
		return self.map.size

	def notifyTankPosition(self):
		playerTank = self.playerTank
		for observer in self.observers:
				observer.updateTankPosition(playerTank.id, playerTank.currPos, playerTank.faceDirection)

	def notifyBulletPosition(self):
		bullet = self.playerTank.bullet
		for observer in self.observers:
				observer.updateBulletPosition(bullet.id,bullet.currPos, bullet.direction)
	

	def movePlayer(self, direction):
		if (self.playerTank.move(direction)):
			self.notifyTankPosition()

	def fireBullet(self):
		if (self.playerTank.bullet == None):
			self.playerTank.createBullet()

	def addObserver(self,observer):
		self.observers.append(observer)

	def processGame(self):
		if (self.playerTank.moveBullet() == True):
			self.notifyBulletPosition()
