from Bonus import Bonus
from Tank import Tank


class WeaponBonus(Bonus):
    def __init__(self, id, pos):
        super(WeaponBonus,self).__init__(id, pos)
        self.name = "weapon"

    def upgradeTank(self, tank):
        tank.setMaxBullets(2)

    def downgradeTank(self, tank):
        tank.setMaxBullets(1)
