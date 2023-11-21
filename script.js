const BTN_CONTAINER = document.querySelector("#buttons-container");
const MAIN_SCREEN = document.querySelector("#main-screen");
const SECOND_SCREEN = document.querySelector("#second-screen");
const ARRAY = ["C", "D", "7", "8", "9", "/", "4", "5" ,"6", "*", "1", "2", "3", "-", ".", "0", "=", "+"];


const appendBtn = (node) => {
    let box = node;

    let div = document.createElement("div");
    div.classList.add("autor");
    div.textContent = "Made By Sane";
    box.appendChild(div);

    for (let i = 0; i < ARRAY.length; i++){
      let btn = document.createElement("button");
      btn.classList.add("btn");
      btn.textContent = ARRAY[i]
      box.appendChild(btn);
    }
}
appendBtn(BTN_CONTAINER)


const clear = () => {
    MAIN_SCREEN.textContent = 0;
    SECOND_SCREEN.textContent = "";
}


const removeLastValue = () => {
    if (MAIN_SCREEN.textContent.length <= 1){
        MAIN_SCREEN.textContent = "";
    } else {
    MAIN_SCREEN.textContent = MAIN_SCREEN.textContent.slice(0, MAIN_SCREEN.textContent.length-1)
    }
}


const displayNumbers = (text) => {
    if (MAIN_SCREEN.textContent == "0"){
        MAIN_SCREEN.textContent = text;
    } else {
        MAIN_SCREEN.textContent += text;
    }
}


const displayOperators = (ope, arr) => {
    if (!arr.includes(MAIN_SCREEN.textContent[MAIN_SCREEN.textContent.length-1])){
        MAIN_SCREEN.textContent += ope;
    }
}


const displayDot = (dot) => {
    let value = MAIN_SCREEN.textContent.split(/[\+\-\/\*]/g);
    let lastValue = value[value.length-1]
    if(!lastValue.includes(".")){
        MAIN_SCREEN.textContent += dot;
    }
}


const BUTTONS = document.querySelectorAll(".btn");

BUTTONS.forEach(btn => btn.addEventListener("click", function (e) {
    let numbers = ARRAY.join("").match(/[0-9]/g);
    let operators = ARRAY.join("").match(/[\+\-\/\*]/g)

    if (e.target.textContent == "C"){
        clear()
    
    } else if (e.target.textContent == "D"){
        removeLastValue()
    
    } else if (numbers.includes(e.target.textContent)){
        displayNumbers(e.target.textContent)
    
    } else if (operators.includes(e.target.textContent)){
        displayOperators(e.target.textContent, operators);

    } else if (e.target.textContent == "."){
        displayDot(e.target.textContent)
    }
}));
