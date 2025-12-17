const pages = {
  "Shin": "personnages/shin.md",
  "Aetherion": "artefacts/aetherion.md",
  "Névalis": "vaisseaux/nevalis.md"
};

async function loadPage(path) {
  const res = await fetch("data/" + path);
  const text = await res.text();
  document.getElementById("content").innerHTML = marked.parse(text);
}

document.addEventListener("input", e => {
  if (e.target.id === "search") {
    const value = e.target.value.toLowerCase();
    for (const key in pages) {
      if (key.toLowerCase().includes(value)) {
        loadPage(pages[key]);
        break;
      }
    }
  }
});

loadPage("accueil.md");
