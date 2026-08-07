/* Form — vanilla JS (no framework) */

// Navbar scroll state + mobile drawer
(function () {
  var nav = document.querySelector('.navbar');
  var burger = document.querySelector('.burger');
  var drawer = document.querySelector('.drawer');
  if (nav) {
    var onScroll = function () {
      if (window.scrollY > 24) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll);
  }
  if (burger && drawer) {
    burger.addEventListener('click', function () { drawer.classList.toggle('open'); });
  }
  // close drawer on link click
  if (drawer) {
    drawer.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { drawer.classList.remove('open'); });
    });
  }
})();

// Stats count-up on scroll into view
(function () {
  var els = document.querySelectorAll('[data-count]');
  if (!els.length) return;
  var animate = function (el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    var dur = 1600;
    var start = performance.now();
    var tick = function (now) {
      var p = Math.min((now - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = target * eased;
      var display = (target % 1 === 0) ? Math.round(val) : val.toFixed(1);
      el.textContent = display + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if (!('IntersectionObserver' in window)) { els.forEach(animate); return; }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { animate(e.target); io.unobserve(e.target); }
    });
  }, { threshold: 0.4 });
  els.forEach(function (el) { io.observe(el); });
})();

// Newsletter
(function () {
  var form = document.querySelector('.news');
  if (!form) return;
  var btn = form.querySelector('button');
  var input = form.querySelector('input');
  var ok = form.querySelector('.ok');
  btn.addEventListener('click', function () {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) { ok.textContent = 'Pop in a valid email, friend.'; ok.style.color = '#f0a060'; return; }
    ok.style.color = '';
    ok.textContent = "You're on the list! Check your inbox for a howdy.";
    input.value = '';
  });
})();

// Contact form validation
(function () {
  var form = document.getElementById('contact-form');
  if (!form) return;

  var setErr = function (name, msg) {
    var f = form.querySelector('[data-field="' + name + '"]');
    if (!f) return;

    var e = f.querySelector('.err');
    if (e) e.textContent = msg || '';

    var input = f.querySelector('input, textarea');
    if (input) {
      input.style.borderColor = msg ? '#a83232' : '';
    }
  };

  var validate = function () {
    var ok = true;

    var name = form.name.value.trim();
    var email = form.email.value.trim();
    var msg = form.message.value.trim();

    setErr('name', name ? '' : 'Required');
    if (!name) ok = false;

    var validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setErr('email', validEmail ? '' : 'Valid email required');
    if (!validEmail) ok = false;

    setErr('message', msg.length > 10 ? '' : 'Tell us a bit more (10+ chars)');
    if (msg.length <= 10) ok = false;

    return ok;
  };

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Stop if the form isn't valid
    if (!validate()) return;

    var name = form.name.value.trim();
    var email = form.email.value.trim();
    var message = form.message.value.trim();

    var subject = encodeURIComponent('New Website Inquiry');

    var body = encodeURIComponent(
      'Name: ' + name + '\n' +
      'Email: ' + email + '\n\n' +
      'Message:\n' + message
    );

    // Open the visitor's email application
    window.location.href =
      'mailto:Fayeabacajan4@gmail.com?subject=' +
      subject +
      '&body=' +
      body;
  });
})();

// Planner
(function () {
  var root = document.getElementById('planner');
  if (!root) return;
  var steps = ['Basics', 'Style', 'Color', 'Layout', 'Extras', 'Review'];
  var current = 0;

  var form = {
    project: 'website-brief', name: '', company: '', email: '', purpose: '',
    style: 'retro', palette: 'workshop', custom: ['#c05530', '#4d8a83', '#d4a93a', '#2a2018'],
    hero: 'large', header: 'sticky', scroll: 'subtle', spacing: 'comfortable', content: 'single', footer: 'rich',
    features: []
  };

  var styles = [
    { id: 'retro', t: 'Retro / Vintage', d: 'Warm, grainy, 1970s print vibes' },
    { id: 'minimal', t: 'Minimal', d: 'Clean, airy, lots of whitespace' },
    { id: 'bold', t: 'Bold & Brutalist', d: 'Big type, hard edges, high contrast' },
    { id: 'editorial', t: 'Editorial', d: 'Magazine layout, serif headlines' },
    { id: 'playful', t: 'Playful', d: 'Bright colors, rounded shapes, fun' }
    
  ];
  var palettes = [
    { id: 'Classic Blue', name: 'Classic Blue', swatches: ['#FFFFFF', '#3B82F6', '#1C2536', '#2a2018'] },
    { id: 'Forest Green', name: 'Forest Green', swatches: ['#EDF8F1', '#0EB879', '#0D4E37', '#FFFFFF'] },
    { id: 'Ocean Blue', name: 'Ocean Blue', swatches: ['#FFFFFF', '#0077C0', '#004085', '#CBEFEE'] },
    { id: 'Modern Teal', name: 'Modern Teal', swatches: ['#FFFFFF', '#2B8276', '#1E5E55', '#E2F4EE'] },
    { id: 'Monochrome', name: 'Monochrome', swatches: ['#FFFFFF', '#1A1A1A', '#61748D', '#F4F7F9'] },
    { id: 'Silver Lining', name: 'Silver Lining', swatches: ['#5B5C5E', '#A8A9AB', '#D2D3D5', '#F1F1F2'] },
    { id: 'Nordic Slate', name: 'Nordic Slate', swatches: ['#EEF4F8', '#C5D7E2', '#50616D', '#1F242B'] },
    { id: 'Lavender', name: 'Lavender', swatches: ['#F2EFFD', '#9D8BC9', '#7E6CA7', '#FFFFFF'] },
    { id: 'Soft Blush', name: 'Soft Blush', swatches: ['#FAF0F5', '#E89BB9', '#9F517A', '#FFFFFF'] },
    { id: 'Mauve Serenity', name: 'Mauve Serenity', swatches: ['#514E61', '#A27B8C', '#D1BEB6', '#DDD6D4'] },
    { id: 'Summer Fields', name: 'Summer Fields', swatches: ['#C4D4AC', '#E5ECBF', '#FAF6D9', '#D8A675'] },
    { id: 'Honey Orange', name: 'Honey Orange', swatches: ['#FAF8EE', '#FBCB98', '#FF9742', '#542C02'] },
    { id: 'Ice Cream', name: 'Ice Cream', swatches: ['#EFF8FF', '#FFC2DC', '#E295B5', '#FFF5D6'] },
    { id: 'Pastel Dream', name: 'Pastel Dream', swatches: ['#9BCBDC', '#7392B7', '#F9CFCF', '#FDEFEF'] },
    { id: 'Greenery Moss', name: 'Greenery Moss', swatches: ['#EAF4E2', '#91B391', '#5C8068', '#3B4C5A'] },
    { id: 'Warm Neutral', name: 'Warm Neutral', swatches: ['#FAF5F0', '#E1D9D3', '#CFBBA6', '#F49E9E'] },
    { id: 'Charcoal & Gold', name: 'Charcoal & Gold', swatches: ['#FFFFFF', '#2D2E30', '#DCAC47', '#F8F5EE'] },
    { id: 'Neon Night', name: 'Neon Night', swatches: ['#0C0C1B', '#1A1B2E', '#00E5FF', '#FF00A0'] },
    { id: 'Ink & Paper', name: 'Ink & Paper', swatches: ['#181A1D', '#22262C', '#7C8B99', '#FAF8F3'] },
    { id: 'Deep Ocean', name: 'Deep Ocean', swatches: ['#0E141B', '#18242D', '#439A90', '#AABAC6'] },
    { id: 'Graphite & Copper', name: 'Graphite & Copper', swatches: ['#1B1C1E', '#2D2F33', '#BD7732', '#FAF5EE'] },
    { id: 'Midnight', name: 'Midnight', swatches: ['#0F0F10', '#202123', '#202123', '#E0E1E3'] },
    { id: 'Urban Dusk', name: 'Urban Dusk', swatches: ['#1F2631', '#3B4452', '#9A9185', '#E8DDCF'] },
    { id: 'Terminal Green', name: 'Terminal Green', swatches: ['#0D0E0F', '#1F2022', '#043927', '#00FF66'] },
    { id: 'Electric Orange', name: 'Electric Orange', swatches: ['#1C1E20', '#F55A00', '#D1480C', '#FAF5EF'] },
    { id: 'Warm Amber', name: 'Warm Amber', swatches: ['#1E1B18', '#F59E0B', '#8B4513', '#FEF3C7'] },
  ];
  var featuresList = ['Contact form', 'Newsletter signup', 'Blog', 'Image gallery', 'Testimonials', 'FAQ', 'Pricing table', 'Social feed', 'Map & hours', 'Multi-language'];

  function renderStepper() {
    var html = steps.map(function (s, i) {
      var cls = i < current ? 'done' : (i === current ? 'active' : '');
      var mark = i < current ? '✓' : (i + 1);
      return '<div class="step-dot ' + cls + '"><div class="circle">' + mark + '</div><div class="name">' + s + '</div></div>';
    }).join('');
    document.querySelector('.stepper').innerHTML = html;
  }

  function choiceGrid(items, key) {
    return '<div class="choice-grid">' + items.map(function (it) {
      var sel = form[key] === it.id ? 'selected' : '';
      return '<div class="choice ' + sel + '" data-' + key + '="' + it.id + '"><div class="t">' + it.t + '</div><div class="d">' + it.d + '</div></div>';
    }).join('') + '</div>';
  }

  function renderStep() {
    var panel = document.querySelector('.step-panel');
    var html = '';
    if (current === 0) {
      html = '<h2>Project basics</h2><p class="sub">Tell us who you are and what you\'re building.</p>' +
        '<div class="form-field"><label>Your name</label><input data-f="name" value="' + esc(form.name) + '" placeholder="Jane Doe"></div>' +
        '<div class="form-field"><label>Company / studio</label><input data-f="company" value="' + esc(form.company) + '" placeholder="Acme Co."></div>' +
        '<div class="form-field"><label>Email</label><input data-f="email" value="' + esc(form.email) + '" placeholder="jane@example.com"></div>' +
        '<div class="form-field"><label>What\'s the site for?</label><textarea data-f="purpose" rows="3" placeholder="A portfolio for my illustration work...">' + esc(form.purpose) + '</textarea></div>';
    } else if (current === 1) {
      html = '<h2>Pick a design style</h2><p class="sub">Sets the overall look and feel.</p>' + choiceGrid(styles, 'style');
    } else if (current === 2) {
      html = '<h2>Color scheme</h2><p class="sub">Choose a preset or tweak your own.</p>' +
        '<div class="palette-row">' + palettes.map(function (p) {
          var sel = form.palette === p.id ? 'selected' : '';
          return '<div class="palette ' + sel + '" data-palette="' + p.id + '"><div class="swatches">' + p.swatches.map(function (c) { return '<span style="background:' + c + '"></span>'; }).join('') + '</div><div class="name">' + p.name + '</div></div>';
        }).join('') + '</div>' +
        '<h3 style="font-family:var(--font-display);margin:22px 0 8px;font-size:18px;">Custom palette</h3>' +
        '<div class="hex-row">' + form.custom.map(function (c, i) {
          return '<div class="hex-field"><input type="color" data-custom="' + i + '" value="' + c + '"><input type="text" data-customhex="' + i + '" value="' + c + '"></div>';
        }).join('') + '</div>';
    } else if (current === 3) {
      var layoutOpts = [
        { key: 'hero', label: 'Hero section', opts: [['Full', 'Full Image'], ['split', 'Split image/text'], ['Gradient', 'Gradient background'], ['Bold', 'Text Only'], ['Rotating', 'Image Slider']] },
        { key: 'header', label: 'Header style', opts: [['Classic', 'Top Navbar'], ['Vertical', 'Sidebar'], ['centered', 'Centered logo']] },
        { key: 'scroll', label: 'Scroll animations', opts: [['subtle', 'Subtle fade'], ['none', 'None — static'], ['Slide', 'Slide Up'], ['Parallax', 'Parallax Layer'],] },
        { key: 'spacing', label: 'Spacing', opts: [['comfortable', 'Comfortable'], ['compact', 'Compact'], ['airy', 'Airy']] },
        { key: 'content', label: 'Content layout', opts: [['Grid', 'Card Grid'], ['Zigzag', 'Alternating'], ['Staggered', 'Masonry'], ['Scrolling', 'Timeline']] },
        { key: 'footer', label: 'Footer', opts: [['Minimal', 'Minimal'], ['Multi', 'Multi-column'], ['Fat', 'Fat Footer'], ['Sticky', 'Sticky Footer']] }
      ];
      html = '<h2>Layout preferences</h2><p class="sub">How should the page be structured?</p>';
      layoutOpts.forEach(function (g) {
        html += '<div style="margin-bottom:18px"><div style="font-weight:600;margin-bottom:8px">' + g.label + '</div><div class="choice-grid">' + g.opts.map(function (o) {
          var sel = form[g.key] === o[0] ? 'selected' : '';
          return '<div class="choice ' + sel + '" data-' + g.key + '="' + o[0] + '"><div class="t">' + o[1] + '</div></div>';
        }).join('') + '</div></div>';
      });
    } else if (current === 4) {
      html = '<h2>Extra features</h2><p class="sub">Toggle anything you\'d like included.</p>' +
        featuresList.map(function (f) {
          var on = form.features.indexOf(f) >= 0;
          return '<div class="toggle-row"><label class="toggle"><input type="checkbox" data-feature="' + f + '" ' + (on ? 'checked' : '') + '><span class="slider"></span></label><span>' + f + '</span></div>';
        }).join('');
    } else {
      var styleLabel = (styles.filter(function (s) { return s.id === form.style; })[0] || {}).t;
      var palLabel = (palettes.filter(function (p) { return p.id === form.palette; })[0] || {}).name;
      var rows = [
        ['Project', form.project],
        ['Name', form.name || '—'],
        ['Company', form.company || '—'],
        ['Email', form.email || '—'],
        ['Purpose', form.purpose || '—'],
        ['Style', styleLabel],
        ['Palette', palLabel],
        ['Custom colors', form.custom.join('  ')],
        ['Hero', form.hero], ['Header', form.header], ['Scroll', form.scroll], ['Spacing', form.spacing], ['Content', form.content], ['Footer', form.footer]
      ];
      html = '<h2>Review your brief</h2><p class="sub">Looks good? Generate the PDF.</p>';
      rows.forEach(function (r) {
        html += '<div class="review-row"><span class="k">' + r[0] + '</span><span class="v">' + esc(String(r[1])) + '</span></div>';
      });
      html += '<div class="review-row"><span class="k">Features</span><span class="v"><div class="chips">' + (form.features.length ? form.features.map(function (f) { return '<span>' + f + '</span>'; }).join('') : 'None') + '</div></span></div>';
    }
    html += '<div class="step-actions">' +
      (current > 0 ? '<button class="btn btn-ghost" data-nav="back">Back</button>' : '<span></span>') +
      (current < steps.length - 1 ? '<button class="btn btn-primary" data-nav="next">Continue</button>' : '<button class="btn btn-ink" data-nav="pdf">Generate PDF</button>') +
      '</div>';
    panel.innerHTML = html;
    bindPanel();
  }

  function bindPanel() {
    var panel = document.querySelector('.step-panel');
    panel.querySelectorAll('[data-f]').forEach(function (el) { el.addEventListener('input', function () { form[el.getAttribute('data-f')] = el.value; }); });
    panel.querySelectorAll('[data-style]').forEach(function (el) { el.addEventListener('click', function () { form.style = el.getAttribute('data-style'); renderStep(); }); });
    panel.querySelectorAll('[data-palette]').forEach(function (el) { el.addEventListener('click', function () { form.palette = el.getAttribute('data-palette'); form.custom = palettes.filter(function (p) { return p.id === form.palette; })[0].swatches.slice(); renderStep(); }); });
    panel.querySelectorAll('[data-custom]').forEach(function (el) { el.addEventListener('input', function () { form.custom[+el.getAttribute('data-custom')] = el.value; var hex = panel.querySelector('[data-customhex="' + el.getAttribute('data-custom') + '"]'); if (hex) hex.value = el.value; }); });
    panel.querySelectorAll('[data-customhex]').forEach(function (el) { el.addEventListener('input', function () { var v = el.value; if (/^#?[0-9a-fA-F]{0,6}$/.test(v)) { var c = v[0] === '#' ? v : '#' + v; form.custom[+el.getAttribute('data-customhex')] = c; var col = panel.querySelector('[data-custom="' + el.getAttribute('data-customhex') + '"]'); if (col && /^#[0-9a-fA-F]{6}$/.test(c)) col.value = c; } }); });
    ['hero', 'header', 'scroll', 'spacing', 'content', 'footer'].forEach(function (k) {
      panel.querySelectorAll('[data-' + k + ']').forEach(function (el) { el.addEventListener('click', function () { form[k] = el.getAttribute('data-' + k); renderStep(); }); });
    });
    panel.querySelectorAll('[data-feature]').forEach(function (el) { el.addEventListener('change', function () { var f = el.getAttribute('data-feature'); if (el.checked) { if (form.features.indexOf(f) < 0) form.features.push(f); } else { form.features = form.features.filter(function (x) { return x !== f; }); } }); });
    panel.querySelectorAll('[data-nav]').forEach(function (el) {
      el.addEventListener('click', function () {
        var a = el.getAttribute('data-nav');
        if (a === 'back') { current--; renderStepper(); renderStep(); }
        else if (a === 'next') { current++; renderStepper(); renderStep(); }
        else if (a === 'pdf') { generatePDF(); }
      });
    });
  }

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]; }); }

  function generatePDF() {
    if (!window.jspdf) { alert('PDF library not loaded.'); return; }
    var doc = new jspdf.jsPDF();
    var styleLabel = (styles.filter(function (s) { return s.id === form.style; })[0] || {}).t;
    var palLabel = (palettes.filter(function (p) { return p.id === form.palette; })[0] || {}).name;
    doc.setFillColor(240, 230, 207); doc.rect(0, 0, 210, 297, 'F'); doc.setFillColor(192,85,48);
doc.rect(0,0,210,45,"F");

doc.setTextColor(255,248,235);
doc.setFont("times","bold");
doc.setFontSize(24);
doc.text("Website Design Brief",105,22,{align:"center"});
    doc.setTextColor(192,85,48);
    doc.setFont('times', 'bold'); doc.setFontSize(26); doc.text('Website Design Brief', 105, 28, { align: 'center' });
    doc.setFont('times', 'italic'); doc.setFontSize(12); doc.setTextColor(192, 85, 48); doc.text('Prepared with Form', 105, 36, { align: 'center' });
    doc.setDrawColor(192, 85, 48); doc.setLineWidth(0.5); doc.line(60, 40, 150, 40);
    var rows = [
      ['Project', form.project], ['Name', form.name || '—'], ['Company', form.company || '—'], ['Email', form.email || '—'],
      ['Purpose', form.purpose || '—'], ['Design style', styleLabel], ['Color palette', palLabel + " Theme"],
      ['Custom colors', ''],
      ['Hero', form.hero], ['Header', form.header], ['Scroll', form.scroll], ['Spacing', form.spacing], ['Content layout', form.content], ['Footer', form.footer],
      ['Features', form.features.join(', ') || 'None']
    ];
    var y = 56;
    doc.setFont('helvetica', 'normal'); doc.setFontSize(11);
    rows.forEach(function (r) {
      doc.setFont("helvetica","bold");
doc.setTextColor(120,110,90);
doc.text(String(r[0]),20,y);

doc.setFont("helvetica","normal");
      doc.setTextColor(42, 32, 24); var val = String(r[1]).length > 70 ? String(r[1]).slice(0, 67) + '...' : String(r[1]);
      var lines = doc.splitTextToSize(val, 160);
      doc.text(lines, 70, y);if (r[0] === 'Custom colors') {
    let x = 70;

    form.custom.forEach(color => {
        doc.setFillColor(color);
        doc.roundedRect(x, y - 4, 8, 8, 1, 1, "F");

        doc.setDrawColor(180);
        doc.roundedRect(x, y - 4, 8, 8, 1, 1);

        x += 12;
    });
}
      y += Math.max(8, lines.length * 6);
      doc.setDrawColor(212, 196, 163); doc.setLineWidth(0.2); 
    });
    doc.setFontSize(9); doc.setTextColor(120, 110, 90); doc.text('Website Planning Summary', 105, 288, { align: 'center' });
    doc.setFontSize(11);
doc.setFont("helvetica","bold");
doc.text("Selected Color Palette",20,255);

let x = 20;

form.custom.forEach(color=>{
    doc.setFillColor(color);
    doc.roundedRect(x,260,14,14,2,2,"F");
    x += 18;
}); doc.save('website-brief.pdf');
  }

  renderStepper();
  renderStep();
})();
