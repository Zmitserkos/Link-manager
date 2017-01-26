
var mainApp = angular.module('linkManagerApp');

mainApp.controller('authorizationController', function($scope, dataService) {
  // set the model
  $scope.linkManagerModel = dataService;

  $scope.linkManagerModel.hidePopup = true;

  $scope.close = function () {
    $scope.linkManagerModel.hidePopup = true;
    $scope.linkManagerModel.deactivated = false;
  }

});
