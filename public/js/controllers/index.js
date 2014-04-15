'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', 'Global','PageDetailService', function ($scope, Global, PageDetailService) {
  $scope.global = Global;
  $scope.showOptions = false;
   
  PageDetailService.setTitle('Offercrunch | TVs, Laptops, Tablets, Cameras, Fashion | Online Offers UK');
  PageDetailService.setMetaDescription('Choose from thousands of the best online offers from UK retailers at offercrunch - save money on televisions, laptops, tablets, cameras and men’s & women’s fashion.');  

}]);