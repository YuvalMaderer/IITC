const buttonElem1 = document.querySelector("#num1")
const buttonElem2 = document.querySelector("#num2")
const buttonElem3 = document.querySelector("#num3")
const buttonElem4 = document.querySelector("#num4")
const bullsElem = document.querySelector("#bulls")
const cowsElem = document.querySelector("#cows")
const dupElem = document.querySelector("#duplicates")
const addingGuessElem = document.querySelector("#addingGuess")
const endPopupElem = document.querySelector("#endPopup")
const gjElem = document.querySelector("#gjMessage")
const timeElem = document.querySelector("#timeTook")
const anotherGameElem = document.querySelector("#anotherGame")
const noElem = document.querySelector("#yes")
const yesElem = document.querySelector("#no")
const theCodeElem = document.querySelector("#theCode")
let userGuess = [buttonElem1.innerText, buttonElem2.innerText, buttonElem3.innerText, buttonElem4.innerText]
let randomNumber1, randomNumber2, randomNumber3, randomNumber4, elemGuess, userName, startTime, endTime
chooseCode()
let code = [randomNumber1, randomNumber2, randomNumber3, randomNumber4]

document.getElementById('submit').addEventListener('click', function(event) {
    startTime = new Date();
    event.preventDefault();
    document.getElementById('namePopup').style.display = 'none';
});


function saveUserName() {
    userName = document.querySelector("#userName").value
}

function chooseCode() {
    while (true) {
        randomNumber1 = Math.floor(Math.random() * 10)
        randomNumber2 = Math.floor(Math.random() * 10)
        randomNumber3 = Math.floor(Math.random() * 10)    
        randomNumber4 = Math.floor(Math.random() * 10)
        if (randomNumber1 != randomNumber2 && 
            randomNumber1 != randomNumber3 && 
            randomNumber1 != randomNumber4 && 
            randomNumber2 != randomNumber3 && 
            randomNumber2 != randomNumber4 && 
            randomNumber3 != randomNumber4) {
            break
        }
    }
}

function elemSelected(num) {
    makeButtonsWhite()
    elemGuess = document.querySelector(`#num${num}`)
    let elemGuessInt = parseInt(elemGuess.innerText)
    elemGuessInt += 1
    if (elemGuess.innerText === "9") {
        elemGuess.innerText = "0"
    } else {
        elemGuess.innerText = `${elemGuessInt}`
    }
    elemGuess.style.backgroundColor = "#1e293b"
    elemGuess.style.color = "white"
}

function makeButtonsWhite() {
    buttonElem1.style.backgroundColor = "white"
    buttonElem1.style.color = "black"
    buttonElem2.style.backgroundColor = "white"
    buttonElem2.style.color = "black"
    buttonElem3.style.backgroundColor = "white"
    buttonElem3.style.color = "black"
    buttonElem4.style.backgroundColor = "white"
    buttonElem4.style.color = "black"
}

function updateGuess(num) {
    elemGuess.innerText = num
}

function checkDuplicates() {
    userGuess = [buttonElem1.innerText, buttonElem2.innerText, buttonElem3.innerText, buttonElem4.innerText]
    const uniqueValues = new Set(userGuess);
    const hasDuplicates = uniqueValues.size !== userGuess.length;

    if (hasDuplicates) {
        return true
    } else {
        return false
    }
}

function checkWin() {
    userGuess = [buttonElem1.innerText, buttonElem2.innerText, buttonElem3.innerText, buttonElem4.innerText]
    const userGuessInt = userGuess.map(num => parseInt(num));
    
    for (let i = 0; i < userGuess.length; i++) {
        if (userGuessInt[i] !== code[i]) {
            return false;
        }
    }
    
    return true;
}

function checkBullsCows() {
    userGuess = [buttonElem1.innerText, buttonElem2.innerText, buttonElem3.innerText, buttonElem4.innerText]
    let cowsCounter = 0, bullsCounter = 0
    const userGuessInt = userGuess.map(num => parseInt(num));

    for (i = 0; i < userGuess.length; i++) {
        if (userGuessInt[i] === code[i]) {
            bullsCounter += 1
        } else if (code.includes(userGuessInt[i])) {
            cowsCounter += 1
        }
    }
    return [bullsCounter, cowsCounter]
}

function submitGuess() {
    if (checkDuplicates()) {
        dupElem.innerText = "Duplicates"
    } else {
        dupElem.innerText = ""
        if (checkWin()) {
            endTime = new Date();
            const timeTook = (endTime - startTime) / 1000
            timeElem.innerText = `the time took you was: ${timeTook} seconds`
            gjElem.innerText = `good job ${userName}! you have cracked the code`
            theCodeElem.innerText = `the code was: ${code}`
            endPopupElem.style.display = "block"
        } else {
            const bullsAndCows = checkBullsCows()
            addingGuessElem.innerHTML += `<div class="row"><div class="left"><div class="code">${buttonElem1.innerText}</div><div class="code">${buttonElem2.innerText}</div><div class="code">${buttonElem3.innerText}</div><div class="code">${buttonElem4.innerText}</div></div><div class="rightGrid"><p class="bulls font">Bulls</p><p class="cows font">Cows</p><p class="font" id="bulls">${bullsAndCows[0]}</p><p class="font" id="cows">${bullsAndCows[1]}</p></div></div>`
        }
    }
}

function clearBoard() {
    makeButtonsWhite()
    endPopupElem.style.display = "none"
    addingGuessElem.innerHTML = ""
    chooseCode()
    code = [randomNumber1, randomNumber2, randomNumber3, randomNumber4]
    buttonElem1.innerText = "0"
    buttonElem2.innerText = "1"
    buttonElem3.innerText = "2"
    buttonElem4.innerText = "3"
    startTime = new Date()
}

function stopPlaying () {
    gjElem.innerText = "Thank you for playing!"
    timeElem.style.display = "none"
    anotherGameElem.style.display = "none"
    noElem.style.display = "none"
    yesElem.style.display = "none"
    theCode.style.display = "none"
}