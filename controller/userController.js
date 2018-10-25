const db = require("../models");
const mongoose = require("mongoose");
const User = db.User;
const Band = db.Band;
const Musician = db.Musician;
const Instrument = db.Instrument;

// Defining methods for the booksController
module.exports = {
     findAll: function(req, res) {
               db.User
                    .find(req.body)
                    .populate("musicianInfo")
                    .populate("bandInfo")
                    .populate("instrumentsPlayed")
                    .populate("instrumentsDesired")
                    .then(dbModel => res.json(dbModel))
                    .catch(err => res.status(422).json(err));
          },
     findById: function(req, res) {
               db.User
                    .findById(req.params.id)
                    .populate("musicianInfo")
                    .then(dbModel => res.json(dbModel))
                    .catch(err => res.status(422).json(err));
          },
     signup: function(req, res) {
           console.log(`Building New User Document`);
            let newUser = new User({
                _id: new mongoose.Types.ObjectId(),
                username: `${req.body.firstName} ${req.body.lastName}`,
                email: req.body.email,
                password: req.body.password,
                isMusician: req.body.isMusician,
               });
            if(newUser.isMusician){
                  console.log(`New User is a Musician`);
                  let instrumentPlayed = req.body.instruments;
                  console.log(`Building New Musician Document`);
                  let newMusician = new Musician({
                        _id: new mongoose.Types.ObjectId(),
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        location: req.body.location,
                        videoLink: req.body.videoLink,
                        instrumentsPlayed: [],
                        userInfo: newUser._id
                  });
                  newUser.musicianInfo = newMusician._id;
                  console.log(`Saving New User Document`);
                  newUser.save((err, savedUser)=>{
                        if(err){
                              throw new Error(`Could not save new User:\n\t${err}`);
                        }
                        else{
                              res.json(savedUser);
                              console.log(`Building New Intrument Documents`);
                              instrumentPlayed.forEach(element=>{
                                    let newInstrument = new Instrument({
                                          _id: new mongoose.Types.ObjectId(),
                                          instrument: element.instrument,
                                          yearsExp: element.yearsExp,
                                          isMusician: true,
                                          musicianInfo: newMusician._id
                                    });
                                    newMusician.instrumentsPlayed.push(newInstrument);
                                    console.log(`Saving new Instrument Document`);
                                    newInstrument.save((err=>{
                                          if(err) throw new Error(`\nCould Not Save new Instrument ${newInstrument}:\n\t${err}`);    
                                    }));
                              });
                              console.log(`Saving New Musician Document`);
                              newMusician.save((err=>{
                                    if(err) throw new Error(`\nCould Not Save new Musician ${newMusician}:\n\t${err}`)
                                    Musician.findById(newMusician._id)
                                    .populate("instrumentsPlayed")
                                    .then(result=>{
                                          console.log(`New Musician Document Created:\n\t${result}`);                   
                                    })
                                    .catch(err=> {
                                          throw new Error(`\nCould not Retrieve the newly Created Musician:\n\t${err}`);
                                    })
                              }));
                        }
                  })
            }
            else {
                  let instrumentsDesired = req.body.instruments;
                  let newBand = new Band({
                        _id: new mongoose.Types.ObjectId(),
                        bandName: req.body.bandName,
                        location: `${req.body.city}, ${req.body.state}`,
                        musicGenre: req.body.genre,
                        bandVideoLink: req.body.bandVideoLink,
                        instrumentsDesired: [],
                        userInfo: newUser._id
                  });
                  newUser.bandInfo = newBand._id;
                  newUser.save((err, savedUser)=>{
                        if(err){
                              throw new Error(`Could Not Save New User:\n\t${err}`);
                        }
                        else{
                              res.json(savedUser);
                              instrumentsDesired.forEach(element=>{
                              let newInstrument = new Instrument({
                                    _id: new mongoose.Types.ObjectId(),
                                    instrument: element.instrument,
                                    yearsExp: element.yearsExp,
                                    isMusician: false,
                                    bandInfo: newBand._id
                              });
                              newBand.instrumentsDesired.push(newInstrument);
                              newInstrument.save((err=>{
                                    if(err) throw new Error(`\nCould Not Save new Instrument ${newInstrument}:\n\t${err}`);    
                              }));
                              });
                              newBand.save((err=>{
                                    if(err) throw new Error(`\nCould Not Save new Musician ${newMusician}:\n\t${err}`)
                                    Band.findById(newBand._id)
                                    .populate("instrumentsDesired")
                                    .then(result=>{
                                          res.json(result);
                                          db.User.findByIdAndUpdate(req.body.userId,{
                                                bandInfo: result._id
                                          })
                                          .then(result=>{
                                                console.log(`\nUser Information updated...\n`);
                                          })
                                          .catch(err=>{
                                                throw new Error(`\nCould Not update User Information:\n\t${err}`);
                                          })
                                          
                                    })
                                    .catch(err=> {
                                          throw new Error(`\nCould not Retrieve the newly Created Musician:\n\t${err}`);
                                    })
                              }));   
                        }
                  })
                  
            }
         },
     update: function(req, res) {
               db.User
                    .findOneAndUpdate({ _id: req.params.id }, req.body)
                    .then(dbModel => res.json(dbModel))
                    .catch(err => res.status(422).json(err));
          },
     remove: function(req, res) {
               db.User
                    .findById({ _id: req.params.id })
                    .then(dbModel => dbModel.remove())
                    .then(dbModel => res.json(dbModel))
                    .catch(err => res.status(422).json(err));
         },
};
