angular.module('mean.system').controller('OffersController', ['$scope','Offers','$stateParams','FilterHelperService','Data','PageDetailService','$location','UrlHelperService',function($scope, Offers, $stateParams,FilterHelperService,Data,PageDetailService,$location,UrlHelperService){
  //sync to data service
  $scope.data = Data;

  var urlObj = UrlHelperService.processUrl($stateParams);

  var type = urlObj.type;
  var brand = urlObj.brand;
  var gender = urlObj.gender;
  var category = urlObj.category;


  $scope.offerType = type;

  $scope.isLoaded = false;
  $scope.showItems = 9;
  $scope.showExtraItems = 6;
  $scope.sortedValue = '';
  $scope.message = '';

  $scope.scrollTo = function(id) {
    window.scrollTo(0, 0);
  };

  /** this appends more items to view **/
  $scope.showMoreItems = function(){
    $scope.showItems += 6;
  }
   
  $scope.find = function() {
    PageDetailService.setPageDetail(type, $stateParams.brand);
    var search = searchFromFilterData();
    console.log('searching for ');
    console.log(search);
    Offers.getOffers(search).then(function(offers){
      $scope.offers = offers;
      $scope.isLoaded = true;
      if ($scope.offers.length == 0){
        $scope.message = "No Offers Found.";
      }
      window.prerenderReady = true;

    });
  };

  $scope.findOne = function(){
    $scope.isLoaded = false;
    console.log('searching for offer...' + $stateParams.urlDesc);
    Offers.findByUrlDesc($stateParams.urlDesc).then(function(offer){
      $scope.offer = offer;
      console.log(offer);
      if (!offer.err){
        console.log('offer found');
        var capitaliseType = $stateParams.type.charAt(0).toUpperCase() + $stateParams.type.slice(1);
        PageDetailService.setTitle(offer.pricing.pctSavings + '% Off! ' + offer.description + ' | ' + capitaliseType + ' Offer | Offercrunch');
        PageDetailService.setMetaDescription(offer.description);
        $scope.isLoaded = true;
        window.prerenderReady = true;
      }else{
        console.log('offer not found');
        $location.path("/offers/"+ $stateParams.type);
      }
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
      $scope.showItems = 9;
    });
  });
  
  /** get current state of filter data and update offers **/
  function searchFromFilterData(){

    var filterMinMax = $scope.data.filters[type];
    var priceMax = filterMinMax.priceMax;
    var priceMin = filterMinMax.priceMin;
    var gender = $stateParams.gender;
    if (!gender){
    var brands = $scope.data.selectedBrands[type];
    var retailers = $scope.data.selectedRetailers[type];

    //if no selected brands/retailers pass them all
    if (!brands.length) brands = $scope.data.brands[type];
    if (!retailers.length) retailers = $scope.data.retailers[type];
    }else{
    var brands = $scope.data.selectedBrands[gender][type];
    var retailers = $scope.data.selectedRetailers[gender][type];

    //if no selected brands/retailers pass them all
    if (!brands.length) brands = $scope.data.brands[gender][type];
    if (!retailers.length) retailers = $scope.data.retailers[gender][type];
   }

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
    if (category == 'fashion'){
      search.gender = urlObj.gender;
    }


    return search;
  }

  function searchRelated(){
    var searchObj = searchFromFilterData();
    searchObj.brands = [urlObj.brand];
    searchObj.type = urlObj.type;
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