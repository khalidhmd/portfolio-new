let aboutMeData;
let projectsData;
const projectList = document.querySelector("#projectList");
let scrollPos = 0;

// Load aboutMeData.json file content
async function loadAboutMeData() {
  const res = await fetch("../data/aboutMeData.json");
  const data = await res.json();
  return data;
}

// Load projectsData.json file content
async function loadProjectsData() {
  const res = await fetch("../data/projectsData.json");
  const data = await res.json();
  return data;
}

// Populate about me section
function populateAboutMe() {
  const aboutMeDev = document.querySelector("#aboutMe");

  const bioP = document.createElement("p");
  bioP.textContent = aboutMeData.aboutMe;
  aboutMeDev.appendChild(bioP);

  const headshotDev = document.createElement("div");
  headshotDev.classList.add("headshotContainer");
  const img = document.createElement("img");
  img.src = aboutMeData.headshot;
  img.alt = "headshot";
  headshotDev.appendChild(img);

  aboutMeDev.appendChild(headshotDev);
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
  spotlightTitles.innerHTML = "";

  const project = projectsData.find((p) => p.project_id === id);

  if (project.spotlight_image) {
    projectSpotlight.style.background = `url("${project.spotlight_image}")`;
    projectSpotlight.style.backgroundSize = "contain";
    // projectSpotlight.style.backgroundRepeat = "no-repeat";
  } else {
    projectSpotlight.style.background =
      "url('../images/card_placeholder_bg.webp')";
    projectSpotlight.style.backgroundSize = "contain";
    // projectSpotlight.style.backgroundRepeat = "no-repeat";
  }

  const h3 = document.createElement("h3");
  h3.textContent = project.project_name;
  spotlightTitles.appendChild(h3);
  const p = document.createElement("p");
  if (project.long_description) {
    p.textContent = project.long_description;
  } else {
    p.textContent = project.short_description;
  }
  spotlightTitles.appendChild(p);
  const link = document.createElement("a");
  link.textContent = "Click here to see more...";
  link.href = project.url;
  spotlightTitles.appendChild(link);
}

// Populate project list
function populateProjectList() {
  for (let i = 0; i < projectsData.length; i++) {
    const projectCardDev = document.createElement("div");
    projectCardDev.classList.add("projectCard");
    projectCardDev.id = projectsData[i].project_id;
    if (projectsData[i].card_image) {
      projectCardDev.style.background = `url("${projectsData[i].card_image}")`;
    } else {
      projectCardDev.style.background =
        "20% url('../images/card_placeholder_bg.webp')";
      projectCardDev.style.backgroundSize = "contain";
    }

    const h4 = document.createElement("h4");
    h4.textContent = projectsData[i].project_name;
    h4.id = projectsData[i].project_id;
    projectCardDev.appendChild(h4);

    const p = document.createElement("p");
    p.textContent = projectsData[i].short_description;
    p.id = projectsData[i].project_id;
    projectCardDev.appendChild(p);

    projectCardDev.addEventListener("click", clickCard);

    projectList.appendChild(projectCardDev);
  }
}

// arrow up click handler
function arrowUp() {
  // console.log("scroll up");
  if (scrollPos > 0) scrollPos--;
  document
    .getElementById(projectsData[scrollPos].project_id)
    .scrollIntoView({ block: "start", inline: "nearest" });
}

// arrow down click handler
function arrowDown() {
  if (scrollPos < projectsData.length - 1) scrollPos++;
  document
    .getElementById(projectsData[scrollPos].project_id)
    .scrollIntoView({ block: "start", inline: "nearest" });
  // console.log("scroll down");
}

// initiate the page
async function initPage() {
  aboutMeData = await loadAboutMeData(); // Load aboutMeData.json file content into aboutMeData object
  projectsData = await loadProjectsData(); // Load projectsData.json file content into projectsData object

  populateAboutMe();
  populateProjectList();
  populateSpotlight(projectsData[0].project_id);
  document.querySelector(".arrow-left").addEventListener("click", arrowUp);
  document.querySelector(".arrow-right").addEventListener("click", arrowDown);

  // for project debugging purposes
  console.log(aboutMeData);
  console.log(projectsData);
}

initPage();
