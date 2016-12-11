from Tank import Tank
from random import randint

class Game:
	CONTROL = ["left", "right", "up", "down"]

	def __init__(self, map, playerX, playerY):
		self.observers = [] 
		self.input = 0
		self.map = map
		self.playerTank = Tank(0, playerX, playerY, self.map)

	def movePlayer(self, direction):
		if (self.playerTank.move(direction)):
			for observer in self.observers:
				observer.notifyTankPosition(self.playerTank)

	def fireBullet(self):
		if (self.playerTank.bullet == None):
			self.playerTank.createBullet()

	def addObserver(self,observer):
		self.observers.append(observer)

	def processGame(self):
		if (self.playerTank.moveBullet() == True):
			for observer in self.observers:
				observer.notifyBulletPosition(self.playerTank.bullet)