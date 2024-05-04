let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('#resetBtn');
let newGameBtn = document.querySelector('#newBtn');
let msgContainer = document.querySelector('.msg-container');
let msg = document.querySelector('.msg');
let container = document.querySelector('.container');

let turnO = true;
let count = 0;


// Reset the game
const resetGame = () => {
   turnO = true;
   count = 0;
   enableBoxes();
   msgContainer.classList.add("hide");
}


// Check for the winner pattern
const winPatterns = [
   [0, 1, 2],
   [0, 3, 6],
   [0, 4, 8],
   [1, 4, 7],
   [2, 5, 8],
   [2, 4, 6],
   [3, 4, 5],
   [6, 7, 8],
];


// Add event listener to each box for click event
boxes.forEach((box) => {
   box.addEventListener("click", () => {
      if (turnO) {
         box.innerText = "O";
         turnO = false;
      }
      else {
         box.innerText = "X";
         turnO = true;
         count++;
         if (!checkWinner() && count === 9) {
            showDraw();
         }
      }
   });
});



// Disable all boxes
const disableBoxes = () => {
   for (let box of boxes) {
      box.disabled = true;
   }
}

// Enable all boxes
const enableBoxes = () => {
   for (let box of boxes) {
      box.disabled = false;
      box.innerText = "";
   }
}


// Show the draw message
const showDraw = () => {
   msg.innerText = `Draw!`;
   msgContainer.classList.remove('hide');
   disableBoxes();
}


// Show the winner message
const showWinner = (winner) => {
   msg.innerText = `Congratulation Winner is ${winner}`;
   msgContainer.classList.remove('hide');
   disableBoxes();
}


// Check for the winner
const checkWinner = () => {
   for (let pattern of winPatterns) {
      let pos1Val = boxes[pattern[0]].innerText;
      let pos2Val = boxes[pattern[1]].innerText;
      let pos3Val = boxes[pattern[2]].innerText;

      if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
         if (pos1Val === pos2Val && pos2Val === pos3Val) {
            showWinner(pos1Val);
            return true;
         }
      }
   }
   return false;
};


// Add event listener to the new game button and reset button
newGameBtn.addEventListener("click", resetGame)
resetBtn.addEventListener("click", resetGame)
