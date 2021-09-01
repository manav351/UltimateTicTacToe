let grid1 = [0,0,0,0,0,0,0,0,0]
let counter = 1;
function buttonpressed(val){
    grid1[val-1] = counter;
    counter = counter == 1? 2:1;
    if(grid1[val-1] == 1)document.getElementById(`box1cell${val}`).innerHTML = "\u274C";
    else document.getElementById(`box1cell${val}`).innerHTML = "\u25EF";
    document.getElementById(`box1cell${val}`).disabled = true;
    checkResult();
}
function checkResult(){
    for(let i=0;i<3;i++){
        if(grid1[0 + (3*i)] == grid1[1+ (3*i)] && grid1[1+ (3*i)] == grid1[2+ (3*i)] && grid1[0 + (3*i)] !=0){
            disableAllButtons();
        }
        if(grid1[0+i] == grid1[3 +i] && grid1[3+i] == grid1[6+i] && grid1[0+i] !=0){
            disableAllButtons();
        }
    }
    if(grid1[0] == grid1[4] && grid1[4] == grid1[8] && grid1[0] !=0){
        disableAllButtons();
    }
    if(grid1[2] == grid1[4] && grid1[4] == grid1[6] && grid1[2] !=0){
        disableAllButtons();
    }
}
function disableAllButtons(){
    for(let i=1;i<10;i++){
        document.getElementById(`box1cell${i}`).disabled = true;
    }
}
// setInterval(checkResult, 1000);
