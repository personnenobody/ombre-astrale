async function loadPage(path) {
  const res = await fetch("data/" + path);
  const text = await res.text();
  document.getElementById("content").innerHTML = marked.parse(text);
}

loadPage("accueil.md");
