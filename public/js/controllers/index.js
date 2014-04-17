'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', 'Global','PageDetailService','Users', function ($scope, Global, PageDetailService,Users) {
  $scope.global = Global;
  $scope.showOptions = false;
  $scope.selectedEmailType = {"type":"Televisions"};
    $scope.emailTypes = [
    {"type":"Televisions"},
    {"type":"Laptops"},
    {"type":"Tablets"},
    {"type":"Cameras"}
  ];
  $scope.emailAddress = '';
  PageDetailService.setTitle('Offercrunch | TVs, Laptops, Tablets, Cameras, Fashion | Online Offers UK');
  PageDetailService.setMetaDescription('Choose from thousands of the best online offers from UK retailers at offercrunch - save money on televisions, laptops, tablets, cameras and men’s & women’s fashion.');  

  
  function validateEmail(email) { 
  	// console.log(email);
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  } 

  $scope.submitEmail = function(){
    var typeOfSubmit = $scope.selectedEmailType.type;
    var emailAddress = $scope.emailAddress;
    if (!validateEmail(emailAddress)){
      alert('Please enter a valid email address.');
    }else{
    	var type = typeOfSubmit.toLowerCase();
    	var singularType = type.substring(0,type.length-1);
    	addEmail(singularType, emailAddress);
    }
    this.emailAddress = '';
  };

  function addEmail(type, emailAddress){
  	Users.submitEmail(emailAddress, type).then(function(result){
  		if (result.message =='success'){
  	      alert('Thank you for submitting your email address for ' + type + ' offers!');
  		} else if (result.message=='email invalid'){
            alert('Your email address is invalid');
        } else{
            alert('Your email address already exists for ' + type + ' offers!' );
        }
  	});
  }

}]);