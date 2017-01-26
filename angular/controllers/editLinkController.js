
var mainApp = angular.module('linkManagerApp');

mainApp.controller('editLinkController', function($scope, $http, dataService) {
  // set the model
  $scope.linkManagerModel = dataService;

  $scope.errorText = '';
  $scope.showErrorText = false;

  $scope.showTagsList = $scope.linkManagerModel.showTagsList;

  $scope.newTag = null;


/*
  if (typeof($scope.linkManagerModel.currLinkIndex) === "number") {
    $scope.link = $scope.linkManagerModel.linksList[$scope.linkManagerModel.currLinkIndex];
  }
*/
  $scope.close = function () {
    $scope.linkManagerModel.deactivated = false;

    /*if (!$scope.linkManagerModel.currLink.shortUrl) {
      $scope.linkManagerModel.setCurrLink($scope.linkManagerModel.currLinkIndex);
    }*/
  }

  $scope.saveLink = function () {

    if ($scope.linkManagerModel.createMode) { // create mode

      if ($scope.linkManagerModel.newLink.url) {

        /*var validUrl = $scope.linkManagerModel.checkValidUrl($scope.linkManagerModel.newLink.url);

        if (!validUrl) {
          $scope.errorText = 'Enter a valid URL!';
          $scope.showErrorText = false;
        }
*/

        $scope.linkManagerModel.newLink.shortUrl = $scope.createLink($scope.linkManagerModel.newLink.url);

        if ($scope.linkManagerModel.newLink.shortUrl) {
          $scope.linkManagerModel.newLink.tags = [];

          $scope.linkManagerModel.showTagsList = [];

          $scope.linkManagerModel.createMode = false;
        }
      }
      return;
    } else { // edit mode

      var newTagList = $scope.linkManagerModel.linksList[$scope.linkManagerModel.currLinkIndex].tags.filter(function(item, index) {
        return $scope.linkManagerModel.showTagsList[index] > 0;
      });
    }



    debugger;
  }



  $scope.createLink = function (url) {

    $http({
      method: 'POST',
      url: '/newlink',
      data: {url: url}
    }).then(function successCallback(response) {
      $scope.linkManagerModel.newLink.id = response.data._id;
      $scope.linkManagerModel.newLink.shortUrl = "te.st/2" + response.data.shortUrlCode.toString(36);

      $scope.linkManagerModel.newLink.userName = $scope.linkManagerModel.user.username;

      if ($scope.linkManagerModel.newLink.description || $scope.linkManagerModel.newLink.tags) {
        $scope.linkManagerModel.newLink.description = response.data.description;
        $scope.linkManagerModel.newLink.tags = response.data.tags;
        $scope.linkManagerModel.newLink.counter = response.data.counter;
      } else {
        $scope.linkManagerModel.newLink.description = "";
        $scope.linkManagerModel.newLink.tags = [];
        $scope.linkManagerModel.newLink.counter = 0;
      }

      $scope.linkManagerModel.addToLinksList($scope.linkManagerModel.newLink);
debugger;
    }, function errorCallback(response) {
debugger;
      /*$scope.errorText = response.data;
      $scope.showErrorText = true;*/
    });

  }

  $scope.delTag = function (index) {
    $scope.linkManagerModel.showTagsList[index] = 0;
  }

  $scope.addTag = function () {
    if ($scope.newTag) {
      // tag in the list must be unique
      if($scope.linkManagerModel.findFunc($scope.linkManagerModel.newLink.tags, $scope.newTag) < 0) {
        $scope.linkManagerModel.newLink.tags.push($scope.newTag);
        $scope.linkManagerModel.showTagsList.push(1);
      }

      $scope.newTag = null;
    }
  }

});
