/* ==========================================================
   Campus Tech Fest 2026 - Registration Script
   CIT331 Web Development Assignment

   - Handles form submission with e.preventDefault()
   - Stores entries in localStorage as JSON
   - Displays saved entries dynamically in a table
   - Provides a "Clear All" button
   ========================================================== */

"use strict";

const STORAGE_KEY = "techFestRegistrations";

// ---------- DOM references ----------
const form = document.getElementById("registration-form");
const formMessage = document.getElementById("form-message");
const entriesBody = document.getElementById("entries-body");
const entryCount = document.getElementById("entry-count");
const emptyMessage = document.getElementById("empty-message");
const clearAllBtn = document.getElementById("clear-all");

// ---------- localStorage helpers ----------

/** Read all saved entries (returns an empty array if none / invalid). */
function getEntries() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    const entries = data ? JSON.parse(data) : [];
    return Array.isArray(entries) ? entries : [];
  } catch (error) {
    console.error("Could not read registrations:", error);
    return [];
  }
}

/** Save the array of entries back to localStorage as a JSON string. */
function saveEntries(entries) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    return true;
  } catch (error) {
    console.error("Could not save registrations:", error);
    return false;
  }
}

// ---------- UI helpers ----------

/** Show a success or error message below the form. */
function showMessage(text, type) {
  formMessage.textContent = text;
  formMessage.className = "form-message " + type;
}

/** Format an ISO date string for display. */
function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

/** Build a table cell with safe text content (no innerHTML = no XSS). */
function createCell(text) {
  const td = document.createElement("td");
  td.textContent = text;
  return td;
}

/** Render every saved entry as a row in the table. */
function renderEntries() {
  const entries = getEntries();
  entriesBody.innerHTML = "";

  entries.forEach(function (entry, index) {
    const row = document.createElement("tr");
    row.appendChild(createCell(index + 1));
    row.appendChild(createCell(entry.fullName));
    row.appendChild(createCell(entry.email));
    row.appendChild(createCell(entry.studentId));
    row.appendChild(createCell(entry.event));

    const timeCell = document.createElement("td");
    const time = document.createElement("time");
    time.dateTime = entry.submittedAt;
    time.textContent = formatDate(entry.submittedAt);
    timeCell.appendChild(time);
    row.appendChild(timeCell);

    entriesBody.appendChild(row);
  });

  entryCount.textContent = entries.length;
  emptyMessage.hidden = entries.length > 0;
  if (clearAllBtn) {
    clearAllBtn.disabled = entries.length === 0;
  }
}

// ---------- Validation ----------

/** Validate required fields; highlight invalid inputs. Returns true if valid. */
function validateForm(data) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const checks = [
    { id: "fullName", valid: data.fullName.length >= 2 },
    { id: "email", valid: emailPattern.test(data.email) },
    { id: "studentId", valid: data.studentId.length > 0 },
    { id: "event", valid: data.event.length > 0 }
  ];

  let isValid = true;
  checks.forEach(function (check) {
    const field = document.getElementById(check.id);
    field.classList.toggle("input-error", !check.valid);
    if (!check.valid) {
      isValid = false;
    }
  });
  return isValid;
}

// ---------- Form submission ----------

form.addEventListener("submit", function (e) {
  // Stop the browser from reloading the page
  e.preventDefault();

  const entry = {
    fullName: form.fullName.value.trim(),
    email: form.email.value.trim(),
    studentId: form.studentId.value.trim(),
    event: form.event.value,
    comments: form.comments.value.trim(),
    submittedAt: new Date().toISOString()
  };

  if (!validateForm(entry)) {
    showMessage("Please fill in all required fields correctly.", "error");
    return;
  }

  const entries = getEntries();
  entries.push(entry);

  if (saveEntries(entries)) {
    showMessage("Thank you, " + entry.fullName + "! Your registration was saved.", "success");
    form.reset();
    renderEntries();
  } else {
    showMessage("Sorry, your registration could not be saved in this browser.", "error");
  }
});

// Remove the red error border as soon as the user edits a field
form.addEventListener("input", function (e) {
  e.target.classList.remove("input-error");
});

// Show any previously saved entries when the page loads
renderEntries();
