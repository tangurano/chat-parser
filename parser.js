var request = require("sync-request");

// finds all strings matching the regex and applies extractData to each
// returns an array containing all such strings
function get_matches(string, regex, extractData) {
    var matches,
    results = [];

	while (matches = regex.exec(string)) {
	    results.push(extractData(matches[0]));   
	}

	if (results.length > 0) {
		return results;
	} else
		return null;
}

module.exports = {
	/*
	Takes a chat message string and returns a JSON string containing information about its contents.
	*/
	parseMessage: function (message) {
		metadata = {};

		// performance impact of multiple regex passes?
		var mentionsRegex = /@(\w)+/g;
		var extractMention = function (match) {return match.slice(1);}
		var emoticonsRegex = /\((\w){1,15}\)/g;
		var extractEmoticon = function (match) {return match.slice(1, -1);}
		var linksRegex = /http(s)?:\/\/[^\s]*/ig; //assumes whitespace delimits links
		var extractLink = function (match) {
			var url = match;

			var linkData = {};
			linkData.url = url;
			linkData.title = null; // placeholder if no title can be retrieved at all (ie http://bad_link)

			try {
				var res = request('GET', url); // throws error if bad url (ie bad_link)
				var body = res.body.toString(); // all status codes treated identically
				var titleRegex = /<title>(.*?)<\/title>/ig;	
			
				var matches = titleRegex.exec(body);
				if (matches !== null) {
					var title = matches[0].slice(7, -8); //always use first title tag
					linkData.title = title;
				}
			} catch (err) {
				// TODO: use a logging framework in production
				// console.log("Error retrieving page title: " + err.message); 
			}

			return linkData;
		}

		var mentions = get_matches(message, mentionsRegex, extractMention);
		if (mentions !== null)
			metadata.mentions = mentions;

		var emoticons = get_matches(message, emoticonsRegex, extractEmoticon);
		if (emoticons !== null)
			metadata.emoticons = emoticons;

		var links = get_matches(message, linksRegex, extractLink);
		if (links !== null)
			metadata.links = links;

		return JSON.stringify(metadata); 
	}
}