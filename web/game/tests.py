from unittest import TestCase

# Create your tests here.
import views
from views import Controller

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

	# def test01gettanks(self):
	# 	"""checks if msg is list of 2 elements"""
	# 	contr = Controller()
	# 	msg = contr.gettanks()
	# 	self.assertEqual( len(msg), 2)

	# def test02gettanks(self):
	# 	"""checks if tanks position is vector with 2 elements"""
	# 	contr = Controller()
	# 	msg = contr.gettanks()
	# 	tanks = msg['tanks']
	# 	for x in xrange(len(tanks)):
	# 		self.assertEqual( len(tanks[x]['pos']), 2)

	# def test03gettanks(self):
	# 	"""checks if there are tanks with same id"""
	# 	contr = Controller()
	# 	msg = contr.gettanks()
	# 	tanks = msg['tanks']
	# 	for x in xrange(len(tanks)-1):
	# 		for y in xrange(x+1,len(tanks)):
	# 			self.assertNotEqual(tanks[x]['id'], tanks[y]['id'] )


	# def test01getbullets(self):
	# 	"""checks if msg is list of 2 elements"""
	# 	contr = Controller()
	# 	msg = contr.gettanks()
	# 	self.assertEqual( len(msg), 2)

	# def test02getbullets(self):
	# 	"""checks if tanks position is vector with 2 elements"""
	# 	contr = Controller()
	# 	msg = contr.getbullets()
	# 	bullets = msg['bullets']
	# 	for x in xrange(len(bullets)):
	# 		self.assertEqual( len(bullets[x]['pos']), 2)

	# def test03gettanks(self):
	# 	"""checks if there are tanks with same id"""
	# 	contr = Controller()
	# 	msg = contr.getbullets()
	# 	bullets = msg['bullets']
	# 	for x in xrange(len(bullets)-1):
	# 		for y in xrange(x+1,len(bullets)):
	# 			self.assertNotEqual(bullets[x]['id'], bullets[y]['id'] )

	

	# def test01getmap(self):
	# 	"""checks if getmap returns proper size of matrix"""
	# 	msg = views.getmap({})
	# 	size = msg["size"]
	# 	map = msg["map"]
	# 	self.assertEqual( len(map),size[0] )
	# 	self.assertEqual( len(map[1]),size[1])

	# def test01getplayer(self):
	# 	"""checks if player position is vector with 2 elements"""
	# 	msg = views.getplayertanks({})
	# 	self.assertEqual( len(msg), 2)


	# def test01getbullet(self):
	# 	"""checks if bullet position is vector with 2 elements"""
	# 	msg = views.getbullet({"id":1})
	# 	pos = msg["pos"]
	# 	self.assertEqual(len(pos), 2)

	# def test02getbullet(self):
	# 	"""checks if bullet returns correct id"""
	# 	msg = views.getbullet({"id":1})
	# 	self.assertEqual(msg["id"], 1)
	# 	msg = views.getbullet({"id":2})
	# 	self.assertEqual(msg["id"],2)
	# 	msg = views.getbullet({"id":100})
	# 	self.assertEqual(msg["id"],100)
	# 	msg = views.getbullet({"id":-2})
	# 	self.assertEqual(msg, {'errors':"wrong id"})
	# 	msg = views.getbullet({"id":-100})
	# 	self.assertEqual(msg, {'errors':"wrong id"})
	# 	msg = views.getbullet({"id":0})
	# 	self.assertEqual(msg["id"],0)

	# def test01getscores(self):
	# 	"""checks if there are not two scores with the same position"""
	# 	msg = views.getscores({})
	# 	scores = msg["scores"]
	# 	for x in range(len(scores)):
	# 		for y in range(x,len(scores)):
	# 			self.assertNotEqual(scores[x].position, scores[y].position)

	# def test01getscore(self):
	# 	"""checks if returns proper score"""
	# 	msg = views.getscore({"pos":1})
	# 	score = msg["score"]
	# 	self.assertEqual(len(score), 1)
	# 	self.assertEqual(score["pos"], 1)

	# 	msg = views.getscore({"pos":2})
	# 	score = msg["score"]
	# 	self.assertEqual(len(score), 1)
	# 	self.assertEqual(score["pos"], 2)

	# 	msg = views.getscore({"pos":-1})
	# 	self.assertEqual(msg, "fail")

	# 	msg = views.getscore({"pos":0})
	# 	self.assertEqual(msg, "fail")

	# 	