/* SALLY'S ARCHIVE BOX - Vanilla JS */

(function () {
  'use strict';

  let currentSection = 'landing';
  let animating = false;
  let openCaseStudy = null;

  const DARK_SECTIONS = ['webdev', 'anim3d'];

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => document.querySelectorAll(s);

  const dot = $('#cursorDot');
  const ring = $('#cursorRing');
  const backBtn = $('#backBtn');
  const csOverlay = $('#caseStudyOverlay');

  let mx = 0;
  let my = 0;
  let rx = 0;
  let ry = 0;

  function onMove(e) {
    mx = e.clientX;
    my = e.clientY;
  }

  function cursorTick() {
    rx += (mx - rx) * 0.11;
    ry += (my - ry) * 0.11;

    if (dot) {
      dot.style.left = mx + 'px';
      dot.style.top = my + 'px';
    }

    if (ring) {
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
    }

    requestAnimationFrame(cursorTick);
  }

  function setCursorHover(isHovering) {
    if (!dot || !ring) return;

    dot.classList.toggle('hovering', isHovering);
    ring.classList.toggle('hovering', isHovering);
  }

  function updateCursorTheme() {
    if (!dot || !ring) return;

    const isDark = DARK_SECTIONS.includes(currentSection);

    dot.classList.toggle('cursor-dark', isDark);
    ring.classList.toggle('cursor-dark', isDark);
  }

  document.addEventListener('mousemove', onMove);
  requestAnimationFrame(cursorTick);

  function bindCursorHoverListeners() {
    $$(
      'button, a, [data-hover], .open-btn, .project-card, .feature-card, .paper-entry, .render-pass, .pipeline-card, .spec-row, .stat-card, .stat-box, .skill-tag, .kw-tag, .nav-link, .nav-logo, .back-btn, #playBtn, .film-frame, .feat-card'
    ).forEach((el) => {
      el.addEventListener('mouseenter', () => setCursorHover(true));
      el.addEventListener('mouseleave', () => setCursorHover(false));
    });
  }

  function createParticles() {
    const container = $('#particle-container');
    if (!container) return;

    container.innerHTML = '';

    for (let i = 0; i < 22; i++) {
      const p = document.createElement('div');
      p.className = 'particle';

      const size = Math.random() * 6 + 2;

      p.style.cssText = `
        width:${size}px;
        height:${size}px;
        left:${Math.random() * 100}vw;
        background:rgba(139,115,85,${Math.random() * 0.12 + 0.04});
        animation-duration:${Math.random() * 22 + 14}s;
        animation-delay:${Math.random() * 22}s;
      `;

      container.appendChild(p);
    }
  }

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

    if (backBtn) {
      backBtn.classList.toggle('visible', next !== 'landing');
      backBtn.classList.toggle('dark', DARK_SECTIONS.includes(next));
    }

    $$('.nav-link').forEach((link) => {
      link.classList.toggle('active', link.dataset.nav === next);
    });

    updateCursorTheme();

    setTimeout(() => {
      $$('#' + next + ' .reveal').forEach((el) => {
        el.classList.add('visible');
      });

      animating = false;
    }, 100);

    window.scrollTo({ top: 0, behavior: 'instant' });

    if (next === 'landing') {
      const scene = $('#boxScene');

      if (scene) {
        scene.classList.add('reset-box');
        scene.style.transform = 'translate(0px, 0px)';

        setTimeout(() => {
          scene.classList.remove('reset-box');
          scene.style.transform = 'translate(0px, 0px)';
        }, 450);
      }
    }

    if (next === 'webdev') {
      animateSkillBars();
      buildWebDevShowcase();
    }
  }

  function bindNavEvents() {
    $$('[data-nav]').forEach((el) => {
      el.addEventListener('click', () => {
        navigate(el.dataset.nav);
      });
    });
  }

  function buildLandingTitle() {
    const h1 = $('#landingTitle');
    if (!h1) return;

    const t1 = "Sally's";
    const t2 = 'Archive Box';

    let html = '';

    for (let i = 0; i < t1.length; i++) {
      html += `
        <span class="landing-char" style="animation-delay:${i * 0.06}s">
          ${t1[i] === ' ' ? '&nbsp;' : t1[i]}
        </span>
      `;
    }

    html += '<br><em style="color:var(--brown);font-style:italic">';

    for (let i = 0; i < t2.length; i++) {
      html += `
        <span class="landing-char" style="animation-delay:${(t1.length + i) * 0.055 + 0.12}s">
          ${t2[i] === ' ' ? '&nbsp;' : t2[i]}
        </span>
      `;
    }

    html += '</em>';

    h1.innerHTML = html;
  }

  function bindBoxParallax() {
    const scene = $('#boxScene');
    if (!scene) return;

    scene.style.transform = 'translate(0px, 0px)';

    scene.addEventListener('mousemove', (e) => {
      if (currentSection !== 'landing') return;
      if (scene.classList.contains('reset-box')) return;

      const rect = scene.getBoundingClientRect();

      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 16;

      scene.style.transform = `translate(${x * 0.4}px, ${y * 0.4}px)`;
    });

    scene.addEventListener('mouseleave', () => {
      scene.style.transition = 'transform 0.4s ease';
      scene.style.transform = 'translate(0px, 0px)';

      setTimeout(() => {
        scene.style.transition = '';
        scene.style.transform = 'translate(0px, 0px)';
      }, 400);
    });
  }

  function buildWebDevShowcase() {
    const filmstrip = $('#filmstrip');

    if (filmstrip && filmstrip.children.length === 0) {
      const screens = [
        { src: 'assets/Search Flight.png', label: 'Flight' },
        { src: 'assets/Search Hotel.png', label: 'Hotel' },
        { src: 'assets/Search Taxi.png', label: 'Search Taxi' },
        { src: 'assets/Home.png', label: 'Home' },
        { src: 'assets/Flight Details.png', label: 'Flight Details' },
        { src: 'assets/Flight Searching.png', label: 'Flight Searching' },
        { src: 'assets/Information.png', label: 'Information' },
        { src: 'assets/Boarding Pass.png', label: 'Boarding Pass' },
        { src: 'assets/Select Seat.png', label: 'Select Seat' },
        { src: 'assets/Order Confirm.png', label: 'Order Confirm' },
        { src: 'assets/Search Villa.png', label: 'Villa' },
        { src: 'assets/Payment Method.png', label: 'Payment Method' }
      ];

      const doubled = [...screens, ...screens];

      doubled.forEach((screen, i) => {
        const frame = document.createElement('div');

        frame.className = 'film-frame';

        frame.innerHTML = `
          <img src="${screen.src}" alt="${screen.label}">
          <span class="film-num">
            ${String((i % screens.length) + 1).padStart(2, '0')}
          </span>
          <span class="film-label">
            ${screen.label}
          </span>
        `;

        filmstrip.appendChild(frame);
      });
    }

    const perfs = [$('#topPerf'), $('#botPerf')];

    perfs.forEach((perf) => {
      if (!perf || perf.children.length > 0) return;

      for (let i = 0; i < 50; i++) {
        const d = document.createElement('div');
        d.className = 'perf';
        perf.appendChild(d);
      }
    });

    const skillsPanel = $('#skillsPanel');

    if (skillsPanel && skillsPanel.children.length === 0) {
      const skills = [
        { name: 'HTML', level: 95 },
        { name: 'CSS', level: 92 },
        { name: 'JavaScript', level: 88 },
        { name: 'Responsive', level: 90 },
        { name: 'UI Build', level: 85 }
      ];

      const DOTS = 12;

      skills.forEach((skill) => {
        const filled = Math.round((skill.level / 100) * DOTS);

        let dotsHtml = '';

        for (let i = 0; i < DOTS; i++) {
          dotsHtml += `
            <div class="sdot ${i < filled ? 'on' : 'off'}"></div>
          `;
        }

        skillsPanel.innerHTML += `
          <div class="skill-row">
            <span class="skill-name">${skill.name}</span>
            <div class="signal-dots">${dotsHtml}</div>
            <span class="skill-pct">${skill.level}%</span>
          </div>
        `;
      });
    }

    const featList = $('#featList');

    if (featList && featList.children.length === 0) {
      const feats = [
        {
          icon: 'fa-solid fa-table-cells-large',
          title: 'Responsive Layout',
          desc: 'Fluid interface across desktop and mobile screens.'
        },
        {
          icon: 'fa-solid fa-plane-departure',
          title: 'Booking Flow',
          desc: 'Multi-step ticket booking experience from search to boarding pass.'
        },
        {
          icon: 'fa-solid fa-hotel',
          title: 'Hotel Search',
          desc: 'Hotel discovery pages with a consistent visual system.'
        },
        {
          icon: 'fa-solid fa-house-chimney',
          title: 'Villa Rental',
          desc: 'Luxury accommodation browsing for travel users.'
        },
        {
          icon: 'fa-solid fa-taxi',
          title: 'Taxi Booking',
          desc: 'Transportation service interface inside the same platform.'
        },
        {
          icon: 'fa-brands fa-js',
          title: 'JS',
          desc: 'Interactive behavior built without heavy frameworks.'
        }
      ];

      feats.forEach((f, i) => {
        const card = document.createElement('div');

        card.className = 'feat-card' + (i === 0 ? ' active' : '');

        card.innerHTML = `
          <i class="${f.icon} feat-icon" aria-hidden="true"></i>
          <div class="feat-title">${f.title}</div>
          <div class="feat-desc">${f.desc}</div>
        `;

        card.addEventListener('mouseenter', () => {
          featList.querySelectorAll('.feat-card').forEach((c) => {
            c.classList.remove('active');
          });

          card.classList.add('active');
        });

        featList.appendChild(card);
      });

      let idx = 0;

      setInterval(() => {
        const cards = featList.querySelectorAll('.feat-card');
        if (!cards.length) return;

        cards.forEach((c) => c.classList.remove('active'));

        idx = (idx + 1) % cards.length;

        cards[idx].classList.add('active');
      }, 3000);
    }

    bindCursorHoverListeners();
  }

  function animateSkillBars() {
    $$('.skill-bar-fill').forEach((bar, i) => {
      setTimeout(() => {
        bar.style.width = bar.dataset.level + '%';
      }, i * 120);
    });
  }

  const SPECS = [
    { label: 'Project', value: 'The Light We Lost' },
    { label: 'Genre', value: 'Emotional Short Film' },
    { label: 'Resolution', value: '1920 x 1080' },
    { label: 'Frame Rate', value: '24 fps' },
    { label: 'Duration', value: '01:00' },
    { label: 'Theme', value: 'Memory & Separation' },
  ];

  const RENDER_PASSES = [
    { label: 'Opening', img: 'assets/thumb_opening.jpg', color: 'rgba(212,197,169,0.4)' },
    { label: 'Warm Memory', img: 'assets/thumb_2.jpg', color: 'rgba(212,197,169,0.4)' },
    { label: 'Reflection', img: 'assets/thumb_3.jpg', color: 'rgba(212,197,169,0.4)' },
    { label: 'Distance', img: 'assets/thumb_4.jpg', color: 'rgba(212,197,169,0.4)' },
    { label: 'Loss', img: 'assets/thumb_5.jpg', color: 'rgba(212,197,169,0.4)' },
    { label: 'Acceptance', img: 'assets/thumb_6.jpg', color: 'rgba(212,197,169,0.4)' }
  ];

  const PROCESS_STAGES = [
    {
      step: '01',
      title: 'Concept',
      desc: 'Storyboard & reference gathering',
      color: 'rgba(180,80,80,0.7)',
      bg: 'linear-gradient(135deg,#1a0808,#300a0a)',
      preview: 'concept'
    },
    {
      step: '02',
      title: 'Modelling',
      desc: 'Polygon mesh & topology',
      color: 'rgba(74,120,180,0.7)',
      bg: 'linear-gradient(135deg,#080f1a,#0a1a30)',
      preview: 'model'
    },
    {
      step: '03',
      title: 'Shading',
      desc: 'Materials, textures & PBR maps',
      color: 'rgba(160,100,40,0.7)',
      bg: 'linear-gradient(135deg,#1a0f00,#2a1a00)',
      preview: 'shade'
    },
    {
      step: '04',
      title: 'Lighting',
      desc: 'HDRI + area lights + GI',
      color: 'rgba(200,180,60,0.7)',
      bg: 'linear-gradient(135deg,#1a1800,#2c2600)',
      preview: 'light'
    },
    {
      step: '05',
      title: 'Animation',
      desc: 'Rigging, keyframes & physics sim',
      color: 'rgba(80,160,80,0.7)',
      bg: 'linear-gradient(135deg,#081408,#0a2010)',
      preview: 'anim'
    },
    {
      step: '06',
      title: 'Render',
      desc: 'Cycles renderer - 4K - 24fps',
      color: 'rgba(180,80,220,0.7)',
      bg: 'linear-gradient(135deg,#100820,#1a0a30)',
      preview: 'render'
    }
  ];

  let activeStage = 0;

  function buildAnimSection() {
    const specs = $('#specsTable');

    if (specs) {
      specs.innerHTML = SPECS.map(
        (s) => `
          <div class="spec-row">
            <span style="font-family:var(--mono);font-size:10px;color:rgba(212,197,169,0.4);letter-spacing:0.08em">
              ${s.label}
            </span>
            <span style="font-family:var(--mono);font-size:11px;color:rgba(212,197,169,0.75);letter-spacing:0.06em">
              ${s.value}
            </span>
          </div>
        `
      ).join('');
    }

    const passes = $('#renderPasses');

    if (passes) {
      passes.innerHTML = RENDER_PASSES.map(pass => `
      <div class="render-pass" data-color="${pass.color}">
        <img class="pass-img" src="${pass.img}" alt="${pass.label}">
        <div class="pass-overlay"></div>
        <div class="pass-title">${pass.label}</div>
      </div>
`).join('');

      passes.querySelectorAll('.render-pass').forEach((el) => {
        el.addEventListener('mouseenter', () => {
          el.style.boxShadow = `0 8px 32px ${el.dataset.color}`;
        });

        el.addEventListener('mouseleave', () => {
          el.style.boxShadow = 'none';
        });
      });
    }

    const pipeline = $('#pipelineGrid');

    if (pipeline) {
      pipeline.innerHTML = PROCESS_STAGES.map((s, i) => {
        return `
          <div class="pipeline-card${i === 0 ? ' active' : ''}" data-stage="${i}"
            style="${i === 0 ? `border-color:${s.color};box-shadow:0 12px 40px ${s.color.replace('0.7', '0.25')};` : ''}">
            <div style="height:60px;background:${s.bg};position:relative;overflow:hidden">
              <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden">
                <svg viewBox="0 0 80 60" style="width:60px;height:44px;opacity:${s.preview === 'model' ? 0.6 : 0.2}">
                  <polygon points="40,4 72,56 8,56" fill="none" stroke="${s.color}" stroke-width="1.5"/>
                  <line x1="40" y1="4" x2="40" y2="56" stroke="${s.color}" stroke-width="0.5" opacity="0.5"/>
                  <line x1="8" y1="56" x2="72" y2="56" stroke="${s.color}" stroke-width="0.5" opacity="0.5"/>
                </svg>
              </div>
            </div>
            <div style="padding:10px 12px">
              <div style="font-family:var(--mono);font-size:8px;color:${s.color};letter-spacing:0.1em;margin-bottom:4px">
                ${s.step}
              </div>
              <div style="font-family:var(--serif);font-size:13px;color:rgba(212,197,169,0.85);margin-bottom:3px">
                ${s.title}
              </div>
              <div style="font-family:var(--mono);font-size:8px;color:rgba(212,197,169,0.35);line-height:1.6">
                ${s.desc}
              </div>
            </div>
          </div>
        `;
      }).join('');

      pipeline.querySelectorAll('.pipeline-card').forEach((card) => {
        card.addEventListener('mouseenter', () => {
          setPipelineStage(parseInt(card.dataset.stage));
        });
      });

      setInterval(() => {
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

  let isPlaying = false;

  const PAPERS = [
    {
      num: 'Paper 01 - 2025',
      title: 'Automatic Customer Clustering Service Prototype Design by Hybrid Methods - AI approach',
      pdf: 'https://drive.google.com/file/d/1rwvO4RY9SoT7YUMUoRyzSFXA9ghqLsTZ/view?usp=sharing',
      abstract:
        'This study proposes an AI-based system that integrates image recognition and customer data analytics to achieve automatic customer clustering. The system integrates pre-trained deep learning models to extract static and dynamic visual features such as age, gender, gesture, dressing styles, and emotional expressions combined with purchasing and behavioral data from point-of-sale or membership systems. The proposed framework aims to provide personalized marketing recom-mendations, enhance customer engagement, and improve marketing efficiency for retail and service industries.',
      keywords: ['Artificial Intelligence', 'Customer Clustering', 'Smart Retail', 'Marketing Automation'],
      venue: 'Cyberspace - 2025',
      accentColor: '#5C7A5C'
    },
    {
      num: 'Paper 02 - 2026',
      title: 'An AI - Based Pipeline for Personalized Learning Path Generation from Hand-Graded Examination Documents.',
      pdf: 'https://drive.google.com/file/d/138pIPSITBSMDRabY9vU47kye7I7WhYQY/view?usp=sharing',
      abstract:
        'Artificial intelligence (AI) has been widely applied in education to automate assessment and support learning analytics. However, most AI-based assessment systems focus on performance evaluation and diagnostic feedback, offering limited support for guiding subsequent learning. This creates a gap between learning diagnosis and instructional intervention. To address this issue, this study proposes a personalized learning path generation system based on students homework and exam sheets, along with teacher records. The system integrates teacher-provided materials and student responses, including handwritten exams captured via scanning or mobile devices. Optical Character Recognition (OCR) and language model-based semantic processing are used to extract structured learning content, which is mapped to predefined learning concepts and organized into a prerequisite-based knowledge graph. Based on concept-level diagnosis, the system identifies weak concepts and generates personalized learning paths through prerequisite-aware graph traversal. It also provides instructional feedback and course improvement suggestions based on aggregated student performance. Experiments on 30 graded handwritten programming tests demonstrate that the framework effectively converts assessment data into structured learning guidance, offering a lightweight and practical approach for personalized learning and data-driven instructional design.',
      keywords: ['Automated Grading', 'Computer Vision', 'Learning Gap Detection', 'Personalized Learning', 'Educational Data Analysis'],
      venue: 'iCIMKC - 2026',
      accentColor: '#4A6B8A'
    },
    {
      num: 'Paper 03 - 2026',
      title: 'From Virtual Romance to Tangible Risk Awareness: Designing a Board Game to Physicalize Online Dating Fraud Scenarios',
      pdf: 'https://drive.google.com/file/d/1WAFHfiGptMYkk3FJQPsYZWffNKo0-l4M/view?usp=sharing',
      abstract:
        'To enhance online dating safety awareness among university students, this study developed a board game, Boundary of the Heart, based on romance scam experiences of Chinese women. The game materializes virtual dating interactions - such as matching and messaging - into cards and tokens representing emotions, self-esteem, and safety awareness, guiding players through risk-based decision-making scenarios. Using a single-group post-test design with 21 university students, the study examined flow experience, ARCS learning motivation, and activity-related anxiety. Results indicated that participants experienced high levels of immersion and learning motivation, while reporting low anxiety. Most participants also perceived improved judgment regarding safe online and offline dating practices. These findings suggest that board game-based fraud scenarios can effectively enhance emotional engagement and risk perception, and demonstrate the potential of tangible, scenario-based learning for media literacy and relationship education from a female perspective.',
      keywords: ['Game-based Learning', 'Relationship Education', 'Media Literacy', 'Online Dating Safety'],
      venue: 'IIAI AAI - 2026',
      accentColor: '#C9A84C'
    },

  ];

  function buildPapersSection() {
    const grid = $('#papersGrid');
    if (!grid) return;

    grid.innerHTML = PAPERS.map(
      (p) => `
        <div class="paper-entry reveal" style="border-left:4px solid ${p.accentColor}">
          <div style="font-family:var(--mono);font-size:9px;letter-spacing:0.2em;color:var(--warm-gray);margin-bottom:10px;text-transform:uppercase">
            ${p.num}
          </div>
          <div style="font-family:var(--serif);font-size:21px;font-weight:400;color:var(--dark-brown);line-height:1.3;margin-bottom:12px">
            ${p.title}
          </div>
          <p style="font-size:12px;color:var(--warm-gray);line-height:1.85;margin-bottom:16px">
            ${p.abstract}
          </p>
          <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:16px">
            ${p.keywords.map((k) => `<span class="kw-tag">${k}</span>`).join('')}
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between;padding-top:14px;border-top:1px dashed rgba(139,115,85,0.2)">
            <a href="${p.pdf}" target="_blank" class="paper-link"> Read Publication </a>
            <span style="font-family:var(--mono);font-size:10px;color:var(--warm-gray)">
              ${p.venue}
            </span>
          </div>
        </div>
      `
    ).join('');
  }

  const CASE_DATA = {
    ticket: {
      title: 'Ticket Booking App',
      tagline:
        'Your next adventure is just a tap away. Explore the world with seamless booking.',
      year: '2026',
      role: 'UI/UX Designer',
      duration: '8 weeks',
      accentColor: '#C9A84C',
      palette: ['#49A892', '#E4FBF0', '#DAF9F2', '#0D0F70'],
      paletteNames: ['#49A892', '#E4FBF0', '#DAF9F2', '#0D0F70'],
      metrics: [
        { value: '14', label: 'User Interviews' },
        { value: '18', label: 'Wireframes' },
        { value: '32', label: 'Screens Designed' },
        { value: '40+', label: 'Components Built' }
      ],
      problem:
        'Booking tickets involved too many steps, making it difficult for users to quickly compare options and complete purchases.',
      insight:
        'Reducing cognitive load and presenting key information earlier can improve user confidence throughout the booking journey.',
      result:
        'A simplified booking flow was created with clear pricing, intuitive navigation, and a consistent visual experience across all screens.',
      process: [
        {
          step: '01',
          title: 'Research',
          detail: 'User interviews ¡P Competitor analysis ¡P User insights'
        },
        {
          step: '02',
          title: 'Strategy',
          detail: 'Problem framing ¡P User flows ¡P Information architecture'
        },
        {
          step: '03',
          title: 'Design',
          detail: 'Wireframes ¡P UI system ¡P High-fidelity prototype'
        },
        {
          step: '04',
          title: 'Validation',
          detail: 'Usability testing ¡P Feedback ¡P Iteration'
        }
      ],
      screens: [
        { imageSrc: 'assets/HomeScreen.png' },
        { imageSrc: 'assets/FlightDetails.png' },
        { imageSrc: 'assets/BoardingPass.png' },
        { imageSrc: 'assets/Add-ons.png' },
        { imageSrc: 'assets/Infor1.png' },
        { imageSrc: 'assets/Infor2.png' },
        { imageSrc: 'assets/Payment.png' },
        { imageSrc: 'assets/PaymentMethod.png' },
        { imageSrc: 'assets/SearchFlight.png' },
        { imageSrc: 'assets/SelectFlight.png' },
        { imageSrc: 'assets/SelectSeat.png' },
        { imageSrc: 'assets/SuccedPay.png' }
      ]
    },

    coffee: {
      title: 'Coffee Ordering App',
      tagline:
        'Skip the lines and premium-craft your morning ritual with just a single tap.',
      year: '2025',
      role: 'UI/UX Designer',
      duration: '6 weeks',
      platform: 'Android',
      accentColor: '#A87878',
      palette: ['#F8D6BE', '#C4977A', '#F9E5D8', '#F2DDBB'],
      paletteNames: ['#F8D6BE', '#C4977A', '#F9E5D8', '#F2DDBB'],
      metrics: [
        { value: '12', label: 'Screens Designed' },
        { value: '18', label: 'Wireframes' },
        { value: '5', label: 'Usability Tests' },
        { value: '30+', label: 'Components Built' }
      ],
      problem:
        'Ordering coffee online can feel frustrating when menus are difficult to navigate and customization options are unclear.',
      insight:
        'Users value convenience above all. Reducing friction throughout the ordering process increases confidence and satisfaction.',
      result:
        'Created a user-friendly ordering platform with improved navigation, simplified customization, and a consistent visual experience.',
      process: [
        {
          step: '01',
          title: 'Discover',
          detail: 'Customer interviews ¡P Caf? observation ¡P User journey mapping'
        },
        {
          step: '02',
          title: 'Define',
          detail: 'Pain points ¡P User needs ¡P Ordering opportunities'
        },
        {
          step: '03',
          title: 'Craft',
          detail: 'Wireframes ¡P Design system ¡P Interactive prototype'
        },
        {
          step: '04',
          title: 'Refine',
          detail: 'Usability testing ¡P Feedback ¡P Final iterations'
        }
      ],
      screens: [
        { imageSrc: 'assets/1.png' },
        { imageSrc: 'assets/4.png' },
        { imageSrc: 'assets/6.png' },
        { imageSrc: 'assets/8.png' },
        { imageSrc: 'assets/10.png' },
        { imageSrc: 'assets/12.png' },
        { imageSrc: 'assets/14.png' },
        { imageSrc: 'assets/16.png' },
        { imageSrc: 'assets/18.png' },
        { imageSrc: 'assets/20.png' }
      ]
    }
  };

  function openCase(id) {
    openCaseStudy = id;

    const d = CASE_DATA[id];
    if (!d || !csOverlay) return;

    const content = $('#caseStudyContent');
    if (!content) return;

    const carouselImages = d.screens.map((s) => s.imageSrc).filter(Boolean);

    const phoneCarouselHtml = `
      <div class="real-coverflow" id="realCoverflow">
        <div class="coverflow-stage">
          ${carouselImages
        .map(
          (src, index) => `
                <div class="coverflow-slide" data-index="${index}">
                  <img src="${src}" alt="${d.title} screen ${index + 1}">
                </div>
              `
        )
        .join('')}
        </div>
      </div>
    `;

    content.innerHTML = `
      <button id="csCloseBtn" style="position:fixed;top:20px;right:48px;z-index:502;font-family:var(--mono);font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:var(--dark-brown);border:1px solid var(--tan);padding:8px 16px;border-radius:2px;background:rgba(250,247,242,0.92);backdrop-filter:blur(8px);cursor:none">
        Close <i class="fa fa-close"></i>
      </button>

      <div style="min-height:100vh;background:#0E0C0A;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:80px 48px;position:relative;overflow:hidden">
        <div style="position:absolute;top:30%;left:50%;transform:translate(-50%,-50%);width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,${d.accentColor}22 0%,transparent 70%);pointer-events:none"></div>

        <div style="display:flex;gap:12px;margin-bottom:32px;flex-wrap:wrap;justify-content:center">
          ${[d.year, d.role, d.platform, d.duration]
        .filter(Boolean)
        .map(
          (m) => `
                <span style="font-family:var(--mono);font-size:9.5px;letter-spacing:0.18em;text-transform:uppercase;color:rgba(212,197,169,0.45);border:1px solid rgba(255,255,255,0.08);padding:5px 12px;border-radius:2px">
                  ${m}
                </span>
              `
        )
        .join('')}
        </div>

        <h1 style="font-family:var(--serif);font-size:clamp(44px,7vw,80px);font-weight:300;color:var(--cream);line-height:1;text-align:center;margin-bottom:16px;letter-spacing:-0.01em">
          ${d.title}
        </h1>

        <p style="font-family:var(--serif);font-style:italic;font-size:20px;color:${d.accentColor};text-align:center;margin-bottom:80px;opacity:0.85">
          ${d.tagline}
        </p>

        <div style="position:relative;z-index:2">
          ${phoneCarouselHtml}
        </div>
      </div>

      <div style="background:var(--paper)">
        <div style="display:grid;grid-template-columns:repeat(4,1fr);border-bottom:1px solid rgba(139,115,85,0.15)">
          ${d.metrics
        .map(
          (m, i) => `
                <div style="padding:40px 32px;${i < 3 ? 'border-right:1px solid rgba(139,115,85,0.12);' : ''}text-align:center">
                  <div style="font-family:var(--serif);font-size:52px;font-weight:300;color:${d.accentColor};line-height:1">
                    ${m.value}
                  </div>
                  <div style="font-family:var(--mono);font-size:9.5px;letter-spacing:0.16em;text-transform:uppercase;color:var(--warm-gray);margin-top:8px">
                    ${m.label}
                  </div>
                </div>
              `
        )
        .join('')}
        </div>

        <div style="padding:64px 80px;border-bottom:1px solid rgba(139,115,85,0.12);max-width:1000px;margin:0 auto">
          <div style="font-family:var(--mono);font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:var(--warm-gray);margin-bottom:28px">
            Colour Palette
          </div>

          <div style="display:flex;gap:0;height:80px;border-radius:6px;overflow:hidden;box-shadow:0 8px 32px rgba(74,55,40,0.15)">
            ${d.palette
        .map(
          (c, i) => `
                  <div style="flex:1;background:${c};position:relative">
                    <div style="position:absolute;bottom:10px;left:50%;transform:translateX(-50%);font-family:var(--mono);font-size:8px;letter-spacing:0.08em;color:${i === 1 || i === 2 ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.55)'};white-space:nowrap;text-align:center">
                      ${d.paletteNames[i]}
                    </div>
                  </div>
                `
        )
        .join('')}
          </div>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;max-width:1000px;margin:0 auto;padding:0 80px 64px;gap:2px">
          ${[
        { label: 'Problem', text: d.problem, color: '#9A4A4A' },
        { label: 'Insight', text: d.insight, color: d.accentColor },
        { label: 'Result', text: d.result, color: '#5C7A5C' }
      ]
        .map(
          (c) => `
                <div style="padding:32px;background:rgba(250,247,242,0.7);border:1px solid rgba(139,115,85,0.12);border-top:3px solid ${c.color};border-radius:2px">
                  <div style="font-family:var(--mono);font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:${c.color};margin-bottom:16px">
                    ${c.label}
                  </div>
                  <p style="font-family:var(--serif);font-size:16px;color:var(--dark-brown);line-height:1.75">
                    ${c.text}
                  </p>
                </div>
              `
        )
        .join('')}
        </div>

        <div style="max-width:1000px;margin:0 auto;padding:0 80px 80px">
          <div style="font-family:var(--mono);font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:var(--warm-gray);margin-bottom:28px">
            Process
          </div>

          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px">
            ${d.process
        .map(
          (p) => `
                  <div style="padding:28px 24px;background:#fff;border:1px solid rgba(139,115,85,0.14);border-radius:3px;position:relative;overflow:hidden">
                    <div style="font-family:var(--serif);font-size:64px;font-weight:300;color:${d.accentColor};opacity:0.12;position:absolute;top:-10px;right:8px;line-height:1">
                      ${p.step}
                    </div>
                    <div style="font-family:var(--mono);font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:${d.accentColor};margin-bottom:10px">
                      ${p.step}
                    </div>
                    <div style="font-family:var(--serif);font-size:20px;color:var(--dark-brown);margin-bottom:10px">
                      ${p.title}
                    </div>
                    <div style="font-family:var(--mono);font-size:10px;color:var(--warm-gray);line-height:1.8">
                      ${p.detail}
                    </div>
                  </div>
                `
        )
        .join('')}
          </div>
        </div>
      </div>
    `;

    csOverlay.classList.add('open');

    const closeBtn = $('#csCloseBtn');

    if (closeBtn) {
      closeBtn.addEventListener('click', closeCaseStudy);
    }

    bindCursorHoverListeners();
    initRealCoverflow();
  }

  function initRealCoverflow() {
    const stage = $('.coverflow-stage');
    if (!stage) return;

    const slides = Array.from(stage.querySelectorAll('.coverflow-slide'));
    if (!slides.length) return;

    let activeIndex = 0;

    function updateCoverflow() {
      const spacing = Math.min(240, Math.max(160, stage.clientWidth * 0.21));

      slides.forEach((slide, i) => {
        let offset = i - activeIndex;

        if (offset > slides.length / 2) offset -= slides.length;
        if (offset < -slides.length / 2) offset += slides.length;

        const abs = Math.abs(offset);
        const scale = offset === 0 ? 1.08 : Math.max(0.72, 1 - abs * 0.1);
        const opacity = abs > 3 ? 0 : Math.max(0.35, 1 - abs * 0.18);
        const x = offset * spacing;

        slide.classList.toggle('active', offset === 0);
        slide.style.transform = `translate3d(calc(-50% + ${x}px), -50%, 0) scale(${scale})`;
        slide.style.opacity = opacity;
        slide.style.zIndex = 100 - abs;
      });
    }

    stage.addEventListener('click', () => {
      activeIndex = (activeIndex + 1) % slides.length;
      updateCoverflow();
    });

    updateCoverflow();
  }

  function closeCaseStudy() {
    openCaseStudy = null;

    if (csOverlay) {
      csOverlay.classList.remove('open');
    }
  }

  function bindCaseStudyButtons() {
    $$('.open-btn[data-case]').forEach((btn) => {
      btn.addEventListener('click', () => {
        openCase(btn.dataset.case);
      });
    });
  }

  function init() {
    createParticles();
    buildLandingTitle();
    bindBoxParallax();

    buildWebDevShowcase();
    buildAnimSection();
    buildPapersSection();

    bindNavEvents();
    bindCaseStudyButtons();
    bindCursorHoverListeners();

    setTimeout(() => {
      $$('#landing .reveal').forEach((el) => {
        el.classList.add('visible');
      });
    }, 100);
  }

  document.addEventListener('DOMContentLoaded', init);
})();