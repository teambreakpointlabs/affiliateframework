angular.module('mean.system').factory('Data',['$stateParams', function($stateParams){
	
	var brands = {
		television: ['aqualite','cello','lg','panasonic','toshiba','philips','sharp','samsung', 'jvc','sony','hitachi'],
    laptop:['acer','asus','apple','hp','lenovo','samsung','sony','toshiba'],
    camera:['fujifilm', 'nikon', 'canon','panasonic'],
    tablet:['apple','microsoft','nook','lenovo']
	}
  var retailers = {
  	television:['argos','currys','littlewoods','direct tvs','selfridges', 'coop electrical'],
  	laptop:['argos','currys','littlewoods','coop electrical','laptops direct'],
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