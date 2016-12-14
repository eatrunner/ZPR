from django.db import models

# Create your models here.
class HighScore(models.Model):
	"""Contains information about score"""
	nick = models.CharField(max_length = 20)
	points = models.IntegerField()
	position = models.IntegerField()

	def getNick():
		return self.nick

	def getPoints():
		return self.points

	def getPosition():
		return self.position