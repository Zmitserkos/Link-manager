
var mainApp = angular.module('linkManagerApp');

mainApp.factory('dataService', function($http) {

  // create the model
  var mainModel = {

    deactivated: false,
    /*editLinkMode: false,
    createLink: false,*/

    currUrl: null,
    currQuery: null,
    queryType: null,

    currLinkIndex: 0,

    user: {username: "Guest"},

    linksList: [{longUrl: "https://jamtrackcentral.com/artists/alex-hutchings/",
                 shortUrl: "te.st/2aaa234", views: 0, description: "Alex Hutchings", tags: ["jtc", "hutchings", "guitar", "fusion", "jazz", "blues"]},
                {longUrl: "https://jamtrackcentral.com/artists/guthrie-govan/",
                 shortUrl: "te.st/2bbb345", views: 5, description: "", tags: ["licks", "govan", "guitar", "fusion"]},
                {longUrl: "https://jamtrackcentral.com/artists/martin-miller/",
                 shortUrl: "te.st/233aaaa", views: 4, description: "new year games", tags: ["guitar", "fusion"]},
                {longUrl: "https://jamtrackcentral.com/artists/marco-sfogli/",
                 shortUrl: "te.st/2ggggaa", views: 0, description: "", tags: ["jtc", "metal", "guitar"]},
                {longUrl: "https://docs.npmjs.com/files/package.json",
                 shortUrl: "te.st/27777aa", views: 0, description: "", tags: ["npm", "package"]},
                {longUrl: "http://www.w3schools.com/angular/angular_animations.asp",
                 shortUrl: "te.st/23377bb", views: 0, description: "", tags: ["angular", "animation"]}],

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
    } // getUser

  } // mainModel

  return mainModel;
});
