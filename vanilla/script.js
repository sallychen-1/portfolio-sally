/* ═══════════════════════════════════════════════
   SALLY'S ARCHIVE BOX — Vanilla JS
   ═══════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── STATE ── */
  let currentSection = 'landing';
  let animating = false;
  let openCaseStudy = null;
  const DARK_SECTIONS = ['webdev', 'anim3d'];

  /* ── DOM REFS ── */
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => document.querySelectorAll(s);
  const dot = $('#cursorDot');
  const ring = $('#cursorRing');
  const backBtn = $('#backBtn');
  const pageWrapper = $('#pageWrapper');
  const csOverlay = $('#caseStudyOverlay');

  /* ═══════════════════════════════════════════
     CURSOR
  ═══════════════════════════════════════════ */
  let mx = 0, my = 0, rx = 0, ry = 0;
  let hoveringCursor = false;

  function onMove(e) { mx = e.clientX; my = e.clientY; }
  function cursorTick() {
    rx += (mx - rx) * 0.11;
    ry += (my - ry) * 0.11;
    if (dot) { dot.style.left = mx + 'px'; dot.style.top = my + 'px'; }
    if (ring) { ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; }
    requestAnimationFrame(cursorTick);
  }
  function setCursorHover(isHovering) {
    hoveringCursor = isHovering;
    dot.classList.toggle('hovering', isHovering);
    ring.classList.toggle('hovering', isHovering);
  }
  function updateCursorTheme() {
    const isDark = DARK_SECTIONS.includes(currentSection);
    dot.classList.toggle('cursor-dark', isDark);
    ring.classList.toggle('cursor-dark', isDark);
  }

  document.addEventListener('mousemove', onMove);
  requestAnimationFrame(cursorTick);

  function bindCursorHoverListeners() {
    $$('button, a, [data-hover], .open-btn, .project-card, .feature-card, .paper-entry, .render-pass, .pipeline-card, .spec-row, .stat-card, .skill-tag, .kw-tag, .nav-link, .nav-logo, .back-btn, #playBtn').forEach(el => {
      el.addEventListener('mouseenter', () => setCursorHover(true));
      el.addEventListener('mouseleave', () => setCursorHover(false));
    });
  }

  /* ═══════════════════════════════════════════
     PARTICLES
  ═══════════════════════════════════════════ */
  function createParticles() {
    const container = $('#particle-container');
    if (!container) return;
    for (let i = 0; i < 22; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = Math.random() * 6 + 2;
      p.style.cssText = `width:${size}px;height:${size}px;left:${Math.random()*100}vw;background:rgba(139,115,85,${Math.random()*0.12+0.04});animation-duration:${Math.random()*22+14}s;animation-delay:${Math.random()*22}s;`;
      container.appendChild(p);
    }
  }

  /* ═══════════════════════════════════════════
     NAVIGATION
  ═══════════════════════════════════════════ */
  function navigate(next) {
    if (next === currentSection || animating) return;
    animating = true;

    const currentEl = $('#' + currentSection);
    if (currentEl) currentEl.style.display = 'none';

    currentSection = next;
    const nextEl = $('#' + next);
    if (nextEl) {
      nextEl.style.display = '';
      nextEl.classList.remove('page-enter');
      void nextEl.offsetWidth;
      nextEl.classList.add('page-enter');
    }

    // Show/hide back button
    backBtn.classList.toggle('visible', next !== 'landing');
    backBtn.classList.toggle('dark', DARK_SECTIONS.includes(next));

    // Update nav links
    $$('.nav-link').forEach(l => l.classList.toggle('active', l.dataset.nav === next));

    // Update cursor theme
    updateCursorTheme();

    // Trigger reveals
    setTimeout(() => {
      $$('#' + next + ' .reveal').forEach(el => el.classList.add('visible'));
      animating = false;
    }, 100);

    window.scrollTo({ top: 0 });

    // Animate skill bars if webdev
    if (next === 'webdev') animateSkillBars();
  }

  function bindNavEvents() {
    $$('[data-nav]').forEach(el => {
      el.addEventListener('click', () => navigate(el.dataset.nav));
    });
  }

  /* ═══════════════════════════════════════════
     LANDING — CHARACTER ANIMATION
  ═══════════════════════════════════════════ */
  function buildLandingTitle() {
    const h1 = $('#landingTitle');
    if (!h1) return;
    const t1 = "Sally's";
    const t2 = 'Archive Box';
    let html = '';
    for (let i = 0; i < t1.length; i++) {
      html += `<span class="landing-char" style="animation-delay:${i*0.06}s">${t1[i]===' '?'&nbsp;':t1[i]}</span>`;
    }
    html += '<br><em style="color:var(--brown);font-style:italic">';
    for (let i = 0; i < t2.length; i++) {
      html += `<span class="landing-char" style="animation-delay:${(t1.length+i)*0.055+0.12}s">${t2[i]===' '?'&nbsp;':t2[i]}</span>`;
    }
    html += '</em>';
    h1.innerHTML = html;
  }

  /* ── BOX SCENE PARALLAX ── */
  function bindBoxParallax() {
    const scene = $('#boxScene');
    if (!scene) return;
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 16;
      const y = (e.clientY / window.innerHeight - 0.5) * 16;
      scene.style.transform = `translate(${x*0.3}px, ${y*0.3}px)`;
    });
  }

  /* ═══════════════════════════════════════════
     WEB DEV — FEATURES CYCLE
  ═══════════════════════════════════════════ */
  const FEATURES = [
    { icon: '⬡', title: 'Parallax Scroll', desc: 'Depth-layered sections driven by IntersectionObserver and CSS transforms' },
    { icon: '◐', title: 'Dark / Light Mode', desc: 'Instant theme toggle with prefers-color-scheme detection and localStorage persistence' },
    { icon: '▣', title: 'Responsive Grid', desc: 'Fluid CSS Grid layout collapsing gracefully from 1440px to 320px' },
    { icon: '⏱', title: '99 Lighthouse', desc: 'Performance-first: deferred fonts, lazy images, code splitting, < 1.2s LCP' },
    { icon: '✦', title: 'GSAP Animations', desc: 'Scroll-triggered reveal, magnetic buttons, and page transition sequences' },
    { icon: '⌂', title: 'No Framework', desc: 'Pure HTML/CSS/JS — zero dependencies, maximum control, 48kb total bundle' },
  ];
  let activeFeature = 0;
  let featureInterval;

  function buildFeaturesGrid() {
    const grid = $('#featuresGrid');
    if (!grid) return;
    grid.innerHTML = FEATURES.map((f, i) => `
      <div class="feature-card${i===0?' active':''}" data-feature="${i}">
        <div style="font-size:20px;margin-bottom:10px;opacity:0.7">${f.icon}</div>
        <div style="font-family:var(--serif);font-size:16px;color:var(--cream);margin-bottom:6px">${f.title}</div>
        <div style="font-family:var(--mono);font-size:10px;color:rgba(212,197,169,0.45);line-height:1.7">${f.desc}</div>
      </div>
    `).join('');

    grid.querySelectorAll('.feature-card').forEach(card => {
      card.addEventListener('mouseenter', () => setActiveFeature(parseInt(card.dataset.feature)));
    });

    featureInterval = setInterval(() => {
      setActiveFeature((activeFeature + 1) % FEATURES.length);
    }, 3200);
  }

  function setActiveFeature(idx) {
    activeFeature = idx;
    const grid = $('#featuresGrid');
    if (!grid) return;
    grid.querySelectorAll('.feature-card').forEach((c, i) => {
      c.classList.toggle('active', i === idx);
    });
    const label = $('#featureLabel');
    if (label) label.textContent = FEATURES[idx].title;
  }

  /* ── SKILL BARS ── */
  function animateSkillBars() {
    $$('.skill-bar-fill').forEach((bar, i) => {
      setTimeout(() => {
        bar.style.width = bar.dataset.level + '%';
      }, i * 120);
    });
  }

  /* ═══════════════════════════════════════════
     3D ANIMATION — DYNAMIC CONTENT
  ═══════════════════════════════════════════ */
  const SPECS = [
    { label: 'Software', value: 'Blender 4.1' },
    { label: 'Renderer', value: 'Cycles X' },
    { label: 'Resolution', value: '3840 × 2160' },
    { label: 'Frame Rate', value: '24 fps' },
    { label: 'Duration', value: '01:42' },
    { label: 'Render Time', value: '~4h / frame' },
    { label: 'Polygons', value: '2.4M' },
    { label: 'Samples', value: '4096' },
  ];

  const RENDER_PASSES = [
    { label: 'Beauty',    bg: 'linear-gradient(135deg,#1a0a20,#6a2060)', color: 'rgba(180,80,220,0.6)' },
    { label: 'Diffuse',   bg: 'linear-gradient(135deg,#0a0a1a,#2020a0)', color: 'rgba(80,80,200,0.6)' },
    { label: 'Specular',  bg: 'linear-gradient(135deg,#1a1a0a,#c0c000)', color: 'rgba(200,200,40,0.6)' },
    { label: 'Shadow',    bg: 'linear-gradient(135deg,#080808,#181818)', color: 'rgba(80,80,80,0.6)' },
    { label: 'Emission',  bg: 'linear-gradient(135deg,#1a0820,#8000a0)', color: 'rgba(150,0,200,0.6)' },
    { label: 'Depth',     bg: 'linear-gradient(135deg,#0a1008,#204020)', color: 'rgba(40,100,40,0.6)' },
  ];

  const PROCESS_STAGES = [
    { step:'01', title:'Concept',   desc:'Storyboard & reference gathering', icon:'◻', color:'rgba(180,80,80,0.7)',  bg:'linear-gradient(135deg,#1a0808,#300a0a)', preview:'concept' },
    { step:'02', title:'Modelling', desc:'Polygon mesh & topology',          icon:'⬡', color:'rgba(74,120,180,0.7)',  bg:'linear-gradient(135deg,#080f1a,#0a1a30)', preview:'model'   },
    { step:'03', title:'Shading',   desc:'Materials, textures & PBR maps',  icon:'◑', color:'rgba(160,100,40,0.7)',  bg:'linear-gradient(135deg,#1a0f00,#2a1a00)', preview:'shade'   },
    { step:'04', title:'Lighting',  desc:'HDRI + area lights + GI',         icon:'✦', color:'rgba(200,180,60,0.7)',  bg:'linear-gradient(135deg,#1a1800,#2c2600)', preview:'light'   },
    { step:'05', title:'Animation', desc:'Rigging, keyframes & physics sim', icon:'▷', color:'rgba(80,160,80,0.7)', bg:'linear-gradient(135deg,#081408,#0a2010)', preview:'anim'    },
    { step:'06', title:'Render',    desc:'Cycles renderer · 4K · 24fps',     icon:'■', color:'rgba(180,80,220,0.7)', bg:'linear-gradient(135deg,#100820,#1a0a30)', preview:'render'  },
  ];

  let activeStage = 0;
  let stageInterval;

  function buildAnimSection() {
    // Specs table
    const specs = $('#specsTable');
    if (specs) {
      specs.innerHTML = SPECS.map(s =>
        `<div class="spec-row"><span style="font-family:var(--mono);font-size:10px;color:rgba(212,197,169,0.4);letter-spacing:0.08em">${s.label}</span><span style="font-family:var(--mono);font-size:11px;color:rgba(212,197,169,0.75);letter-spacing:0.06em">${s.value}</span></div>`
      ).join('');
    }

    // Render passes
    const passes = $('#renderPasses');
    if (passes) {
      passes.innerHTML = RENDER_PASSES.map(p =>
        `<div class="render-pass" style="background:${p.bg}" data-color="${p.color}">
          <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 40% 40%,${p.color},transparent 70%);opacity:0.5"></div>
          <svg style="position:absolute;inset:0;width:100%;height:100%;opacity:0.25" viewBox="0 0 80 50"><polygon points="40,5 70,45 10,45" fill="none" stroke="white" stroke-width="1"/></svg>
          <div style="position:absolute;bottom:5px;left:0;right:0;text-align:center;font-family:var(--mono);font-size:8px;letter-spacing:0.1em;color:rgba(255,255,255,0.45)">${p.label}</div>
        </div>`
      ).join('');

      passes.querySelectorAll('.render-pass').forEach(el => {
        el.addEventListener('mouseenter', () => { el.style.boxShadow = `0 8px 32px ${el.dataset.color}`; });
        el.addEventListener('mouseleave', () => { el.style.boxShadow = 'none'; });
      });
    }

    // Pipeline
    const pipeline = $('#pipelineGrid');
    if (pipeline) {
      pipeline.innerHTML = PROCESS_STAGES.map((s, i) => {
        const previewMap = { concept: 'rgba(255,255,255,0.04)', model: 'rgba(255,255,255,0.06)', shade: s.color, light: 'rgba(255,255,200,0.06)', anim: s.color, render: s.color };
        let previewExtra = '';
        if (s.preview === 'shade' || s.preview === 'render') {
          previewExtra = `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 35% 35%,${s.color},transparent 65%);opacity:0.35"></div>`;
        }
        if (s.preview === 'light') {
          previewExtra = `<div style="position:absolute;top:10px;left:14px;width:20px;height:20px;border-radius:50%;background:rgba(255,255,200,0.5);filter:blur(8px)"></div>`;
        }
        const wireframeOpacity = s.preview === 'model' ? 0.6 : 0.2;
        let modelExtra = '';
        if (s.preview === 'model') {
          modelExtra = `<polygon points="40,12 66,50 14,50" fill="none" stroke="${s.color}" stroke-width="0.7" opacity="0.4"/><line x1="40" y1="12" x2="8" y2="56" stroke="${s.color}" stroke-width="0.4" opacity="0.3"/><line x1="40" y1="12" x2="72" y2="56" stroke="${s.color}" stroke-width="0.4" opacity="0.3"/>`;
        }
        return `
        <div class="pipeline-card${i===0?' active':''}" data-stage="${i}" style="${i===0?'border-color:'+s.color+';box-shadow:0 12px 40px '+s.color.replace('0.7','0.25')+';':''}">
          <div style="height:60px;background:${s.bg};position:relative;overflow:hidden">
            <div style="width:100%;height:100%;background:${previewMap[s.preview]};display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden">
              <svg viewBox="0 0 80 60" style="width:60px;height:44px;opacity:${wireframeOpacity}"><polygon points="40,4 72,56 8,56" fill="none" stroke="${s.color}" stroke-width="1.5"/><line x1="40" y1="4" x2="40" y2="56" stroke="${s.color}" stroke-width="0.5" opacity="0.5"/><line x1="8" y1="56" x2="72" y2="56" stroke="${s.color}" stroke-width="0.5" opacity="0.5"/>${modelExtra}</svg>
              ${previewExtra}
            </div>
          </div>
          <div style="padding:10px 12px">
            <div style="font-family:var(--mono);font-size:8px;color:${s.color};letter-spacing:0.1em;margin-bottom:4px">${s.step}</div>
            <div style="font-family:var(--serif);font-size:13px;color:rgba(212,197,169,0.85);margin-bottom:3px">${s.title}</div>
            <div style="font-family:var(--mono);font-size:8px;color:rgba(212,197,169,0.35);line-height:1.6">${s.desc}</div>
          </div>
        </div>`;
      }).join('');

      pipeline.querySelectorAll('.pipeline-card').forEach(card => {
        card.addEventListener('mouseenter', () => setPipelineStage(parseInt(card.dataset.stage)));
      });

      stageInterval = setInterval(() => {
        setPipelineStage((activeStage + 1) % PROCESS_STAGES.length);
      }, 2800);
    }
  }

  function setPipelineStage(idx) {
    activeStage = idx;
    const pipeline = $('#pipelineGrid');
    if (!pipeline) return;
    pipeline.querySelectorAll('.pipeline-card').forEach((card, i) => {
      const s = PROCESS_STAGES[i];
      if (i === idx) {
        card.classList.add('active');
        card.style.borderColor = s.color;
        card.style.boxShadow = `0 12px 40px ${s.color.replace('0.7', '0.25')}`;
      } else {
        card.classList.remove('active');
        card.style.borderColor = 'rgba(255,255,255,0.06)';
        card.style.boxShadow = 'none';
      }
    });
  }

  /* ── VIDEO PLAYER ── */
  let isPlaying = false;
  function bindVideoPlayer() {
    const player = $('#videoPlayer');
    const overlay = $('#playOverlay');
    const playBtn = $('#playBtn');

    if (player) {
      player.addEventListener('click', () => {
        isPlaying = !isPlaying;
        if (overlay) overlay.style.background = isPlaying ? 'transparent' : 'rgba(0,0,0,0.35)';
        if (isPlaying) {
          if (playBtn) playBtn.style.display = 'none';
          $('#progressFill').style.width = '60%';
        } else {
          if (playBtn) playBtn.style.display = '';
          $('#progressFill').style.width = '0%';
        }
      });
    }
  }

  /* ═══════════════════════════════════════════
     PAPERS — DYNAMIC CONTENT
  ═══════════════════════════════════════════ */
  const PAPERS = [
    { num:'Paper 01 — 2024', title:'Emotional Affordances in Mobile Interface Design: A User Study', abstract:'This paper investigates the role of microinteractions and haptic feedback in building emotional resonance between users and digital interfaces. Drawing on 120 participant studies, we propose a framework for designing emotionally intelligent mobile applications.', keywords:['HCI','Microinteractions','Emotion','Mobile UX'], venue:'NTUA — 2024', accentColor:'#5C7A5C' },
    { num:'Paper 02 — 2024', title:'Generative Aesthetics: How AI is Reshaping Visual Communication', abstract:"An exploration of generative AI's influence on graphic design practice. This paper analyzes 50 professional designers' workflows and proposes a new taxonomy of human-AI creative collaboration modes in commercial design contexts.", keywords:['AI','Generative Design','Visual Comm','Creativity'], venue:'IDF — 2024', accentColor:'#4A6B8A' },
    { num:'Paper 03 — 2023', title:'Wayfinding in Spatial Interfaces: Lessons from Physical Architecture', abstract:'Drawing parallels between physical wayfinding research and digital navigation design, this paper proposes architectural principles as a framework for improving spatial orientation in complex web and AR applications.', keywords:['Navigation','Architecture','AR/VR','Wayfinding'], venue:'NTUA — 2023', accentColor:'#C9A84C' },
    { num:'Paper 04 — 2023', title:'Motion Language: Standardising Animation in Design Systems', abstract:'A comparative analysis of animation tokens and motion specifications across 12 major design systems. Proposes a universal motion grammar to improve consistency and cross-platform legibility of animated interfaces.', keywords:['Motion Design','Design Systems','Animation','Standards'], venue:'School of Motion — 2023', accentColor:'#C47A8A' },
  ];

  function buildPapersSection() {
    const grid = $('#papersGrid');
    if (!grid) return;
    grid.innerHTML = PAPERS.map(p => `
      <div class="paper-entry reveal" style="border-left:4px solid ${p.accentColor}">
        <div style="font-family:var(--mono);font-size:9px;letter-spacing:0.2em;color:var(--warm-gray);margin-bottom:10px;text-transform:uppercase">${p.num}</div>
        <div style="font-family:var(--serif);font-size:21px;font-weight:400;color:var(--dark-brown);line-height:1.3;margin-bottom:12px">${p.title}</div>
        <p style="font-size:12px;color:var(--warm-gray);line-height:1.85;margin-bottom:16px">${p.abstract}</p>
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:16px">${p.keywords.map(k=>`<span class="kw-tag">${k}</span>`).join('')}</div>
        <div style="display:flex;align-items:center;justify-content:space-between;padding-top:14px;border-top:1px dashed rgba(139,115,85,0.2)">
          <button style="font-family:var(--mono);font-size:9px;letter-spacing:0.12em;text-transform:uppercase;color:var(--dark-brown);border:1px solid var(--tan);padding:5px 12px;border-radius:2px;cursor:none;background:none;transition:background 0.2s,color 0.2s" onmouseenter="this.style.background='var(--dark-brown)';this.style.color='var(--paper)'" onmouseleave="this.style.background='none';this.style.color='var(--dark-brown)'">PDF Access</button>
          <span style="font-family:var(--mono);font-size:10px;color:var(--warm-gray)">${p.venue}</span>
        </div>
      </div>
    `).join('');
  }

  /* ═══════════════════════════════════════════
     CASE STUDY OVERLAY
  ═══════════════════════════════════════════ */
  const CASE_DATA = {
    ticket: {
      title:'Ticket Booking App', tagline:'From discovery to confirmed ticket in under 60 seconds',
      year:'2024', role:'UI/UX Designer', duration:'8 weeks', platform:'iOS',
      accentColor:'#C9A84C', paletteLight:'rgba(201,168,76,0.12)',
      palette:['#1A1A18','#C9A84C','#F5F0E8','#E8D89A','#9A4A4A'], paletteNames:['Ink','Gold','Cream','Mist','Alert'],
      metrics:[{value:'43%',label:'Drop-off reduction'},{value:'60s',label:'Checkout time'},{value:'14',label:'User interviews'},{value:'40+',label:'Components built'}],
      problem:'68% of users abandoned checkout because the total price appeared only after seat selection.',
      insight:'Showing total cost upfront — even when higher than expected — builds more trust than hiding it.',
      result:'Redesigned the entire purchase flow from 7 steps down to 3, with price transparency at every stage.',
      process:[{step:'01',title:'Research',detail:'14 interviews · 200 surveys · Competitor analysis'},{step:'02',title:'Define',detail:'Pain-point mapping · Affinity clustering · HMW statements'},{step:'03',title:'Design',detail:'40+ Figma components · 3 prototype iterations'},{step:'04',title:'Test',detail:'2 moderated usability sessions · A/B tested CTAs'}],
      screens:[
        {bg:'linear-gradient(160deg,#1a1208,#3a2810)',content:'home'},
        {bg:'linear-gradient(160deg,#120a02,#2a1a08)',content:'seat'},
        {bg:'linear-gradient(160deg,#0a0802,#201808)',content:'checkout'},
      ],
    },
    coffee: {
      title:'Coffee Ordering App', tagline:'Designed to feel as warm as the café itself',
      year:'2024', role:'UI/UX Designer', duration:'6 weeks', platform:'Android',
      accentColor:'#A87878', paletteLight:'rgba(168,120,120,0.12)',
      palette:['#2C1810','#A87878','#FAF0E6','#D4A880','#5C4030'], paletteNames:['Espresso','Terracotta','Milk','Caramel','Bark'],
      metrics:[{value:'5',label:'Usability tests'},{value:'32%',label:'Repeat order rate'},{value:'4.8',label:'User satisfaction'},{value:'2',label:'Days café research'}],
      problem:'The white-label app felt cold and generic. Customers preferred ordering in person because "the app doesn\'t feel like us."',
      insight:"People don't just buy coffee — they buy a feeling. Every pixel should evoke the warmth of the café.",
      result:'A fully custom design language: terracotta palette, artisan typography, illustrated ingredients, and micro-animations.',
      process:[{step:'01',title:'Immersion',detail:'2 days in-café · Staff interviews · Photography session'},{step:'02',title:'Brand DNA',detail:'Mood board · Colour system · Type pairing'},{step:'03',title:'Design',detail:'Custom icon set · Illustrated components · Motion spec'},{step:'04',title:'Validate',detail:'5 usability tests · Staff walkthroughs · Iteration'}],
      screens:[
        {bg:'linear-gradient(160deg,#1a0c08,#3a1810)',content:'splash',imageSrc:'assets/1.png'},
        {bg:'linear-gradient(160deg,#150a06,#2c1408)',content:'signup',imageSrc:'assets/4.png'},
        {bg:'linear-gradient(160deg,#0c0804,#201410)',content:'menu',imageSrc:'assets/6.png'},
      ],
    },
  };

  function openCase(id) {
    openCaseStudy = id;
    const d = CASE_DATA[id];
    if (!d) return;
    const content = $('#caseStudyContent');

    const phoneTransforms = ['rotate(-6deg) translateY(-12px)','rotate(0deg) translateY(-4px) scale(1.06)','rotate(6deg) translateY(-12px)'];
    const phoneZ = [1,3,1];

    const phonesHtml = d.screens.map((s, i) => {
      const screenContent = s.imageSrc
        ? `<img src="${s.imageSrc}" alt="App screen" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;border-radius:22px">`
        : buildPlaceholderScreen(s.content, d.accentColor);
      return `
        <div class="float-a" style="width:130px;height:250px;border-radius:22px;background:${s.bg};border:1.5px solid rgba(255,255,255,0.12);box-shadow:0 28px 80px rgba(0,0,0,0.5);position:relative;overflow:hidden;flex-shrink:0;transform:${phoneTransforms[i]};z-index:${phoneZ[i]};animation-delay:${i*0.5}s">
          <div style="position:absolute;top:10px;left:50%;transform:translateX(-50%);width:36px;height:5px;background:rgba(0,0,0,0.6);border-radius:3px;z-index:4"></div>
          ${screenContent}
          <div style="position:absolute;bottom:10px;left:50%;transform:translateX(-50%);width:36px;height:4px;background:rgba(255,255,255,0.25);border-radius:2px"></div>
        </div>`;
    }).join('');

    content.innerHTML = `
      <button id="csCloseBtn" style="position:fixed;top:20px;right:48px;z-index:502;font-family:var(--mono);font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:var(--dark-brown);border:1px solid var(--tan);padding:8px 16px;border-radius:2px;background:rgba(250,247,242,0.92);backdrop-filter:blur(8px);cursor:none;transition:background 0.2s,color 0.2s" onmouseenter="this.style.background='var(--dark-brown)';this.style.color='var(--paper)'" onmouseleave="this.style.background='rgba(250,247,242,0.92)';this.style.color='var(--dark-brown)'">Close ×</button>

      <!-- Hero -->
      <div style="min-height:100vh;background:#0E0C0A;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:80px 48px;position:relative;overflow:hidden">
        <div style="position:absolute;top:30%;left:50%;transform:translate(-50%,-50%);width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,${d.accentColor}22 0%,transparent 70%);pointer-events:none"></div>
        <div style="display:flex;gap:12px;margin-bottom:32px;flex-wrap:wrap;justify-content:center">
          ${[d.year,d.role,d.platform,d.duration].map(m=>`<span style="font-family:var(--mono);font-size:9.5px;letter-spacing:0.18em;text-transform:uppercase;color:rgba(212,197,169,0.45);border:1px solid rgba(255,255,255,0.08);padding:5px 12px;border-radius:2px">${m}</span>`).join('')}
        </div>
        <h1 style="font-family:var(--serif);font-size:clamp(44px,7vw,80px);font-weight:300;color:var(--cream);line-height:1;text-align:center;margin-bottom:16px;letter-spacing:-0.01em">${d.title}</h1>
        <p style="font-family:var(--serif);font-style:italic;font-size:20px;color:${d.accentColor};text-align:center;margin-bottom:64px;opacity:0.85">${d.tagline}</p>
        <div style="display:flex;align-items:flex-end;gap:16px;position:relative;z-index:2">${phonesHtml}</div>
      </div>

      <div style="background:var(--paper)">
        <!-- Metrics -->
        <div style="display:grid;grid-template-columns:repeat(4,1fr);border-bottom:1px solid rgba(139,115,85,0.15)">
          ${d.metrics.map((m,i)=>`<div style="padding:40px 32px;${i<3?'border-right:1px solid rgba(139,115,85,0.12);':''}text-align:center"><div style="font-family:var(--serif);font-size:52px;font-weight:300;color:${d.accentColor};line-height:1">${m.value}</div><div style="font-family:var(--mono);font-size:9.5px;letter-spacing:0.16em;text-transform:uppercase;color:var(--warm-gray);margin-top:8px">${m.label}</div></div>`).join('')}
        </div>

        <!-- Colour Palette -->
        <div style="padding:64px 80px;border-bottom:1px solid rgba(139,115,85,0.12);max-width:1000px;margin:0 auto">
          <div style="font-family:var(--mono);font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:var(--warm-gray);margin-bottom:28px">Colour Palette</div>
          <div style="display:flex;gap:0;height:80px;border-radius:6px;overflow:hidden;box-shadow:0 8px 32px rgba(74,55,40,0.15)">
            ${d.palette.map((c,i)=>`<div style="flex:1;background:${c};position:relative;transition:flex 0.4s ease;cursor:default" onmouseenter="this.style.flex='2'" onmouseleave="this.style.flex='1'"><div style="position:absolute;bottom:10px;left:50%;transform:translateX(-50%);font-family:var(--mono);font-size:8px;letter-spacing:0.08em;color:${i===2?'rgba(0,0,0,0.45)':'rgba(255,255,255,0.55)'};white-space:nowrap;text-align:center">${d.paletteNames[i]}</div></div>`).join('')}
          </div>
        </div>

        <!-- Problem / Insight / Result -->
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;max-width:1000px;margin:0 auto;padding:0 80px 64px;gap:2px">
          ${[{label:'Problem',text:d.problem,icon:'⚡',color:'#9A4A4A'},{label:'Insight',text:d.insight,icon:'◎',color:d.accentColor},{label:'Result',text:d.result,icon:'✓',color:'#5C7A5C'}].map(c=>`
            <div style="padding:32px;background:rgba(250,247,242,0.7);border:1px solid rgba(139,115,85,0.12);border-top:3px solid ${c.color};border-radius:2px">
              <div style="font-family:var(--mono);font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:${c.color};margin-bottom:16px">${c.icon} ${c.label}</div>
              <p style="font-family:var(--serif);font-size:16px;color:var(--dark-brown);line-height:1.75">${c.text}</p>
            </div>`).join('')}
        </div>

        <!-- Process -->
        <div style="max-width:1000px;margin:0 auto;padding:0 80px 80px">
          <div style="font-family:var(--mono);font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:var(--warm-gray);margin-bottom:28px">Process</div>
          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px">
            ${d.process.map((p,i)=>`
              <div style="padding:28px 24px;background:#fff;border:1px solid rgba(139,115,85,0.14);border-radius:3px;position:relative;overflow:hidden;transition:transform 0.25s ease,box-shadow 0.25s" onmouseenter="this.style.transform='translateY(-4px)';this.style.boxShadow='0 12px 40px rgba(74,55,40,0.12)'" onmouseleave="this.style.transform='none';this.style.boxShadow='none'">
                <div style="font-family:var(--serif);font-size:64px;font-weight:300;color:${d.accentColor};opacity:0.12;position:absolute;top:-10px;right:8px;line-height:1">${p.step}</div>
                <div style="font-family:var(--mono);font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:${d.accentColor};margin-bottom:10px">${p.step}</div>
                <div style="font-family:var(--serif);font-size:20px;color:var(--dark-brown);margin-bottom:10px">${p.title}</div>
                <div style="font-family:var(--mono);font-size:10px;color:var(--warm-gray);line-height:1.8">${p.detail}</div>
                ${i<3?`<div style="position:absolute;right:-9px;top:50%;transform:translateY(-50%);width:18px;height:18px;border-radius:50%;background:var(--tan);display:flex;align-items:center;justify-content:center;z-index:2;font-size:9px;color:var(--brown)">→</div>`:''}
              </div>`).join('')}
          </div>
        </div>
      </div>
    `;

    csOverlay.classList.add('open');

    // Bind close
    const closeBtn = $('#csCloseBtn');
    if (closeBtn) closeBtn.addEventListener('click', closeCaseStudy);

    // Rebind cursor hover for new elements
    bindCursorHoverListeners();
  }

  function closeCaseStudy() {
    openCaseStudy = null;
    csOverlay.classList.remove('open');
  }

  function buildPlaceholderScreen(content, accent) {
    const bars = `<div style="height:6px;border-radius:3px;background:rgba(255,255,255,0.12);margin-bottom:6px"></div><div style="height:6px;border-radius:3px;background:rgba(255,255,255,0.07);width:65%;margin-bottom:14px"></div>`;

    if (content === 'home' || content === 'menu') {
      return `<div style="padding:28px 12px 12px">${bars}<div style="height:70px;border-radius:8px;background:${accent}30;margin-bottom:8px;display:flex;align-items:center;justify-content:center"><div style="width:32px;height:32px;border-radius:50%;background:${accent}50;border:1px solid ${accent}80"></div></div><div style="height:5px;border-radius:3px;background:rgba(255,255,255,0.1);margin-bottom:4px"></div><div style="height:5px;border-radius:3px;background:rgba(255,255,255,0.06);width:80%;margin-bottom:14px"></div><div style="display:flex;gap:6px">${[0,1,2].map(()=>`<div style="flex:1;height:40px;border-radius:6px;background:${accent}20;border:1px solid ${accent}30"></div>`).join('')}</div></div>`;
    }
    if (content === 'seat' || content === 'product') {
      return `<div style="padding:28px 12px 12px">${bars}<div style="height:90px;border-radius:6px;background:${accent}20;border:1px solid ${accent}30;margin-bottom:8px;position:relative;display:flex;align-items:center;justify-content:center"><div style="width:40px;height:40px;border-radius:50%;background:${accent}40"></div></div><div style="height:5px;border-radius:3px;background:rgba(255,255,255,0.1);margin-bottom:4px"></div><div style="height:5px;border-radius:3px;background:rgba(255,255,255,0.07);width:70%;margin-bottom:12px"></div><div style="height:28px;border-radius:5px;background:${accent};opacity:0.7"></div></div>`;
    }
    return `<div style="padding:28px 12px 12px">${bars}<div style="height:5px;border-radius:3px;background:rgba(255,255,255,0.08);margin-bottom:8px"></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:10px">${[0,1,2,3].map(i=>`<div style="height:30px;border-radius:5px;background:${accent}${i<2?'25':'15'}"></div>`).join('')}</div><div style="height:28px;border-radius:5px;background:${accent};opacity:0.75;margin-top:16px"></div></div>`;
  }

  function bindCaseStudyButtons() {
    $$('.open-btn[data-case]').forEach(btn => {
      btn.addEventListener('click', () => openCase(btn.dataset.case));
    });
  }

  /* ═══════════════════════════════════════════
     INIT
  ═══════════════════════════════════════════ */
  function init() {
    createParticles();
    buildLandingTitle();
    bindBoxParallax();
    buildFeaturesGrid();
    buildAnimSection();
    buildPapersSection();
    bindNavEvents();
    bindCaseStudyButtons();
    bindVideoPlayer();
    bindCursorHoverListeners();

    // Initial reveal for landing
    setTimeout(() => {
      $$('#landing .reveal').forEach(el => el.classList.add('visible'));
    }, 100);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
