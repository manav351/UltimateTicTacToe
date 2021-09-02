let grid = [];
for(let i=0;i<10;i++){
    grid[i] = [0,0,0,0,0,0,0,0,0];
}
let counter = 1;
function buttonpressed(gridNumber,val){
    grid[gridNumber][val-1] = counter;
    if(counter == 1){
        counter = 2;
        document.getElementById("statusBar").innerHTML = "Turn : Player O | Player 2";
    }
    else{
        counter = 1;
        document.getElementById("statusBar").innerHTML = "Turn : Player X | Player 1";
    }
    if(grid[gridNumber][val-1] == 1)document.getElementById(`box${gridNumber}cell${val}`).innerHTML = "\u274C";
    else document.getElementById(`box${gridNumber}cell${val}`).innerHTML = "\u25EF";
    document.getElementById(`box${gridNumber}cell${val}`).disabled = true;
    checkResult(gridNumber);            // Updates the result
    disableAllgrids(val);               // Disables all the grids + enables the target grid
    console.log(grid[0]);       
}
function checkResult(gridNumber){       // Updates the result + disables that specific grid on which it was called on
    // disableAllButtons(gridNumber);
    for(let i=0;i<3;i++){               // Here the gridNumber is the presently marked grid
        if(grid[gridNumber][0 + (3*i)] == grid[gridNumber][1+ (3*i)] && grid[gridNumber][1+ (3*i)] == grid[gridNumber][2+ (3*i)] && grid[gridNumber][0 + (3*i)] !=0){
            grid[0][gridNumber-1] = grid[gridNumber][0 + (3*i)];
        }
        if(grid[gridNumber][0+i] == grid[gridNumber][3 +i] && grid[gridNumber][3+i] == grid[gridNumber][6+i] && grid[gridNumber][0+i] !=0){
            grid[0][gridNumber-1] = grid[gridNumber][0+i];
        }
    }
    if(grid[gridNumber][0] == grid[gridNumber][4] && grid[gridNumber][4] == grid[gridNumber][8] && grid[gridNumber][0] !=0){
        grid[0][gridNumber-1] = grid[gridNumber][4];
    }
    if(grid[gridNumber][2] == grid[gridNumber][4] && grid[gridNumber][4] == grid[gridNumber][6] && grid[gridNumber][2] !=0){
        grid[0][gridNumber-1] = grid[gridNumber][4];
    }
}

function enableAllButtons(gridNumber){      // Here the gridnumber is the grid we have to enable
    // console.log(gridNumber);
    for(let i=1;i<10;i++){                  // This functions enables only the valid buttons of the grid
        if(grid[gridNumber][i-1] == 0)
            document.getElementById(`box${gridNumber}cell${i}`).disabled = false;
    }
}

function disableAllButtons(gridNumber){
    for(let i=1;i<10;i++){
        document.getElementById(`box${gridNumber}cell${i}`).disabled = true;
    }
}

function disableAllgrids(gridNumber){       // Here the gridNumber is the grid which we have to keep enabled
    if(grid[0][gridNumber-1] != 0){         // Free Move concept
        for(let i=1;i<10;i++)
            if(grid[0][i-1] == 0)
                enableAllButtons(i);
        document.getElementById("statusBar").innerHTML = `Turn : Player ${counter} | Free Move`
    }
    else{
        for(let i=1;i<10;i++)
            if(i != gridNumber)
                disableAllButtons(i);
        enableAllButtons(gridNumber);
    }
}
// setInterval(checkResult, 1000);
