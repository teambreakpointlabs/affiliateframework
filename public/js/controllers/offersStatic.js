'use strict';

angular.module('mean.system').controller('OffersStaticController', ['$scope', 'Global','PageDetailService','Breadcrumbs', function($scope, Global, PageDetailService,Breadcrumbs) {
  $scope.global = Global;
  $scope.breadcrumbs = Breadcrumbs.getBreadcrumbs();

  PageDetailService.setTitle('Choose From Television, Laptop, Tablet and Camera Offers | Offercrunch ');
  PageDetailService.setMetaDescription('Select the offers you want to browse. Choose from thousands of television, laptop, tablet and camera offers.');

}]);