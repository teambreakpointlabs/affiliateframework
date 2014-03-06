angular.module('mean.system').factory('Offers', ['$http', function($http){
  return{
    getOffers: function getOffers(search){
      console.log('searching');
      console.log(search);
      return $http.get('/api/offers',{params: search}).then(function(result){
        console.log(result);
        return result.data;
      });
    }
  }
}]);