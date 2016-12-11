from unittest import TestCase

# Create your tests here.
import views


class GameViewTestCase(TestCase):

	"""test game functions"""
	def test01getmap(self):
		"""checks if getmap returns proper size of matrix"""
		msg = views.getmap({})
		size = msg["size"]
		map = msg["map"]
		self.assertEqual( len(map),size[0] )
		self.assertEqual( len(map[1]),size[1])

	def test01getplayer(self):
		"""checks if player position is vector with 2 elements"""
		msg = views.getplayer({})
		self.assertEqual( len(msg), 2)


	def test01getbullet(self):
		"""checks if bullet position is vector with 2 elements"""
		msg = views.getbullet({"id":1})
		pos = msg["pos"]
		self.assertEqual(len(pos), 2)

	def test02getbullet(self):
		"""checks if bullet returns correct id"""
		msg = views.getbullet({"id":1})
		self.assertEqual(msg["id"], 1)
		msg = views.getbullet({"id":2})
		self.assertEqual(msg["id"],2)
		msg = views.getbullet({"id":100})
		self.assertEqual(msg["id"],100)
		msg = views.getbullet({"id":-2})
		self.assertEqual(msg["id"],-2)
		msg = views.getbullet({"id":0})
		self.assertEqual(msg["id"],0)