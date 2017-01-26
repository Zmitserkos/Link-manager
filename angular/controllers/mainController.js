
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

    $scope.linkManagerModel.newLink = {};

    $scope.linkManagerModel.newLink.shortUrl = $scope.linkManagerModel.currLink.shortUrl;
    $scope.linkManagerModel.newLink.url = $scope.linkManagerModel.currLink.url;
    $scope.linkManagerModel.newLink.description = $scope.linkManagerModel.currLink.description;
    $scope.linkManagerModel.newLink.tags = [];
    $scope.linkManagerModel.showTagsList = [];

    var tagsNumber = $scope.linkManagerModel.currLink.tags.length;
    for (var i = 0; i < tagsNumber; i++) {
      $scope.linkManagerModel.newLink.tags[i] = $scope.linkManagerModel.currLink.tags[i];
      $scope.linkManagerModel.showTagsList[i] = 1;
    }

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

    $scope.linkManagerModel.currLinkIndex = index;
    $scope.linkManagerModel.currLink = $scope.linkManagerModel.linksList[index];
  } // linkActivate

});
