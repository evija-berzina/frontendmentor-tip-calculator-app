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
    billInput.classList.remove('error-border-bill');
    billInput.classList.add('bill-input');
    bill = 0;
  } else if (bill <= 0) {
    billErrorMsg.textContent = 'Invalid value';
    billErrorMsg.hidden = false;
    billInput.classList.add('error-border-bill');
    billInput.classList.remove('bill-input');
  } else {
    billErrorMsg.hidden  = true;
    billInput.classList.remove('error-border-bill');
    billInput.classList.add('bill-input');
  }

  updateResults();
});

tipBtn.forEach(btn => {
  btn.addEventListener('click', () => {
    tip = Number(btn.dataset.value);
    tipBtn.forEach(b => {
      if(b === btn) {
        b.setAttribute('aria-checked', true);
      } else {
        b.setAttribute('aria-checked', false);
      }
    })
    tipInput.value = '';
    updateResults();
  })
});

tipInput.addEventListener('input', () => {
  const tipValue = Number(tipInput.value);
  tipBtn.forEach(btn => btn.setAttribute('aria-checked', false));

  if (tipInput.value === '') {
    tipErrorMsg.hidden = true;
    tip = 0;
    tipInput.classList.remove('error-border-tip');
    tipInput.classList.add('tip-input');
  } else if (!Number.isInteger(tipValue) || tipValue <= 0) {
    tipErrorMsg.textContent = 'Invalid value';
    tipErrorMsg.hidden = false;
    tipInput.classList.add('error-border-tip');
    tipInput.classList.remove('tip-input');
  } else {
    tip = tipValue;
    tipErrorMsg.hidden = true;
    tipInput.classList.remove('error-border-tip');
    tipInput.classList.add('tip-input');
  }

  updateResults();
});

numberOfPeople.addEventListener('input', () => {
  const people = Number(numberOfPeople.value);
    
  if (numberOfPeople.value === '') {
    peopleErrorMsg.hidden = true;
    peopleCount = 0;
    numberOfPeople.classList.remove('error-border-people');
    numberOfPeople.classList.add('number-of-people-input');
  } else if (!Number.isInteger(people) || people <= 0) {
    peopleErrorMsg.textContent = 'Invalid value';
    peopleErrorMsg.hidden = false;
    numberOfPeople.classList.add('error-border-people');
    numberOfPeople.classList.remove('number-of-people-input');
  } else {
    peopleCount = people;
    peopleErrorMsg.hidden = true;
    numberOfPeople.classList.remove('error-border-people');
    numberOfPeople.classList.add('number-of-people-input');
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
    resetBtn.disabled = false;
    const tipAmount = tipAmountCalculation();
    tipResult.textContent = tipAmount.toFixed(2);
    const total = totalCalculation(tipAmount);
    totalResult.textContent = total.toFixed(2);
  } else {
    tipResult.textContent = '0.00';
    totalResult.textContent = '0.00';
    resetBtn.disabled = true;
  }
}

function renderTipCalculator() {
  bill = 0;
  tip = 0;
  peopleCount = 0;
  billInput.value = '';
  tipBtn.forEach(btn => btn.setAttribute('aria-checked', false));
  tipInput.value = '';
  numberOfPeople.value = '';
  tipResult.textContent = '0.00';
  totalResult.textContent = '0.00';
  resetBtn.disabled = true;
}

updateResults();