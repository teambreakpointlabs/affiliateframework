angular.module('mean.system').directive('offer',['$compile','$timeout','OfferBuilderService', function($compile,$timeout,OfferBuilderService){
  var getTemplate = function(offer,viewType){
    return OfferBuilderService.buildOfferTemplate(offer,viewType);
  }
  return{
    restrict: 'E',
    link: function(scope,elem,attrs){
        elem.html(getTemplate(scope.$eval(attrs.offer), attrs.viewType)); 
        $compile(elem.contents())(scope);
    }
  }
}]);