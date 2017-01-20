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
class Controller(object):
	"""docstring for Controller"""
		
	def __init__(self,):
		super(Controller, self).__init__()


	game_threads_=[]
	observers_ = []

	

	"""game handling functions"""

	def creategame(self, params):
		self.game_threads_.append({"thread":GameThread(1,13), "gameid":len(self.game_threads_)})
		self.observers_.append({"observ": GameObserver(), "gameid":len(self.game_threads_)-1})
		self.game_threads_[len(self.game_threads_)-1]["thread"].addObserver(self.observers_[len(self.observers_)-1]["observ"])
		return {
			"gameid":len(self.game_threads_)-1,
			"error":""
		}

	def startgame(self,params):
		if self.game_threads_==[]:
			return {
				"error":"none games created"
			}

		for i in xrange(len(self.game_threads_)):
			if int(self.game_threads_[i]['gameid']) == int(params['gameid']):			
				if not self.game_threads_[i]["thread"].is_alive():
					self.game_threads_[len(self.game_threads_)-1]["thread"].start()
					return {
						"error":""
					}
				else:
					return {
				"error":"game_is_running"
				}
		return {
		"error":"game with given gameid does not exist"
		}
			


	def deletegame(self,params):
		if self.game_threads_ == []:
			return {
				"error":"no existing game"

			}
		else:
			for i in xrange(len(self.game_threads_)):
				if int(self.game_threads_[i]['gameid']) == int(params['gameid']):
					self.game_threads_[i]["thread"].kill()
					self.game_threads_.pop(i)
					for i in xrange(len(self.observers_)):
						if self.observers_[i]['gameid'] == params['gameid']:
							self.observers_.pop(i)
						return {
							"error": ""
						}
		return {
			"error": "game with given gameid does not exist"
		}

	def pausegame(self, params):
		if self.game_threads_ == []:
			return {
				"error":"no existing game"

			}
		else:
			for i in xrange(len(self.game_threads_)):
				if int(self.game_threads_[i]['gameid']) == int(params['gameid']):
					self.game_threads_[i]["thread"].pause()
					return {
						"error": ""
					}
		return {
			"error": "game with given gameid does not exist"
		}


	def resumegame(self,params):
		if self.game_threads_ == []:
			return {
				"error":"no existing game"

			}
		else:
			for i in xrange(len(self.game_threads_)):
				if int(self.game_threads_[i]['gameid']) == int(params['gameid']):
					self.game_threads_[i]["thread"].resume()
					return {
						"error": ""
					}
		return {
			"error": "game with given gameid does not exist"
		}

	def continuegame(self,params):
		if self.game_threads_ == []:
			return {
				"error":"no existing game"

			}
		else:
			for i in xrange(len(self.game_threads_)):
				if int(self.game_threads_[i]['gameid']) == int(params['gameid']):
					self.game_threads_[i]["thread"].continueGame()
					return {
						"error": ""
					}
		return {
			"error": "game with given gameid does not exist"
		}


	def getavalmaps(self,params):
		if self.game_threads_ == []:
			return {
				"error":"no existing game"

			}
		else:
			for i in xrange(len(self.game_threads_)):
				if int(self.game_threads_[i]['gameid']) == int(params['gameid']):
					self.game_threads_[i]["thread"].getAvalMaps()
					return {
						"avalmaps":	self.game_threads_[i]["thread"].getAvalMaps(),
						"error": ""
					}
		return {
			"error": "game with given gameid does not exist"
		}
		
	def getgameinfo(self,params):
		if self.game_threads_ == []:
			return {
				"error":"no existing game"

			}
		else:
			for i in xrange(len(self.observers_)):
				if int(self.observers_[i]['gameid']) == int(params['gameid']):
					return {
						'map':self.observers_[i]["observ"].getMap(),
						"mapWidth":self.observers_[i]["observ"].getMapSize(),
						"mapHeight":self.observers_[i]["observ"].getMapSize(),
						"playerid": 0,
						'error':""
					}
		return {
			"error": "game with given gameid does not exist"
		}

	def getstate(self,params):
		"""map table of content"""
		if self.game_threads_ == []:
			return {
				"error":"no existing game"

			}
		else:
			for i in xrange(len(self.observers_)):
				if int(self.observers_[i]['gameid']) == int(params['gameid']):
					return {
						'map':self.observers_[i]["observ"].getMap(),
						"tanks":self.observers_[i]["observ"].getTanks(),
						"bullets":self.observers_[i]["observ"].getBullets(),
						"bonuses": self.observers_[i]["observ"].getBonuses(),
						"status": self.observers_[i]["observ"].getStatus(),
						"score": self.observers_[i]["observ"].getScore(),
						'error':""
					}
		return {
			"error": "game with given gameid does not exist"
		}

	def getsummary(self,params):
		if self.game_threads_ == []:
			return {
				"error":"no existing game"

			}
		else:
			for i in xrange(len(self.observers_)):
				if int(self.observers_[i]['gameid']) == int(params['gameid']):
					return {
						"score": self.observers_[i]["observ"].getScore(),
						'error':""
					}
		return {
			"error": "game with given gameid does not exist"
		}
	

	def moveplayer(self,params):
		if self.game_threads_ == []:
			return {
				"error":"no existing game"

			}
		else:
			for i in xrange(len(self.game_threads_)):
				if int(self.game_threads_[i]['gameid']) == int(params['gameid']):
					self.game_threads_[i]["thread"].moveTank(0, params['dir'])
					return {
						"error": ""
					}
		return {
			"error": "game with given gameid does not exist"
		}
			
			

	def playershoot(self,params):
		if self.game_threads_ == []:
			return {
				"error":"no existing game"

			}
		else:
			for i in xrange(len(self.game_threads_)):
				if int(self.game_threads_[i]['gameid']) == int(params['gameid']):
					self.game_threads_[i]["thread"].shoot(0)
					return {
						"error": ""
					}
		return {
			"error": "game with given gameid does not exist"
		}
