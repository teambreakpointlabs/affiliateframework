angular.module('mean.system').service('OfferBuilderService', function(){
	
	this.buildOfferTemplate = function(offerType){
		switch(offerType){
			case 'television':
			return buildTelevisionOffer();
			case 'laptop':
			return buildLaptopOffer();
			case 'tablet':
			return buildTabletOffer();
			case 'camera':
			return buildCameraOffer();
		}
	}

	var buildTelevisionOffer = function(){
		return '<div> Television Offer </div>';
	}

	var buildLaptopOffer = function(){
		return '<div> Laptop Offer </div>'
	}

	var buildTabletOffer = function(){
		return '<div> Tablet Offer </div>';
	}

	var buildCameraOffer = function(){
		return '<div> Camera Offer </div>'
	}

});
