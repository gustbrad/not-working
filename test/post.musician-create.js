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

     mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/ensembleMe", {useNewUrlParser: true});
     mongoose.set("useCreateIndex", true);
     mongoose.set("useFindAndModify", false);
  });
  
  it("should create a new musician document in the database", function(done) {
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
        // Run assertions on the response
        request
          .post(`/api/musicians`)
          .send(testMusician)
          .end((err, result)=>{
               var responseStatus = result.status;
               var responseBody = result.body;

               db.User.findById(responseBody.userInfo)
               .then(result=>{
                 // Run assertions on the response

                  expect(err).to.be.null;

                  expect(responseStatus).to.equal(200);

                  expect(responseBody)
                    .to.be.an("object")
                    .that.includes(testMusician);

                  expect(result)
                    .to.be.an("object")
                    .that.includes({
                      musicianInfo: responseBody._id
                    })
               })
          });

        // The `done` function is used to end any asynchronous tests
        done();
      });
      it('should also find the associated User document in the database and update the document with the "musicianInfo"', function(done){
        let testUser = {
            username: "ZoeyRed",
            email: "zoeyRed@email.com",
            password: "likesCats",
            isMusician: false
         };
         db.User.create(testUser, (error, result)=>{
          if(error) {
            throw new Error(`Could not create Test User for testing: ${error}`);
          }
          let testMusician = {
            firstName: "Zoey",
            lastName: "RedVest",
            location: "Buffalo, NY",
            instrumentsPlayed: [
                {
                      instrument: "trumpet",
                      yearsExp: 3
                },
                {
                      instrument: "harmonica",
                      yearsExp: 1
                },
                {
                      instrument: "piano",
                      yearsExp: 5
                }
            ],
            videoUrl: "https://www.youtube.com/watch?v=A71aqufiNtQ",
            userInfo: result._id
          };         
          // Run assertions on the response
          request
            .post(`/api/musicians`)
            .send(testMusician)
            .end((err, results)=>{
                var responseStatus = results.status;
                var responseBody = results.body;

                db.User.findById(responseBody.userInfo)
                .then(result=>{
                  // Run assertions on the response

                    expect(err).to.be.null;

                    expect(responseStatus).to.equal(200);

                    expect(responseBody)
                      .to.be.an("object")
                      .that.includes(testMusician);

                    expect(result)
                      .to.be.an("object")
                      .that.includes({
                        musicianInfo: responseBody._id
                      })
                })
            });
          });
          done();
      });
});
