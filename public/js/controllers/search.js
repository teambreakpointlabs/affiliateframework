'use strict';

angular.module('mean.system').controller('SearchController', ['$scope', 'Global','Offers','$location','$rootScope', function ($scope, Global,Offers,$location,$rootScope) {
  $scope.global = Global;
  
  console.log('loaded search controller');

    $scope.submit = function(){
      console.log('clicked');
      $location.search('searchText',$scope.searchText).path('/search');
    };
  


}]);