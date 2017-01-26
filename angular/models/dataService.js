
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

    queryText: null,
    queryType: "URL",


    searchMode: null,
    createMode: null,

    showTagsList: null,

    user: {username: "Guest", totalLinks: 0, totalClicks: 2},

    linksList: [/*{url: "https://jamtrackcentral.com/artists/alex-hutchings/",
                 shortUrl: "te.st/2aaa234", views: 0, description: "Alex Hutchings",
                 tags: ["jtc", "hutchings", "guitar", "fusion", "jazz", "blues"],
                 focused: false},
                {url: "https://jamtrackcentral.com/artists/guthrie-govan/",
                 shortUrl: "te.st/2bbb345", views: 5, description: "",
                 tags: ["licks", "govan", "guitar", "fusion"],
                 focused: false},
                {url: "https://jamtrackcentral.com/artists/martin-miller/",
                 shortUrl: "te.st/233aaaa", views: 4, description: "new year games",
                 tags: ["guitar", "fusion"],
                 focused: true},
                {url: "https://jamtrackcentral.com/artists/marco-sfogli/",
                 shortUrl: "te.st/2ggggaa", views: 0, description: "",
                 tags: ["jtc", "metal", "guitar"],
                 focused: false},
                {url: "https://docs.npmjs.com/files/package.json",
                 shortUrl: "te.st/27777aa", views: 0, description: "",
                 tags: ["npm", "package"],
                 focused: false},
                {url: "http://www.w3schools.com/angular/angular_animations.asp",
                 shortUrl: "te.st/23377bb", views: 0, description: "",
                 tags: ["angular", "animation"],
                 focused: false}*/],

    setCurrLink: function (index) {
      var model = this;

      if (index > -1 && index < model.linksList.length) {
        model.currLinkIndex = index;

        model.currLink = model.linksList[index];
/*model.showTagsList = model.linksList[index].tags.map(function () {
          return 1;
        });*/
      }
    },

    addToLinksList: function (linkObj) {
      var model = this;
debugger;
      model.currLink = {};

      for (var key in linkObj) {
        model.currLink[key] = linkObj[key];
      }

      model.linksList.unshift(model.currLink);
      model.currLinkIndex = 0;
    },

    loadData: function () {
      var model = this;
debugger;
      model.currLink = model.linksList[model.currLinkIndex];

    }, // loadData

    getUser: function () {
      var model = this;

      $http({
        method: 'GET',
        url: '/user', //user
      }).then(function (result) {
        //debugger;
        if (result) {
          model.user = result.data;
        }
      },
      function (result) {
        //debugger;

      });
    }, // getUser

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
