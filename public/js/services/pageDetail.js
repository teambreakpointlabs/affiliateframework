angular.module('mean.system').factory('PageDetailService', function($stateParams){
   
   //move to utility service - same method (nearly) as in urlHelper - maybe expose this in urlHelper and inject to here
   var splitBrandByDash = function splitBrandByDash(brand){
    //will return same as passed in if no dash
      var offerBrand = brand;
      var splitBrandByDash = brand.split('-');
      if (splitBrandByDash.length > 0){
        var brandAppender = '';
        for (var i=0;i<splitBrandByDash.length;i++){
          capitaliseBrandPart = splitBrandByDash[i].charAt(0).toUpperCase() + splitBrandByDash[i].slice(1);
          console.log(capitaliseBrandPart);
          if (i!=splitBrandByDash.length-1){
            brandAppender = brandAppender + capitaliseBrandPart+" ";
          }else{
            brandAppender = brandAppender + capitaliseBrandPart;
          }
        }
      offerBrand = brandAppender;
    }
    return offerBrand;
  }

  return {
    setPageDetail: function setPageDetail(offerType, brand){
      var capitaliseType = offerType.charAt(0).toUpperCase() + offerType.slice(1);
       if (brand != undefined){
       brand = splitBrandByDash(brand);
       var capitaliseBrand = brand.charAt(0).toUpperCase() + brand.slice(1);
       var capitaliseGender = '';
       if ($stateParams.gender != undefined){
         var gender = $stateParams.gender;
         capitaliseGender = gender.charAt(0).toUpperCase() + gender.slice(1) + "'s ";
       }
       this.setTitle(capitaliseGender + capitaliseBrand + " " + capitaliseType + ' Offers | OfferCrunch');
       this.setMetaDescription(capitaliseGender + capitaliseBrand + " " + capitaliseType + ' Offers | Offercrunch - All the best online offers in one place.')
       }else{
         //put capitalise into own method and rethink setting page detail service with undefined params
         var capitaliseGender = '';
          if ($stateParams.gender != undefined){
         var gender = $stateParams.gender;
         capitaliseGender = gender.charAt(0).toUpperCase() + gender.slice(1) + "'s ";
       }
        this.setTitle(capitaliseGender + capitaliseType + ' Offers | OfferCrunch');
        this.setMetaDescription(capitaliseGender + capitaliseType + ' Offers | Offercrunch - All the best online offers in one place.');
       }
    },
  	setTitle: function setTitle(title){
      document.title = title;
  	},
  	setMetaDescription: function setMetaDescription(metaDesc){
      $('meta[name=description]').remove();
      var meta = document.createElement('meta');
      meta.name = "description";
      meta.content = metaDesc;
      document.getElementsByTagName('head')[0].appendChild(meta);
  	}
  }
});