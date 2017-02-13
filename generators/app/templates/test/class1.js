'use strict';

const chai = require('chai');
const Class1 = require('../lib/class1');

describe('Class1', () => {
  describe('Incremenet', () => {
    it('Should increment 2 to 5 with increment value of 3.', () => {
      const class1 = new Class1(3);
      chai.expect(class1.Increment(2)).to.equal(5);
    });
  });
});
