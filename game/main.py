from Game import Game
from Map import Map
from GameObserver import GameObserver
import time
FPS = 1
SEC_PER_FRAME = 1.0/FPS

i=0

game = Game(Map(0,13))
gameO = GameObserver()
game.addObserver(gameO)

lastFrameTime = time.time()

while i < 15:
	i += 1
	currentTime = time.time()
	dt = currentTime - lastFrameTime
	lastFrameTime = currentTime
	
	#Action example
	if(i==3):
		game.moveTank(game.playerTank, "right")

	if(i==6):
		game.fireBullet(game.playerTank)

	game.processGame()

	time.sleep(currentTime + SEC_PER_FRAME - time.time())

game.removeTank(game.playerTank)