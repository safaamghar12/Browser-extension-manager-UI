
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

function getAllExtensions() {

  container.innerHTML = "";
fetch("data.json")
  .then(res => res.json() 
  )
  .then(extensions => {
    data.push(...extensions);
    extensions.forEach(ext => {
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
          <button class="remove" onclick=remove()>Remove</button>

          <label class="switch">
            <input type="checkbox" ${ext.isActive ? "checked" : ""}>
            <span class="slider"></span>
          </label>
        </div>
      `;

      container.appendChild(card);
    });

  })
  .catch(err => console.log(err));
}
console.log(data);

getAllExtensions();

function getActiveExtensions() {
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

function getInactiveExtensions() {
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

function remove() {
  alert("Coming soon !");
}

function activateExtension() {
  alert("Coming soon !");
}


