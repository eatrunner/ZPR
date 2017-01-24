import sys

sys.path.append(sys.path[0] + '/../')

from Map import Map
from Tank import Tank
from Bonus import Bonus
from Game import Game

from unittest import TestCase
import unittest

from Bonus import Bonus
from WeaponBonus import WeaponBonus
from VestBonus import VestBonus
from random import randint
from BonusSpawner import BonusSpawner


class BonusSpawnerTest(TestCase):

    def testInit(self):
        map = Map(1, 13)
        bonusSpawner = BonusSpawner(map, 5)
        self.assertEqual(bonusSpawner.timeToSpawn, 5)
        self.assertEqual(bonusSpawner.map, map)
        self.assertEqual(["weapon", "vest"], bonusSpawner.BONUSES)

    def testProcess(self):
        map = Game(1, 13)
        bonusS = BonusSpawner(map, 5)
        i = 0
        while i < 5:
            self.assertEqual(bonusS.timer, 5 - i)
            self.assertEqual(map.bonuses, [])
            bonusS.process()
            i += 1
        bonusS.process()
        self.assertNotEqual(map.bonuses, [])


if __name__ == '__main__':
    print ""
    print "Testing BonusSpawner"
    unittest.main()
