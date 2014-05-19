var delay = 800;

module.exports = {
  'Check Boston Weather': function (browser) {
    browser.url('http://localhost:3000')
    .assert.title('Weather!')
    .pause(delay) // for demo purpose only

    .setValue('input[name=city]', 'boston')
    .pause(delay) // for demo purpose only

    .setValue('input[name=country]', ['us', browser.Keys.ENTER])
    .pause(delay) // for demo purpose only

    .getText('[data-role=location]', function (result) {
      this.assert.equal(result.value, 'boston, us');
    });
    // .end();
  }
};

module.exports = {
  'Check Boston Weather': function (browser) {
    browser.url('http://www.modern.ie')
           .assert.title('Interoperability, Browser & Cross Platform Testing | Modern.IE')
           .end();
  }
};
