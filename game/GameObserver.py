from Tank import Tank
from Bullet import Bullet

class GameObserver(object):
	def __init__(self):
		super(GameObserver, self).__init__()

		
	def updateTankPosition(self, id, pos, dir):
		x, y = pos
		print "Tank no", id, ", position: ", x, " ", y,", direction: ", dir
		

	def updateBulletPosition(self, id, pos, dir):
		x, y = pos
		print "Bullet no", id, ", position: ", x, " ", y,", direction: ", dir

	def addTank(self, id, pos, dir):
		print "Added tank ", id
	
	def removeTank(self, id):
		print "Removed tank ", id

	def addBullet(self, id, pos , dir):
		print "Added bullet ", id

	def removeBullet(self,id):
		print "Removed bullet ", id
