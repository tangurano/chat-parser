// var request = require("request");

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
		var linksRegex = /http(s)?:\/\/(\w)+/g;
		var extractLink = function (match) {
			var url = match;

			var linkData = {};
			linkData.url = url;
			linkData.title = null;

			// request({
			//   uri: url,
			// }, function(error, response, body) {
			//   console.log(error);
			//   console.log(response);
			//   console.log(body); //TODO: regex for title=""
			// });
			//alternatively, if we get a 404 page, we use that or possibly null?

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