/**
 * @constructor
 */
function ValidatedForm() {}

/**
 * @method create
 * @static
 */
ValidatedForm.create = function () {
  var form = new ValidatedForm();
  form.init.apply(form, arguments);
  return form;
};

/**
 * @method init
 * @param {string} formSelector
 * @param {object} config
 */
ValidatedForm.prototype.init = function (formSelector, config) {
  this.checks  = config.checks;
  this.errorEl = document.querySelector(config.errorField);
  this.formEl  = document.querySelector(formSelector);
  this.formEl.addEventListener('submit', this.onSubmit.bind(this));
};

/**
 * @method onSubmit
 * @param {DOMEvent} e
 */
ValidatedForm.prototype.onSubmit = function (e) {
  this.checks.every(function (check) {
    var isValid;

    check.patterns.every(function (pattern) {
      isValid = this[pattern].apply(this, (this.fieldValues(check.fields)));

      if (!isValid) {
        e.preventDefault();
        this.fail(check.errorMsg);
      }

      return isValid;
    }, this);

    return isValid;
  }, this);
};

/**
 * @method fieldValues
 * @param {array} selectors
 */
ValidatedForm.prototype.fieldValues = function (selectors) {
  return selectors.map(function (selector) {
    return document.querySelector(selector);
  }).map(function (el) {
    return el.value;
  });
};

/**
 * @method fail
 * @param {string} errorMsg
 */
ValidatedForm.prototype.fail = function (errorMsg) {
  this.errorEl.innerHTML = errorMsg;
};

/**
 * @method fullName
 * @param {string} value
 */
ValidatedForm.prototype.fullName = function (value) {
  return Boolean(value.match(/^\s*[a-zA-Z]+\s+[a-zA-Z]+\s*$/));
};

/**
 * @method validEmail
 * @param {string} value
 */
ValidatedForm.prototype.validEmail = function (value) {
  return Boolean(value.match(/\w+@\w+\.[\w]{1,4}/));
};

/**
 * @method exactMatch
 * @param {string} value1
 * @param {string} value2
 */
ValidatedForm.prototype.exactMatch = function (value1, value2) {
  return value1 === value2;
};

/**
 * @method notEmpty
 * @param {string} value
 */
ValidatedForm.prototype.notEmpty = function (value) {
  return value.trim() !== '';
};



















