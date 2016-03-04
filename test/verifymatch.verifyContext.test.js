var verifyContext = require('../lib/verifymatch').verifyContext;
var tape = require('tape');

tape('[100 main st] vs [seattle][washington]', function(assert) {
    var groups = [ 0, 1, 2, 3 ];
    var query = ["100", "main", "st", "seattle", "washington"];
    var context = [
        {
            "properties": {
                "carmen:text": "Main St",
                "carmen:tmpid": 100663396
            }
        },
        {
            "properties": {
                "carmen:text": "Cold City",
                "carmen:tmpid": 33554537
            }
        }
    ];
    var strict = {
        "100663396": {
            "relev": 0.6,
            "mask": parseInt('111',2),
            "text": "1## main st"
        }
    };

    // TODO relev should be roughly equal to 0.50 once rebalanced
    // [100 main st] [?????]
    console.log(verifyContext(query, context, strict, {}, groups));
    assert.equal(verifyContext(query, context, strict, {}, groups), 0.5);
    assert.end();
});

tape('[100 main st] vs [seattle][washington]', function(assert) {
    var groups = [ 0, 1, 2, 3 ];
    var query = ["100", "main", "st", "seattle", "washington" ];
    var context = [
        {
            "properties": {
                "carmen:tmpid": 33554532,
                "carmen:text": "Seattle"
            }
        },
        {
            "properties": {
                "carmen:tmpid": 100,
                "carmen:text": "Washington"
            }
        }
    ];
    var strict = {
        "100": {
            "relev": 0.2,
            "mask": parseInt('10000',2),
            "text": "washington"
        },
        "33554532": {
            "relev": 0.2,
            "mask": parseInt('1000',2),
            "text": "seattle"
        }
    };

    // TODO relev should be roughly equal to 0.66 once rebalanced
    // [?????] [seattle] [washington]
    assert.equal(verifyContext(query, context, strict, {}, groups), 0.66);
    assert.end();
});

tape('[100 market] vs [12345][seattle][washington]', function(assert) {
    var groups = [ 0, 1, 2, 3 ];
    var query = ["100", "market", "12345", "seattle", "washington" ];
    var context = [
        {
            "properties": {
                "carmen:text": "Market",
                "carmen:tmpid": 100663397
            }
        }
    ];
    var strict = {
        "100663397": {
            "relev": 0.4,
            "mask": parseInt('11',2),
            "text": "1## market"
        }
    };

    // TODO relev should be roughly equal to 0.50 once rebalanced
    // [100 market] [?????]
    assert.equal(verifyContext(query, context, strict, {}, groups), 0.5);
    assert.end();
});

tape('[100 market] vs [12345][seattle][washington]', function(assert) {
    var groups = [ 0, 1, 2, 3 ];
    var query = ["100", "market", "12345", "seattle", "washington" ];
    var context = [
        {
            "properties": {
                "carmen:text": "12345",
                "carmen:tmpid": 67108964
            }
        },
        {
            "properties": {
                "carmen:tmpid": 33554532,
                "carmen:text": "Seattle"
            }
        },
        {
            "properties": {
                "carmen:tmpid": 100,
                "carmen:text": "Washington"
            }
        }
    ];
    var strict = {
        "100": {
            "relev": 0.2,
            "mask": parseInt('10000',2),
            "text": "washington"
        },
        "33554532": {
            "relev": 0.2,
            "mask": parseInt('1000',2),
            "text": "seattle"
        },
        "67108964": {
            "relev": 0.2,
            "mask": parseInt('100',2),
            "text": "12345"
        }
    };

    // TODO relev should be roughly equal to 0.75 once rebalanced
    // [?????] [12345] [seattle] [washington]
    assert.equal(verifyContext(query, context, strict, {}, groups), 0.75);
    assert.end();
});

