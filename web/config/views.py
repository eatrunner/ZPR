## @file web/views.py
#  @brief main server interface to client

"""
main interface to server
"""

import django.http
import json
import traceback

#all modules should be imported here
import version
import version.views

import game
import game.views
from game.views import Controller

contr = Controller()
## for test working server
def index(request):
    """for test working server"""
    return django.http.HttpResponse("MyApp server" )

def ajax(request, module, function):
    """dispatch ajax requests"""
    
    try:
        if getattr(globals()["game"], 'views') ==    getattr(globals()[str(module)], 'views'):
            fun = getattr(globals()["contr"], str(function))
            """if fun == getattr( globals()["contr"], "startgame"):
                data = json.dumps( contr.startgame())
                return django.http.HttpResponse(data, content_type='application/json')"""
            data = json.dumps( fun(request.GET ))
            return django.http.HttpResponse(data, content_type='application/json')
        fun = getattr(getattr(globals()[str(module)], 'views'), str(function))
        data = json.dumps( fun(request.GET ))
        return django.http.HttpResponse(data, content_type='application/json')
    except Exception as e:
        return django.http.HttpResponseNotFound("myapp ajax error: " + str(traceback.format_exc()) )
    except:
        return django.http.HttpResponseNotFound("myapp ajax system error " )
