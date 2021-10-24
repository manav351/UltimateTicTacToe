/// <reference path="jquery-3.6.0.min.js" />
const togglePlayer = () => counter = (counter == 1) ? 2 : 1;
const highlightCurrentPlayer = () =>$(".player_names").toggleClass("activePlayer");
const setStorage = (key, item) => localStorage.setItem(key, item);
const getStorage = (key) => localStorage.getItem(key);
const getDigits = (string) => string.replace(/\D/g, '');
let grid = [];
let counter = 1;
let undoArray = [];

$(document).ready(function () {
    gridButtonClickListener();
    playerNameClickListener();
    // Initializing the grid
    for (let i = 0; i < 10; i++) {
        grid.push([]);
        for (let j = 0; j < 10; j++) {
            grid[i].push(0);
        }
    }
});

// set clickListener for grid buttons
function gridButtonClickListener() {
    $(".internalbuttons").each(function () {
        $(this).on("click", function () {
            const nums = getDigits(this.id)
            buttonpressed(nums[0], nums[1]);
        });
    });
}
function getPlayerNames() {
    if (!getStorage("player1")) savePlayerNames(1);
    if (!getStorage("player2")) savePlayerNames(2);
    
    $("#player1name").html(getStorage("player1"));
    $("#player2name").html(getStorage("player2"));
}

function savePlayerNames(player) {
    let playerName = prompt(`Enter Player ${player} Name`, `player${player}`) || `player${player}`;
    setStorage(`player${player}`, playerName);
}
function playerNameClickListener(){
    $("#player1name,#player2name").on("click",function(event){
        $(this).attr("contenteditable", "true");
    });
    $("#player1name,#player2name").on("keypress",function(){
        const newName = $(this).html();
        if(newName.length > 16) $(this).html(newName.substring(0,16));
        if (event.keyCode === 13) {
            $(this).blur();
        }
    });
    $("#player1name,#player2name").on("blur",function(){
        const player = "player"+getDigits(this.id);
        $(this).attr("contenteditable", "false");
        if($(this).html().length < 1) $(this).html(getStorage(player));
        setStorage(player, $(this).html());
    });
}
function buttonpressed(gridNumber, val) {
    grid[gridNumber][val - 1] = counter;      //updating inner grid with selected user
    document.getElementById(`box${gridNumber}cell${val}`).disabled = true;      // Disabling the calling button

    togglePlayer();
    highlightCurrentPlayer();
    updateUndoArray(gridNumber, val);
    updateButtonValue(gridNumber, val);
    checkInnerResult(gridNumber);           // Updates the inner grid result
    disableAllgrids(val);                   // Disables all the grids + enables the target grid
    checkOuterResult();                     // Updates the Outer grid result
    // consolePrintGridValues();    
}

function updateButtonValue(gridNumber, val) {
    document.getElementById(`box${gridNumber}cell${val}`).innerHTML = (grid[gridNumber][val - 1] == 1) ? "\u274C" : "\u25EF";
}

function checkInnerResult(gridNumber) {       // Updates the result i.e., it checks the active grid for answers
    for (let i = 0; i < 3; i++) {               // Here the gridNumber is the presently marked grid
        if (grid[gridNumber][0 + (3 * i)] == grid[gridNumber][1 + (3 * i)] && grid[gridNumber][1 + (3 * i)] == grid[gridNumber][2 + (3 * i)] && grid[gridNumber][0 + (3 * i)] != 0) {
            grid[0][gridNumber - 1] = grid[gridNumber][0 + (3 * i)];
        }
        if (grid[gridNumber][0 + i] == grid[gridNumber][3 + i] && grid[gridNumber][3 + i] == grid[gridNumber][6 + i] && grid[gridNumber][0 + i] != 0) {
            grid[0][gridNumber - 1] = grid[gridNumber][0 + i];
        }
    }
    if (grid[gridNumber][0] == grid[gridNumber][4] && grid[gridNumber][4] == grid[gridNumber][8] && grid[gridNumber][0] != 0) {
        grid[0][gridNumber - 1] = grid[gridNumber][4];
    }
    if (grid[gridNumber][2] == grid[gridNumber][4] && grid[gridNumber][4] == grid[gridNumber][6] && grid[gridNumber][2] != 0) {
        grid[0][gridNumber - 1] = grid[gridNumber][4];
    }
}

function enableAllButtons(gridNumber) {      // Here the gridnumber is the grid we have to enable
    // console.log(gridNumber);
    for (let i = 1; i < 10; i++) {                  // This functions enables only the valid buttons of the grid
        if (grid[gridNumber][i - 1] == 0)
            document.getElementById(`box${gridNumber}cell${i}`).disabled = false;
    }
}

function disableAllButtons(gridNumber) {
    for (let i = 1; i < 10; i++) {
        document.getElementById(`box${gridNumber}cell${i}`).disabled = true;
    }
}

function disableAllgrids(gridNumber) {       // Here the gridNumber is the grid which we have to keep enabled
    if (grid[0][gridNumber - 1] != 0) {         // Free Move concept
        for (let i = 1; i < 10; i++)
            if (grid[0][i - 1] == 0)
                enableAllButtons(i);
            else
                disableAllButtons(i);
    }
    else {                                   // Normal Concept
        for (let i = 1; i < 10; i++)
            if (i != gridNumber)
                disableAllButtons(i);
        enableAllButtons(gridNumber);
    }
}

function checkOuterResult() {                // This functions checks the overall result of Win and Loose
    for (let i = 0; i < 3; i++) {                   // Here the gridNumber is the presently marked grid
        if (grid[0][0 + (3 * i)] == grid[0][1 + (3 * i)] && grid[0][1 + (3 * i)] == grid[0][2 + (3 * i)] && grid[0][0 + (3 * i)] != 0) {
            winnerDisplay(`Player ${grid[0][3 * i]} Won`);
        }
        if (grid[0][0 + i] == grid[0][3 + i] && grid[0][3 + i] == grid[0][6 + i] && grid[0][0 + i] != 0) {
            winnerDisplay(`Player ${grid[0][i]} Won`);
        }
    }
    if (grid[0][0] == grid[0][4] && grid[0][4] == grid[0][8] && grid[0][0] != 0) {
        winnerDisplay(`Player ${grid[0][4]} Won`);
    }
    if (grid[0][2] == grid[0][4] && grid[0][4] == grid[0][6] && grid[0][2] != 0) {
        winnerDisplay(`Player ${grid[0][4]} Won`);
    }
}

function winnerDisplay(winner) {
    confetti.start();
    document.getElementById("blurOverlay").style.display = "block";
    document.getElementById("winnerDisplayWindow").style.display = "flex";
    document.getElementById("winnerDisplayText").innerHTML = winner;
}

function consolePrintGridValues() {
    let temporaryString = "";        // Print all grid values
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 9; j++)
            temporaryString += grid[i][j] + " ";
        temporaryString += "\n";
    }
    console.clear();
    console.log(temporaryString);
}

function updateUndoArray(a, b) { 
    undoArray.push([a, b]);
}

// -------------------------------------------------------------------------------------------------------------------
// Tool Box Button Implementation
function restartButtonClick() {
    // document.getElementById("winnerDisplayWindow").style.display = "none";
    document.getElementById("blurOverlay").style.display = "block";
    document.getElementById("restartWindow").style.display = "flex";
}

function restartButtonClickYes() {
    document.getElementById("blurOverlay").style.display = "none";
    document.getElementById("restartWindow").style.display = "none";
    counter = 1;
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 9; j++)
            grid[i][j] = 0;
    }
    for (let i = 1; i < 10; i++) {
        for (let j = 1; j < 10; j++) {
            document.getElementById(`box${i}cell${j}`).disabled = false;
            document.getElementById(`box${i}cell${j}`).innerHTML = "";
        }
    }
    confetti.stop();
    document.getElementById("blurOverlay").style.display = "none";
    document.getElementById("winnerDisplayWindow").style.display = "none";
}

function restartButtonClickNo() {
    document.getElementById("blurOverlay").style.display = "none";
    document.getElementById("restartWindow").style.display = "none";
}

function autoPlay() {
    let playValues = [[1, 9], [9, 1], [1, 5], [5, 1], [1, 1], [9, 4], [4, 6], [6, 4], [4, 5], [5, 4], [4, 4], [9, 7], [7, 3], [3, 7], [7, 5], [5, 7], [7, 7]];
    for (let i = 0; i < 10; i++) {                  // To check whether the user has started playing or not
        for (let j = 0; j < 9; j++)               // If yes, then ask him to refresh first
            if (grid[i][j] != 0)
                if (restartButtonClick())    // If user denies, continue the game
                    return;
    }
    let counter = 0;
    function autoPlayValue() {
        document.getElementById(`box${playValues[counter][0]}cell${playValues[counter][1]}`).click();
        counter++;
        if (counter == playValues.length)
            clearInterval(myInterval);
    }
    let myInterval = setInterval(autoPlayValue, 300);
}

function skipInstructionsButton() {
    let windowD = document.getElementById("blurOverlay");
    windowD.style.display = "none";
    document.getElementById("instructions").style.display = "none";
    getPlayerNames();
}

function showInstructions() {
    document.getElementById("blurOverlay").style.display = "block";
    document.getElementById("instructions").style.display = "flex";
}

function winnerWindowCancel() {
    console.log("winner window cancel pressed")
    for (let i = 1; i <= 9; i++)
        for (let j = 1; j <= 9; j++)
            document.getElementById(`box${i}cell${j}`).disabled = true;
    confetti.stop();
    document.getElementById("blurOverlay").style.display = "none";
    document.getElementById("winnerDisplayWindow").style.display = "none";
}

function undoButton() {
    alert("this function is in Development")

}
