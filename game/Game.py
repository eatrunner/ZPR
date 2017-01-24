"""@package docstring
A class that represents the Game.
"""

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
        """The constructor"""
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

    def getAvalMaps(self):
        """Returns a list of available maps' id numbers."""
        return self.avalMaps

    def getMap(self):
        """Returns a list of characters representing the map."""
        return self.array

    def getMapSize(self):
        """Returns the map size - all maps are square"""
        return self.size

    def notifyTankPosition(self, tank):
        """Notifies all obsevers about tank's position change"""
        for observer in self.observers:
            observer.updateTankPosition(
                tank.id, tank.currPos, tank.faceDirection)

    def notifyBulletPosition(self, bullet):
        """Notifies all obsevers about bullet's position change"""
        for observer in self.observers:
            observer.updateBulletPosition(
                bullet.id, bullet.currPos, bullet.direction)

    def notifyUpdateMap(self):
        """Notifies all obsevers about map's update"""
        for observer in self.observers:
            observer.updateMap(self.array)

    def notifyAddTank(self, tank):
        """Notifies all obsevers about a new tank."""
        for observer in self.observers:
            observer.addTank(tank.id, tank.currPos, tank.faceDirection)

    def notifyRemoveTank(self, tank):
        """Notifies all obsevers about removed tank."""
        for observer in self.observers:
            observer.removeTank(tank.id)

    def notifyAddBullet(self, bullet):
        """Notifies all obsevers about a new bullet"""
        for observer in self.observers:
            observer.addBullet(bullet.id, bullet.currPos, bullet.direction)

    def notifyRemoveBullet(self, bullet):
        """Notifies all obsevers about removed bullet"""
        for observer in self.observers:
            observer.removeBullet(bullet.id)

    def notifyAddBonus(self, bonus):
        """Notifies all obsevers about a new bonus"""
        for observer in self.observers:
            observer.addBonus(bonus.id, bonus.pos, bonus.name)

    def notifyRemoveBonus(self, bonus):
        """Notifies all obsevers about removed bonus"""
        for observer in self.observers:
            observer.removeBonus(bonus.id)

    def notifyGameStatus(self, status):
        """Notifies all obsevers about a change in the game's status."""
        for observer in self.observers:
            observer.updateGameStatus(status)

    def notifyPoints(self):
        """Notifies all obsevers that the player's score has changed"""
        for observer in self.observers:
            observer.updateScore(self.points)

    def notifyMapId(self):
        """Notifies all obsevers that the map's id has changed"""
        for observer in self.observers:
            observer.updateMapId(self.id)

    def getTank(self, id):
        """Returns a tank of a given id. None if it does not exist"""
        for tank in self.tanks:
            if tank.id == id:
                return tank
        return None

    def moveTank(self, id, direction):
        """Marks in which direction the tank will move in the next iteration"""
        for tank in self.tanks:
            if tank.id == id:
                tank.moveDir = direction

    def addTank(self, tank):
        """Adds a tank to self.tanks and notifies observers"""
        self.tanks.append(tank)
        self.notifyAddTank(tank)

    def removeTank(self, tank):
        """Adds a tank from self.tanks and notifies observers"""
        self.notifyRemoveTank(tank)
        self.tanks.remove(tank)

    def addBullet(self, bullet):
        """Adds a bullet to self.bullets and notifies observers"""
        self.bullets.append(bullet)
        self.notifyAddBullet(bullet)

    def removeBullet(self, bullet):
        """Removes a bullet from self.bullets and notifies observers"""
        self.notifyRemoveBullet(bullet)
        self.bullets.remove(bullet)
        tank = self.getTank(bullet.tankId)
        if(tank != None):
            tank.removeBullet(bullet)

    def addBonus(self, bonus):
        """Adds a bonus to the map and notifies observers"""
        self.bonuses.append(bonus)
        self.notifyAddBonus(bonus)

    def removeBonus(self, bonus):
        """Removes a bonus from the map and notifies observers"""
        self.bonuses.remove(bonus)
        self.notifyRemoveBonus(bonus)

    def shoot(self, id):
        """Marks a tank with a given id to shoot in the next iteration."""
        for tank in self.tanks:
            if tank.id == id:
                tank.shootFlag = True

    def getFreeCoords(self):
        """Returns random free coordinates (no terrain, tanks, bullets or bonuses)"""
        while(True):
            x = randint(0, self.size - 1)
            y = randint(0, self.size - 1)
            if self.matrix[x][y] == 'E' and self.getTank([x, y]) == None and self.getBonus(x, y) == None:
                return [x, y]

    def expireBonuses(self):
        """Reduces the timer of all bonuses on the map and held by tanks.
        If the timer is  0 removes the bonus"""
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
        """Adds the observer to observers' list and notifies him of the current state"""
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
        """Ads the ammount of points to player's score"""
        self.points += ammount
        self.notifyPoints()

    def getPoints(self):
        """Returns the number of points collected by the player"""
        return self.points

    def moveBullets(self):
        """Moves all bullets on the map, if a collision occurs, marks the bullet to be removed."""
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
        """Removes all tanks that have been marked for removal"""
        for tank in self.tanksToRemove:
            self.removeTank(tank)
        self.tanksToRemove = []

    def cleanBullets(self):
        """Removes all bullets that have been marked for removal"""
        for bullet in self.bulletsToRemove:
            print "remove bullet", bullet.id, "pos:", bullet.currPos
            self.removeBullet(bullet)
        self.bulletsToRemove = []

    def checkWinConditions(self):
        """Checks if conditions for winning the game have been met, if so sets gameWin flag to True"""
        if self.enemiesToKill == 0:
            self.gameWin = True

    def checkLoseConditions(self):
        """Checks if conditions for losing have been met, if so the method sets gameOverFlag to True"""
        if self.getTank(0) == None:
            self.gameOver = True

    def applyLose(self):
        """Checks wheter the player has lost and if so changes the status of the game and notifies observers"""
        if self.gameOver == True:
            self.status = "lose"
            self.notifyGameStatus("lose")

    def applyWin(self):
        """If the player has won, changes the status of the game, notifies observers cleans the map up
        and loads the next one"""
        if self.gameWin == True:
            self.gameWin = False
            self.status = "win"
            self.notifyGameStatus("win")
            self.cleanup()
            self.loadNextLevel()

    def cleanup(self):
        """When the game has been won, removes everything from the map."""
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
        """Loads the next lexel, creates player and Bonus and Enemy Spawners"""
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
        """Moves enemies"""
        for tank in self.tanks:
            if tank.id != 0:
                self.botMovement.move(tank)

    def processGame(self):
        """Main function will be executed on every game loop"""
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
                    if(bullet != None):
                        self.addBullet(bullet)
                tank.shootFlag = False
