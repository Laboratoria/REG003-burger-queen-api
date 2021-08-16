const mongoose = require('mongoose');

const { Schema } = mongoose;
// const bcrypt = require('bcrypt');

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    require: [true, 'Email is required'],
  },
  password: {
    type: String,
    require: true,
  },
  roles: {
    admin: { type: Boolean },
  },
});

// fx que pre salva en la bd el objeto
// hashea o encripta la contraseña antes de guardarla
userSchema.pre('save', (next) => {
  const user = this;
  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

module.exports = mongoose.model('User', userSchema);
