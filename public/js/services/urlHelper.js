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
        default:
        transformedType = type;
      }
      return transformedType;
    }
  return {
    processUrl: function processUrl(params){
      var offerCategory = params.gender == undefined ? 'consumer_electronics' : 'fashion';
      return {
        type: typeAdapter(params.type),
        brand: params.brand,
        gender: params.gender,
        category: offerCategory
      }
    }
  }
});