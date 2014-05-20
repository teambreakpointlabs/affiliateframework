'use strict';

angular.module('mean.system').controller('BlogsController', ['$scope', 'Global','PageDetailService','Breadcrumbs', function($scope, Global, PageDetailService,Breadcrumbs) {
  $scope.global = Global;
  $scope.breadcrumbs = Breadcrumbs.getBreadcrumbs();

  PageDetailService.setTitle('Recommended Money Saving Blogs | Offercrunch ');
  PageDetailService.setMetaDescription('A list of recommend money saving blogs with some great offers and tips on how to save money.');

}]);