const emails = [
  { id: 1, sender: "Alice", subject: "Meeting", body: "Meeting at 3 PM", tab: "Primary" },
  { id: 2, sender: "Carol", subject: "Sale", body: "50% off promo!", tab: "Promotions" },
  { id: 3, sender: "Bob", subject: "Update", body: "Here's the status update", tab: "Updates" }
];

let currentTab = "Primary";
let emailIdCounter = 4;
let currentEmailId = null;

// Render list based on current tab
function renderEmails() {
  const list = document.getElementById("emailList");
  list.innerHTML = "";
  const filtered = emails.filter(e => e.tab === currentTab);
  filtered.slice().reverse().forEach(email => {
    const item = document.createElement("li");
    item.className = "list-group-item";
    item.textContent = `${email.sender} - ${email.subject}`;
    item.dataset.emailId = email.id;
    item.addEventListener("click", () => showEmail(email.id));
    list.appendChild(item);
  });
  document.getElementById("tabTitle").textContent = currentTab + " Inbox";
}

// Show email in viewer
function showEmail(id) {
  const email = emails.find(e => e.id === id);
  if (!email) return;

  currentEmailId = id;

  document.getElementById("emailSubject").textContent = email.subject;
  document.getElementById("emailSender").textContent = "From: " + email.sender;
  document.getElementById("emailBody").textContent = email.body;

  document.getElementById("replyBtn").classList.remove("d-none");
  document.getElementById("replyBox").classList.remove("d-none");
  document.getElementById("deleteBtn").classList.remove("d-none");

  document.querySelectorAll("#emailList .list-group-item").forEach(item =>
    item.classList.remove("active")
  );
  const activeItem = document.querySelector(`[data-email-id="${id}"]`);
  if (activeItem) activeItem.classList.add("active");
}

// Compose email
document.getElementById("composeForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const to = document.getElementById("composeTo").value;
  const subject = document.getElementById("composeSubject").value;
  const body = document.getElementById("composeBody").value;

  emails.push({
    id: emailIdCounter++,
    sender: to,
    subject,
    body,
    tab: "Primary"
  });

  renderEmails();
  bootstrap.Modal.getInstance(document.getElementById("composeModal")).hide();
  this.reset();
});

// Delete button
document.getElementById("deleteBtn").addEventListener("click", () => {
  const email = emails.find(e => e.id === currentEmailId);
  if (email) email.tab = "Trash";
  currentEmailId = null;
  clearEmailView();
  renderEmails();
});

// Clear viewer
function clearEmailView() {
  document.getElementById("emailSubject").textContent = "Select a message";
  document.getElementById("emailSender").textContent = "";
  document.getElementById("emailBody").textContent = "Click on a message to read it here.";
  document.getElementById("replyBtn").classList.add("d-none");
  document.getElementById("replyBox").classList.add("d-none");
  document.getElementById("deleteBtn").classList.add("d-none");
}

// Tab switching
document.querySelectorAll("#sidebar .nav-link").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll("#sidebar .nav-link").forEach(b => b.classList.remove("active"));
    button.classList.add("active");
    currentTab = button.dataset.tab;
    clearEmailView();
    renderEmails();
  });
});

renderEmails();