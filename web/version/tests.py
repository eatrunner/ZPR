## @file version/tests.py
#  @brief version module unit testing

import datetime
import django.test
import models
import views

class VersionModelTestCase(django.test.TestCase):
    """test version model"""

    def test01getVersionString(self):
        """test if getVersion return non-empty string"""
        self.assertTrue( len(models.getVersionString()) > 0 )

    def test06versionFromRow(self):
        """check if database version string has 'ver'"""
        self.assertEqual( models._versionFromRow(''), 'unknown' )
        t = ('ver,xxx',)
        self.assertEqual( models._versionFromRow(t), 'ver')

class VersionViewTestCase(django.test.TestCase):
    """test version interface"""

    def test01get(self):
        """check if get service return non-empty dict"""
        d = views.get({})
        self.assertEqual( len(d), 3)



