
var scope,
    editLinkController,
    $controller,
    tag = 'javascript',
    $httpBackend;

describe('editLinkController', function() {
  beforeEach(module('linkManagerApp'));

  describe('$scope.createLink', function() {
    beforeEach(inject(function (_$httpBackend_) {
      $httpBackend = _$httpBackend_;
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    beforeEach(inject(function(_$controller_){
      $controller = _$controller_;
    }));

    beforeEach(function () {
      scope = {};
      editLinkController = $controller('editLinkController', {$scope: scope});
    });

    it('Should add a new tag to the list of tags', function() {
      $httpBackend.whenPOST('/newlink').respond(function(method, url, data){

        return [200, {
          id: '58850c44d7ac1d981a000001',
          shortUrlCode: 12345,
          counter: 100,
          description: 'Some info',
          tags: ['chai', 'testing']
        }, {}];
      });

      scope.linkManagerModel.newLink = {url: 'http://chaijs.com/api/assert/'};

      scope.createLink();
      $httpBackend.flush();

      assert.deepEqual({
        id: scope.linkManagerModel.newLink.id,
        shortUrl: scope.linkManagerModel.newLink.shortUrl,
        counter: scope.linkManagerModel.newLink.counter,
        description: scope.linkManagerModel.newLink.description,
        tags: scope.linkManagerModel.newLink.tags
      }, {
        id: '58850c44d7ac1d981a000001',
        shortUrl: 'te.st/29ix',
        counter: 100,
        description: 'Some info',
        tags: ['chai', 'testing']
      });
    });

    it('Should return error message', function() {
      $httpBackend.whenPOST('/newlink').respond(function(method, url, data){

        return [403, {message: "Forbidden for unauthorized user!"}, {}];
      });

      scope.linkManagerModel.newLink = {url: 'http://chaijs.com/api/assert/'};

      scope.createLink();
      $httpBackend.flush();

      assert.equal(scope.errorText, "Forbidden for unauthorized user!");
      assert(scope.showErrorText);
    });
  });

  describe('$scope.addTag', function() {
    beforeEach(inject(function(_$controller_){
      $controller = _$controller_;
    }));

    beforeEach(function () {
      scope = {newTag: tag};
      editLinkController = $controller('editLinkController', {$scope: scope});
    });

    it('Should add a new tag to the list of tags', function() {
      scope.linkManagerModel.showTagsList = [1];
      scope.linkManagerModel.newLink = {tags: ['angular']};

      scope.addTag();

      assert.equal(scope.linkManagerModel.newLink.tags[scope.linkManagerModel.newLink.tags.length - 1], tag);
      assert.equal(scope.linkManagerModel.showTagsList[scope.linkManagerModel.showTagsList.length - 1], 1);
      assert(!scope.newTag);
    });


    it('Should not to add an existing tag to the list of tags', function() {
      scope.linkManagerModel.showTagsList = [1];
      scope.linkManagerModel.newLink= {tags: [tag]};

      scope.addTag();

      assert.equal(scope.linkManagerModel.newLink.tags.length, 1);
      assert.equal(scope.linkManagerModel.showTagsList.length, 1);
      assert(!scope.newTag);
    });
  });
});
