var friends = require("../data/friends");

module.exports = function(app) {
	app.get("/api/friends", function(req, res) {
		res.json(friends);
		console.log("get");
	});

	app.post("/api/friends", function(req, res) {
		var newFriend = req.body;
		console.log("post");
	
		var tempArray = [];
		var totalDiff = 0;
		var matchArray = [];

		for (var i = 0; i < friends.length; i++) {
			
			console.log(friends[i].name);
			for (var j = 0; j < friends[i].scores.length; j++) {
				var diffScore = Math.abs(friends[i].scores[j] - newFriend.scores[j]);
				totalDiff += diffScore;
			}
	
			matchArray.push({score: totalDiff, friend: friends[i]});

		}
			tempArray.push(matchArray)

			var lowestScoreMatch = tempArray[0][0];

			for (var i = 0; i < tempArray.length; i++) {
				if (tempArray[0][i].score < lowestScoreMatch.score) {
						lowestScoreMatch = tempArray[0][i];
				}
			}
			console.log(tempArray);
			console.log(lowestScoreMatch);
	
		res.json(lowestScoreMatch);
	});
};

