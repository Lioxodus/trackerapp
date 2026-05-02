function openTracker() {
  const input = document.getElementById("epicName");
  const name = input && input.value.trim() ? input.value.trim() : "FelixFN";
  localStorage.setItem("dropiq_player_name", name);
  window.location.href = "dashboard.html";
}

function demoLogin() {
  const nameInput = document.getElementById("epicName");
  const name = nameInput && nameInput.value.trim() ? nameInput.value.trim() : localStorage.getItem("dropiq_player_name") || "FelixFN";
  localStorage.setItem("dropiq_logged_in", "true");
  localStorage.setItem("dropiq_player_name", name);
  updateLoginStatus();
  renderReplayGate();
}

function demoPro() {
  localStorage.setItem("dropiq_pro_user", "true");
  renderReplayGate();
}

function logoutDemo() {
  localStorage.removeItem("dropiq_logged_in");
  localStorage.removeItem("dropiq_pro_user");
  updateLoginStatus();
  renderReplayGate();
}

function updateLoginStatus() {
  const loginStatus = document.getElementById("loginStatus");
  const loggedIn = localStorage.getItem("dropiq_logged_in") === "true";
  if (loginStatus) {
    loginStatus.textContent = loggedIn ? "Epic verbunden" : "Nicht verbunden";
  }
}

function renderReplayGate() {
  const gate = document.getElementById("replayGate");
  if (!gate) return;

  const loggedIn = localStorage.getItem("dropiq_logged_in") === "true";
  const proUser = localStorage.getItem("dropiq_pro_user") === "true";

  if (!loggedIn) {
    gate.innerHTML = `
      <div>
        <span class="status-pill pro">LOGIN REQUIRED</span>
        <h3>Replay Upload gesperrt</h3>
        <p>Du musst zuerst mit deinem Epic Account angemeldet sein, bevor du ein Replay einschicken kannst.</p>
        <div class="gate-actions">
          <button class="primary" onclick="demoLogin()">Mit Epic verbinden</button>
        </div>
      </div>
    `;
    return;
  }

  if (!proUser) {
    gate.innerHTML = `
      <div>
        <span class="status-pill pro">PRO FEATURE</span>
        <h3>Replay AI ist ein Abo-Feature</h3>
        <p>Du bist angemeldet. Der Upload ist sichtbar, aber die KI-Videoanalyse ist nur mit Pro nutzbar.</p>
        <div class="gate-actions">
          <button class="primary" onclick="demoPro()">Pro Demo aktivieren</button>
          <button class="secondary" onclick="logoutDemo()">Logout Demo</button>
        </div>
      </div>
    `;
    return;
  }

  gate.innerHTML = `
    <div>
      <span class="status-pill pro">PRO ACTIVE</span>
      <h3>Replay Upload bereit</h3>
      <p>Demo-Zustand: Du bist eingeloggt und Pro ist aktiv. Hier würde später der echte Upload stehen.</p>
      <div class="upload-box">
        <strong>Replay hochladen</strong>
        <span>Datei hier ablegen oder auswählen · Demo</span>
      </div>
      <div class="gate-actions">
        <button class="secondary" onclick="logoutDemo()">Demo zurücksetzen</button>
      </div>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  const playerName = document.getElementById("playerName");
  const savedName = localStorage.getItem("dropiq_player_name");

  if (playerName && savedName) {
    playerName.textContent = savedName;
  }

  updateLoginStatus();
  renderReplayGate();
});
