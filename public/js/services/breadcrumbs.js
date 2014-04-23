'use strict';
angular.module('mean.system').factory('Breadcrumbs', ['$http','$rootScope','$location',function($http, $rootScope,$location) {
  
  var breadcrumbs = [];
  
  var getCurrentState = function(){
    console.log('getting current state'); 
    var pathElements = $location.path().split('/'), result = [], i;
    console.log(pathElements); 
    var breadcrumbPath = function (index) {
      return '/' + (pathElements.slice(0, index + 1)).join('/');
    };

    pathElements.shift();
    for (i=0; i<pathElements.length; i++) {
      result.push({name: pathElements[i], path: breadcrumbPath(i)});
    }
      breadcrumbs = result;
  }

  return{
    getBreadcrumbs: function getBreadcrumbs(){
      getCurrentState();
      return breadcrumbs;
    }
  }

}]);