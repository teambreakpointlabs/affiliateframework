angular.module('mean.system').controller("FilterController",['$scope','$stateParams','FilterHelperService','Data', function($scope, $stateParams,FilterHelperService,Data){
  
  var type = $stateParams.type;
  var brand = $stateParams.brand;

  $scope.filterDataService = FilterHelperService;
  $scope.data = Data;
  
  $scope.filterVisible = true;
  $scope.filterType = type;


  $scope.unselectedRetailers = Data.retailers[type];
  $scope.unselectedBrands = Data.brands[type];
  $scope.selectedRetailers = Data.selectedRetailers[type];
  $scope.selectedBrands = Data.selectedBrands[type];
  $scope.filters = Data.filters;

  getBrandFromUrl();

  $scope.submit = function(){
    $scope.$broadcast('updateOffers');
  };

  function getBrandFromUrl(){
    var type, brand;
    type = $stateParams.type;
    brand = $stateParams.brand;
    
    if (brand) {
      $scope.selectedBrands.push(brand);
      index = -1;
      for (var i = 0; i<$scope.unselectedBrands.length;i++){
        if ($scope.unselectedBrands[i] == brand){
          index = i;
        }
      }
      $scope.selectedBrands.splice(index,1);
    }

    return;
  }

}]);