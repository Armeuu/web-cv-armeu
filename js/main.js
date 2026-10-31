document.addEventListener('DOMContentLoaded', () => {
  'use strict';
  const typeTextElement = document.getElementById('typing-text');
  const titles = [
    'Mahasiswa Informatika UMM',
    'Web Developer Enthusiast',
    'Alumni SMKN 1 Wadeng',
    'Ex-Intern PT. Eastern Logistik'
  ];
  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 90;
  const deletingSpeed = 45;
  const pauseDuration = 1800;
  function typeEffect() {
    if (!typeTextElement) return;
    const currentTitle = titles[titleIndex];
    if (isDeleting) {
      charIndex--;
      typeTextElement.textContent = currentTitle.substring(0, charIndex);
    } else {
      charIndex++;
      typeTextElement.textContent = currentTitle.substring(0, charIndex);
    }
    let nextSpeed = isDeleting ? deletingSpeed : typingSpeed;
    if (!isDeleting && charIndex === currentTitle.length) {
      nextSpeed = pauseDuration;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      nextSpeed = 400;
    }
    setTimeout(typeEffect, nextSpeed);
  }
  typeEffect();
  const navToggleBtn = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  if (navToggleBtn && navMenu) {
    navToggleBtn.addEventListener('click', () => {
      const isExpanded = navToggleBtn.getAttribute('aria-expanded') === 'true';
      navToggleBtn.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('open');
    });
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggleBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }
  const sections = document.querySelectorAll('section[id]');
  function updateActiveNavLink() {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetNavLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);
      if (targetNavLink) {
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          targetNavLink.classList.add('active');
        } else {
          targetNavLink.classList.remove('active');
        }
      }
    });
  }
  window.addEventListener('scroll', updateActiveNavLink);
  updateActiveNavLink();
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });
    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('active'));
  }
  const printButtons = document.querySelectorAll('.btn-print-cv');
  printButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.print();
    });
  });
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 450) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  const backendBadge = document.getElementById('backend-status-badge');
  async function checkBackendEngine() {
    if (!backendBadge) return;
    const endpoints = [
      { url: '/api/contact.js', name: 'Vercel Serverless Cloud' },
      { url: '/api/contact', name: 'Node.js Backend' },
      { url: 'api/contact.php', name: 'PHP 8.1 Backend' }
    ];
    for (const ep of endpoints) {
      try {
        const res = await fetch(ep.url, { method: 'GET' });
        if (res.ok) {
          const data = await res.json();
          backendBadge.innerHTML = `
            <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#10b981;"></span>
            Backend Aktif: <strong>${data.server || ep.name}</strong> (${data.total_pesan} pesan tersimpan)
          `;
          return;
        }
      } catch (err) {
      }
    }
    backendBadge.innerHTML = `
      <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#f59e0b;"></span>
      Status: <strong>Frontend Siap</strong> (Jalankan <code>npm start</code> atau <code>npm run serve:php</code> untuk backend)
    `;
  }
  checkBackendEngine();
});
