const BTN_CONTAINER = document.querySelector("#buttons-container");
const MAIN_SCREEN = document.querySelector("#main-screen");
const SECOND_SCREEN = document.querySelector("#second-screen");
const ARRAY = ["C", "D", "7", "8", "9", "/", "4", "5" ,"6", "*", "1", "2", "3", "-", ".", "0", "=", "+"];


// const appendBtn = (node) => {
//     let box = node;

//     let div = document.createElement("div");
//     div.classList.add("autor");
//     div.textContent = "Made By Sane";
//     box.appendChild(div);

//     for (let i = 0; i < ARRAY.length; i++){
//       let btn = document.createElement("button");
//       btn.classList.add("btn");
//       if (i == 0){
//         btn.classList.add(`btn${ARRAY[i]}`)
//       } else if (i == 1){
//         btn.classList.add("btnD")
//         btn.appendChild(icon);
//       }
//       btn.textContent = ARRAY[i]
//       box.appendChild(btn);
//     }
// }
// appendBtn(BTN_CONTAINER)


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
    if (!arr.includes(MAIN_SCREEN.textContent[MAIN_SCREEN.textContent.length-1]) && MAIN_SCREEN.textContent[MAIN_SCREEN.textContent.length-1] !== "."){
        MAIN_SCREEN.textContent += ope;
    }
}


const getLastValue = (text, ope) => {
    let values = text;
    let operators = ope;
    if (!operators.includes(values[0])) {
        values = "+" + values
    }
    let operInValues = values.match(/[\+\-\/\*]/g);
    let lastOperator = operInValues[operInValues.length-1];
    let lastValue = values.slice(values.lastIndexOf(lastOperator));
    return lastValue;
}


const displayDot = (dot) => {
    let operators = ARRAY.join("").match(/[\+\-\/\*]/g);
    let numValue = getLastValue(MAIN_SCREEN.textContent, operators)
    if(!numValue.includes(".") && !operators.includes(numValue[numValue.length-1])){
        MAIN_SCREEN.textContent += dot;
    }
}


const convertOperators = (arr, removed) => {
    if (arr[1] !== "/" && arr[1] !== "*"){
        let newOpertor = removed == arr[1] ? "+" : "-";
    arr[1] = newOpertor;
    }
}

const pemdasSort = (arr) => {
    let output = arr.sort((a, b) => {
        const precedence = {
        '+': 1,
        '-': 1,
        '/': 2,
        '*': 2,
        };
        return precedence[b] - precedence[a]
    })
    return output
}


const divide = (arr, operator) => {
    let input = arr.slice(arr.indexOf(operator)-1, arr.indexOf(operator)+2);
    let result = Number(input[0]) / Number(input[2]);
    arr.splice(arr.indexOf(operator)-1, 3, result);
}

const multiply = (arr, operator) => {
    let input = arr.slice(arr.indexOf(operator)-1, arr.indexOf(operator)+2);
    let result = Number(input[0]) * Number(input[2]);
    arr.splice(arr.indexOf(operator)-1, 3, result);
}

const add = (arr, operator) => {
    let input = arr.slice(arr.indexOf(operator)-1, arr.indexOf(operator)+2);
    let result = Number(input[0]) + Number(input[2]);
    arr.splice(arr.indexOf(operator)-1, 3, result);
}


const subtract = (arr, operator) => {
    let input = arr.slice(arr.indexOf(operator)-1, arr.indexOf(operator)+2);
    let result = Number(input[0]) - Number(input[2]);
    arr.splice(arr.indexOf(operator)-1, 3, result);
}


const calculate = (array, ope, revOp) => {
    for (let i = 0; i < ope.length; i++){
        if (ope[i] == "/"){
            divide(array, ope[i])
        } else if (ope[i] == "*"){
            multiply(array, ope[i])
        } else if (ope[i] == "+"){
            add(array, ope[i])
        } else if (ope[i] == "-"){
            subtract(array,ope[i])
        }
    }
}

const result = (ope) => {
    let output = MAIN_SCREEN.textContent.match(/(?<number>\d+(?:\.\d+)?)|(?<operator>[\+\-\/\*])/g);
    let btnOperators = ope;
    let removedOperator = "";
    if (btnOperators.includes(output[0])){
        removedOperator = output.shift();
        convertOperators(output, removedOperator)
    }
    let operators = pemdasSort(output.join('').match(/[\+\-\*\/]/g));
    calculate(output, operators, removedOperator)
    SECOND_SCREEN.textContent = MAIN_SCREEN.textContent + "=";
    MAIN_SCREEN.textContent = output;
}


const BUTTONS = document.querySelectorAll(".btn");

BUTTONS.forEach(btn => btn.addEventListener("click", function (e) {
    let numbers = ARRAY.join("").match(/[0-9]/g);
    let operators = ARRAY.join("").match(/[\+\-\/\*]/g)

    if (e.target.textContent == "C"){
        clear()
    
    } else if (e.target.className.length == 10){
        removeLastValue()
    
    } else if (numbers.includes(e.target.textContent)){
        displayNumbers(e.target.textContent)
    
    } else if (operators.includes(e.target.textContent)){
        displayOperators(e.target.textContent, operators);

    } else if (e.target.textContent == "."){
        displayDot(e.target.textContent)

    } else if (e.target.textContent == "=" && !operators.includes(MAIN_SCREEN.textContent[MAIN_SCREEN.textContent.length-1])){
        result(operators)
    }
}));
