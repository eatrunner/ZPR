from Tank import Tank
from random import randint
from Map import Map


class Game(Map):
    CONTROL = ["left", "right", "up", "down"]

    def __init__(self, mapId, mapSize):
        super(Game, self).__init__(mapId, mapSize)
        self.observers = []
        #self.tanks = []
        #self.input = 0
        #self.map = map
        self.playerTank = Tank(0, self.playerPos, self)
        self.tanks.append(self.playerTank)
        #self.map.addTank(self.playerTank)
        self.avalMaps = []
        self.avalMaps.append(1)

    # Returns a list of available maps' id numbers
    def getAvalMaps(self):
        return self.avalMaps

    def getMap(self):
        return self.array

    # Returns the map size - all maps are square
    def getMapSize(self):
        return self.size

    # Notifies all obsevers about tank's position change
    def notifyTankPosition(self, tank):
        for observer in self.observers:
            observer.updateTankPosition(
                tank.id, tank.currPos, tank.faceDirection)

    def notifyBulletPosition(self, bullet):
        for observer in self.observers:
            observer.updateBulletPosition(
                bullet.id, bullet.currPos, bullet.direction)

    def notifyAddTank(self, tank):
        for observer in self.observers:
            observer.addTank(tank.id, tank.currPos, tank.faceDirection)

    def notifyRemoveTank(self, tank):
        for observer in self.observers:
            observer.removeTank(tank.id)

    def notifyAddBullet(self, bullet):
        for observer in self.observers:
            observer.addBullet(bullet.id, bullet.currPos, bullet.direction)

    def notifyRemoveBullet(self, bullet):
        for observer in self.observers:
            observer.removeBullet(bullet.id)

    def getTank(self,id):
        for tank in self.tanks:
            if tank.id == id:
                return tank
        return None

    # if possible moves a tank in a direction
    def moveTank(self, id, direction):
        for tank in self.tanks:
            if tank.id == id:
                if (tank.move(direction)):
                    self.notifyTankPosition(tank)

    def addTank(self, tank):
        self.tanks.append(tank)
        # self.map.addTank(tank)
        self.notifyAddTank(tank)

    def removeTank(self, tank):
        self.notifyRemoveTank(tank)
        #.tanks.remove(tank)
        self.tanks.remove(tank)

    def addBullet(self, bullet):
        self.bullets.append(bullet)
        self.notifyAddBullet(bullet)

    def removeBullet(self, bullet):
        self.notifyRemoveBullet(bullet)
        self.bullets.remove(bullet)
        tank = self.getTank(bullet.tankId)
        if(tank != None):
            tank.removeBullet(bullet)

    def shoot(self, id):
        for tank in self.tanks:
            if tank.id == id:
                if (len(tank.bullets) < tank.maxBullets):
                    bullet = tank.createBullet()
                    self.addBullet(bullet)

    def addObserver(self, observer):
        self.observers.append(observer)
        for tank in self.tanks:
            observer.addTank(tank.id, tank.currPos, tank.faceDirection)
            if(tank.bullets != []):
                for bullet in tank.bullets:
                    observer.addBullet(
                        bullet.id, bullet.currPos, bullet.direction)
        observer.updateMap(self.array)

    def processGame(self):
        for tank in self.tanks:
            if (tank.bullets != []):
                bulletsToRemove = []
                for bullet in tank.bullets:
                    if(tank.moveBullet(bullet) == True):
                        self.notifyBulletPosition(bullet)
                    else:
                        bulletsToRemove.append(bullet)
                for bullet in bulletsToRemove:
                    self.removeBullet(bullet)
                    
