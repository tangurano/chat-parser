# chat-parser

To run the test suite, use this command: "node test.js"

Requirements: 

* node.js (v0.12.0, other versions untested)
* The following npm modules:
	* request

Assumptions:

* Mentions and emoticons only consist of word characters
* Only links with protocol prefix need to be parsed
* URLs are always separated by spaces (for simplicity)
