'use strict';

angular.module('mean.system').controller('SearchController', ['$scope', 'Global','Offers','$location','$rootScope','Breadcrumbs', function ($scope, Global,Offers,$location,$rootScope,Breadcrumbs) {
  $scope.global = Global;
  
  $scope.breadcrumbs = Breadcrumbs.getBreadcrumbs();

    $scope.submit = function(){
      console.log('clicked');
      $location.search('searchText',$scope.searchText).path('/search');
    };
  


}]);