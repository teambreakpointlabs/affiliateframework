angular.module('mean.system').directive('filter',['$compile', 'FilterHelperService', '$timeout', function($compile, FilterHelperService, $timeout){

  var getTemplate = function(filterType){
   return FilterHelperService.buildFilterComponent(filterType);
  }

  var watchSelectedItem = function(scope, cntrl, selectedItem, unselected, selected){
    scope.$watch(selectedItem, function(newVal){
      var index = cntrl.isFound(newVal, unselected);
        if (index>=0){
            cntrl.transferArrElem(index, unselected, selected);
            selectedItem == 'selectedRetailer' ? scope.selectedRetailer = '' : scope.selectedBrand = '';
        }
    });
  }

  var generatePlaceholderText = function(scope, cntrl, selectedArrTitle, unselected){
    scope.$watch(selectedArrTitle, function(newVal){
      switch(selectedArrTitle){
        case 'selectedBrands':
          scope.brandPlaceholder = cntrl.calculatePlaceholderText(newVal, unselected);
          break;
        case 'selectedRetailers':
          scope.retailerPlaceholder = cntrl.calculatePlaceholderText(newVal, unselected);
          break;
      }
    },true);
  }

  return {
    restrict:"E",
    
    controller:function($scope){
      
      this.isFound = function(val, arr){
        console.log(arr);
        for (var i = 0; i< arr.length;i++){
          if (val == arr[i]){
              return i;
          }
        }
        return -1;
      }

      this.transferArrElem = function(index, from, to){
        to.push(from[index]);
        from.splice(index,1);
      }

      this.calculatePlaceholderText = function(selected, unselected){
        var placeholderText = '';
        if(!selected.length || !unselected.length){
          placeholderText = 'all';
        }else{
          placeholderText = 'add another...'
        }
        return placeholderText;
      }
    },
    
    link: function(scope,elem,attrs,cntrl){
      var type = attrs.type;
      var selectedRetailers = scope.selectedRetailers;
      var unselectedRetailers = scope.unselectedRetailers;
      var selectedBrands = scope.selectedBrands;
      var unselectedBrands = scope.unselectedBrands;

      scope.removeRetailer = function removeRetailer(retailer){
        cntrl.transferArrElem(cntrl.isFound(retailer, selectedRetailers), selectedRetailers, unselectedRetailers);
      }

      scope.removeBrand = function removeBrand(brand){
        cntrl.transferArrElem(cntrl.isFound(brand, selectedBrands), selectedBrands, unselectedBrands);
      }

      // watchers
      watchSelectedItem(scope,cntrl,'selectedRetailer',unselectedRetailers,selectedRetailers);
      watchSelectedItem(scope,cntrl,'selectedBrand',unselectedBrands,selectedBrands);
      // setting dynamic placeholder text
      generatePlaceholderText(scope,cntrl,'selectedBrands',unselectedBrands);
      generatePlaceholderText(scope,cntrl,'selectedRetailers',unselectedRetailers);
      
      //timeout as browser was jumping to filter when rendered before header - better solution here?
      $timeout(function() { 
        elem.html(getTemplate(type)); 
        $compile(elem.contents())(scope);
      }, 200);

    }
  };
}]);