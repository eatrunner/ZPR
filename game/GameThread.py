"""@package docstring
A class representing the game's thread.
"""


from Game import Game
from Map import Map
from GameObserver import GameObserver
import threading
import time

FPS = 1
SEC_PER_FRAME = 1.0 / FPS


class GameThread(threading.Thread, Game):
    """A class representing the game's thread"""
    def __init__(self, mapID, mapSize):
        """The constructor"""
        threading.Thread.__init__(self)
        Game.__init__(self, mapID, mapSize)
        self.killFlag = False
        self.pauseFlag = False
        self.init = True

    def kill(self):
        """Method to stop the thread's execution"""
        self.killFlag = True
        self.status = "stop"
        self.notifyGameStatus("stop")

    def pause(self):
        """Pauses the game."""
        self.pauseFlag = True
        self.status = "pause"
        self.notifyGameStatus("pause")

    def continueGame(self):
        """Resumes the game"""
        self.pauseFlag = False
        self.status = "run"
        self.notifyGameStatus("run")

    def run(self):
        """Main game loop"""
        if(self.init == True):
            self.status = "run"
            self.notifyGameStatus("run")
            self.init = False

        while (not self.killFlag):
            if(self.pauseFlag == True or self.status == "stop" or self.status == "win" or self.status == "lose"):
                time.sleep(SEC_PER_FRAME)
                continue
            currentTime = time.time()
            self.processGame()
            time.sleep(currentTime + SEC_PER_FRAME - time.time())
