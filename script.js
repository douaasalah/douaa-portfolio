/* ==========================================================================
   Douaa Salah — Portfolio Scripts
   Contents: Sticky Navbar, Mobile Menu, Smooth Scroll, Active Nav,
             Scroll Reveal, Typing Effect, Counter Animation,
             Back To Top, Contact Form Validation, Cursor Glow
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------- Sticky Navbar ---------------- */
  const navbar = document.getElementById('navbar');
  const toggleNavbarState = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  toggleNavbarState();
  window.addEventListener('scroll', toggleNavbarState, { passive: true });

  /* ---------------- Mobile Menu ---------------- */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------------- Active Navigation on Scroll ---------------- */
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const setActiveLink = () => {
    let currentId = sections[0]?.id;
    const scrollPos = window.scrollY + window.innerHeight * 0.3;

    sections.forEach((section) => {
      if (scrollPos >= section.offsetTop) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle('active', link.dataset.nav === currentId);
    });
  };
  setActiveLink();
  window.addEventListener('scroll', setActiveLink, { passive: true });

  /* ---------------- Smooth Scroll (fallback for older browsers) ---------------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId.length <= 1) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ---------------- Scroll Reveal (Fade In / Slide Up) ---------------- */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in-view'));
  }

  /* ---------------- Typing Effect ---------------- */
  const typingEl = document.getElementById('typingText');
  const roles = [
    'Software Engineering Student',
    'Web Developer',
    'AI Enthusiast'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const typeLoop = () => {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    typingEl.textContent = currentRole.substring(0, charIndex);

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentRole.length) {
      speed = 1600;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      speed = 300;
    }

    setTimeout(typeLoop, speed);
  };

  if (typingEl) typeLoop();

  /* ---------------- Counter Animation ---------------- */
  const counters = document.querySelectorAll('[data-count]');

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1200;
    const startTime = performance.now();

    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    };
    requestAnimationFrame(step);
  };

  if ('IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((el) => counterObserver.observe(el));
  } else {
    counters.forEach((el) => { el.textContent = el.dataset.count; });
  }

  /* ---------------- Back To Top ---------------- */
  const backToTop = document.getElementById('backToTop');

  const toggleBackToTop = () => {
    backToTop.classList.toggle('visible', window.scrollY > 480);
  };
  toggleBackToTop();
  window.addEventListener('scroll', toggleBackToTop, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------------- Cursor Glow (desktop only) ---------------- */
  const cursorGlow = document.getElementById('cursorGlow');
  const supportsHover = window.matchMedia('(hover: hover)').matches;

  if (supportsHover && cursorGlow) {
    window.addEventListener('mousemove', (e) => {
      cursorGlow.style.opacity = '1';
      cursorGlow.style.left = `${e.clientX}px`;
      cursorGlow.style.top = `${e.clientY}px`;
    });
    window.addEventListener('mouseleave', () => {
      cursorGlow.style.opacity = '0';
    });
  }

  /* ---------------- Contact Form Validation ---------------- */
  const form = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  const fields = {
    fullName: {
      input: document.getElementById('fullName'),
      error: document.getElementById('fullNameError'),
      validate: (value) => value.trim().length >= 2,
      message: 'Please enter your full name (at least 2 characters).'
    },
    email: {
      input: document.getElementById('email'),
      error: document.getElementById('emailError'),
      validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
      message: 'Please enter a valid email address.'
    },
    message: {
      input: document.getElementById('message'),
      error: document.getElementById('messageError'),
      validate: (value) => value.trim().length >= 10,
      message: 'Your message should be at least 10 characters long.'
    }
  };

  const validateField = (key) => {
    const field = fields[key];
    const isValid = field.validate(field.input.value);
    field.input.classList.toggle('invalid', !isValid);
    field.error.textContent = isValid ? '' : field.message;
    return isValid;
  };

  Object.keys(fields).forEach((key) => {
    fields[key].input.addEventListener('blur', () => validateField(key));
    fields[key].input.addEventListener('input', () => {
      if (fields[key].input.classList.contains('invalid')) validateField(key);
    });
  });

  if (form) {
    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const results = Object.keys(fields).map((key) => validateField(key));
      const allValid = results.every(Boolean);

      if (!allValid) {
        formStatus.textContent = 'Please fix the highlighted fields before sending.';
        formStatus.className = 'form-status error';
        return;
      }

      const originalBtnHTML = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Sending...</span>';
      formStatus.textContent = '';
      formStatus.className = 'form-status';

      // Replace YOUR_FORM_ID with the ID Formspree gives you
      // (from the URL https://formspree.io/f/YOUR_FORM_ID)
      const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xqerqloy';

      const payload = {
        name: fields.fullName.input.value.trim(),
        email: fields.email.input.value.trim(),
        message: fields.message.input.value.trim()
      };

      try {
        const response = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          formStatus.textContent = 'Thanks! Your message has been sent — I\'ll get back to you soon.';
          formStatus.className = 'form-status success';
          form.reset();
        } else {
          formStatus.textContent = 'Something went wrong. Please try again or email me directly.';
          formStatus.className = 'form-status error';
        }
      } catch (err) {
        formStatus.textContent = 'Could not reach the server. Please try again or email me directly.';
        formStatus.className = 'form-status error';
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHTML;
      }
    });
  }

});