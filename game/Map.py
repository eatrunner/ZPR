from MapBlock import MapBlock

class Map:
	def __init__(self,id, size):
		self.id = id
		self.matrix = [['E' for j in range(size)] for i in range(size)]
		self.size = size
		self.playerPos = [3,3]
		self.array = ['E' for i in range(size*size)]

		#just a map example
		for i in range(4,9):
			self.setMapBlock(i,6,'B')

		for i in range(4,9):
			self.setMapBlock(6,i,'B')

	def getMatrix(self):
		return self.matrix

	def printMap(self):
		for i in range(self.size):
			for j in range(self.size):
				print(self.matrix[i][j]),
			print("")

	def setMapBlock(self, x, y, id):
		self.matrix[x][y] = id
		self.array[self.size*x + y] = id

	def getMapSize(self):
		return self.size

	def getMapArray(self):
		return self.array

	def printMapArray(self):
		for i in range(self.size * self.size):
				print(self.array[i]),
				