angular.module('mean.system').factory('Users', ['$http', function($http){
  return{
    submitEmail: function submitEmail(email, type, gender){
      var obj = {email: email, type:type};
      //fashion offer
      if (gender){
        obj.gender = gender;
      }
      return $http.post('/users/new',obj).then(function(result){
        return result.data;
      })
    }
  }
}]);