const results = [];
console.log(results);
async function fetchResults() {
  const resp = await fetch("data/results.json");
  const data = await resp.json();
  return data;
}

async function buildResultsList() {
  const originalObjects = await fetchResults();

  for (const orgobj of originalObjects) {
    const resultObj = constructResult(orgobj);
    if (resultObj) {
      results.push(resultObj);
    }
  }
}

function constructResult(resultdata) {
  try {
    const date = new Date(resultdata.date);
    if (isNaN(date)) {
      throw new Error("Invalid dateOfBirth format");
    }

    // Format the birthday to 'dd-mm-yyyy'
    const formattedDate = new Intl.DateTimeFormat(["ban", "id"], {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);

    const resultObject = {
      // Define the id property as read-only
      get id() {
        return resultdata.id;
      },
      date: formattedDate,
      memberID: resultdata.memberId,
      discipline: resultdata.discipline,
      type: resultdata.resultType,
      time: resultdata.time,
    };

    return resultObject;
  } catch (error) {
    console.error(`Error constructing member: ${error.message}`);
    return null; // Handle the error by returning null or an appropriate value
  }
}

export { buildResultsList, results };
