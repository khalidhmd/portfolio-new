let aboutMeData;
let projectsData;

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

function populateProjectList() {
  const projectList = document.querySelector("#projectList");

  for (let i = 0; i < projectsData.length; i++) {
    const projectCardDev = document.createElement("div");
    projectCardDev.classList.add("projectCard");
    projectCardDev.id = projectsData[0].project_id;
    if (projectsData[i].card_image) {
      projectCardDev.style.background = `url("${projectsData[i].card_image}")`;
    } else {
      projectCardDev.style.background =
        "20% url('../images/card_placeholder_bg.webp')";
    }

    const h4 = document.createElement("h4");
    h4.textContent = projectsData[i].project_name;
    projectCardDev.appendChild(h4);

    const p = document.createElement("p");
    p.textContent = projectsData[i].short_description;
    projectCardDev.appendChild(p);

    projectList.appendChild(projectCardDev);
  }
}

// Populate data into the page
async function populatePage() {
  aboutMeData = await loadAboutMeData();
  projectsData = await loadProjectsData();

  populateAboutMe();
  populateProjectList();

  console.log(aboutMe);
  console.log(projectsData);
}

populatePage();
