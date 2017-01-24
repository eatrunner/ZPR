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


class BulletTest(TestCase):
    def testInit(self):
        map = Game(1, 13)
        bullet = Bullet(0, 0, map, 2, 2, "right")
        x, y = bullet.currPos
        self.assertEqual(bullet.map, map)
        self.assertEqual([x, y], [2, 2])
        self.assertEqual(bullet.id, 0)
        self.assertEqual(bullet.tankId, 0)
        self.assertEqual(bullet.direction, "right")
        self.assertEqual(bullet.justCreated, True)

    def testMove(self):
        map = Game(1, 13)
        bullet = Bullet(0, 0, map, 2, 2, "right")
        x, y = bullet.currPos
        self.assertEqual([x, y], [2, 2])
        bullet.move()
        x, y = bullet.currPos
        self.assertEqual([x, y], [3, 2])

if __name__ == '__main__':
    print ""
    print "Testing Bullet"
    unittest.main()
