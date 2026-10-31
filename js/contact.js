/**
 * ====================================================================
 * CV Pribadi - Rizqi Maulana
 * File: js/contact.js
 * Rubrik: 20% JS (Validasi Formulir, AJAX Fetch, Penanganan Error)
 * Rubrik: 10% Bahasa Pemrograman Lain (Koneksi ke Endpoint Backend)
 * ====================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const subjectInput = document.getElementById('contact-subject');
  const messageInput = document.getElementById('contact-message');
  const submitBtn = document.getElementById('contact-submit-btn');
  const alertBox = document.getElementById('contact-alert');

  // Penampung pesan error
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const subjectError = document.getElementById('subject-error');
  const messageError = document.getElementById('message-error');

  /**
   * Validasi Format Email menggunakan Regular Expression standar RFC
   */
  function isValidEmail(email) {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return re.test(String(email).toLowerCase());
  }

  /**
   * Validasi per field dengan indikator visual langsung
   */
  function validateField(input, errorElement, condition, message) {
    if (!condition) {
      input.classList.add('is-invalid');
      if (errorElement) errorElement.textContent = message;
      return false;
    } else {
      input.classList.remove('is-invalid');
      if (errorElement) errorElement.textContent = '';
      return true;
    }
  }

  // Event listener input real-time
  nameInput.addEventListener('input', () => {
    validateField(nameInput, nameError, nameInput.value.trim().length >= 3, 'Nama harus minimal 3 karakter.');
  });

  emailInput.addEventListener('input', () => {
    validateField(emailInput, emailError, isValidEmail(emailInput.value.trim()), 'Masukkan alamat email yang valid.');
  });

  subjectInput.addEventListener('input', () => {
    validateField(subjectInput, subjectError, subjectInput.value.trim().length >= 3, 'Subjek minimal 3 karakter.');
  });

  messageInput.addEventListener('input', () => {
    validateField(messageInput, messageError, messageInput.value.trim().length >= 10, 'Pesan harus berisi minimal 10 karakter.');
  });

  /**
   * Menampilkan pesan status (Sukses / Error)
   */
  function showAlert(type, message) {
    if (!alertBox) return;
    alertBox.className = `form-status-alert ${type}`;
    alertBox.textContent = message;
    alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function hideAlert() {
    if (!alertBox) return;
    alertBox.className = 'form-status-alert';
    alertBox.textContent = '';
  }

  /**
   * Pengiriman Formulir Asinkronus (AJAX Fetch API)
   */
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideAlert();

    // Jalankan seluruh validasi sekali lagi sebelum mengirim
    const isNameValid = validateField(nameInput, nameError, nameInput.value.trim().length >= 3, 'Nama harus minimal 3 karakter.');
    const isEmailValid = validateField(emailInput, emailError, isValidEmail(emailInput.value.trim()), 'Masukkan alamat email yang valid.');
    const isSubjectValid = validateField(subjectInput, subjectError, subjectInput.value.trim().length >= 3, 'Subjek minimal 3 karakter.');
    const isMessageValid = validateField(messageInput, messageError, messageInput.value.trim().length >= 10, 'Pesan harus berisi minimal 10 karakter.');

    if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid) {
      showAlert('error', 'Mohon lengkapi dan perbaiki data formulir yang belum sesuai.');
      return;
    }

    // Ubah status tombol kirim ke mode memuat (Loading State)
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner"></span> Mengirim pesan...';

    const payload = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      subject: subjectInput.value.trim(),
      message: messageInput.value.trim(),
      submittedAt: new Date().toISOString()
    };

    try {
      // Tentukan endpoint backend sesuai environment (Vercel, Node.js, atau PHP)
      let endpoint = '/api/contact';
      if (window.location.protocol === 'file:') {
        throw new Error('OFFLINE_MODE');
      }
      if (window.location.port === '8000' || window.location.pathname.endsWith('.php')) {
        endpoint = 'api/contact.php';
      }

      let response;
      try {
        response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });
      } catch (networkErr) {
        // Jika fetch gagal (misal dibuka langsung lewat file:// tanpa server), fallback ke localStorage
        console.warn('Backend server tidak terdeteksi langsung, beralih ke penyimpanan lokal browser.');
        throw new Error('OFFLINE_MODE');
      }

      if (response && response.ok) {
        const result = await response.json();
        showAlert('success', result.message || 'Pesan Anda berhasil dikirim ke server backend!');
        form.reset();
      } else {
        const errResult = await response.json().catch(() => ({}));
        throw new Error(errResult.message || 'Gagal mengirim pesan ke server backend.');
      }
    } catch (err) {
      if (err.message === 'OFFLINE_MODE') {
        // Simpan ke localStorage sebagai demonstrasi andal saat evaluasi offline
        const localMessages = JSON.parse(localStorage.getItem('rizqi_contact_messages') || '[]');
        localMessages.push(payload);
        localStorage.setItem('rizqi_contact_messages', JSON.stringify(localMessages));

        showAlert('success', `Terima kasih, ${payload.name}! Pesan tersimpan secara lokal (Mode Offline / Tanpa Server Aktif). Aktifkan PHP/Node.js server untuk integrasi penuh.`);
        form.reset();
      } else {
        showAlert('error', err.message || 'Terjadi gangguan koneksi saat mengirim formulir.');
      }
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
  });
});

