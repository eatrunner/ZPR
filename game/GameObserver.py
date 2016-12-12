from Tank import Tank
from Bullet import Bullet

class GameObserver:
	def updateTankPosition(self, id, pos, dir):
		x, y = pos
		print "Tank no", id, ", position: ", x, " ", y,", direction: ", dir
		

	def updateBulletPosition(self, id, pos, dir):
		x, y = pos
		print "Bullet no", id, ", position: ", x, " ", y,", direction: ", dir