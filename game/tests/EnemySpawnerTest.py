import sys

sys.path.append(sys.path[0] + '/../')

from Map import Map
from Tank import Tank
from Bonus import Bonus
from Game import Game
from Bullet import Bullet
from unittest import TestCase
import unittest

from MovingMapObject import MovingMapObject
from Map import Map
from Tank import Tank
from EnemySpawner import EnemySpawner


class EnemySpawnerTest(TestCase):
    def testInit(self):
        map = Game(1, 13)
        enemyS = EnemySpawner(map, 10)
        self.assertEqual(enemyS.timeToSpawn, 10)
        self.assertEqual(enemyS.spawnTimer, 0)
        self.assertEqual(enemyS.currTankId, 1)

    def testProcess(self):
        map = Game(1, 13)
        enemyS = EnemySpawner(map, 10)
        self.assertEqual(len(enemyS.map.tanks), 1)
        self.assertEqual(enemyS.currTankId, 1)
        self.assertEqual(enemyS.spawnTimer, 0)
        enemyS.process()
        self.assertEqual(len(enemyS.map.tanks), 2)
        self.assertEqual(enemyS.currTankId, 2)
        self.assertEqual(enemyS.spawnTimer, 10)

if __name__ == '__main__':
    print ""
    print "Testing EnemySpawner"
    unittest.main()
