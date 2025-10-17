const inputs = document.querySelectorAll('.code');

inputs.forEach((input, index) => {
  input.addEventListener('keydown', (e) => {
    if (e.key === "Backspace") {
      if (input.value === "") {
        if (index > 0) inputs[index - 1].focus();
      } else {
        input.value = "";
      }
    } else if (e.key >= "0" && e.key <= "9") {
      input.value = "";
    } else if (e.key !== "Tab") {
      e.preventDefault();
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

// focus first input on load
inputs[0].focus();
