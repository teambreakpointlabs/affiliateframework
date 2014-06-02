angular.module('mean.system').factory('Posts', ['$http', function($http){
  return{
    getPosts: function(){
      return $http.get('/api/posts').then(function(result){
      	return result.data;
      });
    }
  }
}]);