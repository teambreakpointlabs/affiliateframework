angular.module('mean.system').directive('filter',['$compile', 'FilterHelperService', '$timeout', function($compile, FilterHelperService, $timeout){
  console.log('filter directive');
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
      console.log('running link');
      scope.removeRetailer = function removeRetailer(retailer){
        cntrl.transferArrElem(cntrl.isFound(retailer, scope.selectedRetailers), scope.selectedRetailers, scope.unselectedRetailers);
      }

      scope.removeBrand = function removeBrand(brand){
        cntrl.transferArrElem(cntrl.isFound(brand, scope.selectedBrands), scope.selectedBrands, scope.unselectedBrands);
      }

      watchSelectedItem(scope, cntrl, 'selectedRetailer', scope.unselectedRetailers, scope.selectedRetailers);
      watchSelectedItem(scope, cntrl, 'selectedBrand', scope.unselectedBrands, scope.selectedBrands);
      generatePlaceholderText(scope,cntrl, 'selectedBrands', scope.unselectedBrands);
      generatePlaceholderText(scope,cntrl, 'selectedRetailers', scope.unselectedRetailers);
      
      
      $timeout(function() { 
        elem.html(getTemplate(attrs.type)); 
        $compile(elem.contents())(scope);
      }, 200);
       
    }
  };
}]);