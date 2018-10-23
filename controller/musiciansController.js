const db = require("../models");
const Musician = db.Musician;
const Instrument = db.Instrument;
const User = db.User;
const mongoose = require("mongoose");

function filterInstruments(results, instrumentArr, exp){
      let searchResults =[];
      console.log(instrumentArr);
      let checkInstruments = (instrumentArr[0] instanceof RegExp)? false: true;
      console.log(checkInstruments);
      for(let i = 0; i < results.length; i++){
            console.log(`Checking the ${i}th Musician`);
            for(let j=0; j < results[i].instrumentsPlayed.length; j++){
                  console.log(`Checking the ${i}th Musician's ${j}th Instrument`);
                  if(results[i].instrumentsPlayed[j].isMusician){
                        if(results[i].instrumentsPlayed[j].yearsExp >= exp){
                              console.log(`${results[i].firstName} has played the ${results[i].instrumentsPlayed[j].instrument} for ${results[i].instrumentsPlayed[j].yearsExp} years.`);
                              if(checkInstruments && instrumentArr.includes(results[i].instrumentsPlayed[j].instrument)){
                                    searchResults.push(results[i])
                              } else if(!checkInstruments){
                                    searchResults.push(results[i]);
                              }
                        }
                  }
            }
      }
      return searchResults;
}
// Defining methods for the booksController
module.exports = {
      findAll: function(req, res) {
          db.Musician
            .find(req.body)
            .populate("userInfo")
            .sort({ date: -1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
      },
      findById: function(req, res) {
          db.Musician
            .findById(req.params.id)
            .populate("userInfo")
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
      },
      create: function(req, res) {
            let instrumentPlayed = req.body.instruments;
            let newMusician = new Musician({
                  _id: new mongoose.Types.ObjectId(),
                  firstName: req.body.firstName,
                  lastName: req.body.lastName,
                  location: req.body.location,
                  videoLink: req.body.videoUrl,
                  instrumentsPlayed: [],
                  userInfo: req.body.userId
            });
            instrumentPlayed.forEach(element=>{
                  let newInstrument = new Instrument({
                        _id: new mongoose.Types.ObjectId(),
                        instrument: element.instrument,
                        yearsExp: element.yearsExp,
                        isMusician: true,
                        musicianInfo: newMusician._id
                  });
                  newMusician.instrumentsPlayed.push(newInstrument);
                  newInstrument.save((err=>{
                        if(err) throw new Error(`\nCould Not Save new Instrument ${newInstrument}:\n\t${err}`);    
                  }));
            });
            newMusician.save((err=>{
                  if(err) throw new Error(`\nCould Not Save new Musician ${newMusician}:\n\t${err}`)
                  Musician.findById(newMusician._id)
                  .populate("instrumentsPlayed")
                  .then(result=>{
                        res.json(result);
                        db.User.findByIdAndUpdate(req.body.userId,{
                              musicianInfo: result._id
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
      },
      update: function(req, res) { 
          db.Musician
            .findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
      },
      search: function(req, res) {
            console.log(`I'm Searching for a Musician!!!`);
            let musicQuery={};
            if(req.query.location !== undefined) musicQuery.location = req.query.location;
            if(req.query.genre !== undefined) musicQuery.genre = req.query.genre;
            let instruments = (req.query.instruments !== undefined)? req.query.instruments.split(","):[/^\S/];
            let exp = (req.query.exp !== undefined)? Number(req.query.exp): 0;
            console.log(JSON.stringify(musicQuery) + '\n' + instruments +'\n' + exp);
            db.Musician.find({})
            .populate({
                  path: "instrumentsPlayed",
                  select: "instrument yearsExp isMusician",
                  match: {
                        yearsExp: {$gte: exp},
                        instrument: {$in: [...instruments]}
                  }
            })
            .where(musicQuery)
            .then(results=>{
                  if(!instruments instanceof RegExp || exp > 0){
                        let searchResults = filterInstruments(results, instruments, exp);
                        res.json(searchResults);  
                  } 
                  else res.json(results);
            })
            .catch(err=>{
                  throw new Error(`\nCould not Complete Search request:\n\t${err}`);
            })
      },
      remove: function(req, res) {
          db.Musician
            .findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
      },
};
