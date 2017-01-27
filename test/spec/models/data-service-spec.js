
var dataService,
    $httpBackend;

describe('dataService', function () {
  beforeEach(module('linkManagerApp'));

  describe('dataService.loadData()', function() {

    beforeEach(inject(function (_$httpBackend_, _dataService_) {
      $httpBackend = _$httpBackend_;
      dataService = _dataService_;
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('Should load all data (user, links, query info) by given parameters', function(done) {

      $httpBackend.whenGET('/load?loadUser=true&loadQuery=true').respond(function(method, url, data){
        return [200, {
          user: {
            id: '58850c44d7ac1d981a000111',
            username: 'user'
          },
          linksList: [{
            _id: '58850c44d7ac1d981a000222',
            shortUrlCode: 12345,
            url: 'http://chaijs.com/api/assert/',
            username: 'user',
            userId: '58850c44d7ac1d981a000111',
            description: 'Some text',
            tags: ['test', tag],
            counter: 111
          }],
          queryText: tag,
          queryType: 'tag'
        }, {}];
      });

      dataService.loadData();
      $httpBackend.flush();

      assert(dataService.searchMode);
      assert.equal(dataService.queryType, "tag");
      assert.equal(dataService.queryText, tag);

      assert.deepEqual(dataService.user, {
        id: '58850c44d7ac1d981a000111',
        username: 'user',
        totalClicks: 0
      });

      assert.deepEqual(dataService.linksList, [{
        id: "58850c44d7ac1d981a000222",
        counter: 111,
        description: "Some text",
        shortUrl: "te.st/29ix",
        shortUrlCode: 12345,
        tags: ['test', tag],
        url: "http://chaijs.com/api/assert/",
        userId: "58850c44d7ac1d981a000111",
        username: "user"
      }]);

      done();
    });

    it('Should return error message', function() {

      $httpBackend.whenGET('/load?loadProfile=true').respond(function(method, url, data){
        return [403, {
          message: "Forbidden for unauthorized user!"
        }, {}];
      });

      dataService.showMessageText = false;
      dataService.messageText = '';

      dataService.loadData({loadProfile: true});
      $httpBackend.flush();

      assert(dataService.showMessageText);
      assert.equal(dataService.messageText, "Forbidden for unauthorized user!");
    });
  });
});
