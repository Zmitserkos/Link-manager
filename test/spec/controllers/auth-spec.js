
var scope,
    controller,
    $controller,
    $httpBackend,
    $window;

describe('authorizationController', function() {
  beforeEach(module('linkManagerApp'));

  describe('$scope.close', function() {
    beforeEach(inject(function(_$controller_){
      $controller = _$controller_;
    }));

    beforeEach(function () {
      scope = {
        errorText: "Error!!!",
        showErrorText: true,
      };
      controller = $controller('authorizationController', {$scope: scope});
    });

    it('Should set the proper values of the parameters before closing the modal window', function () {
      scope.linkManagerModel.deactivated = true;

      scope.close();

      assert(!scope.linkManagerModel.deactivated);
      assert(!scope.showErrorText);
      assert.equal(scope.errorText, '');
    });
  });

  describe('$scope.register', function() {
    beforeEach(function() {
      $window = {location: '/'};

      module(function($provide) {
        $provide.value('$window', $window);
      });
    });

    beforeEach(inject(function (_$httpBackend_, _$controller_) {
      $httpBackend = _$httpBackend_;
      $controller = _$controller_;
    }));

    beforeEach(function () {
      controller = $controller('authorizationController', {$scope: scope});
    });

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('Should register a new user and redirect to the main page', function() {

      $httpBackend.whenPOST('/register').respond(function(method, url, data){
        return [200, {}, {}];
      });

      scope.user = {username: "user", password: "pass", passwordConf: "pass"};

      scope.register();
      $httpBackend.flush();

      assert.equal($window.location, '/main');
    });

    it('Should return error message', function() {
      $httpBackend.whenPOST('/register').respond(function(method, url, data){

        return [200, {message: "Username exists!"}, {}];
      });

      scope.user = {username: "user", password: "pass", passwordConf: "pass"};
      scope.errorText = "Error!!!";
      scope.showErrorText = false;

      scope.register();
      $httpBackend.flush();

      assert.equal(scope.errorText, "Username exists!");
      assert(scope.showErrorText);
    });

  });

  describe('$scope.login', function() {
    beforeEach(function() {
      $window = {location: '/'};

      module(function($provide) {
        $provide.value('$window', $window);
      });
    });

    beforeEach(inject(function (_$httpBackend_, _$controller_) {
      $httpBackend = _$httpBackend_;
      $controller = _$controller_;
    }));

    beforeEach(function () {
      controller = $controller('authorizationController', {$scope: scope});
    });

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('Should log in and redirect to the main page', function() {

      $httpBackend.whenPOST('/login').respond(function(method, url, data){
        return [200, {}, {}];
      });

      scope.user = {username: "user", password: "pass"};

      scope.login();
      $httpBackend.flush();

      assert.equal($window.location, '/main');
    });

    it('Should return error message', function() {
      $httpBackend.whenPOST('/login').respond(function(method, url, data){

        return [200, {message: "Username is not registered!"}, {}];
      });

      scope.user = {username: "user", password: "pass"};
      scope.errorText = "Error!!!";
      scope.showErrorText = false;

      scope.login();
      $httpBackend.flush();

      assert.equal(scope.errorText, "Username is not registered!");
      assert(scope.showErrorText);
    });
  });
});
