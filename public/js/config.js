'use strict';

//Setting up route
angular.module('mean').config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('offer dashboard to home page', {
        url: '/offers',
        templateUrl: '/views/offers.html'
    })
      .state('fashion home', {
        url: '/offers/fashion',
        templateUrl: '/views/fashion/list.html'
    })
      .state('offer dashboard by type', {
        url: '/offers/:type',
        templateUrl: '/views/dashboard.html'
    })
      .state('offer dashboard by type and brand', {
        url: '/offers/:type/:brand',
        templateUrl: '/views/dashboard.html'
    })
      .state('individual offer',{
        url: '/offers/:type/:brand/:urlDesc',
        templateUrl: '/views/offers/view.html'
    })
      .state('search',{
        url: '/search',
        templateUrl: '/views/search.html'
    })
      .state('about',{
        url: '/about',
        templateUrl: '/views/about.html'
    }).state('blogs',{
        url: '/money-saving-blogs',
        templateUrl: '/views/blogs.html'
    }).state('home', {
        url: '/',
        templateUrl: '/views/index.html'
    });
  }
]);

//Setting HTML5 Location Mode
angular.module('mean').config(['$locationProvider',
  function($locationProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');
}
]);
