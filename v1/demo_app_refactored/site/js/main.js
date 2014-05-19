ValidatedForm.create('#create-account', {
  checks: [
    {
      fields: ['[name=full-name]'],
      patterns: ['fullName'],
      errorMsg: 'Please enter your full name'
    },
    {
      fields: ['[name=email]'],
      patterns: ['validEmail'],
      errorMsg: 'Valid e-mail is required'
    },
    {
      fields: ['[name=password]', '[name=confirm-password]'],
      patterns: ['notEmpty', 'exactMatch'],
      errorMsg: 'Password is required, and they must match'
    }
  ],
  errorField: '#error'
});
