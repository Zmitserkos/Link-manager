
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

    currLink: null,
    currLinkIndex: 0,

    queryText: "guitar",
    queryType: "tag",


    searchMode: true,


    showTagsList: null,

    user: {username: "Guest", totalLinks: 0, totalClicks: 2},

    linksList: [{longUrl: "https://jamtrackcentral.com/artists/alex-hutchings/",
                 shortUrl: "te.st/2aaa234", views: 0, description: "Alex Hutchings",
                 tags: ["jtc", "hutchings", "guitar", "fusion", "jazz", "blues"],
                 focused: false},
                {longUrl: "https://jamtrackcentral.com/artists/guthrie-govan/",
                 shortUrl: "te.st/2bbb345", views: 5, description: "",
                 tags: ["licks", "govan", "guitar", "fusion"],
                 focused: false},
                {longUrl: "https://jamtrackcentral.com/artists/martin-miller/",
                 shortUrl: "te.st/233aaaa", views: 4, description: "new year games",
                 tags: ["guitar", "fusion"],
                 focused: true},
                {longUrl: "https://jamtrackcentral.com/artists/marco-sfogli/",
                 shortUrl: "te.st/2ggggaa", views: 0, description: "",
                 tags: ["jtc", "metal", "guitar"],
                 focused: false},
                {longUrl: "https://docs.npmjs.com/files/package.json",
                 shortUrl: "te.st/27777aa", views: 0, description: "",
                 tags: ["npm", "package"],
                 focused: false},
                {longUrl: "http://www.w3schools.com/angular/angular_animations.asp",
                 shortUrl: "te.st/23377bb", views: 0, description: "",
                 tags: ["angular", "animation"],
                 focused: false}],

    setCurrLink: function (index) {
      var model = this;

      if (index >= 0 && index < model.linksList.length) {
        model.currLinkIndex = index;

        model.showTagsList = model.linksList[index].tags.map(function () {
          return 1;
        });
        debugger;
      }


    },

    loadData: function () {

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

    find: findFunc

  } // mainModel

  return mainModel;
});
