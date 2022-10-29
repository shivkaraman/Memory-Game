const items = [
	'anchor',
	'anchor',
	'laugh',
	'laugh',
	'atom',
	'atom',
	'biking',
	'biking',
	'bomb',
	'bomb',
	'car',
	'car',
	'lightbulb',
	'lightbulb',
	'dove',
	'dove',
	'pizza-slice',
	'pizza-slice',
	'chess-king',
	'chess-king'
];
const cards = document.querySelector('div.cards');
let moves = 0, hour = 0, min = 0, sec = 0, star = 3, matched = 0, stopWatch, stop = false, currentTime = '00:00:00';
var prevCard = "";


//Randomly shuffels the cards
const shuffelItems = () => {
    items.sort((a, b) => 0.5 - Math.random());
}

//Show Stars
const renderStars = () => {
	const stars = document.querySelector('.stars');
	starHtml = "";
	for(i = 0; i < star; i++){
		starHtml += '<i class="fa-solid fa-star"></i>';
	}
	stars.innerHTML = starHtml;
}

//Show cards
const renderCards = () => {
    let cardsHtml = '';

    items.forEach((item) => {
       cardsHtml += `<div class="card animate__animated" data-item="${item}"><i class="fa-solid fa-${item}"></i></div>`;
    });
    cards.innerHTML = cardsHtml;
}

//Update Moves
const updateMoves = () => {
	//Start Timer if it was first move
	if(moves == 1) startTimer();

	//Update stars based on moves
	if(moves == 30 || moves == 40){
		star--;
		renderStars();
	}
	let move = document.querySelector('.moves');
	move.innerHTML = `<span class="moves__count">${moves}</span> Moves`;
} 

//Timer
const calcTime = () => {
	if(sec >= 60){
		min++;
		sec = 0;
	}
	if(min >= 60){
		hour++;
		min = 0;
	}
}
const updateTime = () => {
	if(stop === true){
		clearInterval(stopWatch);
	}
	sec++;
	calcTime();
    currentTime =`${hour > 9 ? hour : '0' + hour}:${min > 9 ? min : '0' + min}:${sec > 9 ? sec : '0' + sec}`;
	
	let timer = document.querySelector('.stopwatch');
	timer.innerText = currentTime;
}
const startTimer = ()=> { 
	stopWatch = setInterval(updateTime, 1000);
}

const stopTimer = () => {
	stop = true;
}

//Show the result card
const renderResult = () => {
	result = document.querySelector('.result');
	result.innerHTML = `
		<div class="icon">
			<i class="fa-solid fa-circle-check"></i>
		</div>
		<div class="score__card" >
			<div class="greeting"><h2>Congratulations</h2></div>
			<div class="final__result">
				<h4>You won the game!</h3>
				<p>Stars Won : ${star}</p>
				<p>Moves Taken : ${moves}</p>
				<p>Time Taken : ${currentTime}</p>
			</div>
			<div class="close_button"><button>Close</button></div>
		</div>
	`;
	result.style.display = 'flex';
}

//Show result
const showResult = () => {
	stopTimer();
	renderResult();
}

//Card clicking event
const openCardOnClick = () => {
	cards.addEventListener('click', e => {
		//Update card visibility
		var card = "";
		if(e.target.classList.contains('card')){
			card = e.target;
		}
		else if(e.target.classList.contains('fa-solid')){
			card = e.target.parentElement;
		}

		//If already open card is clicked => Return
		if(card == "") return;
		if(card.classList.contains('open')) return;
		else card.classList.add('open');

		//Update Moves Count
		moves++;
		updateMoves();
		//Hide cards when 2 different cards are clicked
		if(prevCard != ""){
			if(prevCard.getAttribute('data-item') === card.getAttribute('data-item')){
				matched++;
				if(matched === 10){
					showResult();
					closeResult();
				}
	
				prevCard.classList.add('matched');
				card.classList.add('matched');
				prevCard = "";
			}
			else{
				//Copying of prev card to temp is important coz the following function is called after 0.5s delay => prevCard will be set to "" after 0.5s. But if a card is clicked before 0.5s prevCard will not yet be set to "" which may give some error
				let temp = prevCard;
				prevCard = "";
				setTimeout(() => {
					temp.classList.remove('open');
					card.classList.remove('open');
				}, 500);
			}
		}
		else prevCard = card;
		
	});
};

const resetVar = () => {
	hour = 0;
	min = 0;
	sec = -1;
	currentTime = "00:00:00";
	moves = 0;
	star = 3;
	matched = 0;
}

const initializePage = () => {
	shuffelItems();
	renderCards();
	renderStars();
	openCardOnClick();
}

const resetPage = () => {
	resetVar();
	updateMoves();
	stopTimer();
	updateTime();
	stop = false;
}

const closeResult = () => {
	let close = document.querySelector('.close_button');
	close.addEventListener('click', () => {
		result = document.querySelector('.result');
		result.style.display = 'none';
		resetPage();
		initializePage();
	});
}

initializePage();
