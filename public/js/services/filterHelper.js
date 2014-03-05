angular.module('mean.system').service('FilterHelperService', function(){

    this.buildFilterComponent = function(type){
       switch (type){
           case 'television':
           return buildTelevisionFilter();
           case 'laptop':
           return buildLaptopFilter();
           case 'tablet':
           return buildTabletFilter();
           case 'camera':
           return buildCameraFilter();
       }
    }

    var priceHeader = '<div class="filter-component-label-slider"> Price </div>';
    var screenHeader = '<div class="filter-component-label-slider"> Screen Size </div>';
    var retailerHeader = '<div class="filter-component-label-input"> Retailer(s) </div>';
    var brandHeader = '<div class="filter-component-label-input"> Brand(s) </div>';

    var filterHeader = function(type){
        return '<div class="filter-header"> Search ' + type + 's </div>';
    }

    var setUpSlider = function(floor, ceiling, step, min, max){
        return '<slider floor="'+floor+'" ceiling="'+ceiling+'" step="'+step+'" ng-model-low="'+min+'" ng-model-high="'+max+'"></slider>';
    }

    var setUpMinMaxLabel = function(min, max, unit){
        switch(unit){
            case "£":
             return '<div class="filter-component-label-min-max"> <span style="color:#afafaf"> Min: </span> '+ unit + '{{' + min + '}} <span style="color:#afafaf"> - Max: </span> '+ unit + '{{' + max + '}}</div>';
            case "\"":
             return '<div class="filter-component-label-min-max"> <span style="color:#afafaf"> Min: </span> {{' + min + '}}'+ unit + ' <span style="color:#afafaf"> - Max: </span> {{' + max + '}}'+ unit + '</div>';
        }
    }

    var setUpModifiedTypeahead = function(type){
        switch (type){
            case 'retailer':
                return '<input type="text" class="filter-input" placeholder="{{retailerPlaceholder}}" ng-model="selectedRetailer" typeahead="retailer for retailer in unselectedRetailers | filter:$viewValue | limitTo:8"> <div ng-repeat="retailer in selectedRetailers"> <div ng-click="removeRetailer(retailer)" style="margin-top: 15px;"><span class="filter-input-selections">{{retailer}}</span><span class="removeCross"> x </span></div></div>';
            case 'brand':
                return '<input type="text" class="filter-input" placeholder="{{brandPlaceholder}}" ng-model="selectedBrand" typeahead="brand for brand in unselectedBrands | filter:$viewValue | limitTo:8"> <div ng-repeat="brand in selectedBrands"> <div ng-click="removeBrand(brand)" style="margin-top: 15px;"><span class="filter-input-selections">{{brand}}</span><span class="removeCross"> x </span></div></div>';
        }
    }

    var searchButton = '<div class="search-button"><span class="search-button-text">Search</span></div>';

    var buildLaptopFilter = function() {
        var priceMin, priceMax, screenMin, screenMax;

        priceMin = "filters.laptop.priceMin";
        priceMax = "filters.laptop.priceMax";
        screenMin = "filters.laptop.screenMin";
        screenMax = "filters.laptop.screenMax";


        var priceSlider, priceMinMaxLabel, screenSlider, screenMinMaxLabel, retailerTypeahead, brandTypeahead;

        priceSlider = setUpSlider(0,3000,20,priceMin,priceMax);
        priceMinMaxLabel = setUpMinMaxLabel(priceMin,priceMax,'£');
        screenSlider = setUpSlider(0,30,5,screenMin,screenMax);
        screenMinMaxLabel = setUpMinMaxLabel(screenMin,screenMax,"\"");
        retailerTypeahead = setUpModifiedTypeahead('retailer');
        brandTypeahead = setUpModifiedTypeahead('brand');

        var laptopFilterTemplate = filterHeader('Laptop') +
            priceHeader + priceSlider + priceMinMaxLabel + screenHeader +
            screenSlider + screenMinMaxLabel + retailerHeader + retailerTypeahead + brandHeader + brandTypeahead + searchButton;

        return laptopFilterTemplate;
    }

    var buildTelevisionFilter = function() {
        var priceMin, priceMax, screenMin, screenMax;

        priceMin = "filters.television.priceMin";
        priceMax = "filters.television.priceMax";
        screenMin = "filters.television.screenMin";
        screenMax = "filters.television.screenMax";


        var priceSlider, priceMinMaxLabel, screenSlider, screenMinMaxLabel, retailerTypeahead, brandTypeahead;

        priceSlider = setUpSlider(0,5000,20,priceMin,priceMax);
        priceMinMaxLabel = setUpMinMaxLabel(priceMin,priceMax,"£");
        screenSlider = setUpSlider(0,80,5,screenMin,screenMax);
        screenMinMaxLabel = setUpMinMaxLabel(screenMin,screenMax,"\"");
        retailerTypeahead = setUpModifiedTypeahead('retailer');
        brandTypeahead = setUpModifiedTypeahead('brand');

        var televisionFilterTemplate = filterHeader('Television') +
            priceHeader + priceSlider + priceMinMaxLabel + screenHeader +
            screenSlider + screenMinMaxLabel + retailerHeader + retailerTypeahead + brandHeader + brandTypeahead + searchButton;

        return televisionFilterTemplate;
    }

    var buildCameraFilter = function() {
        var priceMin, priceMax;

        priceMin = "filters.camera.priceMin";
        priceMax = "filters.camera.priceMax";

        var priceSlider, priceMinMaxLabel, retailerTypeahead, brandTypeahead;

        priceSlider = setUpSlider(0,3000,20,priceMin,priceMax);
        priceMinMaxLabel = setUpMinMaxLabel(priceMin,priceMax,"£");
        retailerTypeahead = setUpModifiedTypeahead('retailer');
        brandTypeahead = setUpModifiedTypeahead('brand');

        var cameraFilterTemplate = filterHeader('Camera') +
            priceHeader + priceSlider + priceMinMaxLabel  + retailerHeader + retailerTypeahead + brandHeader + brandTypeahead + searchButton;

        return cameraFilterTemplate;
    }
    var buildTabletFilter = function() {
        var priceMin, priceMax;

        priceMin = "filters.tablet.priceMin";
        priceMax = "filters.tablet.priceMax";

        var priceSlider, priceMinMaxLabel, retailerTypeahead, brandTypeahead;

        priceSlider = setUpSlider(0,1000,20,priceMin,priceMax);
        priceMinMaxLabel = setUpMinMaxLabel(priceMin,priceMax,"£");
        retailerTypeahead = setUpModifiedTypeahead('retailer');
        brandTypeahead = setUpModifiedTypeahead('brand');

        var cameraFilterTemplate = filterHeader('Tablet') +
            priceHeader + priceSlider + priceMinMaxLabel  + retailerHeader + retailerTypeahead + brandHeader + brandTypeahead + searchButton;

        return cameraFilterTemplate;
    }
    //from database
  var brands = [
    'samsung',
    'panasonic',
    'sony'
  ];

  var retailers = [
  'currys',
  'argos',
  'littlewoods'
  ];

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
   };

});