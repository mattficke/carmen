var grid = require('../lib/util/grid');
var test = require('tape');

test('grid', function(assert) {
    assert.throws(function() {
        grid.encode({ id: Math.pow(2,20) });
    }, Error, 'throws on bad id');

    assert.throws(function() {
        grid.encode({ id: 1, x: Math.pow(2,14) });
    }, Error, 'throws on bad x');

    assert.throws(function() {
        grid.encode({ id: 1, x:0, y: Math.pow(2,14) });
    }, Error, 'throws on bad y');

    assert.throws(function() {
        grid.encode({ id: 1, x:0, y:0, relev: 2 });
    }, Error, 'throws on bad relev');

    var data;
    var encoded;
    var decoded;

    data = { id: 1, x:5, y:4, relev: 1, score: 0 };
    encoded = grid.encode(data);
    decoded = grid.decode(encoded);
    assert.equal(encoded, 6755468165775361);
    assert.deepEqual(decoded, data);

    data = { id: 532, x:12, y:17, relev: 0.6, score: 7 };
    encoded = grid.encode(data);
    decoded = grid.decode(encoded);
    assert.equal(encoded, 4222416721019412);
    assert.deepEqual(decoded, data);

    data = { id: 1, x:1, y:1, relev: 1, score: -1 };
    decoded = grid.decode(grid.encode(data));
    assert.deepEqual(decoded, { id: 1, x:1, y:1, relev: 1, score: 0 }, 'truncates score < 0');

    data = { id: 1, x:1, y:1, relev: 1, score: 1241 };
    decoded = grid.decode(grid.encode(data));
    assert.deepEqual(decoded, { id: 1, x:1, y:1, relev: 1, score: 7 }, 'truncates score > 7');

    // fuzz
    var relevs = [0.4, 0.6, 0.8, 1.0];
    var scores = [0, 1, 2, 3, 4, 5, 6, 7];
    var pass = true;
    for (var i = 0; i < 1000; i++) {
        data = {
            id: Math.floor(Math.random() * Math.pow(2,20)),
            x: Math.floor(Math.random() * Math.pow(2,14)),
            y: Math.floor(Math.random() * Math.pow(2,14)),
            relev: relevs[Math.floor(Math.random() * 4)],
            score: scores[Math.floor(Math.random() * 8)],
        };
        encoded = grid.encode(data);
        decoded = grid.decode(encoded);
        pass = true && (
            data.id === decoded.id &&
            data.x === decoded.x &&
            data.y === decoded.y &&
            data.relev === decoded.relev &&
            data.score === decoded.score
        );
        if (!pass) assert.fail('fuzz test fail: ' + JSON.stringify(data));
    }
    assert.equal(pass, true, 'fuzz test x1000');

    assert.end();
});

