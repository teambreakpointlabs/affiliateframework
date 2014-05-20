'use strict';

angular.module('mean.system').controller('HeaderController', ['$scope', 'Search', '$location','$state', function($scope, Search, $location,$state) {
    $scope.search = Search;
    
    $scope.searchOffers = function(query){
      Search.search.query = query;
      $location.path() !== '/search' ? $location.path('/search') : $state.go($state.$current, null, { reload: true });
    };

}]);