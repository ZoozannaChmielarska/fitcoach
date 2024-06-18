const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  weight: Number,
  height: Number,
  age: Number,
  sex: String,
  calorieIntake: Number,
  activityLevel: String,
  goal: String,
  dailyLogs: [{
      date: Date,
      weight: Number,
      calorieIntake: Number
  }]
});

UserSchema.methods.verifyPassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);