// deprecated - splitting on spaces makes a faulty assumption
function parse_with_split(message) {
	var words = message.split(" "); //split does unnecessary copy, but let's assume fairly short messages

	metadata = {};
	for (word of words) {
		// TODO: refactor the below code to be more modular/extensible and allow easy addition of new types of words 
		// prefixed (@, links) and encapsulated (parenthesis)
		if (word.length > 0) {
			if (word[0] === '@' && word.length > 1) { 
				var user = word.slice(1) //assumes validation of users is done by another module
				if (metadata.hasOwnProperty('mentions'))
					metadata.mentions.push(user);
				else
					metadata.mentions = [user];
			}
			if (word[0] === '(' && word[word.length - 1] === ')' && word.length > 2 && word.length <= 17) {
				var emoticon = word.slice(1, -1) //assumes validation of emoticons is done by another module
				if (metadata.hasOwnProperty('emoticons'))
					metadata.emoticons.push(emoticon);
				else
					metadata.emoticons = [emoticon];
			}
			if (word.indexOf('https://') === 0 || word.indexOf('http://') === 0) { 
				//assume links are always prefixed with https:// ? //maybe handle www also?
				//TODO: handle various corner cases - ie "http://", "http://xyz"
			}
		}
	}

	return JSON.stringify(metadata); 
}

function parse_with_regex(message) {
	metadata = {};

	var mentionsRegex = /@(\w)+/g;
	var extractMention = function (match) {return match.slice(1);}
	var emoticonsRegex = /\((\w){1,15}\)/g;
	var extractEmoticon = function (match) {return match.slice(1, -1);}
	// var linksRegex = /http(s)?:\/\/(\w)+/g;
	// var extractLink = function (match) {return match.slice(1, -1);}

	var mentions = get_matches(message, mentionsRegex, extractMention);
	if (mentions !== null)
		metadata.mentions = mentions;

	var emoticons = get_matches(message, emoticonsRegex, extractEmoticon);
	if (emoticons !== null)
		metadata.emoticons = emoticons;

	// var links = get_matches(message, linksRegex, _____);
	// if (links !== null)
	// 	metadata.links = links;

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
		return parse_with_regex(message); // all pass except 2 link tests
		// return parse_with_split(message); //deprecated
	}
}