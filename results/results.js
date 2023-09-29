"use strict";

import { findMemberById } from "../members/createMembersList.js";

// Function to display and sort results
function displayAndSortResults(results) {
  // Convert and sort the results based on time
  const sortedResults = results.slice().sort((a, b) => {
    const timeA = timeStringToMilliseconds(a.time);
    const timeB = timeStringToMilliseconds(b.time);
    return timeA - timeB; // Sort in ascending order, change to b - a for descending order
  });

  const table = document.querySelector("table#results tbody");
  table.innerHTML = "";

  for (const result of sortedResults) {
    let disciplin = "";
    let type = "";

    if (result.discipline === "breaststroke") {
      disciplin = "brystsvømning";
    } else if (result.discipline === "backstroke") {
      disciplin = "rygsvømning";
    } else if (result.discipline === "freestyle") {
      disciplin = "freestyle";
    } else if (result.discipline === "butterfly") {
      disciplin = "butterfly";
    }

    if (result.type === "competition") {
      type = "konkurrence";
    } else if (result.type === "training") {
      type = "træning";
    }

    const member = findMemberById(result.memberID);
    const memberName = member ? member.name : "Unknown"; // Handle the case when a member is not found

    const html = /*html*/ `
    <tr>
      <td>${result.date}</td>
      <td>${memberName}</td>
      <td>${disciplin}</td>
      <td>${type}</td>
      <td>${result.time}</td> 
    </tr>`;

    table.insertAdjacentHTML("beforeend", html);
  }
}

function timeStringToMilliseconds(timeString) {
  // Split the time string into components
  const [minutesPart, secondsPart] = timeString.split(":");
  const [seconds, milliseconds] = secondsPart.split(".");

  // Convert components to numbers
  const minutes = parseInt(minutesPart, 10);
  const totalMilliseconds = minutes * 60 * 1000 + parseInt(seconds, 10) * 1000 + parseInt(milliseconds, 10);

  return totalMilliseconds;
}

export { displayAndSortResults };
