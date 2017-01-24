## @file game/ServerGameObserver.py
#  @brief Observer for game threads
from GameObserver import GameObserver

##ServerGameObserver
# Observer for game threads

class ServerGameObserver(GameObserver):
	def __init__(self, new_map_id):
		super(ServerGameObserver, self).__init__()
		self.map_id_=new_map_id

	tanks_ = []
	bullets_ = []
	game_map_= []
	bonuses_ = []
	map_size_ = 0
	score_ = 0
	game_status_ = "stop"
	map_id_=0

		
	def updateTankPosition(self, id, pos, dir):
		"""updateTankPosition function"""
		x,y=pos
		for i in xrange(len(self.tanks_)):
			if self.tanks_[i]['id'] == id:
				self.tanks_[i]['x'] = x
				self.tanks_[i]['y'] = y
				self.tanks_[i]['dir'] = dir
				return 1
		return 0	

	def updateBulletPosition(self, id, pos, dir):
		"""updateBulletPosition function"""
		x,y=pos
		for i in xrange(len(self.bullets_)):
			if self.bullets_[i]['id'] == id:
				self.bullets_[i]['x'] = x
				self.bullets_[i]['y'] = y
				self.bullets_[i]['dir'] = dir
				return 1
		return 0

	def updateMap(self, new_map):
		"""updateMap function"""
		self.game_map_=new_map
		return 1

	def updateMapSize(self, new_size):
		"""updateMapSize function"""
		self.map_size_=new_size

	def updateScore(self, new_score):
		"""updateScore function"""
		self.score_=new_score

	def updateGameStatus(self, new_status):
		"""updateGameStatus function"""
		self.game_status_=new_status

	def updateMapId(self, new_map_id):
		"""updateMapId function"""
		self.map_id_=new_map_id

	def addTank(self, tank_id, pos, dir):
		"""addTank function"""
		x,y=pos
		self.tanks_.append({'id':tank_id, 'x':x, 'y':y, 'dir':dir})
	
	def removeTank(self, id):
		"""removeTank function"""
		for i in xrange(len(self.tanks_)):
			if self.tanks_[i]['id']==id:
				return self.tanks_.pop(i)		
		return None


	def addBullet(self, id, pos , dir):
		"""addBullet function"""
		x,y=pos
		self.bullets_.append({'id':id, 'x':x, 'y':y, 'dir':dir})
		print "Added bullet ", id, "position ", x,y

	def removeBullet(self,id):
		"""removeBullet function"""
		for i in xrange(len(self.bullets_)):
			if self.bullets_[i]['id']==id:
				return self.bullets_.pop(i)		
		return None

	def addBonus(self, id, pos, type ):
		"""addBonus function"""
		x,y = pos
		self.bonuses_.append({'id':id, 'x':x, 'y':y, 'type':type})
		print "Added bonus ", id, "position ", x,y

	def removeBonus(self,id):
		"""removeBonus function"""
		for i in xrange(len(self.bonuses_)):
			if self.bonuses_[i]['id']==id:
				return self.bonuses_.pop(i)		
		return None

	def getTanks(self):
		"""getTanks function"""
		return self.tanks_

	def getBullets(self):
		"""getBullets function"""
		return self.bullets_

	def getMap(self):
		"""getMap function"""
		return self.game_map_

	def  getMapSize(self):
		"""getMapSize function"""
		return self.map_size_

	def getBonuses(self):
		"""getBonuses function"""
		return self.bonuses_

	def getStatus(self):
		"""getStatus function"""
		return self.game_status_

	def getScore(self):
		"""getScore function"""
		return self.score_

	def getMapId(self):
		"""getMapId function"""
		return self.map_id_
