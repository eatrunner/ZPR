from Tank import Tank
from random import randint
import random


class BotMovement:

    DIRECTIONS = ["up", "right", "left", "down"]
    MOVE = [False, False, False, False, True, True]
    SHOOT = [False, False, False, True]

    def __init__(self, mode):
        self.mode = mode

    def move(self, tank):
        moveFlag = random.choice(self.MOVE)
        if(moveFlag == True):
            dir = random.choice(self.DIRECTIONS)
            tank.moveDir = dir
        if(len(tank.bullets) < tank.maxBullets and tank.shootFlag == False):
            shootFlag = random.choice(self.SHOOT)
            if(shootFlag == True):
                tank.shootFlag = True
