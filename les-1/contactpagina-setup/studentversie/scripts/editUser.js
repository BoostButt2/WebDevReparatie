const formRegister = document.getElementById("CreateAccount");
const username = document.getElementById("registerUsername");
const password = document.getElementById("registerPassword");
const confirmPassword = document.getElementById("confirmPassword");
const saveButton = document.querySelector("button");
const passwordError = document.querySelector("#registerPassword + span.error");
const confirmPasswordError = document.querySelector("#confirmPassword + span.error");
const usernameError = document.querySelector("#registerUsername + span.error");

username.addEventListener("input", (event) => {
    if (username.validity.valid) {
        usernameError.textContent = ""; // Reset the content of the message
        usernameError.className = "error"; // Reset the visual state of the message
        username.className = "form__input";
    } else {
        username.className = "form__input form__input--error";
        showUsernameError();
    }
    username.value = username.value.replace(/[^\w\s]/gi, '_').trim();
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

confirmPassword.addEventListener("input", (event) => {
    addConfirmPasswordError();
});

formRegister.addEventListener("submit", async(event) =>{
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "Application/json");
    headers.append("Authorization", "Bearer " + sessionStorage.getItem("jwt"));

    event.preventDefault();
    let userId = uuidv4();
    let hashedPassword = password.value.hashCode().toString();

    await fetch('https://localhost:7133/api/User/edit', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({Userid: userId.toString(), Username: username.value.replace(/[^\w\s]/gi, '_').toString().trim(), Password: hashedPassword, Role: "player", score: 0, Email: ""})
    })
        .then(response => {
            if(response.ok){
                alert("Account has been updated");
            }
            else {
                response.json().then(data => alert(data.detail));
            }
        });
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

function showPasswordError() {
    if (password.validity.valueMissing) {
        passwordError.textContent = "You need to enter a password.";
    } else if (password.validity.tooShort) {
        passwordError.textContent = `Password should be at least ${password.minLength} characters, you entered ${password.value.length}.`;
    } else if(password.validity.patternMismatch){
        passwordError.textContent = "Password must contain atleast one uppercase, one lowercase and a number ";
    }
    passwordError.className = "error active";
}
function showConfirmPasswordError() {
    confirmPasswordError.textContent = `Passwords don't match`;
}

String.prototype.hashCode = function() {
    var hash = 0,
        i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}