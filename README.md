# tank-game

A client-server game written in Python (game engine), Django(game server), HTML5 + AngularJS (client code) and some C++.

It is based on [bioweb library written by Robert Nowak](http://bioweb.sourceforge.net/en/index.html) with some modifications. 
Project is splitted into three modules:
1. **game** - (python) - module that is a tank-game library.
2. **web** - (python/django) - web server
3. **client** - (javascript/angular) - front-end of game

## Installation

Game is working under Linux and Windows. Instructions, how to install dependencies are descripted in file [README_EN](https://github.com/eatrunner/tank-game/blob/master/README_EN).

## Compilation

Once you have installed dependencies, just type in your console to build whole project:
```
scons
```

It will construct python modules and build production version of client interface.

## How to run

Application is running on two local web servers:

1. ExpressJS (default on 127.0.0.1:9001) is configured to serve static client files and redirect ajax queries into backend 
2. Gunicorn is a WSGI to Django (default on 127.0.0.1:9000)

To run servers, just type:
```
scons r=n
``` 
Next, open your webbrowser and type to open client game interface:
```
127.0.0.1:9001
```
WebServer queries are available under path:
```
127.0.0.1:9000/tank-game/ajax/{module}/{function}
```
