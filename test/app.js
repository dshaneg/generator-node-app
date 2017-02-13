'use strict';

const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-shane:app', () => {
  before(() =>
    helpers.run(path.join(__dirname, '../generators/app'))
    .withPrompts({
      someAnswer: true
    })
    .toPromise()
  );

  it('creates files', () => {
    assert.file([
      'package.json'
    ]);
  });
});
