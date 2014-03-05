angular.module('mean.system').controller("FilterController", function($scope){

  $scope.filterVisible = true;

  //from database
  var brands = [
    'samsung',
    'panasonic',
    'sony'
  ];

   //from database
  var retailers = [
  'currys',
  'argos',
  'littlewoods'
  ];

  $scope.unselectedRetailers = retailers;

  $scope.selectedRetailers = [
  ];

  $scope.unselectedBrands = brands;

  $scope.selectedBrands = [
  ];

  $scope.retailers = retailers;


   var filters = {
       television:{
           priceMin: 0,
           priceMax: 5000,
           screenMin: 0,
           screenMax: 80
       },
       laptop:{
           priceMin: 0,
           priceMax: 3000,
           screenMin: 0,
           screenMax: 30
       },
       tablet:{
           priceMin: 0,
           priceMax: 1000
       },
       camera:{
           priceMin: 0,
           priceMax: 3000
       }
   }

   $scope.filters = filters;

});