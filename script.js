import { initTabs } from "./tabs.js";
import { buildMembersList, members } from "./members/createMembersList.js";
import { displayMembers } from "./members/members.js";
import { buildResultsList, results } from "./results/createResultsList.js";
import { displayAndSortResults } from "./results/results.js";

window.addEventListener("load", initApp);

async function initApp() {
  initTabs();
  await buildMembersList();
  displayMembers(members);
  await buildResultsList();
  displayAndSortResults(results);
}
// TODO: Make the rest of the program ...
