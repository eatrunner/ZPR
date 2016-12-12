from django.shortcuts import render

import models

# Create your views here.
def getmap(params):
	"""map table of content"""
	map = [[1,2],[3,4]]
	return {
		"size": [2,2],
		"map": map
	}

def getplayer(params):
	"""player tank position"""
	return [1,2]

def getbullet(params):
	"""bullet position with given id"""
	if params['id']<0:
		return "fail"
	
	return {
		"id": params['id'],
		"pos": [1,2]
	}

def getscores():
	"""array of best scores"""
	scores_array = Scores.objects.ordered_by("position")
	return scores_array.values_list()

def getscore(params):
	"""score with given position"""
	if params['pos']<1:
		return "fail"

	scores_array = Scores.objects.filter(position=params['pos'])
	return scores_array.values_list();