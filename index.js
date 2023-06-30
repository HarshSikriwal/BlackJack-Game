let ifAceTwice=false;
let hasGameStarted=false;
let hasQuit=false;
let message = ""
let sumEl=document.getElementById("sum-el");
let card=document.getElementById("cards");
let startButton = document.getElementById("start");

let sum=0

let cards=[];
str= "&#1271"
for (let i=37; i<99;i++){
    if (i%16==0 || i%16==3 || i%16==4){
        continue;
    }
    cards.push(str+i);
}
function resetDefaults(){
    ifAceTwice=false;
    hasGameStarted=false;
    hasQuit=false;
    message = "Want to play a round?";
    card.innerText='Cards:';
    sum=0
    let messageDiv=document.getElementById("message-div")
        Array.from(messageDiv.children)
        .forEach((child) => messageDiv.removeChild(child));

        let messageEL = document.createElement("span")
        
        messageEL.textContent=message;
    messageDiv.appendChild(messageEL);

}

function cardValue(i){
    let remainder = i%13
    if (remainder >= 10 && remainder <= 12) {
        return 10
    }
    if (remainder === 0) {
        if (ifAceTwice){
            return 1

        }
        
        ifAceTwice=true
        return 11

    }
    return remainder+1

}


function giveMeCard(){
    let i=Math.floor(Math.random()*cards.length);
    let card_prop={};
    card_prop.card=cards[i]
    card_prop.val=cardValue(i)

    if (i%cards.length<12 || i%cards.length>37){
        card_prop.col='rgba(0,0,0,0.7)';}
    else{
        card_prop.col='rgba(255,0,0,0.7)';}

    console.log(card_prop)
    return card_prop

}
let parentCard=document.getElementById("cards");

function createElement(card){
    let child = document.createElement("span")
    child.style.color=card.col;
    child.style.fontSize='100px';
    child.innerHTML=card.card;
   
    return child
}



function changeButton() {
startButton.innerText = "Restart Game"
}


function  startGame(){
    
    if (!hasGameStarted && !hasQuit){
    let card1=giveMeCard()
    let card2=giveMeCard()

    let child1 = createElement(card1);
    let child2 = createElement(card2);
    
    sum=card1.val+card2.val;
    hasGameStarted=true
    parentCard.appendChild(child1);
    parentCard.appendChild(child2);
    }
    else if(hasQuit){
        changeButton()
        startButton.onclick=() => {
            resetDefaults()
            startGame()
        }

    }
    else{
        let extraCard=giveMeCard();
        let extraChild=createElement(extraCard);
        sum+=extraCard.val;
        parentCard.appendChild(extraChild);
    }
       
    if(sum<=20){
        message="Do you want to draw a new card? ";
        let messageDiv=document.getElementById("message-div")
        Array.from(messageDiv.children)
        .forEach((child) => messageDiv.removeChild(child));

        let messageEL = document.createElement("span")
        
        messageEL.textContent=message;
        let newButton1=document.createElement('button');
        let newButton2=document.createElement('button');

        newButton1.textContent='Yes';
        newButton2.textContent='I Quit';
        
        messageDiv.appendChild(messageEL);
        messageDiv.appendChild(newButton1);
        messageDiv.appendChild(newButton2);
        newButton1.onclick=()=>{startGame()};
        newButton2.onclick=()=>{
            sum=1000
            hasQuit=true
            startGame();
        }
        console.log(sum);

    }
    else {

        if(sum===21){
            message="You've got BlackJack!"
            
        }
        else{
            message='Better luck next time';
            
        }
        let messageDiv=document.getElementById("message-div")
        Array.from(messageDiv.children)
        .forEach((child) => {
            console.log(child)
            messageDiv.removeChild(child)
        });
        let messageEL = document.createElement("span")
        messageEL.textContent=message;
        messageDiv.appendChild(messageEL);
        changeButton()
        startButton.onclick=() => {
            resetDefaults()
            startGame()
        } 
    }
    if (sum!=1000 ){
    sumEl.textContent='Sum: ' + sum
    }
}

// document.getElementById("test").innerHTML=cards;


