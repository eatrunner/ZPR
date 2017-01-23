from Game import Game
from Map import Map
from GameObserver import GameObserver
from TestGameObserver import TestGameObserver
from Tank import Tank
from GameThread import GameThread
import time
from WeaponBonus import WeaponBonus
FPS = 1
SEC_PER_FRAME = 1.0 / FPS

i = 0

game = Game(0, 13)
gameO = TestGameObserver()
game.addObserver(gameO)

game.addTank(Tank(1, [0, 0], game))
#game.addTank(Tank(2, [8, 3], game))
tmp = GameThread(0, 13)
bonus = WeaponBonus(999, [5, 3])

game.addBonus(bonus)

print game.getAvalMaps()

lastFrameTime = time.time()

while i < 20:
    i += 1
    currentTime = time.time()
    dt = currentTime - lastFrameTime
    lastFrameTime = currentTime
    print i
    # Action example
    if(i == 3):
        game.moveTank(0, "right")
        game.shoot(0)
        game.moveTank(1, "left")

    if(i == 6):
        game.moveTank(0, "right")
        game.shoot(0)

    if(i == 8):
        game.shoot(0)

    if i == 10:
        game.shoot(0)
        game.shoot(1)

    game.processGame()

    #time.sleep(currentTime + SEC_PER_FRAME - time.time())

game.removeTank(game.playerTank)
game.removeTank(game.getTank(1))
