'use strict';

angular.module('mean.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;
    console.log('header controller');
    $scope.menu = [{
        'title': 'Television Offers',
        'link': '/offers/television'
    }, {
        'title': 'Laptop Offers',
        'link': '/offers/laptop'
    },
    {
        'title': 'Tablet Offers',
        'link': '/offers/tablet'
    },
    {
        'title': 'Camera Offers',
        'link': '/offers/camera'
    }];
    
    $scope.isCollapsed = false;
}]);