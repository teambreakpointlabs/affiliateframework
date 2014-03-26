angular.module('mean.system').factory('PageDetailService', function(){
  return {
    setPageDetail: function setPageDetail(offerType){
      var capitaliseType = offerType.charAt(0).toUpperCase() + offerType.slice(1);
      this.setTitle(capitaliseType + ' Offers | OfferCrunch');
      //this.setMetaDescription();
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