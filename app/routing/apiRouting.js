var friends = require("../data/friends");

module.exports = function(app) {
	app.get("/api/friends", function(req, res) {
		res.json(friends);
	});

	app.post("/api/friends", function(req, res) {
		var newFriend = req.body;

		var bestMatch = {};

		for (i = 0; i < newFriend.scores.length; i++) {
			if (newFriend.scores[i] === "1 (strongly agree)") {
				newFriend.scores[i] = 1;
			} 
			else if (newFriend.scores[i] === "5 (strongly disagree)") {
				newFriend.scores[i] = 5;
			} else {
				newFriend.scores[i] = parseInt(newFriend.scores[i]);
			}
		}

		var bestMatchIndex = 0;
		var bestMatchDiff = 40;

		for (var i = 0; i < friends.length; i++) {
			var totalDiff = 0;
			for (var j = 0; j < friends[i].scores.length; j++) {
				var diffScore = Math.abs(friends[i].scores[j] - newFriend.scores.[j]);
				totalDiff += diffScore;
			}
			if (totalDiff < bestMatchDiff) {
				bestMatchIndex = i;
				bestMatchDiff = totalDiff;
			}
		}
		bestMatch = friends[bestMatchIndex];

		friends.push(newFriend);
		res.json(bestMatch);
	});
};

