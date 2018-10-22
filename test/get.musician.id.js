const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server");
const mongoose = require("mongoose");
const db = require("../models");
const expect = chai.expect;

chai.use(chaiHttp);

var request;

describe("GET /api/musician/:id", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  
  beforeEach(function() {
    request = chai.request(app);

     mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/ensembleMe", {useNewUrlParser: true});
     mongoose.set("useCreateIndex", true);
     mongoose.set("useFindAndModify", false);
  });
  
  it("should return a json of the musician document matching a provided musician ID", function(done) {
    // Add some examples to the db to test with 
    let testMusician = {
     firstName: "John",
     lastName: "Doe",
     location: "Ontario, CN",
     instrumentsPlayed: [
          {
               instrument: "trombone",
               yearsExp: 3
          },
          {
               instrument: "tuba",
               yearsExp: 1
          },
          {
               instrument: "guitar",
               yearsExp: 5
          }
     ],
     videoUrl: "https://www.youtube.com/watch?v=A71aqufiNtQ",
     userInfo: "5bb56f9824b30b34881ef5c9"
   };
        db.Musician.create(testMusician, (error, result) =>{
          if(err) throw new Error(`Can not create Test User: ${error}`);
             // Run assertions on the response
            request
              .get(`/api/musicians/${result._id}`)
              .end((err, response)=>{
                var responseStatus = response.status;
                var responseBody = response.body;

                // Run assertions on the response
                expect(err).to.be.null;

                expect(responseStatus).to.equal(200);

                expect(responseBody)
                    .to.be.an("object")
                    .that.includes(testMusician);
              });
        });  
        // The `done` function is used to end any asynchronous tests
            done(); 
      });
});
