var request = require('supertest');

describe('iAdvize VDM', function() {
    var server;

    beforeEach(function () {
        server = require('../app');
    });

    afterEach(function () {
        server.close();
    });

    it('test server /', function testSlash(done) {
        request(server)
        .get('/')
        .expect(200, done);
    });

    it('test server /api/posts', function testSlash(done) {
        request(server)
        .get('/')
        .expect(200, done);
    });
});
