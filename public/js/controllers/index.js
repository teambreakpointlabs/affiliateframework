'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', 'Global','PageDetailService', function ($scope, Global, PageDetailService) {
  $scope.global = Global;
  $scope.showOptions = false;
   
  PageDetailService.setTitle('One Website. Every Offer. | Offercrunch ');
  PageDetailService.setMetaDescription('Offercrunch - All the best online offers in one place. Televisions, laptops, cameras, tablets, fashion. Massive savings on big name brands from major UK retailers.');  

}]);