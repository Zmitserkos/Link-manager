
var mainApp = angular.module('linkManagerApp');

mainApp.factory('dataService', function($http) {

  // function for searching the element position in the array
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

  var guest = {username: "Guest", totalClicks: 0};

  // create the model
  var mainModel = {

    deactivated: false, // parameter for changing opacity of backgroud elements while modal window occurs

    linksList: [], // array of objects that contain info about links (url, short url, tags, description etc.)
    newLink: null, // object for creating new link or editing existing one
    currLink: null, // object (from linksList) that is currently displayed in the container field of web page
    currLinkIndex: 0, // index of currLink object in linksList array

    searchText: "", // text of input element for search
    queryText: null, // text of search query
    queryType: "URL", // type of search query

    searchMode: null, // search mode
    createMode: null, // mode of new link creating; createMode===false - link editing mode

    showTagsList: [], // array for tags editing

    user: guest, // current user object

    messageText: '', // error message
    showMessageText: false,

    // sets current object from linksList to display in the container field of web page
    setCurrLink: function (index) {
      var model = this;

      if (index > -1 && index < model.linksList.length) {
        model.currLinkIndex = index;
        model.currLink = model.linksList[index];
      }
    },

    // adds link object at the beginning of linkList
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

    // loads initial data from server
    loadData: function (params) {
      var model = this;

      if (!params) {
        params = {
          loadUser: true
        };
      }

      $http({
        method: 'GET',
        url: '/load',
        params: params
      }).then(function (response) { // successCallback
debugger;
        if (response) {
          if (response.data.user) { // user obect loaded
            model.user = {id: response.data.user.id,
                          username: response.data.user.username,
                          totalClicks: 0};

          } else {
            if (params.loadUser) {
              model.user = guest;
            }

            if (model.user.id) { // user logged in
              model.user.totalClicks = 0;
            }
          }

          if (response.data.linksList) {
            var linksCount = response.data.linksList.length;
            model.linksList = response.data.linksList;

            for (var i = 0; i < linksCount; i++) {
              model.linksList[i].id = model.linksList[i]._id;
              delete model.linksList[i]._id;

              model.linksList[i].shortUrl = "te.st/2" + model.linksList[i].shortUrlCode.toString(36);

              if (model.user.id && !model.linksList[i].username) {
                model.linksList[i].username = model.user.username;
                model.user.totalClicks += model.linksList[i].counter;
              }
            }

            model.setCurrLink(0);
          }
        }
      },
      function (response) { // errorCallback
debugger;
        model.messageText = response.data;
        model.showMessageText = true;
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
