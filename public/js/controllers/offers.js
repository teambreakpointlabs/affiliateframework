angular.module('mean.system').controller('OffersController', ['$scope','Offers','$stateParams','FilterHelperService','Data', function($scope, Offers, $stateParams,FilterHelperService,Data){
 
  $scope.data = Data;
  $scope.offerType = $stateParams.type;
  
  $scope.find = function() {
    Offers.getOffers(searchFromFilterData()).then(function(offers){
      $scope.offers = offers;
    });
  };

  $scope.$on('updateOffers', function(event) {
    Offers.getOffers(searchFromFilterData()).then(function(offers){
      $scope.offers = offers;
    });
  });

  function searchFromFilterData(){

    var type = $stateParams.type;
    var filterMinMax = Data.filters[type];
    var priceMax = filterMinMax.priceMax;
    var priceMin = filterMinMax.priceMin;
    var brands = Data.selectedBrands[type];
    var retailers = Data.selectedRetailers[type];

    //if no selected brands/retailers pass them all
    if (!brands.length) brands = Data.brands[type];
    if (!retailers.length) retailers = Data.retailers[type];

    //make search object
    var search = {
      type: type,
      priceMin: priceMin,
      priceMax: priceMax,
      brands: brands,
      retailers: retailers
    };

    //append screen size params if needed
    if (type == 'television' || type == 'laptop'){
      search.screenMax = filterMinMax.screenMax;
      search.screenMin = filterMinMax.screenMin;
    }

    return search;
  }


}]);