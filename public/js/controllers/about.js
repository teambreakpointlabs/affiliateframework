'use strict';

angular.module('mean.system').controller('AboutController', ['$scope', 'Global','PageDetailService', function($scope, Global, PageDetailService) {
  $scope.global = Global;
   
  PageDetailService.setTitle('About Us | Offercrunch ');
  PageDetailService.setMetaDescription('Offercrunch - All the best online offers in one place. Televisions, laptops, cameras, tablets. Up to 50% off big name brands from major UK retailers.');

}]);