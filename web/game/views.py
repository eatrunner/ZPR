## @file game/views.py
#  @brief game server class for client
from django.shortcuts import render
import sys, os
sys.path.append(sys.path[0] + '/../game/')

sys.path.append(sys.path[0] + '/../../game/')

from ServerGameObserver import ServerGameObserver
from GameThread import GameThread


# import models
import thread
						

# Create your views here.

##Controler
#Handles gamethreads and client HTTPrequests
class Controller(object):
	"""docstring for Controller"""
		
	def __init__(self,):
		super(Controller, self).__init__()


	game_threads_=[]
	observers_ = []

	

	"""game handling functions"""

	def creategame(self, params):
		"""creategame function"""
		if params == []:
			return {
				"error":"no map_id"
			}
		aval_maps=self.getavalmaps(0)
		for i in xrange(len(aval_maps['maps'])):
			if int(aval_maps['maps'][i])==int(params['map_id']):
				self.game_threads_.append({"thread":GameThread(int(params['map_id']),13), "game_id":len(self.game_threads_)})
				self.observers_.append({"observ": ServerGameObserver(params['map_id']), "game_id":int(len(self.game_threads_)-1)})
				self.game_threads_[len(self.game_threads_)-1]["thread"].addObserver(self.observers_[len(self.observers_)-1]["observ"])
				return {
					"game_id":len(self.game_threads_)-1,
					"error":""
				}
		return {
			"error":"wrong map_id"
		}


	def startgame(self,params):
		"""startgame function"""
		if self.game_threads_==[]:
			return {
				"error":"none games created"
			}

		for i in xrange(len(self.game_threads_)):
			if int(self.game_threads_[i]['game_id']) == int(params['game_id']):			
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
		"error":"game with given game_id does not exist"
		}
			


	def deletegame(self,params):
		"""deletegame function"""
		if self.game_threads_ == []:
			return {
				"error":"no existing game"

			}
		else:
			for i in xrange(len(self.game_threads_)):
				if int(self.game_threads_[i]['game_id']) == int(params['game_id']):
					self.game_threads_[i]["thread"].kill()
					self.game_threads_.pop(i)
					for i in xrange(len(self.observers_)):
						if int(self.observers_[i]['game_id']) == int(params['game_id']):
							self.observers_.pop(i)
							return {
								"error": ""
							}
			return {
				"error": "game with given game_id does not exist"
			}

	def pausegame(self, params):
		"""pausegame function"""
		if self.game_threads_ == []:
			return {
				"error":"no existing game"

			}
		else:
			for i in xrange(len(self.game_threads_)):
				if int(self.game_threads_[i]['game_id']) == int(params['game_id']):
					self.game_threads_[i]["thread"].pause()
					return {
						"error": ""
					}
			return {
				"error": "game with given game_id does not exist"
			}


	def resumegame(self,params):
		"""resumegame function"""
		if self.game_threads_ == []:
			return {
				"error":"no existing game"

			}
		else:
			for i in xrange(len(self.game_threads_)):
				if int(self.game_threads_[i]['game_id']) == int(params['game_id']):
					self.game_threads_[i]["thread"].continueGame()
					return {
						"error": ""
					}
			return {
				"error": "game with given game_id does not exist"
			}

	def continuegame(self,params):
		"""continuegame function"""
		if self.game_threads_ == []:
			return {
				"error":"no existing game"

			}
		else:
			for i in xrange(len(self.game_threads_)):
				if int(self.game_threads_[i]['game_id']) == int(params['game_id']):
					self.game_threads_[i]["thread"].continueGame()
					return {
						"error": ""
					}
			return {
				"error": "game with given game_id does not exist"
			}


	def getavalmaps(self,params):
		"""getavalmaps function"""
		tmp=GameThread(1,13)
		return {
			"maps":tmp.getAvalMaps(),
			"error":""
		}

		
	def getgameinfo(self,params):
		"""getgameinfo function"""
		if self.game_threads_ == []:
			return {
				"error":"no existing game"

			}
		else:
			for i in xrange(len(self.observers_)):
				if int(self.observers_[i]['game_id']) == int(params['game_id']):	
					return {
						'map':self.observers_[i]["observ"].getMap(),
						"mapWidth":self.observers_[i]["observ"].getMapSize(),
						"mapHeight":self.observers_[i]["observ"].getMapSize(),
						"map_id":self.observers_[i]["observ"].getMapId(),
						"playerid": 0,
						"status": self.observers_[i]["observ"].getStatus(),
						'error':""
					}
			return {
				"error": "game with given game_id does not exist"
			}

	def getstate(self,params):
		"""getstate function"""
		if self.game_threads_ == []:
			return {
				"error":"no existing game"

			}
		else:
			for i in xrange(len(self.observers_)):
				if int(self.observers_[i]['game_id']) == int(params['game_id']):
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
				"error": "game with given game_id does not exist"
			}

	def getsummary(self,params):
		"""getsummary function"""
		if self.game_threads_ == []:
			return {
				"error":"no existing game"

			}
		else:
			for i in xrange(len(self.observers_)):
				if int(self.observers_[i]['game_id']) == int(params['game_id']):
					return {
						"score": self.observers_[i]["observ"].getScore(),
						'error':""
					}
			return {
				"error": "game with given game_id does not exist"
			}
		

	def moveplayer(self,params):
		"""moveplayer function"""
		if self.game_threads_ == []:
			return {
				"error":"no existing game"

			}
		else:
			for i in xrange(len(self.game_threads_)):
				if int(self.game_threads_[i]['game_id']) == int(params['game_id']):
					self.game_threads_[i]["thread"].moveTank(0, params['dir'])
					return {
						"error": ""
					}
		return {
			"error": "game with given game_id does not exist"
		}
			
			

	def playershoot(self,params):
		"""playershoot function"""
		if self.game_threads_ == []:
			return {
				"error":"no existing game"

			}
		else:
			for i in xrange(len(self.game_threads_)):
				if int(self.game_threads_[i]['game_id']) == int(params['game_id']):
					self.game_threads_[i]["thread"].shoot(0)
					return {
						"error": ""
					}
		return {
			"error": "game with given game_id does not exist"
		}
	def gethighscores(self,params):
		"""gethighscores function"""
		f =open("/build_web/game/1.txt", 'r')
		words = f.read().split()
		f.close()
		return {
			'first_name': words[0],
			'first_score':words[1],
			'second_name': words[2],
			'second_score':words[3],
			'third_name': words[4],
			'third_score':words[5],
			'forth_name': words[6],
			'forth_score':words[7],
			'fifth_name': words[8],
			'fifth_score':words[9],
			'error': ""
		}

	def sethighscore(self,params):
		"""sethoghscore function"""
		f =open("/build_web/game/1.txt", 'r')
		words = f.read().split()
		f.close()
		for i in range(len(words)/2):
			if int(words[2*i+1]) <= int(params['score']):
				words.insert(2*int(i), params['name'])
				words.insert(2*int(i)+1, params['score'])
				f =open("/build_web/game/1.txt", 'w')
				for j in range((len(words)-2)/2):
					f.write(words[2*j] + ' ' + words[2*j+1] + '\n')
				f.close

				return {
					"error": ""
				}
		return {
			"error": "too low score for highscores"
		}
					

