from Game import Game
from Map import Map
from GameObserver import GameObserver
from Tank import Tank
import time
FPS = 1
SEC_PER_FRAME = 1.0/FPS

i=0

game = Game(Map(0,13))
gameO = GameObserver()
game.addObserver(gameO)

game.addTank(Tank(1, game.map.playerPos, game.map))

lastFrameTime = time.time()

while i < 20:
	i += 1
	currentTime = time.time()
	dt = currentTime - lastFrameTime
	lastFrameTime = currentTime
	
	#Action example
	if(i==3):
		game.moveTank(0, "right")

	if(i==6):
		game.shoot(0)
	if(i==9):
		game.shoot(0)
	if i == 10:
		game.shoot(0)
		game.shoot(1)

	game.processGame()

	time.sleep(currentTime + SEC_PER_FRAME - time.time())

game.removeTank(game.playerTank)