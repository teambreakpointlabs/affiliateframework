'use strict';

angular.module('mean.system').controller('PostsController', ['$scope', 'Global','PageDetailService', function ($scope, Global, PageDetailService) {
  $scope.global = Global;

  PageDetailService.setTitle('Voucher Codes & News | Offercrunch ');
  PageDetailService.setMetaDescription('Offercrunch - Stay up to date with the latest voucher codes for great savings from UK Online Retailers and follow our news right here!');


  $scope.posts = [
  
  {published_date: new Date(),
  	title: 'TEST POST 1',
  	content: 'some voucher code and fresh conent for google'
  }
  ,
  {published_date: new Date(),
  	title: 'TEST POST 2',
  	content: 'some voucher code and fresh conent for google'
  }

  ];
   

}]);