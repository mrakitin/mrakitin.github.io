// ── Sidebar toggle (mobile) ───────────────────────────
const menuBtn = document.querySelector('.menu-btn');
const sidebar = document.querySelector('.sidebar');
if (menuBtn && sidebar) {
  menuBtn.addEventListener('click', () => sidebar.classList.toggle('open'));
  document.addEventListener('click', e => {
    if (sidebar.classList.contains('open') && !sidebar.contains(e.target) && e.target !== menuBtn) {
      sidebar.classList.remove('open');
    }
  });
}

// ── Active nav link ───────────────────────────────────
document.querySelectorAll('.sidebar-link').forEach(link => {
  if (link.href === location.href) link.classList.add('active');
});
document.querySelectorAll('.topnav-links a').forEach(link => {
  if (link.href === location.href) link.classList.add('active');
});

// ── Quiz engine ───────────────────────────────────────
class Quiz {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;
    this.questions = Array.from(this.container.querySelectorAll('.quiz-question'));
    this.answered = 0;
    this.correct = 0;
    this.total = this.questions.length;
    this.scoreEl = document.getElementById('score-display');
    this.resultEl = document.getElementById('quiz-result');
    this.progressEl = document.getElementById('progress-bar');
    this.init();
  }

  init() {
    this.questions.forEach((qEl, idx) => {
      const opts = qEl.querySelectorAll('.option-btn');
      opts.forEach(btn => {
        btn.addEventListener('click', () => this.answer(qEl, btn, idx));
      });
    });
    document.getElementById('reset-quiz')?.addEventListener('click', () => this.reset());
    this.updateScore();
  }

  answer(qEl, btn, qIdx) {
    if (qEl.dataset.answered) return;
    qEl.dataset.answered = '1';
    this.answered++;
    const isCorrect = btn.dataset.correct === 'true';
    if (isCorrect) { this.correct++; btn.classList.add('correct'); }
    else {
      btn.classList.add('wrong');
      // highlight correct
      qEl.querySelectorAll('.option-btn[data-correct="true"]').forEach(c => c.classList.add('correct'));
    }
    qEl.querySelectorAll('.option-btn').forEach(b => b.disabled = true);
    const exp = qEl.querySelector('.explanation');
    if (exp) exp.classList.add('visible');
    this.updateScore();
    if (this.answered === this.total) this.showResult();
  }

  updateScore() {
    if (this.scoreEl) this.scoreEl.textContent = `${this.correct} / ${this.total}`;
    if (this.progressEl) {
      const pct = this.total > 0 ? Math.round((this.answered / this.total) * 100) : 0;
      this.progressEl.style.width = pct + '%';
    }
  }

  showResult() {
    if (!this.resultEl) return;
    this.resultEl.classList.add('visible');
    const pct = Math.round((this.correct / this.total) * 100);
    this.resultEl.querySelector('.result-score').textContent = `${this.correct}/${this.total} (${pct}%)`;
    const msg = pct >= 80 ? '🎉 Excellent work! You\'re well-prepared.'
      : pct >= 65 ? '👍 Good job! Review the questions you missed.'
      : '📚 Keep studying — revisit the study guide and try again.';
    this.resultEl.querySelector('.result-msg').textContent = msg;
    this.resultEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  reset() {
    this.answered = 0; this.correct = 0;
    this.questions.forEach(qEl => {
      delete qEl.dataset.answered;
      qEl.querySelectorAll('.option-btn').forEach(b => {
        b.classList.remove('correct', 'wrong'); b.disabled = false;
      });
      const exp = qEl.querySelector('.explanation');
      if (exp) exp.classList.remove('visible');
    });
    if (this.resultEl) this.resultEl.classList.remove('visible');
    this.updateScore();
    this.container.scrollIntoView({ behavior: 'smooth' });
  }
}

// ── Init quiz if on a unit page ───────────────────────
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('quiz-container')) new Quiz('quiz-container');
});
