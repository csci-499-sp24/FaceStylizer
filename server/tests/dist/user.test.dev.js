"use strict";

var _require = require('mongodb'),
    MongoClient = _require.MongoClient;

var db_name = process.env.DB_NAME || "FaceStylizerDB";
var mongoUrl = process.env.MONGO_URL || "mongodb://root:password@localhost:27017";
describe('insert', function () {
  var connection;
  var db;
  beforeAll(function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(MongoClient.connect(mongoUrl, {
              useNewUrlParser: true,
              useUnifiedTopology: true
            }));

          case 2:
            connection = _context.sent;
            _context.next = 5;
            return regeneratorRuntime.awrap(connection.db(db_name));

          case 5:
            db = _context.sent;

          case 6:
          case "end":
            return _context.stop();
        }
      }
    });
  });
  afterAll(function _callee2() {
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(connection.close());

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    });
  });
  it('should insert a doc into collection', function _callee3() {
    var users, mockUser, insertedUser;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            users = db.collection('users');
            mockUser = {
              _id: 'some-user-id',
              username: 'johndoe',
              password: 'password'
            };
            _context3.next = 4;
            return regeneratorRuntime.awrap(users.insertOne(mockUser));

          case 4:
            _context3.next = 6;
            return regeneratorRuntime.awrap(users.findOne({
              _id: 'some-user-id'
            }));

          case 6:
            insertedUser = _context3.sent;
            expect(insertedUser).toEqual(mockUser);

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    });
  });
});
describe('post/auth', function () {
  var connection;
  var db;
  beforeAll(function _callee4() {
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return regeneratorRuntime.awrap(MongoClient.connect(mongoUrl, {
              useNewUrlParser: true,
              useUnifiedTopology: true
            }));

          case 2:
            connection = _context4.sent;
            _context4.next = 5;
            return regeneratorRuntime.awrap(connection.db(db_name));

          case 5:
            db = _context4.sent;

          case 6:
          case "end":
            return _context4.stop();
        }
      }
    });
  });
  afterAll(function _callee5() {
    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return regeneratorRuntime.awrap(connection.close());

          case 2:
          case "end":
            return _context5.stop();
        }
      }
    });
  });
  it('should post new user if non existing', function _callee6() {
    var users, newUser, insertedUser;
    return regeneratorRuntime.async(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            users = db.collection('users');
            newUser = {
              username: 'someemailtotest@gmail.com'
            };
            _context6.next = 4;
            return regeneratorRuntime.awrap(users.insertOne(newUser));

          case 4:
            _context6.next = 6;
            return regeneratorRuntime.awrap(users.findOne({
              username: 'someemailtotest@gmail.com'
            }));

          case 6:
            insertedUser = _context6.sent;
            expect(insertedUser).toEqual(newUser);

          case 8:
          case "end":
            return _context6.stop();
        }
      }
    });
  });
  it('if existing in db check if so', function _callee7() {
    var users, emailtotest, userFromDb;
    return regeneratorRuntime.async(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            users = db.collection('users');
            emailtotest = "someemailtotest@gmail.com";
            _context7.next = 4;
            return regeneratorRuntime.awrap(users.findOne({
              username: emailtotest
            }));

          case 4:
            userFromDb = _context7.sent;
            expect(userFromDb).toBeDefined();
            expect(userFromDb.username).toEqual(emailtotest);

          case 7:
          case "end":
            return _context7.stop();
        }
      }
    });
  });
});