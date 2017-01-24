## @file Tank.py
#  @brief A class that represents a tank.

from Map import Map
from Bullet import Bullet


class Tank:
    """A class that represents a tank."""
    CTRLS = [
        "left",
        None,
        "right",
        "up",
        None,
        "down",
    ]

    def __init__(self, id, pos, map):
        """The constructor"""
        self.id = id
        self.currPos = pos
        self.prevPos = pos
        self.map = map

        self.faceDirection = "up"
        self.maxBullets = 1
        self.bullets = []
        self.bonuses = []
        self.moveDir = ""
        self.shootFlag = False

    def move(self, direction):
        """Tries to move the tank in given direction. Returns True if the movement occured, False otherwise.
        Also picks bonuses up."""
        flag = False
        if direction in self.CTRLS:
            if(self.faceDirection != direction):
                flag = True
                self.faceDirection = direction
            d = self.CTRLS.index(direction)
            self.prevPos = self.currPos[:]
            tmpPos = self.currPos[:]
            tmpPos[d > 2] += (d - (1 if d < 3 else 4))

            for tank in self.map.tanks:
                if tank != self and tank.currPos == tmpPos:
                    #self.currPos = self.prevPos
                    return False

            for bonus in self.map.bonuses:
                if bonus.pos == tmpPos:
                    self.addBonus(bonus)
                    self.map.removeBonus(bonus)
                    bonus.upgradeTank(self)
                    bonus.timeToLive = 10

            # Check collisions
            if tmpPos[0] < 0 or tmpPos[0] > (self.map.size - 1) or tmpPos[1] < 0 or tmpPos[1] > (self.map.size - 1) or self.map.matrix[tmpPos[0]][tmpPos[1]] != 'E':
                if flag:
                    return True
                else:
                    return False
            self.currPos = tmpPos[:]
            return True
        return False

    def getPosition(self):
        """Returns a list of two ints representing the (x,y) coordinates"""
        return self.currPos

    def createBullet(self):
        """If it is possible (no collision with terrain or bounds) creates a new bullet and returns it.
        Returns none if the bullet was not created"""
        bulletPos = self.currPos[:]
        d = self.CTRLS.index(self.faceDirection)
        bulletPos[d > 2] += (d - (1 if d < 3 else 4))

        bullet = Bullet(self.map.currentBulletId, self.id, self.map,
                        bulletPos[0], bulletPos[1], self.faceDirection)
        if(bullet.checkCollision() == True):
            return None
        else:
            self.map.currentBulletId += 1
            self.bullets.append(bullet)
            return bullet

    def moveBullet(self, bullet):
        """Moves the given bullet. Returns True if movement occured, False otherwise"""
        if (self.bullets != []):
            for currBullet in self.bullets:
                if(currBullet == bullet):

                    if bullet.move() == False:
                        return False
                    return True
            return False

    def removeBullet(self, bullet):
        """Removes the given bullet"""
        if(self.bullets != []):
            self.bullets.remove(bullet)

    def setMaxBullets(self, maxBullets):
        """Sets the maximum number of bullets the tank can shoot."""
        self.maxBullets = maxBullets

    def getMaxBullets(self):
        """Returns the maximum number of bullets the tank can shoot."""
        return self.maxBullets

    def addBonus(self, bonus):
        """Checks if a tank alrady has a bonus of the same type. If so the duration is refreshed.
        Otherwise the bonus is added."""
        for b in self.bonuses:
            if b.name == bonus.name:
                self.removeBonus(b)
        self.bonuses.append(bonus)

    def removeBonus(self, bonus):
        """Removes given bonus from the tank"""
        self.bonuses.remove(bonus)
