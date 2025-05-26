const display = document.getElementById('display');
let currentInput = '';
let resultDisplayed = false;

// Update display
function updateDisplay(value) {
  if (resultDisplayed) {
    currentInput = '';
    resultDisplayed = false;
  }
  currentInput += value;
  display.textContent = currentInput;
}

// Evaluate expression
function calculateResult() {
  try {
    const result = eval(currentInput);
    display.textContent = result;
    currentInput = result.toString();
    resultDisplayed = true;
  } catch (e) {
    display.textContent = 'Error';
    currentInput = '';
    resultDisplayed = true;
  }
}

// Clear display
function clearDisplay() {
  currentInput = '';
  display.textContent = '0';
}

// Button click
document.querySelectorAll('.btn').forEach(button => {
  const val = button.dataset.value;
  const action = button.dataset.action;

  button.addEventListener('click', () => {
    if (action === 'clear') {
      clearDisplay();
    } else if (action === 'equals') {
      calculateResult();
    } else {
      updateDisplay(val);
    }
  });
});

// Keyboard support
document.addEventListener('keydown', (e) => {
  if (e.key.match(/[0-9+\-*/.]/)) {
    updateDisplay(e.key);
  } else if (e.key === 'Enter') {
    calculateResult();
  } else if (e.key === 'Backspace') {
    currentInput = currentInput.slice(0, -1);
    display.textContent = currentInput || '0';
  } else if (e.key.toLowerCase() === 'c') {
    clearDisplay();
  }
});
