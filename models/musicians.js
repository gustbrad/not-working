var mongoose = require("mongoose");
// const bcrypt = require('bcryptjs');


// Save a reference to the Schema constructor
var Schema = mongoose.Schema;
mongoose.promise = Promise

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model

var MusicianSchema = new Schema({
  firstName: {
     type: String,
     required: true
  },
  lastName: {
     type: String,
     required: true
  },
  genre: {
    type: String,
    required: false,
  },
  location: {
     type: String,
     required: true
  },
  instrumentsPlayed: [{
    type: Schema.Types.ObjectId,
    ref: "Instrument"
  }],
  videoLink: {
    type: String,
    required: false,
    default: null
  },
  // local: {
	// 	email: { type: String, unique: false, required: false },
	// 	password: { type: String, unique: false, required: false }
	// },
});


// This creates our model from the above schema, using mongoose's model method
var Musician = mongoose.model("Musician", MusicianSchema);

// Export the Article model
module.exports = Musician;
