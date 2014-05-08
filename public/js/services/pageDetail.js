angular.module('mean.system').factory('PageDetailService',['UrlHelperService', function($stateParams,UrlHelperService){
   
  var capitaliseWord = function(word){
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

  var setElectronicsPageDetails = function(params){ 
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

  var splitByString = function(string, stringToSplitBy){
    var arr = string.split(stringToSplitBy);
    if (arr.length > 1){
      return arr[0] + stringToSplitBy + ' Offer';
    }else{
      arr = string.split(',');
      if (arr.length > 1){
        return arr[0] + stringToSplitBy + ' Offer';
      }
      return string;
    }
  }

  return {
    setListOffersTitleAndMeta: function setListOffersTitleAndMeta(stateParams){
      var type = stateParams.type;
      if (type === 'television' || type === 'laptop' || type == 'tablet' || type === 'camera'){
        setElectronicsPageDetails(stateParams);
      }else if (type === 'shirts' || type === 'tops' || type === 'shoes'){
        setFashionPageDetails(stateParams);
     }
    },

    setIndividualTitleAndMeta: function setIndividualTitleAndMeta(offer){
      
      var pctSavings = 0;
      var originalPrice = 0.0;
      var offerPrice = 0.0;
      
      if (offer.pricing != null){
        pctSavings = offer.pricing.pctSavings;
        originalPrice = offer.pricing.original;
        offerPrice = offer.pricing.offer;
      }

      switch(offer.type){
        case 'television':
          setTitle(splitByString(offer.description,'TV') + ' | Offercrunch');
          if (offer.retailer=='direct tvs'){
            setMetaDescription(offer.description + " Offer at Offercrunch! Save " + pctSavings + "% on this television from " + offer.retailer + "!. Now £" + offerPrice + "!");
          }else{
            setMetaDescription(offer.description + " Offer at Offercrunch! Save " + pctSavings + "% on this television from " + offer.retailer + "! Was £" +  originalPrice + ". Now £" + offerPrice + "!");
          }
        break;
        case 'laptop':
          setTitle(splitByString(offer.description,'Laptop') + ' | Offercrunch');
          if (offer.retailer=='laptops direct'){
            setMetaDescription(offer.description + " Offer at Offercrunch! Save " + pctSavings + "% on this laptop from " + offer.retailer + "!. Now £" + offerPrice + "!");
          }else{
            setMetaDescription(offer.description + " Offer at Offercrunch! Save " + pctSavings + "% on this laptop from " + offer.retailer + "! Was £" +  originalPrice + ". Now £" + offerPrice + "!");
          }
        break;
        case 'tablet':
          setTitle(splitByString(offer.description,'Tablet') + ' | Offercrunch');
          setMetaDescription(offer.description + " Offer at Offercrunch! Save " + pctSavings + "% on this tablet from " + offer.retailer + "! Was £" +  originalPrice + ". Now £" + offerPrice + "!");
        break;
        case 'camera':
          setTitle(splitByString(offer.description,'Camera') + ' | Offercrunch');
          setMetaDescription(offer.description + " Offer at Offercrunch! Save " + pctSavings + "% on this camera from " + offer.retailer + "! Was £" +  originalPrice + ". Now £" + offerPrice + "!");
        break;
        default:
          setTitle(offer.description + ' Offer | Offercrunch');
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