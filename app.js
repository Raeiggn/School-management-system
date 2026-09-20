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

function updateStudentCount() {
  document.querySelector("#studentCount").textContent = students.length;
}

function renderStudents(filter = "") {
  const rows = document.querySelector("#studentRows");
  rows.replaceChildren();
  students.filter((student) => student.name.toLowerCase().includes(filter.toLowerCase())).forEach((student) => {
    const row = document.createElement("tr");
    [student.name, student.grade, student.guardian, student.attendance].forEach((value) => {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.appendChild(cell);
    });
    const statusCell = document.createElement("td");
    const status = document.createElement("span");
    status.className = "status";
    status.textContent = "Enrolled";
    statusCell.appendChild(status);
    row.appendChild(statusCell);
    rows.appendChild(row);
  });
}

function exportReport() {
  const header = ["Student", "Grade", "Guardian", "Attendance", "Status"];
  const csv = [header, ...students.map((student) => [
    student.name, student.grade, student.guardian, student.attendance, "Enrolled"
  ])].map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(",")).join("\r\n");
  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  link.download = "luma-students-report.csv";
  link.click();
  URL.revokeObjectURL(link.href);
  showToast("Student report downloaded.");
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
  else if (action === "export") exportReport();
  else showToast("This workspace is ready for your first class.");
}));
document.querySelector("#studentForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = new FormData(event.target);
  students.unshift({ name: form.get("name"), grade: form.get("grade"), guardian: form.get("guardian"), attendance: "—" });
  updateStudentCount();
  event.target.closest("dialog").close();
  showView("students");
  showToast("Student added successfully.");
  event.target.reset();
});

updateStudentCount();
