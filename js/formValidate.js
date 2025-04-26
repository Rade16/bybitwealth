// Конфиг с правилами и сообщениями
const VALIDATION_RULES = {
  required: {
    message: "invalid input",
    validate: (value) => value.trim() !== "",
  },
  email: {
    message: "Invalid e-mail address",
    validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  },
};

function validateInput(input) {
  const rules = input.dataset.validate.split(";");
  let errorMessage = "";

  for (const rule of rules) {
    const [ruleName, param] = rule.split(":");
    const { message, validate } = VALIDATION_RULES[ruleName];

    if (!validate(input.value.trim(), param)) {
      errorMessage = typeof message === "function" ? message(param) : message;
      break;
    }
  }

  return errorMessage;
}

document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();
  let formIsValid = true;

  document.querySelectorAll("[data-validate]").forEach((input) => {
    const error = validateInput(input);
    const errorElement = document.querySelector(
      `[data-error-for="${input.id}"]`
    );

    if (error) {
      formIsValid = false;
      input.classList.add("invalid");
      errorElement.textContent = error;
      errorElement.style.display = "block";
    } else {
      input.classList.remove("invalid");
      errorElement.style.display = "none";
    }
  });

  if (formIsValid) this.submit();
});

document.querySelectorAll("[data-validate]").forEach((input) => {
  input.addEventListener("input", function () {
    const errorElement = document.querySelector(
      `[data-error-for="${this.id}"]`
    );
    errorElement.style.display = "none";
    this.classList.remove("invalid");
  });
});
