let aboutMeData;
let projectsData;
const projectList = document.getElementById("projectList");
let scrollPos = 0;
const contactEmail = document.getElementById("contactEmail");
const emailError = document.getElementById("emailError");
const charactersLeft = document.getElementById("charactersLeft");
const contactMessage = document.getElementById("contactMessage");
const messageError = document.getElementById("messageError");

// Load aboutMeData.json file content
async function loadAboutMeData() {
  try {
    const res = await fetch("../data/aboutMeData.json");
    if (!res.ok) throw new Error("Error while loading about me data.");
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error.message);
    return {};
  }
}

// Load projectsData.json file content
async function loadProjectsData() {
  try {
    const res = await fetch("../data/projectsData.json");
    if (!res.ok) throw new Error("Error while loading projects data.");
    const data = await res.json();
    return data;
  } catch (error) {
    return [];
  }
}

// Populate about me section
function populateAboutMe() {
  const aboutMeDev = document.querySelector("#aboutMe");

  const bioP = document.createElement("p");
  bioP.textContent = aboutMeData.aboutMe;
  aboutMeDev.append(bioP);

  const headshotDev = document.createElement("div");
  headshotDev.classList.add("headshotContainer");
  const img = document.createElement("img");
  img.src = aboutMeData.headshot;
  img.alt = "headshot";
  headshotDev.append(img);

  aboutMeDev.append(headshotDev);
}

// Card click handler
function clickCard(event) {
  const id = event.target.id;
  populateSpotlight(id);
}

// populate spotlight with project_id of value id
function populateSpotlight(id) {
  const spotlightTitles = document.getElementById("spotlightTitles");
  const projectSpotlight = document.getElementById("projectSpotlight");
  spotlightTitles.textContent = "";

  const project = projectsData.find((p) => p.project_id === id);

  projectSpotlight.style.background = `url("${
    project.spotlight_image ?? "../images/card_placeholder_bg.webp"
  }")`;
  projectSpotlight.style.backgroundSize = "cover";
  projectSpotlight.style.backgroundRepeat = "no-repeat";

  const h3 = document.createElement("h3");
  h3.textContent = project.project_name;
  const frgmt = document.createDocumentFragment();
  frgmt.append(h3);
  const p = document.createElement("p");
  p.textContent = project.long_description ?? project.short_description;
  frgmt.append(p);
  const link = document.createElement("a");
  link.textContent = "Click here to see more...";
  link.href = project.url ?? "https://example.com/project15";
  frgmt.append(link);
  spotlightTitles.append(frgmt);
}

// Populate project list
function populateProjectList() {
  const frgmt = document.createDocumentFragment();
  projectsData.forEach((project) => {
    const projectCardDev = document.createElement("div");
    projectCardDev.classList.add("projectCard");
    projectCardDev.id = project.project_id;
    projectCardDev.style.background = `url("${
      project.card_image ?? "../images/card_placeholder_bg.webp"
    }")`;
    projectCardDev.style.backgroundSize = "contain";

    const h4 = document.createElement("h4");
    h4.textContent = project.project_name;
    h4.id = project.project_id;
    projectCardDev.append(h4);

    const p = document.createElement("p");
    p.textContent = project.short_description;
    p.id = project.project_id;
    projectCardDev.append(p);

    frgmt.append(projectCardDev);
  });
  projectList.append(frgmt);
  projectList.addEventListener("click", clickCard);
}

// arrow up click handler
function arrowUp() {
  if (screen.width >= 768) {
    projectList.scrollTop += 220;
  } else {
    projectList.scrollLeft -= 220;
  }
}
document.querySelector(".arrow-left").addEventListener("click", arrowUp);

// arrow down click handler
function arrowDown() {
  if (screen.width >= 768) {
    projectList.scrollTop -= 220;
  } else {
    projectList.scrollLeft += 220;
  }
}
document.querySelector(".arrow-right").addEventListener("click", arrowDown);

// form submit handler
function formSubmit(event) {
  event.preventDefault();
  emailError.textContent = "";
  messageError.textContent = "";
  let err = false;
  // illegal characters  = /[^a-zA-Z0-9@._-]/
  // valid email address = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (
    !contactEmail.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ||
    contactEmail.value.match(/[^a-zA-Z0-9@._-]/)
  ) {
    emailError.textContent += "Invalid email address. ";
    err = true;
  }
  if ((contactEmail.textContent.length = 0)) {
    emailError.textContent += "Email address can't be empty. ";
    err = true;
  }
  if ((contactMessage.value.length = 0)) {
    messageError.textContent += "Message can't be empty. ";
    err = true;
  }
  if (contactMessage.value.match(/[^a-zA-Z0-9@._-]/)) {
    messageError.textContent += "Message contains invalid characters. ";
    err = true;
  }
  if (contactMessage.value.length > 300) {
    messageError.textContent +=
      "Message length should not exceed 300 characters. ";
    err = true;
  }

  if (err) return;

  // handle other form submit requirements
  alert("You submitted correctly and validation was successful");
}
document.querySelector("#formSection").addEventListener("submit", formSubmit);

// Message change event listener
function messageChange(event) {
  charactersLeft.textContent = `Characters: ${contactMessage.value.length}/300`;
  if (contactMessage.value.length > 300) {
    charactersLeft.classList.add("error");
  } else {
    charactersLeft.classList.remove("error");
  }
}
contactMessage.addEventListener("input", messageChange);

// initiate the page
async function initPage() {
  aboutMeData = await loadAboutMeData(); // Load aboutMeData.json file content into aboutMeData object
  projectsData = await loadProjectsData(); // Load projectsData.json file content into projectsData object
  populateAboutMe();
  populateProjectList();
  populateSpotlight(projectsData[0].project_id);

  // for project debugging purposes
  // console.log(aboutMeData);
  // console.log(projectsData);
}

initPage();
