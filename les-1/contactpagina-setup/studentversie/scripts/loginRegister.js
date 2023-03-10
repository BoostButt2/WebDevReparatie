const formLogin = document.getElementById("login");
const formRegister = document.getElementById("CreateAccount");
const username = document.getElementById("registerUsername");
const password = document.getElementById("registerPassword");
const confirmPassword = document.getElementById("confirmPassword");
const email = document.getElementById("registerEmail");
const linkLogin = document.getElementById("linkLogin");
const linkCreateAccount = document.getElementById("linkRegister");
const emailError = document.querySelector("#registerEmail + span.error");
const passwordError = document.querySelector("#registerPassword + span.error");
const confirmPasswordError = document.querySelector("#confirmPassword + span.error");
const usernameError = document.querySelector("#registerUsername + span.error")

email.addEventListener("input", (event) => {
    if (email.validity.valid) {
        emailError.textContent = ""; // Reset the content of the message
        emailError.className = "error"; // Reset the visual state of the message
        email.className = "form__input";
    } else {
        email.className = "form__input form__input--error";
        showEmailError();
    }
});

username.addEventListener("input", (event) => {
    if (username.validity.valid) {
        usernameError.textContent = ""; // Reset the content of the message
        usernameError.className = "error"; // Reset the visual state of the message
        username.className = "form__input";
    } else {
        username.className = "form__input form__input--error";
        showUsernameError();
    }
});

password.addEventListener("input", (event) => {
    if (password.validity.valid) {
        passwordError.textContent = ""; // Reset the content of the message
        passwordError.className = "error"; // Reset the visual state of the message
        password.className = "form__input";
    } else {
        password.className = "form__input form__input--error";
        showPasswordError();
    }
    addConfirmPasswordError();
});

linkLogin.addEventListener("click", (event) =>{
    formLogin.className = "form";
    formRegister.className = "form form--hidden";
})

linkCreateAccount.addEventListener("click", (event) =>{
    formLogin.className = "form form--hidden";
    formRegister.className = "form";
})

confirmPassword.addEventListener("input", (event) => {
    addConfirmPasswordError();
});

function addConfirmPasswordError(){
    if (password.value == confirmPassword.value) {
        confirmPasswordError.textContent = ""; // Reset the content of the message
        confirmPasswordError.className = "error"; // Reset the visual state of the message
        confirmPassword.className = "form__input";
    } else {
        confirmPassword.className = "form__input form__input--error";
        showConfirmPasswordError();
    }
}
function showUsernameError() {
    usernameError.textContent = `Username should be at least ${username.minLength} characters, you entered ${username.value.length}.`;
}
function showEmailError() {
    if (email.validity.valueMissing) {
        emailError.textContent = "You need to enter an e-mail address.";
    } else if (email.validity.typeMismatch) {
        emailError.textContent = "Entered value needs to be an e-mail address.";
    } else if (email.validity.tooShort) {

        emailError.textContent = `E-mail should be at least ${email.minLength} characters, you entered ${email.value.length}.`;
    }
    emailError.className = "error active";
}

function showPasswordError() {
    if (password.validity.valueMissing) {
        passwordError.textContent = "You need to enter a password address.";
    } else if (password.validity.tooShort) {
        passwordError.textContent = `Password should be at least ${password.minLength} characters, you entered ${password.value.length}.`;
    }
    passwordError.className = "error active";
}

function showConfirmPasswordError() {
    confirmPasswordError.textContent = `Passwords don't match`;
}






