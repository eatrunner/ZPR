## @file WeaponBonus.py
#  @brief A class representing a vest bonus.

from Bonus import Bonus
from Tank import Tank


class WeaponBonus(Bonus):
    """A class representing a vest bonus. Inherits from Bonus."""

    def __init__(self, id, pos):
        super(WeaponBonus, self).__init__(id, pos)
        self.name = "weapon"

    def upgradeTank(self, tank):
        """Changes the maximum number of bullets a tank can shoot to 2"""
        tank.setMaxBullets(2)

    def downgradeTank(self, tank):
        """Changes the maximum number of bullets a tank can shoot to 1"""
        tank.setMaxBullets(1)
