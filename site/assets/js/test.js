/* Political Spectrum Test — quiz logic.
   All scoring happens locally in the browser. Nothing is uploaded. */
(function () {
  'use strict';

  var STORE_PROGRESS = 'pst_progress_v1';
  var STORE_RESULT = 'pst_result_v1';
  var TOTAL = 24;

  /* Axis reference:
     econ: 0 = economic left (public), 100 = economic right (market)
     civ:  0 = order first (authority), 100 = liberty first
     soc:  0 = hold to tradition, 100 = open to change
     geo:  0 = nation first, 100 = one world
     dir: +1 means agreeing moves the score toward 100. */
  var QUESTIONS = [
    // Economy (1-6)
    { axis: 'econ', dir: -1, text: 'The government should provide a strong safety net — healthcare, education, and housing support — even if that means higher taxes.' },
    { axis: 'econ', dir: 1, text: 'Most industries work better when private companies compete than when the government runs them.' },
    { axis: 'econ', dir: 1, text: 'Taxes on income and business should generally be lower so people keep more of what they earn.' },
    { axis: 'econ', dir: -1, text: 'Large companies need strict regulation to protect workers, consumers, and the environment.' },
    { axis: 'econ', dir: 1, text: 'It is unfair that the highest earners pay a much larger share of their income in taxes.' },
    { axis: 'econ', dir: -1, text: 'Essential services like water, energy, and rail should mostly be owned or controlled by the state.' },
    // Civil Liberties (7-12)
    { axis: 'civ', dir: 1, text: 'People should be free to say offensive things in public, as long as they do not directly incite violence.' },
    { axis: 'civ', dir: -1, text: 'Security agencies should have more power to monitor private communications to stop serious crime.' },
    { axis: 'civ', dir: 1, text: 'The police should operate under strict limits and independent oversight, even when crime is a serious problem.' },
    { axis: 'civ', dir: -1, text: 'During a serious crisis, governments should be allowed to temporarily restrict some civil liberties.' },
    { axis: 'civ', dir: 1, text: 'Adults should be free to make any choice they want about their own body and health.' },
    { axis: 'civ', dir: -1, text: 'Governments should be able to remove online content that spreads harmful misinformation.' },
    // Society (13-18)
    { axis: 'soc', dir: 1, text: 'Society should actively correct historic injustices, even if that means changing long-standing institutions.' },
    { axis: 'soc', dir: -1, text: 'Traditional family structures are the foundation of a healthy society.' },
    { axis: 'soc', dir: 1, text: 'Changing social norms around gender and relationships are mostly a good thing.' },
    { axis: 'soc', dir: -1, text: 'Religion and faith communities deserve a central place in public life.' },
    { axis: 'soc', dir: 1, text: 'Schools and public culture should reflect the full range of cultures and lifestyles in society, not just the majority’s.' },
    { axis: 'soc', dir: -1, text: 'Society works best when everyone shares the same core customs and values.' },
    // Global Outlook (19-24)
    { axis: 'geo', dir: 1, text: 'Countries should accept less national sovereignty so international bodies can tackle problems like climate change.' },
    { axis: 'geo', dir: -1, text: 'My country should put its own interests first, even when that means stepping back from international agreements.' },
    { axis: 'geo', dir: 1, text: 'Freer trade between countries tends to benefit ordinary people, not just corporations.' },
    { axis: 'geo', dir: -1, text: 'Immigration should be reduced significantly to protect national identity and local workers’ wages.' },
    { axis: 'geo', dir: 1, text: 'Wealthy countries have a duty to help poorer countries develop, not just out of charity.' },
    { axis: 'geo', dir: -1, text: 'Our borders and military should be strengthened because the world is becoming more dangerous.' }
  ];

  var AXIS_LABEL = { econ: 'Economy', civ: 'Civil Liberties', soc: 'Society', geo: 'Global Outlook' };

  var elStatement = document.getElementById('quizStatement');
  var elCount = document.getElementById('quizCount');
  var elAxis = document.getElementById('quizAxis');
  var elBar = document.getElementById('quizBarFill');
  var elOptions = document.getElementById('quizOptions');
  var elBack = document.getElementById('quizBack');
  var elNext = document.getElementById('quizNext');
  var elResume = document.getElementById('quizResume');
  var elResumeText = document.getElementById('quizResumeText');
  var elResumeBtn = document.getElementById('quizResumeBtn');
  var elRestartBtn = document.getElementById('quizRestartBtn');

  var idx = 0;
  var answers = new Array(TOTAL).fill(null);
  var advanceTimer = null;

  function safeGet(key) {
    try { return window.localStorage.getItem(key); } catch (e) { return null; }
  }
  function safeSet(key, value) {
    try { window.localStorage.setItem(key, value); } catch (e) { /* storage unavailable */ }
  }
  function safeRemove(key) {
    try { window.localStorage.removeItem(key); } catch (e) { /* storage unavailable */ }
  }

  function answeredCount() {
    var n = 0;
    for (var i = 0; i < TOTAL; i++) if (answers[i] !== null) n++;
    return n;
  }
  function allAnswered() {
    return answers.indexOf(null) === -1;
  }

  function computeResults(ans) {
    var sums = { econ: 0, civ: 0, soc: 0, geo: 0 };
    for (var i = 0; i < TOTAL; i++) {
      var a = ans[i];
      if (a === null || a === undefined) continue;
      var v = (a - 2) / 2; /* -1 .. 1 */
      sums[QUESTIONS[i].axis] += QUESTIONS[i].dir * v;
    }
    function pct(raw) { return Math.round(((raw + 6) / 12) * 100); }
    return { e: pct(sums.econ), c: pct(sums.civ), s: pct(sums.soc), g: pct(sums.geo) };
  }

  function finish() {
    var r = computeResults(answers);
    safeRemove(STORE_PROGRESS);
    safeSet(STORE_RESULT, JSON.stringify({ e: r.e, c: r.c, s: r.s, g: r.g, t: Date.now() }));
    window.location.href = '/results/?e=' + r.e + '&c=' + r.c + '&s=' + r.s + '&g=' + r.g;
  }

  function saveProgress() {
    safeSet(STORE_PROGRESS, JSON.stringify({ i: idx, a: answers, t: Date.now() }));
  }

  function render() {
    var q = QUESTIONS[idx];
    elStatement.textContent = q.text;
    elCount.textContent = 'Question ' + (idx + 1) + ' of ' + TOTAL;
    elAxis.textContent = AXIS_LABEL[q.axis];
    elBar.style.width = (answeredCount() / TOTAL * 100) + '%';

    var buttons = elOptions.querySelectorAll('.quiz-option');
    for (var i = 0; i < buttons.length; i++) {
      var v = parseInt(buttons[i].getAttribute('data-v'), 10);
      buttons[i].classList.toggle('is-selected', answers[idx] === v);
    }

    elBack.disabled = idx === 0;
    elBack.classList.toggle('btn--ghost', idx !== 0);

    var complete = allAnswered();
    if (complete) {
      elNext.innerHTML = 'See my result <svg class="arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6"/></svg>';
      elNext.disabled = false;
    } else {
      elNext.innerHTML = 'Next question <svg class="arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6"/></svg>';
      elNext.disabled = answers[idx] === null;
    }
  }

  function goTo(newIdx) {
    idx = Math.max(0, Math.min(TOTAL - 1, newIdx));
    render();
  }

  function next() {
    if (allAnswered()) { finish(); return; }
    if (answers[idx] !== null && idx < TOTAL - 1) { goTo(idx + 1); return; }
    goTo(answers.indexOf(null));
  }

  function back() {
    if (advanceTimer) { window.clearTimeout(advanceTimer); advanceTimer = null; }
    goTo(idx - 1);
  }

  function pick(v) {
    if (advanceTimer) { window.clearTimeout(advanceTimer); advanceTimer = null; }
    answers[idx] = v;
    saveProgress();
    render();
    if (idx < TOTAL - 1) {
      advanceTimer = window.setTimeout(function () {
        advanceTimer = null;
        goTo(idx + 1);
      }, 260);
    }
  }

  function showResume(saved) {
    var n = 0;
    for (var i = 0; i < TOTAL; i++) if (saved.a[i] !== null && saved.a[i] !== undefined) n++;
    if (n === 0) return;
    if (n === TOTAL) {
      elResumeText.textContent = 'You have already answered all 24 questions on this device.';
      elResumeBtn.textContent = 'See my result';
    } else {
      elResumeText.textContent = 'You have answered ' + n + ' of 24 questions on this device — continue where you left off.';
      elResumeBtn.textContent = 'Resume';
    }
    elResume.hidden = false;
    elResumeBtn.addEventListener('click', function () {
      answers = saved.a.slice();
      if (answers.length !== TOTAL) answers = new Array(TOTAL).fill(null);
      if (n === TOTAL) { finish(); return; }
      idx = 0;
      var firstNull = answers.indexOf(null);
      goTo(firstNull === -1 ? 0 : firstNull);
      elResume.hidden = true;
    });
  }

  /* Bind options */
  var optionButtons = elOptions.querySelectorAll('.quiz-option');
  for (var b = 0; b < optionButtons.length; b++) {
    (function (btn) {
      btn.addEventListener('click', function () {
        pick(parseInt(btn.getAttribute('data-v'), 10));
      });
    })(optionButtons[b]);
  }
  elBack.addEventListener('click', back);
  elNext.addEventListener('click', next);

  document.addEventListener('keydown', function (ev) {
    if (ev.defaultPrevented || ev.metaKey || ev.ctrlKey || ev.altKey) return;
    if (ev.key >= '1' && ev.key <= '5') { pick(parseInt(ev.key, 10) - 1); return; }
    if (ev.key === 'ArrowRight' || ev.key === 'Enter') { ev.preventDefault(); next(); return; }
    if (ev.key === 'ArrowLeft' || ev.key === 'Backspace') { ev.preventDefault(); back(); }
  });

  /* Restore saved progress */
  var savedRaw = safeGet(STORE_PROGRESS);
  if (savedRaw) {
    try {
      var saved = JSON.parse(savedRaw);
      if (saved && Array.isArray(saved.a) && saved.a.length === TOTAL) {
        showResume(saved);
      }
    } catch (e) { /* ignore malformed storage */ }
  }
  elRestartBtn.addEventListener('click', function () {
    safeRemove(STORE_PROGRESS);
    answers = new Array(TOTAL).fill(null);
    idx = 0;
    elResume.hidden = true;
    render();
  });

  render();
})();
