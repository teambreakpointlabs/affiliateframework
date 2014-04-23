angular.module('mean.system').directive('twitterPlugin',['$compile','$timeout',function($compile,$timeout){
    //console.log('------loading twitter plugin----');
   
  var getTemplate = function(){
    return '<a href="https://twitter.com/_offercrunch_" class="twitter-follow-button" data-show-count="false" data-size="large">Follow Us</a>';
  }
  return{
    restrict: 'E',
    link: function(scope,elem,attrs){
      !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs'); 
      elem.html(getTemplate()); 
      $compile(elem.contents())(scope);
      $timeout(function(){
      	twttr.widgets.load();
      },500);
    }
  }
}]);


