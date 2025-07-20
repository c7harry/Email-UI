// Set the current user and initial tab
let currentUser = "Alice";
let currentTab = "Primary";
let selectedEmailId = null;

// Sample email data
const emails = [
  // Alice's inbox
  { id: 1, sender: "Bob", receiver: "Alice", subject: "Meeting Reminder", body: "Don't forget our meeting tomorrow.", tab: "Primary", starred: false },
  { id: 2, sender: "Carol", receiver: "Alice", subject: "Lunch?", body: "Want to get lunch next week?", tab: "Primary", starred: false },
  { id: 3, sender: "System", receiver: "Alice", subject: "Welcome!", body: "Welcome to your new email account.", tab: "Primary", starred: false },
  { id: 4, sender: "Alice", receiver: "Alice", subject: "Test Email", body: "This is a test email to yourself.", tab: "Primary", starred: false },
  { id: 5, sender: "LinkedIn", receiver: "Alice", subject: "New Connection", body: "Someone wants to connect.", tab: "Social", starred: false },
  { id: 6, sender: "Facebook", receiver: "Alice", subject: "Friend Request", body: "You have a new friend request.", tab: "Social", starred: false },
  { id: 7, sender: "Twitter", receiver: "Alice", subject: "Mentioned You", body: "You were mentioned in a tweet.", tab: "Social", starred: false },
  { id: 8, sender: "Instagram", receiver: "Alice", subject: "New Follower", body: "You have a new follower.", tab: "Social", starred: false },
  { id: 9, sender: "Amazon", receiver: "Alice", subject: "Order Shipped", body: "Your order has been shipped.", tab: "Promotions", starred: false },
  { id: 10, sender: "eBay", receiver: "Alice", subject: "Auction Won", body: "You won an auction!", tab: "Promotions", starred: false },
  { id: 11, sender: "Target", receiver: "Alice", subject: "Weekly Deals", body: "Check out this week's deals.", tab: "Promotions", starred: false },
  { id: 12, sender: "Walmart", receiver: "Alice", subject: "Rollback Savings", body: "Save more with rollback prices.", tab: "Promotions", starred: false },
  { id: 13, sender: "System", receiver: "Alice", subject: "Password Changed", body: "Your password was updated.", tab: "Updates", starred: false },
  { id: 14, sender: "System", receiver: "Alice", subject: "Account Notice", body: "Your account was accessed from a new device.", tab: "Updates", starred: false },
  { id: 15, sender: "System", receiver: "Alice", subject: "Maintenance Scheduled", body: "Scheduled maintenance this weekend.", tab: "Updates", starred: false },
  { id: 16, sender: "System", receiver: "Alice", subject: "Security Alert", body: "Suspicious login detected.", tab: "Updates", starred: false },
  { id: 17, sender: "SpamCo", receiver: "Alice", subject: "Win Big Now!", body: "Click to claim your prize!", tab: "Spam", starred: false },
  { id: 18, sender: "Lottery", receiver: "Alice", subject: "You Won!", body: "Claim your lottery winnings.", tab: "Spam", starred: false },
  { id: 19, sender: "FakeBank", receiver: "Alice", subject: "Account Locked", body: "Reset your password now!", tab: "Spam", starred: false },
  { id: 20, sender: "SpamCo", receiver: "Alice", subject: "Exclusive Offer", body: "Don't miss out on this deal!", tab: "Spam", starred: false },
  { id: 21, sender: "Carol", receiver: "Alice", subject: "Lunch?", body: "Want to get lunch next week?", tab: "Bookmarks", starred: true },
  { id: 22, sender: "Bob", receiver: "Alice", subject: "Coffee Break", body: "Let's grab coffee soon!", tab: "Bookmarks", starred: true },
  { id: 23, sender: "Alice", receiver: "Alice", subject: "Saved Email", body: "This is a bookmarked email.", tab: "Bookmarks", starred: true },
  { id: 24, sender: "System", receiver: "Alice", subject: "Important Notice", body: "This is a starred update.", tab: "Bookmarks", starred: true },

  // Bob's inbox
  { id: 25, sender: "Alice", receiver: "Bob", subject: "Project Update", body: "The project is on track for next week.", tab: "Primary", starred: false },
  { id: 26, sender: "Carol", receiver: "Bob", subject: "Birthday Party", body: "Are you coming to my birthday party?", tab: "Primary", starred: false },
  { id: 27, sender: "System", receiver: "Bob", subject: "Welcome!", body: "Welcome to your new email account.", tab: "Primary", starred: false },
  { id: 28, sender: "Bob", receiver: "Bob", subject: "Test Email", body: "This is a test email to yourself.", tab: "Primary", starred: false },
  { id: 29, sender: "LinkedIn", receiver: "Bob", subject: "New Connection", body: "Someone wants to connect.", tab: "Social", starred: false },
  { id: 30, sender: "Facebook", receiver: "Bob", subject: "Friend Request", body: "You have a new friend request.", tab: "Social", starred: false },
  { id: 31, sender: "Twitter", receiver: "Bob", subject: "Mentioned You", body: "You were mentioned in a tweet.", tab: "Social", starred: false },
  { id: 32, sender: "Instagram", receiver: "Bob", subject: "New Follower", body: "You have a new follower.", tab: "Social", starred: false },
  { id: 33, sender: "Amazon", receiver: "Bob", subject: "Your Invoice", body: "Your invoice for last month is attached.", tab: "Promotions", starred: false },
  { id: 34, sender: "eBay", receiver: "Bob", subject: "Auction Won", body: "You won an auction!", tab: "Promotions", starred: false },
  { id: 35, sender: "Target", receiver: "Bob", subject: "Weekly Deals", body: "Check out this week's deals.", tab: "Promotions", starred: false },
  { id: 36, sender: "Walmart", receiver: "Bob", subject: "Rollback Savings", body: "Save more with rollback prices.", tab: "Promotions", starred: false },
  { id: 37, sender: "System", receiver: "Bob", subject: "Security Alert", body: "A new login to your account was detected.", tab: "Updates", starred: false },
  { id: 38, sender: "System", receiver: "Bob", subject: "Account Notice", body: "Your account was accessed from a new device.", tab: "Updates", starred: false },
  { id: 39, sender: "System", receiver: "Bob", subject: "Maintenance Scheduled", body: "Scheduled maintenance this weekend.", tab: "Updates", starred: false },
  { id: 40, sender: "System", receiver: "Bob", subject: "Password Changed", body: "Your password was updated.", tab: "Updates", starred: false },
  { id: 41, sender: "SpamCo", receiver: "Bob", subject: "Congratulations!", body: "You've won a free cruise!", tab: "Spam", starred: false },
  { id: 42, sender: "Lottery", receiver: "Bob", subject: "You Won!", body: "Claim your lottery winnings.", tab: "Spam", starred: false },
  { id: 43, sender: "FakeBank", receiver: "Bob", subject: "Account Locked", body: "Reset your password now!", tab: "Spam", starred: false },
  { id: 44, sender: "SpamCo", receiver: "Bob", subject: "Exclusive Offer", body: "Don't miss out on this deal!", tab: "Spam", starred: false },
  { id: 45, sender: "Alice", receiver: "Bob", subject: "Coffee Break", body: "Want to grab coffee later?", tab: "Bookmarks", starred: true },
  { id: 46, sender: "Carol", receiver: "Bob", subject: "Saved Email", body: "This is a bookmarked email.", tab: "Bookmarks", starred: true },
  { id: 47, sender: "System", receiver: "Bob", subject: "Important Notice", body: "This is a starred update.", tab: "Bookmarks", starred: true },
  { id: 48, sender: "Bob", receiver: "Bob", subject: "Bookmarked Email", body: "This is a bookmarked email to yourself.", tab: "Bookmarks", starred: true },

  // Carol's inbox
  { id: 49, sender: "Bob", receiver: "Carol", subject: "New Tasks", body: "Please check your new assignments.", tab: "Primary", starred: false },
  { id: 50, sender: "Alice", receiver: "Carol", subject: "Dinner Plans", body: "Let's have dinner this weekend.", tab: "Primary", starred: false },
  { id: 51, sender: "System", receiver: "Carol", subject: "Welcome!", body: "Welcome to your new email account.", tab: "Primary", starred: false },
  { id: 52, sender: "Carol", receiver: "Carol", subject: "Test Email", body: "This is a test email to yourself.", tab: "Primary", starred: false },
  { id: 53, sender: "LinkedIn", receiver: "Carol", subject: "New Connection", body: "Someone wants to connect.", tab: "Social", starred: false },
  { id: 54, sender: "Facebook", receiver: "Carol", subject: "Friend Request", body: "You have a new friend request.", tab: "Social", starred: false },
  { id: 55, sender: "Twitter", receiver: "Carol", subject: "Mentioned You", body: "You were mentioned in a tweet.", tab: "Social", starred: false },
  { id: 56, sender: "Instagram", receiver: "Carol", subject: "New Follower", body: "You have a new follower.", tab: "Social", starred: false },
  { id: 57, sender: "Amazon", receiver: "Carol", subject: "Special Offer", body: "Save 20% on your next purchase!", tab: "Promotions", starred: false },
  { id: 58, sender: "eBay", receiver: "Carol", subject: "Auction Won", body: "You won an auction!", tab: "Promotions", starred: false },
  { id: 59, sender: "Target", receiver: "Carol", subject: "Weekly Deals", body: "Check out this week's deals.", tab: "Promotions", starred: false },
  { id: 60, sender: "Walmart", receiver: "Carol", subject: "Rollback Savings", body: "Save more with rollback prices.", tab: "Promotions", starred: false },
  { id: 61, sender: "System", receiver: "Carol", subject: "Account Updated", body: "Your account information has been updated.", tab: "Updates", starred: false },
  { id: 62, sender: "System", receiver: "Carol", subject: "Security Alert", body: "A new login to your account was detected.", tab: "Updates", starred: false },
  { id: 63, sender: "System", receiver: "Carol", subject: "Maintenance Scheduled", body: "Scheduled maintenance this weekend.", tab: "Updates", starred: false },
  { id: 64, sender: "System", receiver: "Carol", subject: "Password Changed", body: "Your password was updated.", tab: "Updates", starred: false },
  { id: 65, sender: "SpamCo", receiver: "Carol", subject: "Act Now!", body: "Limited time offer just for you!", tab: "Spam", starred: false },
  { id: 66, sender: "Lottery", receiver: "Carol", subject: "You Won!", body: "Claim your lottery winnings.", tab: "Spam", starred: false },
  { id: 67, sender: "FakeBank", receiver: "Carol", subject: "Account Locked", body: "Reset your password now!", tab: "Spam", starred: false },
  { id: 68, sender: "SpamCo", receiver: "Carol", subject: "Exclusive Offer", body: "Don't miss out on this deal!", tab: "Spam", starred: false },
  { id: 69, sender: "Bob", receiver: "Carol", subject: "Book Recommendation", body: "You should read this new book!", tab: "Bookmarks", starred: true },
  { id: 70, sender: "Alice", receiver: "Carol", subject: "Saved Email", body: "This is a bookmarked email.", tab: "Bookmarks", starred: true },
  { id: 71, sender: "System", receiver: "Carol", subject: "Important Notice", body: "This is a starred update.", tab: "Bookmarks", starred: true },
  { id: 72, sender: "Carol", receiver: "Carol", subject: "Bookmarked Email", body: "This is a bookmarked email to yourself.", tab: "Bookmarks", starred: true }
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