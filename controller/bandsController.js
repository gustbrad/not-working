const db = require("../models");
const mongoose = require("mongoose");
const Musician = db.Musician;
const Band = db.Band;
const Instrument = db.Instrument

function filterInstruments(results, instrumentArr, exp){
  let searchResults =[];
  let checkInstruments = (instrumentArr[0] instanceof RegExp)? false: true;
  for(let i = 0; i < results.length; i++){
        for(let j=0; j < results[i].instrumentsDesired.length; j++){
              if(!results[i].instrumentsDesired[j].isMusician){
                    if(results[i].instrumentsDesired[j].yearsExp >= exp){
                          if(checkInstruments && instrumentArr.includes(results[i].instrumentsDesired[j].instrument)){
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
          db.Band
            .find(req.body)
            .sort({ date: -1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
        }
     ,
    findById: function(req, res) {
          db.Band
            .findById(req.params.id)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    create: function(req, res) {
      let instrumentsDesired = req.body.instruments; 
      let newBand = new Band({
            _id: new mongoose.Types.ObjectId(),
            bandName: req.body.bandName,
            location: req.body.location,
            musicGenre: req.body.musicGenre,
            bandVideoLink: req.body.videoUrl,
            instrumentsPlayed: [],
            userInfo: req.body.userId,
      });

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
            if(err) throw new Error(`\nCould Not Save new Band ${newBand}:\n\t${err}`)
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
    },
    search: function(req, res) {
      let bandQuery={};
      if(req.query.location !== undefined) bandQuery.location = req.query.location;
      if(req.query.genre !== undefined) bandQuery.musicGenre = req.query.genre;
      let instruments = (req.query.instruments !== undefined)? req.query.instruments.split(","):[/^\S/];
      let exp = (req.query.exp !== undefined)? Number(req.query.exp): 0;
      console.log(JSON.stringify(bandQuery) + '\n' + instruments +'\n' + exp);
      db.Band.find({})
      .populate({
            path: "instrumentsDesired",
            select: "instrument yearsExp isMusician",
            match: {
                  yearsExp: {$gte: exp},
                  instrument: {$in: [...instruments]}
            }
      })
      .where(bandQuery)
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
    update: function(req, res) {
          db.Band
            .findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
       },
     remove: function(req, res) {
          db.Band
            .findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
      }
};
