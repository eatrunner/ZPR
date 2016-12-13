from unittest import TestCase

# Create your tests here.
import views
from views import Controller

class GameViewTestCase(TestCase):
	def setUp(self):
		contr = Controller()

	"""test game functions"""
	def test01getmap(self):
		"""checks if getmap returns proper size of matrix"""
		contr = Controller()
		msg = contr.getmap()
		size = msg["size"]
		map = msg["map"]
		self.assertEqual( len(map),size[0] )
		self.assertEqual( len(map[1]),size[1])

	def test01gettanks(self):
		"""checks if msg is list of 2 elements"""
		contr = Controller()
		msg = contr.gettanks()
		self.assertEqual( len(msg), 2)

	def test02gettanks(self):
		"""checks if tanks position is vector with 2 elements"""
		contr = Controller()
		msg = contr.gettanks()
		tanks = msg['tanks']
		for x in xrange(len(tanks)):
			self.assertEqual( len(tanks[x]['pos']), 2)

	def test03gettanks(self):
		"""checks if there are tanks with same id"""
		contr = Controller()
		msg = contr.gettanks()
		tanks = msg['tanks']
		for x in xrange(len(tanks)-1):
			for y in xrange(x+1,len(tanks)):
				self.assertNotEqual(tanks[x]['id'], tanks[y]['id'] )


	def test01getbullets(self):
		"""checks if msg is list of 2 elements"""
		contr = Controller()
		msg = contr.gettanks()
		self.assertEqual( len(msg), 2)

	def test02getbullets(self):
		"""checks if tanks position is vector with 2 elements"""
		contr = Controller()
		msg = contr.getbullets()
		bullets = msg['bullets']
		for x in xrange(len(bullets)):
			self.assertEqual( len(bullets[x]['pos']), 2)

	def test03gettanks(self):
		"""checks if there are tanks with same id"""
		contr = Controller()
		msg = contr.getbullets()
		bullets = msg['bullets']
		for x in xrange(len(bullets)-1):
			for y in xrange(x+1,len(bullets)):
				self.assertNotEqual(bullets[x]['id'], bullets[y]['id'] )

	

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