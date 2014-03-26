angular.module('mean.system').controller("FilterController",['$scope','$stateParams','FilterHelperService','Data', function($scope, $stateParams,FilterHelperService,Data){
  
  var type = $stateParams.type;
  var brand = $stateParams.brand;
  
  //sync services
  $scope.filterDataService = FilterHelperService;
  $scope.data = Data;
  
  //set up filter
  $scope.filterVisible = true;
  $scope.filterType = type;

  $scope.unselectedRetailers = $scope.data.retailers[type];
  $scope.unselectedBrands = $scope.data.brands[type];
  $scope.selectedRetailers = $scope.data.selectedRetailers[type];
  $scope.selectedBrands = $scope.data.selectedBrands[type];
  $scope.filters = $scope.data.filters;
  
  //append brand to filter data if needed before offers retrieved
  getBrandFromUrl();
  updateFilterDisplayText();

  function updateFilterDisplayText(){
    if ($scope.filterVisible){
      $scope.filterDisplayText = 'hide filter';
    }else{
      $scope.filterDisplayText = 'show filter';
    }
  }

  //tell offers controller to update offers
  $scope.submit = function(){
    $scope.$broadcast('updateOffers');
  };
  $scope.submitMobile = function(){
    $scope.$broadcast('updateOffers');
    $scope.filterVisible = false;
    updateFilterDisplayText();
  };

  $scope.click = function(){
    console.log('click');
    $scope.filterVisible = !$scope.filterVisible;
    updateFilterDisplayText();
  }

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