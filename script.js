
function changeTheme(){const toggleBtn = document.getElementById("theme-toggle");
const icon = document.getElementById("theme-icon");

// check saved theme
let savedTheme = localStorage.getItem("theme");

if(savedTheme === "dark"){
  document.body.classList.add("dark");
  icon.src = "assets/images/icon-sun.svg";
}

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if(document.body.classList.contains("dark")){
    localStorage.setItem("theme","dark");
    icon.src = "assets/images/icon-sun.svg";
  }else{
    localStorage.setItem("theme","light");
    icon.src = "assets/images/icon-moon.svg";
  }
});
}
changeTheme();

// const container = document.querySelector(".extensions-container");

const container = document.getElementById("extensions-container");

const data = [];

let currentFilter = "all"; 

function renderExtention(ext,index) {
 const card = document.createElement("div");
      card.className = "extensions-card card";
      card.innerHTML = `
        <div class="extensions-card-body">
          <img src="${ext.logo}" class="extensions-logo" alt="${ext.name}">
          
          <div class="extensions-card-content">
            <h3 class="extensions-name">${ext.name}</h3>
            <p class="extensions-description">${ext.description}</p>
          </div>
        </div>

        <div class="extensions-card-footer">
          <button class="remove" onclick=remove(${index})>Remove</button>

          <label class="switch">
            <input type="checkbox" ${ext.isActive ? "checked" : ""}  onchange="toggleExtension(${index})">
            <span class="slider"></span>
          </label>
        </div>
      `;

      container.appendChild(card);
}
function fetchExtensions() {
 currentFilter = "all";
  container.innerHTML = "";
fetch("data.json")
  .then(res => res.json() 
  )
  .then((extensions, index) => {
    data.push(...extensions);
    // renderExtention(extensions);
    extensions.forEach((ext) => {
      renderExtention(ext ,index);
    });
  })
  .catch(err => console.log(err));
}
console.log(data);

fetchExtensions();

function getAllExtensions() {
  currentFilter = "all";
   container.innerHTML = "";
    
  data.forEach((ext,index) => {
    renderExtention(ext,index);
  });
  
    
}

function getActiveExtensions() {
  currentFilter = "active";
  container.innerHTML = "";
    
  data.forEach((ext,index) => {
    if (ext.isActive) {
      renderExtention(ext,index);
    }
  });
}
function getActive_Extensions() {
  container.innerHTML = "";
  
 fetch("data.json")
  .then(res => res.json()
  )
  .then(extensions => {
    extensions.forEach(ext => {
      if(ext.isActive){const card = document.createElement("div");
      card.className = "extensions-card card";

      card.innerHTML = `
        <div class="extensions-card-body">
          <img src="${ext.logo}" class="extensions-logo" alt="${ext.name}">
          
          <div class="extensions-card-content">
            <h3 class="extensions-name">${ext.name}</h3>
            <p class="extensions-description">${ext.description}</p>
          </div>
        </div>

        <div class="extensions-card-footer">
          <button class="remove" onclick=remove()>Remove</button>

          <label class="switch">
            <input type="checkbox" ${ext.isActive ? "checked" : ""}>
            <span class="slider"></span>
          </label>
        </div>
      `;
      container.appendChild(card);}
    });

  })
    .catch(err => console.log(err));
  
}

function getInactive_Extensions() {
  container.innerHTML = "";
  fetch("data.json")
  .then(res => res.json() 
  )
  .then(extensions => {
    extensions.forEach(ext => {
      if(!ext.isActive){const card = document.createElement("div");
      card.className = "extensions-card card";

      card.innerHTML = `
        <div class="extensions-card-body">
          <img src="${ext.logo}" class="extensions-logo" alt="${ext.name}">
          
          <div class="extensions-card-content">
            <h3 class="extensions-name">${ext.name}</h3>
            <p class="extensions-description">${ext.description}</p>
          </div>
        </div>

        <div class="extensions-card-footer">
          <button class="remove" onclick=remove()>Remove</button>

          <label class="switch">
            <input type="checkbox" ${ext.isActive ? "checked" : ""}>
            <span class="slider"></span>
          </label>
        </div>
      `;
      container.appendChild(card);}
    });

  })
  .catch(err => console.log(err));
}

function getInactiveExtensions() {
  currentFilter = "inactive";
  container.innerHTML = "";
    
  data.forEach((ext ,index)=> {
    if (!ext.isActive) {
      renderExtention(ext, index);
    }
  });
}

function remove(index) {
  data.splice(index, 1);
   switch (currentFilter) {
    case "active":
       getActiveExtensions();
      break;

    case "inactive":
      getInactiveExtensions();
      break;

    default:
      getAllExtensions();
  }
}

function toggleExtension(index) {
  data[index].isActive = !data[index].isActive;
  switch (currentFilter) {
    case "active":
       getActiveExtensions();
      break;
    case "inactive":
      getInactiveExtensions();
      break;

    default:
      getAllExtensions();
  }
}


