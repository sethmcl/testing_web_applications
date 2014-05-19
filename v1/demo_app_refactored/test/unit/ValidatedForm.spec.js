/**
 * @venus-library mocha
 * @venus-code ../../site/js/ValidatedForm.js
 * @venus-fixture ValidatedForm.fixture.html
 */
describe('ValidatedForm', function () {
  var form;

  beforeEach(function () {
    form = ValidatedForm.create('#test-form', {
      checks: [
        {
          fields: ['#name'],
          patterns: ['fullName'],
          errorMsg: 'full_name_required'
        },
        {
          fields: ['#email'],
          patterns: ['validEmail'],
          errorMsg: 'email_required'
        },
        {
          fields: ['#equal-1', '#equal-2'],
          patterns: ['notEmpty', 'exactMatch'],
          errorMsg: 'values_must_match'
        }
      ],
      errorField: '#output'
    });
  });

  describe('full name validation', function () {
    it('should fail with one word', function () {
      expect(form.fullName('Seth')).to.be(false);
    });

    it('should require two words', function () {
      expect(form.fullName('foo bar')).to.be(true);
    });

    it('should ignore extra whitespace', function () {
      expect(form.fullName(' foo  bar')).to.be(true);
    });
  });

  describe('fail()', function () {
    it('should set correct message', function () {
      form.fail('that is a shame');
      expect(document.querySelector('#output').innerHTML).to.be('that is a shame');
    });
  });

  describe('fieldValues()', function () {
    beforeEach(function () {
      document.querySelector('#name').value  = 'Hi';
      document.querySelector('#email').value = 'woah';
    });

    it('should get one value', function () {
      var values = form.fieldValues(['#name']);
      expect(values).to.eql(['Hi']);
    });

    it('should get two values', function () {
      var values = form.fieldValues(['#name', '#email']);
      expect(values).to.eql(['Hi', 'woah']);
    });
  });

  describe('validEmail()', function () {
    it('should fail with no domain', function () {
      var result = form.validEmail('foo@.com');
      expect(result).to.be(false);
    });

    it('should fail with no username', function () {
      var result = form.validEmail('@foo.com');
      expect(result).to.be(false);
    });

    it('should pass with short address', function () {
      var result = form.validEmail('s@f.it');
      expect(result).to.be(true);
    });
  });

  describe('exactMatch()', function () {
    it('should accept two empty strings', function () {
      var result = form.exactMatch('', '');
      expect(result).to.be(true);
    });

    it('should fail with two different values', function () {
      var result = form.exactMatch('asoetnuhn', '09ao8eu');
      expect(result).to.be(false);
    });
  });

  describe('notEmpty()', function () {
    it('should fail on empty string', function () {
      var result = form.notEmpty('');
      expect(result).to.be(false);
    });

    it('should ignore additional whitespace', function () {
      var result = form.notEmpty('          ');
      expect(result).to.be(false);
    });

    it('should pass on non-empty string', function () {
      var result = form.notEmpty('.');
      expect(result).to.be(true);
    });
  });

  describe('onSubmit()', function () {
    var output, mockEvent;

    describe('failure', function () {
      beforeEach(function () {
        document.querySelector('#name').value    = 'Seth';
        document.querySelector('#email').value   = 's@s.com';
        document.querySelector('#equal-1').value = 'bar';
        document.querySelector('#equal-2').value = 'bar';
        outputEl = document.querySelector('#output');

        mockEvent = {
          preventDefault: sinon.spy()
        };

        form.onSubmit(mockEvent);
      });

      it('should cancel form submission', function () {
        expect(mockEvent.preventDefault.callCount).to.be(1);
      });

      it('should display correct error message', function () {
        var msg = document.querySelector('#output').innerHTML;
        expect(msg).to.be('full_name_required');
      });

    });

    describe('success', function () {
      beforeEach(function () {
        document.querySelector('#name').value    = 'Seth McLaughlin';
        document.querySelector('#email').value   = 's@s.com';
        document.querySelector('#equal-1').value = 'bar';
        document.querySelector('#equal-2').value = 'bar';
        outputEl = document.querySelector('#output');

        mockEvent = {
          preventDefault: sinon.spy()
        };

        form.onSubmit(mockEvent);
      });

      it('should not cancel form submission', function () {
        expect(mockEvent.preventDefault.callCount).to.be(0);
      });
    });
  });
});
