const selectElem = document.querySelector("#select")
const descriptionElem = document.querySelector("#description")
const valueElem = document.querySelector("#value")
const moneyElem = document.querySelector("#money")
const expensesElem = document.querySelector("#expensesDetail")
const incomeElem = document.querySelector("#incomeDetail")
const incomeTitleElem = document.querySelector("#incomeValueText")
const expensesTitleElem = document.querySelector("#expensesValueText")
const submitElem = document.querySelector("#submit")
const percentElem = document.querySelector("#percent")
let snackbarTimeout

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let income = JSON.parse(localStorage.getItem("income")) || [];

const displayData = () => {
    let totalMoney = Math.floor(moneyElem.innerText.replace(/[^\d.-]/g, ''))
    let totalIncome = 0
    let totalExpenses = 0
    if (income.length > 0) {
        income.forEach(incomeEl => {
            const formattedValue = (+incomeEl.value).toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2 
            })

            incomeElem.innerHTML += (
                `
                    <div class="line"> 
                        <p class="incomeTitle">${incomeEl.description}</p> 
                        <p class="incomeMuch">+ ${formattedValue}</p> 
                        <svg onclick="removeValue(this)" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x-circle-income" viewBox="0 0 16 16"> <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/> <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/> </svg> 
                    </div>
                `
            )
            totalMoney += (+incomeEl.value)
            totalIncome += (+incomeEl.value)
        })
    }

    const formattedNumber2 = (+totalIncome).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2 
    })
    incomeTitleElem.innerText = formattedNumber2

    if (expenses.length > 0) {
        expenses.forEach(expensesEl => {
            const formattedValue = (+expensesEl.value).toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2 
            })

            const income = parseFloat(incomeTitleElem.innerText.replace(/[^\d.-]/g, ''))
            const cacu = ((expensesEl.value / income) * 100).toFixed(0)

            expensesElem.innerHTML += (
                `
                <div class="line"> 
                    <p class="expensesTitle">${expensesEl.description}</p> 
                    <p class="expensesMuch">- ${formattedValue}</p> 
                    <p class="precent">
                    ${(() => {
                      return (cacu === Infinity || cacu === "Infinity") ? '0' : cacu;
                    })()}%
                  </p>   
                    <svg onclick="removeValue(this)" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x-circle-expenses" viewBox="0 0 16 16"> <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/> <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/> </svg> 
                </div>
                `
            )
            totalMoney -= (+expensesEl.value)
            totalExpenses -= (+expensesEl.value)
        })
    }

    const formattedNumber = (+totalMoney).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2 
    })
    const formattedNumber3 = (+totalExpenses).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2 
    })

    moneyElem.innerText = formattedNumber
    expensesTitleElem.innerText = formattedNumber3

    caculatePercent()
}

function validation() {
    if (descriptionElem.value.length === 0 || valueElem.valueAsNumber <= 0 || valueElem.value === '') {
        return false
    }
    return true
}

displayData();

function update() {
    if (validation()) {
            if (selectElem.value == "-") {
        let itemToAdd = {description: descriptionElem.value, value: valueElem.value}
        expenses.push(itemToAdd)
        localStorage.setItem("expenses", JSON.stringify(expenses))
        updateExpenses()
    } else if (selectElem.value == "+") {
        let itemToAdd = {description: descriptionElem.value, value: valueElem.value}
        income.push(itemToAdd)
        localStorage.setItem("income", JSON.stringify(income))
        updateIncome()
    }

    updatePercent()
    updateTotal()
    caculatePercent()
    clearInput()
    } else {
        showSnackbar()
    }

}

function removeValue(svgElement) {
    const line = svgElement.closest(".line")
    const lineType = line ? line.parentElement.closest("div") : null;
    const lineTypeId = lineType ? lineType.id : null;

    if (lineTypeId == "incomeDetail") {
        let income = JSON.parse(localStorage.getItem("income")) || [];
        const muchMoney = line.querySelector(".incomeMuch").textContent;
        let num = Math.floor(parseFloat(muchMoney.replace("+", "").replace(/,/g, "").trim()));        
        let index = 0
        for (let i = 0; i < income.length; i++) {
            if (parseInt(income[i].value) === num) {
                index = i;
                break;
            }
        }
        income.splice(index, 1)
        localStorage.setItem("income", JSON.stringify(income))
        let incomeMuch = line.querySelector(".incomeMuch")
        let number = parseFloat(incomeMuch.outerText.replace(/[^\d.-]/g, ''));
        const sum = parseFloat(incomeTitleElem.innerText.replace(/[^\d.-]/g, '')) - number
        const formattedNumber = sum.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2 } )
        incomeTitleElem.innerText = formattedNumber
        
        const sumMoney = parseFloat(moneyElem.innerText.replace(/[^\d.-]/g, '')) - number
        const formattedNumber2 = sumMoney.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2 } )
        moneyElem.innerText = formattedNumber2

    } else if (lineTypeId == "expensesDetail") {
        let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
        const muchMoney = line.querySelector(".expensesMuch").textContent;
        let num = Math.floor(parseFloat(muchMoney.replace("-", "").replace(/,/g, "").trim()));       
        let index = -1;
        for (let i = 0; i < expenses.length; i++) { 
            if (parseInt(expenses[i].value) === num) {
                index = i;
                break;
            }
        }
        if (index !== -1) {
            expenses.splice(index, 1);
        }
        localStorage.setItem("expenses", JSON.stringify(expenses))
        let expensesMuch = line.querySelector(".expensesMuch")
        let number = parseFloat(expensesMuch.outerText.replace(/[^\d.-]/g, ''));
        const sub = parseFloat(expensesTitleElem.innerText.replace(/[^\d.-]/g, '')) - number
        const formattedNumber = sub.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2 } )
        expensesTitleElem.innerText = formattedNumber

        const sumMoney = parseFloat(moneyElem.innerText.replace(/[^\d.-]/g, '')) - number
        const formattedNumber2 = sumMoney.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2 } )
        moneyElem.innerText = formattedNumber2
    }

    if (line) {
        line.remove();
    }

    updatePercent()
    updateTotal() 
    caculatePercent()
}

function caculatePercent() {
    const expenses = parseFloat(expensesTitleElem.innerText.replace(/[^\d.-]/g, ''))
    const income = parseFloat(incomeTitleElem.innerText.replace(/[^\d.-]/g, ''))
    let percent = (((expenses / income) * 100) * (-1)).toFixed(0)
    if (percent == "NaN" || percent == Infinity) {
        percent = 0
    }
    percentElem.innerText = percent + "%"
}

function updateColor() {
    if (selectElem.value == "+") {
        submitElem.style.color = "var(--blue)"
        descriptionElem.style.border = "1px solid var(--blue)"
        valueElem.style.border = "1px solid var(--blue)"
    } else if (selectElem.value == "-") {
        submitElem.style.color = "var(--red)"
        descriptionElem.style.border = "1px solid var(--red)"
        valueElem.style.border = "1px solid var(--red)"
    }
}

function caculatePercent2() {
    const income = parseFloat(incomeTitleElem.innerText.replace(/[^\d.-]/g, ''))
    const cacu = ((valueElem.value / income) * 100).toFixed(0)
    return cacu
}

function updateIncome() {
    const formattedValue = valueElem.valueAsNumber.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2 } )
    incomeElem.innerHTML += 
    `
    <div class="line"> 
        <p class="incomeTitle">${descriptionElem.value}</p> 
        <p class="incomeMuch">+ ${formattedValue}</p> 
        <svg onclick="removeValue(this)" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x-circle-income" viewBox="0 0 16 16"> <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/> <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/> </svg> 
    </div>
    `
    const sum = parseInt(incomeTitleElem.innerText.replace(/,/g, '')) + valueElem.valueAsNumber
    const formattedNumber = sum.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2 } )
    incomeTitleElem.innerText = formattedNumber
}

function updateExpenses() {
    const formattedValue = valueElem.valueAsNumber.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2 
    })
    expensesElem.innerHTML += 
    `
    <div class="line"> 
        <p class="expensesTitle">${descriptionElem.value}</p> 
        <p class="expensesMuch">- ${formattedValue}</p> 
        <p class="precent">
        ${(() => {
          const percent = caculatePercent2();
          return (percent === Infinity || percent === "Infinity") ? '0' : percent;
        })()}%
      </p>      
        <svg onclick="removeValue(this)" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x-circle-expenses" viewBox="0 0 16 16"> <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/> <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/> </svg> 
    </div>
    `
    const sub = parseInt(expensesTitleElem.innerText.replace(/,/g, '')) - valueElem.valueAsNumber
    const formattedNumber = sub.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2 } )
    expensesTitleElem.innerText = formattedNumber
}

function updateTotal() {
    const total = parseInt(incomeTitleElem.innerText.replace(/,/g, '')) + parseInt(expensesTitleElem.innerText.replace(/,/g, ''))
    const formattedNumber = total.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2 } )
    moneyElem.innerText = formattedNumber

}

document.getElementById('dark-mode-button').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    var updateDiv = document.getElementById('update');
    updateDiv.classList.toggle('dark-mode');
    snackbar.classList.toggle('dark-mode')
    submitElem.classList.toggle('dark-mode')
    selectElem.classList.toggle('dark-mode')
    descriptionElem.classList.toggle('dark-mode')
    valueElem.classList.toggle('dark-mode')
});

function showSnackbar() {
    let snackbarMessage = document.getElementById('snackbar');
    snackbarMessage.classList.remove('show');
    void snackbarMessage.offsetWidth; 
    snackbarMessage.classList.add('show');
    if (snackbarTimeout) {
        clearTimeout(snackbarTimeout);
    }
    snackbarTimeout = setTimeout(function() {
        snackbarMessage.classList.remove("show");
    }, 2400);
}

function updatePercent() {
    expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expensesElem.innerHTML = '<p class="expensesDetailText">EXPENSES</p>'
    expenses.forEach(expensesEl => {
        const formattedValue = (+expensesEl.value).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2 
        })

        const income = parseFloat(incomeTitleElem.innerText.replace(/[^\d.-]/g, ''))
        const cacu = ((expensesEl.value / income) * 100).toFixed(0)

        expensesElem.innerHTML += (
            `
            <div class="line"> 
                <p class="expensesTitle">${expensesEl.description}</p> 
                <p class="expensesMuch">- ${formattedValue}</p> 
                <p class="precent">
                ${(() => {
                  return (cacu === Infinity || cacu === "Infinity") ? '0' : cacu;
                })()}%
              </p>   
                <svg onclick="removeValue(this)" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x-circle-expenses" viewBox="0 0 16 16"> <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/> <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/> </svg> 
            </div>
            `
        )})
}

function clearInput() {
    descriptionElem.value = ''
    valueElem.value = ''
}