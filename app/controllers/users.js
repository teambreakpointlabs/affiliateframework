'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    User = mongoose.model('User');

/**
 * Auth callback
 */
exports.authCallback = function(req, res) {
    res.redirect('/');
};

/**
 * Show login form
 */
exports.signin = function(req, res) {
    res.render('users/signin', {
        title: 'Signin',
        message: req.flash('error')
    });
};

/**
 * Show sign up form
 */
exports.signup = function(req, res) {
    res.render('users/signup', {
        title: 'Sign up',
        user: new User()
    });
};

/**
 * Logout
 */
exports.signout = function(req, res) {
    req.logout();
    res.redirect('/');
};

/**
 * Session
 */
exports.session = function(req, res) {
    res.redirect('/');
};

/**
 * Create user
 */
exports.create = function(req, res, next) {
    
  var userToSave = new User(req.body);
  console.log(req.body);
  // var message = null;
  // validate email on server...
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(!re.test(req.body.email)){
    console.log('email invalid');
    return res.jsonp({message: 'email invalid'});
  }else{
  	console.log('email valid');
  }

  //console.log(user);
  console.log('finding...');
  var searchObj = {email:req.body.email, type:req.body.type};
  if (req.body.gender){
  	searchObj.gender = req.body.gender;
  }
  User.findOne(searchObj).exec(function(err, user){
    if (!user){
    	//save
    	console.log('email - '+req.body.email+' not found for type - ' + req.body.type);
    
    userToSave.save(function(err) {
	    if (err) {
	    	console.log(err);
	      switch (err.code) {
	        case 11000:
	        case 11001:
	          console.log('email exists');
	          res.jsonp({err:'email exists'});
	           break;
	        default:
	          console.log('fill in all fields');
	          res.jsonp({err:'fill in required fields'});
	      }
	    }else{
	      return res.jsonp({message: 'success'});
	    }
	  });
    }else{
    	console.log('user already here');
    	return res.jsonp({message: 'exists'});
    }

    if (err){
    	console.log(err);
    }
  })


  // user.provider = 'local';
  
}

             // 

             //return res.jsonp({message: 'success'});

    //     req.logIn(user, function(err) {
    //         if (err) return next(err);
    //         return res.redirect('/');
    //     });
    // });

/**
 * Send User
 */
exports.me = function(req, res) {
    res.jsonp(req.user || null);
};

/**
 * Find user by id
 */
exports.user = function(req, res, next, id) {
    User
        .findOne({
            _id: id
        })
        .exec(function(err, user) {
            if (err) return next(err);
            if (!user) return next(new Error('Failed to load User ' + id));
            req.profile = user;
            next();
        });
};