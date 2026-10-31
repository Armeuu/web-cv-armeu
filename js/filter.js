/**
 * ====================================================================
 * CV Pribadi - Rizqi Maulana
 * File: js/filter.js
 * Rubrik: 20% JS (Filter Proyek, Modal Dialog, Interaktivitas Tab)
 * ====================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ------------------------------------------------------------------
  // 1. Data Proyek untuk Modal Detail
  // ------------------------------------------------------------------
  const projectDetails = {
    'proj-1': {
      title: 'Sistem Informasi Akademik & Portofolio Siswa',
      category: 'Web App',
      description: 'Aplikasi web komprehensif untuk pengelolaan data akademik, presensi online, dan penilaian tugas terintegrasi dengan dashboard analitik performa mahasiswa/siswa.',
      features: [
        'Autentikasi role-based (Admin, Dosen/Guru, Mahasiswa)',
        'Dashboard analitik dengan visualisasi grafik nilai',
        'Export laporan akademik ke format PDF dan Excel',
        'RESTful API terintegrasi untuk integrasi mobile'
      ],
      techStack: ['HTML5', 'CSS3 / Tailwind', 'JavaScript ES6', 'PHP / MySQL', 'Chart.js'],
      demoUrl: '#',
      repoUrl: 'https://github.com/rizqimaulana'
    },
    'proj-2': {
      title: 'RESTful E-Commerce API & Payment Gateway',
      category: 'Backend / API',
      description: 'Layanan backend berkinerja tinggi untuk platform belanja online dengan manajemen katalog produk, keranjang belanja, integrasi simulasi payment gateway, dan sistem notifikasi.',
      features: [
        'Arsitektur RESTful API dengan format JSON standar',
        'Keamanan berbasis JWT (JSON Web Token) dan rate limiting',
        'Validasi data input yang ketat & enkripsi kata sandi',
        'Dokumentasi interaktif OpenAPI / Swagger'
      ],
      techStack: ['Node.js', 'Express', 'PHP 8', 'MySQL / SQLite', 'JWT Auth'],
      demoUrl: '#',
      repoUrl: 'https://github.com/rizqimaulana'
    },
    'proj-3': {
      title: 'Aplikasi Manajemen Keuangan Pribadi (FinTrack)',
      category: 'Web App',
      description: 'Aplikasi web pencatatan pemasukan dan pengeluaran harian dengan visualisasi alokasi budget, peringatan batas pengeluaran, dan kalkulator tabungan impian.',
      features: [
        'Pencatatan transaksi cepat dengan kategorisasi otomatis',
        'Diagram interaktif arus kas bulanan & pie chart pengeluaran',
        'Penyimpanan lokal offline-first (IndexedDB / LocalStorage)',
        'Mode gelap/terang adaptif'
      ],
      techStack: ['HTML5', 'CSS Grid & Flexbox', 'JavaScript', 'Chart.js'],
      demoUrl: '#',
      repoUrl: 'https://github.com/rizqimaulana'
    },
    'proj-4': {
      title: 'Desain Sistem & UI Kit Aplikasi Mobile Kesehatan',
      category: 'UI/UX Design',
      description: 'Perancangan antarmuka pengguna (UI/UX) untuk aplikasi telemedisin dan reservasi klinik dokter dengan memprioritaskan kemudahan aksesibilitas (WCAG AA).',
      features: [
        'User Journey Mapping & Wireframing',
        'High-Fidelity Interactive Prototype',
        'Komponen UI Kit yang dapat digunakan kembali',
        'Desain responsif untuk berbagai ukuran layar smartphone'
      ],
      techStack: ['Figma', 'CSS Modern', 'Design System', 'Accessibility WCAG'],
      demoUrl: '#',
      repoUrl: 'https://github.com/rizqimaulana'
    },
    'proj-5': {
      title: 'Smart Task & Project Management Kanban',
      category: 'Web App',
      description: 'Papan Kanban interaktif untuk kolaborasi tim dan pelacakan progres tugas dengan fitur drag and drop alami tanpa library pihak ketiga yang berat.',
      features: [
        'Interaksi Drag and Drop menggunakan HTML5 Drag API',
        'Label prioritas warna-warni dan filter pencarian cepat',
        'Export / Import data tugas ke file JSON',
        'Simpan riwayat perubahan secara otomatis'
      ],
      techStack: ['HTML5 Drag API', 'Modern CSS', 'JavaScript ES6+', 'LocalStorage'],
      demoUrl: '#',
      repoUrl: 'https://github.com/rizqimaulana'
    },
    'proj-6': {
      title: 'Portal Berita & Edukasi Teknologi Responsif',
      category: 'Web App',
      description: 'Website portal berita artikel teknologi modern dengan pengoptimalan SEO, kecepatan muat halaman tinggi (Core Web Vitals), dan pembaca ramah mata.',
      features: [
        'Struktur semantik HTML5 ramah mesin pencari (SEO)',
        'Performa skor Google PageSpeed di atas 95',
        'Fitur pencarian live search dan bookmark artikel favorit',
        'Dukungan PWA (Progressive Web App) sederhana'
      ],
      techStack: ['HTML5 Semantics', 'CSS Custom Properties', 'Vanilla JS', 'PHP Backend'],
      demoUrl: '#',
      repoUrl: 'https://github.com/rizqimaulana'
    }
  };

  // ------------------------------------------------------------------
  // 2. Logika Filter Proyek
  // ------------------------------------------------------------------
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Hapus kelas aktif dari seluruh tombol filter
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // ------------------------------------------------------------------
  // 3. Modal Detail Proyek (<dialog>)
  // ------------------------------------------------------------------
  const modal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalFooterCloseBtn = document.getElementById('modal-footer-close');
  const detailButtons = document.querySelectorAll('.btn-view-detail');

  function openProjectModal(projectId) {
    const data = projectDetails[projectId];
    if (!data || !modal) return;

    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-category').textContent = data.category;
    document.getElementById('modal-description').textContent = data.description;

    // Render daftar fitur
    const featuresList = document.getElementById('modal-features');
    featuresList.innerHTML = '';
    data.features.forEach(feat => {
      const li = document.createElement('li');
      li.textContent = feat;
      featuresList.appendChild(li);
    });

    // Render teknologi
    const techContainer = document.getElementById('modal-tech-stack');
    techContainer.innerHTML = '';
    data.techStack.forEach(tech => {
      const span = document.createElement('span');
      span.className = 'badge';
      span.textContent = tech;
      techContainer.appendChild(span);
    });

    // Set Tautan Demo & Repo
    const liveDemoLink = document.getElementById('modal-live-link');
    const repoLink = document.getElementById('modal-repo-link');
    if (liveDemoLink) liveDemoLink.href = data.demoUrl;
    if (repoLink) repoLink.href = data.repoUrl;

    if (typeof modal.showModal === 'function') {
      modal.showModal();
    } else {
      modal.setAttribute('open', '');
    }
  }

  function closeModal() {
    if (typeof modal.close === 'function') {
      modal.close();
    } else {
      modal.removeAttribute('open');
    }
  }

  detailButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.project-card');
      if (card) {
        const projectId = card.getAttribute('data-project-id');
        openProjectModal(projectId);
      }
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalFooterCloseBtn) modalFooterCloseBtn.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      // Tutup jika mengklik latar belakang backdrop di luar kotak dialog
      const rect = modal.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        closeModal();
      }
    });
  }

  // ------------------------------------------------------------------
  // 4. Tab Pengalaman vs Pendidikan
  // ------------------------------------------------------------------
  const tabButtons = document.querySelectorAll('.tab-btn');
  const timelineSections = document.querySelectorAll('.timeline-group');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetId = btn.getAttribute('data-target');
      timelineSections.forEach(section => {
        if (targetId === 'all' || section.id === targetId) {
          section.style.display = 'block';
        } else {
          section.style.display = 'none';
        }
      });
    });
  });
});
