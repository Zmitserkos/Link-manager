
var mainApp = angular.module('linkManagerApp');

mainApp.factory('dataService', function($http) {

  if ([].indexOf) {
    var findFunc = function(array, value) {
      return array.indexOf(value);
    }
  } else {
    var findFunc = function(array, value) {
      for (var i = 0; i < array.length; i++) {
        if (array[i] === value) return i;
      }
      return -1;
    }
  }

  // create the model
  var mainModel = {

    deactivated: false,

    newLink: null,
    currLink: null,
    currLinkIndex: 0,

    searchText: "",
    queryText: null,
    queryType: "URL",


    searchMode: null,
    createMode: null,

    showTagsList: [],

    user: {username: "Guest", totalClicks: 0},

    linksList: [],

    setCurrLink: function (index) {
      var model = this;

      if (index > -1 && index < model.linksList.length) {
        model.currLinkIndex = index;

        model.currLink = model.linksList[index];
      }
    },

    addToLinksList: function (linkObj) {
      var model = this;
      model.currLink = {};

      for (var key in linkObj) {
        if (key!=="tags") {
          model.currLink[key] = linkObj[key];
        } else { // key==="tags"

          model.currLink[key] = [].concat(linkObj[key]);
        }
      }

      model.linksList.unshift(model.currLink);
      model.currLinkIndex = 0;
    },

    loadData: function () {
      var model = this;

      $http({
        method: 'GET',
        url: '/link'
      }).then(function (result) {

        if (result) {
          var linksCount = result.data.linksList.length;

          model.user = {username: result.data.user.username,
                        totalClicks: 0};

          model.linksList = result.data.linksList;

          for (var i = 0; i < linksCount; i++) {
            debugger;
model.linksList[i].id = model.linksList[i]._id;
            model.linksList[i].username = model.user.username;
            model.linksList[i].shortUrl = "te.st/2" + model.linksList[i].shortUrlCode.toString(36);

            model.user.totalClicks += model.linksList[i].counter;
          }

          model.setCurrLink(0);
        }
      },
      function (result) {
        //debugger;
      });

    }, // loadData

    findFunc: findFunc,

    checkValidUrl: function (str) {
      /*var pattern = new RegExp('^(https?:\/\/)?'+ // protocol
    '((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|'+ // domain name
    '((\d{1,3}\.){3}\d{1,3}))'+ // OR ip (v4) address
    '(\:\d+)?(\/[-a-z\d%_.~+]*)*'+ // port and path
    '(\?[;&a-z\d%_.~+=-]*)?'+ // query string
    '(\#[-a-z\d_]*)?$','i'); // fragment locater

      if(!pattern.test(str)) {
        return false;
      } else {
        return true;
      }*/
      return true;
    } // validUrl

  } // mainModel

  return mainModel;
});
