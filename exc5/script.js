const result = 0
const elemResult = document.querySelector("#result")
const minusButtonSelector = document.querySelector("#minus")
const plusButtonSelector = document.querySelector("#plus")
const divideButtonSelector = document.querySelector("#divide")
const multiButtonSelector = document.querySelector("#multi")
let num1 = 0, num2 = 0, action = ""


function addNumberToBoard(num) {
    if (!checkButtons()) {
        elemResult.innerText = ""
    }
    nullifyButtons()
    elemResult.innerText += `${num}`
}

function addNumberToBoardPoint() {
    if (!checkButtons()) {
        elemResult.innerText = ""
    }
    nullifyButtons()
    elemResult.innerText += "."
}

function clearBoard() {
    nullifyButtons()
    num1 = 0
    num2 = 0
    action = ""
    elemResult.innerText = ""
}

function addNumbers() {
    num1 = parseInt(elemResult.innerText)
    nullifyButtons()
    plusButtonSelector.style.backgroundColor = "#FEE08A"
    plusButtonSelector.style.border = "3px solid #FF6600"
    action = "+"
}

function minusNumbers() {
    num1 = parseInt(elemResult.innerText)
    nullifyButtons()
    minusButtonSelector.style.backgroundColor = "#FEE08A"
    minusButtonSelector.style.border = "3px solid #FF6600"
    action = "-"
}

function multNumbers() {
    num1 = parseInt(elemResult.innerText)
    nullifyButtons()
    multiButtonSelector.style.backgroundColor = "#FEE08A"
    multiButtonSelector.style.border = "3px solid #FF6600"
    action = "*"
}

function divNumbers() {
    num1 = parseInt(elemResult.innerText)
    nullifyButtons()
    divideButtonSelector.style.backgroundColor = "#FEE08A"
    divideButtonSelector.style.border = "3px solid #FF6600"
    action = "/"
}

function printResult(num1, action) {
    num2 = parseInt(elemResult.innerText)
    const result = eval(`${num1} ${action} ${num2}`);
    elemResult.innerText = result
}

function nullifyButtons() {
    minusButtonSelector.style.backgroundColor = "#02CA00"
    minusButtonSelector.style.border = "3px solid #484848"
    plusButtonSelector.style.backgroundColor = "#02CA00"
    plusButtonSelector.style.border = "3px solid #484848"
    multiButtonSelector.style.backgroundColor = "#02CA00"
    multiButtonSelector.style.border = "3px solid #484848"
    divideButtonSelector.style.backgroundColor = "#02CA00"
    divideButtonSelector.style.border = "3px solid #484848"
}

function checkButtons() {
    const minusButtonStyle = window.getComputedStyle(minusButtonSelector);
    const plusButtonStyle = window.getComputedStyle(plusButtonSelector);
    const divideButtonStyle = window.getComputedStyle(divideButtonSelector);
    const multiButtonStyle = window.getComputedStyle(multiButtonSelector);

    if (minusButtonStyle.backgroundColor === "rgb(2, 202, 0)" &&
        minusButtonStyle.border === "2.4px solid rgb(72, 72, 72)" &&
        plusButtonStyle.backgroundColor === "rgb(2, 202, 0)" &&
        plusButtonStyle.border === "2.4px solid rgb(72, 72, 72)" &&
        multiButtonStyle.backgroundColor === "rgb(2, 202, 0)" &&
        multiButtonStyle.border === "2.4px solid rgb(72, 72, 72)" &&
        divideButtonStyle.backgroundColor === "rgb(2, 202, 0)" &&
        divideButtonStyle.border === "2.4px solid rgb(72, 72, 72)") {
            return true;
        }
    return false;
}
