####################
TurnTable Botz0r
####################
|sgir|

About
=====
A fun little Turntable.fm bot to help maintain a channel and a simple nodejs project
to learn NodeJS which I'm still a complete NodeJS newb. Use with caution as turntable doesn't just want
autobob bots for point hording I'm sure.

Setup/Install
==============

- You'll have to first install nodejs at http://nodejs.org
    sudo apt-get install nodejs

- After which you'll also install npm which is nodejs' package manager
    sudo apt-get install npm 

- Grab the ttpi via npm
    npm install ttapi

Config
======

Configuration of the bot exists in settings.js.local
----------------------------------------------------


- Change filename to settings.js
- Update all Values in settings.js


Obtain your AUTHID, ROOMID(s), USERID with this Bookmarklet_

Just drag it up into your Bookmark bar and click when you're in your favorite TT room.

Commands
========
Some basic commands included so far.
------------------------------------

- ``/sgir autoskip`` : Checks status of Autoskip
- ``/sgir autoskip on`` : Turns AutoSkip of it's songs on.
- ``/sgir autoskip off`` : Turns AutoSkipping off and allows your bot to DJ if they have tunez.
- ``/sgir skip`` : Will skip the bots currently playing song. If autoskip is turned off of course.


License
=======
Copyright (c) 2011 Aaron Allred

Published under The MIT License, see LICENSE_

.. |sgir| image:: https://github.com/digicyc/TTBotzor/raw/master/sgir.png
.. _Bookmarklet: http://alaingilbert.github.com/Turntable-API/bookmarklet.html
.. _LICENSE: https://github.com/digicyc/TTBotzor/blob/master/LICENSE.rst
