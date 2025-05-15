let currentUser = "Alice";
let currentTab = "Primary";
let selectedEmailId = null;

const emails = [
  { id: 1, sender: "Bob", receiver: "Alice", subject: "Meeting Reminder", body: "Don't forget our meeting tomorrow.", tab: "Primary", starred: false },
  { id: 2, sender: "LinkedIn", receiver: "Alice", subject: "New Connection", body: "Someone wants to connect.", tab: "Social", starred: false },
  { id: 3, sender: "Amazon", receiver: "Alice", subject: "Order Shipped", body: "Your order has been shipped.", tab: "Promotions", starred: false },
  { id: 4, sender: "System", receiver: "Alice", subject: "Password Changed", body: "Your password was updated.", tab: "Updates", starred: false },
  { id: 5, sender: "SpamCo", receiver: "Alice", subject: "Win Big Now!", body: "Click to claim your prize!", tab: "Spam", starred: false },
  { id: 6, sender: "Carol", receiver: "Alice", subject: "Lunch?", body: "Want to get lunch next week?", tab: "Bookmarks", starred: true },
  { id: 7, sender: "Bob", receiver: "Carol", subject: "New Tasks", body: "Please check your new assignments.", tab: "Primary", starred: false }
];

function renderEmails() {
  const list = document.getElementById("emailList");
  list.innerHTML = "";

  const filtered = emails.filter(
    email => email.receiver === currentUser &&
    (email.tab === currentTab || (currentTab === "Bookmarks" && email.starred))
  );

  if (filtered.length === 0) {
    const emptyMessage = document.createElement("li");
    emptyMessage.className = "list-group-item text-center text-muted py-4 fade-in";
    emptyMessage.innerHTML = `<i class="bi bi-inbox fs-4 d-block mb-2"></i>No emails in this folder.`;
    list.appendChild(emptyMessage);
    return;
  }

  filtered.forEach(email => {
    const item = document.createElement("li");
    item.className = `list-group-item d-flex justify-content-between align-items-start email-item fade-in ${selectedEmailId === email.id ? 'active' : ''}`;
    item.dataset.id = email.id;

    item.innerHTML = `
      <div>
        <strong>${email.sender}</strong><br/>
        <span class="small">${email.subject}</span>
      </div>
      <div>
        <i class="star-toggle ${email.starred ? 'bi bi-star-fill text-warning' : 'bi bi-star text-muted'}"></i>
      </div>
    `;

    item.querySelector(".star-toggle").addEventListener("click", (e) => {
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

  document.getElementById("emailView").classList.add("show");

  renderEmails();
}

document.getElementById("userSelect").addEventListener("change", function () {
  currentUser = this.value;
  selectedEmailId = null;
  renderEmails();
  resetEmailView();
});

document.querySelectorAll("#sidebar .nav-link").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector("#sidebar .nav-link.active").classList.remove("active");
    btn.classList.add("active");
    currentTab = btn.dataset.tab;
    document.getElementById("tabTitle").textContent = `${currentTab} Inbox`;
    selectedEmailId = null;
    renderEmails();
    resetEmailView();
  });
});

document.getElementById("composeForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const to = document.getElementById("composeTo").value;
  const subject = document.getElementById("composeSubject").value;
  const body = document.getElementById("composeBody").value;

  if (to && subject && body) {
    emails.push({
      id: Date.now(),
      sender: currentUser,
      receiver: to,
      subject,
      body,
      tab: "Primary",
      starred: false
    });
    renderEmails();
    this.reset();
    bootstrap.Modal.getInstance(document.getElementById("composeModal")).hide();
  }
});

document.getElementById("replyBtn").addEventListener("click", () => {
  const replyBox = document.getElementById("replyBox");
  replyBox.classList.toggle("d-none");
  if (!replyBox.classList.contains("d-none")) {
    replyBox.focus();
  }
});

document.getElementById("deleteBtn").addEventListener("click", () => {
  const email = emails.find(e => e.id === selectedEmailId);
  if (email) {
    email.tab = "Trash";
    selectedEmailId = null;
    renderEmails();
    resetEmailView();
  }
});

document.getElementById("bookmarkBtn").addEventListener("click", () => {
  const email = emails.find(e => e.id === selectedEmailId);
  if (email) {
    email.starred = !email.starred;
    renderEmails();
  }
});

function resetEmailView() {
  document.getElementById("emailSubject").textContent = "Select a message";
  document.getElementById("emailSender").textContent = "";
  document.getElementById("emailBody").textContent = "Click on a message to read it here.";
  document.getElementById("replyBtn").classList.add("d-none");
  document.getElementById("deleteBtn").classList.add("d-none");
  document.getElementById("bookmarkBtn").classList.add("d-none");
  document.getElementById("replyBox").classList.add("d-none");
  document.getElementById("emailView").classList.remove("show");
}

renderEmails();