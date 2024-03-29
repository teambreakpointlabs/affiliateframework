angular.module('mean.system').controller("FilterController",['$scope','$stateParams','FilterHelperService','Data','UrlHelperService','Users', function($scope, $stateParams,FilterHelperService,Data,UrlHelperService,Users){
  
  var urlObj = UrlHelperService.processUrl($stateParams);

  var type = urlObj.type;
  var brand = urlObj.brand;
  var gender = urlObj.gender;

  //sync services
  $scope.filterDataService = FilterHelperService;
  $scope.data = Data;
  
  //set up filter
  $scope.filterVisible = true;
  $scope.filterType = type;
  

  $scope.unselectedRetailers = $scope.data.retailers[type];
  $scope.unselectedBrands =  $scope.data.brands[type];
  $scope.selectedRetailers = $scope.data.selectedRetailers[type];
  $scope.selectedBrands = $scope.data.selectedBrands[type];

  $scope.filters = $scope.data.filters;

  
  //append brand to filter data if needed before offers retrieved
  getBrandFromUrl();
  updateFilterDisplayText();

  function updateFilterDisplayText(){
   $scope.filterDisplayText = $scope.filterVisible ? 'hide filter' : $scope.filterDisplayText = 'show filter';
  }

  //tell offers controller to update offers
  $scope.submit = function(){
    $scope.$broadcast('updateOffers');
  };

  $scope.submitMobile = function(){
    $scope.$broadcast('updateOffers');
    $scope.filterVisible = false;
    updateFilterDisplayText();
  };

  $scope.click = function(){
    $scope.filterVisible = !$scope.filterVisible;
    updateFilterDisplayText();
  }

  function getBrandFromUrl(){    
    var brand, index, isBrandFound;
    brand = urlObj.brand;
    index = -1;
    isBrandFound = false;
    if (brand) {
      for (var i = 0; i<$scope.unselectedBrands.length;i++){
        if ($scope.unselectedBrands[i] == brand){
          index = i;
          isBrandFound = true;
        }
      }
      if (isBrandFound){
        $scope.selectedBrands.push(brand);
        $scope.unselectedBrands.splice(index,1);
      }else{
        //static 404 page ??
      }
    }
  }

  function validateEmail(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  } 

  $scope.submitEmail = function(email){
    console.log(validateEmail(email));
    if (!validateEmail(email)){
      alert('Please enter a valid email address.');
    }else{
     Users.submitEmail(email,urlObj.type,urlObj.gender).then(function(result){
       if(result.message=='success'){
         console.log('email submitted successfully');
          alert('Thank you for submitting your email address for ' + urlObj.type + ' offers!');
       }else if (result.message=='email invalid'){
        alert('Your email address is invalid');
       }else{
        alert('Your email address already exists for ' + urlObj.type + ' offers!' );
       }
     });
    }
    this.email = '';
  };

}]);