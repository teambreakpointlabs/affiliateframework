'use strict';

//Articles service used for articles REST endpoint
angular.module('mean.articles').factory('Articles', ['$http',function($http) {
  return{
    getArticles:  function getArticles(){
      return $http.get('/api/articles').then(function(result){
    	  return result.data;
      });
    },
    getArticleById:  function getArticleById(id){
      return $http.get('/api/articles/'+id).then(function(result){
    	  return result.data;
      });
    }
  }
}]);