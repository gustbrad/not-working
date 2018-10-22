require("dotenv");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server");
const mongoose = require("mongoose");
const db = require("../models");
const expect = chai.expect;

chai.use(chaiHttp);

var request;

describe("POST /api/musician", function() {
     // Before each test begins, create a new request server for testing
     // & delete all examples from the db
     
     beforeEach(function() {
          request = chai.request(app);
          // Start up the Mongoose Database
          mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/ensembleMe", {useNewUrlParser: true});
          mongoose.set("useCreateIndex", true);
          mongoose.set("useFindAndModify", false);
     });
  
     it("should return all the musician documents that match the provided location", function(done) {
          // Add some examples to the db to test with 
       
          done();
     });
     it("should return all the musician documents that match the provided genre", function(done) {
          // Add some examples to the db to test with 
          
          done();
     });
     it("should return all the musician documents that match the provided instrument", function(done) {
          // Add some examples to the db to test with 
          
          done();
     });
     it("should return all the musician documents that match the provided desired experience", function(done) {
          // Add some examples to the db to test with 
          
          done();
     });
});
