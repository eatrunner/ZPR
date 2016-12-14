from Game import Game
from Map import Map
from GameObserver import GameObserver
import threading
import time

FPS = 1
SEC_PER_FRAME = 1.0/FPS

class GameThread(threading.Thread):
	def __init__(self, mapID, mapSize, playerX, playerY, observer):
		threading.Thread.__init__(self)
		self.game = Game(Map(mapID,mapSize), playerX, playerY, observer)
		self.killFlag = 0

	def kill(self):
		self.killFlag = 1

	def run(self):
		while (not self.killFlag):
			currentTime = time.time()
			self.game.processGame()
			time.sleep(currentTime + SEC_PER_FRAME - time.time())
