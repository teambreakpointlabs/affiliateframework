'use strict';

/**
 * Module dependencies.
 */
var express = require('express'),
    consolidate = require('consolidate'),
    mongoStore = require('connect-mongo')(express),
    flash = require('connect-flash'),
    helpers = require('view-helpers'),
    config = require('./config'),
    mongoose = require('mongoose'),
    LocalStrategy = require('passport-local').Strategy,
    User = mongoose.model('User');
    //connect_s4a = require('connect-s4a'),
    //token = "9b77fa2b380380036fe1b06663239d28";



module.exports = function(app, passport, db) {
    app.set('showStackError', true);

    // Prettify HTML
    app.locals.pretty = true;
		// cache=memory or swig dies in NODE_ENV=production
		app.locals.cache = 'memory';
		
    // Should be placed before express.static
    // To ensure that all assets and data are compressed (utilize bandwidth)
    app.use(express.compress({
        filter: function(req, res) {
            return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
        },
        // Levels are specified in a range of 0 to 9, where-as 0 is
        // no compression and 9 is best compression, but slowest
        level: 9
    }));

    // Only use logger for development environment
    if (process.env.NODE_ENV === 'development') {
        app.use(express.logger('dev'));
    }

    // assign the template engine to .html files
    app.engine('html', consolidate[config.templateEngine]);

    // set .html as the default extension
    app.set('view engine', 'html');

    // Set views path, template engine and default layout
    app.set('views', config.root + '/app/views');

    // Enable jsonp
    app.enable('jsonp callback');
    
    app.configure(function() {
        //app.use(connect_s4a(token));
        app.use(require('prerender-node').set('prerenderToken', 'XjPlsCNXECHVU0gDX0RS'));
        // The cookieParser should be above session
        app.use(express.cookieParser());

        // Request body parsing middleware should be above methodOverride
        app.use(express.urlencoded());
        app.use(express.json());
        app.use(express.methodOverride());

        // Express/Mongo session storage
        app.use(express.session({
            secret: config.sessionSecret,
            store: new mongoStore({
                db: db.connection.db,
                collection: config.sessionCollection
            })
        }));

        // Dynamic helpers
        app.use(helpers(config.app.name));

        // Use passport session
        app.use(passport.initialize());
        app.use(passport.session());

        // Connect flash for flash messages
        app.use(flash());

        app.use("/css", express.static(config.root + '/public/css'));
        app.use("/js", express.static(config.root + '/public/js'));
        app.use("/lib", express.static(config.root + '/public/lib'));
        app.use("/views", express.static(config.root + '/public/views'));
        app.use("/img", express.static(config.root + '/public/img'));

        //handle api calls - everything else handled by angular
        var offers = require('../app/controllers/offers');
        var users = require('../app/controllers/users');
        var posts = require('../app/controllers/posts');
        
        //robots.txt
        app.get('/robots.txt', function(req, res) {
          res.sendfile(config.root + '/public/robots.txt');
        });

        //static sitemap
        app.get('/sitemap', function(req, res) {
          res.sendfile(config.root + '/public/sitemap/sitemap.xml');
        });

        app.post('/users/new', users.create)

        app.get('/api/posts', posts.all);
        
        app.get('/api/offer/search/:searchString', offers.search);
        app.get('/api/offer/:urlDesc', offers.show);
        app.get('/api/offer/stats/:url', offers.stats);
        app.get('/api/offer/related/:type/:brand', offers.related);
        app.get('/api/offers', offers.all);
 
        // Routes should be at the last
        app.use(app.router);

        // Setting the fav icon and static folder
        app.use(express.favicon());


        app.get('/*', function(req, res) {
          res.render('index.html',  { user: req.user ? JSON.stringify(req.user) : "null" });
        });

        // Assume "not found" in the error msgs is a 404. this is somewhat
        // silly, but valid, you can do whatever you like, set properties,
        // use instanceof etc.
        app.use(function(err, req, res, next) {
            // Treat as 404
            if (~err.message.indexOf('not found')) return next();

            // Log it
            console.error(err.stack);

            // Error page
            res.status(500).render('500', {
                error: err.stack
            });
        });

        // Assume 404 since no middleware responded
        app.use(function(req, res) {
            res.status(404).render('404', {
                url: req.originalUrl,
                error: 'Not found'
            });
        });

    });
};
