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
from MovingMapObject import MovingMapObject


class MovingMapObjectTest(TestCase):

    def testInit(self):
        map = Map(1, 13)
        mmo = MovingMapObject(map, 1, 1)
        self.assertEqual(mmo.currPos, [1, 1])
        self.assertEqual(mmo.prevPos, [1, 1])
        self.assertEqual(map, mmo.map)

    def testCheckCollision(self):
        map = Map(1, 13)
        mmo = MovingMapObject(map, 1, 1)
        self.assertEqual(mmo.checkCollision(), False)
        mmo = MovingMapObject(map, 6, 6)
        self.assertEqual(mmo.checkCollision(), True)

    def testMove(self):
        map = Map(1, 13)
        mmo = MovingMapObject(map, 1, 1)
        self.assertEqual(mmo.getPosition(), [1, 1])
        mmo.move("right")
        self.assertEqual(mmo.getPosition(), [2, 1])

    def testGetPosition(self):
        map = Map(1, 13)
        mmo = MovingMapObject(map, 1, 1)
        self.assertEqual(mmo.getPosition(), [1, 1])

if __name__ == '__main__':
    print ""
    print "Testing MovingMapObject"
    unittest.main()
