angular.module('mean.system').factory('Search',['Offers',function(Offers,$scope){
  
  var search = {
  	query: ''
  };

  return {
  	search : search
  }
}]);