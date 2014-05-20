angular.module('mean.system').factory('Utils', function(){
  /** This contains utility methods used throughout app **/
  return{
  	scrollTo: function scrollTo(){
      window.scrollTo(0, 0);
    }
  }
});