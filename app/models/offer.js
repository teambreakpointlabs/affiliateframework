'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Offer Schema
 */
var OfferSchema = new Schema({
    type: String,
    brand: String,
    retailer: String,
    url: {
        image: String,
        product: String
    },
    pricing:{
    original: Number,
    offer: Number,
    savings: Number,
    pctSavings: Number
    },
    isSaved: Boolean,
    description: String,
    urlDesc: String,
    details:{

    }
});

mongoose.model('Offer', OfferSchema);