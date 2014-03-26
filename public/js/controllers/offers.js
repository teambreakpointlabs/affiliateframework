angular.module('mean.system').controller('OffersController', ['$scope','Offers','$stateParams','FilterHelperService','Data','PageDetailService', function($scope, Offers, $stateParams,FilterHelperService,Data,PageDetailService){
  
  //sync to data service
  $scope.data = Data;
  //get type from params
  $scope.offerType = $stateParams.type;

  $scope.isLoaded = false;
  $scope.showItems = 9;
  $scope.showExtraItems = 6;
  $scope.sortedValue = '';
  $scope.message = '';

  /** this appends more items to view **/
  $scope.showMoreItems = function(){
    $scope.showItems += 6;
  }
   
  $scope.find = function() {
    PageDetailService.setPageDetail($stateParams.type);
    Offers.getOffers(searchFromFilterData()).then(function(offers){
      $scope.offers = offers;
      $scope.isLoaded = true;
      if ($scope.offers.length == 0){
        $scope.message = "No Offers Found.";
      }
    });
  };

  $scope.findOne = function(){
    Offers.findByUrlDesc($stateParams.urlDesc).then(function(offer){
      $scope.offer = offer;
      $scope.isLoaded = true;
    });
  }

  $scope.findRelated = function() {
    Offers.getOffers(searchRelated()).then(function(offers){
      $scope.offers = offers;
      $scope.isLoaded = true;
      if ($scope.offers.length == 0){
        $scope.message = "No Offers Found.";
      }
    });
  };

  
  /** when filter fires updateOffers run this **/
  $scope.$on('updateOffers', function(event) {
    $scope.isLoaded = false;
    Offers.getOffers(searchFromFilterData()).then(function(offers){
      $scope.offers = offers;
      $scope.isLoaded = true;
    });
  });
  
  /** get current state of filter data and update offers **/
  function searchFromFilterData(){

    var type = $stateParams.type;
    var filterMinMax = $scope.data.filters[type];
    var priceMax = filterMinMax.priceMax;
    var priceMin = filterMinMax.priceMin;
    var brands = $scope.data.selectedBrands[type];
    var retailers = $scope.data.selectedRetailers[type];

    //if no selected brands/retailers pass them all
    if (!brands.length) brands = $scope.data.brands[type];
    if (!retailers.length) retailers = $scope.data.retailers[type];

    //make search object
    var search = {
      type: type,
      priceMin: priceMin,
      priceMax: priceMax,
      brands: brands,
      retailers: retailers
    };

    //append screen size params to search object if needed
    if (type == 'television' || type == 'laptop'){
      search.screenMax = filterMinMax.screenMax;
      search.screenMin = filterMinMax.screenMin;
    }

    return search;
  }

  function searchRelated(){
    var searchObj = searchFromFilterData();
    searchObj.brands = [$stateParams.brand];
    searchObj.type = $stateParams.type;
    return searchObj;
  }
  
  //work around to hide dropdown if visible - move to directive
  if ($('.in').is(":visible")){
    $('.navbar-toggle').click();
  } 
  if ($('.intro').is(":visible")){
    $('.intro').addClass('appear');
  }
  
  //defaut sort
  setSortedValue('-pricing.pctSavings');
  $scope.choice = '% Off: High > Low';

  $scope.sortChoices = [
    "Price: Low > High",
    "Price: High > Low",
    "% Off: High > Low"
  ];
  
  //append screen size sorting options for tv and laptop
  if ($scope.offerType == 'television' || $scope.offerType == 'laptop'){
    $scope.sortChoices.push("Screen: Low > High");
    $scope.sortChoices.push("Screen: High > Low");
  }
  
  //handle sort choice
  $scope.sort = function(choice){
    $scope.choice = choice;
    switch(choice){
      case 'Price: Low > High':
      setSortedValue('pricing.offer');
      break;
      case 'Price: High > Low':
      setSortedValue('-pricing.offer');
      break
      case 'Screen: Low > High':
      setSortedValue('details.screenSize');
      break;
      case 'Screen: High > Low':
      setSortedValue('-details.screenSize');
      break;
      case '% Off: High > Low':
      setSortedValue('-pricing.pctSavings');
      break;
    }
  }

  function setSortedValue(value){
    $scope.sortedValue = value;
  }

}]);