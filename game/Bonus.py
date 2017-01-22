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

    def upgradeTankParameters():
        raise NotImplementedError()

    def degradeTankParameters():
        raise NotImplementedError()
