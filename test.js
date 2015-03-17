var parser = require('./parser');

// expected outputs
var mentions_json = {
  "mentions": [
    "chris"
  ]
}

var three_mentions_json = {
  "mentions": [
    "matt",
    "steve",
    "joe"
  ]
}

var emoticons_json = {
  "emoticons": [
    "megusta",
    "coffee"
  ]
}

var max_emoticon_json = {
  "emoticons": [
    "111222333444555",
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

var no_space_json = {
  "mentions": [
    "matt",
    "steve",
    "joe"
  ],
  "emoticons": [
    "panic",
    "sadface"
  ]
}

// mapping input msgs to expected outputs
var test_cases = {
	// corner cases
	"": {},

	"@ @ @" : {},

	"() () ()": {},

  "(this is not an emoticon)": {},

  "(toolongforemoticon)": {},

  "(111222333444555)": max_emoticon_json,

  "@matt/@steve,@joe": three_mentions_json,

	// common cases
	"this is a plaintext message": {},

	"@chris you around?" : mentions_json,

	"Good morning! (megusta) (coffee)" : emoticons_json,
	
	"Olympics are starting soon; http://www.nbcolympics.com": links_json,

	"@bob @john (success) such a cool feature; https://twitter.com/jdorfman/status/430511497475670016": mixed_json,

  "this is not good(panic)...@matt/@steve,@joe, can anyone help?(sadface)": no_space_json,

	// TODO: test mixing multiple of each type
}

// run test cases
for (var msg in test_cases) {
  if (test_cases.hasOwnProperty(msg)) {
  	var expected = JSON.stringify(test_cases[msg]);
  	var actual = parser.parseMessage(msg);

  	if (expected === actual)
  		console.log('PASS: ' + msg);
  	else {
  		console.log('FAIL: ' + msg);
		  console.log("Expected: " + expected);
   	 	console.log("Actual: " + actual);
   	 }
  }
}