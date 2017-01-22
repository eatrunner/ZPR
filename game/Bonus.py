class Bonus(object):

    BONUSES = [
        "weapon",
        "vest"
    ]

    def __init__(self, id, pos):
        self.id = id
        self.pos = pos
        self.name = ""
        self.timeToLive = 10

    def upgradeTank():
        raise NotImplementedError()

    def downgradeTank():
        raise NotImplementedError()

    def expire(self):
        self.timeToLive -= 1

    def getTimeToLive(self):
        return self.timeToLive
