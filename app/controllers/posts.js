'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Post = mongoose.model('Post'),
    _ = require('lodash');

/**
 * Find post by id
 */
exports.post = function(req, res, next, id) {
  Post.load(id, function(err, post) {
    if (err) return next(err);
      if (!post) return next(new Error('Failed to load post ' + id));
      req.post = post;
      next();
    });
};


/**
 * List of offers
 */
exports.all = function(req, res) {
    Post.find({}).exec(function(err, posts) {
      if (err) {
        res.render('error', {
          status: 500
        });
      }else{
        res.jsonp(posts);
      }
    });
  }





