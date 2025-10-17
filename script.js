//your JS code here. If required.
const inputs = document.querySelectorAll('.code');

    inputs.forEach((input, index) => {
      input.addEventListener('keydown', (e) => {
        if (e.key === "Backspace") {
          if (input.value === "") {
            // Move focus to previous input if not first
            if (index > 0) inputs[index - 1].focus();
          } else {
            input.value = ""; // Clear current input
          }
        } else if (e.key >= "0" && e.key <= "9") {
          input.value = ""; // Clear current input so the new number replaces
        } else if (e.key !== "Tab") {
          e.preventDefault(); // Prevent typing letters/symbols
        }
      });

      input.addEventListener('input', () => {
        const value = input.value;
        if (value.length > 0 && index < inputs.length - 1) {
          inputs[index + 1].focus();
        }
      });

      input.addEventListener('paste', (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text').trim();
        const numbers = pasteData.replace(/\D/g, '').split('');
        numbers.forEach((num, i) => {
          if (index + i < inputs.length) {
            inputs[index + i].value = num;
          }
        });
        const nextIndex = index + numbers.length - 1;
        if (nextIndex < inputs.length) {
          inputs[nextIndex].focus();
        }
      });
    });

    // Optional: Focus first input on page load
    inputs[0].focus();