angular.module('mean.system').factory('Data',['$stateParams', function($stateParams){
	
	var brands = {
		television: ['alba','aqualite','bush','cello','e-motion','lg','panasonic','toshiba','philips','sharp','samsung', 'jvc','sony','hitachi','digihome','logik','sandstrom','jmb','luxor','blaupunkt','foehn & hirsch','furrion','hannspree','technika'],
    laptop:['advent','acer','asus','apple','dell','fujitsu','hp','lenovo','samsung','sony','toshiba','packard bell','compaq','medion'],
    camera:['fujifilm', 'nikon', 'canon','panasonic','olympus','samsung','vivitar','pentax','polaroid','ricoh','sony'],
    tablet:['acer','samsung','sony','archos','toshiba','kobo','hp','arnova','prestigio','gemini','asus','google','apple','microsoft','nook','lenovo','kindle'],
	  women: {
      shoe:['aldo','ash','asos','bellfield','bertie','birkenstock','bronx','calvin klein','carvela','cheap monday','clarks','converse','dkny','dr martens','dune','faith','fred perry','ganni','gola','hudson','havaianas','hunter','juju','karen millen','keds','kurt geiger','lacoste','le coq sportif','love moschino','mango','melissa','miista','monki','new balance','new look','nike','oasis','onitsuka','pieces','pull&bear','puma','report signature','river island','roxy','sam edelman','saucony','senso','shellys london','shoesissima','steve madden','supra','swedish hasbeens','ted baker','timberland','toms','vagabond','vans','vivienne westwood','whistles','won hundred','wood wood','ymc','yru','anne klein','carvela','converse','dash','episode','fitflop','gabor','gandys','geox','gordon scott','head over heels ','hobbs','jane norman','jessica simpson','jones bootmaker','l.k. bennett','ralph lauren','linea','lipsy','lotus','mascotte','michael kors','miss kg','naturalizer','nine west','office','paul green','phase eight','pied a terre','planet','pretty ballerina','ravel','sam edelman','superga','toms','ugg','untold','van dal','vince camuto'],
      top:['18 and east','2nd day','7 for all mankind','71 stanton','a question of','a wear','adidas','alice & you','american apparel','american vintage','amplified','antipodium','aq aq','aqua','arrogant cat','aryn k','ashish','asos','ax paris','b side by wale','b+ab','b.young','ba&sh','back','band of gypsies','baum und pferdgarten','bellfield','beloved','bitching & junkfood','black secret','bolzoni & walsh','boulee','boutique by jaeger','boy london','brashy couture','brat & suzie','brave soul','zoe','bzr','hollywood made','carhartt','carmakoma','chalayan grey line','cheap monday','chinti and parker','club l','colorblock','costa blanca','criminal damage','current/elliott','d.ra','daisy street','darling','denham','ralph lauren','diesel','dimepiece','dress gallery','earth couture','edit','eleven paris','ellesse','elliot atkinson','emma cook','esprit','essentiel antwerp','evil twin','finders keepers','for love and lemons','freak of nature','free people','french connection','g-star','ganni','gestuz','band of outsiders','glamorous','goldie','goodie two sleeves','house of hackney','hilfiger','house of holland','illustrated people','influence','insight','iro','isabella oliver','jack wills','james perse','jarlo','jdy','jnby','joes jeans','jovonna','jovonnista','joyrich','joyrich','joystick junkies','juicy couture','junarose','junk food','just female','karen millen','kate thomas','katie judith','kill city','kiss the sky','lacoste','lacoste live','lashes of london','lavish alice','lazy oaf','les prairies de paris','levis','lipsy','liquorish','little mistress','little white lies','lna','louise amstrup','love','love & liberty','love moschino','love zooey','lovestruck','lucabella','lulu & co','lydia bright','maison scotch','mama.licious','mango','markus lupfer','max c london','meghan fabulous','mih jeans','mina','minimum','minkpink','monki','motel','mother of pearl','mr gugu & miss go','needle & thread','neon rose','new look','new look inspire','new look maternity','new look petite','new look tall','nike','noisy may','oasis','obey','oh my love','olivia rubin','one teaspoon','onepiece','only','ostwald helgason','other uk','paradis london','paul & joe sister','paul by paul smith','pencey','pencey standard','penfield','people tree','pepe jeans','peter jensen','pieces','pippa lynn','poor boy','pop boutique','pop cph','poppy lux','pull&bear','puma','quontum','rag & bone/jean','rare','reclaimed','religion','river island','roxy','rvca','sass & bide','sauce','see by chloe','see u soon','selected','selfish by forever unique','sessun','shackled','sick girl','skargorn','somedays','sonia by sonia rykiel','sophia kokosalaki','south parade','spijkers en spijkers','splendid','storm and marie','stussy','sugarhill boutique','taller than your average','ted baker','textile federation','the furies','the kooples sport','the style','the whitepepper','three floor','to love kuva','tokyo laundry','traffic people','true decadence','true decadence petite','twenty8twelve','twist & tango','twisted muse','ucla','ukulele','vero moda','vero moda very','vila','voodoo girl','wackerhaus','wal g','warehouse','whistles','white chocoolate','whitney eve','wildfox','wildfox white label','winter kate','wood wood','worn by','y.a.s','ymc','your eyes lie','yumi','zoe karssen','adrianna papell','aftershock','alexon','almari','anglomania','aquascutum','armani','atelier 61','awear','barbour','bench','biba','jaeger','cc','chervo','chesca','closet','coast','cutie','damsel in a dress','dash','day birger et mikkelsen','desigual','dickins & jones','east','eastex','episode','fenn Wright manson','finders keepers','gestuz','ginger fizz','glamorous','golfino','great plains','green lamb','hallhuber','helen mcAlinden','hobbs','hotsquash','iro','izabel london','jacques vert','jaeger','james lakeland','jane norman','john zack','jolie moi','kaliko','kenneth cole','kilian kerner senses','l.k. bennett','label lab','lands end','lashes','lijA','linea','liu jo','marella','mary portas','masters','maurie & eve','maxmara studio','michael kors','mint velvet','minuet petite','motel','negarin','neon rose','noisy may','oasis','olivia rubin','only','oui','paper dolls','phase eight','philosophy','pied a terre','ping','planet','precis petite','pussycat','quiz','religion','replay','reverse','rutzou','salsa','samya','sandwich','second female','selfish','smash','sodamix','st martins','suit female','superdry','taking shape','tfnc','the department','therapy','tommy hilfiger','true decadence','true religion','uttam boutique','vero moda','vila','viyella','Wal-g','Weekend maxmara','Whistles','White stuff','Windsmoor','Worn by','yanny london']
    },
    men:{
      shoe:['adidas','aldo','anthony miles','antoine and stanley','asos','barbour','base london','beck & hersey','bellfield','ben sherman','bobbies','boxfresh','buttero','cat','converse','creative recreation','crosshatch','diesel','dolce & gabbana','dune','feud','firetrap','base','frank wright','fred perry','gola','gourmet','grenson','hudson','homeys','hugo boss','hummel','hush puppies','hype','jack & jones','jeffery west','kurt geiger','lacoste','le coq sportif','loake','marc jacobs','new balance','new look','nike','onitsuka','tiger','paul smith','ralph lauren','pony','pull&bear','puma','quiksilver','reiss','religion','river island','rock & revival','rokin','rolando sturlini','selected','shoe the bear','skive','soulland','supra','ted baker','the north face','timberland','trickers','underground','vans','vivienne westwood','xti','ymc','armani junior','ashworth','barker','bertie','bonnie baby','camper','caterpillar','duca del cosma','ecco','fitflop','gandys','geox','havaianas','howick','hunter','joules','just sheepskin','kikkor golf','linea','monta munda','oliver sweeney','original penguin','peter werth','pied a terre','rockport','roland cartier','steve madden','superga','tommy hilfiger','ugg'],
      shirt:['!solid','10 deep','55dsl','a question of','addict','afends','altamont','anerkjendt','another influence','antony morato','asos','barbour','bellfield','ben sherman','blood brother','boxfresh','brave soul','bucks & co','carhartt','cheap monday','chocoolate','christopher shannon','d&g','d-struct','dansk','ralph lauren','dickies','diesel','dkny','eleven paris','esprit','farah vintage','firetrap','fjallraven','franklin & marshall','fred perry','g-star','gant rugger','guide london','hack','hilfiger denim','insight','izzue','j. lindeberg','jack & jones','jack wills','joyrich','lacoste','lambretta','lazy oaf','levis','libertine libertine','liberty','love moschino','maharishi','merc','mhi','minimum','native youth','new look','nudie jeans','paul smith','pepe','peter werth','pull&bear','quiksilver','reclaimed vintage','red eleven','reiss','religion','ringspun','river island','rock & revival','rough justice','rvca','selected','sitka','soulland','stussy','suit','superdry','supreme being','ted baker','the critical slide society','the quiet life','tommy hilfiger','trainerspotter','two angle','two square','ucla','undefeated','uniforms for the dedicated','united colors of benetton','vans','versace','villain','vito','voi jeans','volklore','wesc','wolsey','wood wood','ymc','alexandre savile row','aquascutum','armani','army & navy','baumler','beck & hersey','billabong','chester barrie','corsivo','criminal','daniel hechter','desigual','dockers','duchamp','duck and cover','farah','farrell','fly53','french connection','gant','hackett','hardy amies','henri lloyd','howick','hugo boss ','jack & jones','jaeger','jc rags','joules','kenneth cole','label lab','levis','lightning bolt','linea','lyle and scott','merc','minimum','native youth','new & lingwood','original penguin','patrick cox','paul & shark','paul costelloe','pretty green','quiksilver','racing green','raging bull','religion','richard james mayfair ','scotch & soda','simon carter','skopes','supreme being','thomas pink','tm lewin','tommy hilfiger','true religion','victorinox','villain','vivienne westwood','weird fish','white stuff','without prejudice','1 like no other','7 for all mankind','883 police']    
    }
  }

  var retailers = {
  	television:['argos','currys','littlewoods','ebuyer','selfridges', 'coop electrical','john lewis','tesco', 'prc direct','electrical123','sonic direct'],
  	laptop:['argos','currys','littlewoods','coop electrical','ebuyer','medion','zavvi','sonic direct'],
  	camera:['argos','currys','littlewoods','jessops'],
  	tablet:['argos','currys','littlewoods'],
    women:{
      shoe:['asos','house of fraser'],
      top:['asos','house of fraser']
    },
    men:{
      shoe:['asos','house of fraser'],
      shirt:['asos','house of fraser','gant']
    }
  };
  
  var selectedRetailers = {
  	television:[],
  	laptop:[],
  	camera:[],
  	tablet:[],
    women:{
      shoe:[],
      top:[]
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
      top:[]
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
      priceMax: 200
    },
    shirt:{
      priceMin:0,
      priceMax: 200
    },
    top:{
      priceMin:0,
      priceMax:200
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