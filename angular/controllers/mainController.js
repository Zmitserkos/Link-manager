
var mainApp = angular.module('linkManagerApp');

mainApp.controller('mainController', function($scope, $http, $window, dataService) {

  // set the model
  $scope.linkManagerModel = dataService;

  $scope.deactivate = function () {
    $scope.linkManagerModel.deactivated = true;
  }

  $scope.logOut = function () {
    $http({method:'POST', url:'/logout'})
    .then(function (response) { // successCallback
      if (response.data && response.data.message) {
        $scope.linkManagerModel.messageText = response.data.message;
        $scope.linkManagerModel.showMessageText = true;
        return;
      }

      $window.location = '/';
    }, function (response) { // errorCallback
      if (response.data && response.data.message) {
        $scope.linkManagerModel.messageText = response.data.message;
        $scope.linkManagerModel.showMessageText = true;
      }
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

  $scope.searchByTag = function (tag) {
    $scope.linkManagerModel.searchMode = true;
    $scope.linkManagerModel.queryType = "tag";
    $scope.linkManagerModel.queryText = tag;

    if (!tag) {
      $scope.linkManagerModel.messageText = "Tag is empty!";
      $scope.linkManagerModel.showMessageText = true;
      return;
    }

    var params = {tag: tag};

    $scope.linkManagerModel.loadData(params);
  }

  // button "Search"
  $scope.searchByUrl = function() {
    $scope.linkManagerModel.searchMode = true;
    $scope.linkManagerModel.queryType = "url";

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
      $scope.linkManagerModel.messageText = "Invalid short URL!";
      $scope.linkManagerModel.showMessageText = true;
      return;
    }

    if ($scope.linkManagerModel.user.id) {
      var params = {shortUrlCode: shortUrlCode};

      $scope.linkManagerModel.loadData(params);
    } else {
      $http({
        method:'POST',
        url:'/load',
        data: {searchByUrl: true, shortUrlCode: shortUrlCode}
      })
      .then(function (response) { // successCallback
        if (response.data && response.data.message) {
          $scope.linkManagerModel.messageText = response.data.message;
          $scope.linkManagerModel.showMessageText = true;
          return;
        }

        $window.location = '/main';
      }, function (response) { // errorCallback
        if (response.data && response.data.message) {
          $scope.linkManagerModel.messageText = response.data.message;
          $scope.linkManagerModel.showMessageText = true;
        }
      });
    }
  } // searchLink

  $scope.linkActivate = function (index) {
    $scope.linkManagerModel.currLinkIndex = index;
    $scope.linkManagerModel.currLink = $scope.linkManagerModel.linksList[index];
  } // linkActivate

  $scope.loadProfile = function () {
    $scope.linkManagerModel.searchMode = false;
    $scope.linkManagerModel.loadData({loadProfile: true});
  } // loadProfile

});
