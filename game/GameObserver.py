from Tank import Tank
from Bullet import Bullet

class GameObserver:
	def notifyTankPosition(self, tank):
		id = tank.id
		x = tank.currPos[0]
		y = tank.currPos[1]
		direction = tank.faceDirection
		print "Tank no", id, ", position: ", x, " ", y,", direction: ", direction
		

	def notifyBulletPosition(self, bullet):
		id = bullet.id
		x, y = bullet.getPosition()
		direction = bullet.direction
		print "Bullet no", id, ", position: ", x, " ", y,", direction: ", direction