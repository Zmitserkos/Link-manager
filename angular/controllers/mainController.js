
var mainApp = angular.module('linkManagerApp');

mainApp.controller('mainController', function($scope, dataService, $http) {
  // set the model
  $scope.linkManagerModel = dataService;

  // button "Search"
  $scope.searchLink = function(shortUrl) {

    $scope.linkManagerModel.currQuery = shortUrl;
    $scope.linkManagerModel.queryType = "URL";
//debugger;
    $http({method:'POST', url:'app.js/' + shortUrl, params: {'id': 1}}).
      success(function (result) {
        console.log(result);
    });
  } // searchLink

  //
  $scope.authorize = function (label) {

    $scope.linkManagerModel.deactivated = true;

    if (label === 1 || label === 2) {
      $scope.linkManagerModel.authorize = true;

      if (label === 1) {
        $scope.linkManagerModel.registration = true;
      }
    }
  } // authorize

  // button "Create short URL"
  $scope.createShortUrl = function () {

    $scope.linkManagerModel.deactivated = true;
    $scope.linkManagerModel.editLinkMode = true;
    $scope.linkManagerModel.createLink = true;
  } // createShortUrl


});
