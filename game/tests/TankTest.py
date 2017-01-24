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


class TankTest(TestCase):
    def testMove(self):
        map = Game(1, 13)
        tank = Tank(1, [1, 1], map)
        self.assertEqual(tank.getPosition(), [1, 1])
        tank.move("right")
        self.assertEqual(tank.getPosition(), [2, 1])

    def testCreateBullet(self):
        map = Game(1, 13)
        tank = Tank(1, [1, 1], map)
        self.assertEqual(tank.bullets, [])
        bullet = tank.createBullet()
        self.assertNotEqual(tank.bullets, [])
        tank.removeBullet(bullet)
        self.assertEqual(tank.bullets, [])

    def testMoveBullet(self):
        map = Game(1, 13)
        tank = Tank(1, [1, 2], map)
        bullet = tank.createBullet()
        self.assertEqual(bullet.currPos, [1, 1])
        tank.moveBullet(bullet)
        self.assertEqual(bullet.currPos, [1, 0])

    def testRemoveBullet(self):
        map = Game(1, 13)
        tank = Tank(1, [1, 2], map)
        bullet = tank.createBullet()
        self.assertNotEqual(tank.bullets, [])
        tank.removeBullet(bullet)
        self.assertEqual(tank.bullets, [])

    def testMaxBullets(self):
        map = Game(1, 13)
        tank = Tank(1, [1, 2], map)
        self.assertEqual(tank.getMaxBullets(), 1)
        tank.setMaxBullets(2)
        self.assertEqual(tank.getMaxBullets(), 2)

    def testBonus(self):
        map = Game(1, 13)
        tank = Tank(1, [1, 2], map)
        self.assertEqual(tank.bonuses, [])
        bonus = Bonus(0, [3, 3])
        tank.addBonus(bonus)
        self.assertNotEqual(tank.bonuses, [])
        tank.removeBonus(bonus)
        self.assertEqual(tank.bonuses, [])


if __name__ == '__main__':
    print ""
    print "Testing Tank"
    unittest.main()
