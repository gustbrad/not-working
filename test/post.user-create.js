require("dotenv");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server");
const mongoose = require("mongoose");
const db = require("../models");
const expect = chai.expect;

chai.use(chaiHttp);

var request;

describe("POST /api/user", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  
  beforeEach(function() {
    request = chai.request(app);

     mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/ensembleMe", {useNewUrlParser: true});
     mongoose.set("useCreateIndex", true);
     mongoose.set("useFindAndModify", false);
  });
  
  it("should create a new user document in the database", function(done) {
    // Add some examples to the db to test with 
        let testUser = {
             username: "JohnDoe",
             email: "john7doe@email.com",
             password: "likesDogs",
             isMusician: true
        };
        // Run assertions on the response
        request
          .post(`/api/user`)
          .send(testUser)
          .end((err, result)=>{
               var responseStatus = result.status;
               var responseBody = result.body;

               // Run assertions on the response

               expect(err).to.be.null;

               expect(responseStatus).to.equal(200);

               expect(responseBody)
                    .to.be.an("object")
                    .that.includes(testUser);
          });

        // The `done` function is used to end any asynchronous tests
        done();
      });
});
