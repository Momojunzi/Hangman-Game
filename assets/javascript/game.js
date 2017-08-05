var game = {
	
	gameStarted: false,
	gameOver: false,
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
				"Jorah Mormont", "Stannis Baratheon", "Catelyn Stark", "Sansa Stark", 
			   ],
	startGame: function() {
		var startDiv = document.getElementById("start-div");
		var gameplay = document.getElementById("gameplay-div");
		var usedDiv = document.getElementById("used-div");
		var dashesDiv = document.getElementById("dashes-div");
		var imgDiv = document.getElementById("game-img-div");
		
		document.onkeyup = function(event) {
			if(game.gameStarted === false) {
				startDiv.style.display = "none";
				gameplay.style.display = "block";
				usedDiv.style.display = "block";
				dashesDiv.style.display = "block";
				imgDiv.style.display = "block";
				game.gameStarted = true;
				game.chooseName();
				game.keyChooser();
				
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
            this.guesses = this.firstSpaces.length + this.lastSpaces.length;
            document.getElementById('first').innerHTML = this.firstSpaces.join(' ');
            document.getElementById('last').innerHTML = this.lastSpaces.join(' ');
            document.getElementById('guess-span').innerHTML = this.guesses;
            
		}
	},
	keyChooser: function() {
		if(this.gameStarted === true) {
			document.onkeyup = function(event) {
				game.chosenKey = event.key;
				game.letterCompare();
				game.winOrLose();
				if(game.gameOver === true) {
					document.onkeyup = null;
				}
			}
		}
	},
	letterCompare: function() {
		if(this.formattedName[0].indexOf(this.chosenKey) === -1 
		  && this.formattedName[1].indexOf(this.chosenKey) === -1 
		  && this.guessedLetters.indexOf(this.chosenKey) === -1) 
		{
		  	this.guessedLetters.push(this.chosenKey);
		  	this.guesses = this.guesses - 1;
			document.getElementById('used').innerHTML = this.guessedLetters.join(' ');
			document.getElementById('guess-span').innerHTML = this.guesses;
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
			
		}
	},
	winOrLose: function() {
		if(this.guesses < 1) {
			var lossName = "./assets/images/joffrey.jpg";
			//this.gameOver = true;
			document.getElementById("g-o-t").style.display = "none";
			document.getElementById("guess-text").style.display = "none";
			document.getElementById("gameplay-text").innerHTML = "<h2>Your guess was wrong!</h2><h3>Enjoy the dungeons!</h3><h4>Or try again!</h4>";
			document.getElementById("img-wrapper").innerHTML = '<img src=' + lossName + ' class="img-responsive game-image">'
			this.reset();
		}
		if(this.firstSpaces.indexOf("_") === -1 && this.lastSpaces.indexOf("_") === -1) {
			//this.gameOver = true;
			var winName = "./assets/images/" + this.firstSpaces.join('') + ".jpg";
			console.log(winName);
			document.getElementById("g-o-t").style.display = "none";
			document.getElementById("guess-text").style.display = "none";
			document.getElementById("gameplay-text").innerHTML = "<h1>You survived Joffrey!</h1><h3>For Now...</h3><h4>Press your luck, try again.</h4>";
			document.getElementById("img-wrapper").innerHTML = '<img src=' + winName + ' class="img-responsive game-image">'
			console.log(document.getElementById("game-img-div").getAttribute("src"));
			this.reset();
		}
	},
	//need to add a restart function
	reset: function() {
		this.nameArr = [];
		this.guessedLetters = [];
		this.formattedName = [[],[]];
		this.firstSpaces = [];
		this.lastSpaces = [];
		this.chosenKey = '';
		document.getElementById('used').innerHTML = this.guessedLetters;
		this.chooseName();
		this.keyChooser();	
		
	}
}

game.startGame();




