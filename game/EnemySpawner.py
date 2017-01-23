from Tank import Tank


class EnemySpawner():
    def __init__(self, map, timeToSpawn):
        self.timeToSpawn = timeToSpawn
        self.spawnTimer = 0
        self.map = map
        self.currTankId = 1

    def process(self):
        if(self.spawnTimer == 0):
            if(len(self.map.tanks) < self.map.maxNoOfEnemies + 1):
                tank = Tank(self.currTankId,
                            self.map.getFreeCoords(), self.map)
                self.currTankId += 1
                self.map.addTank(tank)
                self.spawnTimer = self.timeToSpawn
            else:
                return
        else:
            self.spawnTimer -= 1
