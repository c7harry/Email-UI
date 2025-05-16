// Set the current user and initial tab
let currentUser = "Alice";
let currentTab = "Primary";
let selectedEmailId = null;

// Sample email data
const emails = [
  { id: 1, sender: "Bob", receiver: "Alice", subject: "Meeting Reminder", body: "Don't forget our meeting tomorrow.", tab: "Primary", starred: false },
  { id: 2, sender: "LinkedIn", receiver: "Alice", subject: "New Connection", body: "Someone wants to connect.", tab: "Social", starred: false },
  { id: 3, sender: "Amazon", receiver: "Alice", subject: "Order Shipped", body: "Your order has been shipped.", tab: "Promotions", starred: false },
  { id: 4, sender: "System", receiver: "Alice", subject: "Password Changed", body: "Your password was updated.", tab: "Updates", starred: false },
  { id: 5, sender: "SpamCo", receiver: "Alice", subject: "Win Big Now!", body: "Click to claim your prize!", tab: "Spam", starred: false },
  { id: 6, sender: "Carol", receiver: "Alice", subject: "Lunch?", body: "Want to get lunch next week?", tab: "Bookmarks", starred: true },
  { id: 7, sender: "Bob", receiver: "Carol", subject: "New Tasks", body: "Please check your new assignments.", tab: "Primary", starred: false }
];

// Render emails for the current user and selected tab
function renderEmails() {
  const list = document.getElementById("emailList");
  list.innerHTML = ""; // Clear previous emails

  // Filter emails by receiver and tab
  const filtered = emails.filter(
    email => email.receiver === currentUser &&
    (email.tab === currentTab || (currentTab === "Bookmarks" && email.starred))
  );

  // Show message if no emails found
  if (filtered.length === 0) {
    const emptyMessage = document.createElement("li");
    emptyMessage.className = "list-group-item text-center text-muted py-4 fade-in";
    emptyMessage.innerHTML = `<div id="emptyMessage"><i class="bi bi-inbox fs-4 d-block mb-2"></i>No emails in this folder.</div>`;
    list.appendChild(emptyMessage);
    return;
  }

  // Render each email item
  filtered.forEach(email => {
    const item = document.createElement("li");
    item.className = `list-group-item d-flex justify-content-between align-items-start email-item fade-in ${selectedEmailId === email.id ? 'active' : ''}`;
    item.dataset.id = email.id;

    // Email summary with star toggle
    item.innerHTML = `
      <div>
        <strong>${email.sender}</strong><br/>
        <span class="small">${email.subject}</span>
      </div>
      <div>
        <i class="star-toggle ${email.starred ? 'bi bi-star-fill text-warning' : 'bi bi-star text-muted'}"></i>
      </div>
    `;

    // Star click toggles starred status
    item.querySelector(".star-toggle").addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent opening the email
      email.starred = !email.starred;
      renderEmails(); // Re-render after change
    });

    // Clicking the item shows full email
    item.addEventListener("click", () => showEmail(email.id));
    list.appendChild(item);
  });
}

// Show full email content in the view panel
function showEmail(id) {
  selectedEmailId = id;
  const email = emails.find(e => e.id === id);
  if (!email) return;

  // Display email details
  document.getElementById("emailSubject").textContent = email.subject;
  document.getElementById("emailSender").textContent = `From: ${email.sender}`;
  document.getElementById("emailBody").textContent = email.body;

  const attachmentBox = document.getElementById("emailAttachment");

  // Show attachment if available
  if (email.attachment) {
    let attachmentHTML = `<i class="bi bi-paperclip me-1"></i> ${email.attachment.name}`;
    if (email.attachment.preview && email.attachment.type.startsWith("image/")) {
      attachmentHTML += `<div class="mt-2"><img src="${email.attachment.preview}" alt="Attachment" class="img-fluid rounded shadow-sm" style="max-height: 300px;"></div>`;
    }
    attachmentBox.classList.remove("d-none");
    attachmentBox.innerHTML = attachmentHTML;
  } else {
    // Hide attachment box
    attachmentBox.classList.add("d-none");
    attachmentBox.innerHTML = "";
  }

  // Show/hide buttons based on whether it's in Trash
  const isTrash = email.tab === "Trash";
  document.getElementById("replyBtn").classList.toggle("d-none", isTrash);
  document.getElementById("deleteBtn").classList.toggle("d-none", isTrash);
  document.getElementById("bookmarkBtn").classList.toggle("d-none", isTrash);
  document.getElementById("restoreBtn").classList.toggle("d-none", !isTrash);
  document.getElementById("replyBox").classList.add("d-none");

  document.getElementById("emailView").classList.add("show");

  renderEmails(); // Update list highlighting
}

// Handle user change
document.getElementById("userSelect").addEventListener("change", function () {
  currentUser = this.value;
  selectedEmailId = null;
  renderEmails();
  resetEmailView();
});

// Sidebar tab navigation (desktop)
document.querySelectorAll("#sidebar .nav-link").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector("#sidebar .nav-link.active").classList.remove("active");
    btn.classList.add("active");
    currentTab = btn.dataset.tab;
    document.getElementById("tabTitle").textContent = `${currentTab}`;
    selectedEmailId = null;
    renderEmails();
    resetEmailView();
  });
});

// Sidebar tab navigation (mobile)
document.querySelectorAll("#mobileSidebar .nav-link").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".nav-link").forEach(el => el.classList.remove("active"));
    currentTab = btn.dataset.tab;
    document.getElementById("tabTitle").textContent = currentTab;
    selectedEmailId = null;
    renderEmails();
    resetEmailView();
    btn.classList.add("active");

    // Hide mobile sidebar after selection
    const offcanvas = bootstrap.Offcanvas.getInstance(document.getElementById("mobileSidebar"));
    if (offcanvas) offcanvas.hide();
  });
});

// Handle email compose form submission
document.getElementById("composeForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const to = document.getElementById("composeTo").value;
  const subject = document.getElementById("composeSubject").value;
  const body = document.getElementById("composeBody").value;
  const attachmentInput = document.getElementById("composeAttachment");
  const file = attachmentInput.files[0];

  if (to && subject && body) {
    // Create new email object
    const newEmail = {
      id: Date.now(),
      sender: currentUser,
      receiver: to,
      subject,
      body,
      tab: "Primary",
      starred: false,
    };

    // If attachment is included
    if (file) {
      newEmail.attachment = {
        name: file.name,
        type: file.type
      };

      const reader = new FileReader();
      reader.onload = function (e) {
        if (file.type.startsWith("image/")) {
          newEmail.attachment.preview = e.target.result;
        }
        emails.push(newEmail); // Add email with attachment
        renderEmails();
      };
      reader.readAsDataURL(file);
    } else {
      emails.push(newEmail); // Add email without attachment
      renderEmails();
    }

    // Reset form and close modal
    this.reset();
    bootstrap.Modal.getInstance(document.getElementById("composeModal")).hide();
  }
});

// Toggle reply box
document.getElementById("replyBtn").addEventListener("click", () => {
  const replyBox = document.getElementById("replyBox");
  replyBox.classList.toggle("d-none");
  if (!replyBox.classList.contains("d-none")) {
    replyBox.focus();
  }
});

// Move email to Trash
document.getElementById("deleteBtn").addEventListener("click", () => {
  const email = emails.find(e => e.id === selectedEmailId);
  if (email) {
    email.previousTab = email.tab;  // Save current tab
    email.tab = "Trash"; // Move to Trash
    selectedEmailId = null;
    renderEmails();
    resetEmailView();
  }
});

// Restore email from Trash
document.getElementById("restoreBtn").addEventListener("click", () => {
  const email = emails.find(e => e.id === selectedEmailId);
  if (email) {
    email.tab = email.previousTab || "Primary"; // Restore to original tab
    delete email.previousTab;
    selectedEmailId = null;
    renderEmails();
    resetEmailView();
  }
});

// Toggle bookmark (star) status
document.getElementById("bookmarkBtn").addEventListener("click", () => {
  const email = emails.find(e => e.id === selectedEmailId);
  if (email) {
    email.starred = !email.starred;
    renderEmails();
  }
});

// Reset the email view panel
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

// Toggle light/dark theme
document.getElementById("toggleTheme").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Mobile theme toggle triggers the same button
document.getElementById("toggleThemeMobile").addEventListener("click", function (e) {
  e.preventDefault();
  document.getElementById("toggleTheme").click();
});

// Initial render
renderEmails();