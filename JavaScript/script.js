let screen = document.getElementById("screen");
let buttons = document.querySelectorAll(".calculator__keyboard-button");
let screenvalue = "0"; // Initialize screenvalue with "0"
let previousResult = null; // Variable to store the previous result

const themeSelects = document.querySelectorAll("[data-theme]");
const html = document.documentElement;

screen.value = screenvalue; // Set the initial value of the screen

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    let buttonText = button.innerText;
    let buttonKey = button.dataset.key; // Get the data-key attribute value

    if (buttonKey === "delete") {
      screenvalue = screenvalue.slice(0, -1);
      if (screenvalue === "") {
        screenvalue = "0"; // If screenvalue becomes empty after deleting, reset it to "0"
      }
    } else if (buttonKey === "multiplication") {
      screenvalue += "*";
    } else if (buttonKey === "division") {
      screenvalue += "/";
    } else if (buttonText === "=") {
      try {
        if (previousResult !== null) {
          screenvalue = eval(previousResult + screenvalue);
        } else {
          screenvalue = eval(screenvalue);
        }
        previousResult = screenvalue;
      } catch (error) {
        screenvalue = "Error";
      }
    } else if (buttonKey === "reset") {
      screenvalue = "0"; // Reset screenvalue to "0" when reset button is clicked
      previousResult = null; // Reset previous result
    } else if (["+", "-", "*", "/"].includes(buttonText)) {
      if (previousResult !== null) {
        screenvalue = previousResult + buttonText;
        previousResult = null; // Clear previous result if operator is clicked after a result
      } else {
        screenvalue += buttonText; // Concatenate the operator
      }
    } else {
      // Handle numbers
      if (previousResult !== null) {
        screenvalue = buttonText; // Start new calculation if user is entering a number after a result
        previousResult = null; // Reset previous result
      } else if (screenvalue === "0" || typeof screenvalue === "number") {
        screenvalue = buttonText; // Replace "0" or previous result with new input
      } else {
        screenvalue += buttonText; // Otherwise, concatenate the new input
      }
    }

    screen.value = screenvalue;
  });
});

// Handle theme switch
themeSelects.forEach((select) => {
  select.addEventListener("change", () => {
    const selectedTheme = select.value;
    html.setAttribute("data-theme", selectedTheme);
    localStorage.setItem("selected-theme", selectedTheme);
    updateThemeDisplay(selectedTheme); // Call a function to update the theme display
  });
});

