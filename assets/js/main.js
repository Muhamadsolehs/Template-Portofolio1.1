/* ===================================================================
   MUHAMAD SOLEH S - PORTFOLIO INTERACTION LOGIC
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initCopyInteractions();
  initStepHighlighting();
  initTiltEffects();
  initProjectFilters();
  initBackToTop();
  initContactForm();
});

/**
 * Handle copy to clipboard with toast notification
 */
function initCopyInteractions() {
  const copyElements = document.querySelectorAll('[data-copy]');
  const toast = document.getElementById('toastNotice');

  copyElements.forEach(el => {
    el.addEventListener('click', (e) => {
      if (!el.getAttribute('target')) {
        e.preventDefault();
      }
      const textToCopy = el.getAttribute('data-copy');
      
      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied "${textToCopy}" to clipboard!`);
      }).catch(() => {
        showToast(`Selected: ${textToCopy}`);
      });
    });
  });

  window.showToast = function(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(window.toastTimer);
    window.toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  };
}

/**
 * Interactive work process steps hover highlight
 */
function initStepHighlighting() {
  const steps = document.querySelectorAll('.process-step-item');
  steps.forEach(step => {
    step.addEventListener('mouseenter', () => {
      steps.forEach(s => s.classList.remove('active'));
      step.classList.add('active');
    });
  });
}

/**
 * Subtle interactive 3D perspective tilt on hover for project cards
 */
function initTiltEffects() {
  const cards = document.querySelectorAll('.project-thumb-box, .showcase-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/**
 * Filter projects by category
 */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-tab-btn, .filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterVal === 'all' || category === filterVal) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/**
 * Back to top floating and footer buttons
 */
function initBackToTop() {
  const floatingBtn = document.getElementById('floatingTopBtn');
  const footerBtn = document.getElementById('footerBackToTop');

  function scrollToTop(e) {
    if (e) e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  if (floatingBtn) {
    floatingBtn.addEventListener('click', scrollToTop);

    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        floatingBtn.classList.add('visible');
      } else {
        floatingBtn.classList.remove('visible');
      }
    });
  }

  if (footerBtn) {
    footerBtn.addEventListener('click', scrollToTop);
  }
}

/**
 * Interactive contact message form
 */
function initContactForm() {
  const form = document.getElementById('quickContactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('senderName');
    const name = nameInput ? nameInput.value.trim() : 'Friend';
    
    if (window.showToast) {
      window.showToast(`Thank you, ${name}! Your message has been sent successfully.`);
    }

    form.reset();
  });
}
