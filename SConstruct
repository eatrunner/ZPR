# -*- mode: Python; -*-
import os, platform, subprocess, re, time, ConfigParser, shutil, sys, signal, fileinput

MYAPP_VER_MAJOR = '0'
MYAPP_VER_MINOR = '08'
MYAPP_VER_COMPILATION = '0'
MYAPP_VER_INSTALL = '1'

#odczytuje wersje kompilacji z wersji repozytorium
# TODO

MYAPP_VER_STRING = str(MYAPP_VER_MAJOR) + '.' + str(MYAPP_VER_MINOR) + '.' + MYAPP_VER_COMPILATION

#web
WWW_BROWSER_WINDOWS='chrome'
WWW_BROWSER_LINUX='firefox'
WEB_SRV_PREFIX = 'tank-game'
WEB_SRV_HOST = '127.0.0.1'
WEB_SRV_PORT = '9000'
WEB_CLIENT_HOST = '127.0.0.1'
WEB_CLIENT_PORT = '9001'



Export('MYAPP_VER_MAJOR MYAPP_VER_MINOR MYAPP_VER_COMPILATION MYAPP_VER_INSTALL')
Export('WWW_BROWSER_WINDOWS WWW_BROWSER_LINUX')
Export('WEB_SRV_PREFIX WEB_SRV_HOST WEB_SRV_PORT WEB_CLIENT_HOST WEB_CLIENT_PORT')


vars = Variables('custom.py')

rVariableCaption = """Run the application.\n
    n: local Node ExpressJS server at {clientHost}:{clientPort} + GUnicorn at {srvHost}:{srvPort}\n
    d: only GUnicorn at {srvHost}:{srvPort}""".format(clientHost=WEB_CLIENT_HOST, clientPort=WEB_CLIENT_PORT, srvHost=WEB_SRV_HOST, srvPort=WEB_SRV_PORT)
vars.Add(EnumVariable('r', rVariableCaption, 'no', allowed_values = ('n', 'd', 'no'), map={}, ignorecase=2))

tVariableCaption = 'Run the unit tests, \'w\' Python web, \'j\' Javascript client, \'c\' C++ library'
vars.Add(EnumVariable('t',tVariableCaption, 'no', allowed_values = ('w', 'j', 'c', 'no'), map={}, ignorecase=2) )

sVariableCaption = 'Do sconscript\'s for each module individually, w: web sconscript, c: client sconscript'
vars.Add(EnumVariable('s', sVariableCaption, 'no', allowed_values = ('w', 'c', 'no'), map={}, ignorecase=2))

vars.Add(BoolVariable('cov','Set to 1 to run the coverage reports for python server',0) )
vars.Add(BoolVariable('zip','Set to 1 to build zip package',0) )
vars.Add(BoolVariable('doxygen', 'Set 1 to generate documentation. The file Doxyfile_in is required',0) )
additional_help_text = ""

env = Environment(variables=vars)

Help("""
type 'scons' to build the program and libraries. Settings specific for this project are listed below.
"""
     +
     vars.GenerateHelpText(env)
     +
     additional_help_text)

if (platform.system() == "Linux"):
    WWW_BROWSER = WWW_BROWSER_LINUX
    BROWSER_CMD = WWW_BROWSER_LINUX + ' http://' + WEB_SRV_HOST + ':' + WEB_SRV_PORT + ' &'
else:
    WWW_BROWSER = WWW_BROWSER_WINDOWS
    BROWSER_CMD = 'start "" ' + WWW_BROWSER_WINDOWS + ' http://' + WEB_SRV_HOST + ':' + WEB_SRV_PORT


def addToLD(path):
    if "LD_LIBRARY_PATH" in os.environ:
        os.environ["LD_LIBRARY_PATH"]= os.environ["LD_LIBRARY_PATH"] + ':' + os.path.abspath(path)
    else:
        os.environ["LD_LIBRARY_PATH"]= os.path.abspath(path)

if env['r'] == 'n':
    os.system('USE_PROXY=true SRV_HOST={srvHost} SRV_PORT={srvPort} CLIENT_HOST={clientHost} CLIENT_PORT={clientPort} node client/server.js'.format(srvHost=WEB_SRV_HOST, srvPort=WEB_SRV_PORT, clientHost=WEB_CLIENT_HOST, clientPort=WEB_CLIENT_PORT))

    if platform.system() == "Linux":
        os.system('gunicorn --chdir build_web --timeout 0 --workers 1 --bind \'{addr}:{port}\' wsgi:application'.format(addr=WEB_SRV_HOST, port=WEB_SRV_PORT))
    elif platform.system() == "Windows":
        os.system('python build_web/manage.py runfcgi daemonize=false method=threaded host=' + WEB_SRV_HOST + ' port=' + WEB_SRV_PORT)

elif env['r'] == 'd':
    os.system(BROWSER_CMD)
    os.system('python build_web/manage.py runserver ' + WEB_SRV_HOST + ':' + WEB_SRV_PORT)

elif env['s'] == 'w':
    SConscript('web/SConscript', exports=['env'] )

elif env['s'] == 'c':
    SConscript('client/SConscript', exports=['env'] )

elif env['t'] == 'w':
    if(platform.system() == "Linux"):
        os.system('python build_web/manage.py test version current')
    elif(platform.system() == "Windows"):
        os.system('python build_web\manage.py test version current')

elif env['t'] == 'j':
    child_process = subprocess.Popen('python client/tests/srv.py ', shell=True, stdout=subprocess.PIPE)
    if(platform.system() == "Linux"):
        os.system( WWW_BROWSER + ' ' + os.getcwd() + '/client/unit_test_out.html --disable-web-security')
        os.system("kill " + str(child_process.pid))
    else:
        os.system( 'start "" ' + WWW_BROWSER + ' ' + os.getcwd() + '/client/unit_test_out.html --disable-web-security')
        os.system('taskkill /F /T /PID %d' % child_process.pid)

elif env['cov'] == 1:
    if(platform.system() == "Linux"):
        os.system("coverage run --source build_web/ build_web/manage.py test version current")
        print("\n")
        os.system("coverage report -m")
        print("\n")

elif env['zip'] == 1:
    dir_name = os.path.split(os.getcwd())[-1]
    package_name = 'bioweb_' + MYAPP_VER_STRING + '_' + MYAPP_VER_INSTALL + '_' + str(dir_name)
    os.system('zip ' + package_name + '.zip * -r -x client/bower_components/\*')

elif env['doxygen'] == 1:
    f = open('Doxyfile_in', "r")
    w = open('Doxyfile', "w")
    for line in f:
        m = re.match(r'^PROJECT_NUMBER.*$', line)
        if m:
            w.write('PROJECT_NUMBER = ' + MYAPP_VER_STRING + '\n')
        else:
            w.write(line)
    os.system('doxygen')
    env.SideEffect('Doxygen', 'Doxygen_in')

else: #build app
    SConscript(['web/SConscript', 'client/SConscript'], exports=['env'] )

env.Clean('.','../doc/doxygen')
env.Clean('.','Doxyfile')
