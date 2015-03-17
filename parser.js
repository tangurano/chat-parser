function parse_with_regex(message) {
	metadata = {};

	// performance impact of multiple regex passes?
	var mentionsRegex = /@(\w)+/g;
	var extractMention = function (match) {return match.slice(1);}
	var emoticonsRegex = /\((\w){1,15}\)/g;
	var extractEmoticon = function (match) {return match.slice(1, -1);}
	// var linksRegex = /http(s)?:\/\/(\w)+/g;
	// var extractLink = function (match) {return match;}

	var mentions = get_matches(message, mentionsRegex, extractMention);
	if (mentions !== null)
		metadata.mentions = mentions;

	var emoticons = get_matches(message, emoticonsRegex, extractEmoticon);
	if (emoticons !== null)
		metadata.emoticons = emoticons;

	// var links = get_matches(message, linksRegex, _____);
	// if (links !== null)
	// 	metadata.links = links;
	//alternatively, error code?

	return JSON.stringify(metadata); 
}

// finds all strings matching the regex and applies extractFunc to each
// returns an array containing all such strings
function get_matches(string, regex, extractFunc) {
    var matches,
    results = [];

	while (matches = regex.exec(string)) {
	    results.push(extractFunc(matches[0]));   
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
		return parse_with_regex(message);
	}
}