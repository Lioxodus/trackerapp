function goTracker(){
  const input = document.getElementById("epicName");
  const name = input && input.value.trim() ? input.value.trim() : "FelixFN";
  localStorage.setItem("dropiq_name", name);
  window.location.href = "dashboard.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const name = localStorage.getItem("dropiq_name");
  const dashName = document.getElementById("dashName");
  if (name && dashName) dashName.textContent = name;
});
