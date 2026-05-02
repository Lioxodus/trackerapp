function openTracker() {
  const input = document.getElementById("epicName");
  const name = input && input.value.trim() ? input.value.trim() : "FelixFN";
  localStorage.setItem("dropiq_player_name", name);
  window.location.href = "dashboard.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const playerName = document.getElementById("playerName");
  const savedName = localStorage.getItem("dropiq_player_name");

  if (playerName && savedName) {
    playerName.textContent = savedName;
  }
});
