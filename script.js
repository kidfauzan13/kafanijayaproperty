/*
  GANTI dengan nomor WhatsApp bisnis kamu.
  Format Indonesia: 628xxxxxxxxxx
  Jangan gunakan tanda +, spasi, atau angka 0 di awal.
*/
const WHATSAPP_NUMBER = "6289687623476";

const WHATSAPP_MESSAGE =
  "Halo Kafani Jaya Property, saya ingin konsultasi mengenai proyek pembangunan.";

const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

// Semua tombol WhatsApp menggunakan nomor yang sama
document.querySelectorAll(".wa-link").forEach((link) => {
  link.href = waUrl;
});

// Menu mobile
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

function closeMenu() {
  navMenu.classList.remove("active");
  menuToggle.textContent = "☰";
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Buka menu");
}

menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("active");

  menuToggle.textContent = isOpen ? "✕" : "☰";
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Tutup menu" : "Buka menu");
});

// Tutup menu setelah tautan navigasi dipilih
navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

// Reset menu ketika kembali ke desktop
window.addEventListener("resize", () => {
  if (window.innerWidth > 980) {
    closeMenu();
  }
});

const servicePreview = document.getElementById("servicePreview");
const previewImage = document.getElementById("servicePreviewImage");
const previewLabel = document.getElementById("servicePreviewLabel");
const servicesSection = document.querySelector(".services-section");

const serviceImages = {
  "Bangun Rumah": {
    image: "bangunRumah.jpg",
    label: "BANGUN RUMAH",
  },
  "Renovasi Rumah": {
    image: "renovasiRumah.jpeg",
    label: "RENOVASI RUMAH",
  },
  "Bangun Kost": {
    image: "kost.jpeg",
    label: "BANGUN KOST",
  },
  "Kantor & Ruko": {
    image: "fotoKantor.png",
    label: "KANTOR & RUKO",
  },
};

document.querySelectorAll(".service-row").forEach((row) => {
  row.addEventListener("mouseenter", () => {
    const title = row.querySelector("h3")?.textContent.trim();
    const service = serviceImages[title];

    if (!service || !servicesSection) return;

    previewImage.src = service.image;
    previewImage.alt = service.label;
    previewLabel.textContent = service.label;

    // Hitung posisi baris terhadap section layanan
    const rowRect = row.getBoundingClientRect();
    const sectionRect = servicesSection.getBoundingClientRect();

    const top = rowRect.top - sectionRect.top + rowRect.height / 2 - 95;

    // Popup mengikuti baris yang sedang di-hover
    servicePreview.style.top = `${top}px`;
    servicePreview.style.left = "45%";

    servicePreview.classList.add("is-visible");
  });

  row.addEventListener("mouseleave", () => {
    servicePreview.classList.remove("is-visible");
  });
});

/* ANIMASI GARIS TIMELINE SAAT SCROLL */

const processSection = document.querySelector(".process-section");
const processTimeline = document.querySelector(".process-timeline");
const timelineProgress = document.getElementById("timelineProgress");
const processSteps = document.querySelectorAll(".process-step");

function updateProcessTimeline() {
  if (!processSection || !processTimeline || !timelineProgress) {
    return;
  }

  const sectionRect = processSection.getBoundingClientRect();
  const timelineRect = processTimeline.getBoundingClientRect();

  // Posisi scroll ketika section mulai masuk ke layar
  const start = window.innerHeight * 0.65;

  // Garis terisi saat pengguna menggulir melewati section
  const distance = start - timelineRect.top;
  const totalHeight = processTimeline.offsetHeight;

  const progress = Math.max(0, Math.min(1, distance / totalHeight));

  timelineProgress.style.height = `${progress * 100}%`;

  // Aktifkan langkah sesuai posisi scroll
  processSteps.forEach((step) => {
    const stepRect = step.getBoundingClientRect();
    const stepPoint = stepRect.top + stepRect.height * 0.35;

    step.classList.toggle("is-active", stepPoint < window.innerHeight * 0.62);
  });
}

window.addEventListener("scroll", updateProcessTimeline, {
  passive: true,
});

window.addEventListener("resize", updateProcessTimeline);

updateProcessTimeline();

document.addEventListener("DOMContentLoaded", function () {
  const slider = document.getElementById("buildingArea");
  const areaValue = document.getElementById("areaValue");
  const estimateTotal = document.getElementById("estimateTotal");
  const estimateDescription = document.getElementById("estimateDescription");
  const estimateWhatsApp = document.getElementById("estimateWhatsApp");

  const PRICE_PER_M2 = 4500000;

  if (
    !slider ||
    !areaValue ||
    !estimateTotal ||
    !estimateDescription ||
    !estimateWhatsApp
  ) {
    return;
  }

  function rupiah(angka) {
    return "Rp" + angka.toLocaleString("id-ID");
  }

  function updateEstimate() {
    const luas = Number(slider.value);
    const total = luas * PRICE_PER_M2;

    areaValue.textContent = luas;
    estimateTotal.textContent = rupiah(total);

    estimateDescription.textContent = `${luas} m² × ${rupiah(PRICE_PER_M2)} — belum termasuk kondisi khusus lokasi.`;

    const min = Number(slider.min);
    const max = Number(slider.max);
    const persen = ((luas - min) / (max - min)) * 100;

    slider.style.background = `linear-gradient(
        to right,
        #45c5f4 0%,
        #45c5f4 ${persen}%,
        #173c5b ${persen}%,
        #173c5b 100%
      )`;

    const pesan =
      `Halo Kafani Jaya Property, saya ingin konsultasi estimasi biaya pembangunan.\n\n` +
      `Luas bangunan: ${luas} m²\n` +
      `Harga per m²: ${rupiah(PRICE_PER_M2)}\n` +
      `Estimasi biaya: ${rupiah(total)}\n\n` +
      `Mohon informasi lebih lanjut mengenai survey dan RAB.`;

    estimateWhatsApp.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(pesan)}`;
  }

  slider.addEventListener("input", updateEstimate);
  slider.addEventListener("change", updateEstimate);

  updateEstimate();
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");

  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nama = document.getElementById("contactName").value.trim();
    const nomor = document.getElementById("contactPhone").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const layanan = document.getElementById("contactService").value;
    const lokasi = document.getElementById("contactLocation").value.trim();
    const kebutuhan = document.getElementById("contactMessage").value.trim();

    const pesan = [
      "Halo Kafani Jaya Property, saya ingin konsultasi.",
      "",
      `Nama: ${nama}`,
      `Nomor WhatsApp: ${nomor}`,
      `Email: ${email || "-"}`,
      `Layanan: ${layanan}`,
      `Lokasi proyek: ${lokasi || "-"}`,
      `Kebutuhan: ${kebutuhan || "-"}`,
      "",
      "Mohon informasi lebih lanjut. Terima kasih.",
    ].join("\n");

    // Memakai konstanta WHATSAPP_NUMBER di atas (0896-8762-3476)
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(pesan)}`;

    window.open(url, "_blank", "noopener");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const yearElement = document.getElementById("footerYear");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
/* DROPDOWN LAYANAN */
const dropdown = document.querySelector(".nav-dropdown");
const dropdownToggle = document.querySelector(".nav-dropdown-toggle");

function closeDropdown() {
  if (!dropdown || !dropdownToggle) return;
  dropdown.classList.remove("open");
  dropdownToggle.setAttribute("aria-expanded", "false");
}

if (dropdown && dropdownToggle) {
  // Klik tombol "Layanan" → buka/tutup
  dropdownToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const isOpen = dropdown.classList.toggle("open");
    dropdownToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Klik di luar dropdown → tutup
  document.addEventListener("click", (event) => {
    if (!dropdown.contains(event.target)) closeDropdown();
  });

  // Tekan Esc → tutup
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeDropdown();
  });

  // Pilih salah satu tautan di dalamnya → tutup
  dropdown.querySelectorAll(".nav-dropdown-menu a").forEach((link) => {
    link.addEventListener("click", closeDropdown);
  });
}
