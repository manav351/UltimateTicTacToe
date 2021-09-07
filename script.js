let grid = [];
for(let i=0;i<10;i++){
    grid[i] = [0,0,0,0,0,0,0,0,0];
}
let counter = 1;
function buttonpressed(gridNumber,val){
    grid[gridNumber][val-1] = counter;
    if(counter == 1){
        counter = 2;
        document.getElementById("statusBar").innerHTML = "Turn : Player \u25EF | Player 2";
    }
    else{
        counter = 1;
        document.getElementById("statusBar").innerHTML = "Turn : Player \u274C | Player 1";
    }
    if(grid[gridNumber][val-1] == 1)
        document.getElementById(`box${gridNumber}cell${val}`).innerHTML = "\u274C";
    else 
        document.getElementById(`box${gridNumber}cell${val}`).innerHTML = "\u25EF";
    document.getElementById(`box${gridNumber}cell${val}`).disabled = true;
    checkResult(gridNumber);            // Updates the result
    disableAllgrids(val);               // Disables all the grids + enables the target grid
    checkOuterResult();
    /* let temporaryString = "";
    for(let i=0;i<10;i++){
        for(let j=0;j<9;j++){
            temporaryString += grid[i][j] + " ";
        }
        temporaryString += "\n";
    }    
    console.clear();
    console.log(temporaryString);
    console.log("------------------------------------------");       */
}
function checkResult(gridNumber){       // Updates the result i.e., it checks the active grid for answers
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
            else
                disableAllButtons(i);
        if(counter == 1)
            document.getElementById("statusBar").innerHTML = `Turn : Player \u274C | Player ${counter} | Free Move`;
        else 
            document.getElementById("statusBar").innerHTML = `Turn : Player \u25EF | Player ${counter} | Free Move`;
    }
    else{                                   // Normal Concept
        for(let i=1;i<10;i++)
            if(i != gridNumber)
                disableAllButtons(i);
        enableAllButtons(gridNumber);
    }
}
// setInterval(checkResult, 1000);

function checkOuterResult(){                // This functions checks the overall result of Win and Loose
    for(let i=0;i<3;i++){                   // Here the gridNumber is the presently marked grid
        if(grid[0][0 + (3*i)] == grid[0][1+ (3*i)] && grid[0][1+ (3*i)] == grid[0][2+ (3*i)] && grid[0][0 + (3*i)] !=0){
            alert(`Player ${grid[0][3*i]} Won`);
        }
        if(grid[0][0+i] == grid[0][3 +i] && grid[0][3+i] == grid[0][6+i] && grid[0][0+i] !=0){
            alert(`Player ${grid[0][i]} Won`);
        }
    }
    if(grid[0][0] == grid[0][4] && grid[0][4] == grid[0][8] && grid[0][0] !=0){
        alert(`Player ${grid[0][4]} Won`);
    }
    if(grid[0][2] == grid[0][4] && grid[0][4] == grid[0][6] && grid[0][2] !=0){
        alert(`Player ${grid[0][4]} Won`);
    }
}

function restartButtonClick(){
    let ans = window.confirm("Are you sure you want to Restart?");
    console.log(ans);
    if(ans == true){
        document.getElementById("statusBar").innerHTML = `X Moves First | Player 1 | Free Move`;
        for(let i=0;i<10;i++){
            for(let j=0;j<9;j++)
            grid[i][j] = 0;
        }
        for(let i=1;i<10;i++){
            for(let j=1;j<10;j++){
                document.getElementById(`box${i}cell${j}`).disabled = false;
                document.getElementById(`box${i}cell${j}`).innerHTML = "";
            }
        }
    }
}