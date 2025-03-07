/*
 steps involved:
    1.deposit some mony
    2.detemine the no of lines on bet.
    3.collect a bet amount.
    4.spin the slot machine.
    5.check if the user won.
    6.give th euser thier winnings/lose
    7.play again?
*/

const prompt =require("prompt-sync")();

const ROWS=3;
const COLS=3;

const SYMBOLS_COUNT={
    A:2,
    B:4,
    C:6,
    D:8
}

const SYMBOL_VALUES={
    A:5,
    B:4,
    C:3,
    D:2
}



const deposit = () => {
    while(true){
        const depositAmount=prompt("Entrer the initial deposit Amount: ");
        const numberdepositAmount = parseFloat(depositAmount);

        if(isNaN(numberdepositAmount) || numberdepositAmount<=0){
            console.log("Invalid deposit amount,try again..");
        }else{
            return numberdepositAmount;
        }
    }
    
}

const getNumberofLines = () => {
    while(true){
        const lines=prompt("Entrer the Number of lines to bet on: ");
        const numberofLines = parseFloat(lines);

        if(isNaN(numberofLines) || numberofLines<=0 || numberofLines>3){
            console.log("Invalid number of lines,try again..");
        }else{
            return numberofLines;
        }
    }
}

const getbet = (balance,lines) =>{
    while(true){
        const bet=prompt("Entrer the bet per line: ");
        const numberofBet = parseFloat(bet);

        if(isNaN(numberofBet) || numberofBet<=0 || numberofBet>(balance/lines)){
            console.log("Invalid bet,try again..");
        }else{
            return numberofBet;
        }
    }
}

const spin = () => {
    const symbols=[];
    for( const [symbol,count] of Object.entries(SYMBOLS_COUNT)){
        for(let i=0;i<count;i++){
            symbols.push(symbol);
        }
    }

    const reels=[];
    for(let i=0;i<COLS;i++){
        reels.push([]);
        const reelSymbols=[...symbols];
        for(let j=0;j<ROWS;j++){
            const randomindex =Math.floor(Math.random()*reelSymbols.length);
            const selectedSymbol=reelSymbols[randomindex];
            reels[i].push(selectedSymbol);
            reelSymbols.slice(randomindex,1);
        }
    }
    return reels;
}
const transpose = (reels) =>{
    const rows=[];
    for(let i=0;i<ROWS;i++){
        rows.push([]);
        for(let j=0;j<COLS;j++){
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
}

const printRows=(rows)=>{
    for(const row of rows){
        let rowString="";
        for(const [i,symbol] of row.entries()){
            rowString+=symbol;
            if(i!=row.length-1){
                rowString+=" | ";
            }
        }
        console.log(rowString);
    }
}

const getWinnings = (rows,bet,lines) =>{
    let winnings=0;
    for(let row=0;row<lines;row++){
        const symbols=rows[row];
        let allSame =true;
        for(const symbol of symbols){
            if(symbol!=symbols[0]){
                allSame=false;
                break;
            }
        }
        if(allSame){
            winnings+=bet*SYMBOL_VALUES[symbols[0]];
        }
    }
    return winnings;
} 

const game = () =>{
    let balance=deposit();
    while(true){
        console.log("You have the balance of ₹"+balance);
        const numberofLines = getNumberofLines();
        const bet=getbet(balance,numberofLines);
        balance-=bet*numberofLines;
        const reels=spin();
        const  rows=transpose(reels);
        printRows(rows);
        const winnings=getWinnings(rows,bet,numberofLines);
        balance+=winnings;
        console.log("You Won, ₹",+winnings.toString());
        if(balance<=0){
            console.log("You ran out of money!");
            break;
        }

        const playAgain=prompt("Do you want to stiil continue the game ? (y/n): ");

        if(playAgain!="y") break;
    }
};

game();

