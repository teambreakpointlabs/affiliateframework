'use strict';

//Setting up route
angular.module('mean').config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    // For unmatched routes:
    $urlRouterProvider.otherwise('/');
    // states for my app
    $stateProvider
      .state('all articles', {
        url: '/articles',
        templateUrl: '/views/articles/list.html'
    })
      .state('create article', {
        url: '/articles/create',
        templateUrl: '/views/articles/create.html'
    })
      .state('edit article', {
        url: '/articles/:articleId/edit',
        templateUrl: '/views/articles/edit.html'
    })
      .state('article by id', {
        url: '/articles/:articleId',
        templateUrl: '/views/articles/view.html'
    })
      .state('offer dashboard to home page', {
        url: '/offers',
        templateUrl: '/views/index.html'
    })
      .state('fashion home', {
        url: '/offers/fashion',
        templateUrl: '/views/fashion.html'
    })
      .state('men fashion by type', {
        url: '/offers/fashion/:gender/:type',
        templateUrl: '/views/dashboard.html'
    })
      .state('men fashion by type and brand', {
        url: '/offers/fashion/:gender/:type/:brand',
        templateUrl: '/views/dashboard.html'
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
      .state('individual men fashion offer',{
        url: '/offers/fashion/:gender/:type/:brand/:urlDesc',
        templateUrl: '/views/offers/view.html'
    })
      .state('search',{
        url: '/search',
        templateUrl: '/views/search.html'
    })
      .state('about',{
        url: '/about',
        templateUrl: '/views/about.html'
    })
      .state('home', {
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
