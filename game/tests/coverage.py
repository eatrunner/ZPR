import os

os.system('coverage run MapTest.py')
os.system('coverage run BonusSpawnerTest.py')
os.system('coverage run BonusTest.py')
os.system('coverage run BulletTest.py')
os.system('coverage run EnemySpawnerTest.py')
os.system('coverage run GameTest.py')
os.system('coverage run GameThreadTest.py')
os.system('coverage run MovingMapObjectTest.py')
os.system('coverage run TankTest.py')
os.system('coverage run VestBonusTest.py')
os.system('coverage run WeaponBonusTest.py')
os.system('coverage report')
