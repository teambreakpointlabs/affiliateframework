'use strict';

angular.module('mean.system').controller('PostsController', ['$scope', 'Global','PageDetailService','Posts',function($scope, Global, PageDetailService,Posts) {
  $scope.global = Global;

  PageDetailService.setTitle('Voucher Codes & News | Offercrunch ');
  PageDetailService.setMetaDescription('Offercrunch - Stay up to date with the latest voucher codes for great savings from UK Online Retailers and follow our news right here!');
    
  Posts.getPosts().then(function(posts){
    $scope.posts = posts;
  });
   

}]);