angular.module('mean.system').controller('IndividualOfferController', ['$scope','Offers','$stateParams','FilterHelperService','Data','PageDetailService','$location','UrlHelperService','Breadcrumbs','$timeout',function($scope, Offers, $stateParams,FilterHelperService,Data,PageDetailService,$location,UrlHelperService,Breadcrumbs,$timeout){

  $scope.breadcrumbs = Breadcrumbs.getBreadcrumbs();

  $scope.offerIsLoaded = false;
  $scope.offer = null;
  $scope.offerStats = null;

  var loadOffer = function(){
    return Offers.findByUrlDesc($stateParams.urlDesc).then(function(offer){
      if (!offer.err){
        $scope.offer = offer;
        PageDetailService.setIndividualTitleAndMeta(offer);
        $scope.offerIsLoaded = true;
        return offer;
      }else{
        //tidy up
        $location.path('/');
        alert('We could not find that offer. Have a look at the other great offers on the site!');
      }
    });
  }
  ,loadRelated = function(offer) {
    return Offers.getRelatedOffers(offer).then(function(offers){
      
      $scope.offers = offers;
      
      if ($scope.offers.length == 0){
        $scope.message = "No Offers Found.";
      }
      return offer.url.product;
  });
  }
  ,loadStats = function(url){
    $scope.lowestPrice = -1;
    $scope.highestPrice = -1;
    
    var offerStats = [];
    //unique prices - we only want unique prices to display
    var uniquePrices = [];
    var lowPrice = -1;
    var highPrice = -1;

    return Offers.findOfferStats(url).then(function(offers){
      for (var i=0;i<offers.length;i++){
        
        var priceToCompare = offers[i].pricing.offer;
        
        //check if this price is duplicated
        var duplicate = false;
        for (var j=0;j<uniquePrices.length;j++){
          if (uniquePrices[j] == priceToCompare){
            duplicate = true;
          }
        }
        //ignore if duplicate
        if (duplicate) continue;

        //not duplicated so add to unique prices array
        uniquePrices.push(priceToCompare);

        if (i==0) {
          lowPrice = offers[i].pricing.offer;
          highPrice = offers[i].pricing.offer;
        }

        lowPrice = priceToCompare <= lowPrice ? priceToCompare : lowPrice;
        highPrice = priceToCompare >= highPrice ? priceToCompare : highPrice;
        
        //grab date and price
        var timestamp = offers[i]._id.toString().substring(0,8);
        date = new Date( parseInt( timestamp, 16 ) * 1000 );
    
        var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        dateString = monthNames[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear();

        var dateAndPrice = {
          price: offers[i].pricing.offer,
          date: dateString
        }
        offerStats.push(dateAndPrice);
      }
      $scope.lowestPrice = lowPrice;
      $scope.highestPrice = highPrice;
      $scope.offerStats = offerStats;
      return offerStats;
   });
  },
  loadGraph = function(offerStats){
    if (offerStats.length > 1){
      var svg = dimple.newSvg(".plotGraph", 800,600);
      var chart = new dimple.chart(svg, offerStats);
      chart.addCategoryAxis("x", "date");
      chart.addMeasureAxis("y", "price");
      chart.addSeries(null, dimple.plot.line);
      chart.draw();
    }
  }

  loadOffer()
  .then(loadRelated)
  .then(loadStats)
  .then(loadGraph)

}]);