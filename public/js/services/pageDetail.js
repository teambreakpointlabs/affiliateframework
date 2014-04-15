angular.module('mean.system').factory('PageDetailService',['UrlHelperService', function($stateParams,UrlHelperService){
   
  var capitaliseWord = function(word){
    console.log('running capitaliseWord');
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  var setTitle =function(title){
      document.title = title;
  }

  var setMetaDescription = function(metaDesc){
     $('meta[name=description]').remove();
      var meta = document.createElement('meta');
      meta.name = "description";
      meta.content = metaDesc;
      document.getElementsByTagName('head')[0].appendChild(meta);
  }

  var convertPlural = function(toConvert){
    return toConvert.substring(0, toConvert.length - 1);
  }


  var setFashionPageDetails = function(params){
    //gender is always set on fashion page
    var gender = params.gender;
    var capitalisedGender = capitaliseWord(gender);
    var type = params.type;
    var singularType = convertPlural(type);
    var capitalisedType = capitaliseWord(singularType);
    var brand = params.brand ? params.brand : '';
    var brandSplit = splitBrandByDash(brand);
    var capitalisedBrand = capitaliseWord(brandSplit);

    brand == '' ? setTitle(capitalisedGender + "'s " + capitalisedType + ' Offers From UK Retailers | Offercrunch') : setTitle(capitalisedBrand + ' ' + capitalisedGender + "'s " + capitalisedType + " Offers From UK Retailers | Offercrunch");
    var metaDescriptionString = '';
    switch(singularType){
      case 'top':
        /** women only **/
        metaDescriptionString = brand == '' ? "Great Women's top offers from UK retailers. A massive range of tops from Asos, House of Fraser and many more. View the latest top offers right now at offercrunch" : capitalisedBrand +' top offers. View the latest ' + brandSplit + ' top offers right now at offercrunch. Search by price, brand and retailer';
      break;
      case 'shirt':
        /** men only atm **/
        metaDescriptionString = brand == '' ? "Great Men's shirt offers from UK retailers. A massive range of shirts from Asos, House of Fraser, Gant and many more. View the latest Ralph Lauren, Lacoste and Hugo Boss shirt offers right now at offercrunch" : capitalisedBrand +' shirt offers. View the latest ' + brandSplit + ' shirt offers right now at offercrunch. Search by price, brand and retailer';
      break;
      case 'shoe':
        if (gender === 'men'){
          metaDescriptionString = brand == '' ? "Great Men's shoe offers from UK retailers. A massive range of shoes from Asos, House of Fraser and many more. View the latest Lacoste, Ted Baker and Dune shoe offers right now at offercrunch" : capitalisedBrand +' shoe offers. View the latest ' + brandSplit + ' shoe offers right now at offercrunch. Search by price, brand and retailer';
        }else if (gender === 'women'){
          metaDescriptionString = brand == '' ? "Great Women's shoe offers from UK retailers. A massive range of shoes from Asos, House of Fraser and many more. View the latest Karen Millen, Kurt Geiger and Vivienne Westwood shoe offers right now at offercrunch" : capitalisedBrand +' shoe offers. View the latest ' + brandSplit + ' shoe offers right now at offercrunch. Search by price, brand and retailer';
        }
      break;
    }
    setMetaDescription(metaDescriptionString);

  }

  var setElectronicsPageDetails = function(params){
    
    console.log('setting electronic offer page details');
    var type = params.type;
    var capitalisedType = capitaliseWord(type);
    var brand = params.brand ? params.brand : '';
    var brandSplit = splitBrandByDash(brand);
    var capitalisedBrand = capitaliseWord(brandSplit);

    var metaDescriptionString = '';

    brand == '' ? setTitle(capitalisedType + ' Offers From UK Retailers | Offercrunch'): setTitle(capitalisedBrand + ' ' + capitalisedType + ' Offers From UK Retailers | Offercrunch');

    switch (type){
      case 'television':
        metaDescriptionString = brand == '' ? 'Great television offers from UK retailers. A massive range of TVs from Currys, Argos, Littlewoods, John Lewis and many more. View the latest Samsung, Sony, LG and Panasonic TV offers right now at offercrunch.': capitalisedBrand +' television offers. View the latest ' + brandSplit + ' television offers right now at offercrunch. Search by price, screen size, brand and retailer';
      break;
      case 'laptop':
        metaDescriptionString = brand == '' ? 'Great laptop offers from UK retailers. A massive range of laptops from Argos, Currys, Littlewoods and many more. View the latest Apple, Sony and Lenovo laptop offers right now at offercrunch.' : capitalisedBrand + ' laptop offers from UK retailers. View the latest ' + brandSplit + ' laptop offers right now at offercrunch. Search by price, brand and retailer';
      break;
      case 'tablet':
        metaDescriptionString = brand == '' ? 'Great tablet offers from UK retailers. A massive range of tablets from Argos, Currys, Littlewoods and many more. View the latest Nook, Lenovo and Google tablet offers right now at offercrunch.' : capitalisedBrand + ' tablet offers from UK retailers. View the latest ' + brandSplit + ' tablet offers right now at offercrunch. Search by price, brand and retailer';
      break;
      case 'camera':
        metaDescriptionString = brand == '' ? 'Great camera offers from UK retailers. A massive range of cameras from Argos, Currys, Jessops and many more. View the latest Canon, Nikon and Panasonic camera offers right now at offercrunch.' : capitalisedBrand + ' camera offers from UK retailers. View the latest ' + brandSplit + ' camera offers right now at offercrunch. Search by price, brand and retailer';
      break;
    }
    setMetaDescription(metaDescriptionString);
  }


   //move to utility service - same method (nearly) as in urlHelper - maybe expose this in urlHelper and inject to here
   var splitBrandByDash = function splitBrandByDash(brand){
    //will return same as passed in if no dash
      var offerBrand = brand;
      var splitBrandByDash = brand.split('-');
      if (splitBrandByDash.length > 0){
        var brandAppender = '';
        for (var i=0;i<splitBrandByDash.length;i++){
          capitaliseBrandPart = splitBrandByDash[i].charAt(0).toUpperCase() + splitBrandByDash[i].slice(1);
          console.log(capitaliseBrandPart);
          if (i!=splitBrandByDash.length-1){
            brandAppender = brandAppender + capitaliseBrandPart+" ";
          }else{
            brandAppender = brandAppender + capitaliseBrandPart;
          }
        }
      offerBrand = brandAppender;
    }
    return offerBrand;
  }

  return {
    setListOffersTitleAndMeta: function setListOffersTitleAndMeta(stateParams){
      var type = stateParams.type;
      if (type === 'television' || type === 'laptop' || type == 'tablet' || type === 'camera'){
        setElectronicsPageDetails(stateParams);
      }else if (type === 'shirts' || type === 'tops' || type === 'shoes'){
        setFashionPageDetails(stateParams);
        console.log('set fashion page details');
      }





      // switch(stateParams.type){
      //   case 'television':
      //   if (!stateParams.brand){
      //     this.setTitle('Television Offers From UK Retailers | Offercrunch');
      //     this.setMetaDescription('Great television offers from UK retailers. A massive range of TVs from Currys, Argos, Littlewoods, John Lewis and many more. View the latest Samsung, Sony, LG and Panasonic TV offers right now at offercrunch.');
      //   }else{
      //     var brandCapitalised = capitaliseWord(stateParams.brand);
      //     this.setTitle(brandCapitalised + ' Television Offers From UK Retailers | Offercrunch');
      //     this.setMetaDescription(brandCapitalised +' television offers. View the latest ' + stateParams.brand + ' television offers right now at offercrunch. Search by price, screen size, brand and retailer');
      //   }
      //   break;
      //   case 'laptop':
      //     if (!stateParams.brand){
      //       this.setTitle('Laptop Offers From UK Retailers | Offercrunch');
      //       this.setMetaDescription('Great laptop offers from UK retailers. A massive range of Laptops from Argos, Currys, Littlewoods and many more. View the latest Apple, Sony and Lenovo laptop offers right now at offercrunch.');
      //     }else{
      //       var brandCapitalised = capitaliseWord(stateParams.brand);
      //       this.setTitle(brandCapitalised + ' Laptop Offers From UK Retailers | Offercrunch');
      //       this.setMetaDescription(brandCapitalised + ' laptop offers from UK retailers. View the latest ' + stateParams.brand + ' laptop offers right now at offercrunch. Search by price, brand and retailer');
      //     }
      //   break;
      //   case 'camera':
      //     if (!stateParams.brand){
      //       this.setTitle('Camera Offers From UK Retailers | Offercrunch');
      //       this.setMetaDescription('Great camera offers from UK retailers. A massive range of Cameras from Argos, Currys, Jessops and many more. View the latest Canon, Nikon and Panasonic camera offers right now at offercrunch.');
      //     }else{
      //       var brandCapitalised = capitaliseWord(stateParams.brand);
      //       this.setTitle(brandCapitalised + ' Camera Offers From UK Retailers | Offercrunch');
      //       this.setMetaDescription(brandCapitalised + ' camera offers from UK retailers. View the latest ' + stateParams.brand + ' camera offers right now at offercrunch. Search by price, brand and retailer');
      //     }
      //   break;
      //   case 'tablet':
      //     if (!stateParams.brand){
      //       this.setTitle('Tablet Offers From UK Retailers | Offercrunch');
      //       this.setMetaDescription('Great tablet offers from UK retailers. A massive range of Tablets from Argos, Currys, Littlewoods and many more. View the latest Nook, Lenovo and Google tablet offers right now at offercrunch.');
      //     }else{
      //       var brandCapitalised = capitaliseWord(stateParams.brand);
      //       this.setTitle(brandCapitalised + ' Tablet Offers From UK Retailers | Offercrunch');
      //       this.setMetaDescription(brandCapitalised + ' tablet offers from UK retailers. View the latest ' + stateParams.brand + ' tablet offers right now at offercrunch. Search by price, brand and retailer');
      //     }
      //   break;
      //   case 'shirts':{
      //    var gender = capitaliseWord(stateParams.gender);
      //    if (!stateParams.brand){
      //       this.setTitle(gender + "'s Shirt Offers From UK Retailers | Offercrunch");
      //       if (gender == 'Men'){
      //         this.setMetaDescription("Great Men's shirt offers from UK retailers. A massive range of shirts from Asos, House of Fraser, Gant and many more. View the latest Ralph Lauren, Lacoste and Hugo Boss shirt offers right now at offercrunch");
      //       }else{
      //         this.setMetaDescription("Great Women's shirt offers from UK retailers. A massive range of shirts from Asos, House of Fraser and many more. View the latest shirt offers right now at offercrunch");
      //       }
      //     }else{
      //       var brandCapitalised = capitaliseWord(stateParams.brand);
      //       this.setTitle(brandCapitalised + ' Tablet Offers From UK Retailers | Offercrunch');
      //       this.setMetaDescription(brandCapitalised + ' tablet offers from UK retailers. View the latest ' + stateParams.brand + ' tablet offers right now at offercrunch. Search by price, brand and retailer');
      //     }
      //   }
      // }
    },

    setPageDetail: function setPageDetail(offerType, brand){
      var capitaliseType = offerType.charAt(0).toUpperCase() + offerType.slice(1);
       if (brand != undefined){
       brand = splitBrandByDash(brand);
       var capitaliseBrand = brand.charAt(0).toUpperCase() + brand.slice(1);
       var capitaliseGender = '';
       if ($stateParams.gender != undefined){
         var gender = $stateParams.gender;
         capitaliseGender = gender.charAt(0).toUpperCase() + gender.slice(1) + "'s ";
       }
       this.setTitle(capitaliseGender + capitaliseBrand + " " + capitaliseType + ' Offers | OfferCrunch');
       this.setMetaDescription(capitaliseGender + capitaliseBrand + " " + capitaliseType + ' Offers | Offercrunch - All the best online offers in one place.')
       }else{
         //put capitalise into own method and rethink setting page detail service with undefined params
         var capitaliseGender = '';
          if ($stateParams.gender != undefined){
         var gender = $stateParams.gender;
         capitaliseGender = gender.charAt(0).toUpperCase() + gender.slice(1) + "'s ";
       }
        this.setTitle(capitaliseGender + capitaliseType + ' Offers | OfferCrunch');
        this.setMetaDescription(capitaliseGender + capitaliseType + ' Offers | Offercrunch - All the best online offers in one place.');
       }
    },
  	setTitle: function setTitle(title){
      document.title = title;
  	},
  	setMetaDescription: function setMetaDescription(metaDesc){
      $('meta[name=description]').remove();
      var meta = document.createElement('meta');
      meta.name = "description";
      meta.content = metaDesc;
      document.getElementsByTagName('head')[0].appendChild(meta);
  	}
  }
}]);