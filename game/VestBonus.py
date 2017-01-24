## @file VestBonus.py
#  @brief A class representing a vest bonus.

from Bonus import Bonus
from Tank import Tank


class VestBonus(Bonus):
    """A class representing a vest bonus. Inherits from Bonus."""

    def __init__(self, id, pos):
        """The constructor"""
        super(VestBonus, self).__init__(id, pos)
        self.name = "vest"

    def upgradeTank(self, tank):
        """Changes the maximum number of bullets a tank can shoot to 2"""
        tank.setMaxBullets(2)

    def downgradeTank(self, tank):
        """Changes the maximum number of bullets a tank can shoot to 1"""
        tank.setMaxBullets(1)
