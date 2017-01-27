
var myApp = angular.module('linkManagerApp', []).run(function($rootScope, dataService) {

  $rootScope.linkManagerModel = dataService;

  $rootScope.linkManagerModel.loadData();
  
});
