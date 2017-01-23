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
        self.moveDir = ""
        self.shootFlag = False

    # Returns False if a collision occured or direction is not proper
    def move(self, direction):
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
        return self.currPos

    def createBullet(self):
        bulletPos = self.currPos[:]
        d = self.CTRLS.index(self.faceDirection)
        bulletPos[d > 2] += (d - (1 if d < 3 else 4))
        bullet = Bullet(self.map.currentBulletId, self.id, self.map,
                        bulletPos[0], bulletPos[1], self.faceDirection)
        self.map.currentBulletId += 1
        print "bullet", bullet.currPos
        print "tank", self.currPos
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
        for b in self.bonuses:
            if b.name == bonus.name:
                self.removeBonus(b)
        self.bonuses.append(bonus)

    def removeBonus(self, bonus):
        self.bonuses.remove(bonus)
