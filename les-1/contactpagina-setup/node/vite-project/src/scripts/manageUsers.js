getUserInfo()
async function getUserInfo(){
    const headers = new Headers();
    headers.append("Authorization", "Bearer " + sessionStorage.getItem("jwt"));
    await fetch('/api/User/getplayers', {
        method: 'GET',
        headers: headers
    })
        .then(response => {
            response.json().then(data => {
                data.forEach(function (user){
                    console.log(user)
                    let userForm = document.createElement("form");
                    let userItem = document.createElement("li")
                    let roleLabel = document.createElement("label");
                    let username = document.createElement("h3");
                    let roleInput = document.createElement("input");
                    let submitButton = document.createElement("button");
                    let deleteButton = document.createElement("button");
                    roleInput.className = "form__input";
                    roleLabel.for = roleInput;
                    username.innerText = user.username;
                    roleLabel.innerText = "Role";
                    roleInput.value = user.role;
                    submitButton.innerText = "Save changes";
                    submitButton.type = "submit";
                    deleteButton.innerText = "Delete";
                    submitButton.className = "form__button form__button--small";
                    deleteButton.className = "form__button form__button--small";
                    userForm.appendChild(username);
                    userForm.appendChild(roleLabel);
                    userForm.appendChild(roleInput);
                    userForm.appendChild(submitButton);
                    userItem.appendChild(userForm);
                    userItem.appendChild(deleteButton);

                    userForm.addEventListener("submit", async(event) =>{
                        const headers = new Headers();
                        headers.append("Content-Type", "application/json");
                        headers.append("Accept", "Application/json");
                        headers.append("Authorization", "Bearer " + sessionStorage.getItem("jwt"));
                        event.preventDefault();

                        await fetch('/api/User/editUserrole', {
                            method: 'POST',
                            headers: headers,
                            body: JSON.stringify({Userid: user.userid.toString(), Username: user.username.replace(/[^\w\s]/gi, '_').toString().trim(), Password: user.password, Role: roleInput.value, score: user.score, Email: user.email})
                        })
                            .then(response => {
                                if(response.ok){
                                    alert(user.username + " has been updated");
                                }
                                else {
                                    response.json().then(data => alert(data.detail));
                                }
                            });
                    });

                    deleteButton.addEventListener("click", async (event) =>{
                        const headers = new Headers();
                        headers.append("Authorization", "Bearer " + sessionStorage.getItem("jwt"));
                        headers.append("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
                        event.preventDefault();

                        await fetch('/api/User/' + user.userid.toString(), {
                            method: 'DELETE',
                            headers: headers
                        })
                            .then(response => {
                                alert(user.username + " has been deleted");
                            })
                    })

                    document.querySelector("ul").appendChild(userItem);
                })
            })
        })
}