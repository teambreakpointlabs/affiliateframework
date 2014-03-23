angular.module('mean.system').factory('Offers', ['$http', function($http){
  return{
    getOffers: function getOffers(search){
      console.log('searching');
      console.log(search);
      return $http.get('/api/offers',{params: search}).then(function(result){
        return result.data;
      });
    },
    findByUrlDesc: function findOfferByUrlDesc(urlDesc){
      console.log('finding offer');
      return $http.get('/api/offer/'+ urlDesc).then(function(result){
        return result.data;
      });
    }
  }
}]);