'use strict';

angular.module('mean.system').controller('SearchController', ['$scope', 'Offers','Breadcrumbs','Search','Utils', '$location','$state', function($scope,Offers,Breadcrumbs,Search,Utils,$location,$state) {

  /** get breadcrumbs **/
  $scope.breadcrumbs = Breadcrumbs.getBreadcrumbs();
  
  /** sync search service to scope **/
  $scope.search = Search.search;


  /** run on load **/
  var searchOffers = function(query){
    var offers = [];
    if (query !== ''){
    Offers.searchDescriptionText(query).then(function(result){
      //build offers from result obj that mongoose text search returns
      for (var i=0;i<result.length;i++){
        offers.push(result[i].obj);
      }
      $scope.offers = offers;
      /** set loaded to true and update offer display text **/
      $scope.isLoaded = true;
      $scope.offerWord = $scope.offers.length == 1 ? 'offer found' : 'offers found';
    });
    }else{
      $scope.offers = [];
      $scope.isLoaded = true;
    }
  }

  
  
  /** not loaded and initial items to display **/
  $scope.isLoaded = false;
  $scope.showItems = 6;

  searchOffers($scope.search.query);
 


  $scope.showMoreItems = function(){
    $scope.showItems += 6;
  }

  $scope.scrollTo = function(){
  	Utils.scrollTo();
  }
  

}]);
