angular.module('mean.system').factory('UrlHelperService',function(){
  var transformedType = '';

  var typeAdapter = function typeAdapter(type){
      transformedType = type;
      switch (type){
        case 'shoes':
        transformedType = 'shoe';
        break;
        case 'shirts':
        transformedType = 'shirt';
        break;
        case 'tops':
        transformedType = 'top';
        break;
        default:
        transformedType = type;
      }
      return transformedType;
    }

  var splitBrandByDash = function splitBrandByDash(brand){
    //will return same as passed in if no dash
      var offerBrand = brand;
      var splitBrandByDash = brand.split('-');
      if (splitBrandByDash.length > 0){
        var brandAppender = '';
        for (var i=0;i<splitBrandByDash.length;i++){
          if (i!=splitBrandByDash.length-1){
            brandAppender = brandAppender + splitBrandByDash[i]+" ";
          }else{
             brandAppender = brandAppender + splitBrandByDash[i];
          }
        }
      offerBrand = brandAppender;
    }
    return offerBrand;
  }
  return {
    processUrl: function processUrl(params){
     
      var offerCategory = params.gender == undefined ? 'consumer_electronics' : 'fashion';
      var offerBrand;
      if (params.brand != undefined){
        offerBrand = splitBrandByDash(params.brand);
      }
      
      return {
        type: typeAdapter(params.type),
        brand: offerBrand,
        gender: params.gender,
        category: offerCategory
      }
    }
  }
});