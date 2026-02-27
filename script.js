// 1. Inisialisasi Variabel
let slideIdx = 0;
const track = document.getElementById('track');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;

// 2. Fungsi Utama untuk Menggeser Carousel
function updateCarousel() {
  // Menghitung berapa persen track harus bergeser ke kiri
  // Slide 0 = 0%, Slide 1 = -100%, Slide 2 = -200%, dst.
  const offset = -slideIdx * 100;
  track.style.transform = `translateX(${offset}%)`;

  // Update status aktif pada titik indikator (dots)
  dots.forEach((dot, index) => {
    if (index === slideIdx) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

window.onload = function() {
    const overlay = document.getElementById('popup-overlay');
    const closeBtn = document.getElementById('close-btn');

    // Munculkan setelah 1.5 detik
    setTimeout(() => {
        overlay.classList.add('show');
    }, 1500);

    // Fungsi tutup
    closeBtn.onclick = function() {
        overlay.classList.remove('show');
    };

    // Tutup juga jika user klik di luar area gambar (di area hitam)
    window.onclick = function(event) {
        if (event.target == overlay) {
            overlay.classList.remove('show');
        }
    };
};

// 4. Fungsi untuk Navigasi Titik Indikator
function currentSlide(n) {
  slideIdx = n;
  updateCarousel();
  resetTimer();
}

// 5. Pengaturan Autoplay (5 Detik)
let autoPlayTimer = setInterval(() => {
  changeSlide(1);
}, 5000);

// Fungsi untuk meriset timer supaya gerakan otomatis tidak bentrok dengan klik manual
function resetTimer() {
  clearInterval(autoPlayTimer);
  autoPlayTimer = setInterval(() => {
    changeSlide(1);
  }, 3000);
}

// 6. Opsional: Berhenti Berjalan saat Mouse di Atas Gambar (Pause on Hover)
const carouselBox = document.querySelector('.carousel-box');

carouselBox.addEventListener('mouseenter', () => {
  clearInterval(autoPlayTimer);
});

carouselBox.addEventListener('mouseleave', () => {
  resetTimer();
});

// Inisialisasi tampilan pertama kali
updateCarousel();