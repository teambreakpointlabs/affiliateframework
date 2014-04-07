angular.module('mean.system').factory('Data',['$stateParams', function($stateParams){
	
	var brands = {
		television: ['aqualite','bush','cello','lg','panasonic','toshiba','philips','sharp','samsung', 'jvc','sony','hitachi','digihome','logik','sandstrom','jmb','luxor'],
    laptop:['advent','acer','asus','apple','dell','gigabyte','fujitsu','msi','hp','lenovo','samsung','sony','toshiba','packard bell'],
    camera:['fujifilm', 'nikon', 'canon','panasonic','olympus','samsung','vivitar','pentax','polaroid'],
    tablet:['acer','samsung','sony','archos','toshiba','kobo','hp','arnova','prestigio','gemini','asus','google','apple','microsoft','nook','lenovo'],
	  women: {
      shoe:['aldo','ash','asos','bellfield','bertie','birkenstock','bronx','calvin klein','carvela','cheap monday','clarks','converse','dkny','dr martens','dune','faith','fred perry','ganni','gola','hudson','havaianas','hunter','juju','karen millen','keds','kurt geiger','lacoste','le coq sportif','love moschino','mango','melissa','miista','monki','new balance','new look','nike','oasis','onitsuka','pieces','pull&bear','puma','report signature','river island','roxy','sam edelman','saucony','senso','shellys london','shoesissima','steve madden','supra','swedish hasbeens','ted baker','timberland','toms','vagabond','vans','vivienne westwood','whistles','won hundred','wood wood','ymc','yru'],
      shirt:['test']
    },
    men:{
      shoe:['adidas','aldo','anthony miles','antoine and stanley','asos','barbour','base london','beck & hersey','bellfield','ben sherman','bobbies','boxfresh','buttero','cat','converse','creative recreation','crosshatch','diesel','dolce & gabbana','dune','feud','firetrap','base','frank wright','fred perry','gola','gourmet','grenson','hudson','homeys','hugo boss','hummel','hush puppies','hype','jack & jones','jeffery west','kurt geiger','lacoste','le coq sportif','loake','marc jacobs','new balance','new look','nike','onitsuka','tiger','paul smith','ralph lauren','pony','pull&bear','puma','quiksilver','reiss','religion','river island','rock & revival','rokin','rolando sturlini','selected','shoe the bear','skive','soulland','supra','ted baker','the north face','timberland','trickers','underground','vans','vivienne westwood','xti','ymc'],
      shirt:['']
    }
  }

  var retailers = {
  	television:['argos','currys','littlewoods','direct tvs','selfridges', 'coop electrical','john lewis'],
  	laptop:['argos','currys','littlewoods','coop electrical','laptops direct'],
  	camera:['argos','currys','littlewoods','jessops'],
  	tablet:['argos','currys','littlewoods'],
    women:{
      shoe:['asos'],
      shirt:['']
    },
    men:{
      shoe:['asos'],
      shirt:['']
    }
  };
  
  var selectedRetailers = {
  	television:[],
  	laptop:[],
  	camera:[],
  	tablet:[],
    women:{
      shoe:[],
      shirt:[]
    },
    men:{
      shoe:[],
      shirt:[]
    }
  };
  var selectedBrands = {
  	television:[],
  	laptop:[],
  	camera:[],
  	tablet:[],
    men:{
      shoe:[],
      shirt:[]
    },
    women:{
      shoe:[],
      shirt:[]
    }
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
	  },
    shoe:{
      priceMin: 0,
      priceMax: 1000
    },
    shirt:{
      priceMin:0,
      priceMax: 1000
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