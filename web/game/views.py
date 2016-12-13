from django.shortcuts import render
import sys, os
sys.path.append(sys.path[0] + '/../game/')
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
		for i in xrange(len(tanks)):
			if self.tanks[i]['id'] == id:
				self.tanks[i]['pos'] = pos
				self.tanks[i]['dir'] = dir
				return 1
		return 0

	def updateBulletPosition(self, id, pos, dir):
		for i in xrange(len(bullets)):
			if self.bullets[i]['id'] == id:
				self.bullets[i]['pos'] = pos
				self.bullets[i]['dir'] = dir
				return 1
		return 0

	def addTank(self, id, pos, dir):
		self.player_tanks = [self.player_tanks, {'id':id, 'pos':pos, 'dir':dir}]


	def addBullet(self, id, pos , dir):
		self.bullets = [self.bullets, {'id':id, 'pos':pos, 'dir':dir}]


	"""game handling functions"""
	def startgame(self):
		self.self.game_threads_=[self.game_threads_,GameThread()]
		self.self.game_threads_[len(self.game_threads_)].run()

	def getmap(self,params):
		"""map table of content"""
		map = [[1,2],[3,4]]
		return self.game_threads_.getmap()
		
	def getplayertanks(self,params):
		"""player tank position"""
		return {
			"tanks": self.tanks,
			"error":""
			}

	def getbullets(self,params):
		"""bullet position with given id"""
		return {
			'bullets':self.bullets,
			'error':""
			}

	def moveplayer(self,params):
		self.game_threads_[params['game_id']].move(params['id'])
		return {
			"error": ""
		}

	def playershoot(self,params):
		self.game_threads_[params['game_id']].shoot(params['id'])
		return {
			"error": ""
		}

def getscores():
	"""array of best scores"""
	scores_array = Scores.objects.ordered_by("position")
	return scores_array.values_list()

def getscore(params):
	"""score with given position"""
	if params['pos']<1:
		return {"errors":"wrong pos"}

	scores_array = Scores.objects.filter(position=params['pos'])
	return scores_array.values_list();