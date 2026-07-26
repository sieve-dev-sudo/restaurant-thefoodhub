// ============================================
// THE FOOD HUB — Core Script
// Sticky Navbar / Mobile Menu / Scroll To Top / Active Link
// ============================================

document.addEventListener('DOMContentLoaded', function () {

  // --- Sticky navbar shadow on scroll ---
  const navbar = document.querySelector('.navbar');
  const scrollTopBtn = document.querySelector('.scroll-top');

  function handleScroll() {
    const scrolled = window.scrollY > 20;
    if (navbar) navbar.classList.toggle('scrolled', scrolled);
    if (scrollTopBtn) scrollTopBtn.classList.toggle('show', window.scrollY > 400);
  }
  window.addEventListener('scroll', handleScroll);
  handleScroll();

  // --- Scroll to top button ---
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Mobile hamburger menu ---
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      navLinks.classList.toggle('mobile-open');
    });

    // close menu after clicking a link (mobile)
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('mobile-open');
      });
    });
  }

  // --- Highlight active nav link based on current page ---
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // --- Hero heading typewriter effect (loops forever, layout-safe) ---
  const heroTypewriter = document.getElementById('heroTypewriter');
  if (heroTypewriter) {
    const textEl = heroTypewriter.querySelector('.typewriter-text');
    const plainPart = 'Welcome to ';
    const emphasisPart = 'The Food Hub';
    const fullLength = plainPart.length + emphasisPart.length;

    const TYPE_SPEED = 55;
    const DELETE_SPEED = 30;
    const PAUSE_AFTER_TYPE = 1800;
    const PAUSE_AFTER_DELETE = 500;

    let charIndex = 0;
    let isDeleting = false;

    // Lock the heading's height to its fully-typed size first, so the
    // hero-visual (pizza image) never shifts up/down while typing/deleting.
    function lockHeight() {
      textEl.innerHTML = plainPart + '<em>' + emphasisPart + '</em>';
      const fullHeight = heroTypewriter.getBoundingClientRect().height;
      heroTypewriter.style.minHeight = fullHeight + 'px';
      textEl.textContent = '';
    }
    lockHeight();

    let resizeTimeout;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(function () {
        heroTypewriter.style.minHeight = '0px';
        lockHeight();
      }, 200);
    });

    function renderTypewriter() {
      if (charIndex <= plainPart.length) {
        textEl.textContent = plainPart.slice(0, charIndex);
      } else {
        const emphasisShown = emphasisPart.slice(0, charIndex - plainPart.length);
        textEl.innerHTML = plainPart + '<em>' + emphasisShown + '</em>';
      }
    }

    function tick() {
      if (!isDeleting) {
        charIndex++;
        renderTypewriter();
        if (charIndex >= fullLength) {
          isDeleting = true;
          setTimeout(tick, PAUSE_AFTER_TYPE);
          return;
        }
        setTimeout(tick, TYPE_SPEED);
      } else {
        charIndex--;
        renderTypewriter();
        if (charIndex <= 0) {
          isDeleting = false;
          setTimeout(tick, PAUSE_AFTER_DELETE);
          return;
        }
        setTimeout(tick, DELETE_SPEED);
      }
    }

    tick();
  }

  // --- Smooth scroll for in-page anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

});
