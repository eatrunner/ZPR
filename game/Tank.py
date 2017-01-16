from Map import Map
from Bullet import Bullet

class Tank:

	CTRLS = [
	    "left",
	    None,
	    "right",
	    "up",
	    None,
	    "down",
	]

	def __init__(self, id, pos, map):
		self.id = id
		self.currPos = pos
		self.prevPos = pos
		self.map = map
		self.bullet = None
		self.faceDirection = "up"

	#Returns False if a collision occured or direction is not proper
	def move(self, direction):
		flag = False
		if direction in self.CTRLS:
			if(self.faceDirection != direction):
				flag = True	
				self.faceDirection = direction
			d = self.CTRLS.index(direction)
			self.prevPos = self.currPos[:]
			self.currPos[d > 2] += (d - (1 if d < 3 else 4))
			
			#Check collisions
			if not((-1<self.currPos[0]<self.map.size) and (-1<self.currPos[1]<self.map.size) and self.map.matrix[self.currPos[0]][self.currPos[1]] == 'E'):
				self.currPos = self.prevPos[:]
				if flag:
					return True
				else:
					return False
			return True
		return False
					
	def getPosition(self):
		return self.currPos

	def createBullet(self):
		self.bullet = Bullet(self.id, self.map, self.currPos[0], self.currPos[1], self.faceDirection)

	def moveBullet(self):
		if (self.bullet != None):
			if (self.bullet.move() == False):
				return False
			return True
		return False

	def removeBullet(self):
		if (self.bullet!=None):
			self.bullet = None