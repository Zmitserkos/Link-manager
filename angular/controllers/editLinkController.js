
var mainApp = angular.module('linkManagerApp');

mainApp.controller('editLinkController', function($scope, $http, dataService) {
  // set the model
  $scope.linkManagerModel = dataService;

  $scope.errorText = '';
  $scope.showErrorText = false;

  $scope.showTagsList = [];

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
    debugger;
    var objectToSend = {id: $scope.linkManagerModel.currLink.id};

    var newTagList = $scope.linkManagerModel.newLink.tags.filter(function(item, index) {
      return $scope.showTagsList[index] > 0;
    });

    if ($scope.linkManagerModel.currLink.description !== $scope.linkManagerModel.newLink.description) {
      $scope.linkManagerModel.currLink.description = $scope.linkManagerModel.newLink.description;
      objectToSend.description = $scope.linkManagerModel.newLink.description;
    }

    // possible two arrays comparison
    $scope.linkManagerModel.currLink.tags = [].concat(newTagList);

    objectToSend.tags = [].concat(newTagList);

    $http({
      method: 'POST',
      url: '/link',
      data: objectToSend
    }).then(function successCallback(response) {

    }, function errorCallback(response) {
/*$scope.errorText = response.data;
      $scope.showErrorText = true;*/
    });

    $('#editLinkModal').modal('hide');
    $scope.close();
  } // saveLink

  $scope.createLink = function () {

    if ($scope.linkManagerModel.newLink.url) {
      var url = $scope.linkManagerModel.newLink.url;

      /*var validUrl = $scope.linkManagerModel.checkValidUrl($scope.linkManagerModel.newLink.url);

      if (!validUrl) {
        $scope.errorText = 'Enter a valid URL!';
        $scope.showErrorText = false;
      }
*/
      $http({
        method: 'POST',
        url: '/newlink',
        data: {url: url}
      }).then(function successCallback(response) {
        $scope.linkManagerModel.newLink.id = response.data._id;
        $scope.linkManagerModel.newLink.shortUrl = "te.st/2" + response.data.shortUrlCode.toString(36);
        $scope.linkManagerModel.newLink.counter = response.data.counter;

        $scope.linkManagerModel.newLink.userName = $scope.linkManagerModel.user.username;

        if (response.data.description) {
          $scope.linkManagerModel.newLink.description = response.data.description;
        } else {
          $scope.linkManagerModel.newLink.description = "";
        }

        if (response.data.tags) {
          $scope.linkManagerModel.newLink.tags = response.data.tags;
          $scope.showTagsList = response.data.tags.map(function () {
            return 1;
          });
        } else {
          $scope.linkManagerModel.newLink.tags = [];
          $scope.showTagsList = [];
        }

        $scope.linkManagerModel.addToLinksList($scope.linkManagerModel.newLink);

        $scope.linkManagerModel.createMode = false;

        $scope.linkManagerModel.user.totalLinks++;
      }, function errorCallback(response) {
  /*$scope.errorText = response.data;
        $scope.showErrorText = true;*/
      });
    }
  } // createLink

  $scope.delTag = function (index) {
    $scope.showTagsList[index] = 0;
  }

  $scope.addTag = function () {

    if ($scope.newTag) {
      // tag in the list must be unique
      if($scope.linkManagerModel.findFunc($scope.linkManagerModel.newLink.tags, $scope.newTag) < 0) {
        $scope.linkManagerModel.newLink.tags.push($scope.newTag);
        $scope.showTagsList.push(1);
      }

      $scope.newTag = null;
    }
  }

});
