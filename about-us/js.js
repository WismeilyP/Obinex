
/*********--- MEET TEAM ---**********/
var toggleButton = document.getElementById("toggleButton");
var teamMembers = document.getElementById("teamMembers");

var isTeamVisible = false;

toggleButton.addEventListener("click", function() {
  isTeamVisible = !isTeamVisible;

  if (isTeamVisible) {
    teamMembers.style.display = "block";
    toggleButton.textContent = "Hide";
  } else {
    teamMembers.style.display = "none";
    toggleButton.textContent = "Meet Everybody";
  }
});
