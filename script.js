async function loadPage(path) {
  const res = await fetch("data/" + path);
  const text = await res.text();
  document.getElementById("content").innerHTML = marked.parse(text);
}

async function loadMenu() {
  const res = await fetch("data/sommaire.json");
  const data = await res.json();
  const nav = document.querySelector("nav");
  nav.innerHTML = "";

  for (const category in data) {
    const btn = document.createElement("button");
    btn.textContent = category;
    btn.onclick = () => {
      const first = Object.values(data[category])[0];
      loadPage(first);
    };
    nav.appendChild(btn);
  }
}

loadMenu();
loadPage("accueil.md");
