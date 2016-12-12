## @file version/models.py
#  @brief server version model

"""
version state module. Return database version, database connecting strings and application build version
"""

import version_gen

def getWebSrvPrefix():
    return str(version_gen.web_srv_prefix)

def getVersionString():
    """version string, for displaying in client"""
    return str(version_gen.major) + "." + str(version_gen.minor) + "." + str(version_gen.compilation)

def _versionFromRow(row):
    """helping function - parse row to return the correct version"""
    ver = 'unknown'
    try:
        ver = str(row[0].split(',')[0])
    except:
        pass
    return ver
