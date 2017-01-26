
var mainApp = angular.module('linkManagerApp');

mainApp.controller('authorizationController', function($scope, $http, $location, dataService) {
  // set the model
  $scope.linkManagerModel = dataService;
  $scope.linkManagerModel.hidePopup = true;

  $scope.errorText = '';
  $scope.showErrorText = false;

  $scope.user = {username: '', password: '', passwordConf : ''}

  $scope.activate = function () {
    $scope.linkManagerModel.deactivated = false;
  }

  $scope.register = function () {

    if ($scope.user.password !== $scope.user.passwordConf) {
      $scope.user = {username: '', password: '', passwordConf : ''}

      $scope.errorText = 'Password confirmation failed!';
      $scope.showErrorText = true;
    }

    $http({
      method: 'POST',
      url: '/register',
      data: {username: $scope.user.username, password: $scope.user.password}
    }).then(function successCallback(response) {

//$location.url('/links');
      window.location.href = '/main';
    }, function errorCallback(response) {
      $scope.errorText = response.data;
      $scope.showErrorText = true;
    });
  }

  $scope.login = function () {

    $http({
      method: 'POST',
      url: '/login',
      data: {username: $scope.user.username, password: $scope.user.password}
    }).then(function successCallback(response) {

      window.location.href = '/main';
    }, function errorCallback(response) {

      $scope.errorText = response.data;
      $scope.showErrorText = true;
    });
  }

});
