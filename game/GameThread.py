from Game import Game
from Map import Map
from GameObserver import GameObserver
import threading
import time

FPS = 1
SEC_PER_FRAME = 1.0 / FPS


class GameThread(threading.Thread, Game):
    def __init__(self, mapID, mapSize):
        threading.Thread.__init__(self)
        Game.__init__(self, mapID, mapSize)
        self.killFlag = False
        self.pauseFlag = False
        self.i = 0

    def kill(self):
        self.killFlag = True

    def pause(self):
        self.pauseFlag = True

    def resume(self):
        self.pauseFlag = False

    def run(self):
        while (not self.killFlag):
            if(self.pauseFlag):
                continue
            currentTime = time.time()
            self.processGame()
            time.sleep(currentTime + SEC_PER_FRAME - time.time())
