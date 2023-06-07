let moves = document.querySelectorAll('.card');
let select = document.getElementById('play-mode');
let gameMode = document.querySelector('.game-mode');
let turn = document.querySelector('.turn');

const restart = document.getElementById('restart');

let humanPlayer = "X";
let aiPlayer = "O";
let currentPlayer = humanPlayer;
let gameActive = true;
let positions = ['','','','','','','','',''];


const Play = () => {

	const playMode = () => {
			select.addEventListener("change", () => {
				let val = select.options[select.selectedIndex].value;
				gameMode.innerHTML = `${val} MODE`;
				gameMode.classList.remove("hidden");
				gameMode.classList.add("show");

				turn.textContent = `It's ${currentPlayer}'s turn!`;
		});
	}

	const playerTurn = () => {
		turn.textContent = `It's ${currentPlayer}'s turn!`;
	}

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
	  }
	  

	const handleClick = (e) => {
		const box = e.target;
		const position = box.dataset.id;
		
		if(positions[position] !== '' || !gameActive){
			return
		}
		positions[position] = currentPlayer;
		box.textContent = currentPlayer;
		box.classList.add("center");

		handleWin();

		// if (gameActive && currentPlayer === aiPlayer) {
		// 	setTimeout(makeAiMove, 500); // Delay AI move for better user 
		// 	currentPlayer = currentPlayer === "X" ? "O" : "X";
		// 	playerTurn();
			
		//   }

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
			// reset();
			return;
		}
		if (!positions.includes('')){
			handleAnnouncement("IT's Draw!")
			gameActive = false;
			// reset();
			return;
		}

		currentPlayer = currentPlayer === "X" ? "O" : "X";
		playerTurn();
	}

	const handleAnnouncement = (message) => {
		alert(message);
	}

	const reset = () => {
		gameMode.innerHTML = "";
		gameActive = true;
		currentPlayer = "X";
		positions = ['','','','','','','','',''];

		moves.forEach(move => move.textContent ="");
		
	}

	moves.forEach((move) => {
		move.addEventListener("click", handleClick);
	})

	playMode();

	restart.addEventListener("click", reset);

	// return {handleClick, handleWin, playMode};
}; 

Play();
// playMode();


