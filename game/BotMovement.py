## @file BotMovement.py
#  @brief A class that generates the movement for enemies.

from Tank import Tank
from random import randint
import random


class BotMovement:
    """A class that generates the movement for enemies."""
    DIRECTIONS = ["up", "right", "left", "down"]
    MOVE = [False, False, False, False, True, True]
    SHOOT = [False, False, False, True]

    def __init__(self, mode):
        """The constructor"""
        self.mode = mode

    def move(self, tank):
        """Method generates random movement for the tanks stored in map."""
        moveFlag = random.choice(self.MOVE)
        if(moveFlag == True):
            dir = random.choice(self.DIRECTIONS)
            tank.moveDir = dir
        if(len(tank.bullets) < tank.maxBullets and tank.shootFlag == False):
            shootFlag = random.choice(self.SHOOT)
            if(shootFlag == True):
                tank.shootFlag = True
