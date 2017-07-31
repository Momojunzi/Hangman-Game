var game = {
	
	gameStarted: false,
	nameArr: [],
	guesses: 0,
	guessedLetters: [],
	gameNames: [
				"Jon Snow", "Robb Stark", "Eddard Stark", "Arya Stark", "Brandon Stark", 
				"Daenerys Targaryen", "Petyr Baelish","Tyrion Lannister", "Theon Greyjoy", 
				"Jorah Mormont", "Stannis Baratheon", "Catelyn Stark"
			   ],
	startGame: function() {
		var startDiv = document.getElementById("start-div");
		var gameplay = document.getElementById("gameplay-div");
		console.log(this.gameStarted);
		document.onkeyup = function(event) {
			if(game.gameStarted === false) {
				startDiv.style.display = "none";
				gameplay.style.display = "block";
				game.gameStarted = true;
				game.chooseName();
				game.gamefunction();
				console.log(game.nameArr.toString(), game.guesses, game.guessedLetters);
			}
		}
	},
	chooseName: function() {
		if(this.gameStarted === true) {
			var nameIndex = Math.floor(Math.random() * (this.gameNames.length - 1));
			var name = this.gameNames[nameIndex].toLowerCase();
			for(var index=0; index < name.length; index++) {
				this.nameArr.push(name[index]);
			}
			this.guesses = this.nameArr.length + 2;
		}
	},
	gamefunction: function () {
		if(this.gameStarted === true) {
			document.onkeyup = function(event) {
				var key = event.key;
				if(game.nameArr.indexOf(key) === -1) {
					game.guesses--;
					game.guessedLetters.push(key);
					console.log(game.guesses.length, game.guesses, game.guessedLetters);
				}	
			}
			
		}
	}
}

game.startGame();
game.chooseName();



