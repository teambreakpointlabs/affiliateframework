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

    // require(config.root + '/app/routes/index.js')(app);
    //require(config.root + '/app/routes/users.js')(app);
    // require(config.root + '/app/routes/article.js')(app);

    app.configure(function() {
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
        //app.use("/views/articles", express.static(config.root + '/public/views/articles'));
        app.use("/img", express.static(config.root + '/public/img'));

    //    var users = require('../app/controllers/users');
    //


    //     app.get('/signin', users.signin);
    //     app.get('/signup', users.signup);
    //     app.get('/signout', users.signout);
    //     app.get('/users/me', users.me);
        
    //     // Setting up the users api
    //     app.post('/users', users.create);
        
    //     // Setting up the userId param
    //     app.param('userId', users.user);

    //     // Setting the local strategy route
    //     app.post('/users/session', passport.authenticate('local', {
    //       failureRedirect: '/signin',
    //       failureFlash: true
    //     }), users.session);

    //         // Serialize the user id to push into the session
    // passport.serializeUser(function(user, done) {
    //     done(null, user.id);
    // });

    // Deserialize the user object based on a pre-serialized token
    // which is the user id
    // passport.deserializeUser(function(id, done) {
    //     User.findOne({
    //         _id: id
    //     }, '-salt -hashed_password', function(err, user) {
    //         done(err, user);
    //     });
    // });

    // // Use local strategy
    // passport.use(new LocalStrategy({
    //         usernameField: 'email',
    //         passwordField: 'password'
    //     },
    //     function(email, password, done) {
    //         User.findOne({
    //             email: email
    //         }, function(err, user) {
    //             if (err) {
    //                 return done(err);
    //             }
    //             if (!user) {
    //                 return done(null, false, {
    //                     message: 'Unknown user'
    //                 });
    //             }
    //             if (!user.authenticate(password)) {
    //                 return done(null, false, {
    //                     message: 'Invalid password'
    //                 });
    //             }
    //             return done(null, user);
    //         });
    //     }
    // ));

   // app.get('/articles', articles.all);
   // app.post('/articles',articles.create);
   // app.get('/articles/:articleId', articles.show);
   // app.put('/articles/:articleId', articles.update);
   // app.del('/articles/:articleId', articles.destroy);

    // Finish with setting up the articleId param
    // app.param('articleId', articles.article);

        //handle api calls - everything else runs through to angular
        var articles = require('../app/controllers/articles');
        var offers = require('../app/controllers/offers');

        app.get('/api/articles', articles.all);
        app.get('/api/articles/:articleId', articles.show);
         // Finish with setting up the articleId param
        app.param('articleId', articles.article);

        //extract retailer and brand so returns right offer for that urlDesc
        //app.get('/api/offers/:retailer/:brand/:urlDesc', offers.show);

        app.get('/api/offers', offers.all);

        

        //app.get('/articles', articles.all);
        // Routes should be at the last
        app.use(app.router);

        // Setting the fav icon and static folder
        app.use(express.favicon());
        // app.use(express.static(config.root + '/public'));
        // any other routes:
        // var index = require('../app/controllers/index.js');
        // app.get('/', index.render);

       // app.use("/img", express.static(__dirname + "/../app/img"));
       // app.use("/partials", express.static(__dirname + "/../app/partials"));
        
        //everything through angular
        // app.get('/*', function(req, res) {
        //   res.render('index.html');
        // });

        // app.get('*', function(req, res) {
        //   res.redirect('/');
        // });
         
        // app.all('/*', function(req, res) {
        //   res.render('index.html', { user: req.user ? JSON.stringify(req.user) : "null" });
        // });


        app.get('/*', function(req, res) {
          console.log('express: rendering index page');
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
