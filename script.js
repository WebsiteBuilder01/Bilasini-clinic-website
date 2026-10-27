
"use strict";

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    menuToggle.textContent = "☰";
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

// Do not allow appointment dates in the past.
const visitDate = document.getElementById("visitDate");
const today = new Date();
const localToday = [
  today.getFullYear(),
  String(today.getMonth() + 1).padStart(2, "0"),
  String(today.getDate()).padStart(2, "0")
].join("-");
visitDate.min = localToday;

document.getElementById("appointmentForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("patientName").value.trim();
  const phone = document.getElementById("patientPhone").value.trim();
  const date = visitDate.value;
  const type = document.getElementById("visitType").value;

  if (!name || !phone || !date || !type) {
    alert("Please complete all fields.");
    return;
  }

  if (date < localToday) {
    alert("Please select today or a future date.");
    visitDate.focus();
    return;
  }

  const message = [
    "Hello BILASINI Medical Stores & Multispeciality Clinic,",
    "",
    "I would like to request an appointment / enquiry.",
    "Name: " + name,
    "Contact number: " + phone,
    "Preferred date: " + date,
    "Enquiry type: " + type,
    "",
    "Please confirm availability. Thank you."
  ].join("\n");

  const whatsappURL = "https://wa.me/917002910989?text=" + encodeURIComponent(message);
  window.open(whatsappURL, "_blank", "noopener,noreferrer");
});
