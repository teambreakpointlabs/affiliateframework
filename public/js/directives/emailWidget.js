angular.module('mean.system').directive('emailWidget',['$compile','$timeout',function($compile,$timeout){
    console.log('------loading email widget----');
   
  var getTemplate = function(offerType){
    console.log(offerType);

    return ' <form class="form-inline" role="form" name="registerForm"><div class="filter-component-label-input" style="padding-top:25px;text-transform:capitalize;color:#38d5b8;border-top:1px solid #efefef;"> Email Me '+ offerType + ' Offers </div><input type="text" ng-model="email" class="filter-input" placeholder="your@emailaddress.com" style="color:#38d5b8"/><div class="search_button" ng-click="submitEmail(email)" style="margin:0px;margin-bottom:50px;background:#38d5b8;"><span class="search_button_text" style="color:#fff !important;">Get Offer Updates</span></div></form>'
  }
  return{
    restrict: 'E',
    link: function(scope,elem,attrs){

      $timeout(function() { 
        elem.html(getTemplate(attrs.offerType)); 
        $compile(elem.contents())(scope);
      }, 300);

    }
  }
}]);