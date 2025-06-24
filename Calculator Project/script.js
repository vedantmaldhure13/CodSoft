const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
let currentInput = "";

// Button Click Handling
buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent;
    handleInput(value);
    highlightButton(value);
  });
});

// Keyboard Input Handling
document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (/\d/.test(key) || ["+", "-", "*", "/"].includes(key)) {
    handleInput(key);
    highlightButton(key);
  } else if (key === "Enter") {
    handleInput("=");
    highlightButton("=");
  } else if (key === "Backspace") {
    currentInput = currentInput.slice(0, -1);
    display.value = currentInput;
  } else if (key.toLowerCase() === "c") {
    handleInput("C");
    highlightButton("C");
  }
});

// Function to handle both button and keyboard inputs
function handleInput(value) {
  if (value === "C") {
    currentInput = "";
    display.value = "";
  } else if (value === "=") {
    try {
      display.value = eval(currentInput);
      currentInput = display.value;
    } catch {
      display.value = "Error";
      currentInput = "";
    }
  } else {
    currentInput += value;
    display.value = currentInput;
  }
}

// Dark Mode Toggle
const toggle = document.getElementById("toggleDark");

toggle.addEventListener("change", () => {
  document.body.classList.toggle("dark");
});

// Highlight pressed button
function highlightButton(key) {
  const button = Array.from(buttons).find(btn => btn.textContent === key);
  if (button) {
    button.classList.add("active");
    setTimeout(() => {
      button.classList.remove("active");
    }, 150);
  }
}
