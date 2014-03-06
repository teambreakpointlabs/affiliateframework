angular.module('mean.system').directive('offer',['$compile', 'OfferBuilderService', function($compile, OfferBuilderService){
  var getTemplate = function(offerType){
    return OfferBuilderService.buildOfferTemplate(offerType);
  }
  return{
    restrict: 'E',
    link: function(scope,elem,attrs){
      elem.html(getTemplate(attrs.type));
      $compile(elem.contents())(scope);
    }
  }
}]);