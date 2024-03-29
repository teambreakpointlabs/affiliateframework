angular.module('mean.system').controller('OffersController', ['$scope','Offers','$stateParams','FilterHelperService','Data','PageDetailService','$location','UrlHelperService','Breadcrumbs','$timeout',function($scope, Offers, $stateParams,FilterHelperService,Data,PageDetailService,$location,UrlHelperService,Breadcrumbs,$timeout){
  //sync to data service
  $scope.data = Data;
  $scope.breadcrumbs = Breadcrumbs.getBreadcrumbs();

  var urlObj = UrlHelperService.processUrl($stateParams);

  var type = urlObj.type;
  var brand = urlObj.brand;
  var gender = urlObj.gender;
  var category = urlObj.category;

  $scope.offerType = type;

  $scope.isLoaded = false;
  $scope.showItems = 24;
  $scope.showExtraItems = 12;
  $scope.sortedValue = '';
  $scope.message = '';

  $scope.scrollTo = function(id) {
    window.scrollTo(0, 0);
  };

  /** this appends more items to view **/
  $scope.showMoreItems = function(){
    $scope.showItems += 6;
  }

  $scope.showSearch = function(){
    //removeIndexBlock();
    $scope.isLoaded = false;
    console.log($location.$$search.searchText);
    $scope.searchText = $location.$$search.searchText;
    Offers.searchDescriptionText($location.$$search.searchText).then(function(offers){
      $scope.offers = [];
      //build offers from result obj
      for (var i=0;i<offers.length;i++){
        $scope.offers.push(offers[i].obj);
      }
      $scope.isLoaded = true;
      $scope.offerWord = $scope.offers.length == 1 ? 'offer found' : 'offers found';
      
    });
  }
  $scope.search = function(searchText){
     $scope.isLoaded = false;
     Offers.searchDescriptionText(searchText).then(function(offers){
      $scope.offers = [];
      //build offers from result obj
      for (var i=0;i<offers.length;i++){
        console.log(offers[i]);
        $scope.offers.push(offers[i].obj);
      }
      $scope.isLoaded = true;
      $scope.offerWord = $scope.offers.length == 1 ? 'offer found' : 'offers found';
      
    });

     $scope.searchText = searchText;
  }
   
  $scope.find = function() {
    PageDetailService.setListOffersTitleAndMeta($stateParams);
    Offers.getOffers(searchFromFilterData()).then(function(offers){
      $scope.offers = offers;
      $scope.isLoaded = true;
      if ($scope.offers.length == 0){
        $scope.message = "No Offers Found.";
      }
      $scope.offerWord = $scope.offers.length == 1 ? 'offer' : 'offers';
      window.prerenderReady = true;
    });
  };

  $scope.initIndividualOffer = function(){
    findOne();
    findOfferStats();
    findRelated();
  }

  var findOne = function(){
    $scope.offerIsLoaded = false;
    Offers.findByUrlDesc($stateParams.urlDesc).then(function(offer){
      $scope.offer = offer;
      if (!offer.err){
        //var timestamp = offer._id.toString().substring(0,8);
       // console.log(new Date( parseInt( timestamp, 16 ) * 1000 ));
       PageDetailService.setIndividualTitleAndMeta(offer);
        $scope.offerIsLoaded = true;
      }else{
        console.log('offer not found');
      }
   });
  }

  var findRelated = function() {
    console.log('finding related');
    Offers.getOffers(searchRelated()).then(function(offers){
      $scope.offers = offers;
      $scope.isLoaded = true;
      if ($scope.offers.length == 0){
        $scope.message = "No Offers Found.";
      }
    });
  };

  $scope.findTopOffers = function(offertype){
  $scope.isLoaded = false;
  console.log(offertype);
  Offers.getOffers({type:offertype}).then(function(offers){
      console.log(offers);
      $scope.offers = offers;
      $scope.isLoaded = true;
      $scope.offerWord = $scope.offers.length == 1 ? 'offer found' : 'offers found';
    });
  }

  
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

  function noIndex(){
      var meta = document.createElement('meta');
      meta.name = "robots";
      meta.content = "noindex";
      document.getElementsByTagName('head')[0].appendChild(meta);
  }

  function removeIndexBlock(){
    $('meta[name=robots]').remove();
  }


}]);