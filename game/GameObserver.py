from Tank import Tank
from Bullet import Bullet


class GameObserver(object):

    def updateTankPosition(self, id, pos, dir):
        raise NotImplementedError()

    def updateBulletPosition(self, id, pos, dir):
        raise NotImplementedError()

    def updateMap(self, new_map):
        raise NotImplementedError()

    def updateMapSize(self, new_size):
        raise NotImplementedError()

    def updateScore(self, new_score):
        raise NotImplementedError()

    def updateGameStatus(self, new_status):
        raise NotImplementedError()

    def addTank(self, tank_id, pos, dir):
        raise NotImplementedError()

    def removeTank(self, id):
        raise NotImplementedError()

    def addBullet(self, id, pos, dir):
        raise NotImplementedError()

    def removeBullet(self, id):
        raise NotImplementedError()

    def addBonus(self, id, pos, type):
        raise NotImplementedError()

    def removeBonus(self, id):
        raise NotImplementedError()

    def upadteScore(self, new_score):
        raise NotImplementedError()

    def updateMapId(self, new_map_id):
        raise NotImplementedError()