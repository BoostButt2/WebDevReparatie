const form = document.querySelector("form");
const name = document.getElementById("name")
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const message = document.getElementById("message");
const emailError = document.querySelector("#email + span.error");
const subjectError = document.querySelector("#subject + span.error");
const messageError = document.querySelector("#message + span.error");

email.addEventListener("input", (event) => {
    if (email.validity.valid) {
        emailError.textContent = ""; // Reset the content of the message
        emailError.className = "error"; // Reset the visual state of the message
    } else {
        showEmailError();
    }
});

subject.addEventListener("input", (event) =>{
    if(subject.validity.valid){
        subjectError.textContent = "";
        subjectError.className = "error";
    }
    else {
        showSubjectError();
    }
})

message.addEventListener("input", (event) =>{
    if(message.validity.valid){
        messageError.textContent = "";
        messageError.className = "error";
    }
    else {
        showMessageError();
    }
})

function showSubjectError() {
    if (subject.validity.valueMissing) {
        subjectError.textContent = "You need to enter a subject";
    }
    else if (subject.validity.tooLong) {
        subjectError.textContent = "Subject must be equal or shorter than " + subject.maxLength + " characters. You entered " + subject.value.length;
    }
    subjectError.className = "error active";
}
function showMessageError() {
    if (message.validity.valueMissing) {
        messageError.textContent = "You need to leave a message.";
    }
    else if (message.validity.tooLong) {
        messageError.textContent = "Message must be equal or shorter than " + message.maxLength + " characters. You entered " + message.value.length;
    }
    messageError.className = "error active";
}
function showEmailError() {
    if (email.validity.valueMissing) {
        emailError.textContent = "You need to enter an e-mail address.";
    } else if (email.validity.typeMismatch) {
        emailError.textContent = "Entered value needs to be an e-mail address.";
    } else if (email.validity.tooShort) {

        emailError.textContent = `E-mail should be at least ${email.minLength} characters; you entered ${email.value.length}.`;
    }

    emailError.className = "error active";
}

form.addEventListener("submit", async(event) =>{
    event.preventDefault();
    let p = JSON.stringify({name: name.value, email: email.value, subject: subject.value, message: message.value})

    let response = await fetch('https://localhost:7180/api/Message/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
                    "Accept": "Application/json"},
            body: JSON.stringify({name: name.value, email: email.value, subject: subject.value, message: message.value})
    });

    alert("Mail is verstuurd!");
/*    let data = await response.json();
    alert(JSON.stringify(data))*/
})


var captcha;
function generate() {

    // Clear old input
    document.getElementById("submit").value = "";

    // Access the element to store
    // the generated captcha
    captcha = document.getElementById("image");
    var uniquechar = "";

    const randomchar =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    // Generate captcha for length of
    // 5 with random character
    for (let i = 1; i < 5; i++) {
        uniquechar += randomchar.charAt(
            Math.random() * randomchar.length)
    }

    // Store generated input
    captcha.innerHTML = uniquechar;
}

function printmsg() {
    const usr_input = document
        .getElementById("submit").value;

    // Check whether the input is equal
    // to generated captcha or not
    if (usr_input == captcha.innerHTML) {
        document.querySelector(".captcha").style.display = "none";
        document.querySelector(".page").style.display = "flex";
    }
    else {
        var s = document.getElementById("key")
            .innerHTML = "not Matched";
        generate();
    }
}
