var game = {
	
	gameStarted: false,
	nameArr: [],
	guesses: 0,
	guessedLetters: [],
	formattedName: [[], []],
	firstSpaces: [],
	lastSpaces: [],
	chosenKey: "",
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
				game.keyChooser();
				console.log(game.gameStarted);
			}
		}
	},
	chooseName: function() {
		if(this.gameStarted === true) {
			var nameIndex = Math.floor(Math.random() * this.gameNames.length);
			var name = this.gameNames[nameIndex].toLowerCase();
			var tempName = name.split(" ");
			this.formattedName[0] = tempName[0].split('');
			this.formattedName[1] = tempName[1].split('');
			for (var i=0; i<this.formattedName[0].length; i++){
                this.firstSpaces.push("_");
            }
            for (var j=0; j<this.formattedName[1].length; j++){
                this.lastSpaces.push("_");
            }
            document.getElementById('first').innerHTML = this.firstSpaces.join(' ');
            document.getElementById('last').innerHTML = this.lastSpaces.join(' ');
            console.log(this.formattedName[0], this.formattedName[1], this.firstSpaces, this.lastSpaces);
		}
	},
	keyChooser: function() {
		if(this.gameStarted === true) {
			document.onkeyup = function(event) {
				game.chosenKey = event.key;
				game.letterCompare();
			}
		}
		
	},
	letterCompare: function() {
		if(this.formattedName[0].indexOf(this.chosenKey) === -1 && this.formattedName[1].indexOf(this.chosenKey) === -1) {
			this.guessedLetters.push(this.chosenKey);
			document.getElementById('used').innerHTML = this.guessedLetters.join(' ');
		}
		if(this.formattedName[0].indexOf(this.chosenKey) > -1  || this.formattedName[1].indexOf(this.chosenKey) > -1) {
			for(var i=0; i<this.formattedName[0].length; i++) {
				 if(this.chosenKey === this.formattedName[0][i]){
				 	this.firstSpaces[i] = this.chosenKey;
				 }
			}
			for(var j=0; j<this.formattedName[1].length; j++) {
				 if(this.chosenKey === this.formattedName[1][j]){
				 	this.lastSpaces[j] = this.chosenKey;
				 }
			}
			document.getElementById('first').innerHTML = this.firstSpaces.join(' ');
            document.getElementById('last').innerHTML = this.lastSpaces.join(' ');
			console.log(this.firstSpaces, this.lastSpaces);
		}
	}
}

game.startGame();




