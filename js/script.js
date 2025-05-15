const emails = [
  { id: 1, sender: "Bob", receiver: "Alice", subject: "Meeting Reminder", body: "Don't forget our meeting tomorrow at 10 AM.", tab: "Primary", starred: false },
  { id: 2, sender: "LinkedIn", receiver: "Alice", subject: "New Connection Request", body: "You have a new connection request.", tab: "Social", starred: false },
  { id: 3, sender: "Amazon", receiver: "Alice", subject: "Your Order Has Shipped", body: "Your order #12345 has been shipped.", tab: "Promotions", starred: false },
  { id: 4, sender: "System", receiver: "Alice", subject: "Password Change", body: "Your password was changed successfully.", tab: "Updates", starred: false },
  { id: 5, sender: "SpamSender", receiver: "Alice", subject: "You've won a prize!", body: "Click here to claim your prize.", tab: "Spam", starred: false },
  { id: 6, sender: "Bob", receiver: "Alice", subject: "Old Project Files", body: "Here are the old project files you requested.", tab: "Trash", starred: false },
  { id: 7, sender: "Carol", receiver: "Alice", subject: "Team Lunch", body: "Let's plan a team lunch next week.", tab: "Primary", starred: true },
  { id: 8, sender: "Bob", receiver: "Alice", subject: "Project Update", body: "We finished the first milestone.", tab: "Primary", starred: false },
  { id: 9, sender: "Carol", receiver: "Alice", subject: "Promo Offer", body: "50% off on design tools!", tab: "Promotions", starred: false },
  { id: 10, sender: "System", receiver: "Alice", subject: "Welcome!", body: "Your SimpleMail account is ready.", tab: "Updates", starred: false }
];

let currentUser = "Alice";
let currentTab = "Primary";
let currentEmailId = null;
let emailIdCounter = 4;

function renderEmails() {
  const list = document.getElementById("emailList");
  list.innerHTML = "";

  const filtered = emails.filter(
    email => email.receiver === currentUser && (email.tab === currentTab || (currentTab === "Bookmarks" && email.starred))
  );

  if (filtered.length === 0) {
    const emptyMessage = document.createElement("li");
    emptyMessage.className = "list-group-item text-center text-muted py-4";
    emptyMessage.innerHTML = `<i class="bi bi-inbox fs-4 d-block mb-2"></i>No emails in this folder.`;
    list.appendChild(emptyMessage);
    return;
  }

  filtered.forEach(email => {
    const item = document.createElement("li");
    item.className = `list-group-item d-flex justify-content-between align-items-start email-item ${selectedEmailId === email.id ? 'active' : ''}`;
    item.dataset.id = email.id;

    item.innerHTML = `
      <div>
        <strong>${email.sender}</strong><br/>
        <span class="small">${email.subject}</span>
      </div>
      <div>
        ${email.starred ? '<i class="bi bi-star-fill text-warning"></i>' : '<i class="bi bi-star text-muted"></i>'}
      </div>
    `;

    item.querySelector(".bi-star, .bi-star-fill").addEventListener("click", (e) => {
      e.stopPropagation();
      email.starred = !email.starred;
      renderEmails();
    });

    item.addEventListener("click", () => showEmail(email.id));
    list.appendChild(item);
  });
}

function showEmail(id) {
  selectedEmailId = id;
  const email = emails.find(e => e.id === id);
  if (!email) return;

  document.getElementById("emailSubject").textContent = email.subject;
  document.getElementById("emailSender").textContent = `From: ${email.sender}`;
  document.getElementById("emailBody").textContent = email.body;

  document.getElementById("replyBtn").classList.remove("d-none");
  document.getElementById("deleteBtn").classList.remove("d-none");
  document.getElementById("bookmarkBtn").classList.remove("d-none");
  document.getElementById("replyBox").classList.add("d-none");

  renderEmails();
}

document.getElementById("userSelect").addEventListener("change", function () {
  currentUser = this.value;
  selectedEmailId = null;
  renderEmails();
});

document.querySelectorAll("#sidebar .nav-link").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector("#sidebar .nav-link.active").classList.remove("active");
    btn.classList.add("active");
    currentTab = btn.dataset.tab;
    document.getElementById("tabTitle").textContent = `${currentTab} Inbox`;
    selectedEmailId = null;
    renderEmails();
  });
});

document.getElementById("composeForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const to = document.getElementById("composeTo").value;
  const subject = document.getElementById("composeSubject").value;
  const body = document.getElementById("composeBody").value;

  if (to && subject && body) {
    emails.push({ id: Date.now(), sender: currentUser, receiver: to, subject, body, tab: "Primary", starred: false });
    renderEmails();
    this.reset();
    bootstrap.Modal.getInstance(document.getElementById("composeModal")).hide();
  }
});

document.getElementById("replyBtn").addEventListener("click", () => {
  document.getElementById("replyBox").classList.toggle("d-none");
});

document.getElementById("deleteBtn").addEventListener("click", () => {
  const email = emails.find(e => e.id === selectedEmailId);
  if (email) {
    email.tab = "Trash";
    selectedEmailId = null;
    renderEmails();
    document.getElementById("emailSubject").textContent = "Select a message";
    document.getElementById("emailSender").textContent = "";
    document.getElementById("emailBody").textContent = "Click on a message to read it here.";
    document.getElementById("replyBtn").classList.add("d-none");
    document.getElementById("deleteBtn").classList.add("d-none");
    document.getElementById("bookmarkBtn").classList.add("d-none");
    document.getElementById("replyBox").classList.add("d-none");
  }
});

document.getElementById("bookmarkBtn").addEventListener("click", () => {
  const email = emails.find(e => e.id === selectedEmailId);
  if (email) {
    email.starred = !email.starred;
    renderEmails();
  }
});

renderEmails();