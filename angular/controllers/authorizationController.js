
var mainApp = angular.module('linkManagerApp');

mainApp.controller('authorizationController', function($scope, $http, $window, dataService) {
  // set the model
  $scope.linkManagerModel = dataService;

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
    }).then(function (response) { // successCallback

      if (response.data && response.data.message) {
        $scope.errorText = response.data.message;
        $scope.showErrorText = true;
        return;
      }

      $window.location = '/main';
    }, function (response) { // errorCallback
      
      if (response.data && response.data.message) {
        $scope.errorText = response.data.message;
        $scope.showErrorText = true;
      }
    });
  }

  $scope.login = function () {
    $http({
      method: 'POST',
      url: '/login',
      data: {username: $scope.user.username, password: $scope.user.password}
    }).then(function(response) { // successCallback
      if (response.data && response.data.message) {
        $scope.errorText = response.data.message;
        $scope.showErrorText = true;
        return;
      }

      $window.location = '/main';
    }, function(response) { // errorCallback
      if (response.data && response.data.message) {
        $scope.errorText = response.data.message;
        $scope.showErrorText = true;
      }
    });
  }

});
