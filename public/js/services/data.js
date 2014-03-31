angular.module('mean.system').factory('Data',['$stateParams', function($stateParams){
	
	var brands = {
		television: ['aqualite','bush','cello','lg','panasonic','toshiba','philips','sharp','samsung', 'jvc','sony','hitachi','digihome','logik','sandstrom','jmb','luxor'],
    laptop:['advent','acer','asus','apple','dell','gigabyte','fujitsu','msi','hp','lenovo','samsung','sony','toshiba','packard bell'],
    camera:['fujifilm', 'nikon', 'canon','panasonic','olympus','samsung','vivitar','pentax','polaroid',],
    tablet:['acer','samsung','sony','archos','toshiba','kobo','hp','arnova','prestigio','gemini','asus','google','apple','microsoft','nook','lenovo']
	}
  var retailers = {
  	television:['argos','currys','littlewoods','direct tvs','selfridges', 'coop electrical','john lewis'],
  	laptop:['argos','currys','littlewoods','coop electrical','laptops direct'],
  	camera:['argos','currys','littlewoods','jessops'],
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