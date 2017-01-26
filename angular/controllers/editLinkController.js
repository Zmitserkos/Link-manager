
var mainApp = angular.module('linkManagerApp');

mainApp.controller('editLinkController', function($scope, dataService) {
  // set the model
  $scope.linkManagerModel = dataService;

  $scope.hideInfo = function () {

    $scope.linkManagerModel.editLinkMode = false;
    $scope.linkManagerModel.deactivated = false;
  }


});
