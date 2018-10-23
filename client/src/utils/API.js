import axios from 'axios';
require('dotenv');
const QueryString = require("querystring");


function urlQueryString(json){
	let queryString = "";
	let key;
	for(key in json){
		queryString += `${key}=`;
		if(key === "instruments" && json[key].length > 0){
			queryString += json[key].join(",");
		}
		else{
			if(json[key] !== ""){
				queryString += json[key];
			}
		}
		queryString += `&`;
	}
	queryString = QueryString.stringify(queryString.slice(0, -1));
	console.log(queryString);
	return queryString;
}


export default {
	/* the GET '/api/musicians/APIkey=' route uses URL query strings.
		after the route URL, a question mark needs to be placed.
		Then the query strings can be listed one after another using '&amp'
		Spaces in strings need to be replaced by their encoded form: '%20'
		Currently the API only supports searches with single instruments and single exp queries
		example:
		{
			firstName: "Francis",
			lastName: "Biker",
			location: "Philedelphia, Pennsylvania",
			instruments: ["tuba", "drums", "harmonica"],
			experience: 4
		}
		`/api/musicians/APIkey=${process.env.APIkey}?location=Kansas%20City&ampgenre=jazz&ampinstrument=trumpet&ampexp=3`
	*/
     searchMusicians: function(queryObj){
          return axios.get(`/api/musicians/APIkey=${process.env.APIkey}?${urlQueryString(queryObj)}`)
	},
	searchBands: function(queryObj){
		return axios.get(`/api/bands/APIkey=${process.env.APIkey}?${urlQueryString(queryObj)}`)
	},
	/* EXAMPLE user signon request body:
		{
			"firstName" : "Francis",
			"lastName" : "Biker",
			"password" : "jellyfish",
			"email" : "francisBiker@email.com",
			"city" : "Philidelphia",
			"state" : "Pennsylvania",
			"isMusician" : true,
			"instruments" : [
				{
					"instrument" : "drums",
					"yearsExp" : 3
				},{
					"instrument" : "tuba",
					"yearsExp" : 5
				}
			]
		}
	*/
	newUserSignup: function(userObj){
		return axios.post(`/api/user/APIkey=${process.env.APIkey}`, userObj)
	},
	getMusicianById: function(id){
		return axios.get(`api/musicians/APIkey=${process.env.APIkey}/${id}`)
	},
	getBandById: function(id){
		return axios.get(`api/bands/APIkey=${process.env.APIkey}/${id}`)
	},
	getUserById: function(id){
		return axios.get(`api/user/APIkey=${process.env.APIkey}/${id}`)
	},
	// Musician, Band, and Instrument Information will be populated in the JSON
	getAllUsers: function(){
		return axios.get(`api/musicians/APIkey=${process.env.APIkey}`)
	}
}