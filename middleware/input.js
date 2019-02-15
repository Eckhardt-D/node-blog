const bcrypt = require('bcryptjs');
const User = require('../database/models/User');

const testInput = (req, res, next) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];
  let tests = [
    {
      value: !name || !email || !password || !password2,
      msg: 'Please enter all fields'
    },
    { value: password != password2, msg: 'Passwords do not match' },
    {
      value: password.length < 6,
      msg: 'Password must be at least 6 characters'
    }
  ];

  // Run the tests
  tests.forEach(test => (test.value ? void errors.push(test.msg) : null));

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
};

module.exports = {
  testInput
};
