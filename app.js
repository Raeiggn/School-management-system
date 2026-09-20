const students = [
  { name: "Maya Chen", initials: "MC", grade: "Grade 8 · A", guardian: "Sam Chen", attendance: "98%" },
  { name: "Jordan Davis", initials: "JD", grade: "Grade 8 · A", guardian: "Riley Davis", attendance: "96%" },
  { name: "Amelia Wilson", initials: "AW", grade: "Grade 7 · B", guardian: "Chris Wilson", attendance: "94%" },
  { name: "Noah Williams", initials: "NW", grade: "Grade 6 · A", guardian: "Taylor Williams", attendance: "91%" },
  { name: "Sofia Martinez", initials: "SM", grade: "Grade 7 · A", guardian: "Alex Martinez", attendance: "100%" },
  { name: "Ethan Brown", initials: "EB", grade: "Grade 8 · B", guardian: "Morgan Brown", attendance: "89%" }
];

const views = ["overview", "students", "attendance", "classes", "reports"];
const pageName = document.querySelector("#pageName");
const toast = document.querySelector("#toast");

function showView(view) {
  views.forEach((name) => document.querySelector(`#${name}View`).classList.toggle("hidden", name !== view));
  document.querySelectorAll(".nav-item[data-view]").forEach((item) => item.classList.toggle("active", item.dataset.view === view));
  pageName.textContent = view[0].toUpperCase() + view.slice(1);
  document.querySelector("#sidebar").classList.remove("open");
  if (view === "students") renderStudents();
}

function renderStudents(filter = "") {
  const rows = document.querySelector("#studentRows");
  rows.innerHTML = students.filter((student) => student.name.toLowerCase().includes(filter.toLowerCase())).map((student) => `
    <tr><td>${student.name}</td><td>${student.grade}</td><td>${student.guardian}</td>
    <td>${student.attendance}</td><td><span class="status">Enrolled</span></td></tr>`).join("");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2600);
}

document.querySelectorAll("[data-view]").forEach((item) => item.addEventListener("click", () => showView(item.dataset.view)));
document.querySelector("#menuToggle").addEventListener("click", () => document.querySelector("#sidebar").classList.toggle("open"));
document.querySelector("#studentSearch").addEventListener("input", (event) => renderStudents(event.target.value));
document.querySelectorAll("[data-action]").forEach((button) => button.addEventListener("click", () => {
  const action = button.dataset.action;
  if (action === "add-student") document.querySelector("#studentDialog").showModal();
  else if (action === "mark-attendance") showToast("Attendance sheet is ready to use.");
  else if (action === "export") showToast("Report export will download shortly.");
  else showToast("This workspace is ready for your first class.");
}));
document.querySelector("#studentForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = new FormData(event.target);
  students.unshift({ name: form.get("name"), grade: form.get("grade"), guardian: form.get("guardian"), attendance: "—" });
  event.target.closest("dialog").close();
  showView("students");
  showToast("Student added successfully.");
  event.target.reset();
});
