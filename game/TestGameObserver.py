from GameObserver import GameObserver

from Tank import Tank
from Bullet import Bullet


class TestGameObserver(GameObserver):
    def __init__(self):
        super(TestGameObserver, self).__init__()

    def updateTankPosition(self, id, pos, dir):
        x, y = pos
        print "Tank no", id, ", position: ", x, " ", y, ", direction: ", dir

    def updateBulletPosition(self, id, pos, dir):
        x, y = pos
        print "Bullet no", id, ", position: ", x, " ", y, ", direction: ", dir

    def addTank(self, id, pos, dir):
        x, y = pos
        print "Added tank ", id, "Position: ", x, y

    def removeTank(self, id):
        print "Removed tank ", id

    def addBullet(self, id, pos, dir):
        x, y = pos
        print "Added bullet ", id, "position ", x, y

    def removeBullet(self, id):
        print "Removed bullet ", id

    def updateMap(self, map):
        print map

    def addBonus(self, id, pos, type):
        x, y = pos
        print "Added bonus ", id, ", position", x, y, type

    def removeBonus(self, id):
        print "Removed bonus ", id

    def updateMapSize(self, new_size):
        print "MapSize: ", new_size

    def updateGameStatus(self, new_status):
        print "GameStatus: ", new_status

    def updateScore(self, new_score):
        print "Score ", new_score

    def updateMapId(self, new_id):
        print "Id: ", new_id