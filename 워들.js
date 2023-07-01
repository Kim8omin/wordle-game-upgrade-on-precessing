const answer="APPLE";
let index=0;
let attempt=0;
let endingTime;

function appStart() { 
const displayOver = () => {
    const div = document.createElement('div');
    div.innerText = "Game over. Try again.";
    div.style = "display:flex; justify-content:center; align-items:center; position:absolute;top:40vh;left:45vw;background-color:white; width:180px; height:50px;"
    document.body.appendChild(div);
};
    const nextLine = () => {
    if (attempt===6) {
        displayOver();
        window.removeEventListener("keydown", pressKey);
     } else {
        attempt+=1;
        index=0;
     }
    };
    const clear = () => {
        window.removeEventListener("keydown",pressKey);
        displayOver();
        clearInterval(endingTime);
    };

    const $enter= () => {
        let correrctIndex= 0;

        for (let i = 0; i < 5; i++) {
            const $box = document.querySelector(`.box[data-index="${attempt}${i}"]`);
            const mychoice = $box.innerText;
            const answerIndex = answer[i];
            if (mychoice === answerIndex) {
                $box.style.background = "yellowgreen";
                correrctIndex +=1;
            }
            else if (answer.includes(mychoice)) {
                $box.style.background = "yellow";
            } else { $box.style.background = 'grey'; };

            $box.style.color = "white";
        }
        if (correrctIndex===5) {clear()}
        else {nextLine ()};
};

const $backSpace = () => {
    if (index>0){
    const preBox = document.querySelector(
        `.box[data-index="${attempt}${index-1}"]`)
    preBox.innerText="";
    }
    if (index>0){
        index-=1;
    }
};

const pressKey = (event)=> {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBox = document.querySelector(
        `.box[data-index="${attempt}${index}"]`);

    

    if (event.key==='Backspace') $backSpace();
    else if (index === 5) {
        if (event.key === "Enter") $enter();
        else return;
    }else if (keyCode >= 65 && keyCode <= 90) {
        thisBox.innerText = key;
        index += 1;
    }
};

const timer = () => {
   const startTime =new Date();

   function setTime() {
   const currentTime=new Date();
   const timer=new Date(currentTime-startTime);
   const m=timer.getMinutes().toString().padStart(2,"0");
   const s=timer.getSeconds().toString().padStart(2,"0");
   const $h4=document.querySelector("h4");
   $h4.innerText=`${m}:${s}`;
}
endingTime=setInterval (setTime,1000); //id저장
};

timer ();
window.addEventListener("keydown",pressKey);

}; //appStart를 닫아주는 중괄호 

appStart(); 