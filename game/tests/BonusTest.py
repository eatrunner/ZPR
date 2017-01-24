import sys

sys.path.append(sys.path[0] + '/../')

from Map import Map
from Tank import Tank
from Bonus import Bonus
from Game import Game

from unittest import TestCase
import unittest


class BonusTest(TestCase):

    def testInit(self):
        bonus = Bonus(0, [2, 3])
        self.assertEqual(bonus.id, 0)
        self.assertEqual(bonus.pos, [2, 3])

    def testExpire(self):
        bonus = Bonus(0, [2, 3])
        self.assertEqual(bonus.timeToLive, 10)
        bonus.expire()
        self.assertEqual(bonus.timeToLive, 9)

    def testGetTimeToLive(self):
        bonus = Bonus(0, [2, 3])
        self.assertEqual(bonus.getTimeToLive(), 10)

if __name__ == '__main__':
    print ""
    print "Testing Bonus"
    unittest.main()
