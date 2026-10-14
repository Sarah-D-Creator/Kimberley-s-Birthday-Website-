(() => {
  const pageOrder = ['kim.html', 'origin.html', 'beany.html', 'letter.html', 'final.html'];
  const currentFile = location.pathname.split('/').pop() || 'kim.html';
  const currentIndex = Math.max(0, pageOrder.indexOf(currentFile));

  // Add a small page-progress indicator without changing any of the letters.
  const progress = document.createElement('div');
  progress.className = 'progress-wrap';
  progress.innerHTML = `
    <div class="progress-label">A little birthday journey · ${currentIndex + 1} of ${pageOrder.length}</div>
    <div class="progress-track" role="progressbar" aria-label="Birthday journey progress" aria-valuemin="1" aria-valuemax="${pageOrder.length}" aria-valuenow="${currentIndex + 1}">
      <div class="progress-fill" style="width:${((currentIndex + 1) / pageOrder.length) * 100}%"></div>
    </div>`;
  document.body.prepend(progress);

  // Gentle floating stars and hearts. They sit behind the page content.
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const symbols = ['✦', '♡', '✧', '⋆', '♥'];
    const colors = ['#ffdd8e', '#f6b9d0', '#d8caff'];
    for (let i = 0; i < 12; i++) {
      const sparkle = document.createElement('span');
      sparkle.className = 'floaty';
      sparkle.setAttribute('aria-hidden', 'true');
      sparkle.textContent = symbols[i % symbols.length];
      sparkle.style.setProperty('--left', `${(i * 37 + 9) % 100}%`);
      sparkle.style.setProperty('--float-color', colors[i % colors.length]);
      sparkle.style.setProperty('--duration', `${13 + (i % 6) * 2}s`);
      sparkle.style.setProperty('--delay', `${-(i * 1.7)}s`);
      sparkle.style.fontSize = `${12 + (i % 4) * 5}px`;
      document.body.appendChild(sparkle);
    }
  }

  // A small birthday wish reveal on the final page.
  if (currentFile === 'final.html') {
    const area = document.createElement('div');
    area.className = 'wish-area';
    const button = document.createElement('button');
    button.className = 'wish-button';
    button.type = 'button';
    button.textContent = 'MAKE A WISH, BIRTHDAY GIRL ✨';
    button.setAttribute('aria-expanded', 'false');
    button.addEventListener('click', () => {
      if (area.querySelector('.wish-message')) return;
      const message = document.createElement('p');
      message.className = 'wish-message';
      message.textContent = 'May this year bring you more laughter, lovely surprises, and reasons to feel proud of yourself. 💗';
      message.setAttribute('role', 'status');
      area.appendChild(message);
      button.textContent = 'WISH SENT INTO THE UNIVERSE 💫';
      button.setAttribute('aria-expanded', 'true');
      tossConfetti();
    });
    area.appendChild(button);
    const replayLink = document.querySelector('a.orig');
    if (replayLink) replayLink.before(area);
    else document.body.appendChild(area);
  }

  function tossConfetti() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const colors = ['#ffdd8e', '#f6b9d0', '#d8caff', '#fff3df'];
    for (let i = 0; i < 42; i++) {
      const piece = document.createElement('span');
      piece.className = 'confetti-piece';
      piece.setAttribute('aria-hidden', 'true');
      piece.textContent = i % 3 === 0 ? '✦' : '•';
      piece.style.setProperty('--left', `${Math.random() * 100}%`);
      piece.style.setProperty('--drift', `${Math.random() * 160 - 80}px`);
      piece.style.setProperty('--duration', `${1.8 + Math.random() * 1.8}s`);
      piece.style.color = colors[i % colors.length];
      piece.style.fontSize = `${10 + Math.random() * 12}px`;
      document.body.appendChild(piece);
      window.setTimeout(() => piece.remove(), 4200);
    }
  }
})();
