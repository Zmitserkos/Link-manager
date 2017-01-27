
var mainApp = angular.module('linkManagerApp');

mainApp.controller('editLinkController', function($scope, $http, dataService) {
  // set the model
  $scope.linkManagerModel = dataService;

  $scope.close = function () {
    $scope.linkManagerModel.deactivated = false;
  }

  $scope.createLink = function () {
    var url = $scope.linkManagerModel.newLink.url;

    if (url) {
      if (!$scope.linkManagerModel.checkValidUrl($scope.linkManagerModel.newLink.url)) {
        $scope.errorText = 'Enter a valid URL!';
        $scope.showErrorText = true;
        return;
      }

      $http({
        method: 'POST',
        url: '/newlink',
        data: {url: url}
      }).then(function (response) { // successCallback
        if (response.data && response.data.message) {
          $scope.errorText = response.data.message;
          $scope.showErrorText = true;
          return;
        }

        $scope.linkManagerModel.newLink.id = response.data.id;
        $scope.linkManagerModel.newLink.shortUrl = "te.st/2" + response.data.shortUrlCode.toString(36);
        $scope.linkManagerModel.newLink.counter = response.data.counter;

        $scope.linkManagerModel.newLink.username = $scope.linkManagerModel.user.username;

        if (response.data.description) {
          $scope.linkManagerModel.newLink.description = response.data.description;
        } else {
          $scope.linkManagerModel.newLink.description = "";
        }

        if (response.data.tags) {
          $scope.linkManagerModel.newLink.tags = response.data.tags;
          $scope.linkManagerModel.showTagsList = response.data.tags.map(function () {
            return 1;
          });
        } else {
          $scope.linkManagerModel.newLink.tags = [];
          $scope.linkManagerModel.showTagsList = [];
        }

        $scope.linkManagerModel.addToLinksList($scope.linkManagerModel.newLink);

        $scope.linkManagerModel.createMode = false;
        $scope.linkManagerModel.user.totalClicks += response.data.counter;

      }, function (response) { // errorCallback
        if (response.data && response.data.message) {
          $scope.errorText = response.data.message;
          $scope.showErrorText = true;
        }
      });
    }
  } // createLink

  $scope.saveLink = function () {

    var objectToSend = {id: $scope.linkManagerModel.currLink.id};

    var newTagList = $scope.linkManagerModel.newLink.tags.filter(function(item, index) {
      return $scope.linkManagerModel.showTagsList[index] > 0;
    });

    if ($scope.linkManagerModel.currLink.description !== $scope.linkManagerModel.newLink.description) {
      $scope.linkManagerModel.currLink.description = $scope.linkManagerModel.newLink.description;
      objectToSend.description = $scope.linkManagerModel.newLink.description;
    }

    // possible two arrays comparison
    $scope.linkManagerModel.currLink.tags = [].concat(newTagList);

    objectToSend.tags = newTagList;

    $http({
      method: 'POST',
      url: '/link',
      data: objectToSend
    }).then(function (response) { // successCallback
      if (response.data && response.data.message) {
        $scope.errorText = response.data.message;
        $scope.showErrorText = true;
      }
    }, function (response) { // errorCallback
      if (response.data && response.data.message) {
        $scope.errorText = response.data.message;
        $scope.showErrorText = true;
      }
    });

    $('#editLinkModal').modal('hide');
    $scope.close();
  } // saveLink

  $scope.delTag = function (index) {
    $scope.linkManagerModel.showTagsList[index] = 0;
  } // delTag

  $scope.addTag = function () {
    if ($scope.newTag) {
      // tag in the list must be unique
      if ($scope.linkManagerModel.findFunc($scope.linkManagerModel.newLink.tags, $scope.newTag) < 0) {
        $scope.linkManagerModel.newLink.tags.push($scope.newTag);
        $scope.linkManagerModel.showTagsList.push(1);
      }

      $scope.newTag = null;
    }
  } // addTag

  $scope.enterTag = function (keyEvent) {
    if (keyEvent.which === 13) {
      $scope.addTag();
    }
  }

});
