
var myApp = angular.module('linkManagerApp', ['ngAnimate']).run(function($rootScope, dataService) {

  $rootScope.linkManagerModel = dataService;

  $rootScope.linkManagerModel.loadData();

  //$rootScope.linkManagerModel.setCurrLink(0);

  //$rootScope.linkManagerModel.getUser();
});
