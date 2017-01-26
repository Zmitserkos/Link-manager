
var mainApp = angular.module('linkManagerApp');

mainApp.controller('authorizationController', function($scope, dataService) {
  // set the model
  $scope.linkManagerModel = dataService;

  $scope.createShortUrl = function () {

    $scope.linkManagerModel.createShortUrlMode = true;
  }


});
