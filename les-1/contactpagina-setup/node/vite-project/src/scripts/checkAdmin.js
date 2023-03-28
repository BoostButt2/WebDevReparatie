checkAdmin();
async function checkAdmin(){
    const headers = new Headers();
    headers.append("Authorization", "Bearer " + sessionStorage.getItem("jwt"));
    await fetch('/api/User/checkadmin', {
        method: 'GET',
        headers: headers
    })
        .then(response => {
            if(response.ok){
                let button = document.createElement("button");
                let link = document.createElement("a");
                button.innerText = "Manage users";
                link.href = "manageUsers.html";
                link.appendChild(button);
                document.querySelector(".menu").appendChild(link);
            }
        })

}