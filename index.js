
// usr variables
var usrScore = 0;
let usrScoreDisplay = document.getElementById('usr-score');
let usrChoiceDisplay = document.getElementById('usr-choice');
let usrChoiceControls = document.getElementById('usr-controls');
let usrChoice;
var usrChoices = [];


// ai variables
var aiScore = 0;
let aiScoreDisplay = document.getElementById('ai-score');
let aiChoiceDisplay = document.getElementById('ai-choice');
let aiActivator = document.getElementById('ai-radio');
aiActivator.disabled = true;
document.getElementById('random-radio').checked = true;
let aiChoice;
var aiChoices = [];

// neural network setup
const { Layer, Network } = window.synaptic;
var inputLayer = new Layer(3);
var hiddenLayer = new Layer(4);
var secondHiddenLayer = new Layer(4);
var outputLayer = new Layer(1);
inputLayer.project(hiddenLayer);
hiddenLayer.project(outputLayer);
var myNetwork = new Network({
input: inputLayer,
hidden: [hiddenLayer],
output: outputLayer
});
var learningRate = .2;

// game mechanics

usrChoiceControls.addEventListener('click', (e) => {
	if (e.target.tagName == "BUTTON") {
		usrChoice = e.target.id;
		usrChoices.push(usrChoice)
		usrChoiceDisplay.src = usrChoice + '.png';
		aiChoice = getAiChoice(usrChoice);
		aiChoices.push(aiChoice)
		aiChoiceDisplay.src = aiChoice + '.png';
		calcScore(usrChoice, aiChoice);
	}
})

function getAiChoice() {
	if (aiActivator.checked) {
		
	} else {
		let randomNum = Math.floor(Math.random() * 3);
		let aiChoice;
		switch (randomNum) {
			case 0:
				aiChoice = 'rock';
				break;
			case 1:
				aiChoice = 'paper';
				break;
			case 2:
				aiChoice = 'scissor';
				break;
		}
		return aiChoice;
	};
}

function calcScore(usrChoice, aiChoice) {
	if ((usrChoice == 'rock' && aiChoice == 'scissor') || (usrChoice == 'paper' && aiChoice == 'rock') || (usrChoice == 'scissor' && aiChoice == 'paper')) {
		usrScore += 1;
		usrScoreDisplay.innerHTML = usrScore;
	} else if ((usrChoice == 'rock' && aiChoice == 'paper') || (usrChoice == 'paper' && aiChoice == 'scissor') || (usrChoice == 'scissor' && aiChoice == 'rock')) {
		aiScore += 1; 
		aiScoreDisplay.innerHTML = aiScore;
	}
}