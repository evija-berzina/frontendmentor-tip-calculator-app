const billInput = document.querySelector('.bill-js');
const tipInput = document.querySelectorAll('.tip-input-js');
const numberOfPeople = document.querySelector('.number-of-people-js');
const tipResult = document.querySelector('.tip-amount-js');
let bills = 0;
let tips = 0;
let peoples = 0;



billInput.addEventListener('input', () => {
  const bill = Number(billInput.value);
  if (bill > 0) {
    bills = bill;
    console.log(bills)
    updateTipAmount ();
  }
})

tipInput.forEach(input => {
  input.addEventListener('click', () => {
    const tip = Number(input.dataset.value);
      tips = tip;
      console.log(tips)
      updateTipAmount ();
  })
})

numberOfPeople.addEventListener('input', () => {
  const people = Number(numberOfPeople.value);
  if (people > 0) {
    peoples = people;
    console.log(peoples)
    updateTipAmount ();
  }
})

function calculations () {
  const calculatedValue = (bills/100)*tips / peoples;
  const tipAmount = Math.floor(calculatedValue*100)/100;
   
  //const total = (bill / people) + tipAmount;
  tipResult.textContent = tipAmount;
  return tipAmount;
}

function updateTipAmount () {
  if (bills > 0 && tips > 0 && peoples > 0) {
    const tipAmount = calculations();
    console.log(tipAmount);
  }
}

updateTipAmount ();









  // 
 
  // tipInput.forEach(inp => {
  //   inp.addEventListener('input',() => {
  //     Number(tipInput.value);
  //     console.log(tipInput.value)
  //   })
  // })

  // console.log(tip);
  
  // console.log(people);
  //   
  //   console.log(tipAmount);
  // console.log(total);