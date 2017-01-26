
var myApp = angular.module('linkManagerApp', ['ngAnimate']).run(function($rootScope, dataService) {

  $rootScope.linkManagerModel = dataService;

});
