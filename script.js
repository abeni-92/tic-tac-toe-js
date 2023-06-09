let moves = document.querySelectorAll('.card');
let select = document.getElementById('play-mode');
let gameMode = document.querySelector('.game-mode');
let turn = document.querySelector('.turn');
let end = document.getElementById('end');

const restart = document.getElementById('restart');

let currentPlayer = "X";
let aiPlayer; 
let gameActive = true;
let gameStart = false;
let positions = ['','','','','','','','',''];

const PlayMode = () => {
	const Value = () => {
		select.addEventListener("change", () => {
			let val = select.options[select.selectedIndex].value;
			gameMode.innerHTML = `${val} MODE`;
			gameMode.classList.remove("hidden");
			gameMode.classList.add("show");
		
			turn.textContent = `It's ${currentPlayer}'s turn!`;

			if (val == "single-player"){
				aiPlayer = "O";
			} else {
				aiPlayer = "";
			}

			gameStart = true;
		});		
  	 }

   return {Value};
}

const Play = () => {
	
	const {Value} = PlayMode();
	Value();
	
	const makeAiMove = () => {
		const emptyCells = [];
		for (let i = 0; i < positions.length; i++) {
		  if (positions[i] === '') {
			emptyCells.push(i);
		  }
		}
		const randomIndex = Math.floor(Math.random() * emptyCells.length);
		const aiMove = emptyCells[randomIndex];
		positions[aiMove] = aiPlayer;
		moves[aiMove].textContent = aiPlayer;
		moves[aiMove].classList.add("center");
	  }
	  
	const handleClick = (e) => {
		
		const box = e.target;
		const position = box.dataset.id;
		
		if(positions[position] !== '' || !gameActive || !gameStart){
			return
		}
		positions[position] = currentPlayer;
		box.textContent = currentPlayer;
		box.classList.add("center");

		handleWin();
		playerTurn();

		if (gameActive && aiPlayer !== "" && currentPlayer === aiPlayer) {
			setTimeout(makeAiMove, 500); // Delay AI move for better user 
			// currentPlayer = currentPlayer === "X" ? "O" : "X";
			handleWin();
		  }
	}

	const handleWin = () => {
		const winConditions = [
			[0,1,2], [3,4,5], [6,7,8], //row
			[0,3,6], [1,4,7], [2,5,8], //column
			[0,4,8], [2,4,6] //diagonal
		];
		let won = false;

		for (let i = 0; i < winConditions.length; i++){
			const [a,b,c] = winConditions[i];

			if (positions[a] !== '' && positions[a] == positions[b] && positions[a] == positions[c]){
				won = true;
				break;
			}
		}
		if (won){
			handleAnnouncement(`${currentPlayer} has Won!`);
			gameActive = false;
			return;
		}
		if (!positions.includes('')){
			handleAnnouncement("IT's Draw!")
			gameActive = false;
			return;
		}
		if (aiPlayer != "") {
			currentPlayer = currentPlayer === "X" ? aiPlayer : "X";
		} else {
			currentPlayer = currentPlayer === "X" ? "O" : "X";
		}
		playerTurn();
	}

	const handleAnnouncement = (message) => {
		end.textContent = message;
		end.classList.add("message");
		turn.classList.add("hidden");
		gameMode.textContent = "";
	}
	const reset = () => {
		gameMode.innerHTML = "";
		end.textContent = "";
		gameActive = true;
		gameStart = false;
		currentPlayer = "X";
		positions = ['','','','','','','','',''];
		select.value = "";
		moves.forEach(move => move.textContent ="");
		// playerTurn();
	}
	const playerTurn = () => {
		turn.textContent = `It's ${currentPlayer}'s turn!`;
	}


	moves.forEach((move) => {
		move.addEventListener("click", handleClick);
	})

	restart.addEventListener("click", reset);

	return {handleClick, handleWin, playerTurn, Value};
}; 

Play();

