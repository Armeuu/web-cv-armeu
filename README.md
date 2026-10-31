# Website CV & Portofolio Pribadi — Rizqi Maulana

Proyek aplikasi web Curriculum Vitae (CV) dan Portofolio pribadi yang interaktif, modern, responsif, dan terintegrasi dengan backend server. Dibangun sesuai standar industri rekayasa perangkat lunak web.

---

## 📋 Pemenuhan Rubrik Penilaian

| No | Kriteria Rubrik | Bobot | Implementasi & Fitur Utama |
|---|---|:---:|---|
| **1** | **HTML** | **30%** | • Struktur semantik penuh: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`, `<figure>`, `<figcaption>`, `<time>`, `<dialog>`, `<meter>`, `<dl>`, `<dt>`, `<dd>`.<br>• Aksesibilitas WCAG (atribut `aria-label`, `aria-expanded`, `aria-controls`, `role`, heading hierarchy `h1`–`h4`).<br>• Formulir kontak berstandar dengan `<form>`, `<label>`, atribut validasi bawaan (`required`, `minlength`, tipe `email`, autocomplete).<br>• Meta tag lengkap: Viewport, SEO description, Open Graph, dan Favicon SVG. |
| **2** | **CSS** | **30%** | • Desain responsif (*mobile-first* ke layar lebar) menggunakan CSS Grid & Flexbox.<br>• Sistem variabel warna & tipografi (*CSS Custom Properties*) dengan dukungan penuh **Mode Gelap / Mode Terang (*Dark/Light Mode*)**.<br>• Animasi & interaksi mikro halus: Keyframes pulse dot, typing cursor, kartu melayang (*hover float*), transisi warna.<br>• **Stylesheets Khusus Cetak (`css/print.css`)**: Ketika mencetak (`Ctrl + P` atau klik tombol *"Cetak CV"*), halaman secara otomatis berubah menjadi format resume A4 profesional hitam-putih tanpa navigasi/tombol web. |
| **3** | **JavaScript** | **20%** | • JavaScript murni modern (ES6+) tanpa ketergantungan library luar yang berat (*Vanilla JS*).<br>• **Pengubah Tema (*Theme Switcher*)**: Mengingat preferensi di `localStorage` dan sinkron dengan pengaturan sistem OS.<br>• **Filter Portofolio Dinamis**: Menyaring proyek berdasarkan kategori (*Web App, Backend/API, UI/UX*).<br>• **Modal Detail Proyek**: Membuka dialog interaktif (`<dialog>`) dengan data dinamis.<br>• **Validasi & AJAX Fetch**: Validasi interaktif formulir kontak *real-time* dan pengiriman asinkron ke API backend dengan umpan balik pesan sukses/gagal.<br>• **Fitur Tambahan**: Efek mengetik otomatis (*typewriter*), *scroll spy* aktif pada navbar, tombol kembali ke atas (*back-to-top*), menu hamburger seluler. |
| **4** | **Bahasa Pemrograman Lain** | **10%** | • **PHP Backend (`api/contact.php` & `api/data.php`)**:<br>&nbsp;&nbsp;- Menangani request `POST` formulir kontak.<br>&nbsp;&nbsp;- Validasi dan sanitasi input (`htmlspecialchars`, `filter_var`).<br>&nbsp;&nbsp;- Menyimpan pesan secara persisten ke berkas `data/messages.json`.<br>&nbsp;&nbsp;- Mengembalikan respons JSON terstruktur dengan HTTP Status Code yang tepat.<br>• **Alternatif Node.js Backend (`server.js`)**: Tersedia server native HTTP Node.js lengkap dengan penanganan API yang sama tanpa dependensi eksternal. |
| **5** | **Development** | **10%** | • Struktur folder modular dan rapi (`css/`, `js/`, `api/`, `data/`, `assets/`).<br>• Konfigurasi `package.json` dengan scripts otomasi (`npm start`, `npm run serve:php`, `npm test`).<br>• Berkas `.gitignore` standar untuk kontrol versi Git.<br>• Detektor otomatis backend engine di bagian footer.<br>• Dokumentasi panduan instalasi dan penggunaan yang lengkap. |

---

## 📂 Struktur Proyek

```text
WEB tugas/
├── index.html              # Halaman utama dengan HTML5 Semantik
├── server.js               # Backend server alternatif menggunakan Node.js
├── package.json            # Konfigurasi proyek & skrip npm
├── .gitignore              # Pengecualian berkas git
├── README.md               # Dokumentasi proyek lengkap
│
├── css/
│   ├── style.css           # Variabel global, reset CSS, tipografi, utility grid/flex
│   ├── components.css      # Komponen UI: Navbar, Hero, Kartu, Form, Modal
│   ├── animations.css      # Keyframes, transisi hover, dan kelas scroll reveal
│   └── print.css           # Styling khusus cetak resume / ekspor PDF (A4)
│
├── js/
│   ├── theme.js            # Logika Dark/Light mode dengan localStorage
│   ├── filter.js           # Filter kategori portofolio & pengontrol modal dialog
│   ├── contact.js          # Validasi formulir kontak & pengiriman AJAX Fetch API
│   └── main.js             # Efek typewriter, menu mobile, scroll spy, deteksi server
│
├── api/
│   ├── contact.php         # Endpoint PHP untuk validasi dan penyimpanan pesan kontak
│   └── data.php            # Endpoint PHP penyedia data profil CV dan statistik
│
├── data/
│   └── messages.json       # Database berbasis file JSON untuk menyimpan pesan kontak
│
└── assets/
    ├── avatar.svg          # Ilustrasi vektor profil profesional
    └── icons/              # Aset ikon pendukung
```

---

## 🚀 Cara Menjalankan Proyek

Anda dapat menjalankan website ini dengan 3 cara berbeda:

### Opsi 1: Menggunakan Node.js (Rekomendasi Cepat)
Pastikan Node.js terpasang, lalu jalankan perintah:
```bash
npm start
```
Buka browser pada alamat: **`http://localhost:3000`**

---

### Opsi 2: Menggunakan Server PHP Built-in
Jika ingin menguji fungsionalitas backend PHP:
```bash
npm run serve:php
# atau langsung:
php -S localhost:8000
```
Buka browser pada alamat: **`http://localhost:8000`**

---

### Opsi 3: Membuka Langsung di Browser (File Standalone)
Cukup klik dua kali berkas **`index.html`** untuk membukanya langsung di peramban favorit Anda (Chrome, Edge, Firefox).
> *Catatan:* Saat dijalankan tanpa server HTTP aktif, formulir kontak secara cerdas beralih ke mode offline menggunakan penyimpanan `localStorage` browser sehingga fungsionalitas tetap berjalan mulus saat dinilai.

---

## ✨ Fitur-Fitur Unggulan

1. **Tombol Cetak CV / Ekspor PDF**:
   - Klik tombol **"Cetak CV"** di navigasi atau di hero section.
   - Peramban akan membuka dialog cetak dengan tampilan resume bersih, rapi, dan siap kirim ke HRD atau dosen penilai.
2. **Mode Gelap / Terang Adaptif**:
   - Tombol toggle tema di pojok kanan atas dengan animasi ikon yang berganti mulus antara matahari dan bulan.
3. **Validasi Formulir Kontak Interaktif**:
   - Pengecekan nama, format email via regex, subjek, serta panjang pesan dengan pesan error spesifik dan indikator tombol pengiriman.
4. **Indikator Mesin Backend di Footer**:
   - Bagian footer secara otomatis memverifikasi ketersediaan backend (apakah dijalankan dengan Node.js atau PHP) dan menampilkan jumlah pesan yang tersimpan di server.

---

## 👨‍💻 Pengembang
- **Nama:** Rizqi Maulana
- **Fokus:** Full Stack Web Developer & Software Engineer
- **Status Proyek:** Selesai & Teruji
