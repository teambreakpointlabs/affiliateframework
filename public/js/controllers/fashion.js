'use strict';

angular.module('mean.system').controller('FashionController', ['$scope', 'Global','PageDetailService', function ($scope, Global, PageDetailService) {
  $scope.global = Global;
   
  PageDetailService.setTitle('Men’s & Women’s Fashion Offers From UK Retailers | Offercrunch');
  PageDetailService.setMetaDescription("Choose from thousands of fashion offers from UK retailers. A massive range of men's and women's fashion from Asos, House of Fraser, Gant and many more. View the latest fashion offers right now at offercrunch.");

}]);