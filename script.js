// script.js - smooth scrolling, dark mode, animations, resume download modal simulation

document.addEventListener('DOMContentLoaded', () => {
  // ---------- DARK MODE TOGGLE ----------
  const darkToggle = document.getElementById('darkModeToggle');
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
    darkToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    document.body.removeAttribute('data-theme');
    darkToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }

  darkToggle.addEventListener('click', () => {
    if (document.body.getAttribute('data-theme') === 'dark') {
      document.body.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
      darkToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
      document.body.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      darkToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
  });

  // ---------- SMOOTH SCROLLING for anchor links (if any internal) ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== "#" && href !== "#!" && href !== "") {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // ---------- DOWNLOAD RESUME BUTTON (simulate resume download) ----------
  const downloadBtn = document.getElementById('downloadResumeBtn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', (e) => {
      e.preventDefault();
      // Create a dummy PDF resume blob (simulate resume download)
      const resumeContent = `Azhagesan P.M - Senior Medical Coder Resume
Experience: 4.3+ years HCC Coding & QA
Certifications: CCS (Appearing May 11)
Skills: HCC, ICD-10-CM, Risk Adjustment, Auditing
Contact: azhagesan.coder@medhealth.com | +91 98765 43210
Location: Tamil Nadu, India`;
      const blob = new Blob([resumeContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Azhagesan_PM_Resume.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      // optional alert feedback
      const toastMsg = document.createElement('div');
      toastMsg.innerText = '📄 Resume download started (sample)';
      toastMsg.style.position = 'fixed';
      toastMsg.style.bottom = '90px';
      toastMsg.style.right = '30px';
      toastMsg.style.backgroundColor = '#0f67b3';
      toastMsg.style.color = 'white';
      toastMsg.style.padding = '12px 24px';
      toastMsg.style.borderRadius = '40px';
      toastMsg.style.zIndex = '9999';
      toastMsg.style.fontWeight = '500';
      toastMsg.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
      document.body.appendChild(toastMsg);
      setTimeout(() => toastMsg.remove(), 2500);
    });
  }

  // ---------- SCROLL REVEAL ANIMATION (basic) ----------
  const revealElements = document.querySelectorAll('.skill-card, .timeline-content, .about-grid > *, .contact-grid, .card-block');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  
  revealElements.forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
  
  // additional skill-bar animation when skills in view
  const skillSection = document.querySelector('.skills');
  if (skillSection) {
    const skillBars = document.querySelectorAll('.skill-bar');
    const animateBars = () => {
      skillBars.forEach(bar => {
        const width = bar.style.width;
        if (width && !bar.dataset.animated) {
          bar.style.width = width;
          bar.dataset.animated = 'true';
        }
      });
    };
    const skillObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animateBars();
        skillObserver.disconnect();
      }
    }, { threshold: 0.3 });
    skillObserver.observe(skillSection);
  }
  
  // progress fill for CCS exam readiness (interactive + update with a small increment demo)
  const progressFill = document.querySelector('.progress-fill');
  const readinessSpan = document.getElementById('readinessValue');
  if (progressFill && readinessSpan) {
    // set initial width based on readiness value (already in html style width 85%)
    const targetWidth = readinessSpan.innerText + '%';
    progressFill.style.width = targetWidth;
  }
  
  // extra effect: minor mouse parallax on hero icon (just for fun)
  const heroIcon = document.querySelector('.hero-icon');
  if (heroIcon) {
    document.addEventListener('mousemove', (e) => {
      if (window.innerWidth > 768) {
        const x = (e.clientX / window.innerWidth) * 10;
        const y = (e.clientY / window.innerHeight) * 10;
        heroIcon.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      }
    });
  }
  
  // year update in footer
  const footerYear = document.querySelector('.footer p');
  if (footerYear && !footerYear.innerText.includes('2025')) {
    footerYear.innerText = `© ${new Date().getFullYear()} Azhagesan P.M | Senior Medical Coder | HCC & QA Specialist`;
  }
});
