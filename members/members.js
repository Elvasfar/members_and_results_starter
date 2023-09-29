"use strict";

function displayMembers(members) {
  const table = document.querySelector("table#members tbody");
  table.innerHTML = "";
  for (const member of members) {
    // Calculate the age using the getAge function
    const age = getAge(member.birthday);
    const isJunior = isJuniorMember(age);
    let aktiv = "";
    if (member.active === true) {
      aktiv = "Aktiv";
    } else if (member.active === false) {
      aktiv = "Passiv";
    }

    const html = /*html*/ `
    <tr>
      <td>${member.name}</td>
      <td>${aktiv}</td>
      <td>${member.birthday}</td>
      <td>${age}</td>
      <td>${isJunior}</td> 
    </tr>`;

    table.insertAdjacentHTML("beforeend", html);
  }
}

function getAge(birthday) {
  // Define date format "dd/mm/yyyy"
  const dateFormat = /^(\d{2})\/(\d{2})\/(\d{4})$/;

  if (!dateFormat.test(birthday)) {
    // Handle invalid date format
    console.error(`Invalid date format: ${birthday}`);
    return null; // Or you can return an error code or throw an exception
  }

  // Split the date string into day, month, and year components
  const parts = birthday.split("/");
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
  const year = parseInt(parts[2], 10);

  const today = new Date();
  const birthDate = new Date(year, month, day);

  if (isNaN(birthDate.getTime())) {
    // Handle invalid date
    console.error(`Invalid date: ${birthday}`);
    return null; // Or you can return an error code or throw an exception
  }

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}

function isJuniorMember(age) {
  if (age < 18) {
    return "Junior";
  } else {
    return "Senior";
  }
  // Return true if age is less than 18, false otherwise
}

export { displayMembers };
