from django.shortcuts import render

# import models
		
# Create your views here.
class Controller(object):
	"""docstring for Controller"""
	def __init__(self):
		super(Controller, self).__init__()

	def startgame(self):
		pass

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