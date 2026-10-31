# Website CV Pribadi — Ahmad Rizqi Maulana

Proyek aplikasi web Curriculum Vitae (CV) pribadi yang interaktif, modern, responsif, dan terintegrasi dengan backend server. Dibuat oleh **Ahmad Rizqi Maulana**, Mahasiswa S1 Teknik Informatika Universitas Muhammadiyah Malang (UMM).

---

## 👤 Profil Singkat
- **Nama Lengkap:** Ahmad Rizqi Maulana
- **Pendidikan Terkini:** S1 Teknik Informatika — Universitas Muhammadiyah Malang (Masuk 2024 — Sekarang)
- **Pendidikan Terakhir:** SMK Negeri 1 Wadeng (Masuk 2021 — Lulus 2024)
- **Pengalaman:** Magang Industri di PT. Eastern Logistik (Agustus 2022 — Februari 2023 / 6 Bulan)
- **Nomor Telepon / WhatsApp:** 085337659146
- **Email Kampus:** ahmadrizqimaulanaa@webmail.umm.ac.id
- **LinkedIn:** [Ahmad Rizqi Maulana](https://www.linkedin.com/in/ahmad-rizqi-maulana-8b0a80327?utm_source=share_via&utm_content=profile&utm_medium=member_android)

---

## 📋 Pemenuhan Rubrik Penilaian

| No | Kriteria Rubrik | Bobot | Implementasi & Fitur Utama |
|---|---|:---:|---|
| **1** | **HTML** | **30%** | • Struktur semantik penuh: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`, `<figure>`, `<figcaption>`, `<time>`, `<meter>`, `<dl>`, `<dt>`, `<dd>`, `<ol>`, `<li>`.<br>• Aksesibilitas WCAG (atribut `aria-label`, `aria-expanded`, `aria-controls`, `role`, hierarki heading `h1`–`h3`).<br>• Formulir kontak berstandar dengan `<form>`, `<label>`, serta atribut validasi bawaan (`required`, `minlength`, tipe `email`, autocomplete).<br>• Meta tag lengkap: Viewport responsif, SEO description, Open Graph, dan Favicon SVG. |
| **2** | **CSS** | **30%** | • Desain responsif (*mobile-first* ke layar lebar) menggunakan kombinasi **CSS Grid** & **Flexbox**.<br>• Sistem variabel warna & tipografi (*CSS Custom Properties*) dengan dukungan penuh **Mode Gelap / Mode Terang (*Dark/Light Mode*)**.<br>• Animasi & interaksi mikro: *Pulse status dot*, *hover elevation*, *typing cursor*, dan *scroll reveal*.<br>• **Stylesheets Khusus Cetak (`css/print.css`)**: Ketika menekan tombol *"Cetak CV"* atau `Ctrl + P`, tampilan web secara otomatis berubah menjadi format resume A4 profesional hitam-putih yang rapi untuk evaluasi/HRD. |
| **3** | **JavaScript** | **20%** | • JavaScript murni modern (ES6+) tanpa ketergantungan library luar yang berat (*Vanilla JS*).<br>• **Pengubah Tema (*Theme Switcher*)**: Mengingat preferensi di `localStorage` dan sinkron dengan pengaturan sistem OS.<br>• **Interaktivitas Tab Timeline**: Menyaring riwayat secara interaktif antara *"Pengalaman Magang"* dan *"Pendidikan Formal"*.<br>• **Validasi & AJAX Fetch**: Validasi interaktif formulir kontak *real-time* dan pengiriman asinkron ke API backend dengan umpan balik status sukses/gagal.<br>• **Fitur Tambahan**: Efek mengetik otomatis (*typewriter*), *scroll spy* aktif pada navbar, tombol kembali ke atas (*back-to-top*), menu hamburger seluler. |
| **4** | **Bahasa Pemrograman Lain** | **10%** | • **PHP Backend (`api/contact.php` & `api/data.php`)**:<br>&nbsp;&nbsp;- Menangani request `POST` formulir kontak.<br>&nbsp;&nbsp;- Validasi dan sanitasi input (`htmlspecialchars`, `filter_var`).<br>&nbsp;&nbsp;- Menyimpan pesan secara persisten ke berkas `data/messages.json`.<br>&nbsp;&nbsp;- Mengembalikan respons JSON terstruktur dengan HTTP Status Code yang tepat.<br>• **Alternatif Node.js Backend (`server.js`)**: Tersedia server native HTTP Node.js lengkap dengan penanganan API yang sama tanpa dependensi eksternal. |
| **5** | **Development** | **10%** | • Struktur folder modular dan rapi (`css/`, `js/`, `api/`, `data/`, `assets/`).<br>• Konfigurasi `package.json` dengan scripts otomasi (`npm start`, `npm run serve:php`, `npm test`).<br>• Berkas `.gitignore` standar dan riwayat repositori Git aktif.<br>• Detektor otomatis backend engine di bagian footer.<br>• Dokumentasi panduan instalasi dan penggunaan yang lengkap. |

---

## 📂 Struktur Proyek

```text
WEB tugas/
├── index.html              # Halaman utama dengan HTML5 Semantik
├── local-server.js         # Backend server lokal menggunakan Node.js
├── package.json            # Konfigurasi proyek & skrip npm
├── .gitignore              # Pengecualian berkas git
├── README.md               # Dokumentasi proyek lengkap
│
├── css/
│   ├── style.css           # Variabel global, reset CSS, tipografi, utility grid/flex
│   ├── components.css      # Komponen UI: Navbar, Hero, Kartu, Form, Profil
│   ├── animations.css      # Keyframes, transisi hover, dan kelas scroll reveal
│   └── print.css           # Styling khusus cetak resume / ekspor PDF (A4)
│
├── js/
│   ├── theme.js            # Logika Dark/Light mode dengan localStorage
│   ├── filter.js           # Interaktivitas tab timeline
│   ├── contact.js          # Validasi formulir kontak & pengiriman AJAX Fetch API
│   └── main.js             # Efek typewriter, menu mobile, scroll spy, deteksi server
│
├── api/
│   ├── contact.php         # Endpoint PHP untuk validasi dan penyimpanan pesan kontak
│   └── data.php            # Endpoint PHP penyedia data profil CV dan riwayat
│
├── data/
│   └── messages.json       # Database berbasis file JSON untuk menyimpan pesan kontak
│
└── assets/
    └── profile.jpg         # Foto profil asli Ahmad Rizqi Maulana (Jas Merah UMM)
```

---

## 🚀 Cara Menjalankan Proyek

### Opsi 1: Menggunakan Node.js (Rekomendasi Cepat)
```bash
npm start
```
Buka browser pada alamat: **`http://localhost:3000`**

---

### Opsi 2: Menggunakan Server PHP Built-in
```bash
npm run serve:php
# atau langsung:
php -S localhost:8000
```
Buka browser pada alamat: **`http://localhost:8000`**

---

### Opsi 3: Membuka Langsung di Browser (File Standalone)
Klik dua kali berkas **`index.html`** langsung di peramban favorit Anda (Chrome, Edge, Firefox).
> *Catatan:* Formulir kontak secara cerdas mendeteksi mode offline dan menyimpan pesan secara lokal (*localStorage*) jika server backend sedang tidak dijalankan.
