/* Political Spectrum Test — results rendering.
   Reads scores from URL params (?e=&c=&s=&g=) or localStorage. No server calls. */
(function () {
  'use strict';

  var STORE_RESULT = 'pst_result_v1';

  /* Reference ideologies. pos: {e,c,s,g} on 0-100 per axis.
     Axes: e = economic left(0)→right(100) · c = order(0)→liberty(100)
           s = tradition(0)→change(100) · g = nation(0)→one world(100)
     name: person form for the headline · guide: page title for links. */
  var IDEOLOGIES = [
    { name: 'Communist', guide: 'Communism', slug: null, blurb: 'A classless, stateless society reached by abolishing private ownership of production.', pos: { e: 2, c: 15, s: 60, g: 55 } },
    { name: 'Democratic Socialist', guide: 'Democratic Socialism', slug: 'democratic-socialism', blurb: 'Democracy extended into the workplace and the economy.', pos: { e: 15, c: 70, s: 68, g: 62 } },
    { name: 'Social Democrat', guide: 'Social Democracy', slug: 'social-democracy', blurb: 'A market economy tamed by a strong welfare state, with individual rights and international cooperation taken seriously.', pos: { e: 36, c: 70, s: 66, g: 62 } },
    { name: 'Progressive', guide: 'Progressivism', slug: 'progressivism', blurb: 'Uses government to actively reform society and correct injustice.', pos: { e: 38, c: 75, s: 88, g: 70 } },
    { name: 'Green', guide: 'Green Politics', slug: 'green-politics', blurb: 'Puts ecological limits first, with social justice alongside.', pos: { e: 30, c: 72, s: 78, g: 82 } },
    { name: 'Social Liberal', guide: 'Social Liberalism', slug: null, blurb: 'Individual rights and a social safety net, powered by open markets.', pos: { e: 52, c: 78, s: 70, g: 66 } },
    { name: 'Liberal', guide: 'Liberalism', slug: 'liberalism', blurb: 'Individual rights, open markets, and limited government.', pos: { e: 68, c: 80, s: 60, g: 64 } },
    { name: 'Libertarian', guide: 'Libertarianism', slug: 'libertarianism', blurb: 'Maximum personal and economic freedom with a minimal state.', pos: { e: 82, c: 92, s: 55, g: 62 } },
    { name: 'Centrist', guide: 'Centrism', slug: 'centrism', blurb: 'Judges each issue on its merits; balance beats ideology.', pos: { e: 50, c: 55, s: 50, g: 50 } },
    { name: 'Conservative', guide: 'Conservatism', slug: 'conservatism', blurb: 'Prefers gradual change and trusts institutions to carry wisdom.', pos: { e: 62, c: 45, s: 28, g: 42 } },
    { name: 'National Conservative', guide: 'National Conservatism', slug: 'national-conservatism', blurb: 'Puts nation, borders, and tradition before global integration.', pos: { e: 60, c: 35, s: 20, g: 12 } },
    { name: 'Populist', guide: 'Populism', slug: 'populism', blurb: 'Frames politics as the people against the elite — on both left and right.', pos: { e: 48, c: 42, s: 38, g: 14 } },
    { name: 'Anarchist', guide: 'Anarchism', slug: null, blurb: 'A society ordered by voluntary cooperation, without the state.', pos: { e: 12, c: 96, s: 75, g: 60 } },
    { name: 'Fascist', guide: 'Fascism', slug: null, blurb: 'An authoritarian ultranationalism that subordinates the individual to the state.', pos: { e: 72, c: 8, s: 15, g: 5 } }
  ];

  /* Bands per axis: label + full sentence (axis cards) + phrase (summary paragraph). */
  var BANDS = {
    econ: [
      { max: 25, label: 'Left', desc: 'You want a larger public sector and a stronger safety net, even at the cost of higher taxes.', phrase: 'want a larger public sector and a stronger safety net' },
      { max: 45, label: 'Center-left', desc: 'You favor markets, but expect the state to fund a solid safety net and rein in excess.', phrase: 'favor markets with a solid public safety net' },
      { max: 55, label: 'Center', desc: 'You balance markets and government intervention case by case.', phrase: 'balance markets and government intervention' },
      { max: 75, label: 'Center-right', desc: 'You favor markets with a lighter government hand, keeping only essential public services.', phrase: 'favor markets with a lighter government hand' },
      { max: 101, label: 'Right', desc: 'You want a small state, low taxes, and free markets to drive prosperity.', phrase: 'want a small state and free markets' }
    ],
    civ: [
      { max: 25, label: 'Order-first', desc: 'You accept stronger state power when it keeps people safe and society stable.', phrase: 'accept stronger state power to keep order' },
      { max: 45, label: 'Somewhat order-first', desc: 'You accept some limits on liberty when security is genuinely at stake.', phrase: 'accept some limits on liberty for security' },
      { max: 55, label: 'Balanced', desc: 'You weigh liberty and order case by case, without a fixed default.', phrase: 'weigh liberty and order case by case' },
      { max: 75, label: 'Liberty-leaning', desc: 'You prioritize civil liberties and want strict limits on state power.', phrase: 'prioritize civil liberties over state power' },
      { max: 101, label: 'Liberty-first', desc: 'You are a strong defender of civil liberties, privacy, and free expression.', phrase: 'defend civil liberties, privacy, and free expression' }
    ],
    soc: [
      { max: 25, label: 'Traditional', desc: 'You hold to tradition and see inherited customs as the backbone of society.', phrase: 'hold to tradition' },
      { max: 45, label: 'Somewhat traditional', desc: 'You value tradition, while accepting some social change.', phrase: 'value tradition while accepting some change' },
      { max: 55, label: 'Mixed', desc: 'You are ambivalent between tradition and change — it depends on the issue.', phrase: 'are ambivalent between tradition and change' },
      { max: 75, label: 'Progressive-leaning', desc: 'You welcome social change, though you think some institutions are worth keeping.', phrase: 'welcome change while keeping some institutions' },
      { max: 101, label: 'Progressive', desc: 'You embrace social change and want institutions to adapt quickly.', phrase: 'embrace social change' }
    ],
    geo: [
      { max: 25, label: 'Nation-first', desc: 'You put national sovereignty first and are skeptical of international bodies.', phrase: 'put national sovereignty first' },
      { max: 45, label: 'Somewhat nation-first', desc: 'You lean nationalist, while accepting cooperation when it serves your country.', phrase: 'lean nationalist' },
      { max: 55, label: 'Balanced', desc: 'You balance national interests and international cooperation.', phrase: 'balance national and global interests' },
      { max: 75, label: 'Globalist-leaning', desc: 'You lean toward cooperation and open trade, while keeping the nation as the default unit of politics.', phrase: 'lean globalist' },
      { max: 101, label: 'Globalist', desc: 'You favor international cooperation, open trade, and pooled sovereignty.', phrase: 'favor international cooperation' }
    ]
  };

  function bandOf(axis, v) {
    var bands = BANDS[axis];
    for (var i = 0; i < bands.length; i++) if (v < bands[i].max) return bands[i];
    return bands[bands.length - 1];
  }

  function clampScore(v) {
    v = Math.round(Number(v));
    if (isNaN(v)) return null;
    return Math.max(0, Math.min(100, v));
  }

  function readScores() {
    var params = new URLSearchParams(window.location.search);
    var e = clampScore(params.get('e'));
    var c = clampScore(params.get('c'));
    var s = clampScore(params.get('s'));
    var g = clampScore(params.get('g'));
    if (e !== null && c !== null && s !== null && g !== null) {
      return { e: e, c: c, s: s, g: g };
    }
    try {
      var raw = window.localStorage.getItem(STORE_RESULT);
      if (raw) {
        var saved = JSON.parse(raw);
        var se = clampScore(saved.e), sc = clampScore(saved.c), ss = clampScore(saved.s), sg = clampScore(saved.g);
        if (se !== null && sc !== null && ss !== null && sg !== null) return { e: se, c: sc, s: ss, g: sg };
      }
    } catch (err) { /* storage unavailable */ }
    return null;
  }

  function proximity(user, pos) {
    var de = user.e - pos.e, dc = user.c - pos.c, ds = user.s - pos.s, dg = user.g - pos.g;
    var d = Math.sqrt(de * de + dc * dc + ds * ds + dg * dg);
    return Math.max(30, Math.round(100 - d * 1.25));
  }

  function rankedMatches(user) {
    var list = IDEOLOGIES.map(function (ideo) {
      return { ideo: ideo, pct: proximity(user, ideo.pos) };
    });
    list.sort(function (a, b) { return b.pct - a.pct; });
    return list;
  }

  /* ---------- Map (SVG in DOM) ---------- */
  var SVG_NS = 'http://www.w3.org/2000/svg';
  function svgEl(tag, attrs, text) {
    var el = document.createElementNS(SVG_NS, tag);
    for (var k in attrs) el.setAttribute(k, attrs[k]);
    if (text !== undefined) el.textContent = text;
    return el;
  }
  /* Plot area: 40..430 within a 460 viewBox; 0-100 maps onto it. */
  function mapX(v) { return 40 + 3.9 * v; }
  function mapY(v) { return 40 + 3.9 * (100 - v); } /* liberty is up */

  function buildMap(user, match) {
    var svg = document.getElementById('resultMap');
    svg.textContent = '';
    var quads = [
      { x: 40, y: 40, f: '#F6E3E0' }, { x: 230, y: 40, f: '#E2E7F0' },
      { x: 40, y: 230, f: '#E4EAD9' }, { x: 230, y: 230, f: '#F2E9D4' }
    ];
    quads.forEach(function (q) {
      svg.appendChild(svgEl('rect', { x: q.x, y: q.y, width: 190, height: 190, fill: q.f }));
    });
    svg.appendChild(svgEl('line', { x1: 230, y1: 30, x2: 230, y2: 430, stroke: '#B9B6AC', 'stroke-width': 1.3 }));
    svg.appendChild(svgEl('line', { x1: 30, y1: 230, x2: 430, y2: 230, stroke: '#B9B6AC', 'stroke-width': 1.3 }));

    var lbl = { 'text-anchor': 'middle', 'font-family': 'Inter, sans-serif', 'font-size': 11.5, 'font-weight': 600, fill: '#4A4850' };
    svg.appendChild(svgEl('text', Object.assign({ x: 230, y: 20 }, lbl), 'LIBERTY'));
    svg.appendChild(svgEl('text', Object.assign({ x: 230, y: 450 }, lbl), 'AUTHORITY'));
    svg.appendChild(svgEl('text', Object.assign({ x: 14, y: 234, transform: 'rotate(-90 14 234)' }, lbl), 'ECONOMIC LEFT'));
    svg.appendChild(svgEl('text', Object.assign({ x: 446, y: 234, transform: 'rotate(90 446 234)' }, lbl), 'ECONOMIC RIGHT'));

    /* Closest ideology ring */
    svg.appendChild(svgEl('circle', {
      cx: mapX(match.ideo.pos.e), cy: mapY(match.ideo.pos.c), r: 9,
      fill: 'none', stroke: '#3D6FA8', 'stroke-width': 2.5
    }));
    /* Label sits above the ring; nudge it further up when the user dot is close. */
    var nearUser = Math.abs(user.e - match.ideo.pos.e) < 26 && Math.abs(user.c - match.ideo.pos.c) < 26;
    svg.appendChild(svgEl('text', Object.assign({
      x: mapX(match.ideo.pos.e), y: Math.max(30, mapY(match.ideo.pos.c) - (nearUser ? 34 : 18))
    }, { 'text-anchor': 'middle', 'font-family': 'Inter, sans-serif', 'font-size': 11, 'font-weight': 600, fill: '#3D6FA8' }), match.ideo.guide));

    /* User dot */
    svg.appendChild(svgEl('circle', {
      cx: mapX(user.e), cy: mapY(user.c), r: 10,
      fill: '#16151A', stroke: '#FFFFFF', 'stroke-width': 3.5
    }));
  }

  /* ---------- PNG download (canvas) ---------- */
  function downloadPng(user, match) {
    var size = 900, margin = 80, inner = size - margin * 2;
    var canvas = document.createElement('canvas');
    canvas.width = size; canvas.height = size;
    var ctx = canvas.getContext('2d');
    var q = inner / 2;
    var colors = ['#F6E3E0', '#E2E7F0', '#E4EAD9', '#F2E9D4'];
    var spots = [[0, 0], [1, 0], [0, 1], [1, 1]];
    spots.forEach(function (s, i) {
      ctx.fillStyle = colors[i];
      ctx.fillRect(margin + s[0] * q, margin + s[1] * q, q, q);
    });
    ctx.strokeStyle = '#B9B6AC';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(margin + q, margin); ctx.lineTo(margin + q, margin + inner);
    ctx.moveTo(margin, margin + q); ctx.lineTo(margin + inner, margin + q);
    ctx.stroke();
    ctx.fillStyle = '#4A4850';
    ctx.font = '600 20px Inter, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('LIBERTY', size / 2, margin - 26);
    ctx.fillText('AUTHORITY', size / 2, size - margin + 44);
    ctx.save();
    ctx.translate(margin - 34, size / 2); ctx.rotate(-Math.PI / 2);
    ctx.fillText('ECONOMIC LEFT', 0, 0);
    ctx.restore();
    ctx.save();
    ctx.translate(size - margin + 34, size / 2); ctx.rotate(Math.PI / 2);
    ctx.fillText('ECONOMIC RIGHT', 0, 0);
    ctx.restore();
    function px(v) { return margin + inner * v / 100; }
    function py(v) { return margin + inner * (100 - v) / 100; }
    ctx.strokeStyle = '#3D6FA8';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(px(match.ideo.pos.e), py(match.ideo.pos.c), 14, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = '#16151A';
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(px(user.e), py(user.c), 16, 0, Math.PI * 2);
    ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#6E6C76';
    ctx.font = '500 18px Inter, -apple-system, sans-serif';
    ctx.fillText('Political Spectrum Test · politicalspectrumtest.online', size / 2, size - 28);
    canvas.toBlob(function (blob) {
      if (!blob) return;
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'political-spectrum-map.png';
      document.body.appendChild(a);
      a.click();
      window.setTimeout(function () {
        URL.revokeObjectURL(a.href);
        a.remove();
      }, 1500);
    }, 'image/png');
  }

  /* ---------- Render ---------- */
  function render(user) {
    var matches = rankedMatches(user);
    var top = matches[0];

    document.getElementById('resultEmpty').hidden = true;
    document.getElementById('resultFull').hidden = false;

    document.getElementById('matchNameHero').textContent = top.ideo.name;
    document.getElementById('matchName').textContent = top.ideo.name;
    document.getElementById('matchPct').textContent = top.pct + '%';
    document.getElementById('matchFill').style.width = top.pct + '%';
    document.getElementById('matchDesc').textContent = top.ideo.blurb;

    var link = document.getElementById('matchLink');
    var guideUrl = top.ideo.slug ? '/ideologies/' + top.ideo.slug + '/' : '/ideologies/';
    link.setAttribute('href', guideUrl);
    document.getElementById('matchLinkText').textContent = top.ideo.slug
      ? 'Read the ' + top.ideo.guide + ' guide'
      : 'Browse the ideology guides';
    var guideLink = document.getElementById('guideLink');
    guideLink.setAttribute('href', guideUrl);
    guideLink.textContent = top.ideo.slug ? top.ideo.guide + ' guide' : 'All ideology guides';

    document.getElementById('resultSummary').textContent =
      top.ideo.blurb + ' Your answers place you ' + bandOf('econ', user.e).label.toLowerCase() +
      ' on economics, ' + bandOf('civ', user.c).label.toLowerCase() + ' on civil liberties, ' +
      bandOf('soc', user.s).label.toLowerCase() + ' on society, and ' +
      bandOf('geo', user.g).label.toLowerCase() + ' on global outlook.';

    /* Alternates */
    var altRows = document.getElementById('altRows');
    altRows.textContent = '';
    var altColors = ['#7C9C62', '#3D6FA8'];
    for (var i = 1; i <= 2 && i < matches.length; i++) {
      var m = matches[i];
      var row = document.createElement('div');
      row.className = 'alt-row';
      var nameRow = document.createElement('div');
      nameRow.className = 'alt-name-row';
      var nm = document.createElement('span'); nm.textContent = m.ideo.name;
      var pc = document.createElement('span'); pc.className = 'alt-pct'; pc.textContent = m.pct + '%';
      nameRow.appendChild(nm); nameRow.appendChild(pc);
      var track = document.createElement('div'); track.className = 'alt-track';
      var fill = document.createElement('div'); fill.className = 'alt-fill';
      fill.style.width = m.pct + '%';
      fill.style.background = altColors[i - 1];
      track.appendChild(fill);
      row.appendChild(nameRow); row.appendChild(track);
      altRows.appendChild(row);
    }

    /* Axis cards */
    [['e', 'econ'], ['c', 'civ'], ['s', 'soc'], ['g', 'geo']].forEach(function (pair) {
      var key = pair[0], axis = pair[1];
      var band = bandOf(axis, user[key]);
      document.getElementById(axis + 'Pct').textContent = band.label + ' · ' + user[key] + '/100';
      document.getElementById(axis + 'Marker').style.left = user[key] + '%';
      document.getElementById(axis + 'Desc').textContent = band.desc;
    });

    /* Meaning paragraph */
    document.getElementById('meaningText').textContent =
      'On economics, you ' + bandOf('econ', user.e).phrase + '. On civil liberties, you ' +
      bandOf('civ', user.c).phrase + '. On society, you ' + bandOf('soc', user.s).phrase +
      '. And on global outlook, you ' + bandOf('geo', user.g).phrase +
      '. The filled dot on the map is you; the ring is your closest ideology.';

    buildMap(user, top);

    /* Sharing */
    var shareUrl = window.location.origin + '/results/?e=' + user.e + '&c=' + user.c + '&s=' + user.s + '&g=' + user.g;
    var shareText = 'I lean ' + top.ideo.name + ' (' + top.pct + '% proximity) on the Political Spectrum Test. See my map:';

    var copyBtn = document.getElementById('shareCopy');
    copyBtn.addEventListener('click', function () {
      var full = shareText + ' ' + shareUrl;
      function done() {
        copyBtn.textContent = 'Copied — ready to paste';
        window.setTimeout(function () { copyBtn.textContent = 'Copy result link'; }, 2200);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(full).then(done, function () { fallbackCopy(full); done(); });
      } else {
        fallbackCopy(full); done();
      }
    });

    var shareBtn = document.getElementById('shareBtn');
    if (navigator.share) {
      shareBtn.hidden = false;
      shareBtn.addEventListener('click', function () {
        navigator.share({ title: 'My Political Spectrum Result', text: shareText, url: shareUrl }).catch(function () { /* user cancelled */ });
      });
    }

    document.getElementById('sharePng').addEventListener('click', function () { downloadPng(user, top); });
  }

  var scores = readScores();
  if (!scores) {
    document.getElementById('resultEmpty').hidden = false;
  } else {
    render(scores);
  }
})();
