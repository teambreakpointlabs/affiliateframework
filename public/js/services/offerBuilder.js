angular.module('mean.system').service('OfferBuilderService', function(){
	

	/** offer is offer object, viewType is whether it is for individual or list view **/
	this.buildOfferTemplate = function(offer,viewType){	
	  switch(viewType){
	  	case 'list':
	  	return buildListOffer(offer);
	  	case 'individual':
	  	return buildIndividualOffer(offer);
	  }
	}

	var buildIndividualOffer = function(offer){

    var originalPriceDisplay = '';

    if (offer.pricing != undefined){
      originalPriceDisplay = '<div class="indiv_offer_label indiv_original_price"> Was £' + offer.pricing.original+ '</div>';
    }

    var validText = offer.isValid ? '<span class="indiv_offer_valid_text"> valid</span>' : '<span class="indiv_offer_not_valid_text"> no longer valid</span>';
    var goToOffer = offer.isValid ? '<a class="indiv_offer_label indiv_go_to_offer" rel="nofollow" target="_blank" ng-href='+offer.url.skimlinks+'><span class="indiv_go_to_offer_text"> View Offer <span class="glyphicon glyphicon-chevron-right" style="color:#38d5b8;font-size:14px;"></span></span></a>' : '<a class="indiv_offer_label indiv_go_to_offer" ng-href="/"><span class="indiv_go_to_offer_text"> Browse All Offers <span class="glyphicon glyphicon-chevron-right" style="color:#38d5b8;font-size:14px;"></span></span></a>';


		return  '<div class="indiv_offer_brand">' + offer.brand + ' ' + offer.type + ' Offer </div>' + 
    '<div class="indiv_offer_description">' + offer.description +'</div>' + '<div class="indiv_offer_valid"> This offer is' + validText +
    '<div class="indiv_offer_img_holder"><img class="indiv_offer_img" src="'+ offer.url.image +'"/></div>'+'<div>'+
    goToOffer +
    '<div class="indiv_offer_label indiv_offer_price"> £' + offer.pricing.offer+ '</div>' +
    originalPriceDisplay +
    '<div class="indiv_offer_label indiv_saving"> Save ' + offer.pricing.pctSavings+ '%!</div>' +
    '<div class="indiv_logo_holder"><img ng-src="/img/logos/'+offer.retailer+'.png"/></div>';
  }

	var buildListOffer = function(offer,type){

    // console.log('building list offer');
    
    var originalPriceDisplay = '';
    var screenSizeDisplay = '';
    var screenTypeDisplay = '';

    //console.log(offer);
    
    if (offer.pricing.original != undefined){
      originalPriceDisplay = '<div class="original_price"><del>Was £'+ offer.pricing.original +'</del></div>';
    }else{
      originalPriceDisplay = '<div class="original_price"> Save ££! </div>';
    }
     
    if (offer.details != undefined){
      screenSizeDisplay = offer.details.screenSize == null ? '' : offer.details.screenSize + '"';
      screenTypeDisplay = offer.details.screenType == null ? '' : offer.details.screenType;
    }

    var standardTagline = '<span class="offer_brand">' + offer.brand + ' ' + offer.type + '</span>';
    var tagline = '';
    var indivOfferUrlStub = '';

    switch(offer.type){
      case 'television':
      tagline = '<span class="offer_brand">' + offer.brand + ' ' + screenSizeDisplay + ' '+ screenTypeDisplay + '</span>'; ;
      indivOfferUrlStub = '/offers/'+offer.type;
      break;
      case 'laptop':
      tagline = '<span class="offer_brand">' + offer.brand + ' ' + screenSizeDisplay + ' Laptop</span>' ;
      indivOfferUrlStub = '/offers/'+offer.type;
      break;
      case 'tablet':
      tagline = standardTagline;
      indivOfferUrlStub = '/offers/'+offer.type;
      break;
      case 'camera':
      tagline = standardTagline;
      indivOfferUrlStub = '/offers/'+offer.type;
      break;
      case 'fashion':
      tagline = '<span class="offer_brand"> Fashion Offer </span>';
      indivOfferUrlStub = '/offers/fashion/';
      break;
      default:
      tagline = standardTagline;
    }

    if (offer.brand!=undefined){
    var checkMultipleBrandWords = offer.brand.split(' ');
    var brand = offer.brand;
    if (checkMultipleBrandWords.length > 0){
      var brandAppender = '';
      for (var i=0;i<checkMultipleBrandWords.length;i++){
        if (i!=0){
          brandAppender = brandAppender + "-" + checkMultipleBrandWords[i]; 
        }else{
          brandAppender = checkMultipleBrandWords[i];
        }
        
      }
      brand = brandAppender;
    }
  }

		return '<div class="offer_holder">' +
    '<div class="offer_tagline">' + tagline + '</div>' +
    '<div class="offer_img_holder" style="background:#fff;">'+ '<img src="'+ offer.url.image +'" class="offer_img"/> </div>' +
    '<div class="offer_info_holder">' +
       '<div class="offer_description">'+offer.description+'</div>'+
       originalPriceDisplay +
       '<div class="offer_price">£'+ offer.pricing.offer +'</div>'+
       '<div class="pct_savings">'+offer.pricing.pctSavings+'% Off!</div>' +
       '<div class="retailer">'+offer.retailer+'</div>' +
       '<div class="offer_button_holder">' +
       '<a class="offer_button view" rel="nofollow" target="_blank" ng-href="'+offer.url.skimlinks+'">View Offer</a>'+
       '</div>' +
       '<div class="offer_button_holder">' +
       '<a class="offer_button more_info" target="_blank" ng-href='+indivOfferUrlStub+'/'+brand+'/'+offer.urlDesc+'>More Info</a>'+
       '</div>' +
       '</div>' +
       '</div>';
	}

});
