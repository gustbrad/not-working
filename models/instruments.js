var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var InstrumentSchema = new Schema({
    instrument: {
         type: String,
         required: true
    },
    yearsExp: {
         type: Number,
         required: false
    },
    isMusician: {
         type: Boolean,
         required: true,
         default: false
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

// This creates our model from the above schema, using mongoose's model method
var Instrument = mongoose.model("Instrument", InstrumentSchema);

// Export the Article model
module.exports = Instrument;
