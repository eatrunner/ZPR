from Tank import Tank
from Bullet import Bullet

class GameObserver(object):
	def __init__(self):
		super(GameObserver, self).__init__()

	tanks_ = []
	bullets_ = []
	game_map_= []
	bonuses_ = []
	map_size_ = 0
	score_ = 0
	game_status_ = "stop"

		
	def updateTankPosition(self, id, pos, dir):
		for i in xrange(len(self.tanks_)):
			if self.tanks_[i]['id'] == id:
				self.tanks[_i]['pos'] = pos
				self.tanks_[i]['dir'] = dir
				return 1
		return 0	

	def updateBulletPosition(self, id, pos, dir):
		for i in xrange(len(self.bullets_)):
			if self.bullets_[i]['id'] == id:
				self.bullets_[i]['pos'] = pos
				self.bullets_[i]['dir'] = dir
				return 1
		return 0

	def updateMap(self, new_map):
		self.game_map_=new_map
		return 1

	def updateMapSize(self, new_size):
		self.map_size_=new_size

	def updateScore(self, new_score):
		self.score_=new_score

	def updateGameStatus(self, new_status):
		self.game_status_=new_status

	def addTank(self, tank_id, pos, dir):
		self.tanks_.append({'id':tank_id, 'pos':pos, 'dir':dir})
	
	def removeTank(self, id):
		for i in xrange(len(self.tanks_)):
			if self.tanks_[i]['id']==id:
				return self.tanks_.pop(i)		
		return None


	def addBullet(self, id, pos , dir):
		self.bullets_.append({'id':id, 'pos':pos, 'dir':dir})
		x,y = pos
		print "Added bullet ", id, "position ", x,y

	def removeBullet(self,id):
		for i in xrange(len(self.bullets_)):
			if self.bullets_[i]['id']==id:
				return self.bullets_.pop(i)		
		return None

	def getTanks(self):
		return self.tanks_

	def getBullets(self):
		return self.bullets_

	def getMap(self):
		return self.game_map_

	def  getMapSize(self):
		return self.map_size_

	def getBonuses(self):
		return self.bonuses_

	def getStatus(self):
		return self.game_status_

	def getScore(self):
		return self.score_
