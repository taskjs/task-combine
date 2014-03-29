'use strict';

var assert = require('assert');
var Record = require('record');
var Combine = require('../lib/combine');

function errorHandler(err){
    process.nextTick(function rethrow() { throw err; });
}

(new Combine).run(
    [new Record({
        contents: 'foo',
        path: 'test/foo'
    }), new Record({
        contents: 'bar',
        path: 'test/bar'
    })], // inputs
    {
        banner: 'banner\n',
        footer: 'footer'
    }, // options
    console // logger
).then(function(inputs){
    assert.equal(inputs.contents.toString(), 'banner\nfoo\nbar\nfooter')
}).catch(errorHandler)
