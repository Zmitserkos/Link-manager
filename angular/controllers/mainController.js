
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

  $scope.searchByTag = function (tag) {
    $scope.linkManagerModel.searchMode = true;
    $scope.linkManagerModel.queryType = "tag";
    $scope.linkManagerModel.queryText = tag;

    $http({
      method: 'GET',
      url: '/link',
      params: {tag: tag}
    }).then(function successCallback(result) {
      if (result) {

        var linksCount = result.data.length;

        $scope.linkManagerModel.linksList = result.data;

        for (var i = 0; i < linksCount; i++) {

$scope.linkManagerModel.linksList[i].id = $scope.linkManagerModel.linksList[i]._id;
          $scope.linkManagerModel.linksList[i].shortUrl = "te.st/2" + $scope.linkManagerModel.linksList[i].shortUrlCode.toString(36);
        }

        $scope.linkManagerModel.setCurrLink(0);
      }
    }, function errorCallback(response) {
/*$scope.errorText = response.data;
      $scope.showErrorText = true;*/
    });
  }

  // button "Search"
  $scope.searchLink = function() {
    debugger;
    $scope.linkManagerModel.searchMode = true;
    $scope.linkManagerModel.queryType = "URL";

    var searchText = $scope.linkManagerModel.searchText;
    $scope.linkManagerModel.queryText = searchText;

    if (searchText.substr(0, 7) === "te.st/2") {
      var path = searchText.substr(7);
    }

    if (searchText.substr(0, 14) === "http://te.st/2") {
      var path = searchText.substr(14);
    }

    if (path) {
      var shortUrlCode = parseInt(path, 36);
    } else {
      return;
// error URL
    }

    /*if (window.location.href != 'http://localhost:3001/main') {
      window.location.href = '/main';
    }*/

    $http({
      method: 'GET',
      url: '/link',
      params: {shortUrlCode: shortUrlCode}
    }).then(function successCallback(result) {
      if (result) {

        var linksCount = result.data.length;

        $scope.linkManagerModel.linksList = result.data;

        for (var i = 0; i < linksCount; i++) {

$scope.linkManagerModel.linksList[i].id = $scope.linkManagerModel.linksList[i]._id;
          $scope.linkManagerModel.linksList[i].shortUrl = "te.st/2" + $scope.linkManagerModel.linksList[i].shortUrlCode.toString(36);
        }

        $scope.linkManagerModel.setCurrLink(0);
      }
    }, function errorCallback(result) {
/*$scope.errorText = response.data;
      $scope.showErrorText = true;*/
    });
  } // searchLink

  $scope.linkActivate = function (index) {

    $scope.linkManagerModel.currLinkIndex = index;
    $scope.linkManagerModel.currLink = $scope.linkManagerModel.linksList[index];
  } // linkActivate

});
