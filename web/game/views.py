from django.shortcuts import render

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
	return params['id']

