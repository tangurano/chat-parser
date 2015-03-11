module.exports = {
	/*
	Takes a chat message string and returns a JSON string containing information about its contents.
	*/
	parseMessage: function (message) {
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
				if (word[0] === '(' && word[word.length - 1] === ')' && word.length > 2) {
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
}