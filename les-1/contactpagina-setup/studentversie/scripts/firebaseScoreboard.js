// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-analytics.js";
import {getDatabase, ref, get, set, child, onValue, remove} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyApHqqGBAlniWQwhUnekMZmkkIGWwALckk",
    authDomain: "aim-trainer-8df85.firebaseapp.com",
    databaseURL: "https://aim-trainer-8df85-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "aim-trainer-8df85",
    storageBucket: "aim-trainer-8df85.appspot.com",
    messagingSenderId: "327391990271",
    appId: "1:327391990271:web:c2d2256c39ce9ff90457ca",
    measurementId: "G-36EBZD87G2"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();
console.log(db);

let scoreboard = document.getElementById("usersAndScores");

function insertData(){
    set(ref(db, "Userscores/Pjotr"), {
        Username: "Pjotr",
        Score: 4
    })
}

function addPlayerToScoreboard(dbUsername, dbScore){
    let tableRow = document.createElement("tr");
    let username = document.createElement("td");
    let score = document.createElement("td");

    username.innerHTML = dbUsername;
    score.innerHTML = dbScore;

    tableRow.appendChild(username);
    tableRow.appendChild(score);
    scoreboard.appendChild(tableRow);

}

function addBestPlayers(players){
    scoreboard.innerHTML = "";
    players.forEach(player => {
        addPlayerToScoreboard(player.Username, player.Score)
    })
}

function getAllFireBaseScores(){
    const dbRef = ref(db, "Userscores");

    onValue(dbRef, (snapshot) => {
        let players = [];

        snapshot.forEach(childSnapshot => {
            players.push(childSnapshot.val())
        });
        addBestPlayers(players);
    })
}

window.onload = getAllFireBaseScores;

