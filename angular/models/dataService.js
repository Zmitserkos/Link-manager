
var mainApp = angular.module('linkManagerApp');

mainApp.factory('dataService', function($http) {

  // create the model
  var mainModel = {

    deactivated: false,
    hidePopup: true,
    editLinkMode: false,
    createLink: false,

    currUrl: null,
    currQuery: null,
    queryType: null,

    user: {username: "Guest"},

    linksList: [{longUrl: "https://jamtrackcentral.com/artists/alex-hutchings/",
                 shortUrl: "te.st/2aaa234", views: 0, description: "Alex Hutchings", tagsList: ["jtc", "hutchings", "guitar", "fusion"]},
                {longUrl: "https://jamtrackcentral.com/artists/guthrie-govan/",
                 shortUrl: "te.st/2bbb345", views: 5, description: "", tagsList: ["licks", "govan", "guitar", "fusion"]},
                {longUrl: "https://jamtrackcentral.com/artists/martin-miller/",
                 shortUrl: "te.st/233aaaa", views: 4, description: "new year games", tagsList: ["guitar", "fusion"]},
                {longUrl: "https://jamtrackcentral.com/artists/marco-sfogli/",
                 shortUrl: "te.st/2ggggaa", views: 0, description: "", tagsList: ["jtc", "metal", "guitar"]},
                {longUrl: "https://docs.npmjs.com/files/package.json",
                 shortUrl: "te.st/27777aa", views: 0, description: "", tagsList: ["npm", "package"]},
                {longUrl: "http://www.w3schools.com/angular/angular_animations.asp",
                 shortUrl: "te.st/23377bb", views: 0, description: "", tagsList: ["angular", "animation"]}],

    loadData: function () {

    }, // loadData

    getUser: function () {
      var model = this;

      $http({
        method: 'GET',
        url: '/user', //user
      }).then(function (result) {
        debugger;
        if (result) {
          model.user = result.data;
        }
      },
      function (result) {
        debugger;

      });
    } // getUser

  } // mainModel

  return mainModel;
});
