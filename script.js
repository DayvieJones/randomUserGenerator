const fetchButton = document.querySelector("#fetchData");
const saveButton = document.querySelector("#saveData");
const patchButton = document.querySelector("#patchData");

const inputFirstNameElement = document.querySelector("#firstName");
const inputLastNameElement = document.querySelector("#lastName");
const inputAgeElement = document.querySelector("#age");
const inputAdressElement = document.querySelector("#address");
const inputStreetNumberElement = document.querySelector("#streetNumber");

fetchButton.addEventListener("click", fetchData);
saveButton.addEventListener("click", saveData);
patchButton.addEventListener("click", patchData);

const LOCAL_STORAGE_USERDATA = "userData";

// GET-Anfrage-Optionen
var getOptions = {
  method: "GET",
  redirect: "follow",
};

// PATCH-Anfrage-Optionen
var patchOptions = {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json", // Content-Type für PATCH-Anfragen
  },
  body: JSON.stringify({ userData: getData() }),
  redirect: "follow",
};

//Beispiel Daten zum updaten
function saveData() {
  const userData = getData();

  if (
    !inputFirstNameElement.value &&
    !inputLastNameElement.value &&
    !inputAgeElement.value &&
    !inputAdressElement.value &&
    !inputStreetNumberElement.value
  ) {
    alert("No input found! 404");
    return;
  }

  const user = {
    personals: {
      firstName: inputFirstNameElement.value,
      lastName: inputLastNameElement.value,
      age: inputAgeElement.value,
      birthday: {
        day: 1,
        month: 3,
        year: 1985,
      },
    },
    address: {
      street: inputAdressElement.value,
      number: inputStreetNumberElement.value,
      zipCode: 12345,
    },
    password: "devin",
    email: "leslie.diaz@example.com",
    phone: 6246916526,
    pictureURL: "https://randomuser.me/api/portraits/men/67.jpg",
  };

  console.log("User saved:", user);
  userData.push(user);
  updateUserData();
  clearInputs();
}

// Aktualisiere die Local Storage-Daten
function updateUserData() {
  const userData = getData();

  console.log("User data updated:", userData);

  localStorage.setItem(LOCAL_STORAGE_USERDATA, JSON.stringify(userData));
}

// Hole Daten vom Server
function fetchData() {
  const userData = getData();

  fetch("https://randomuser.me/api/", getOptions)
    .then((response) => response.json()) // Hier wird .json() verwendet, um die Daten als JSON zu parsen
    .then((serializedData) => {
      // Hier wird das deserialisierte Objekt (serializedData) in userDaten gespeichert
      userData.push(serializedData);

      // Hier wird userDaten serialisiert und im Local Storage gespeichert
      localStorage.setItem(LOCAL_STORAGE_USERDATA, JSON.stringify(userData));

      console.log(userData);
    })
    .catch((error) => console.log("error", error));
}

// Führe PATCH-Anfrage durch
function patchData() {
  fetch("https://randomuser.me/api/", patchOptions)
    .then((response) => response.json())
    .then((patchedData) => {
      console.log("Patched data:", patchedData);
    })
    .catch((error) => console.log("error", error));
}

// Hole Daten aus dem Local Storage
function getData() {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_USERDATA)) || [];
}

// Leere die Eingabefelder
function clearInputs() {
  inputFirstNameElement.value = "";
  inputLastNameElement.value = "";
  inputAgeElement.value = "";
  inputAdressElement.value = "";
  inputStreetNumberElement.value = "";
}
