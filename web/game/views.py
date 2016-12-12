from django.shortcuts import render
# from game.GameObserver import GameObserver


# import models
import thread

		
# Create your views here.
class Controller(object):
	"""docstring for Controller"""
	player_tanks = []
	enemy_tanks = []
	bullets = []

	def __init__(self):
		super(Controller, self).__init__()
		# GameObserver.__init__(self)
	
	def addPLayerTank(self):
		pass

	def addEnemyTank(self):
		pass

	def addBullet(self):
		pass

	"""game handling functions"""
	def startgame(self):
		thread.start_new_thread(None)

	def getmap(self,params):
		"""map table of content"""
		map = [[1,2],[3,4]]
		return {
		"size": [2,2],
			"map": map,
			"errors": ""
		}

	def getplayertanks(self,params):
		"""player tank position"""
		return {
			"id": 1,
			"pos":[1,2],
			"errors":""
		}

	def getbullets(self,params):
		"""bullet position with given id"""
		if params['id']<0:
			return {"errors": "wrong id"}
		
		return {
			"id": params['id'],
			"pos": [1,2],
			"errors":""
		}

	def moveplayer(self,params):
		return {
			"error": ""
		}

	def playershoot(self,params):
		return {
			"error": ""
		}

		


def getmap(params):
	"""map table of content"""
	map = [[1,2],[3,4]]
	return {
	"size": [2,2],
		"map": map,
		"errors": ""
	}

def getplayertanks(params):
	"""player tank position"""
	return {
		"pos":[1,2],
		"errors":""
	}
def getbullet(params):
	"""bullet position with given id"""
	if params['id']<0:
		return {"errors":"wrong id"}

	return {
		"id": params['id'],
		"pos": [1,2],
		"errors":""
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