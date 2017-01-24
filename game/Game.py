from Tank import Tank
from random import randint
from Map import Map
from Bonus import Bonus
from WeaponBonus import WeaponBonus
from BonusSpawner import BonusSpawner
from EnemySpawner import EnemySpawner
from BotMovement import BotMovement


class Game(Map):
    CONTROL = ["left", "right", "up", "down"]
    BONUSES = ["weapon", "vest"]

    def __init__(self, mapId, mapSize):
        super(Game, self).__init__(mapId, mapSize)
        self.status = "stop"
        self.observers = []
        self.playerTank = Tank(0, self.playerPos, self)
        self.tanks.append(self.playerTank)
        self.avalMaps = []
        self.avalMaps.append(1)
        self.avalMaps.append(2)
        self.timeToNextBonus = 5
        self.currentBonusId = 0
        self.bonusSpawner = BonusSpawner(self, self.bonusSpawnTime)
        self.enemySpawner = EnemySpawner(self, self.enemySpawnTime)
        self.bulletsToRemove = []
        self.tanksToRemove = []
        self.points = 0
        self.gameOver = False
        self.gameWin = False
        self.botMovement = BotMovement(1)

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

    def notifyUpdateMap(self):
        for observer in self.observers:
            observer.updateMap(self.array)

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

    def notifyAddBonus(self, bonus):
        for observer in self.observers:
            observer.addBonus(bonus.id, bonus.pos, bonus.name)

    def notifyRemoveBonus(self, bonus):
        for observer in self.observers:
            observer.removeBonus(bonus.id)

    def notifyGameStatus(self, status):
        for observer in self.observers:
            observer.updateGameStatus(status)

    def notifyPoints(self):
        for observer in self.observers:
            observer.updateScore(self.points)

    def notifyMapId(self):
        for observer in self.observers:
            observer.updateMapId(self.id)

    def getTank(self, id):
        for tank in self.tanks:
            if tank.id == id:
                return tank
        return None

    # if possible moves a tank in a direction
    def moveTank(self, id, direction):
        for tank in self.tanks:
            if tank.id == id:
                tank.moveDir = direction

    def addTank(self, tank):
        self.tanks.append(tank)
        self.notifyAddTank(tank)

    def removeTank(self, tank):
        self.notifyRemoveTank(tank)
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

    def addBonus(self, bonus):
        self.bonuses.append(bonus)
        self.notifyAddBonus(bonus)

    def removeBonus(self, bonus):
        self.bonuses.remove(bonus)
        self.notifyRemoveBonus(bonus)

    def shoot(self, id):
        for tank in self.tanks:
            if tank.id == id:
                tank.shootFlag = True

    def getFreeCoords(self):
        while(True):
            x = randint(0, self.size - 1)
            y = randint(0, self.size - 1)
            if self.matrix[x][y] == 'E' and self.getTank([x, y]) == None and self.getBonus(x, y) == None:
                return [x, y]

    def expireBonuses(self):
        for bonus in self.bonuses:
            bonus.expire()
            if bonus.getTimeToLive() == 0:
                self.removeBonus(bonus)
        for tank in self.tanks:
            for bonus in tank.bonuses:
                bonus.expire()
                if bonus.getTimeToLive() == 0:
                    bonus.downgradeTank(tank)
                    tank.removeBonus(bonus)

    def addObserver(self, observer):
        self.observers.append(observer)
        for tank in self.tanks:
            observer.addTank(tank.id, tank.currPos, tank.faceDirection)
            if(tank.bullets != []):
                for bullet in tank.bullets:
                    observer.addBullet(
                        bullet.id, bullet.currPos, bullet.direction)
        observer.updateMap(self.array)
        observer.updateMapSize(self.size)
        observer.updateGameStatus(self.status)
        observer.updateScore(self.points)
        observer.updateMapId(self.id)

    def addPoints(self, ammount):
        self.points += ammount
        self.notifyPoints()

    def moveBullets(self):

        for bullet in self.bullets:
            moveFlag = True
            if(bullet.justCreated == True):
                bullet.justCreated = False
                for tankinner in self.tanks:
                    if tankinner.currPos == bullet.currPos and tankinner.id != bullet.tankId:
                        self.tanksToRemove.append(tankinner)
                        self.bulletsToRemove.append(bullet)
                        if(bullet.tankId == 0):
                            self.addPoints(10)
                            self.enemiesToKill -= 1
                        moveFlag = False
                        break
            if(moveFlag == True):
                i = 0
                while i < 3:
                    if(bullet.move() == True):
                        self.notifyBulletPosition(bullet)
                        i += 1
                    else:
                        self.bulletsToRemove.append(bullet)
                        break

    def cleanTanks(self):
        for tank in self.tanksToRemove:
            self.removeTank(tank)
            self.tanksToRemove.remove(tank)

    def cleanBullets(self):
        for bullet in self.bulletsToRemove:
            print "remove bullet", bullet.id, "pos:", bullet.currPos
            self.removeBullet(bullet)
        self.bulletsToRemove = []

    def checkWinConditions(self):
        if self.enemiesToKill == 0:
            self.gameWin = True

    def checkLoseConditions(self):
        if self.getTank(0) == None:
            self.gameOver = True

    def applyLose(self):
        if self.gameOver == True:
            self.status = "lose"
            self.notifyGameStatus("lose")

    def applyWin(self):
        if self.gameWin == True:
            self.gameWin = False
            self.status = "win"
            self.notifyGameStatus("win")
            self.cleanup()
            self.loadNextLevel()

    def cleanup(self):
        self.tanks.remove(self.playerTank)
        self.notifyRemoveTank(self.playerTank)
        self.playerTank = None
        for bullet in self.bullets:
            self.removeBullet(bullet)

        for tank in self.tanks:
            self.removeTank(tank)

        for bonus in self.bonuses:
            self.removeBonus(bonus)

    def loadNextLevel(self):
        self.loadMap(self.id + 1, 13)
        self.notifyMapId()
        self.notifyUpdateMap()
        self.playerTank = Tank(0, self.playerPos, self)
        self.tanks.append(self.playerTank)
        self.notifyAddTank(self.playerTank)
        self.timeToNextBonus = 5
        self.currentBonusId = 0
        self.bonusSpawner = BonusSpawner(self, self.bonusSpawnTime)
        self.enemySpawner = EnemySpawner(self, self.enemySpawnTime)
        self.bulletsToRemove = []
        self.tanksToRemove = []

    def moveBots(self):
        for tank in self.tanks:
            if tank.id != 0:
                self.botMovement.move(tank)

    def processGame(self):
        self.applyLose()
        self.applyWin()
        self.cleanBullets()
        self.cleanTanks()
        self.checkLoseConditions()
        self.checkWinConditions()
        self.expireBonuses()
        self.moveBots()
        for tank in self.tanks:
            if tank.moveDir != "":
                if (tank.move(tank.moveDir) == True):
                    self.notifyTankPosition(tank)
                tank.moveDir = ""

        self.bonusSpawner.process()
        self.enemySpawner.process()
        self.moveBullets()

        for tank in self.tanks:
            if tank.shootFlag == True:
                if (len(tank.bullets) < tank.maxBullets):
                    bullet = tank.createBullet()
                    self.addBullet(bullet)
                tank.shootFlag = False
