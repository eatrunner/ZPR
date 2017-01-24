## @file BonusSpawner.py
#  @brief A class that represents a bonus spawner.

from Bonus import Bonus
from WeaponBonus import WeaponBonus
from VestBonus import VestBonus
from random import randint


class BonusSpawner():
    """A class that represents a bonus spawner."""
    BONUSES = [
        "weapon",
        "vest"
    ]

    def __init__(self, map, timeToSpawn):
        """The constructor"""
        self.timeToSpawn = timeToSpawn
        self.timer = timeToSpawn
        self.map = map
        self.currBonusId = 0

    def process(self):
        """This method checks wether the number of bonuses on the map has not exceeded
        the maximum number of bonuses allowed. If not it creates a new random one and adds it to the map."""
        if(self.timer == 0):
            if(len(self.map.bonuses) < self.map.maxNoOfBonuses):
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
