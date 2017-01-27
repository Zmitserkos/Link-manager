
var scope,
    controller,
    $controller,
    $httpBackend,
    $window,
    linkManagerModel,
    newLink,
    currLink,
    tag;

describe('mainController', function() {
  beforeEach(module('linkManagerApp'));

  describe('$scope.editLink', function() {
    beforeEach(inject(function(_$controller_){
      $controller = _$controller_;
    }));

    beforeEach(function () {
      scope = {};
      controller = $controller('mainController', {$scope: scope});
    });

    it('Schould copy the attributes of current link to edit', function () {
      newLink = {
        shortUrl: '',
        url: '',
        description: '',
        tags: [],
      };

      currLink = {
        shortUrl: 'http://2gb5',
        url: 'http://stackoverflow.com/',
        description: 'Info text',
        tags: ['development'],
      };

      linkManagerModel = {
        deactivated: false,
        createMode: true,
        newLink: newLink,
        currLink: currLink,
        showTagsList: []
      };

      scope.linkManagerModel = linkManagerModel;
      scope.editLink();

      assert.deepEqual({
        deactivated: scope.linkManagerModel.deactivated,
        createMode: scope.linkManagerModel.createMode,
        newLink: scope.linkManagerModel.newLink,
        showTagsList: scope.linkManagerModel.showTagsList
      }, {
        deactivated: true,
        createMode: false,
        newLink: currLink,
        showTagsList: [1]
      });
    });
  });

  describe('$scope.searchByTag', function() {

    beforeEach(inject(function (_$httpBackend_, _$controller_) {
      $httpBackend = _$httpBackend_;
      $controller = _$controller_;
    }));

    beforeEach(function () {
      controller = $controller('mainController', {$scope: scope});
    });

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('Should load all links by given tag', function() {
      tag = 'javascript';

      $httpBackend.whenGET('/load?tag='+tag).respond(function(method, url, data){
        return [200, {
          linksList: [{
            _id: '58850c44d7ac1d981a000222',
            shortUrlCode: 12345,
            url: 'http://chaijs.com/api/assert/',
            username: 'user',
            userId: '58850c44d7ac1d981a000111',
            description: 'Some text',
            tags: ['test', tag],
            counter: 111
          }]
        }, {}];
      });

      scope.linkManagerModel.searchMode = false;
      scope.linkManagerModel.queryType = '';
      scope.linkManagerModel.queryText = '';

      scope.searchByTag(tag);
      $httpBackend.flush();

      assert(scope.linkManagerModel.searchMode);
      assert.equal(scope.linkManagerModel.queryType, "tag");
      assert.equal(scope.linkManagerModel.queryText, tag);

      assert.deepEqual(scope.linkManagerModel.linksList, [{
        id: "58850c44d7ac1d981a000222",
        counter: 111,
        description: "Some text",
        shortUrl: "te.st/29ix",
        shortUrlCode: 12345,
        tags: ['test', tag],
        url: "http://chaijs.com/api/assert/",
        userId: "58850c44d7ac1d981a000111",
        username: "user"
      }]
      );
    });

    it('Should return error message', function() {

      scope.linkManagerModel.searchMode = false;
      scope.linkManagerModel.queryType = '';

      scope.searchByTag();

      assert(scope.linkManagerModel.searchMode);
      assert.equal(scope.linkManagerModel.queryType, "tag");
      assert.equal(scope.linkManagerModel.messageText, "Tag is empty!");
      assert(scope.linkManagerModel.showMessageText);
    });

  });
});
