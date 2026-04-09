/* ============================================
   IA para Médicos — Landing Page
   Animations & Interactions
   ============================================ */

(function () {
  'use strict';

  // ── Configuration ──
  const CONFIG = {
    particles: {
      count: 70,
      countMobile: 30,
      maxDistance: 150,
      speed: 0.3,
      minRadius: 1,
      maxRadius: 2.5,
      color: { r: 0, g: 219, b: 255 },
      lineOpacity: 0.15,
    },
    scroll: {
      threshold: 0.15,
      navOffset: 80,
    },
  };

  // ── Particle System ──
  class ParticleCanvas {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext('2d');
      this.particles = [];
      this.animationId = null;
      this.resize();
      this.init();
      this.animate();
      window.addEventListener('resize', () => this.resize());
    }

    resize() {
      const parent = this.canvas.parentElement;
      this.canvas.width = parent.offsetWidth;
      this.canvas.height = parent.offsetHeight;
    }

    init() {
      const count = window.innerWidth < 768
        ? CONFIG.particles.countMobile
        : CONFIG.particles.count;
      this.particles = [];
      for (let i = 0; i < count; i++) {
        this.particles.push({
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height,
          vx: (Math.random() - 0.5) * CONFIG.particles.speed,
          vy: (Math.random() - 0.5) * CONFIG.particles.speed,
          radius: CONFIG.particles.minRadius +
            Math.random() * (CONFIG.particles.maxRadius - CONFIG.particles.minRadius),
          opacity: 0.1 + Math.random() * 0.4,
        });
      }
    }

    drawParticle(p) {
      const { r, g, b } = CONFIG.particles.color;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${p.opacity})`;
      this.ctx.fill();
    }

    drawLine(a, b, dist) {
      const { r, g, bb } = { r: CONFIG.particles.color.r, g: CONFIG.particles.color.g, bb: CONFIG.particles.color.b };
      const opacity = CONFIG.particles.lineOpacity * (1 - dist / CONFIG.particles.maxDistance);
      this.ctx.beginPath();
      this.ctx.moveTo(a.x, a.y);
      this.ctx.lineTo(b.x, b.y);
      this.ctx.strokeStyle = `rgba(${r}, ${g}, ${bb}, ${opacity})`;
      this.ctx.lineWidth = 0.5;
      this.ctx.stroke();
    }

    update() {
      const w = this.canvas.width;
      const h = this.canvas.height;
      for (const p of this.particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }
    }

    draw() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // Draw connections
      const maxDist = CONFIG.particles.maxDistance;
      for (let i = 0; i < this.particles.length; i++) {
        for (let j = i + 1; j < this.particles.length; j++) {
          const dx = this.particles[i].x - this.particles[j].x;
          const dy = this.particles[i].y - this.particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            this.drawLine(this.particles[i], this.particles[j], dist);
          }
        }
      }

      // Draw particles
      for (const p of this.particles) {
        this.drawParticle(p);
      }
    }

    animate() {
      this.update();
      this.draw();
      this.animationId = requestAnimationFrame(() => this.animate());
    }
  }

  // ── Scroll Reveal (Intersection Observer) ──
  function initScrollReveal() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: CONFIG.scroll.threshold }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });
  }

  // ── Navbar visibility ──
  function initNavbar() {
    const navbar = document.getElementById('navbar');
    const hero = document.getElementById('hero');
    if (!navbar || !hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        navbar.classList.toggle('visible', !entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(hero);
  }

  // ── Mobile Navigation ──
  function initMobileNav() {
    const hamburger = document.getElementById('hamburgerBtn');
    const mobileNav = document.getElementById('mobileNav');
    const closeBtn = document.getElementById('mobileNavClose');
    if (!hamburger || !mobileNav) return;

    hamburger.addEventListener('click', () => {
      mobileNav.classList.add('open');
      document.body.style.overflow = 'hidden';
    });

    function closeMobileNav() {
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', closeMobileNav);

    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMobileNav);
    });
  }

  // ── Smooth Scroll with Offset ──
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (!target) return;
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.pageYOffset - CONFIG.scroll.navOffset;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  }

  // ── Module Cards Expand/Collapse ──
  function initModuleCards() {
    document.querySelectorAll('.module-card').forEach((card) => {
      card.addEventListener('click', () => {
        const isActive = card.classList.contains('active');

        // Close all others
        document.querySelectorAll('.module-card.active').forEach((c) => {
          c.classList.remove('active');
        });

        // Toggle clicked
        if (!isActive) {
          card.classList.add('active');
        }
      });
    });
  }

  // ── FAQ Accordion ──
  function initFAQ() {
    document.querySelectorAll('.faq-item__question').forEach((btn) => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const isActive = item.classList.contains('active');

        // Close all
        document.querySelectorAll('.faq-item.active').forEach((i) => {
          i.classList.remove('active');
          i.querySelector('.faq-item__question').setAttribute('aria-expanded', 'false');
        });

        // Toggle
        if (!isActive) {
          item.classList.add('active');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  // ── Typing Effect ──
  function initTypingEffect() {
    const el = document.getElementById('heroSubtitle');
    if (!el) return;
    const text = el.getAttribute('data-text');
    if (!text) return;

    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    el.appendChild(cursor);

    let i = 0;
    const speed = 35;

    function type() {
      if (i < text.length) {
        el.insertBefore(document.createTextNode(text.charAt(i)), cursor);
        i++;
        setTimeout(type, speed);
      } else {
        // Remove cursor after 2s
        setTimeout(() => cursor.remove(), 2000);
      }
    }

    setTimeout(type, 600); // small delay after page load
  }

  // ── Counter Animation ──
  function initCounters() {
    document.querySelectorAll('.counter').forEach((counter) => {
      const target = parseInt(counter.getAttribute('data-target'), 10);
      const duration = 1500;
      const start = performance.now();

      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = Math.round(target * eased);
        if (progress < 1) {
          requestAnimationFrame(update);
        }
      }

      setTimeout(() => requestAnimationFrame(update), 800);
    });
  }

  // ── Stagger Entrance for Hero Cards ──
  function initHeroStagger() {
    const cards = document.querySelectorAll('.hero__stat--stagger');
    cards.forEach((card, i) => {
      setTimeout(() => card.classList.add('visible'), 400 + i * 200);
    });
  }

  // ── Carousel: start animation only when visible ──
  function initCarouselVisibility() {
    const tracks = document.querySelectorAll('.carousel__track');
    if (!tracks.length) return;

    tracks.forEach(t => t.style.animationPlayState = 'paused');

    const observer = new IntersectionObserver(
      ([entry]) => {
        const state = entry.isIntersecting ? 'running' : 'paused';
        tracks.forEach(t => t.style.animationPlayState = state);
      },
      { threshold: 0.1 }
    );

    const carousel = document.querySelector('.carousel');
    if (carousel) observer.observe(carousel);
  }

  // ── Init ──
  document.addEventListener('DOMContentLoaded', () => {
    new ParticleCanvas('heroCanvas');
    initScrollReveal();
    initNavbar();
    initMobileNav();
    initSmoothScroll();
    initModuleCards();
    initFAQ();
    initTypingEffect();
    initCounters();
    initHeroStagger();
    initCarouselVisibility();
  });
})();
