const moves = document.querySelectorAll('.card');
const gameMode = document.querySelector('.game-mode');
const turn = document.querySelector('.turn');


const select = document.getElementById('play-mode');
select.addEventListener("change", () => {
		let val = select.options[select.selectedIndex].value.toUpperCase();
		gameMode.innerHTML = `${val} MODE`;
		gameMode.classList.remove("hidden");
		gameMode.classList.add("show");
		let count = 0;
		let player1 = "X";
		let player2 = "O";
		moves.forEach(btn => {
			btn.addEventListener("click", (e) => {
				const target = e.target;
				const move = target.firstChild;
				move.innerHTML = player1;
			});
		});
		
});


		// 	if (val === "TWO-PLAYER") {
		// 		if(count % 2 == 0){
		// 			turn.innerHTML = `it's ${player1}'s turn`;
		// 		} else {
		// 			turn.innerHTML = `it's ${player2}'s turn`;
		// 		}
		//   }

// moves.forEach(btn => {
// 	btn.addEventListener("click", (e) => {
// 		const target = e.target;
// 		console.log(target);
// 		// target.classList.contains("selected") ? target.classList.remove("selected"): target.classList.add("selected");
// 	})
// })
