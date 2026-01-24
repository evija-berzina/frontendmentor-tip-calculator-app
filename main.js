const billInput = document.querySelector('.bill-js');
const tipBtn = document.querySelectorAll('.tip-btn-js');
const tipInput = document.querySelector('.tip-input-js');
const numberOfPeople = document.querySelector('.number-of-people-js');
const tipResult = document.querySelector('.tip-amount-js');
const totalResult = document.querySelector('.total-js');
const resetBtn = document.querySelector('.reset-btn-js');

let bill = 0;
let tip = 0;
let peopleCount = 0;

billInput.addEventListener('input', () => {
  bill = Number(billInput.value) || 0;
  updateResults();
});

tipBtn.forEach(input => {
  input.addEventListener('click', () => {
    tip = Number(input.dataset.value);
    updateResults();
  })
});

tipInput.addEventListener('input', () => {
  const tipValue = Number(tipInput.value);
  if (Number.isInteger(tipValue) && tipValue > 0) {
    tip = tipValue;
    updateResults();
  } else {
    renderResults();
  }
});

numberOfPeople.addEventListener('input', () => {
  const people = Number(numberOfPeople.value);
  if (Number.isInteger(people) && people > 0) {
    peopleCount = people;
    updateResults();
  } else {
    renderResults();
  }
});

resetBtn.addEventListener('click', () => {
  renderTipCalculator();
});

function tipAmountCalculation() {
  if (peopleCount === 0) return 0; //ar 0 dalīt nevar
  const calculatedValue = (bill/100)*tip / peopleCount;
  return Math.floor(calculatedValue*100)/100;
}

function totalCalculation(tipAmount) {
  if (peopleCount === 0) return 0;
  const calculatedValue = (bill/peopleCount) + tipAmount;
  return Math.floor(calculatedValue*100)/100;
}

function updateResults() {
  if (bill > 0 && tip > 0 && peopleCount > 0) {
    const tipAmount = tipAmountCalculation();
    tipResult.textContent = tipAmount.toFixed(2);
    const total = totalCalculation(tipAmount);
    totalResult.textContent = total.toFixed(2);
  } else {
    renderResults();
  }
}

function renderResults () {
  tipResult.textContent = '0.00';
  totalResult.textContent = '0.00';
}

function renderTipCalculator() {
  bill = 0;
  tip = 0;
  peopleCount = 0;
  billInput.value = '';
  tipInput.value = '';
  numberOfPeople.value = '';
  renderResults();
}

updateResults();