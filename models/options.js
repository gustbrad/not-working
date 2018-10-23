var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var OptionsSchema = new Schema({
     emailNotify : {
          type: Boolean,
          default: true
     }
});

// This creates our model from the above schema, using mongoose's model method
var Options = mongoose.model("Options", OptionsSchema);

// Export the Article model
module.exports = Options;
