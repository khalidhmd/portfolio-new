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
function populateAboutMe(aboutMe) {
  const aboutMeDev = document.querySelector("#aboutMe");

  const bioP = document.createElement("p");
  bioP.textContent = aboutMe.aboutMe;
  aboutMeDev.appendChild(bioP);

  const headshotDev = document.createElement("div");
  headshotDev.classList.add("headshotContainer");
  const img = document.createElement("img");
  img.src = aboutMe.headshot;
  img.alt = "headshot";
  headshotDev.appendChild(img);

  aboutMeDev.appendChild(headshotDev);
}

function populateProjectList(projectsData) {
  const projectList = document.querySelector("#projectList");

  for (let i = 0; i < projectsData.length; i++) {
    const projectCardDev = document.createElement("div");
    projectCardDev.classList.add("projectCard");
    projectCardDev.id = projectsData[0].project_id;
    projectCardDev.style.background = `url("${projectsData[i].card_image}")`;

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
  const aboutMe = await loadAboutMeData();
  const projectsData = await loadProjectsData();

  populateAboutMe(aboutMe);
  populateProjectList(projectsData);

  console.log(aboutMe);
  console.log(projectsData);
}

populatePage();
