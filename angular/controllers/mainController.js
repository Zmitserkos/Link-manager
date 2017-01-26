
var mainApp = angular.module('linkManagerApp');

mainApp.controller('mainController',
                   function($scope, $http, $window, $compile, dataService) {
  // set the model
  $scope.linkManagerModel = dataService;

  // button "Search"
  $scope.searchLink = function(shortUrl) {

    $scope.linkManagerModel.currQuery = shortUrl;
    $scope.linkManagerModel.queryType = "URL";

    window.location.href = '/main';

    $http({method:'POST', url:'/333' , params: {}}).
      success(function (result) {  //'id': 1     + shortUrl
//debugger;
        console.log(result);
    });
  } // searchLink

  $scope.registerForm = function () {
    $scope.linkManagerModel.deactivated = true;

    var popupElem = document.getElementById("popup");
    var angChildElem = angular.element(popupElem.firstElementChild);

    if (angChildElem.hasClass("register-form")) {
      $scope.linkManagerModel.hidePopup = false;
      return;
    }

    // remove all child elements of popupElem
    angular.element(popupElem).empty();

    $http({method:'GET', url:'/popup/register'})
    .success(function (result) {

      var authPopup = document.getElementById("popup");

      var popupContent = angular.element(result);

      var compiledElem = $compile(popupContent)($scope);
      if (compiledElem) { // compiledElem
        angular.element(authPopup).append(compiledElem);
      }

      $scope.linkManagerModel.hidePopup = false;
    });
  }

  $scope.loginForm = function () {
    $scope.linkManagerModel.deactivated = true;

    var popupElem = document.getElementById("popup");
    var angChildElem = angular.element(popupElem.firstElementChild);

    if (angChildElem.hasClass("login-form")) {
      $scope.linkManagerModel.hidePopup = false;
      return;
    }

    // remove all child elements of popupElem
    angular.element(popupElem).empty();

    $http({method:'GET', url:'/popup/login'})
    .success(function (result) {

      var authPopup = document.getElementById("popup");

      var popupContent = angular.element(result);

      var compiledElem = $compile(popupContent)($scope);
      if (compiledElem) { // compiledElem
        angular.element(authPopup).append(compiledElem);
      }

      $scope.linkManagerModel.hidePopup = false;
    });
  }

  $scope.logOut = function () {
    $http({method:'GET', url:'/logout'})
    .success(function (result) {

      $scope.linkManagerModel.user = {
        username: "Guest"
      };

      window.location.href = '/';
/*
      var topButtons = document.getElementById("top-btns");
      var guestButtons = angular.element(result);

      angular.element(topButtons).empty();

      var compiledElem = $compile(guestButtons)($scope);
      if (compiledElem) { // compiledElem
        angular.element(topButtons).append(compiledElem);
      }
*/
    });
  }

  // button "Create short URL"
  $scope.createShortUrl = function () {

    $scope.linkManagerModel.deactivated = true;
    $scope.linkManagerModel.editLinkMode = true; // ???
    $scope.linkManagerModel.createLink = true;
  } // createShortUrl

});
