'use strict';

angular.module('mean.system').controller('FashionController', ['$scope', 'Global','PageDetailService', function ($scope, Global, PageDetailService) {
  $scope.global = Global;
   
  PageDetailService.setTitle('Fashion Offers | Offercrunch ');
  PageDetailService.setMetaDescription('Offercrunch - All the best online offers in one place. Televisions, laptops, cameras, tablets. Up to 50% off big name brands from major UK retailers.');  

}]);