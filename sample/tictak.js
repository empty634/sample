const cells = document.querySelectorAll(`.cell`);
const statustext = document.getElementById(`statustext`);
const restartBtn = document.getElementById(`restartBtn`);
const winConditions =[
    [0,1,2],
    [3,5,6],
    [7,8,9],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,5,6]
];
let options =[``,``,``,``,``,``,``,``,``];
let currentPlayer = `X`;
let running = false;

intializeGame();

function intializeGame(){
    cells.forEach(cell =>cell.addEventListener(`click`,cellClicked));
    restartBtn.addEventListener(`click`,restartGame);
    statustext.textContent = `${currentPlayer} s turn`;
}
function cellClicked(){
    const cellIndex = this.getAttribute(`cellIndex`);
    if (options[cellIndex !=``|| !running]){
        return;
    }
    updateCell(this,cellIndex);
    checkWinner();

}
function updateCell(cell,index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;

}
function changePlayer(){
    currentPlayer = (currentPlayer == `X`)? `O`: `X`;
    statustext.textContent = `${currentPlayer} 's turn`;

}
function checkWinner(){
    let roundWon = false;
    for(i = 0;i<winConditions.length;i++){
        const condition = winConditions[i];
        const cellA = options [condition[0]];
        const cellB = options [condition[1]];
        const cellC = options [condition[2]];

        if(cellA == ``|| cellB == ``|| cellC ==``){
            continue;
        }
        if(cellA == cellB&&cellB == cellC){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        statustext.textContent = `${currentPlayer} wins`;
        running = false;
    }
    else if(!options.includes(``)){
        statustext.textContent = `Draw!`;
        running = false;
    }
    else{
        changePlayer();
    }
}
function restartGame(){
    currentPlayer = `X`;
    options = [``,``,``,``,``,``,``,``,``];
    statustext.textContent = `${currentPlayer}' s turn`;
    cells.forEach(cell=>cell.textContent = ``);
    running = true;

}
