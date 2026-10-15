
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-database.js";


const firebaseConfig = {
    databaseURL: "https://lead-tracker-app-6c84f-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)

//Create a const called 'referenceInDB' and use the ref function to create a reference called 'leads' in the database
const referenceInDB = ref(database, "leads");

const inputEl = document.querySelector("#input-el")
const inputBtn = document.querySelector('#input-btn');
const ulEl = document.querySelector("#ul-el");

const deleteBtn = document.querySelector("#delete-btn");


//on double click, clear the local storage and DOM li
deleteBtn.addEventListener("dblclick", function () {
    remove(referenceInDB);
    ulEl.innerHTML = '';

})

onValue(referenceInDB, function (snapshot) {
    const snapshotDoesExist = snapshot.exists();

    if (snapshotDoesExist) {
        const snapshotValues = snapshot.val()
        const leads = Object.values(snapshotValues)
        render(leads);
    }
})

inputBtn.addEventListener("click", () => {
    push(referenceInDB, inputEl.value)
    inputEl.value = "";
})

function render(leads) {
    let listItem = "";
    for (let i = 0; i < leads.length; i++) {
        listItem += `<li><a href=${leads[i]} target="_blank"> ${leads[i]}</a></li>`
    }
    
    ulEl.innerHTML = listItem
}

// undefined -> how JavaScript signalizes emptiness
// null -> how you as a developer signalize emptiness



