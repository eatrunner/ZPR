from MapBlock import MapBlock

class Map:
	def __init__(self,id, size):
		self.id = id
		self.matrix = [[MapBlock(0) for j in range(13)] for i in range(13)]
		self.size = size

		#just a map example
		for i in range(4,9):
			self.setMapBlock(i,6,1)

		for i in range(4,9):
			self.setMapBlock(6,i,1)

	def getMatrix(self):
		return self.matrix

	def printMap(self):
		for i in range(13):
			for j in range(13):
				print(self.matrix[i][j].id),
			print("")

	def setMapBlock(self, x, y, id):
		self.matrix[x][y].id = id
