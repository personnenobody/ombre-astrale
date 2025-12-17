document.addEventListener("DOMContentLoaded", () => {
  setupAetherionToggle();
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
      btn.textContent = "📂 Accéder au dossier complet";
    }
  };
}
