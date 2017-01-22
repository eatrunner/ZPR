from Bonus import Bonus
from WeaponBonus import WeaponBonus
from VestBonus import VestBonus
from random import randint


class BonusSpawner():
    BONUSES = [
        "weapon",
        "vest"
    ]

    def __init__(self, map, timeToSpawn):
        self.timeToSpawn = timeToSpawn
        self.timer = timeToSpawn
        self.map = map
        self.currBonusId = 0

    def process(self):
        if(self.timer == 0):
            bonus = None
            rand = randint(0, len(self.BONUSES) - 1)
            if(rand == 0):
                bonus = WeaponBonus(self.currBonusId, self.map.getFreeCoords())
            if(rand == 1):
                bonus = VestBonus(self.currBonusId, self.map.getFreeCoords())
            self.currBonusId += 1
            self.timer = self.timeToSpawn
            self.map.addBonus(bonus)
        else:
            self.timer -= 1
