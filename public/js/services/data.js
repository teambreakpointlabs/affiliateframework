angular.module('mean.system').factory('Data',['$stateParams', function($stateParams){
	
	var brands = {
		television: ['lg', 'samsung', 'jvc'],
    laptop:['samsung', 'panasonic', 'sony'],
    camera:['fujifilm', 'nikon', 'canon'],
    tablet:['apple','nook','lenovo']
	}
  var retailers = {
  	television:['argos','currys','littlewoods'],
  	laptop:['argos','currys','littlewoods'],
  	camera:['argos','currys','littlewoods'],
  	tablet:['argos','currys','littlewoods']
  };
  
  var selectedRetailers = {
  	television:[],
  	laptop:[],
  	camera:[],
  	tablet:[]
  };
  var selectedBrands = {
  	television:[],
  	laptop:[],
  	camera:[],
  	tablet:[]
  }
  var filters = {
  	television:{
	        priceMin: 0,
	        priceMax: 5000,
	        screenMin: 0,
	        screenMax: 80
	      },
	      laptop:{
	        priceMin: 0,
	        priceMax: 3000,
	        screenMin: 0,
	        screenMax: 30
	      },
	      tablet:{
	        priceMin: 0,
	        priceMax: 1000
	      },
	      camera:{
	        priceMin: 0,
	        priceMax: 3000
	      }
  }

	  return{
      brands:brands,
      retailers:retailers,
      selectedBrands:selectedBrands,
      selectedRetailers:selectedRetailers,
      filters: filters
    }     
}]);