
var mainApp = angular.module('linkManagerApp');

mainApp.controller('editLinkController', function($scope, dataService) {
  // set the model
  $scope.linkManagerModel = dataService;

  if (typeof($scope.linkManagerModel.currLinkIndex) === "number") {
    $scope.link = $scope.linkManagerModel.linksList[$scope.linkManagerModel.currLinkIndex];
  }

  $scope.activate = function () {
    $scope.linkManagerModel.deactivated = false;
  }

  /*$scope.editLink = function () {
    $scope.linkManagerModel.deactivated = false;


  }*/

  $scope.hideInfo = function () {

  }


});
