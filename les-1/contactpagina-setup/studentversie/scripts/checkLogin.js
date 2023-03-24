isLoggedIn();
async function isLoggedIn(){
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "Application/json");
    headers.append("Authorization", "Bearer " + sessionStorage.getItem("jwt"));
    await fetch('https://localhost:7133/api/User/checkloggedin', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({Userid: uuidv4(), Username: sessionStorage.getItem("username"), Password: "", Role: "player", score: this.points, Email: ""})
    })
        .then(response => {
            if(!response.ok){
                window.location.replace("loginOrRegistration.html");
                sessionStorage.clear();
            }
        })

    function uuidv4() {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }
}