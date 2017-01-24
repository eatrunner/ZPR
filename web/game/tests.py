from unittest import TestCase

# Create your tests here.
import views
from views import Controller
import sys, os
# for tests
sys.path.append(sys.path[0] + '/../../')

class GameViewTestCase(TestCase):
	def setUp(self):
		contr = Controller()

	"""test game functions"""
	def test01getavalmaps(self):
		"""checks if getavalmaps returns proper message"""
		
		contr = Controller()
		msg = contr.getavalmaps({1})
	
		self.assertEqual( msg['error'], "" )

	def test02creategame(self):
		"""checks if creategame returns proper message"""
		
		contr = Controller()

		msg = contr.creategame({'map_id':1})
		self.assertEqual( msg['error'], "" )
		self.assertEqual( msg['game_id'], 0 )

		msg = contr.creategame({'map_id':1})
		self.assertEqual( msg['error'], "" )
		self.assertEqual( msg['game_id'], 1 )

		msg_2 = contr.deletegame({'game_id':1})
		self.assertEqual( msg_2['error'], "" )

		msg_2 = contr.deletegame({'game_id':0})
		self.assertEqual( msg_2['error'], "" )

		msg = contr.creategame({'map_id':-1})
		self.assertEqual( msg['error'], "wrong map_id" )

	def test03startgame(self):
		"""checks if startgame returns proper message"""
		
		contr = Controller()

		msg = contr.creategame({'map_id':1})
		msg_start = contr.startgame({'game_id':msg['game_id']})
		self.assertEqual( msg_start['error'], "" )

		msg_start = contr.startgame({'game_id':msg['game_id']})
		self.assertEqual( msg_start['error'], "game_is_running" )

		contr.deletegame({'game_id':msg['game_id']})

		msg = contr.creategame({'map_id':1})
		msg_start = contr.startgame({'game_id':msg['game_id']+1})
		self.assertEqual( msg_start['error'], "game with given game_id does not exist" )

		contr.deletegame({'game_id':msg['game_id']})

	def test04deletegame(self):
		"""checks if deletegame returns proper message"""
		
		contr = Controller()

		msg = contr.creategame({'map_id':1})
		msg_2 = contr.startgame({'game_id':msg['game_id']})
		self.assertEqual( msg_2['error'], "" )

		msg_2 = contr.deletegame({'game_id':msg['game_id']+1})
		self.assertEqual( msg_2['error'], "game with given game_id does not exist" )

		msg_2 = contr.deletegame({'game_id':msg['game_id']})
		self.assertEqual( msg_2['error'], "" )

	def test05pause_resume_continuegame(self):
		"""checks if pausegame, resumegame and continuegame returns proper message"""
		
		contr = Controller()

		msg = contr.creategame({'map_id':1})
		msg_2 = contr.startgame({'game_id':msg['game_id']})
		self.assertEqual( msg_2['error'], "" )

		msg_2 = contr.pausegame({'game_id':msg['game_id']+1})
		self.assertEqual( msg_2['error'], "game with given game_id does not exist" )

		msg_2 = contr.pausegame({'game_id':msg['game_id']})
		self.assertEqual( msg_2['error'], "" )

		msg_2 = contr.resumegame({'game_id':msg['game_id']+1})
		self.assertEqual( msg_2['error'], "game with given game_id does not exist" )

		msg_2 = contr.resumegame({'game_id':msg['game_id']})
		self.assertEqual( msg_2['error'], "" )

		msg_2 = contr.continuegame({'game_id':msg['game_id']+1})
		self.assertEqual( msg_2['error'], "game with given game_id does not exist" )

		msg_2 = contr.continuegame({'game_id':msg['game_id']})
		self.assertEqual( msg_2['error'], "" )

		msg_2 = contr.deletegame({'game_id':msg['game_id']})
		self.assertEqual( msg_2['error'], "" )

	def test06getgameinfo(self):
		"""checks if getgameinfo returns proper message"""
		
		contr = Controller()

		msg = contr.creategame({'map_id':1})
		msg_2 = contr.startgame({'game_id':msg['game_id']})
		self.assertEqual( msg_2['error'], "" )

		msg_2 = contr.getgameinfo({'game_id':msg['game_id']+1})
		self.assertEqual( msg_2['error'], "game with given game_id does not exist" )

		msg_2 = contr.getgameinfo({'game_id':msg['game_id']})
		self.assertEqual( msg_2['error'], "" )

		msg_2 = contr.deletegame({'game_id':msg['game_id']})
		self.assertEqual( msg_2['error'], "" )

	def test07getstate(self):
		"""checks if getgstate returns proper message"""
		
		contr = Controller()

		msg = contr.creategame({'map_id':1})
		msg_2 = contr.startgame({'game_id':msg['game_id']})
		self.assertEqual( msg_2['error'], "" )

		msg_2 = contr.getstate({'game_id':msg['game_id']+1})
		self.assertEqual( msg_2['error'], "game with given game_id does not exist" )

		msg_2 = contr.getstate({'game_id':msg['game_id']})
		self.assertEqual( msg_2['error'], "" )

		msg_2 = contr.deletegame({'game_id':msg['game_id']})
		self.assertEqual( msg_2['error'], "" )

	def test08getsummary(self):
		"""checks if getgsummary returns proper message"""
		
		contr = Controller()

		msg = contr.creategame({'map_id':1})
		msg_2 = contr.startgame({'game_id':msg['game_id']})
		self.assertEqual( msg_2['error'], "" )

		msg_2 = contr.getsummary({'game_id':msg['game_id']+1})
		self.assertEqual( msg_2['error'], "game with given game_id does not exist" )

		msg_2 = contr.getsummary({'game_id':msg['game_id']})
		self.assertEqual( msg_2['error'], "" )

		msg_2 = contr.deletegame({'game_id':msg['game_id']})
		self.assertEqual( msg_2['error'], "" )

	def test09moveplayer(self):
		"""checks if moveplayer returns proper message and moves tank"""
		
		contr = Controller()

		msg = contr.creategame({'map_id':1})
		msg_2 = contr.startgame({'game_id':msg['game_id']})
		self.assertEqual( msg_2['error'], "" )

		msg_2 = contr.moveplayer({'game_id':msg['game_id']+1, 'dir':'up' })
		self.assertEqual( msg_2['error'], "game with given game_id does not exist" )

		msg_2 = contr.moveplayer({'game_id':msg['game_id'], 'dir':'up'})
		self.assertEqual( msg_2['error'], "" )


		msg_2 = contr.deletegame({'game_id':msg['game_id']})
		self.assertEqual( msg_2['error'], "" )

	def test10playershoot(self):
		"""checks if playershoot returns proper message and moves tank"""
		
		contr = Controller()

		msg = contr.creategame({'map_id':1})
		msg_2 = contr.startgame({'game_id':msg['game_id']})
		self.assertEqual( msg_2['error'], "" )

		msg_2 = contr.playershoot({'game_id':msg['game_id']+1})
		self.assertEqual( msg_2['error'], "game with given game_id does not exist" )

		msg_2 = contr.playershoot({'game_id':msg['game_id']})
		self.assertEqual( msg_2['error'], "" )


		msg_2 = contr.deletegame({'game_id':msg['game_id']})
		self.assertEqual( msg_2['error'], "" )