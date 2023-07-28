
// usr variables
var usrScore = 0;
let usrScoreDisplay = document.getElementById('usr-score');
let usrChoiceDisplay = document.getElementById('usr-choice');
let usrChoiceControls = document.getElementById('usr-controls');
var usrChoices =[];
let gameCount = 0
let usrChoice;


// ai variables
var aiScore = 0;
let aiScoreDisplay = document.getElementById('ai-score');
let aiChoiceDisplay = document.getElementById('ai-choice');
let aiActivator = document.getElementById('ai-radio');
document.getElementById('random-radio').checked = true;
let aiChoice;
var aiChoices = []
var patternLen = 10;
var pattern = [];


// preparing data to feed into the model
function prepdata(){
	if (pattern.length < 1) {
		for (let index = 1; index <= patternLen; index++) {
			pattern.push(Math.floor(Math.random() * 3) + 1)
		}
	}
}
function updatedata(){
	if (gameCount !== 0) {
        pattern.shift()
        pattern.push(usrChoice)
    }
}


// game mechanics
usrChoiceControls.addEventListener('click', (e) => {
	if (e.target.tagName == "BUTTON") {

		gameCount++;

		usrChoice = converter(e.target.id);
		usrChoices.push(usrChoice)
		usrChoiceDisplay.src = converter(usrChoice) + '.png';

		aiChoice = getAiChoice();
		aiChoices.push(aiChoice)
		aiChoiceDisplay.src = converter(aiChoice) + '.png';
		calcScore(usrChoice, aiChoice);
		updatedata()
	}
})

function converter(input){
	switch(input){
		case 'R':
			return 1; break
		case 'P':
			return 2; break
		case 'S':
			return 3; break
		case 1:
			return 'R'; break
		case 2:
			return 'P'; break
		case 3:
			return 'S'; break
	}
}

function getAiChoice() {
	prepdata()
	if (aiActivator.checked) {

		// neural network setup
		const net = new brain.recurrent.LSTMTimeStep()
		net.train([pattern], { iterations: 100, log: true })
		const humanWillChose = net.run(pattern)
		const roundedHumanWillChoose = Math.round(humanWillChose)
		let chosenByAI;
		switch (roundedHumanWillChoose){
			case 1:
				chosenByAI = 2; break
			case 2:
				chosenByAI = 3; break
			case 3:
				chosenByAI = 1; break
		}
		console.log(roundedHumanWillChoose)
		console.log(chosenByAI)
		return(chosenByAI)

	} else {

		const randomChoice = Math.floor(Math.random()*3 + 1)
		return randomChoice;

	};
}

function calcScore(usrChoice, aiChoice) {
	if ((usrChoice == 1 && aiChoice == 3) || 
		(usrChoice == 2 && aiChoice == 1) || 
		(usrChoice == 3 && aiChoice == 2)
		) {
			usrScore += 1;
			usrScoreDisplay.innerHTML = usrScore;
	} else if (
		(usrChoice == 1 && aiChoice == 2) || 
		(usrChoice == 2 && aiChoice == 3) || 
		(usrChoice == 3 && aiChoice == 1)
		) {
			aiScore += 1; 
			aiScoreDisplay.innerHTML = aiScore;
	}
}
