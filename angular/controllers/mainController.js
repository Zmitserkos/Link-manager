
var mainApp = angular.module('linkManagerApp');

mainApp.controller('mainController',
                   function($scope, $http, dataService) {
  // set the model
  $scope.linkManagerModel = dataService;

  $scope.deactivate = function () {
    $scope.linkManagerModel.deactivated = true;
  }

  $scope.logOut = function () {
    $http({method:'GET', url:'/logout'})
    .success(function (result) {

      $scope.linkManagerModel.user = {
        username: "Guest"
      };

      window.location.href = '/';
    });
  }

  $scope.newLink = function () {
    $scope.linkManagerModel.deactivated = true;

    $scope.linkManagerModel.createMode = true;

    $scope.linkManagerModel.newLink = {};
  }

  $scope.editLink = function () {
    $scope.linkManagerModel.deactivated = true;

    $scope.linkManagerModel.createMode = false;

                     $scope.linkManagerModel.newLink = $scope.linkManagerModel.currLink;
  }

  $scope.redirect = function () {
    debugger;
    $http({method:'GET', url: '/link'})
    .success(function (result) {

      //window.location.href = '/';
    });
  }

  // button "Search"
  $scope.searchLink = function(shortUrl) {
    $scope.linkManagerModel.searchMode = true;
debugger;
    //$scope.linkManagerModel.currQuery = shortUrl;
    //$scope.linkManagerModel.queryType = "URL";

    if (window.location.href != 'http://localhost:3001/main') {
      window.location.href = '/main';
    }

    $http({method:'POST', url:'/333' , params: {}}).
      success(function (result) {  //'id': 1     + shortUrl

        console.log(result);
    });
  } // searchLink

  $scope.linkActivate = function (index) {
    debugger;
    $scope.linkManagerModel.currLinkIndex = index;
    $scope.linkManagerModel.currLink = $scope.linkManagerModel.linksList[index];
  } // linkActivate

});
