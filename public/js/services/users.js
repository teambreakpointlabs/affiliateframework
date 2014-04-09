angular.module('mean.system').factory('Users', ['$http', function($http){
   // var findByUrlDescAndGender = function findOfferByUrlDescAndGender(urlDesc,gender){
   //    return $http.get('/api/offer/fashion/'+gender + '/' + urlDesc).then(function(result){
   //      return result.data;
   //    });
   //  }
  return{
    submitEmail: function submitEmail(email, type, gender){
      console.log('from service: submitEmail - ' + email + ', ' + type + ', ' + gender);
      var obj = {email: email, type:type};
      if (gender){
        obj.gender = gender;
      }
      return $http.post('/users/new',obj).then(function(result){
        console.log(result.data);
        return result.data;
      })
    }
  }
}]);