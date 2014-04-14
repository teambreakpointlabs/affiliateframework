'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Offer = mongoose.model('Offer'),
    _ = require('lodash');

exports.search = function(req,res){
  var options = {
    filter: {isValid:true}, limit: 20
  }
  console.log(req.params.searchString);
  Offer.textSearch(req.params.searchString,options,function(err,output){
    res.jsonp(output);
  });
}

/**
 * Find offer by id
 */
exports.offer = function(req, res, next, id) {
    Offer.load(id, function(err, offer) {
        if (err) return next(err);
        if (!offer) return next(new Error('Failed to load offer ' + id));
        req.offer = offer;
        next();
    });
};

/**
 * Show an offer
 */
exports.show = function(req, res) {
    Offer.find({urlDesc: req.params.urlDesc, isValid:true}, function(err,offers){
      console.log(offers[0]);
      if (offers[0] == undefined){
        //if valid offer not found return a page with offer no longer valid 
        Offer.find({urlDesc: req.params.urlDesc, isValid:false}, function(err,offers){
          if(offers[0] == undefined){
            res.jsonp({err:'notFound'});
          }else{
            res.jsonp(offers[0]);
          }
        })
      }else{
       res.jsonp(offers[0]); 
      }
      
    });
};

/**
 * List of offers
 */
exports.all = function(req, res) {
  console.log('searching offers');
    var searchObject =  generateSearch(req);
    //console.log(searchObject);
    Offer.find(searchObject).sort('-pricing.pctSavings').populate('user', 'name username').exec(function(err, offers) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
          //console.log(offers);
            res.jsonp(offers);
        }
    });
};


function generateSearch(req){
  var search = {};
  
  var brands = req.query.brands;
  var retailers = req.query.retailers;
  
  //handle single element arrays
  if(typeof brands === 'string') {
    brands = [brands];
  }
  if (typeof retailers === 'string'){
    retailers = [retailers];
  }

  var search = {
    type: req.query.type,
    brand: { $in: brands},
    retailer: { $in: retailers},
    isValid: true,
    'pricing.offer': {$gte: parseInt(req.query.priceMin), $lte: parseInt(req.query.priceMax)},
  }

  if (req.query.type == 'television' || req.query.type == 'laptop'){
    search['details.screenSize'] = {$gte: parseInt(req.query.screenMin), $lte: parseInt(req.query.screenMax)}
  }

  if (req.query.type == 'shoe'){
    console.log(req.query.gender);
    search['gender'] = req.query.gender;
  }


  return search;
}





