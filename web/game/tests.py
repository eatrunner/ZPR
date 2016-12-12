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

	def test01getplayer(self):
		"""checks if player position is vector with 2 elements"""
		contr = Controller()
		msg = contr.getplayertanks()
		self.assertEqual( len(msg), 2)


	def test01getbullets(self):
		"""checks if bullet position is vector with 2 elements"""
		contr = Controller()
		msg = contr.getbullets({"id":1})
		pos = msg["pos"]
		self.assertEqual(len(pos), 2)

	def test02getbullets(self):
		"""checks if bullet returns correct id"""
		contr = Controller()
		msg = contr.getbullets({"id":1})
		self.assertEqual(msg["id"], 1)
		msg = contr.getbullets({"id":2})
		self.assertEqual(msg["id"],2)
		msg = contr.getbullets({"id":100})
		self.assertEqual(msg["id"],100)
		msg = contr.getbullets({"id":-2})
		self.assertEqual(msg, {'errors':"wrong id"})
		msg = contr.getbullets({"id":-100})
		self.assertEqual(msg, {'errors':"wrong id"})
		msg = contr.getbullets({"id":0})
		self.assertEqual(msg["id"],0)

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