(() => {
  'use strict';
  const qs = (sel) => document.querySelector(sel);
  const qsa = (sel) => [...document.querySelectorAll(sel)];
  const cfg = window.PORTFOLIO_CONFIG || {};
  const projectUrls = cfg.projectUrls || {};
  const langBtn = qs('#lang-toggle');
  const themeBtn = qs('#theme-toggle');
  const filterBtns = qsa('.filter-chip');
  const projectCards = qsa('.project-card');
  const savedLang = (()=>{ try {return localStorage.getItem('portfolio-lang')} catch {return null} })();
  const savedTheme = (()=>{ try {return localStorage.getItem('portfolio-theme')} catch {return null} })();
  let lang = savedLang === 'de' ? 'de' : 'fr';
  let activeFilter = 'all';
  let theme = savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : 'dark';
  function translate() {
    document.documentElement.lang = lang;
    document.title = lang === 'fr' ? 'Portfolio — Mathématiques & technologies' : 'Portfolio — Mathematik & Technologie';
    qsa('[data-fr][data-de]').forEach(el => {
      const content = el.dataset[lang];
      if (el.dataset.html === 'true') el.innerHTML = content;
      else el.textContent = content;
    });
    langBtn.textContent = lang === 'fr' ? 'DE' : 'FR';
    langBtn.setAttribute('aria-label', lang === 'fr' ? 'Zur deutschen Version wechseln' : 'Passer à la version française');
    updateProjectLinks();
    updateContacts();
  }
  function validPublicUrl(input) {
    try {
      const u = new URL(input);
      if (u.protocol !== 'https:') return null;
      if (u.hostname === 'localhost' || u.hostname === '127.0.0.1' || u.hostname.endsWith('.local')) return null;
      return u.href;
    } catch {return null}
  }
  function updateProjectLinks() {
    qsa('[data-project-link]').forEach(link => {
      const href = validPublicUrl(projectUrls[link.dataset.projectLink] || '');
      if (href) {
        link.href = href;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.classList.remove('inactive');
        link.querySelector('span').textContent = lang === 'fr' ? 'Voir la démonstration' : 'Demo öffnen';
        link.setAttribute('aria-label', lang === 'fr' ? 'Voir la démonstration publique (nouvel onglet)' : 'Öffentliche Demo öffnen (neuer Tab)');
      } else {
        link.removeAttribute('href');
        link.removeAttribute('target');
        link.removeAttribute('rel');
        link.classList.add('inactive');
        link.querySelector('span').textContent = lang === 'fr' ? 'Démo privée — lien public à venir' : 'Private Demo — öffentlicher Link folgt';
        link.removeAttribute('aria-label');
      }
    });
  }
  function updateContacts() {
    const holder = qs('#contact-links');
    holder.replaceChildren();
    const email = typeof cfg.email === 'string' ? cfg.email.trim() : '';
    const username = typeof cfg.githubUsername === 'string' ? cfg.githubUsername.trim() : '';
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      const a = document.createElement('a');
      a.href = 'mailto:' + email;
      a.className = 'button button-primary';
      a.textContent = lang === 'fr' ? 'Écrire un e-mail ↗' : 'E-Mail senden ↗';
      holder.append(a);
    }
    if (/^[a-zA-Z0-9-]{1,39}$/.test(username)) {
      const a = document.createElement('a');
      a.href = `https://github.com/${username}`;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.className = 'button button-outline';
      a.textContent = 'GitHub ↗';
      holder.append(a);
    }
    qs('#contact-missing').hidden = holder.childElementCount > 0;
  }
  if (typeof cfg.displayName === 'string' && cfg.displayName.trim()) {
    qs('#display-name').textContent = cfg.displayName.trim();
  }
  qs('#year').textContent = String(new Date().getFullYear());
  document.documentElement.dataset.theme = theme;
  themeBtn.setAttribute('aria-label', theme === 'dark' ? 'Activer le thème clair' : 'Activer le thème sombre');
  themeBtn.addEventListener('click', () => {
    theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('portfolio-theme', theme); } catch {}
    themeBtn.setAttribute('aria-label', theme === 'dark' ? 'Activer le thème clair' : 'Activer le thème sombre');
  });
  langBtn.addEventListener('click', () => {
    lang = lang === 'fr' ? 'de' : 'fr';
    try {localStorage.setItem('portfolio-lang', lang)} catch {}
    translate();
  });
  filterBtns.forEach(btn => btn.addEventListener('click', () => {
    activeFilter = btn.dataset.filter;
    filterBtns.forEach(b => {
      const active = b === btn;
      b.classList.toggle('active', active);
      b.setAttribute('aria-pressed', String(active));
    });
    projectCards.forEach(card => { card.hidden = activeFilter !== 'all' && card.dataset.category !== activeFilter; });
  }));
  translate();
})();
