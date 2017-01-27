
//process.env.NODE_ENV = 'test';
process.env.NODE_ENV = 'development';
var config = require('config');

var mongoose = require("mongoose");

var User = require('../models/user').User;
var Link = require('../models/link').Link;
var Counter = require('../models/counter').Counter;
var Session = require('../models/session').Session;

var app = require('../app');

//Require the dev-dependencies
var chai = require('chai');

var assert = chai.assert;
var supertest = require('supertest');
var session = require('supertest-session');
var _ = require('underscore');
var linkId, shortUrlCode, userId;

var testSession = session(app);

describe('/register', function () {
	describe('/register POST', function () {

		before(function () {
    	User.remove({username: 'new-user'}, function (err, user) {
        if (err) return next(err);
				console.log('*');
		  });
    });

		before(function () {
    	Link.remove({url: "https://github.com/visionmedia/supertest"}, function (err, link) {
        if (err) return next(err);
		  });
    });

    it('should register a new user', function (done) {

      testSession
			.post('/register')
			.send({username: 'new-user', password: 'new-user'})
			.expect(200)
			.end(function (err, res) {
				if (err) return done(err);

				User.findOne({username: 'new-user'}).select({_id: 1, username: 1})
				.exec(function (err, user) {
					if (err) return done(err);

					assert.equal(user.username, 'new-user');

					testSession
					.post('/register')
					.send({username: 'new-user', password: 'new-user'})
					.expect(403)
					.end(function (err, res) {
						if (err) return done(err);

						assert.equal(res.status, 403);

						testSession
						.post('/logout')
						.expect(200)
						.end(function (err, res) {
							if (err) return done(err);

							done();
					  });
					});
				});
      });
    });

		it('should abort registration for a user with an existing username', function (done) {
			testSession
			.post('/register')
			.send({username: 'new-user', password: 'new-user'})
			.expect(200)
			.end(function (err, res) {
				if (err) return done(err);

				// var sessionCookie = _.find(testSession.cookies, function (cookie) {
				// 	return cookie.name === config.get('session').key;//connect.sid;
				// });
				// console.log(sessionCookie.value);

				assert.equal(res.body.message, "Username exists!");
				done();
			});
		})
	});
});

describe('/login and /logout', function () {
	describe('/login POST', function () {

    it('should abort logging in for unregistered user', function (done) {
			testSession
			.post('/login')
			.send({username: 'new-user2', password: 'new-user'})
			.expect(200)
			.end(function (err, res) {
				if (err) return done(err);

				assert.equal(res.body.message, "Username is not registered!");
        done();
			});
    });

		it('should abort logging in with incorrect password', function (done) {
			testSession
			.post('/login')
			.send({username: 'new-user', password: 'new-user2'})
			.expect(200)
			.end(function (err, res) {
				if (err) return done(err);

				assert.equal(res.body.message, "Password incorrect!");
        done();
			});
    });

		it('should log in and log out', function (done) {
			testSession
			.post('/login')
			.send({username: 'new-user', password: 'new-user'})
			.expect(200)
			.end(function (err, res) {
				if (err) return done(err);

				assert.equal(res.body.message, null);

				testSession
				.post('/logout')
				.expect(200)
				.end(function (err, res) {
					if (err) return done(err);

					done();
			  });
			});
    });
	});

	describe('/logout POST', function () {
		it('should abort logging out', function (done) {
			testSession
			.post('/logout')
			.expect(403)
			.end(function (err, res) {
				if (err) return done(err);

				assert.equal(res.body.message, "Forbidden for unauthorized user!");
				done();
			});
		});
  });
});


describe('/newlink', function () {
	describe('/newlink POST', function () {
    it('should creat new link for authenticated user', function (done) {

  		testSession
	  	.post('/login')
		  .send({username: 'new-user', password: 'new-user'})
  		.expect(200)
	  	.end(function (err, res) {
		  	if (err) return done(err);

				testSession
				.post('/newlink')
				.send({url: "https://github.com/visionmedia/supertest"})
				.expect(200)
				.end(function (err, res) {
					if (err) return done(err);

					assert.equal(res.body.counter, 0);

	        Link.findOne({url: "https://github.com/visionmedia/supertest"})
					.exec(function (err, link) {
						if (err) return done(err);

						assert.deepEqual(
							{url: link.url, username: link.username, counter: link.counter},
							{url: "https://github.com/visionmedia/supertest", username: "new-user", counter: 0}
						);
					  assert.equal(typeof link.shortUrlCode, "number");

						linkId = link._id;
						shortUrlCode = link.shortUrlCode;

						testSession
						.post('/logout')
						.expect(200)
						.end(function (err, res) {
							if (err) return done(err);

							done();
					  });
					});
	      });
		  });
		});
  });
});

describe('/link', function () {
	describe('/link POST', function () {
		it('should save description and tag list by link id', function (done) {

			testSession
 		  .post('/login')
 		  .send({username: 'new-user', password: 'new-user'})
 		  .expect(200)
 		  .end(function (err, res) {
 		    if (err) return done(err);

		    testSession
			  .post('/link')
			  .send({id: linkId, description: 'Some info', tags: ['testing', 'supertest']})
			  .expect(200)
			  .end(function (err, res) {
			    if (err) return done(err);

				  Link.findById(linkId, function (err, link) {
					  if (err) return done(err);

					  assert.equal(link.description, 'Some info');
					  for(var i = 0; i < link.tags.length; i++) {
					 	  assert.equal(link.tags[i], ["testing", "supertest"][i]);
					  }

						testSession
					  .post('/logout')
					  .expect(200)
					  .end(function (err, res) {
						  if (err) return done(err);
						  done();
					  });
				  });
			  });
		  });
		})
	});
});


describe('/redirect', function () {
	it('should redirect to long url stored in database by short url', function (done) {
		testSession
		.get('/2'+shortUrlCode.toString(36))
		.expect(302)
		.end(function (err, res) {
			if (err) return done(err);

      done();
    })
  });
});

describe('/load', function () {
  describe('/load GET', function () {
    it('should abort loading for unauthorized user', function (done) {
			testSession
			.get('/load')
			.query({loadProfile: true})
			.expect(403)
			.end(function (err, res) {
				if (err) return done(err);

        assert.equal(res.body.message, "Forbidden for unauthorized user!");
				done();
			});
    });

    it('should load data by current user', function (done) {
			testSession
 		  .post('/login')
 		  .send({username: 'new-user', password: 'new-user'})
 		  .expect(200)
 		  .end(function (err, res) {
 		    if (err) return done(err);
				console.log('u ='+res.body);
        userId = res.body.id;

				testSession
				.get('/load')
				.query({loadUser: true, loadQuery: true})
				.expect(200)
				.end(function (err, res) {
					if (err) return done(err);

          assert.deepEqual(
						{id: res.body.user._id, username: res.body.user.username},
						{id: userId, username: 'new-user'}
					);

					assert.equal(res.body.queryType, null);
					assert.equal(res.body.queryText, null);

					assert.deepEqual(
						{//_id: res.body.linksList[0]._id,
						 shortUrlCode: res.body.linksList[0].shortUrlCode,
						 url: res.body.linksList[0].url,
					   description: res.body.linksList[0].description},
						{//_id: linkId,
						 shortUrlCode: shortUrlCode,
						 url: 'https://github.com/visionmedia/supertest',
					   description: 'Some info'}
					);

					testSession
					.post('/logout')
					.expect(200)
					.end(function (err, res) {
						if (err) return done(err);
						done();
					});
				});
			});
    });
  });
});
