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
class Controller():
	"""docstring for Controller"""

	game_threads_=[]
	observers_ = []

	def __init__(self):
		super(Controller, self).__init__()

	"""game handling functions"""

	def creategame(self):
		self.game_threads_.append({"thread":GameThread(1,13), "gameid":len(self.game_threads_)})
		self.observers_.append({"observ": GameObserver(), "gameid":len(self.game_threads_)-1})
		self.game_threads_[len(self.game_threads_)-1].addObserver(self.observers_[len(self.observers_)-1])
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
			if self.game_threads_[i]['gameid'] == params["gameid"]:			
				if not self.game_threads_[i].is_alive():
					self.game_threads_[len(self.game_threads_)-1].start()
					return {
						"playerid": 0,
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
				if self.game_threads_[i]['gameid'] == params["gameid"]:
					self.game_threads_[i].kill()
					self.game_threads_.pop(i)
					for i in xrange(len(self.observers_)):
						if self.observers_[i]['gameid'] == params["gameid"]:
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
				if self.game_threads_[i]['gameid'] == params["gameid"]:
					self.game_threads_[i].pause()
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
				if self.game_threads_[i]['gameid'] == params["gameid"]:
					self.game_threads_[i].resume()
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
				if self.game_threads_[i]['gameid'] == params["gameid"]:
					self.game_threads_[i].continue()
					return {
						"error": ""
					}
		return {
			"error": "game with given gameid does not exist"
		}


	def getavalmaps(self,params):
		return {
			"error":"function not ready"
		}

	def getgameinfo(self,params):
		if self.game_threads_ == []:
			return {
				"error":"no existing game"

			}
		else:
			for i in xrange(len(self.observers_)):
				if self.observers_[i]['gameid'] == params["gameid"]:
					return {
						'map':self.observers_[i].getMap(),
						"mapWidth":self.observers_[i].getMapSize(),
						"mapHeight":self.observers_[i].getMapSize(),
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
				if self.observers_[i]['gameid'] == params["gameid"]:
					return {
						'map':self.observers_[i].getMap(),
						"tanks":tmp_tanks = self.observers_[i].getTanks(),
						"bullets":self.observers_[i].getBullets(),
						"bonuses": self.observers_[i].getBonuses(),
						"status": self.observers_[i].getStatus(),
						"score": self.observers_[i].getScore(),
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
				if self.observers_[i]['gameid'] == params["gameid"]:
					return {
						"score": self.observers_[i].getScore(),
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
				if self.game_threads_[i]['gameid'] == params["gameid"]:
					self.game_threads_[i].moveTank()
					return {
						"error": ""
					}
		return {
			"error": "game with given gameid does not exist"
		}
			try:
				self.game_threads_[int(params['game_id'])].moveTank(int(params['id']), params['dir'])
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
				"error":"no existing game"

			}
		else:
			for i in xrange(len(self.game_threads_)):
				if self.game_threads_[i]['gameid'] == params["gameid"]:
					self.game_threads_[i].fireBullet()
					return {
						"error": ""
					}
		return {
			"error": "game with given gameid does not exist"
		}
