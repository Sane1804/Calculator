let btnContainer = document.querySelector("#buttons-container");

const appendBtn = (node) => {
    let box = node;

    for (let i = 0; i < 18; i++){
        let arr = ["C", "DELETE", "7", "8", "9", "/", "4", "5" ,"6", "x", "1", "2", "3", "-", ".", "0", "=", "+"];
        let btn = document.createElement("button");
        btn.classList.add("btn");
        if(i < 2){
            btn.classList.add("btn-span");
        }
        btn.textContent = arr[i];
        box.appendChild(btn);
    }
}
appendBtn(btnContainer)


const BUTTONS = document.querySelectorAll(".btn");



BUTTONS.forEach(btn => btn.addEventListener("click", function (e) {
    console.log(e.target)
}));
