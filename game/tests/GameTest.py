import sys

sys.path.append(sys.path[0] + '/../')

from unittest import TestCase
import unittest


from Tank import Tank
from random import randint
from Map import Map
from Bonus import Bonus
from WeaponBonus import WeaponBonus
from BonusSpawner import BonusSpawner
from EnemySpawner import EnemySpawner
from BotMovement import BotMovement
from Game import Game


class GameTest(TestCase):
    def testGetAvalMaps(self):
        game = Game(1, 13)
        self.assertEqual(game.getAvalMaps(), [1, 2])

    def testGetMap(self):
        game = Game(1, 13)
        self.assertEqual(game.getMap(), ['E', 'E', 'E', 'E', 'E', 'E',
                                         'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'])

    def testGetMapSize(self):
        game = Game(1, 13)
        self.assertEqual(game.getMapSize(), 4)

    def testGetTank(self):
        game = Game(1, 13)
        tank = Tank(1, [2, 2], game)
        self.assertNotEqual(game.tanks, [])
        game.removeTank(game.getTank(0))
        self.assertEqual(game.tanks, [])
        game.addTank(tank)
        self.assertNotEqual(game.tanks, [])
        self.assertEqual(game.getTank(tank.id), tank)
        game.removeTank(tank)
        self.assertEqual(game.tanks, [])

    def testMoveTank(self):
        game = Game(1, 13)
        tank = Tank(1, [2, 2], game)
        game.addTank(tank)
        self.assertEqual(tank.moveDir, "")
        game.moveTank(1, "left")
        self.assertEqual(tank.moveDir, "left")

    def testAddBullet(self):
        game = Game(1, 13)
        tank = Tank(1, [2, 2], game)
        game.addTank(tank)
        self.assertEqual(tank.bullets, [])
        bullet = tank.createBullet()
        self.assertNotEqual(tank.bullets, [])
        self.assertEqual(game.bullets, [])
        game.addBullet(bullet)
        self.assertNotEqual(game.bullets, [])
        game.removeBullet(bullet)
        self.assertEqual(game.bullets, [])
        self.assertEqual(tank.bullets, [])

    def testBonus(self):
        game = Game(1, 13)
        bonus = Bonus(0, [2,2])
        self.assertEqual(game.bonuses, [])
        game.addBonus(bonus)
        self.assertNotEqual(game.bonuses, [])
        self.assertEqual(bonus.getTimeToLive(), 10)
        game.expireBonuses()
        self.assertEqual(bonus.getTimeToLive(), 9)
        game.removeBonus(bonus)
        self.assertEqual(game.bonuses, [])

    def testShoot(self):
        game = Game(1, 13)
        tank = Tank(1, [2, 2], game)
        game.addTank(tank)
        self.assertEqual(tank.shootFlag, False)
        game.shoot(1)
        self.assertEqual(tank.shootFlag, True)

    def testPoints(self):
        game = Game(1, 13)
        self.assertEqual(game.getPoints(), 0)
        game.addPoints(10)
        self.assertEqual(game.getPoints(), 10)

if __name__ == '__main__':
    print ""
    print "Testing Game"
    unittest.main()
