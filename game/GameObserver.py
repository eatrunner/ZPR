## @file GameObserver.py
#  @brief An abstract class that represents the gameObserver.


from Tank import Tank
from Bullet import Bullet


class GameObserver(object):
    """An abstract class that represents the gameObserver."""

    def updateTankPosition(self, id, pos, dir):
        """Updates the tank's position"""
        raise NotImplementedError()

    def updateBulletPosition(self, id, pos, dir):
        """Updates the bullet's position"""
        raise NotImplementedError()

    def updateMap(self, new_map):
        """Updates the map"""
        raise NotImplementedError()

    def updateMapSize(self, new_size):
        """Updates the map's size"""
        raise NotImplementedError()

    def updateScore(self, new_score):
        """Updates the player's score"""
        raise NotImplementedError()

    def updateGameStatus(self, new_status):
        """Updates the game's status"""
        raise NotImplementedError()

    def addTank(self, tank_id, pos, dir):
        """Adds a tank"""
        raise NotImplementedError()

    def removeTank(self, id):
        """Removes a tank"""
        raise NotImplementedError()

    def addBullet(self, id, pos, dir):
        """Adds a bullet"""
        raise NotImplementedError()

    def removeBullet(self, id):
        """Removes a bullet"""
        raise NotImplementedError()

    def addBonus(self, id, pos, type):
        """Adds a bonus"""
        raise NotImplementedError()

    def removeBonus(self, id):
        """Removes a bonus"""
        raise NotImplementedError()

    def upadteScore(self, new_score):
        """Updates the player's score"""
        raise NotImplementedError()

    def updateMapId(self, new_map_id):
        """Updates the map's id"""
        raise NotImplementedError()