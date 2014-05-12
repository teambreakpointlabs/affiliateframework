angular.module('mean.system').factory('Offers', ['$http', function($http){
  return{
    getOffers: function getOffers(search){
      return $http.get('/api/offers',{params: search}).then(function(result){
        return result.data;
      });
    },
    getTopOffers: function getTopOffers(){
      return $http.get('/api/topOffers').then(function(result){
        return result.data;
      });
    },
    findByUrlDesc: function findOfferByUrlDesc(urlDesc){
      return $http.get('/api/offer/'+ urlDesc).then(function(result){
        return result.data;
      });
    },
    findOfferStats: function findOfferStats(urlDesc){
      return $http.get('/api/offer/stats/'+urlDesc).then(function(result){
        return result.data;
      });
    },
    searchDescriptionText: function searchDescriptionText(searchString){
      return $http.get('/api/offer/search/'+searchString).then(function(result){
        console.log(result);
        return result.data.results;
      });
    }
  }
}]);