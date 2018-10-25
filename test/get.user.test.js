const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server");
const mongoose = require("mongoose");
const db = require("../models");
const expect = chai.expect;

chai.use(chaiHttp);

var request;

describe("GET /api/user", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  
  beforeEach(function() {
    request = chai.request(app);

     mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/ensembleMe", {useNewUrlParser: true});
     mongoose.set("useCreateIndex", true);
     mongoose.set("useFindAndModify", false);
  });
  
  it("should return a json of all user documents", function(done) {
       db.User.find().then(results=>{

             // Run assertions on the response
            request
              .get(`/api/user/`)
              .end((err, response)=>{
                var responseStatus = response.status;
                var responseBody = response.body;

                // Run assertions on the response
                expect(err).to.be.null;

                expect(responseStatus).to.equal(200);

                expect(responseBody)
                    .to.be.an("object")
                    .that.includes(results)
              });
        });  
        // The `done` function is used to end any asynchronous tests
            done(); 
      });
});
