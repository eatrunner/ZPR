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
from GameThread import GameThread

FPS = 1
SEC_PER_FRAME = 1.0 / FPS


class GameThreadTest(TestCase):
    def testInit(self):
        gameT = GameThread(1, 13)
        self.assertEqual(gameT.killFlag, False)
        self.assertEqual(gameT.pauseFlag, False)
        self.assertEqual(gameT.init, True)
        self.assertEqual(gameT.status, "stop")

    def testKill(self):
        gameT = GameThread(1, 13)
        self.assertEqual(gameT.killFlag, False)
        gameT.kill()
        self.assertEqual(gameT.killFlag, True)
        self.assertEqual(gameT.status, "stop")

    def testPause(self):
        gameT = GameThread(1, 13)
        self.assertEqual(gameT.pauseFlag, False)
        gameT.pause()
        self.assertEqual(gameT.pauseFlag, True)
        self.assertEqual(gameT.status, "pause")
        gameT.continueGame()
        self.assertEqual(gameT.pauseFlag, False)
        self.assertEqual(gameT.status, "run")

if __name__ == '__main__':
    print ""
    print "Testing GameThread"
    unittest.main()
