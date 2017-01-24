import sys

sys.path.append(sys.path[0] + '/../')

from Map import Map
from Tank import Tank
from Bonus import Bonus

from unittest import TestCase
import unittest


class MapTest(TestCase):
    def testGetMatrix(self):
        map = Map(1, 13)
        matrix = map.getMatrix()
        self.assertEqual(matrix, [['E', 'E', 'E', 'E'], ['E', 'E', 'E', 'E'], [
                         'E', 'E', 'E', 'E'], ['E', 'E', 'E', 'E']])

    def testGetMapSize(self):
        map = Map(1, 13)
        self.assertEqual(4, map.getMapSize())

    def testGetMapArray(self):
        map = Map(1, 13)
        array = map.getMapArray()
        self.assertEqual(array, ['E', 'E', 'E', 'E', 'E', 'E',
                                 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'])

    def testGetTank(self):
        map = Map(1, 13)
        self.assertEqual(map.getTank(3, 3), None)
        tank = Tank(1, [3, 3], map)
        map.tanks.append(tank)
        self.assertEqual(map.getTank(3, 3), tank)

    def testGetBonus(self):
        map = Map(1, 13)
        self.assertEqual(map.getBonus(3, 3), None)
        bonus = Bonus(1, [3, 3])
        map.bonuses.append(bonus)
        self.assertEqual(map.getBonus(3, 3), bonus)

    def testLoadMap(self):
        map = Map(1, 13)
        self.assertNotEqual(map.getMatrix(), [['E', 'E', 'E', 'E', 'E'], ['E', 'E', 'E', 'E', 'E'], [
                            'E', 'E', 'E', 'E', 'E'], ['E', 'E', 'E', 'E', 'E'], ['E', 'E', 'E', 'E', 'E']])
        map.loadMap(2, 13)
        self.assertEqual(map.getMatrix(), [['E', 'E', 'E', 'E', 'E'], ['E', 'E', 'E', 'E', 'E'], [
                         'E', 'E', 'E', 'E', 'E'], ['E', 'E', 'E', 'E', 'E'], ['E', 'E', 'E', 'E', 'E']])

if __name__ == '__main__':
    print ""
    print "Testing Map"
    unittest.main()
