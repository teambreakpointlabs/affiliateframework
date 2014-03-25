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
		return  '<div class="indiv_offer_brand">' + offer.brand + ' ' + offer.type + ' Offer </div>' + 
    '<div class="indiv_offer_description">' + offer.description +'</div>' + '<div class="indiv_offer_valid"> This offer is <span class="indiv_offer_valid_text">valid</span></div>' +
    '<div class="indiv_offer_img_holder"><img class="indiv_offer_img" src="'+ offer.url.image +'"/></div>'+'<div>'+
    '<div class="indiv_offer_label indiv_go_to_offer"><a class="indiv_go_to_offer_text" ng-href='+offer.url.skimlinks+'> Go to Offer <span class="glyphicon glyphicon-chevron-right" style="color:#38d5b8;font-size:14px;"></span></a></div>' +
    '<div class="indiv_offer_label indiv_offer_price"> £' + offer.pricing.offer+ '</div>' +
    '<div class="indiv_offer_label indiv_original_price"> Was £' + offer.pricing.original+ '</div>' +
    '<div class="indiv_offer_label indiv_saving"> Save ' + offer.pricing.pctSavings+ '%!</div>' +
    '<div class="indiv_logo_holder"><img ng-src="/img/logos/'+offer.retailer+'.png"/></div>';
  }

	var buildListOffer = function(offer){
    
  

    var standardTagline = '<span class="offer_brand">' + offer.brand + ' ' + offer.type + '</span>';
    
    var tagline = '';

    switch(offer.type){
      case 'television':
      tagline = '<span class="offer_brand">' + offer.brand + ' ' + offer.details.screenSize + '" '+ offer.details.screenType + '</span>'; ;
      break;
      case 'laptop':
      tagline = '<span class="offer_brand">' + offer.brand + ' ' + offer.details.screenSize + '"' + ' Laptop</span>' ;
      break;
      case 'tablet':
      tagline = standardTagline;
      break;
      case 'camera':
      tagline = standardTagline;
      break;
    }

		return '<div class="offer_holder">' +
    '<div class="offer_tagline">' + tagline + '</div>' +
    '<div class="offer_img_holder">'+ '<img src="'+ offer.url.image +'" class="offer_img"/> </div>' +
    '<div class="offer_info_holder">' +
       '<div class="offer_description">'+offer.description+'</div>'+
       '<div class="original_price"><del>Was £'+ offer.pricing.original +'</del></div>'+
       '<div class="offer_price">£'+ offer.pricing.offer +'</div>'+
       '<div class="pct_savings">'+offer.pricing.pctSavings+'% Off!</div>' +
       '<div class="retailer">'+offer.retailer+'</div>' +
       '<div class="offer_button_holder">' +
       '<a class="offer_button view" target="_blank" ng-href="'+offer.url.skimlinks+'">View Offer</a>'+
       '</div>' +
       '<div class="offer_button_holder">' +
       '<a class="offer_button more_info" ng-href="/offers/'+offer.type+'/'+offer.brand+'/'+offer.urlDesc+'">More Info</a>'+
       '</div>' +
       '</div>' +
       '</div>';
	}

});
