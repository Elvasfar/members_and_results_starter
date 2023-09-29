const members = [];
console.log(members);
async function fetchMembers() {
  const resp = await fetch("data/members.json");
  const data = await resp.json();
  return data;
}

async function buildMembersList() {
  const originalObjects = await fetchMembers();

  for (const orgobj of originalObjects) {
    const memberObj = constructMember(orgobj);
    if (memberObj && memberObj.birthday) {
      members.push(memberObj);
    }
  }
}

function constructMember(memberdata) {
  try {
    const birthdayDate = new Date(memberdata.dateOfBirth);
    if (isNaN(birthdayDate)) {
      throw new Error("Invalid dateOfBirth format");
    }

    // Format the birthday to 'dd-mm-yyyy'
    const formattedBirthday = new Intl.DateTimeFormat(["ban", "id"], {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(birthdayDate);

    const MemberObject = {
      // Define the id property as read-only
      get id() {
        return memberdata.id;
      },
      name: memberdata.firstName + " " + memberdata.lastName,
      active: memberdata.isActiveMember,
      competitive: memberdata.isCompetitive,
      birthday: formattedBirthday,
      email: memberdata.email,
      gender: memberdata.gender,
      image: memberdata.image,
      hasPayed: memberdata.hasPayed,
    };

    return MemberObject;
  } catch (error) {
    console.error(`Error constructing member: ${error.message}`);
    return null; // Handle the error by returning null or an appropriate value
  }
}

function findMemberById(memberID) {
  return members.find((member) => member.id === memberID);
}

export { buildMembersList, members, findMemberById };
