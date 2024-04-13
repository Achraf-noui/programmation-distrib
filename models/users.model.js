const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const { roles } = require('../config/roles.config');
var passportLocalMongoose = require('passport-local-mongoose'); 

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: [validator.isEmail, 'Invalid email'],
    },
    // password: {
    //   type: String,
    //   required: true,
    //   trim: true,
    //   minlength: 8,
    //   validate: [
    //     {
    //       validator: (value) => /\d/.test(value) && /[a-zA-Z]/.test(value),
    //       message: 'Password must contain at least one letter and one number',
    //     },
    //   ],
    // },
    role: {
      type: String,
      enum: roles,
      default: 'user',
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    establishment: {
      type: Schema.Types.ObjectId,
      ref: 'Establishment',
    },
  },
  {
    timestamps: true,
  },
);

//plugin Passport-Local Mongoose into schema
userSchema.plugin(passportLocalMongoose, {usernameField: "email"});

// Static method to check if email is already taken
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

// userSchema.methods.authenticate = function (password) {
//   return this.constructor.authenticate()(this.email, password);
// };

module.exports = mongoose.model('User', userSchema);
