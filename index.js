let usrChoice = 'r';
var usrChoices = [];

let aiChoice = 'r'
var aiChoices = []
var patternLen = 10;
var pattern = [];

var score = 0
let gameCount = 0
let scoreDisplay = document.getElementById('score')

let usrChoiceDisplay = document.getElementById('usr-choice');
let aiChoiceDisplay = document.getElementById('ai-choice');

function converter(input) {
	switch(input) {
		case 'r': return 1;
		case 'p': return 2;
		case 's': return 3;
		case 1: return 'fas fa-hand-rock';
		case 2: return 'fas fa-hand-paper';
		case 3: return 'fas fa-hand-scissors';
	}
}

function manageInp(inp) {
	gameCount++;
	usrChoice = converter(inp);
	usrChoices.push(usrChoice)
	usrChoiceDisplay.className = converter(usrChoice);
	aiChoice = getAiChoice();
	aiChoices.push(aiChoice)
	aiChoiceDisplay.className = converter(aiChoice);
	calcScore(usrChoice, aiChoice);
	if (gameCount !== 0) {
		pattern.shift()
		pattern.push(usrChoice)
	}
}

function getAiChoice() {
	if (pattern.length < 1) {
		for (let index = 1; index <= patternLen; index++) {
			pattern.push(Math.floor(Math.random() * 3) + 1)
		}
	}

	const net = new brain.recurrent.LSTMTimeStep()
	net.train([pattern], { iterations: 200, log: true })
	const humanpred = net.run(pattern)
	let roundedHumanpred = Math.round(humanpred)

	if (roundedHumanpred > 3) {
		roundedHumanpred = 3
	} else if (roundedHumanpred < 1) {
		roundedHumanpred = 1
	}

	let chosenByAI;
	switch (roundedHumanpred) {
		case 1: chosenByAI = 2; break
		case 2: chosenByAI = 3; break
		case 3: chosenByAI = 1; break
	}

	let modelJSON = net.toJSON()
	console.log(modelJSON)
	return(chosenByAI)
}

function calcScore(usrChoice, aiChoice) {
	if ((usrChoice == 1 && aiChoice == 3) ||
		(usrChoice == 2 && aiChoice == 1) ||
		(usrChoice == 3 && aiChoice == 2)) {
		score += 1;
		scoreDisplay.innerHTML = score;
	} else if (
		(usrChoice == 1 && aiChoice == 2) ||
		(usrChoice == 2 && aiChoice == 3) ||
		(usrChoice == 3 && aiChoice == 1)) {
		score -= 1;
		scoreDisplay.innerHTML = score;
	}

	switch(score) {
		case -1: scoreDisplay.style.color = 'rgb(255, 73, 73)'; break
		case 1: scoreDisplay.style.color = 'lightgreen'; break
		case 0: scoreDisplay.style.color = 'white'; break
	}
}
