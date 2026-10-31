/**
 * ====================================================================
 * CV Pribadi - Ahmad Rizqi Maulana
 * File: js/filter.js
 * Rubrik: 20% JS (Interaktivitas Tab Timeline & Navigasi Kategori)
 * ====================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ------------------------------------------------------------------
  // Tab Pengalaman Magang vs Pendidikan Formal
  // ------------------------------------------------------------------
  const tabButtons = document.querySelectorAll('.tab-btn');
  const timelineSections = document.querySelectorAll('.timeline-group');

  if (tabButtons.length > 0 && timelineSections.length > 0) {
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const targetId = btn.getAttribute('data-target');
        timelineSections.forEach(section => {
          if (targetId === 'all' || section.id === targetId) {
            section.style.display = 'block';
            setTimeout(() => {
              section.style.opacity = '1';
            }, 50);
          } else {
            section.style.opacity = '0';
            section.style.display = 'none';
          }
        });
      });
    });
  }
});
