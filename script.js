const BTN_CONTAINER = document.querySelector("#buttons-container");
const MAIN_SCREEN = document.querySelector("#main-screen");
const SECOND_SCREEN = document.querySelector("#second-screen");


const appendBtn = (node) => {
    let box = node;

    let div = document.createElement("div")
    div.classList.add("autor")
    div.textContent = "Made By Sane"
    box.appendChild(div)

    let arr = ["C", "DELETE", "7", "8", "9", "/", "4", "5" ,"6", "x", "1", "2", "3", "-", ".", "0", "=", "+"];
    for (let i = 0; i < arr.length; i++){
      let btn = document.createElement("button");
      btn.classList.add("btn");
      btn.textContent = arr[i]
      box.appendChild(btn);
    }
}
appendBtn(BTN_CONTAINER)


const BUTTONS = document.querySelectorAll(".btn");

BUTTONS.forEach(btn => btn.addEventListener("click", function (e) {
    if (e.target.textContent == "C"){
        MAIN_SCREEN.textContent = 0;
        SECOND_SCREEN.textContent = "";
    }

}));
