/* 
LOGICAL FEATURES REMAINING
1. Button get's enabled when we come back to the grid → DONE
2. Free Move features
3. Disable global grid
4. What if all the buttons of destination cells are filled → inner grid is Draw
5. Mention No UNDO in Instructions/ If you can Implement it.
*/

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
    checkResult(gridNumber);
    disableAllgrids(val);
    console.log(grid[0]);
}
function checkResult(gridNumber){
    for(let i=0;i<3;i++){
        if(grid[gridNumber][0 + (3*i)] == grid[gridNumber][1+ (3*i)] && grid[gridNumber][1+ (3*i)] == grid[gridNumber][2+ (3*i)] && grid[gridNumber][0 + (3*i)] !=0){
            disableAllButtons(gridNumber);
            grid[0][gridNumber] = grid[gridNumber][0 + (3*i)];
        }
        if(grid[gridNumber][0+i] == grid[gridNumber][3 +i] && grid[gridNumber][3+i] == grid[gridNumber][6+i] && grid[gridNumber][0+i] !=0){
            disableAllButtons(gridNumber);
            grid[0][gridNumber] = grid[gridNumber][0+i];
        }
    }
    if(grid[gridNumber][0] == grid[gridNumber][4] && grid[gridNumber][4] == grid[gridNumber][8] && grid[gridNumber][0] !=0){
        disableAllButtons(gridNumber);
        grid[0][gridNumber] = grid[gridNumber][4];
    }
    if(grid[gridNumber][2] == grid[gridNumber][4] && grid[gridNumber][4] == grid[gridNumber][6] && grid[gridNumber][2] !=0){
        disableAllButtons(gridNumber);
        grid[0][gridNumber] = grid[gridNumber][4];
    }
}
function disableAllButtons(gridNumber){
    for(let i=1;i<10;i++){
        document.getElementById(`box${gridNumber}cell${i}`).disabled = true;
    }
}
function enableAllButtons(gridNumber){  // Here the gridnumber is the grid we have to enable
    // console.log(gridNumber);
    for(let i=1;i<10;i++){
        if(grid[gridNumber][i-1] == 0)
            document.getElementById(`box${gridNumber}cell${i}`).disabled = false;
    }
}
function disableAllgrids(gridNumber){
    for(let i=1;i<10;i++)
        if(i != gridNumber)
            disableAllButtons(i);
    enableAllButtons(gridNumber);
}
// setInterval(checkResult, 1000);
