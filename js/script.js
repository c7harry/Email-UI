const emails = [
  { id: 1, sender: "Bob", receiver: "Alice", subject: "Project Update", body: "We finished the first milestone.", tab: "Primary", starred: false },
  { id: 2, sender: "Carol", receiver: "Alice", subject: "Promo Offer", body: "50% off on design tools!", tab: "Promotions", starred: false },
  { id: 3, sender: "System", receiver: "Alice", subject: "Welcome!", body: "Your SimpleMail account is ready.", tab: "Updates", starred: false }
];

let currentUser = "Alice";
let currentTab = "Primary";
let currentEmailId = null;
let emailIdCounter = 4;

function renderEmails() {
  const emailList = document.getElementById("emailList");
  emailList.innerHTML = "";

  const filtered = emails.filter(e => {
    if (currentTab === "Bookmarks") {
      return e.receiver === currentUser && e.starred;
    }
    return e.receiver === currentUser && e.tab === currentTab;
  });

  filtered.slice().reverse().forEach(email => {
    const item = document.createElement("li");
    item.className = "list-group-item d-flex justify-content-between align-items-center";
    item.dataset.emailId = email.id;
    item.innerHTML = `
      <span class="fw-bold">${email.sender}:</span> ${email.subject}
      <i class="bi ${email.starred ? 'bi-star-fill text-warning' : 'bi-star'} bookmark-icon" title="Bookmark"></i>
    `;
    item.querySelector(".bookmark-icon").addEventListener("click", (e) => {
      e.stopPropagation();
      toggleBookmark(email.id);
    });
    item.addEventListener("click", () => showEmail(email.id));
    emailList.appendChild(item);
  });

  document.getElementById("tabTitle").textContent = `${currentTab} Inbox`;
}

function showEmail(id) {
  const email = emails.find(e => e.id === id);
  if (!email) return;

  currentEmailId = id;

  document.getElementById("emailSubject").textContent = email.subject;
  document.getElementById("emailSender").textContent = `From: ${email.sender}`;
  document.getElementById("emailBody").textContent = email.body;

  document.getElementById("replyBtn").classList.remove("d-none");
  document.getElementById("replyBox").classList.remove("d-none");
  document.getElementById("deleteBtn").classList.remove("d-none");
  document.getElementById("bookmarkBtn").classList.remove("d-none");
  document.getElementById("bookmarkBtn").innerHTML = `
    <i class="bi ${email.starred ? 'bi-star-fill' : 'bi-star'}"></i> Bookmark
  `;
}

function clearView() {
  document.getElementById("emailSubject").textContent = "Select a message";
  document.getElementById("emailSender").textContent = "";
  document.getElementById("emailBody").textContent = "Click on a message to read it here.";
  ["replyBtn", "replyBox", "deleteBtn", "bookmarkBtn"].forEach(id =>
    document.getElementById(id).classList.add("d-none")
  );
}

function toggleBookmark(id) {
  const email = emails.find(e => e.id === id);
  if (email) {
    email.starred = !email.starred;
    renderEmails();
    if (currentEmailId === id) showEmail(id);
  }
}

document.getElementById("composeForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const to = document.getElementById("composeTo").value;
  const subject = document.getElementById("composeSubject").value;
  const body = document.getElementById("composeBody").value;

  emails.push({
    id: emailIdCounter++,
    sender: currentUser,
    receiver: to,
    subject,
    body,
    tab: "Primary",
    starred: false
  });

  renderEmails();
  bootstrap.Modal.getInstance(document.getElementById("composeModal")).hide();
  this.reset();
});

document.getElementById("deleteBtn").addEventListener("click", () => {
  const email = emails.find(e => e.id === currentEmailId);
  if (email) email.tab = "Trash";
  clearView();
  renderEmails();
});

document.getElementById("bookmarkBtn").addEventListener("click", () => {
  toggleBookmark(currentEmailId);
});

document.querySelectorAll("#sidebar .nav-link").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll("#sidebar .nav-link").forEach(b => b.classList.remove("active"));
    button.classList.add("active");
    currentTab = button.dataset.tab;
    clearView();
    renderEmails();
  });
});

document.getElementById("userSelect").addEventListener("change", (e) => {
  currentUser = e.target.value;
  clearView();
  renderEmails();
});

renderEmails();