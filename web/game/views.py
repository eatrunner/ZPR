from django.shortcuts import render
import sys, os
sys.path.append(sys.path[0] + '/../game/')
# for tests
sys.path.append(sys.path[0] + '/../../game/')

from GameObserver import GameObserver
from GameThread import GameThread



# import models
import thread

		
# Create your views here.
class Controller(GameObserver):
	"""docstring for Controller"""
	tanks = []
	bullets = []
	game_threads_=[]
	maps = []

	def __init__(self):
		super(Controller, self).__init__()
		GameObserver.__init__(self)

	def updateTankPosition(self, id, pos, dir):
		for i in xrange(len(self.tanks)):
			if self.tanks[i]['id'] == id:
				self.tanks[i]['pos'] = pos
				self.tanks[i]['dir'] = dir
				return 1
		return 0

	def updateBulletPosition(self, id, pos, dir):
		for i in xrange(len(self.bullets)):
			if self.bullets[i]['id'] == id:
				self.bullets[i]['pos'] = pos
				self.bullets[i]['dir'] = dir
				return 1
		return 0


	def addTank(self, id, pos, dir):
		self.tanks.append({'id':id, 'pos':pos, 'dir':dir})
	
	def removeTank(self, id):
		for i in xrange(len(self.tanks)):
			if self.tanks[i]['id']==id:
				return self.tanks.pop(i)		
		return None

	def addBullet(self, id, pos , dir):
		self.bullets.append({'id':id, 'pos':pos, 'dir':dir})

	def removeBullet(self,id):
		for i in xrange(len(self.bullets)):
			if self.bullets[i]['id']==id:
				return self.bullets.pop(i)		
		return None

	"""game handling functions"""
	def startgame(self):
		if self.game_threads_ == []:
			self.game_threads_.append(GameThread(1,13))
			self.game_threads_[len(self.game_threads_)-1].addObserver(self)
			self.game_threads_[len(self.game_threads_)-1].run()
			self.maps=[self.maps, self.self.game_threads_[len(self.game_threads_)-1].getMap()]
			return {
				"error":""
			}
		else:
			return {
				"error":"game_is_running"
			}


	def stopgame(self,params):
		if self.game_threads_ == []:
			return {
				"error":"no_running_game"

			}
		else:
			self.game_threads_[0].kill()
			return {
				"error": ""
			}

	def pausegame(self, params):
		if self.game_threads_ == []:
			return {
				"error":"no_running_game"

			}
		else:
			self.game_threads_[0].pause()
			return {
				"error": ""
			}


	def getmap(self,params):
		"""map table of content"""
		if self.maps == []:
			return {
				'error':'no_maps'
			}
		else:
			try:
				return {
				'size':[len(self.maps[params['id']]), len(self.maps[params['id']][0])],
				'map':self.maps[params['id']],
				'error':""
			}
			except IndexError:
				return {
					"error":"IndexError"
				}
			
		
	def gettanks(self,params):
		"""player tank position"""
		if self.tanks == []:
			return {
				'error':'no_tanks'
			}
		else:
			return {
				"tanks": self.tanks,
				"error":""
			}

	def getbullets(self,params):
		"""bullet position with given id"""
		if self.bullets == []:
			return {
				'error':'no_bullets'
			}
		else:
			return {
				'bullets':self.bullets,
				'error':""
				}

	def moveplayer(self,params):
		if self.game_threads_ == []:
			return {
				'error':'no_game_threads'
			}
		else:
			try:
				self.game_threads_[params['game_id']].movePlayer(params['id'], params['dir'])
				return {
				"error": ""
				}
			except IndexError:
				return {
					"error":"IndexError"
				}
			

	def playershoot(self,params):
		if self.game_threads_ == []:
			return {
				'error':'no_game_threads'
			}
		else:
			try:
				self.game_threads_[params['game_id']].shoot(params['id'])
				return {
					"error": ""
				}
			except IndexError:
				return{
					"error":"IndexError"
				}

				

def getscores():
	"""array of best scores"""
	scores_array = Scores.objects.ordered_by("position")
	return scores_array.values_list()

def getscore(params):
	"""score with given position"""
	if params['pos']<1:
		return {"error":"wrong pos"}

	scores_array = Scores.objects.filter(position=params['pos'])
	return scores_array.values_list();