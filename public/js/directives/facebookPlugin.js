angular.module('mean.system').directive('facebookPlugin',['$compile','$timeout',function($compile,$timeout){
    //console.log('------loading facebook plugin----');
   
  var getTemplate = function(){
    return '<div id="fb-root"></div><div class="fb-like-box" data-href="https://www.facebook.com/offercrunch" data-colorscheme="dark" data-show-faces="false" data-header="true" data-stream="false" data-show-border="false" data-width="300" data-height="70"></div>';
  }
  return{
    restrict: 'E',
    link: function(scope,elem,attrs){
    	(function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_GB/all.js#xfbml=1&appId=1413137912281218";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
       
        elem.html(getTemplate()); 
        $compile(elem.contents())(scope);
        

         $timeout(function() { 
           FB.XFBML.parse(); 
         },500);
   

    }
  }
}]);

