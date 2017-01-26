
var mainApp = angular.module('linkManagerApp');

mainApp.controller('authorizationController', function($scope, $http, $window, dataService) {
  // set the model
  $scope.linkManagerModel = dataService;

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
      return;
    }

    $http({
      method: 'POST',
      url: '/register',
      data: {username: $scope.user.username, password: $scope.user.password}
    }).then(function successCallback(response) {

      $window.location = '/main';
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
    }).then(function(response) { // successCallback
//debugger;
      $window.location = '/main';
    }, function(response) { // errorCallback
//debugger;
      $scope.errorText = response.data;
      $scope.showErrorText = true;
    });
  }

});
