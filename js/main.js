(function() {
  'use strict';

  // ─── Lookbook grid v2 ───
  function initLookbookGrid() {
    try {
      var pieces = {
        'calyx-vega-earrings': {
          name: 'Calyx Vega Earrings',
          type: 'Earrings · Calyx Collection',
          desc: 'Six pear-cut diamonds arranged as petals around a round brilliant centre.',
          images: ['images/lb-calyx-vega-earrings-1.png'],
          specs: [
            { label: 'Centre Stone', val: '0.25ct Round' },
            { label: 'Total Weight', val: '12.96ct' },
            { label: 'Petals', val: '1ct Each, 6 × Pear' },
            { label: 'Gold Purity', val: '14k White Gold' },
            { label: 'Gold Weight', val: '5.702g' },
            { label: 'Setting', val: 'Prong' },
            { label: 'Certification', val: 'On Request' }
          ]
        },
        'umbra-arc': {
          name: 'Umbra Arc',
          type: 'Earrings',
          desc: 'Rose-cut diamonds set in a continuous pavé orbit. Soft light, architectural form.',
          images: ['images/lb-umbra-arc-1.jpg'],
          specs: [
            { label: 'Stone Description', val: 'Rose-Cut Rounds, Varying Sizes' },
            { label: 'Total Weight', val: '8.07ct' },
            { label: 'Pavé', val: '1.46ct Full-Cut' },
            { label: 'Gold Purity', val: '14k White Gold' },
            { label: 'Gold Weight', val: '10.45g' },
            { label: 'Setting', val: 'Pavé & Bezel' },
            { label: 'Certification', val: 'On Request' }
          ]
        },
        'majin': {
          name: 'The Majin Pendant',
          type: 'Necklace',
          desc: 'Baguette diamond pavé on a marine-link chain. Every fancy-shaped diamond is custom cut to fit the channel setting. Structural. Singular.',
          images: ['images/lb-majin-1.png'],
          specs: [
            { label: 'Pendant Stones', val: '768 Pavé Rounds, 45 Baguette / Triangle / Kite' },
            { label: 'Total Weight', val: '56.63ct' },
            { label: 'Chain Stones', val: '2,800 Pavé Rounds, 1,544 Channel Baguettes' },
            { label: 'Gold Purity', val: '14k White Gold' },
            { label: 'Pendant Weight', val: '42.36g' },
            { label: 'Chain Weight', val: '160.568g' },
            { label: 'Setting', val: 'Invisible Channel & Pavé' },
            { label: 'Certification', val: 'Non-Certified' }
          ]
        },
        'eclipse': {
          name: 'Eclipse Ring',
          type: 'Ring',
          desc: 'A 3.34ct fancy vivid yellow pear, VS1, set in a yellow gold basket to enhance its colour — paired with a colourless pear diamond, girdle to girdle. Baguette shoulders. Open shank.',
          images: ['images/lb-eclipse-2.png', 'images/lb-eclipse-1.png'],
          specs: [
            { label: 'Centre Stones', val: '3.34ct Fancy Vivid Yellow VS1 Pear + 2.54ct E VS1 Pear' },
            { label: 'Total Weight', val: '5.88ct' },
            { label: 'Side Stones', val: '0.28ct Baguette' },
            { label: 'Gold Purity', val: '14k White Gold' },
            { label: 'Gold Weight', val: '3.405g' },
            { label: 'Setting', val: 'Prong & Channel' },
            { label: 'Certification', val: 'IGI Certified' }
          ]
        },
        'soleil': {
          name: 'Soleil Ring',
          type: 'Ring',
          desc: 'A vivid fancy yellow pear, set in a yellow gold basket to enhance its colour, flanked by white half-moon diamonds custom made to complement its size.',
          images: ['images/lb-soleil-1.png'],
          specs: [
            { label: 'Centre Stone', val: '3.95ct Fancy Vivid Yellow Pear' },
            { label: 'Total Weight', val: '3.95ct' },
            { label: 'Side Stones', val: '0.87ct Half-Moon' },
            { label: 'Gold Purity', val: '14k White Gold' },
            { label: 'Gold Weight', val: '3.391g' },
            { label: 'Setting', val: 'Prong & Basket' },
            { label: 'Certification', val: 'IGI Certified' }
          ]
        },
        'constellation': {
          name: 'Constellation Necklace',
          type: 'Necklace',
          desc: 'Seven fancy yellow diamonds in mixed cuts, each set in a yellow gold basket to enhance its colour and surrounded by a white diamond pavé halo, on a white gold chain.',
          images: ['images/lb-constellation-1.png'],
          specs: [
            { label: 'Stones', val: '1ct Each — Cushion, Radiant, Oval, Heart, Marquise, Triangle' },
            { label: 'Total Weight', val: '7.11ct' },
            { label: 'Halo', val: '0.95ct Pavé' },
            { label: 'Gold Purity', val: '14k White Gold' },
            { label: 'Gold Weight', val: '11.34g' },
            { label: 'Setting', val: 'Prong & Pavé Halo' },
            { label: 'Certification', val: 'IGI Certified' }
          ]
        },
        'selene': {
          name: 'Selene Earrings',
          type: 'Earrings',
          desc: '33.61g of cultured pearls, graduated in size, linked by round diamond connectors in an open crescent form.',
          images: ['images/lb-selene-1.png'],
          specs: [
            { label: 'Pearls', val: '33.61g, Cultured, Graduated' },
            { label: 'Diamond Weight', val: '2.20ct' },
            { label: 'Gold Purity', val: '18k White Gold' },
            { label: 'Gold Weight', val: '12.295g' },
            { label: 'Setting', val: 'Prong' },
            { label: 'Certification', val: 'Non-Certified' }
          ]
        },
        'scintilla': {
          name: 'Scintilla Earrings',
          type: 'Earrings',
          desc: 'A diamond-set hoop with suspended radiant-cut drops. Worn here with a cushion and baguette cocktail ring.',
          images: ['images/lb-scintilla-1.png'],
          specs: [
            { label: 'Stone Description', val: 'Custom-Cut Radiants & Pavé Rounds' },
            { label: 'Total Weight', val: '5.59ct' },
            { label: 'Gold Purity', val: '14k White Gold' },
            { label: 'Gold Weight', val: '18.37g' },
            { label: 'Setting', val: 'Prong & Pavé' },
            { label: 'Certification', val: 'Non-Certified' }
          ]
        },
        'triad': {
          name: 'The Triad',
          type: 'Pendants',
          desc: 'Heart, cushion, and oval diamond pendants, each with a pavé-studded halo. Wear one, two, or all three, in any order.',
          images: ['images/lb-triad-1.png', 'images/lb-triad-2.png'],
          specs: [
            { label: 'Stones', val: '3.62ct Cushion, 2.02ct Heart, 2.72ct Oval' },
            { label: 'Total Weight', val: '8.35ct' },
            { label: 'Halo', val: '0.92ct Pavé' },
            { label: 'Gold Purity', val: '14k White Gold' },
            { label: 'Gold Weight', val: '10.546g' },
            { label: 'Setting', val: 'Prong & Pavé Halo' },
            { label: 'Certification', val: 'IGI Certified' }
          ]
        },
        'calyx-vega-ring': {
          name: 'Calyx Vega Ring',
          type: 'Ring · Calyx Collection',
          desc: 'Six pear-cut diamonds, one round brilliant centre, pavé-studded shoulders. The same design language as the earring, worn differently.',
          images: ['images/lb-calyx-vega-ring-1.png'],
          specs: [
            { label: 'Centre Stone', val: '0.27ct Round' },
            { label: 'Total Weight', val: '6.44ct' },
            { label: 'Petals', val: '1ct Each, 6 × Pear' },
            { label: 'Shoulders', val: '0.26ct Pavé' },
            { label: 'Gold Purity', val: '14k White Gold' },
            { label: 'Gold Weight', val: '4.855g' },
            { label: 'Setting', val: 'Prong' },
            { label: 'Certification', val: 'Non-Certified' }
          ]
        },
        'aria': {
          name: 'Aria Necklace',
          type: 'Necklace',
          desc: 'Five mixed-cut diamonds, prong set, suspended as stations on a white gold trace chain.',
          images: ['images/lb-aria-1.png'],
          specs: [
            { label: 'Stones', val: 'Heart, Oval, Cushion, Radiant, Pear' },
            { label: 'Total Weight', val: '4.53ct' },
            { label: 'Gold Purity', val: '14k White Gold' },
            { label: 'Gold Weight', val: '5.868g' },
            { label: 'Setting', val: 'Prong' },
            { label: 'Certification', val: 'Non-Certified' }
          ]
        },
        'viridis': {
          name: 'Viridis Earrings',
          type: 'Earrings',
          desc: 'Emerald pear cuts in a detachable double-layer flower setting. Round diamond centre.',
          images: ['images/lb-viridis-2.jpg', 'images/lb-viridis-2-model.png'],
          specs: [
            { label: 'Emerald Weight', val: '40.62ct' },
            { label: 'Centre Diamond', val: '0.53ct Round' },
            { label: 'Side Stones', val: '1.03ct' },
            { label: 'Gold Purity', val: '14k White Gold' },
            { label: 'Gold Weight', val: '19.721g' },
            { label: 'Setting', val: 'Prong & Pavé' },
            { label: 'Certification', val: 'IGI Certified' }
          ]
        },
        'cygnus': {
          name: 'Cygnus Earrings',
          type: 'Earrings',
          desc: 'A heart-cut diamond stud, worn alone or with a removable fan beneath — its own 0.77ct heart-cut centre flanked by matching 0.27ct pear and heart-shaped diamonds. Detachable, so it\'s worn as a full piece or as a pair of heart-shaped studs alone.',
          images: ['images/lb-cygnus-1.png', 'images/lb-cygnus-2.png'],
          specs: [
            { label: 'Stud', val: 'Heart Cut Diamond' },
            { label: 'Fan Centre', val: '0.77ct Heart' },
            { label: 'Fan Sides', val: '0.27ct Each, Pear & Heart' },
            { label: 'Total Weight', val: '5.17ct' },
            { label: 'Gold Purity', val: '14k White Gold' },
            { label: 'Gold Weight', val: '8.094g' },
            { label: 'Wear', val: 'Stud or Full Fan' },
            { label: 'Certification', val: 'IGI Certified' }
          ]
        },
        'nova-hoops': {
          name: 'Nova Hoops',
          type: 'Earrings',
          desc: 'A full pavé dome in gold, built for brilliance from every angle.',
          images: ['images/lb-nova-hoops-1.png', 'images/lb-nova-hoops-2.png'],
          specs: [
            { label: 'Total Weight', val: '10.63ct' },
            { label: 'Gold Purity', val: '18k White Gold, Yellow Gold Rim' },
            { label: 'Gold Weight', val: '23.10g' },
            { label: 'Setting', val: 'Pavé' },
            { label: 'Certification', val: 'On Request' }
          ]
        }
      };

      var grid = document.getElementById('lb2-grid');
      var panel = document.getElementById('lb2-panel');
      var panelImgs = document.getElementById('lb2-imgs');
      var panelRight = document.getElementById('lb2-right');
      var closeBtn = document.getElementById('lb2-close');
      var currentPiece = null;

      if (!grid || !panel) return;

      function buildPanel(id) {
        var p = pieces[id];
        if (!p) return;

        // Images side
        var imgHtml = '';
        p.images.forEach(function(src, i) {
          imgHtml += '<div class="lb2-panel-img' + (i===0?' active':'') + '" data-src="' + src + '">' +
            '<img src="' + src + '" alt="' + p.name + '" loading="lazy" /></div>';
        });
        panelImgs.innerHTML = imgHtml;

        // Specs
        var specsHtml = '';
        p.specs.forEach(function(s) {
          specsHtml += '<div><div class="lb2-spec-label">' + s.label + '</div>' +
            '<div class="lb2-spec-val">' + s.val + '</div></div>';
        });

        // Right side
        panelRight.innerHTML =
          '<div class="lb2-panel-eyebrow">' + p.type + '</div>' +
          '<div class="lb2-panel-name">' + p.name + '</div>' +
          '<p class="lb2-panel-desc">' + p.desc + '</p>' +
          '<div class="lb2-specs">' + specsHtml + '</div>' +
          '<a href="#" class="btn-outline" data-page-link="contact" style="align-self:flex-start;font-size:11px;padding:12px 24px;">Enquire about this piece</a>';
      }

      function openPanel(id) {
        // Deactivate all cards
        grid.querySelectorAll('.lb2-card').forEach(function(c) {
          c.classList.toggle('active', c.dataset.piece === id);
        });
        buildPanel(id);
        panel.classList.add('open');
        currentPiece = id;
        // Scroll panel into view smoothly
        setTimeout(function() {
          panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 60);
      }

      function closePanel() {
        var closingId = currentPiece;
        panel.classList.remove('open');
        grid.querySelectorAll('.lb2-card').forEach(function(c) { c.classList.remove('active'); });
        currentPiece = null;
        // Return to the card that was open, so the grid is back in view
        // without the user needing to scroll up to reach the next piece
        if (closingId) {
          var openedCard = grid.querySelector('.lb2-card[data-piece="' + closingId + '"]');
          if (openedCard) {
            setTimeout(function() {
              openedCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 30);
          }
        }
      }

      // Card clicks
      grid.addEventListener('click', function(e) {
        var card = e.target.closest('.lb2-card');
        if (!card) return;
        var id = card.dataset.piece;
        if (currentPiece === id) { closePanel(); return; }
        openPanel(id);
      });

      // Close button
      closeBtn.addEventListener('click', closePanel);

      // Panel image clicks (swap active highlight)
      panel.addEventListener('click', function(e) {
        var img = e.target.closest('.lb2-panel-img');
        if (!img) return;
        panelImgs.querySelectorAll('.lb2-panel-img').forEach(function(i) { i.classList.remove('active'); });
        img.classList.add('active');
      });

    } catch(e) { console.warn('Lookbook grid error:', e); }
  }

  // ─── Hero slideshow ───
  function initHeroSlideshow() {
    try {
      var slides = document.querySelectorAll('.hero-slide');
      if (!slides.length) return;
      var current = 0;
      var dwell = 4000;   // ms between advances
      var timer;

      function advance() {
        slides[current].classList.remove('active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('active');
      }

      function start() {
        timer = setInterval(advance, dwell);
      }

      function stop() {
        clearInterval(timer);
      }

      // Pause when tab is hidden, resume on return
      document.addEventListener('visibilitychange', function() {
        if (document.hidden) { stop(); } else { start(); }
      });

      start();
    } catch(e) {}
  }

  // ─── Page router ───
  function showPage(pageId) {
    try {
      var pages = document.querySelectorAll('.page');
      pages.forEach(function(p) {
        p.classList.remove('active');
        p.style.display = 'none';
      });

      var target = document.getElementById('page-' + pageId);
      if (target) {
        target.classList.add('active');
        target.style.display = 'block';
        try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch(e) { window.scrollTo(0, 0); }
      }

      // Update hash for back/forward and file:// support
      try {
        if (window.location.hash !== '#' + pageId) {
          window.history.pushState(null, '', '#' + pageId);
        }
      } catch(e) {
        window.location.hash = pageId;
      }

      // Update nav active state
      document.querySelectorAll('[data-page]').forEach(function(a) {
        a.classList.toggle('active', a.dataset.page === pageId);
      });

      // Close mobile menu
      var menu = document.getElementById('mobile-menu');
      if (menu) menu.classList.remove('open');
      document.body.style.overflow = '';

      setTimeout(initFadeUps, 150);
    } catch(e) {
      console.warn('showPage error:', e);
    }
  }

  // ─── Fade up on scroll ───
  function initFadeUps() {
    try {
      var activeEl = document.querySelector('.page.active');
      if (!activeEl) return;

      // Make all fade-up elements visible immediately on mobile
      if (window.innerWidth < 768) {
        activeEl.querySelectorAll('.fade-up').forEach(function(el) {
          el.classList.add('visible');
        });
        return;
      }

      if (!window.IntersectionObserver) {
        activeEl.querySelectorAll('.fade-up').forEach(function(el) {
          el.classList.add('visible');
        });
        return;
      }

      var els = activeEl.querySelectorAll('.fade-up');
      var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry, i) {
          if (entry.isIntersecting) {
            setTimeout(function() {
              entry.target.classList.add('visible');
            }, Math.min(i * 60, 300));
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.05 });

      els.forEach(function(el) {
        el.classList.remove('visible');
        observer.observe(el);
      });
    } catch(e) {
      // If anything fails, just show everything
      document.querySelectorAll('.fade-up').forEach(function(el) {
        el.classList.add('visible');
      });
    }
  }

  // ─── Nav show-on-scroll-up ───
  function initNav() {
    try {
      var nav = document.getElementById('main-nav');
      if (!nav) return;
      var lastY = window.scrollY;
      var ticking = false;

      function update() {
        var y = window.scrollY;
        var navH = nav.offsetHeight || 0;

        if (y <= navH * 0.5) {
          // Near the very top — always show
          nav.classList.remove('nav-hidden');
        } else if (y > lastY + 4) {
          // Scrolling down — hide
          nav.classList.add('nav-hidden');
        } else if (y < lastY - 4) {
          // Scrolling up — show
          nav.classList.remove('nav-hidden');
        }

        lastY = y;
        ticking = false;
      }

      window.addEventListener('scroll', function() {
        if (!ticking) {
          window.requestAnimationFrame(update);
          ticking = true;
        }
      }, { passive: true });
    } catch(e) {}
  }

  // ─── Mobile burger ───
  function initBurger() {
    try {
      var burger = document.getElementById('nav-burger');
      var menu = document.getElementById('mobile-menu');
      if (!burger || !menu) return;
      burger.addEventListener('click', function(e) {
        e.stopPropagation();
        var open = menu.classList.toggle('open');
        document.body.style.overflow = open ? 'hidden' : '';
      });
      // Close menu when clicking outside
      document.addEventListener('click', function(e) {
        if (menu.classList.contains('open') && !menu.contains(e.target) && e.target !== burger) {
          menu.classList.remove('open');
          document.body.style.overflow = '';
        }
      });
    } catch(e) {}
  }

  // ─── All nav/page-link clicks ───
  function initNavLinks() {
    try {
      document.addEventListener('click', function(e) {
        // data-page nav links
        var navLink = e.target.closest('[data-page]');
        if (navLink && navLink.dataset.page) {
          e.preventDefault();
          showPage(navLink.dataset.page);
          return;
        }
        // data-page-link CTA buttons
        var pageLink = e.target.closest('[data-page-link]');
        if (pageLink && pageLink.dataset.pageLink) {
          e.preventDefault();
          showPage(pageLink.dataset.pageLink);
          return;
        }
      });
    } catch(e) {}
  }

  // ─── Handle hash on load / back-forward ───
  function getPageFromHash() {
    var hash = window.location.hash.replace('#', '');
    var valid = ['home','collections','about','bespoke','education','contact'];
    return valid.indexOf(hash) > -1 ? hash : 'home';
  }

  window.addEventListener('popstate', function() {
    showPage(getPageFromHash());
  });

  // ─── Education accordion ───
  document.addEventListener('click', function(e) {
    try {
      var trigger = e.target.closest('.edu-trigger');
      if (!trigger) return;
      var panel = trigger.nextElementSibling;
      var expanded = trigger.getAttribute('aria-expanded') === 'true';
      document.querySelectorAll('.edu-trigger').forEach(function(t) {
        t.setAttribute('aria-expanded', 'false');
        var p = t.nextElementSibling;
        if (p) p.classList.remove('open');
      });
      if (!expanded) {
        trigger.setAttribute('aria-expanded', 'true');
        if (panel) panel.classList.add('open');
      }
    } catch(e) {}
  });

  // ─── Contact form ───
  function initContactForm() {
    try {
      var form = document.getElementById('contact-form');
      if (!form) return;

      // Restrict the phone field to numeric input only (digits, leading +, spaces)
      var phoneInput = document.getElementById('c-phone');
      if (phoneInput) {
        phoneInput.addEventListener('input', function() {
          var cursor = phoneInput.selectionStart;
          var before = phoneInput.value;
          // Allow digits and spaces anywhere, '+' only as the first character
          var cleaned = before.replace(/[^\d+\s]/g, '');
          var firstPlus = cleaned.indexOf('+');
          if (firstPlus > -1) {
            cleaned = '+' + cleaned.slice(0, firstPlus).replace(/\+/g, '') + cleaned.slice(firstPlus + 1).replace(/\+/g, '');
          } else {
            cleaned = cleaned.replace(/\+/g, '');
          }
          if (cleaned !== before) {
            var diff = before.length - cleaned.length;
            phoneInput.value = cleaned;
            if (cursor !== null) {
              phoneInput.setSelectionRange(Math.max(0, cursor - diff), Math.max(0, cursor - diff));
            }
          }
        });
        phoneInput.addEventListener('keypress', function(e) {
          var allowedKey = /[\d+\s]/.test(e.key);
          if (!allowedKey && e.key.length === 1) {
            e.preventDefault();
          }
        });
      }

      form.addEventListener('submit', function(e) {
        e.preventDefault();
        var btn = form.querySelector('.btn-submit');
        if (btn) { btn.textContent = 'Sending...'; btn.disabled = true; }

        var formData = new FormData(form);

        fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(formData).toString()
        })
        .then(function() {
          if (btn) {
            btn.textContent = 'Message sent';
            btn.style.borderColor = 'var(--cornflower)';
            btn.style.color = 'var(--cornflower)';
          }
          form.reset();
          setTimeout(function() {
            if (btn) {
              btn.textContent = 'Send message';
              btn.style.borderColor = '';
              btn.style.color = '';
              btn.disabled = false;
            }
          }, 4000);
        })
        .catch(function() {
          // Fallback — still show success (Netlify may handle it server-side)
          if (btn) {
            btn.textContent = 'Message sent';
            btn.disabled = false;
          }
          form.reset();
        });
      });
    } catch(e) {}
  }

  // ─── Star field ───
  function buildStars() {
    try {
      var field = document.querySelector('.star-field');
      if (!field) return;
      var frag = document.createDocumentFragment();
      for (var i = 0; i < 36; i++) {
        var star = document.createElement('div');
        star.className = 'star';
        star.style.cssText = 'left:' + (Math.random() * 100) + '%;top:' + (Math.random() * 100) + '%;--dur:' + (3 + Math.random() * 5) + 's;--delay:' + (Math.random() * 6) + 's;opacity:' + (0.1 + Math.random() * 0.35) + ';';
        frag.appendChild(star);
      }
      field.appendChild(frag);
    } catch(e) {}
  }

  // ─── Named After a Star — local star field ───
  function buildNasStars() {
    try {
      var field = document.getElementById('nasStarField');
      if (!field) return;
      var frag = document.createDocumentFragment();
      for (var i = 0; i < 40; i++) {
        var star = document.createElement('div');
        star.className = 'nas-star-dot';
        star.style.cssText = 'left:' + (Math.random() * 100) + '%;top:' + (Math.random() * 100) + '%;opacity:' + (0.08 + Math.random() * 0.4) + ';';
        frag.appendChild(star);
      }
      field.appendChild(frag);
    } catch(e) {}
  }

  // ─── Notify button ───
  document.addEventListener('click', function(e) {
    try {
      var btn = e.target.closest('#notify-btn');
      if (!btn) return;
      var input = document.getElementById('notify-email');
      if (!input || !input.value.includes('@')) {
        if (input) { input.style.borderColor = 'rgba(247,210,99,0.6)'; input.focus(); }
        return;
      }
      btn.textContent = "You're on the list";
      btn.disabled = true;
      if (input) { input.disabled = true; input.style.opacity = '0.4'; }
    } catch(e) {}
  });

  // ─── Init ───
  function init() {
    initNav();
    initBurger();
    initNavLinks();
    initContactForm();
    initHeroSlideshow();
    initLookbookGrid();
    buildStars();
    buildNasStars();

    // Ensure all pages start hidden except active
    document.querySelectorAll('.page').forEach(function(p) {
      p.style.display = 'none';
      p.classList.remove('active');
    });

    var startPage = getPageFromHash();
    showPage(startPage);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Belt-and-braces fallback
  window.addEventListener('load', function() {
    var anyActive = document.querySelector('.page.active');
    if (!anyActive) { init(); }
    setTimeout(initFadeUps, 200);
  });

})();
