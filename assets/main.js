(() => {
  const root = document.documentElement;
  const themeToggle = document.querySelector('[aria-label="Toggle theme"]');
  const navLinks = document.querySelectorAll('aside nav a[href^="#"]');
  const pageSections = document.querySelectorAll('main section[id]');
  const experienceButtons = document.querySelectorAll('#experience button[aria-expanded]');
  const skillButtons = document.querySelectorAll('#skills button');
  const skillItems = document.querySelectorAll('#skills .flex.flex-wrap.gap-2.sm\\:gap-3 > span');
  const projectCards = document.querySelectorAll('#projects article[role="button"]');
  const contactForm = document.querySelector('#contact form');
  const projectModal = document.getElementById('project-modal');
  const projectModalBody = projectModal?.querySelector('.project-modal__body');
  const projectModalClose = projectModal?.querySelector('.project-modal__close');
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenuPanel = document.getElementById('mobile-menu-panel');
  const mobileMenuClose = document.getElementById('mobile-menu-close');
  const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
  const mobileFooter = document.querySelector('.mobile-footer');

  const themeIconPaths = {
    light: [
      '<circle cx="12" cy="12" r="4"></circle>',
      '<path d="M12 2v2"></path>',
      '<path d="M12 20v2"></path>',
      '<path d="m4.93 4.93 1.41 1.41"></path>',
      '<path d="m17.66 17.66 1.41 1.41"></path>',
      '<path d="M2 12h2"></path>',
      '<path d="M20 12h2"></path>',
      '<path d="m6.34 17.66-1.41 1.41"></path>',
      '<path d="m19.07 4.93-1.41 1.41"></path>'
    ].join(""),
    dark: '<path d="M12 3a6 6 0 1 0 9 9 7.5 7.5 0 1 1-9-9"></path>'
  };

  function getStoredTheme() {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    root.style.colorScheme = theme;
    localStorage.setItem('theme', theme);

    if (!themeToggle) {
      return;
    }

    const label = themeToggle.querySelector('span');
    const icon = themeToggle.querySelector('svg');

    if (label) {
      label.textContent = theme === 'dark' ? 'Dark Mode' : 'Light Mode';
    }

    if (icon) {
      icon.innerHTML = themeIconPaths[theme];
      icon.setAttribute('class', theme === 'dark' ? 'lucide lucide-moon h-4 w-4' : 'lucide lucide-sun h-4 w-4');
    }
  }

  function toggleTheme() {
    const nextTheme = root.classList.contains('dark') ? 'light' : 'dark';
    applyTheme(nextTheme);
  }

  if (themeToggle) {
    applyTheme(getStoredTheme());
    themeToggle.addEventListener('click', toggleTheme);
  }

  if (mobileThemeToggle instanceof HTMLButtonElement) {
    mobileThemeToggle.addEventListener('click', toggleTheme);
  }

  function setActiveNavLink(activeId) {
    navLinks.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${activeId}`;
      const spans = link.querySelectorAll('span');
      const indicator = spans[0];

      link.classList.toggle('text-foreground', isActive);
      link.classList.toggle('text-muted-foreground', !isActive);
      link.classList.toggle('hover:text-primary', !isActive);

      if (indicator) {
        indicator.classList.toggle('w-8', isActive);
        indicator.classList.toggle('bg-primary', isActive);
        indicator.classList.toggle('w-2', !isActive);
        indicator.classList.toggle('bg-muted-foreground', !isActive);
      }

      link.setAttribute('aria-current', isActive ? 'true' : 'false');
    });
  }

  if (navLinks.length && pageSections.length) {
    function syncActiveNavLink() {
      const probe = window.scrollY + window.innerHeight * 0.35;
      let activeSection = pageSections[0];

      pageSections.forEach((section) => {
        if (probe >= section.offsetTop) {
          activeSection = section;
        }
      });

      setActiveNavLink(activeSection.id);
    }

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        const targetId = link.getAttribute('href')?.slice(1);
        if (targetId) {
          setActiveNavLink(targetId);
        }
      });
    });

    syncActiveNavLink();
    window.addEventListener('scroll', syncActiveNavLink, { passive: true });
    window.addEventListener('resize', syncActiveNavLink);
  }

  experienceButtons.forEach((button, index) => {
    const content = button.nextElementSibling;
    const icon = button.querySelector('.lucide-chevron-down');
    const shouldStartOpen = index === 0;

    if (!(content instanceof HTMLElement)) {
      return;
    }

    function setExpanded(expanded) {
      button.setAttribute('aria-expanded', String(expanded));
      content.style.maxHeight = expanded ? `${content.scrollHeight}px` : '0px';
      content.classList.toggle('opacity-0', !expanded);
      content.classList.toggle('opacity-100', expanded);

      if (icon) {
        icon.style.transform = expanded ? 'rotate(180deg)' : 'rotate(0deg)';
      }
    }

    setExpanded(shouldStartOpen);

    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true';
      setExpanded(!expanded);
    });
  });

  window.addEventListener('resize', () => {
    experienceButtons.forEach((button) => {
      const content = button.nextElementSibling;
      const expanded = button.getAttribute('aria-expanded') === 'true';

      if (expanded && content instanceof HTMLElement) {
        content.style.maxHeight = `${content.scrollHeight}px`;
      }
    });
  });

  const skillCategoryClassMap = {
    All: null,
    Frontend: 'text-blue-600',
    Backend: 'text-green-600',
    'Tools & DevOps': 'text-purple-600',
    Testing: 'text-amber-700'
  };

  function setActiveSkillFilter(activeLabel) {
    skillButtons.forEach((button) => {
      const isActive = button.textContent.trim() === activeLabel;

      button.classList.toggle('border-blue-600', isActive);
      button.classList.toggle('bg-blue-600/10', isActive);
      button.classList.toggle('text-blue-600', isActive);
      button.classList.toggle('dark:border-blue-400', isActive);
      button.classList.toggle('dark:bg-blue-400/10', isActive);
      button.classList.toggle('dark:text-blue-400', isActive);
      button.classList.toggle('border-border', !isActive);
      button.classList.toggle('text-muted-foreground', !isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });

    const requiredClass = skillCategoryClassMap[activeLabel];

    skillItems.forEach((item) => {
      const matches = !requiredClass || item.className.includes(requiredClass);
      item.style.display = matches ? '' : 'none';
    });
  }

  if (skillButtons.length && skillItems.length) {
    skillButtons.forEach((button) => {
      button.setAttribute('type', 'button');
      button.addEventListener('click', () => {
        setActiveSkillFilter(button.textContent.trim());
      });
    });

    setActiveSkillFilter('All');
  }

  function openProjectModal(card) {
    if (!(projectModal instanceof HTMLDialogElement) || !(projectModalBody instanceof HTMLElement)) {
      return;
    }

    const modalCard = card.cloneNode(true);
    modalCard.className = 'space-y-6';
    modalCard.removeAttribute('role');
    modalCard.removeAttribute('tabindex');
    projectModalBody.innerHTML = '';
    projectModalBody.appendChild(modalCard);
    projectModal.showModal();
  }

  if (projectModal instanceof HTMLDialogElement) {
    projectModal.addEventListener('click', (event) => {
      if (event.target === projectModal) {
        projectModal.close();
      }
    });
  }

  if (projectModalClose instanceof HTMLButtonElement && projectModal instanceof HTMLDialogElement) {
    projectModalClose.addEventListener('click', () => {
      projectModal.close();
    });
  }

  projectCards.forEach((card) => {
    card.addEventListener('click', (event) => {
      const target = event.target;

      if (target instanceof Element && target.closest('a')) {
        return;
      }

      event.preventDefault();
      openProjectModal(card);
    });

    card.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') {
        return;
      }

      const target = event.target;
      if (target instanceof Element && target.closest('a') && target !== card) {
        return;
      }

      event.preventDefault();
      openProjectModal(card);
    });

    card.querySelectorAll('button').forEach((button) => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        openProjectModal(card);
      });
    });
  });

  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const data = new FormData(contactForm);
      const name = String(data.get('name') || '').trim();
      const email = String(data.get('email') || '').trim();
      const projectType = String(data.get('projectType') || '').trim();
      const message = String(data.get('message') || '').trim();
      const subject = projectType ? `Portfolio inquiry: ${projectType}` : 'Portfolio inquiry';
      const body = [
        `Name: ${name || '-'}`,
        `Email: ${email || '-'}`,
        `Project Type: ${projectType || '-'}`,
        '',
        message || '-'
      ].join('\n');

      window.location.href = `mailto:fakhridev28560077@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }

  function setMobileMenuOpen(isOpen) {
    if (!(mobileMenuPanel instanceof HTMLElement) || !(mobileMenuToggle instanceof HTMLButtonElement)) {
      return;
    }

    mobileMenuPanel.hidden = !isOpen;
    mobileMenuPanel.classList.toggle('is-open', isOpen);
    mobileFooter?.classList.toggle('menu-open', isOpen);
    mobileMenuPanel.setAttribute('aria-hidden', String(!isOpen));
    mobileMenuToggle.setAttribute('aria-expanded', String(isOpen));
    mobileMenuToggle.querySelector('span[aria-hidden="true"]').textContent = isOpen ? '×' : '☰';
    mobileMenuToggle.querySelector('span:last-child').textContent = isOpen ? 'Close' : 'Menu';
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  if (mobileMenuToggle instanceof HTMLButtonElement && mobileMenuPanel instanceof HTMLElement) {
    mobileMenuToggle.addEventListener('click', () => {
      const isOpen = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
      setMobileMenuOpen(!isOpen);
    });

    if (mobileMenuClose instanceof HTMLButtonElement) {
      mobileMenuClose.addEventListener('click', () => {
        setMobileMenuOpen(false);
      });
    }

    mobileMenuPanel.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', () => {
        setMobileMenuOpen(false);
      });
    });
  }
})();
