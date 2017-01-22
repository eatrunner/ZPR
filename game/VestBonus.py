from Bonus import Bonus
from Tank import Tank


class VestBonus(Bonus):
    def __init__(self, id, pos):
        super(VestBonus,self).__init__(id, pos)
        self.name = "vest"

    def upgradeTank(self, tank):
        tank.setMaxBullets(2)

    def downgradeTank(self, tank):
        tank.setMaxBullets(1)
