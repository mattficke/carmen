var tape = require('tape');
var closestLangLabel = require('../lib/util/closest-lang');

tape('closestLangLabel', function(assert) {
    // English variations:
    assert.equal(closestLangLabel('en', {
        'en': 'English',
        'es': 'Spanish'
    }), 'English');
    assert.equal(closestLangLabel('en-XX', {
        'en': 'English',
        'es': 'Spanish'
    }), 'English');

    // Chinese variations:
    // Is -/_ and case insensitive but will revert to zh for otherwise unmatched
    // country suffixes.
    var zh = '西北部联邦管区';
    var zht = '西北部聯邦管區';
    assert.equal(closestLangLabel('zh', { zh: zh, zh_Hant: zht }), zh);
    assert.equal(closestLangLabel('zh-xx', { zh: zh, zh_Hant: zht }), zh);
    assert.equal(closestLangLabel('zh-hant', { zh: zh, zh_Hant: zht }), zht);
    assert.equal(closestLangLabel('zh_hant', { zh: zh, zh_Hant: zht }), zht);
    assert.equal(closestLangLabel('zh-Hant', { zh: zh, zh_Hant: zht }), zht);
    assert.equal(closestLangLabel('zh_Hant', { zh: zh, zh_Hant: zht }), zht);
    assert.equal(closestLangLabel('zh-HANT', { zh: zh, zh_Hant: zht }), zht);
    assert.equal(closestLangLabel('zh_HANT', { zh: zh, zh_Hant: zht }), zht);

    assert.end();
});

tape('handle nulls', function(assert) {

    var zh = '帝力縣';
    var zhtw = null;

    assert.equal(closestLangLabel('zh-TW', { zh: zh, zh_TW: zhtw }), zh);

    assert.end();
});

tape('handle nulls w/ prefix', function(assert) {

    var zh = '帝力縣';
    var zhtw = null;

    assert.equal(closestLangLabel('zh_TW', { 'carmen:text_zh': zh, 'carmen:text_zh_TW': zhtw }, 'carmen:text_'), zh);

    assert.end();
});
