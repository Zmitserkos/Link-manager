
var mainApp = angular.module('linkManagerApp');

mainApp.controller('mainController',
                   function($scope, $http, $window, $compile, dataService) {
  // set the model
  $scope.linkManagerModel = dataService;

  // button "Search"
  $scope.searchLink = function(shortUrl) {

    $scope.linkManagerModel.currQuery = shortUrl;
    $scope.linkManagerModel.queryType = "URL";

    $window.location.href = '/links';

    $http({method:'POST', url:'/333' , params: {}}).
      success(function (result) {  //'id': 1     + shortUrl
//debugger;
        console.log(result);
    });
  } // searchLink

  //
  $scope.authorize = function (label) {

    $scope.linkManagerModel.deactivated = true;

    var popupElem = document.getElementById("popup");

    var angChildElem = angular.element(popupElem.firstElementChild);

    if (label === 1 &&
        angChildElem.hasClass("register-form")) { // "Register"
      $scope.linkManagerModel.hidePopup = false;
      return;
    } else if (label === 2 &&
               angChildElem.hasClass("login-form")) { // "Log in"
      $scope.linkManagerModel.hidePopup = false;
      return;
    }

    // remove all child elements of popupElem
    angular.element(popupElem).empty();

    // if (!authPopup.children.length) {
    $http({ method:'GET', url:'/popup' , params: {'id': label} }).success(function (result) {  

      var authPopup = document.getElementById("popup");

      var popupContent = angular.element(result);

      var compiledElem = $compile(popupContent)($scope);
      if (compiledElem) { // compiledElem
        angular.element(authPopup).append(compiledElem);
      }

      $scope.linkManagerModel.hidePopup = false;
    });

  } // authorize

  // button "Create short URL"
  $scope.createShortUrl = function () {

    $scope.linkManagerModel.deactivated = true;
    $scope.linkManagerModel.editLinkMode = true;
    $scope.linkManagerModel.createLink = true;
  } // createShortUrl

});
