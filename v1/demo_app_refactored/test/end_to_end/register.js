var delay = 800;

module.exports = {
  'Register new account': function (browser) {
    browser.url('http://localhost:9191/demo_app_refactored/site/')
    .assert.title('Create Account')
    .pause(delay) // for demo purpose only
    .setValue('input[name=full-name]', 'Seth McLaughlin')
    .pause(delay) // for demo purpose only
    .setValue('input[name=email]', 'seth@seth.com')
    .pause(delay) // for demo purpose only
    .setValue('input[name=password]', 'bestpasswordEVER')
    .pause(delay) // for demo purpose only
    .setValue('input[name=confirm-password]', 'bestpasswordEVER')
    .pause(delay) // for demo purpose only
    .click('input[type=submit]')
    .pause(delay) // for demo purpose only
    .assert.title('Success!')
    .pause(delay) // for demo purpose only
    .getText('#content p', function (result) {
      this.assert.equal(result.value, 'Thanks for creating an account.');
    })
    .end();
  }
};
