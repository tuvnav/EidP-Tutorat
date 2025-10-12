// Links in neuem Tab öffnen
document.addEventListener('DOMContentLoaded', () => {
  const host = location.hostname;
  const SKIP_PROTOCOLS = ['mailto:', 'tel:', 'javascript:', 'blob:', 'data:'];
  const NEWTAB_EXT = /\.(pdf|png|jpe?g|gif|webp|svg|mp3|wav|mp4|webm)$/i;

  const shouldOpenInNewTab = (a) => {
    const href = a.getAttribute('href');
    if (!href) return false;

    const lower = href.trim().toLowerCase();
    if (lower.startsWith('#')) return false;                       // gleiche Seite
    if (SKIP_PROTOCOLS.some(p => lower.startsWith(p))) return false;

    const url = new URL(href, location.href);

    // extern?
    if (url.hostname && url.hostname !== host) return true;

    // intern, aber „Asset“-Typ (Bild/PDF/Media)?
    if (NEWTAB_EXT.test(url.pathname)) return true;

    // explizit markiert?
    if (a.hasAttribute('data-newtab') || (a.rel || '').includes('external')) return true;

    return false;
  };

  document.querySelectorAll('a[href]').forEach(a => {
    if (shouldOpenInNewTab(a)) {
      a.target = '_blank';
      const rel = (a.getAttribute('rel') || '').split(/\s+/).filter(Boolean);
      if (!rel.includes('noopener')) rel.push('noopener');
      if (!rel.includes('noreferrer')) rel.push('noreferrer');
      a.setAttribute('rel', rel.join(' '));
    }
  });
});

// Copy-to-clipboard für alle .copy-btn
document.addEventListener('DOMContentLoaded', () => {
    // Nur auf hausaufgaben.html ausführen
    if (!document.body.classList.contains('page-hausaufgaben')) return;

    // Beispiel: Copy-to-Clipboard-Handler
    document.addEventListener('click', async (e) => {
        const btn = e.target.closest('.copy-btn');
        if (!btn) return;
        const id = btn.getAttribute('data-target');
        const el = document.getElementById(id);
        if (!el) return;

        try {
            await navigator.clipboard.writeText(el.textContent);
            const old = btn.textContent;
            btn.textContent = 'Kopiert!';
            btn.disabled = true;
            setTimeout(() => { btn.textContent = old; btn.disabled = false; }, 1200);
        } catch {
            const range = document.createRange();
            range.selectNodeContents(el);
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
            document.execCommand('copy');
            sel.removeAllRanges();
            const old = btn.textContent;
            btn.textContent = 'Kopiert!';
            setTimeout(() => { btn.textContent = old; }, 1200);
        }
    });
});
