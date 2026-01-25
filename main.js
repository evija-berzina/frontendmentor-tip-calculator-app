const billInput = document.querySelector('.bill-js');
const tipBtn = document.querySelectorAll('.tip-btn-js');
const tipInput = document.querySelector('.tip-input-js');
const numberOfPeople = document.querySelector('.number-of-people-js');
const tipResult = document.querySelector('.tip-amount-js');
const totalResult = document.querySelector('.total-js');
const resetBtn = document.querySelector('.reset-btn-js');
const billErrorMsg = document.querySelector('.bill-error-msg-js');
const tipErrorMsg = document.querySelector('.tip-error-msg-js');
const peopleErrorMsg = document.querySelector('.people-error-msg-js');

let bill = 0;
let tip = 0;
let peopleCount = 0;

billInput.addEventListener('input', () => {
  bill = Number(billInput.value);

  if (billInput.value === '') {
    billErrorMsg.hidden = true;
    bill = 0;
  } else if (bill <= 0) {
    billErrorMsg.textContent = 'Invalid value';
    billErrorMsg.hidden = false;
  } else {
    billErrorMsg.hidden  = true;
  }

  updateResults();
});

tipBtn.forEach(input => {
  input.addEventListener('click', () => {
    tip = Number(input.dataset.value);
    tipInput.value = '';
    updateResults();
  })
});

tipInput.addEventListener('input', () => {
  const tipValue = Number(tipInput.value);

  if (tipInput.value === '') {
    tipErrorMsg.hidden = true;
    tip = 0;
  } else if (!Number.isInteger(tipValue) || tipValue <= 0) {
    tipErrorMsg.textContent = 'Invalid value';
    tipErrorMsg.hidden = false;
  } else {
    tip = tipValue;
    tipErrorMsg.hidden = true;
  }

  updateResults();
});

numberOfPeople.addEventListener('input', () => {
  const people = Number(numberOfPeople.value);
    
  if (numberOfPeople.value === '') {
    peopleErrorMsg.hidden = true;
    peopleCount = 0;
  } else if (!Number.isInteger(people) || people <= 0) {
    peopleErrorMsg.textContent = 'Invalid value';
    peopleErrorMsg.hidden = false;
  } else {
    peopleCount = people;
    peopleErrorMsg.hidden = true;
  }

  updateResults();
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
    tipResult.textContent = '0.00';
    totalResult.textContent = '0.00';
  }
}

function renderTipCalculator() {
  bill = 0;
  tip = 0;
  peopleCount = 0;
  billInput.value = '';
  tipInput.value = '';
  numberOfPeople.value = '';
  tipResult.textContent = '0.00';
  totalResult.textContent = '0.00';
}

updateResults();