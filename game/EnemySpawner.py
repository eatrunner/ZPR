"""@package docstring
A class that spawns enemies.
"""

from Tank import Tank

class EnemySpawner():
    """A class that spawns enemies."""
    def __init__(self, map, timeToSpawn):
        """The constructor"""
        self.timeToSpawn = timeToSpawn
        self.spawnTimer = 0
        self.map = map
        self.currTankId = 1

    def process(self):
        """Method checks wether the timer to spawn is equal to 0. If not then it decrements the timer.
        Otherwise it checks if the number of enemies has not exceeded the maximum number,
        if not a new enemy is added to the map and the timer resets."""
        if(self.spawnTimer == 0):
            if(len(self.map.tanks) < self.map.maxNoOfEnemies + 1 and len(self.map.tanks) < self.map.enemiesToKill + 1):
                tank = Tank(self.currTankId,
                            self.map.getFreeCoords(), self.map)
                self.currTankId += 1
                self.map.addTank(tank)
                self.map.tanks
                self.spawnTimer = self.timeToSpawn
            else:
                return
        else:
            self.spawnTimer -= 1
