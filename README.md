Install Guide

Please make sure your terminal has gulp client installed at first, otherwise run the following cmd(if you have npm installed before):
	$ npm install --global gulp-cli

Navigate to project folder, then run
	$ npm install

To serve the app, please run
	$ gulp
then access http://localhost:4000/

To run the tests, run
	$ gulp test



Short Summary regarding techniques

Techniques are used for part 1
Angular 1.5 - two way data binding, great for grid data displaying 
Gulp - light-weight and powerful streaming build system, popular automation tool for frontend
Node.js - make use of require() instead of traditional library import, module.exports to separate components
Underscore.js - utilisation library
Npm - essential node package management
Jasmine/Karma - unit testing

Techniques are used for part 2
HTML5 - more semantic interface
CSS3 - css3 transition
Skeleton css/normalize.css - most light-weight responsive framework and HTML5 normalizing library
BEM CSS naming method - Block Element Modifier naming method make css more scalable, easier to alter
(SASS is not used this time because something wrong with the gulp sass complier)
(Any IE version before IE9 does not support media query , some of them does not support :before pseduo class)