"""@package docstring
A class that represents a bonus.
"""

class Bonus(object):
    """A class that represents a bonus."""

    BONUSES = [
        "weapon",
        "vest"
    ]

    def __init__(self, id, pos):
        """The constructor"""
        self.id = id
        self.pos = pos
        self.name = ""
        self.timeToLive = 10

    def upgradeTank(self):
        """Abstract method that influences the tanks parameters,
        when the bonus is picked up."""
        raise NotImplementedError()

    def downgradeTank(self):
        """Abstract method that influences the tanks parameters,
        when the bonus expires"""
        raise NotImplementedError()

    def expire(self):
        """Decrements the timer, when it reaches 0 the bonus will be removed"""
        self.timeToLive -= 1

    def getTimeToLive(self):
        """Returns the current timer's value."""
        return self.timeToLive
