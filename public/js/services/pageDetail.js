angular.module('mean.system').factory('PageDetailService', function(){
  return {
    setPageDetail: function setPageDetail(offerType, brand){
      var capitaliseType = offerType.charAt(0).toUpperCase() + offerType.slice(1);
       if (brand != undefined){
       var capitaliseBrand = brand.charAt(0).toUpperCase() + brand.slice(1);
       this.setTitle(capitaliseBrand + " " + capitaliseType + ' Offers | OfferCrunch');
       this.setMetaDescription(capitaliseBrand + " " + capitaliseType + ' Offers | Offercrunch - All the best online offers in one place. Televisions, laptops, cameras, tablets. Up to 50% off big name brands from major UK retailers.')
       }else{
        this.setTitle(capitaliseType + ' Offers | OfferCrunch');
        this.setMetaDescription(capitaliseType + ' Offers | Offercrunch - All the best online offers in one place. Televisions, laptops, cameras, tablets. Up to 50% off big name brands from major UK retailers.');
       }
    },
  	setTitle: function setTitle(title){
      document.title = title;
  	},
  	setMetaDescription: function setMetaDescription(metaDesc){
      var meta = document.createElement('meta');
      meta.name = "description";
      meta.content = metaDesc;
      document.getElementsByTagName('head')[0].appendChild(meta);
  	}
  }
});