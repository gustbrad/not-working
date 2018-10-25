const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server");
const mongoose = require("mongoose");
const db = require("../models");
const expect = chai.expect;

chai.use(chaiHttp);

var request;

describe("GET /api/user/:id", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  
  beforeEach(function() {
    request = chai.request(app);

     mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/ensembleMe", {useNewUrlParser: true});
     mongoose.set("useCreateIndex", true);
     mongoose.set("useFindAndModify", false);
  });
  
  it("should return a json of the user document matching a provided user ID", function(done) {
    // Add some examples to the db to test with 
        let testUser = {
             username: "JaneDoe",
             email: "jane8doe@email.com",
             password: "likesCats",
             isMusician: false
        };

        db.User.create(testUser, (error, result) =>{
          if(err) throw new Error(`Can not create Test User: ${error}`);
             // Run assertions on the response
            request
              .get(`/api/user/${result._id}`)
              .end((err, response)=>{
                var responseStatus = response.status;
                var responseBody = response.body;

                // Run assertions on the response
                expect(err).to.be.null;

                expect(responseStatus).to.equal(200);

                expect(responseBody)
                    .to.be.an("object")
                    .that.includes(testUser)
                    .that.includes({
                      _id: result._id
                    });
              });
        });  
        // The `done` function is used to end any asynchronous tests
            done(); 
      });
});
