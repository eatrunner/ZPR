class MovingMapObject(object):

    CTRLS = [
        "left",
        None,
        "right",
        "up",
        None,
        "down",
    ]

    def __init__(self, map, x, y):
        self.currPos = [x, y]
        self.prevPos = [x, y]
        self.map = map

    # Returns true if a collision occured
    def checkCollision():
        if not((-1 < self.currPos[0] < self.map.size) and (-1 < self.currPos[1] < self.map.size) and self.map.matrix[self.currPos[0]][self.currPos[1]].id == 0):
            return True
        else:
            return False

    def move(self, direction):
        if direction in self.CTRLS:
            d = self.CTRLS.index(direction)
            self.prevPos = self.currPos[:]
            self.currPos[d > 2] += (d - (1 if d < 3 else 4))
            # TODO: change collision detection for MapBlocks
            if not((-1 < self.currPos[0] < self.map.size) and (-1 < self.currPos[1] < self.map.size) and self.map.matrix[self.currPos[0]][self.currPos[1]].id == 0):
                self.currPos = self.prevPos[:]

    def getPosition(self):
        return self.currPos
