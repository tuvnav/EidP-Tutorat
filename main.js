document.addEventListener('DOMContentLoaded', () => {
    const host = location.hostname;
    document.querySelectorAll('a[href]').forEach(a => {
        const url = new URL(a.getAttribute('href'), location.origin);
        if (url.hostname && url.hostname !== host) {
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
        }
    });
});

// Copy-to-clipboard für alle .copy-btn
document.addEventListener('DOMContentLoaded', () => {
    // Nur auf hausaufgaben.html ausführen
    if (!document.body.classList.contains('page-hausaufgaben')) return;

    // >>> hier dein bisheriger hausaufgaben-spezifischer Code <<<
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
