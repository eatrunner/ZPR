## @file MovingMapObject.py
#  @brief A class that represents a moving map object.


class MovingMapObject(object):
    """A class that represents a moving map object"""

    CTRLS = [
        "left",
        None,
        "right",
        "up",
        None,
        "down",
    ]

    def __init__(self, map, x, y):
        """The constructor"""
        self.currPos = [x, y]
        self.prevPos = [x, y]
        self.map = map

    # Returns true if a collision occured
    def checkCollision(self):
        """Checks if object is colliding with terrain or is out of bounds. 
        Returns true if collision occurs, Fasle otherwise"""
        if not((-1 < self.currPos[0] < self.map.size) and (-1 < self.currPos[1] < self.map.size) and self.map.matrix[self.currPos[0]][self.currPos[1]] == 'E'):
            return True
        else:
            return False

    def move(self, direction):
        """Moves the object in a given direcion, if the movement is possible"""
        if direction in self.CTRLS:
            d = self.CTRLS.index(direction)
            self.prevPos = self.currPos[:]
            self.currPos[d > 2] += (d - (1 if d < 3 else 4))
            # TODO: change collision detection for MapBlocks
            if not((-1 < self.currPos[0] < self.map.size) and (-1 < self.currPos[1] < self.map.size) and self.map.matrix[self.currPos[0]][self.currPos[1]] == 'E'):
                self.currPos = self.prevPos[:]

    def getPosition(self):
        """Returns a list of two ints representing position of the object"""
        return self.currPos
