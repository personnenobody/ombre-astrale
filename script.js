let SOMMAIRE = {};

async function loadPage(path) {
  const res = await fetch("data/" + path);
  const content = document.getElementById("content");

  if (!res.ok) {
    content.innerHTML = "<p>Archive introuvable.</p>";
    return;
  }

  const html = await res.text();
  content.innerHTML = html;

  // Active les boutons APRÈS chargement du contenu
  setupAetherionToggle();
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
      const first = Object.values(SOMMAIRE[category])[0];
      loadPage(first);
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
  loadPage("accueil.html");
});

function setupAetherionToggle() {
  const btn = document.getElementById("toggle-aetherion");
  const shortText = document.getElementById("aetherion-short");
  const longText = document.getElementById("aetherion-long");

  if (!btn || !shortText || !longText) return;

  btn.onclick = () => {
    const isShortVisible = !shortText.classList.contains("hidden");

    if (isShortVisible) {
      shortText.classList.add("hidden");
      longText.classList.remove("hidden");
      btn.textContent = "⬅ Retour à la fiche principale";
    } else {
      longText.classList.add("hidden");
      shortText.classList.remove("hidden");
      btn.textContent = "📂 Dossier détaillé";
    }
  };
}
