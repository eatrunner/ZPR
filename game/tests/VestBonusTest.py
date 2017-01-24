import sys

sys.path.append(sys.path[0] + '/../')

from Tank import Tank
from Game import Game
from unittest import TestCase
import unittest

from MovingMapObject import MovingMapObject
from Map import Map
from Bullet import Bullet
from Bonus import Bonus
from VestBonus import VestBonus


class VestBonusTest(TestCase):
    def testInit(self):
        vestBonus = VestBonus(0, [2, 2])
        self.assertEqual(vestBonus.id, 0)
        self.assertEqual(vestBonus.pos, [2, 2])
        self.assertEqual(vestBonus.name, "vest")

    def testUpgradeTank(self):
        map = Game(1, 13)
        tank = Tank(1, [2, 3], map)
        bonus = VestBonus(0, [2, 2])
        self.assertEqual(tank.getMaxBullets(), 1)
        bonus.upgradeTank(tank)
        self.assertEqual(tank.getMaxBullets(), 2)
        bonus.downgradeTank(tank)
        self.assertEqual(tank.getMaxBullets(), 1)


if __name__ == '__main__':
    print ""
    print "Testing VestBonus"
    unittest.main()
