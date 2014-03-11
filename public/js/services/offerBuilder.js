angular.module('mean.system').service('OfferBuilderService', function(){
	

	/** offer is offer object, type is whether it is for individual or list view **/
	this.buildOfferTemplate = function(offer,viewType){	
		switch(offer.type){
			case 'television':
			return buildTelevisionOffer(offer, viewType);
			case 'laptop':
			return buildLaptopOffer(offer,viewType);
			case 'tablet':
			return buildTabletOffer(offer,viewType);
			case 'camera':
			return buildCameraOffer(offer,viewType);
		}
	}

	var buildTelevisionOffer = function(offer,viewType){
		return '<div> Television Offer </div>';
	}

	var buildLaptopOffer = function(offer,viewType){
		

    var individualLaptop = 
    '<div style="text-transform:capitalize;font-size:28px;">' + offer.brand + 
    ' ' + offer.type + ' Offer </div>'+
    '<div><img style="width:160px;height:160px;" src="'+
    offer.url.image+'"/></div>'+'<div>' + 
    offer.description+'</div><div>'+
    offer.pricing.offer+ '</div><div> Was '+
    offer.pricing.original+'</div><div>' + 
    offer.pricing.pctSavings + '% off!</div><div><a ng-href='+
    offer.url.skimlinks+'> View Offer </a></div>';

    var listLaptop =  '<div class="offer_holder">' +
             '<div class="offer_tagline">' +
               '<span class="offer_brand">' + offer.brand + ' ' + offer.type + '</span>' +
             '</div>' +
      '<div class="offer_img_holder">'+
        '<img src="'+ offer.url.image +'" class="offer_img"/>'+
     '</div>' +
                
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
       '<a class="offer_button more_info" ng-href="/offers/laptop/'+offer.brand+'/'+offer.urlDesc+'">More Info</a>'+
       '</div>' +
       '</div>' +
       '</div>';
       return viewType == 'list' ? listLaptop : individualLaptop;
	}

	var buildTabletOffer = function(offer,viewType){
		return '<div> Tablet Offer </div>';
	}

	var buildCameraOffer = function(offer,viewType){
		return '<div> Camera Offer </div>'
	}

});
