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
    var type, brand, index, isBrandFound;
    type = $stateParams.type;
    brand = $stateParams.brand;
    index = -1;
    isBrandFound = false;
    if (brand) {
      for (var i = 0; i<$scope.unselectedBrands.length;i++){
        if ($scope.unselectedBrands[i] == brand){
          index = i;
          isBrandFound = true;
        }
      }
      if (isBrandFound){
        $scope.selectedBrands.push(brand);
        $scope.unselectedBrands.splice(index,1);
      }else{
        //static 404 page ??
      }
    }
  }
}]);