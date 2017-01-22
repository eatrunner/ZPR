from Map import Map
from Bullet import Bullet


class Tank:

    CTRLS = [
        "left",
        None,
        "right",
        "up",
        None,
        "down",
    ]

    def __init__(self, id, pos, map):
        self.id = id
        self.currPos = pos
        self.prevPos = pos
        self.map = map

        self.faceDirection = "up"
        self.maxBullets = 1
        self.bullets = []
        self.bonuses = []

    # Returns False if a collision occured or direction is not proper
    def move(self, direction):
        flag = False
        if direction in self.CTRLS:
            if(self.faceDirection != direction):
                flag = True
                self.faceDirection = direction
            d = self.CTRLS.index(direction)
            self.prevPos = self.currPos[:]
            self.currPos[d > 2] += (d - (1 if d < 3 else 4))

            for tank in self.map.tanks:
                if tank != self and tank.currPos == self.currPos:
                    return False

            for bonus in self.map.bonuses:
                if bonus.pos == self.currPos:
                    self.addBonus(bonus)
                    self.map.removeBonus(bonus)
                    bonus.upgradeTank(self)
                    bonus.timeToLive = 10

            # Check collisions
            if not((-1 < self.currPos[0] < self.map.size) and (-1 < self.currPos[1] < self.map.size) and self.map.matrix[self.currPos[0]][self.currPos[1]] == 'E'):
                self.currPos = self.prevPos[:]
                if flag:
                    return True
                else:
                    return False
            return True
        return False

    def getPosition(self):
        return self.currPos

    def createBullet(self):
        bullet = Bullet(self.id * 2 + len(self.bullets), self.id, self.map,
                        self.currPos[0], self.currPos[1], self.faceDirection)
        self.bullets.append(bullet)
        return bullet

    def moveBullet(self, bullet):
        if (self.bullets != []):
            for currBullet in self.bullets:
                if(currBullet == bullet):

                    if bullet.move() == False:
                        return False
                    return True
            return False

    def removeBullet(self, bullet):
        if(self.bullets != []):
            self.bullets.remove(bullet)

    def setMaxBullets(self, maxBullets):
        self.maxBullets = maxBullets

    def getMaxBullets(self):
        return self.maxBullets

    def addBonus(self, bonus):
        self.bonuses.append(bonus)

    def removeBonus(self, bonus):
        self.bonuses.remove(bonus)
