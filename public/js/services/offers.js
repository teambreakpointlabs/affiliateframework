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
    getRelatedOffers:function getRelatedOffers(offer){
      return $http.get('/api/offer/related/'+offer.type+'/'+offer.brand).then(function(result){
        return result.data;
      });
    },
    findByUrlDesc: function findOfferByUrlDesc(urlDesc){
      return $http.get('/api/offer/'+ urlDesc).then(function(result){
        return result.data;
      });
    },
    findOfferStats: function findOfferStats(url){
      var urlEncoded = encodeURIComponent(url);
      return $http.get('/api/offer/stats/'+urlEncoded).then(function(result){
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