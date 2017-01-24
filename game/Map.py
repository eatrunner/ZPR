from MapBlock import MapBlock
import sys
import os


class Map(object):
    def __init__(self, id, size):
        self.path = "../game/maps/"
        self.loadMap(id, size)

    def getMatrix(self):
        return self.matrix

    def getMapSize(self):
        return self.size

    def getMapArray(self):
        return self.array

    def getTank(self, x, y):
        for tank in self.tanks:
            if tank.currPos == [x, y]:
                return tank
        return None

    def getBonus(self, x, y):
        for bonus in self.bonuses:
            if bonus.pos == [x, y]:
                return bonus
        return None

    def loadMap(self, id, size):
        path = self.path + str(id)
        with open(path) as f:
            p1, p2, p3, p4, p5, p6, p7, p8, p9 = [
                int(x) for x in next(f).split()]
            self.id = p1
            self.size = p2
            self.playerPos = [p3, p4]
            self.bonusSpawnTime = p5
            self.enemySpawnTime = p6
            self.maxNoOfEnemies = p6
            self.maxNoOfBonuses = p7
            self.currentBulletId = p8
            self.enemiesToKill = p9
            self.matrix = [['E' for j in range(self.size)]
                           for i in range(self.size)]
            self.matrix = [[x for x in line.split()] for line in f]

        self.array = ['E' for i in range(self.size * self.size)]
        for i in range(self.size):
            for j in range(self.size):
                self.array[self.size * i + j] = self.matrix[i][j]

        self.bullets = []
        self.tanks = []
        self.bonuses = []
