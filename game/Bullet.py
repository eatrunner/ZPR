## @file Bullet.py
#  @brief A class that represents a bullet.


from MovingMapObject import MovingMapObject
from Map import Map


class Bullet(MovingMapObject):
    """A class that represents a bullet."""
    def __init__(self, id, tankId, map, x, y, direction):
        """The constructor"""
        super(Bullet, self).__init__(map, x, y)
        self.id = id
        self.tankId = tankId
        self.direction = direction
        self.justCreated = True

    # returns False if a collision occured
    def move(self):
        """Tries to move in the direction the bullet is facing. If there is no collision
        the movement occurs and method returns True. If it collides the bullet is marked to be removed
        and the method returns False. If it collided with a tank, the tank is also marked to be removed"""
        if self.direction in self.CTRLS:
            d = self.CTRLS.index(self.direction)
            self.prevPos = self.currPos[:]
            self.currPos[d > 2] += (d - (1 if d < 3 else 4))

            for tank in self.map.tanks:
                if tank.currPos == self.currPos and tank.id != self.tankId:
                    self.map.tanksToRemove.append(tank)
                    if(self.tankId == 0):
                        self.map.addPoints(10)
                        self.map.enemiesToKill -= 1
                    return False

            # TODO: change collision detection for MapBlocks
            if not((-1 < self.currPos[0] < self.map.size) and (-1 < self.currPos[1] < self.map.size) and self.map.matrix[self.currPos[0]][self.currPos[1]] == 'E'):
                self.currPos = self.prevPos[:]
                return False
        return True
