const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var UserSchema = new Schema({
  username: {
     type: String,
     required: true
  },
  email: {
     type: String,
     unique: true,
     required: true
  },
  password: {
     type: String,
     required: true
  },
  isMusician: {
       type: Boolean,
       required: true, 
       default: true
  },
  profile_Options: {
     type: Schema.Types.ObjectId,
     ref: "Options"
  },
  musicianInfo: {
     type: Schema.Types.ObjectId,
     ref: "Musician"
  },
  bandInfo: {
       type: Schema.Types.ObjectId,
       ref: "Band"
  }
});

// Define schema methods
UserSchema.methods = {
	checkPassword: function(inputPassword) {
		return bcrypt.compareSync(inputPassword, this.password)
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10)
	}
}

// Define hooks for pre-saving
UserSchema.pre('save', function(next) {
	if (!this.password) {
		console.log('=======NO PASSWORD PROVIDED=======')
		next()
	} else {
		this.password = this.hashPassword(this.password)
		next()
	}
})

// This creates our model from the above schema, using mongoose's model method
const User = mongoose.model("User", UserSchema);

// Export the Article model
module.exports = User;
