// let grid = [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]];
let grid = [];
for(let i=0;i<10;i++){
    grid[i] = [0,0,0,0,0,0,0,0,0];
}
let counter = 1;
function buttonpressed(gridNumber,val){
    grid[gridNumber][val-1] = counter;
    counter = counter == 1? 2:1;
    if(grid[gridNumber][val-1] == 1)document.getElementById(`box${gridNumber}cell${val}`).innerHTML = "\u274C";
    else document.getElementById(`box${gridNumber}cell${val}`).innerHTML = "\u25EF";
    document.getElementById(`box${gridNumber}cell${val}`).disabled = true;
    checkResult(gridNumber);
}
function checkResult(gridNumber){
    for(let i=0;i<3;i++){
        if(grid[gridNumber][0 + (3*i)] == grid[gridNumber][1+ (3*i)] && grid[gridNumber][1+ (3*i)] == grid[gridNumber][2+ (3*i)] && grid[gridNumber][0 + (3*i)] !=0){
            disableAllButtons(gridNumber);
            grid[0][gridNumber] = [gridNumber][0 + (3*i)];
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
// setInterval(checkResult, 1000);
