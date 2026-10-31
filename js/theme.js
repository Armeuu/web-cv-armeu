/**
 * ====================================================================
 * CV Pribadi - Rizqi Maulana
 * File: js/theme.js
 * Rubrik: 20% JS (Theme Toggle, LocalStorage Persistence)
 * ====================================================================
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'rizqi_cv_theme';
  const htmlElement = document.documentElement;

  // Ikon SVG Matahari & Bulan
  const sunIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>`;

  const moonIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>`;

  /**
   * Menentukan tema awal berdasarkan preferensi tersimpan atau preferensi sistem operasi
   */
  function getPreferredTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  /**
   * Terapkan tema ke elemen <html> dan perbarui ikon tombol
   */
  function applyTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);

    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
      toggleBtn.innerHTML = theme === 'dark' ? sunIcon : moonIcon;
      toggleBtn.setAttribute('aria-label', theme === 'dark' ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap');
      toggleBtn.title = theme === 'dark' ? 'Mode Terang' : 'Mode Gelap';
    }
  }

  // Terapkan saat inisialisasi
  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);

  // Pasang event listener setelah DOM selesai dimuat
  document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
      // Pastikan ikon tombol sesuai
      const currentTheme = htmlElement.getAttribute('data-theme') || 'light';
      toggleBtn.innerHTML = currentTheme === 'dark' ? sunIcon : moonIcon;

      toggleBtn.addEventListener('click', () => {
        const activeTheme = htmlElement.getAttribute('data-theme');
        const nextTheme = activeTheme === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme);
      });
    }

    // Dengarkan perubahan skema warna pada sistem OS
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  });
})();

