
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

  //  $scope.linkManagerModel.showTagsList

    //$scope.linkManagerModel.showTagsList = [];


  }

  // button "Search"
  $scope.searchLink = function(shortUrl) {

    //$scope.linkManagerModel.currQuery = shortUrl;
    //$scope.linkManagerModel.queryType = "URL";

    window.location.href = '/main';

    $http({method:'POST', url:'/333' , params: {}}).
      success(function (result) {  //'id': 1     + shortUrl
//debugger;
        console.log(result);
    });
  } // searchLink

});
