const gameBoard = document.querySelector("#gameboard");
const playerDisplay = document.querySelector("#player");
const infoDisplay = document.querySelector("#info-display");

const width = 8;
let playerGo = "black";
playerDisplay.textContent = "black";

const startPieces = [
  rook,
  knight,
  bishop,
  queen,
  king,
  bishop,
  knight,
  rook,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  " ",
  " ",
  " ",
  " ",
  " ",
  " ",
  " ",
  " ",
  " ",
  " ",
  " ",
  " ",
  " ",
  " ",
  " ",
  " ",
  " ",
  " ",
  " ",
  " ",
  " ",
  " ",
  " ",
  " ",
  " ",
  " ",
  " ",
  " ",
  " ",
  " ",
  " ",
  " ",
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  rook,
  knight,
  bishop,
  king,
  queen,
  bishop,
  knight,
  rook,
];

const createBoard = () => {
  startPieces.forEach((startpiece, i) => {
    const square = document.createElement("div");
    square.classList.add("square");
    square.innerHTML = startpiece;
    const firstChild = square.firstChild;
    if (firstChild instanceof Element) {
      firstChild.setAttribute("draggable", true);
    }

    square.setAttribute("square-id", i);
    const row = Math.floor((63 - i) / 8) + 1;
    if (row % 2 == 0) {
      square.classList.add(i % 2 == 0 ? "gora" : "kala");
    } else {
      square.classList.add(i % 2 == 0 ? "kala" : "gora");
    }

    if (i <= 15) {
      square.firstChild.firstChild.classList.add("black");
    } else if (i >= 48) {
      square.firstChild.firstChild.classList.add("white");
    }
    gameBoard.append(square);
  });
};

createBoard();

const allSquare = document.querySelectorAll("#gameboard .square");

allSquare.forEach((square) => {
  square.addEventListener("dragstart", dragStart);
  square.addEventListener("dragover", dragOver);
  square.addEventListener("drop", dragDrop);
});

let startPosition;
let draggedElement;
function dragStart(e) {
  startPosition = e.target.parentNode.getAttribute("square-id");
  draggedElement = e.target;
}

function dragOver(e) {
  e.preventDefault();
}

function dragDrop(e) {
  e.stopPropagation();
  const correctGo = draggedElement.firstChild.classList.contains(playerGo);
  const taken = e.target.classList.contains("piece");
  const valid = checkValid(e.target);
  const opponentGo = playerGo === "white" ? "black" : "white";
  let takenByOpponent = false;
  if (e.target.firstChild) {
    if (
      e.target.firstChild.classList &&
      e.target.firstChild.classList.contains(opponentGo)
    ) {
      takenByOpponent = true;
    }
  }

  if (correctGo) {
    if (takenByOpponent && valid) {
      e.target.parentNode.append(draggedElement);
      e.target.remove();
      checkForWin();
      changeColor();
      return;
    }
    if (taken && !takenByOpponent && correctGo) {
      infoDisplay.textContent = "You cannot go there";
      setTimeout(() => {
        infoDisplay.textContent = "";
      }, 2000);
      return;
    }
    if (valid) {
      e.target.append(draggedElement);
      checkForWin()
      changeColor();
      return;
    }
  }
}

function checkValid(target) {
  const targetId =
    Number(target.getAttribute("square-id")) ||
    Number(target.parentNode.getAttribute("square-id"));
  const startId = Number(startPosition);
  const piece = draggedElement.id;
  switch (piece) {
    case "pawn":
      const startRow = [8, 9, 10, 11, 12, 13, 14, 15];
      if (
        startRow.includes(startId) && startId + width * 2 === targetId ||
        startId + width === targetId  ||
        (startId + width - 1 === targetId && document.querySelector(`[square-id="${startId + width - 1}"]`).innerHTML !== ' ' ) ||
        (startId + width + 1 === targetId && document.querySelector(`[square-id="${startId + width + 1}"]`).innerHTML !== ' ')
      ) {
        return true;
      }
      break;
    case 'knight':
      if(
        startId+width*2-1 === targetId ||
        startId+width*2+1 === targetId ||
        startId+2+width === targetId ||
        startId-2+width === targetId ||
        startId-width*2-1 === targetId ||
        startId-width*2+1 === targetId ||
        startId+2-width === targetId ||
        startId-2-width === targetId 
      ){
        return true;
      }
      break;
    case 'bishop':
      if(
        startId + width + 1 === targetId ||
        (startId + width*2 + 2 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId + width + 1}"]`).innerHTML)) ||
        startId + width*3 + 3 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId + width*2 + 2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width + 1}"]`).innerHTML) ||
        startId + width*4 + 4 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId + width*3 + 3}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width*2 + 2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width + 1}"]`).innerHTML) ||
        startId + width*5 + 5 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId + width*4 + 4}"]`).innerHTML)  && [""," "].includes(document.querySelector(`[square-id="${startId + width*3 + 3}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width*2 + 2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width + 1}"]`).innerHTML) ||
        startId + width*6 + 6 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId + width*5 + 5}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width*4 + 4}"]`).innerHTML)  && [""," "].includes(document.querySelector(`[square-id="${startId + width*3 + 3}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width*2 + 2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width + 1}"]`).innerHTML) ||
        startId + width*7 + 7 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId + width*6 + 6}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width*5 + 5}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width*4 + 4}"]`).innerHTML)  && [""," "].includes(document.querySelector(`[square-id="${startId + width*3 + 3}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width*2 + 2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width + 1}"]`).innerHTML) ||
        startId - width - 1 === targetId ||
        startId - width*2 - 2 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId - width - 1}"]`).innerHTML) ||
        startId - width*3 - 3 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId - width*2 - 2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width - 1}"]`).innerHTML) ||
        startId - width*4 - 4 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId - width*3 - 3}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width*2 - 2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width - 1}"]`).innerHTML) ||
        startId - width*5 - 5 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId - width*4 - 4}"]`).innerHTML)  && [""," "].includes(document.querySelector(`[square-id="${startId - width*3 - 3}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width*2 - 2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width - 1}"]`).innerHTML) ||
        startId - width*6 - 6 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId - width*5 - 5}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width*4 - 4}"]`).innerHTML)  && [""," "].includes(document.querySelector(`[square-id="${startId - width*3 - 3}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width*2 - 2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width - 1}"]`).innerHTML) ||
        startId - width*7 - 7 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId - width*6 - 6}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width*5 - 5}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width*4 - 4}"]`).innerHTML)  && [""," "].includes(document.querySelector(`[square-id="${startId - width*3 - 3}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width*2 - 2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width - 1}"]`).innerHTML) ||
        startId - width + 1 === targetId ||
        startId - width*2 + 2 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId - width + 1}"]`).innerHTML) ||
        startId - width*3 + 3 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId - width*2 + 2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width + 1}"]`).innerHTML) ||
        startId - width*4 + 4 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId - width*3 + 3}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width*2 + 2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width + 1}"]`).innerHTML) ||
        startId - width*5 + 5 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId - width*4 + 4}"]`).innerHTML)  && [""," "].includes(document.querySelector(`[square-id="${startId - width*3 + 3}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width*2 + 2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width + 1}"]`).innerHTML) ||
        startId - width*6 + 6 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId - width*5 + 5}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width*4 + 4}"]`).innerHTML)  && [""," "].includes(document.querySelector(`[square-id="${startId - width*3 + 3}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width*2 + 2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width + 1}"]`).innerHTML) ||
        startId - width*7 + 7 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId - width*6 + 6}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width*5 + 5}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width*4 + 4}"]`).innerHTML)  && [""," "].includes(document.querySelector(`[square-id="${startId - width*3 + 3}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width*2 + 2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width + 1}"]`).innerHTML) ||
        startId - width - 1 === targetId ||
        (startId + width*2 - 2 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId + width - 1}"]`).innerHTML) )||
        startId + width*3 - 3 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId + width*2 - 2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width - 1}"]`).innerHTML) ||
        startId + width*4 - 4 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId + width*3 - 3}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width*2 - 2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width - 1}"]`).innerHTML) ||
        startId + width*5 - 5 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId + width*4 - 4}"]`).innerHTML)  && [""," "].includes(document.querySelector(`[square-id="${startId + width*3 - 3}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width*2 - 2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width - 1}"]`).innerHTML) ||
        startId + width*6 - 6 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId + width*5 - 5}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width*4 - 4}"]`).innerHTML)  && [""," "].includes(document.querySelector(`[square-id="${startId + width*3 - 3}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width*2 - 2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width - 1}"]`).innerHTML) ||
        startId + width*7 - 7 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId + width*6 - 6}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width*5 - 5}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width*4 - 4}"]`).innerHTML)  && [""," "].includes(document.querySelector(`[square-id="${startId + width*3 - 3}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width*2 - 2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width - 1}"]`).innerHTML)
      ){
        return true
      }
      break;
    case "rook":
      if(
        startId+width === targetId ||
        startId+width*2 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId + width}"]`).innerHTML) ||
        startId+width*3 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId + width*2}"]`).innerHTML)  && [""," "].includes(document.querySelector(`[square-id="${startId + width}"]`).innerHTML) ||
        startId+width*4 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId + width*3}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width*2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width}"]`).innerHTML) ||
        startId+width*5 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId + width*4}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width*3}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width*2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width}"]`).innerHTML) ||
        startId+width*6 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId + width*5}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width*4}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width*3}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width*2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width}"]`).innerHTML) ||
        startId+width*7 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId + width*6}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width*5}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width*4}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width*3}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width*2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width}"]`).innerHTML) ||
        startId-width === targetId ||
        startId-width*2 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId - width}"]`).innerHTML) ||
        startId-width*3 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId - width*2}"]`).innerHTML)  && [""," "].includes(document.querySelector(`[square-id="${startId - width}"]`).innerHTML) ||
        startId-width*4 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId - width*3}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width*2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width}"]`).innerHTML) ||
        startId-width*5 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId - width*4}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width*3}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width*2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width}"]`).innerHTML) ||
        startId-width*6 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId - width*5}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width*4}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width*3}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width*2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width}"]`).innerHTML) ||
        startId-width*7 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId - width*6}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width*5}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width*4}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width*3}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width*2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width}"]`).innerHTML) ||
        startId + 1 === targetId ||
        startId + 2 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId  + 1 } "]`).innerHTML) ||
        startId + 3 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId  + 2}"]`).innerHTML)  && [""," "].includes(document.querySelector(`[square-id="${startId  + 1}"]`).innerHTML) ||
        startId + 4 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId  + 3}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId  + 2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId  + 1} "]`).innerHTML) ||
        startId + 5 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId  + 4}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId  + 3}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId  + 2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId  + 1}"]`).innerHTML) ||
        startId + 6 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId  + 5}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId  + 4}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId  + 3}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId  + 2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId  + 1} "]`).innerHTML) ||
        startId + 7 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId  + 6}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId  + 5}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId  + 4}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId  + 3}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId  + 2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId  + 1} "]`).innerHTML) ||
        startId - 1 === targetId ||
        startId - 2 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId  - 1 } "]`).innerHTML) ||
        startId - 3 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId  - 2}"]`).innerHTML)  && [""," "].includes(document.querySelector(`[square-id="${startId  - 1}"]`).innerHTML) ||
        startId - 4 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId  - 3}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId  - 2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId  - 1} "]`).innerHTML) ||
        startId - 5 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId  - 4}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId  - 3}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId  - 2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId  - 1}"]`).innerHTML) ||
        startId - 6 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId  - 5}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId  - 4}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId  - 3}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId  - 2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId  - 1} "]`).innerHTML) ||
        startId - 7 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId  - 6}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId  - 5}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId  - 4}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId  - 3}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId  - 2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId  - 1} "]`).innerHTML) 
        ){
          return true
        }
        break;
    case "queen":
      if(
         startId + width + 1 === targetId ||
        startId + width*2 + 2 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId + width + 1}"]`).innerHTML) ||
        startId + width*3 + 3 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId + width*2 + 2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width + 1}"]`).innerHTML) ||
        startId + width*4 + 4 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId + width*3 + 3}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width*2 + 2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width + 1}"]`).innerHTML) ||
        startId + width*5 + 5 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId + width*4 + 4}"]`).innerHTML)  && [""," "].includes(document.querySelector(`[square-id="${startId + width*3 + 3}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width*2 + 2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width + 1}"]`).innerHTML) ||
        startId + width*6 + 6 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId + width*5 + 5}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width*4 + 4}"]`).innerHTML)  && [""," "].includes(document.querySelector(`[square-id="${startId + width*3 + 3}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width*2 + 2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width + 1}"]`).innerHTML) ||
        startId + width*7 + 7 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId + width*6 + 6}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width*5 + 5}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width*4 + 4}"]`).innerHTML)  && [""," "].includes(document.querySelector(`[square-id="${startId + width*3 + 3}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width*2 + 2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width + 1}"]`).innerHTML) ||
        startId - width - 1 === targetId ||
        startId - width*2 - 2 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId - width - 1}"]`).innerHTML) ||
        startId - width*3 - 3 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId - width*2 - 2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width - 1}"]`).innerHTML) ||
        startId - width*4 - 4 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId - width*3 - 3}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width*2 - 2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width - 1}"]`).innerHTML) ||
        startId - width*5 - 5 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId - width*4 - 4}"]`).innerHTML)  && [""," "].includes(document.querySelector(`[square-id="${startId - width*3 - 3}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width*2 - 2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width - 1}"]`).innerHTML) ||
        startId - width*6 - 6 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId - width*5 - 5}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width*4 - 4}"]`).innerHTML)  && [""," "].includes(document.querySelector(`[square-id="${startId - width*3 - 3}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width*2 - 2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width - 1}"]`).innerHTML) ||
        startId - width*7 - 7 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId - width*6 - 6}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width*5 - 5}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width*4 - 4}"]`).innerHTML)  && [""," "].includes(document.querySelector(`[square-id="${startId - width*3 - 3}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width*2 - 2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width - 1}"]`).innerHTML) ||
        startId - width + 1 === targetId ||
        startId - width*2 + 2 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId - width + 1}"]`).innerHTML) ||
        startId - width*3 + 3 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId - width*2 + 2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width + 1}"]`).innerHTML) ||
        startId - width*4 + 4 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId - width*3 + 3}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width*2 + 2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width + 1}"]`).innerHTML) ||
        startId - width*5 + 5 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId - width*4 + 4}"]`).innerHTML)  && [""," "].includes(document.querySelector(`[square-id="${startId - width*3 + 3}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width*2 + 2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width + 1}"]`).innerHTML) ||
        startId - width*6 + 6 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId - width*5 + 5}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width*4 + 4}"]`).innerHTML)  && [""," "].includes(document.querySelector(`[square-id="${startId - width*3 + 3}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width*2 + 2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width + 1}"]`).innerHTML) ||
        startId - width*7 + 7 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId - width*6 + 6}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width*5 + 5}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width*4 + 4}"]`).innerHTML)  && [""," "].includes(document.querySelector(`[square-id="${startId - width*3 + 3}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width*2 + 2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width + 1}"]`).innerHTML) ||
        startId - width - 1 === targetId ||
        startId + width*2 - 2 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId + width - 1}"]`).innerHTML) ||
        startId + width*3 - 3 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId + width*2 - 2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width - 1}"]`).innerHTML) ||
        startId + width*4 - 4 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId + width*3 - 3}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width*2 - 2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width - 1}"]`).innerHTML) ||
        startId + width*5 - 5 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId + width*4 - 4}"]`).innerHTML)  && [""," "].includes(document.querySelector(`[square-id="${startId + width*3 - 3}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width*2 - 2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width - 1}"]`).innerHTML) ||
        startId + width*6 - 6 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId + width*5 - 5}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width*4 - 4}"]`).innerHTML)  && [""," "].includes(document.querySelector(`[square-id="${startId + width*3 - 3}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width*2 - 2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width - 1}"]`).innerHTML) ||
        startId + width*7 - 7 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId + width*6 - 6}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width*5 - 5}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width*4 - 4}"]`).innerHTML)  && [""," "].includes(document.querySelector(`[square-id="${startId + width*3 - 3}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width*2 - 2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width - 1}"]`).innerHTML) ||
        startId+width === targetId ||
        startId+width*2 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId + width}"]`).innerHTML) ||
        startId+width*3 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId + width*2}"]`).innerHTML)  && [""," "].includes(document.querySelector(`[square-id="${startId + width}"]`).innerHTML) ||
        startId+width*4 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId + width*3}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width*2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width}"]`).innerHTML) ||
        startId+width*5 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId + width*4}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width*3}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width*2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width}"]`).innerHTML) ||
        startId+width*6 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId + width*5}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width*4}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width*3}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width*2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width}"]`).innerHTML) ||
        startId+width*7 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId + width*6}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width*5}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width*4}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width*3}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width*2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId + width}"]`).innerHTML) ||
        startId-width === targetId ||
        startId-width*2 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId - width}"]`).innerHTML) ||
        startId-width*3 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId - width*2}"]`).innerHTML)  && [""," "].includes(document.querySelector(`[square-id="${startId - width}"]`).innerHTML) ||
        startId-width*4 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId - width*3}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width*2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width}"]`).innerHTML) ||
        startId-width*5 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId - width*4}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width*3}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width*2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width}"]`).innerHTML) ||
        startId-width*6 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId - width*5}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width*4}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width*3}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width*2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width}"]`).innerHTML) ||
        startId-width*7 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId - width*6}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width*5}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width*4}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width*3}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width*2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId - width}"]`).innerHTML) ||
        startId + 1 === targetId ||
        startId + 2 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId  + 1 } "]`).innerHTML) ||
        startId + 3 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId  + 2}"]`).innerHTML)  && [""," "].includes(document.querySelector(`[square-id="${startId  + 1}"]`).innerHTML) ||
        startId + 4 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId  + 3}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId  + 2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId  + 1} "]`).innerHTML) ||
        startId + 5 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId  + 4}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId  + 3}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId  + 2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId  + 1}"]`).innerHTML) ||
        startId + 6 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId  + 5}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId  + 4}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId  + 3}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId  + 2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId  + 1} "]`).innerHTML) ||
        startId + 7 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId  + 6}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId  + 5}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId  + 4}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId  + 3}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId  + 2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId  + 1} "]`).innerHTML) ||
        startId - 1 === targetId ||
        startId - 2 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId  - 1 } "]`).innerHTML) ||
        startId - 3 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId  - 2}"]`).innerHTML)  && [""," "].includes(document.querySelector(`[square-id="${startId  - 1}"]`).innerHTML) ||
        startId - 4 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId  - 3}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId  - 2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId  - 1} "]`).innerHTML) ||
        startId - 5 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId  - 4}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId  - 3}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId  - 2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId  - 1}"]`).innerHTML) ||
        startId - 6 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId  - 5}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId  - 4}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId  - 3}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId  - 2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId  - 1} "]`).innerHTML) ||
        startId - 7 === targetId && [""," "].includes(document.querySelector(`[square-id="${startId  - 6}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId  - 5}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId  - 4}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId  - 3}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId  - 2}"]`).innerHTML) && [""," "].includes(document.querySelector(`[square-id="${startId  - 1} "]`).innerHTML) 

      ){
        return true
      }
      break;
    case 'king':
      if(
        startId + 1 === targetId ||
        startId - 1 === targetId ||
        startId + width === targetId ||
        startId - width === targetId ||
        startId + width+1 === targetId ||
        startId + width-1 === targetId ||
        startId - width+1 === targetId ||
        startId - width-1 === targetId 
      ){
        return true
      }
}
}



function changeColor() {
  if (playerGo === "black") {
    playerGo = "white";
    playerDisplay.textContent = "white";
    reverseIDS();
  } else {
    playerGo = "black";
    playerDisplay.textContent = "black";
    reverseIDS();
  }
}

function reverseIDS() {
  const allSquare = document.querySelectorAll(".square");
  allSquare.forEach((square) => {
    square.setAttribute(
      "square-id",
      Math.abs(63 - square.getAttribute("square-id"))
    );
  });
}

function checkForWin(){
  const kings = Array.from(document.querySelectorAll('#king'))
  if(!kings.some(king => king.firstChild.classList.contains('white'))){
    infoDisplay.textContent = 'Black Wins'
    document.querySelectorAll('.square').forEach(square => square.firstElementChild?.setAttribute('draggable', false));

  }
  if(!kings.some(king => king.firstChild.classList.contains('black'))){
    infoDisplay.textContent = 'White Wins'
    document.querySelectorAll('.square').forEach(square => square.firstElementChild?.setAttribute('draggable', false));

  }

}
