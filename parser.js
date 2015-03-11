/*
Takes a chat message string and 
returns a JSON string containing information about its contents.
*/
function parseMessage(message) {
	var words = message.split(" "); //split does unnecessary copy, but let's assume fairly short messages

	metadata = {};
	for (word of words) {
		// TODO: parse for mentions, emoticons, and links as we go
		// TODO: make the code more modular/extensible to parse additional types of words
		if (word.length > 0) {
			if (word[0] === '@') { 
				var user = word.slice(1) //assumes validation of users is done by another module
				if (metadata.hasOwnProperty('mentions'))
					metadata.mentions.push(user);
				else 
					metadata.mentions = [user];
			}
			if (word[0] === '(' && word[word.length - 1] === ')') {
				//TODO: add to emoticons
			}
			if (word.indexOf('https://') === 0 || word.indexOf('http://') === 0) { 
				//assume links are always prefixed with https:// ? //maybe handle www also?
				//TODO: handle various corner cases - ie "http://", "http://xyz"
			}
		}
	}
	return JSON.stringify(metadata); 
}


//TODO: move below to test.js

// expected outputs
var mentions_json = {
  "mentions": [
    "chris"
  ]
}

var emoticons_json = {
  "emoticons": [
    "megusta",
    "coffee"
  ]
}

var links_json = {
  "links": [
    {
      "url": "http://www.nbcolympics.com",
      "title": "NBC Olympics | 2014 NBC Olympics in Sochi Russia"
    }
  ]
}

var mixed_json = {
  "mentions": [
    "bob",
    "john"
  ],
  "emoticons": [
    "success"
  ],
  "links": [
    {
      "url": "https://twitter.com/jdorfman/status/430511497475670016",
      "title": "Twitter / jdorfman: nice @littlebigdetail from ..."
    }
  ]
}


// mapping input msgs to expected outputs
var test_cases = {

	//TODO: add more corner cases
	"": {},

	"this is a plaintext message": {},

	"@chris you around?" : mentions_json,

	"Good morning! (megusta) (coffee)" : emoticons_json,
	
	"Olympics are starting soon; http://www.nbcolympics.com": links_json,

	"@bob @john (success) such a cool feature; https://twitter.com/jdorfman/status/430511497475670016": mixed_json,
}


// test cases
// console.log(parseMessage("hello, world"));

for (var msg in test_cases) {
  if (test_cases.hasOwnProperty(msg)) {
  	var expected = JSON.stringify(test_cases[msg]);
  	var actual = parseMessage(msg);
  	if (expected === actual)
  		console.log('PASS: ' + msg);
  	else {
  		console.log('FAIL: ' + msg);
		console.log("Expected: " + expected);
   	 	console.log("Actual: " + actual);
   	 }
  }
}