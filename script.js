let SOMMAIRE = {};

async function loadPage(path) {
  const res = await fetch("data/" + path);
  if (!res.ok) {
    document.getElementById("content").innerHTML =
      "<p>Archive introuvable.</p>";
    return;
  }
  const text = await res.text();
  document.getElementById("content").innerHTML = marked.parse(text);
}

async function loadMenu() {
  const res = await fetch("data/sommaire.json");
  SOMMAIRE = await res.json();

  const nav = document.querySelector("nav");
  nav.innerHTML = "";

  for (const category in SOMMAIRE) {
    const btn = document.createElement("button");
    btn.textContent = category;
    btn.onclick = () => {
      const firstPage = Object.values(SOMMAIRE[category])[0];
      loadPage(firstPage);
    };
    nav.appendChild(btn);
  }
}

function setupSearch() {
  const input = document.getElementById("search");
  if (!input) return;

  input.addEventListener("input", () => {
    const value = input.value.toLowerCase().trim();
    if (value.length < 2) return;

    for (const category in SOMMAIRE) {
      for (const title in SOMMAIRE[category]) {
        if (title.toLowerCase().includes(value)) {
          loadPage(SOMMAIRE[category][title]);
          return;
        }
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadMenu();
  setupSearch();
  loadPage("accueil.md");
});
