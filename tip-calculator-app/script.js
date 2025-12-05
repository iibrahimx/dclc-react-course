// Get DOM Elements
const billInput = document.getElementById('bill');
const customTipInput = document.getElementById('custom-tip');
const peopleInput = document.getElementById('people');
const tipButtons = document.querySelectorAll('.tip-btn');
const tipAmountDisplay = document.getElementById('tip-amount');
const totalAmountDisplay = document.getElementById('total-amount');
const resetButton = document.getElementById('reset-btn');
const errorMessage = document.getElementById('error-message');
const peopleInputWrapper = document.querySelector('#people').parentElement;

// Variables to store values
let billAmount = 0;
let tipPercentage = 0;
let numberOfPeople = 0;

// Add event listeners to tip buttons
tipButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    tipButtons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    button.classList.add('active');
    
    // Clear custom tip input
    customTipInput.value = '';
    
    // Set tip percentage
    tipPercentage = parseFloat(button.getAttribute('data-tip')) / 100;
    
    // Calculate and update
    calculate();
  });
});

// Add event listener to custom tip input
customTipInput.addEventListener('input', () => {
  // Remove active class from all buttons
  tipButtons.forEach(btn => btn.classList.remove('active'));
  
  // Get custom tip value
  const customValue = parseFloat(customTipInput.value);
  
  if (!isNaN(customValue) && customValue >= 0) {
    tipPercentage = customValue / 100;
  } else {
    tipPercentage = 0;
  }
  
  // Calculate and update
  calculate();
});

// Add event listener to bill input
billInput.addEventListener('input', () => {
  billAmount = parseFloat(billInput.value) || 0;
  calculate();
});

// Add event listener to people input
peopleInput.addEventListener('input', () => {
  numberOfPeople = parseInt(peopleInput.value) || 0;
  
  // Show/hide error message
  if (numberOfPeople === 0) {
    errorMessage.classList.add('show');
    peopleInputWrapper.classList.add('error');
  } else {
    errorMessage.classList.remove('show');
    peopleInputWrapper.classList.remove('error');
  }
  
  calculate();
});

// Add event listener to reset button
resetButton.addEventListener('click', resetCalculator);

// Calculate function
function calculate() {
  // Check if we have valid inputs
  if (billAmount <= 0 || tipPercentage < 0 || numberOfPeople <= 0) {
    tipAmountDisplay.textContent = '$0.00';
    totalAmountDisplay.textContent = '$0.00';
    resetButton.disabled = true;
    return;
  }
  
  // Calculate tip per person
  const totalTip = billAmount * tipPercentage;
  const tipPerPerson = totalTip / numberOfPeople;
  
  // Calculate total per person
  const totalPerPerson = (billAmount + totalTip) / numberOfPeople;
  
  // Update displays
  tipAmountDisplay.textContent = `$${tipPerPerson.toFixed(2)}`;
  totalAmountDisplay.textContent = `$${totalPerPerson.toFixed(2)}`;
  
  // Enable reset button
  resetButton.disabled = false;
}

// Reset function
function resetCalculator() {
  // Reset inputs
  billInput.value = '';
  customTipInput.value = '';
  peopleInput.value = '';
  
  // Remove active class from tip buttons
  tipButtons.forEach(btn => btn.classList.remove('active'));
  
  // Reset variables
  billAmount = 0;
  tipPercentage = 0;
  numberOfPeople = 0;
  
  // Reset displays
  tipAmountDisplay.textContent = '$0.00';
  totalAmountDisplay.textContent = '$0.00';
  
  // Hide error message
  errorMessage.classList.remove('show');
  peopleInputWrapper.classList.remove('error');
  
  // Disable reset button
  resetButton.disabled = true;
}

// Initialize the calculator
resetCalculator();