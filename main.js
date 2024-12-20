// import { data } from "autoprefixer";
// import "./style.css";

// let contacts = [];
// // let contactsFromStorage =  localStorage.getItem("contacts");

// let contactsAmounts = () => {
//   contactsFromStorage;
//   if (contactsFromStorage.length == 0) {
//     document.getElementById("contacts_amount").textContent = "No Contacts";
//   } else {
//     document.getElementById("amount").textContent = contactsFromStorage.length;
//   }
// };

// function showContact(contact) {
//   for (let i = 0; i < localStorage.length; i++) {
//     localStorage.getItem();
//     const firstName = document.createElement("p");
//     const lastName = document.createElement("p");
//     const number = document.createElement("p");
//     firstName.innerText = `${contact.firstName}`;
//     lastName.innerText = `${contact.lastName}`;
//     number.innerText = `${contact.number}`;
//     document.getElementById("contact_firstName").appendChild(firstName);
//     document.getElementById("contact_lastName").appendChild(lastName);
//     document.getElementById("contact_number").appendChild(number);
//   }
// }

// function render() {
//   showContact();
//   contactsAmounts(contactsFromStorage);
//   contactsFromStorage.forEach(showContact);
//   console.log(contactsFromStorage);
// }
// render();
// console.log(contactsFromStorage.length);

import { data } from "autoprefixer";
import "./style.css";

let contacts = [];

async function fetchContacts() {
  try {
    const response = await fetch("http://localhost:3000/contacts");
    if (!response.ok) {
      throw new Error("HTTP-Error: " + response.status);
    }
    contacts = await response.json();
  } catch (error) {
    console.log(error.message);
  }
}

function contactsAmounts() {
  const contactAmountElement = document.getElementById("contacts_amount");
  if (contacts.length === 0) {
    contactAmountElement.textContent = "No Contacts";
  } else {
    contactAmountElement.textContent = contacts.length;
  }
}

function showContact(contact) {
  const contactDiv = document.getElementById("contact");
  contactDiv.className = "flex justify-between gap-28";
  contactDiv.innerHTML = `
  <p>${contact.firstName}</p>
  <p>${contact.lastName}</p>
  <p>${contact.number}</p>
  <button id="remove" type="submit" onclick="removeContact(this)">
  <img class="w-5 h-5" src="./bin.svg" alt="bin">
  </button>`;
}

async function removeContact(){
  let btn = await document.getElementById("remove")
  btn.addEventListener("click", (e) => {
    e.target.remove()
  })
}
removeContact()

async function postContact(data) {
  const res = await fetch("http://localhost:3000/contacts", {
    method: "post",
    body: JSON.stringify(data),
  });
  return res;
}

function createContact() {
  let addContact = document.getElementById("createContact");
  addContact.addEventListener("click", async (e) => {
    let firstName = prompt("Enter first name");
    let lastName = prompt("Enter last name");
    let number = +prompt("Enter number");

    const res = await postContact({
      firstName: firstName,
      lastName: lastName,
      number: number,
    });
  });
}

async function render() {
  await fetchContacts();
  contactsAmounts();

  document.getElementById("contact_firstName").innerHTML = "";
  document.getElementById("contact_lastName").innerHTML = "";
  document.getElementById("contact_number").innerHTML = "";
  createContact();
  contacts.forEach((contact) => showContact(contact));
}

render();

// function search(e) {
//   let query = document.getElementById("search");
//   let matchingContact = contacts.filter((contact) => {
//     let firstName = contact.firstName.tolowercase();
//     let lastName = contact.lastName.tolowercase();
//     let number = contact.number;

//     return (
//       firstName.includes(query) ||
//       lastName.includes(query) ||
//       number.includes(query)
//     );
//   });
//   matchingContact();
// }
// search();

// function filterItems(e) {
//   const items = itemList.querySelectorAll('li');
//   const text = e.target.value.toLowerCase();

//   items.forEach((item) => {
//       const itemName = item.firstChild.textContent.toLowerCase();
//       if (itemName.indexOf(text) !== -1) {
//           item.style.display = 'flex';
//       } else {
//           item.style.display = 'none';
//       }
//   });
// }
// itemFilter.addEventListener('input', filterItems);
