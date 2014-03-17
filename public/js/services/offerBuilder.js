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
		    return  '<div style="text-transform:capitalize;font-size:28px;color:#afafaf;">' + offer.brand + 
        ' ' + offer.type + ' Offer </div>'+ '<div style="border-top:1px solid #efefef; border-bottom:1px solid #efefef; margin-top:20px; margin-bottom:20px; padding-top:28px; padding-bottom:28px; font-size:22px; margin: 0px auto;margin-top:28px;max-width: 80%;font-family:Lato; font-weight:300;">' + 
    offer.description+'</div>' + '<div style="font-family:Lato; font-size:28px;font-weight:300;padding:24px;padding-bottom:10px;"> This offer is <span style="color:#38d5b8;font-weight:600;">valid</span> </div>' +
      '<div style="padding:28px;padding-top:10px;"><img style="width:160px;height:160px;" src="'+
    offer.url.image+'"/></div>'+'<div>'+
    '<div style="text-decoration:none; font-size:22px; font-family: Lato; border: 4px solid #38d5b8;width:220px;margin:0px auto;padding:10px; color:#38d5b8;cursor:pointer;"><a style="text-decoration:none;color:#38d5b8 !important;" ng-href='+offer.url.skimlinks+'> Go to Offer <span class="glyphicon glyphicon-chevron-right" style="color:#38d5b8;font-size:14px;"></span></a></div>' +
    '<div style="text-decoration:none; font-size:25px; font-family: Lato; border: 1px dashed #afafaf;width:220px;margin:0px auto;padding:10px; color:#343434; font-weight:300;margin-top:10px;"> £' + offer.pricing.offer+ '</div>' +
    '<div style="text-decoration:none; font-size:22px; font-family: Lato; border: 1px dashed #afafaf;width:220px;margin:0px auto;padding:10px; color:#afafaf; font-weight:300;margin-top:10px;"> Was £' + offer.pricing.original+ '</div>' +
    '<div style="text-decoration:none; font-size:22px; font-family: Lato; border: 1px dashed #afafaf;width:220px;margin:0px auto;padding:10px; color:#afafaf; font-weight:300;margin-top:10px;"> Save ' + offer.pricing.pctSavings+ '%!</div>' +
    '<div style="padding:20px;padding-bottom:0px;"><img ng-src="/img/logos/'+offer.retailer+'.png"/></div>';
  }

	var buildListOffer = function(offer){

    var tvTagline =  '<span class="offer_brand">' + offer.brand + ' ' + offer.details.screenSize + '" '+ offer.details.screenType + '</span>'; 
    var laptopTagline = '<span class="offer_brand">' + offer.brand + ' ' + offer.details.screenSize + '"' + ' Laptop</span>'; 
    var tagline = '';
    switch(offer.type){
      case 'television':
      tagline = tvTagline;
      break;
      case 'laptop':
      tagline = laptopTagline;
      break;
    }

		return '<div class="offer_holder">' +
             '<div class="offer_tagline">' +
               tagline +
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
       '<a class="offer_button more_info" ng-href="/offers/'+offer.type+'/'+offer.brand+'/'+offer.urlDesc+'">More Info</a>'+
       '</div>' +
       '</div>' +
       '</div>';
	}

});
