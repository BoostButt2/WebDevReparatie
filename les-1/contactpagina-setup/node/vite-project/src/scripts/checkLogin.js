isLoggedIn();
async function isLoggedIn(){
    const headers = new Headers();
    headers.append("Authorization", "Bearer " + sessionStorage.getItem("jwt"));
    await fetch('/api/User/checkloggedin', {
        method: 'GET',
        headers: headers
    })
        .then(response => {
            if(!response.ok){
                window.location.replace("loginOrRegistration.html");
                sessionStorage.clear();
            }
        })
}