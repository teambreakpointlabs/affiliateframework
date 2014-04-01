'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', 'Global','PageDetailService', function ($scope, Global, PageDetailService) {
  $scope.global = Global;
  $scope.showOptions = false;
   
  PageDetailService.setTitle('One Website. Every Offer. | Offercrunch ');
  PageDetailService.setMetaDescription('Offercrunch - All the best online offers in one place. Televisions, laptops, cameras, tablets. Up to 50% off big name brands from major UK retailers.');  
   
  runSkimlinks();

    function runSkimlinks(){
    console.log('attempting to load skimlinks script');
  $.getScript( "http://s.skimresources.com/js/54354X1347041.skimlinks.js", function( data, textStatus, jqxhr ) {
    if (jqxhr.status == 200){
      console.log('skimlinks loaded');
    } else{
      //try again
      $.getScript( "http://s.skimresources.com/js/54354X1347041.skimlinks.js", function( data, textStatus, jqxhr ) {
        console.log('skimlinks loaded again');
      });
    }
  });
  }
  


}]);