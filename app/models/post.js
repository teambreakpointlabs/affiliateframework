'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
/**
 * Post Schema
 */
var PostSchema = new Schema({
    published_date: Date,
    title: String,
    content: String
});

mongoose.model('Post', PostSchema);