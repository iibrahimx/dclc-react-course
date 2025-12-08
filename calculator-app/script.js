// Calculator state
let currentInput = '0';
let previousInput = '';
let operation = null;
let resetScreen = false;

// DOM Elements
const display = document.getElementById('display');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.getElementById('equals');
const deleteButton = document.getElementById('del');
const resetButton = document.getElementById('reset');
const themeButtons = document.querySelectorAll('.theme-btn');
const decimalButton = document.querySelector('[data-value="."]');

// Update display
function updateDisplay() {
  // Format number with commas
  let displayValue = currentInput;
  if (currentInput.includes('.')) {
    const parts = currentInput.split('.');
    displayValue = formatNumber(parts[0]) + '.' + parts[1];
  } else {
    displayValue = formatNumber(currentInput);
  }
  display.textContent = displayValue;
}

// Format number with commas
function formatNumber(number) {
  // Remove any existing commas
  const numStr = number.replace(/,/g, '');
  // Convert to number and format with commas
  return Number(numStr).toLocaleString('en-US');
}

// Handle number button clicks
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    const number = button.getAttribute('data-value');
    
    if (currentInput === '0' || resetScreen) {
      currentInput = number;
      resetScreen = false;
    } else {
      currentInput += number;
    }
    
    updateDisplay();
  });
});

// Handle operator button clicks
operatorButtons.forEach(button => {
  button.addEventListener('click', () => {
    const operator = button.getAttribute('data-operator');
    
    if (previousInput !== '' && !resetScreen) {
      calculate();
    }
    
    previousInput = currentInput;
    operation = operator;
    resetScreen = true;
  });
});

// Handle equals button
equalsButton.addEventListener('click', () => {
  if (previousInput !== '' && operation !== null) {
    calculate();
    operation = null;
    previousInput = '';
  }
});

// Handle decimal point
decimalButton.addEventListener('click', () => {
  if (resetScreen) {
    currentInput = '0.';
    resetScreen = false;
  } else if (!currentInput.includes('.')) {
    currentInput += '.';
  }
  updateDisplay();
});

// Handle delete button
deleteButton.addEventListener('click', () => {
  if (currentInput.length > 1) {
    currentInput = currentInput.slice(0, -1);
  } else {
    currentInput = '0';
  }
  updateDisplay();
});

// Handle reset button
resetButton.addEventListener('click', () => {
  currentInput = '0';
  previousInput = '';
  operation = null;
  updateDisplay();
});

// Perform calculation
function calculate() {
  let prev = parseFloat(previousInput.replace(/,/g, ''));
  let current = parseFloat(currentInput.replace(/,/g, ''));
  let result = 0;
  
  if (isNaN(prev) || isNaN(current)) return;
  
  switch (operation) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '*':
      result = prev * current;
      break;
    case '/':
      if (current === 0) {
        result = 'Error';
      } else {
        result = prev / current;
      }
      break;
    default:
      return;
  }
  
  // If result is a decimal, limit to 5 decimal places
  if (typeof result === 'number') {
    if (result.toString().includes('.')) {
      result = parseFloat(result.toFixed(5));
    }
    currentInput = result.toString();
  } else {
    currentInput = result;
  }
  
  resetScreen = true;
  updateDisplay();
}

// Theme Switching
themeButtons.forEach(button => {
  button.addEventListener('click', () => {
    const theme = button.getAttribute('data-theme');
    
    // Update active theme button
    themeButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    
    // Change theme
    document.body.className = `theme-${theme}`;
    
    // Save theme preference
    localStorage.setItem('calculator-theme', theme);
  });
});

// Load saved theme on page load
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('calculator-theme') || '1';
  
  // Set theme
  document.body.className = `theme-${savedTheme}`;
  
  // Set active theme button
  themeButtons.forEach(button => {
    if (button.getAttribute('data-theme') === savedTheme) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });
  
  // Initial display update
  updateDisplay();
});