from MovingMapObject import MovingMapObject
from Map import Map


class Bullet(MovingMapObject):
    def __init__(self, id, tankId, map, x, y, direction):
        super(Bullet, self).__init__(map, x, y)
        self.id = id
        self.tankId = tankId
        self.direction = direction

    # returns False if a collision occured
    def move(self):
        if self.direction in self.CTRLS:
            d = self.CTRLS.index(self.direction)
            self.prevPos = self.currPos[:]
            self.currPos[d > 2] += (d - (1 if d < 3 else 4))

            for tank in self.map.tanks:
                if tank.currPos == self.currPos:
                    self.map.removeTank(tank)
                    return False

            for bullet in self.map.bullets:
                if ((bullet.currPos == self.currPos) and (bullet.id != self.id)):
                    self.map.removeBullet(bullet)
                    return False

            # TODO: change collision detection for MapBlocks
            if not((-1 < self.currPos[0] < self.map.size) and (-1 < self.currPos[1] < self.map.size) and self.map.matrix[self.currPos[0]][self.currPos[1]] == 'E'):
                self.currPos = self.prevPos[:]
                return False
        return True
