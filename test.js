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

var link_json = {
  "links": [
    {
      "url": "http://www.nbcolympics.com",
      "title": "NBC Olympics | 2014 NBC Olympics in Sochi Russia"
    }
  ]
}

var link_json = {
  "links": [
    {
      "url": "http://www.wikipedia.org",
      "title": "Wikipedia"
    }
  ]
}

var https_link_json = {
  "links": [
    {
      "url": "https://google.com",
      "title": "Google"
    }
  ]
}

var bad_link_json = {
  "links": [
    {
      "url": "http://bad_link",
      "title": null
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
	
  "this is not good(panic)...@matt/@steve,@joe, can anyone help?(sadface)": no_space_json,

  "http://www.wikipedia.org": link_json,

	"This is secure: https://google.com": https_link_json,

  "Bad link: http://www.nbcolympics.com": bad_link_json,

	"@bob @john (success) such a cool feature; https://twitter.com/jdorfman/status/430511497475670016": mixed_json,

	/* Test cases TODO:
  Weird combinations/ambiguous cases:
  @(sadface) ?
  (@sadface)
  @http://google.com?

  @(head nod)
  @(head/nod)

  stress test mixing multiple of each type

  handling NON-ASCII characters?
  */
}

// run test cases
var test_num = 1;
for (var msg in test_cases) {
  if (test_cases.hasOwnProperty(msg)) {
  	var expected = JSON.stringify(test_cases[msg]);
  	var actual = parser.parseMessage(msg);

  	if (expected === actual)
  		console.log(test_num + ") PASS: " + msg);
  	else {
  		console.log(test_num + ") FAIL: " + msg);
		  console.log("\tExpected: " + expected);
   	 	console.log("\tActual: " + actual);
   	 }
  }
  test_num += 1;
}