let winpossiblity = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let boxes = document.querySelectorAll(".box");

let turn = true;

let resultmsg = document.querySelector(".msg");

let gameOver = false;

let totalturns = 0;

let playerXTurn = document.createElement("div");
playerXTurn.innerText = "Player X  Turn";
playerXTurn.classList.add("playerX");

let playerOTurn = document.createElement("div");
playerOTurn.innerText = "Player O  Turn";
playerOTurn.classList.add("playerO");

let resultbtn = document.querySelector("#btn");
resultbtn.appendChild(playerXTurn);

boxes.forEach((tap) => {
  tap.addEventListener("click", () => {
    if (gameOver) {
      return;
    }
    if (turn) {
      totalturns += 1;
      tap.innerText = "X";
      turn = false;
      resultbtn.removeChild(playerXTurn);
      resultbtn.appendChild(playerOTurn);
      console.log("player2 turn");
    } else {
      totalturns += 1;
      tap.innerText = "O";
      turn = true;
      resultbtn.removeChild(playerOTurn);
      resultbtn.appendChild(playerXTurn);
      console.log("player1 turn");
    }
    tap.disabled = true; 
    checkwinner();
  });
});

let Xresult = "player X won !!";
let Oresult = "player O won";

const checkwinner = () => {
  for (let pattern of winpossiblity) {
    const pos1 = boxes[pattern[0]].innerText;
    const pos2 = boxes[pattern[1]].innerText;
    const pos3 = boxes[pattern[2]].innerText;

    if (pos1 == "X" && pos2 == "X" && pos3 == "X") {
      gameOver = true;
      resultmsg.innerText = `${Xresult} \n Click here for Restart`;
      resultmsg.classList.add("won");
      resultbtn.removeChild(playerOTurn);
      return;
    }
    if (pos1 == "O" && pos2 == "O" && pos3 == "O") {
      gameOver = true;
      resultmsg.innerText = `${Oresult} \n Click here for Restart`;
      resultmsg.classList.add("won");
      resultbtn.removeChild(playerXTurn);

      return;
    }
  }
  if (totalturns == 9 && !gameOver) {
    resultmsg.innerText = "Draw \n click here for restart";
    resultmsg.classList.add("draw");
    gameOver = true;
    resultbtn.removeChild(resultbtn.lastElementChild);
    return;
  }
};

resultmsg.addEventListener("click", () => {
  if (gameOver) {
    resultmsg.innerText = "Reset";
    resultmsg.classList.remove("won", "draw");
  }
  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
  });
  turn = true; //It resets the turn to start with X.
  gameOver = false;
  totalturns = 0;
  if (resultbtn.contains(playerOTurn)) {
    resultbtn.removeChild(playerOTurn);
  }
  if (resultbtn.contains(playerXTurn)) {
    resultbtn.removeChild(playerXTurn);
  }

  resultbtn.appendChild(playerXTurn);
});
