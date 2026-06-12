document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- Project data ---------- */

    const projects = {
        'n-hexane-hazard-zone': {
            title: 'n-Hexane Hazard Zone Prediction',
            role: 'Undergraduate thesis — process safety, QRA & ML surrogate modeling',
            description: `
                <p><strong>Focus:</strong> rapid hazard-zone prediction for n-Hexane tank overfill scenarios using ALOHA simulation outputs as ground truth.</p>
                <ul>
                    <li>Generated 1,215 full-factorial scenarios across six parameters (Pasquill stability class, wind speed, temperature, spill rate, effective duration, liquid thickness), extended to 1,261 with targeted out-of-distribution additions.</li>
                    <li>Modeled red, orange, and yellow LEL-based hazard-zone radii with MLR, Random Forest, and ANN — the ANN surrogate reaches R² 0.9975 with a red-zone MAE of 1.82 m, 12× lower than the MLR baseline.</li>
                    <li>Stress-tested out-of-distribution robustness (wind and temperature beyond the training range) and retrained across two revision rounds to close the gaps.</li>
                    <li>Shipped as a Flask web app with an interactive ALOHA-style plume map (Leaflet), batch CSV/Excel processing, and KML export — plus a separate BI dashboard for scenario analytics.</li>
                </ul>
            `,
            link: {
                href: 'https://huggingface.co/spaces/MelioniDas31/AplikasiTugasAkhir',
                label: 'Try the live app on Hugging Face Spaces'
            },
            images: [
                'assets/images/projects/n-hexane-hazard-zone/webapp-map-dashboard.jpg',
                'assets/images/projects/n-hexane-hazard-zone/dashboard/pasted-1777173393954-0.png',
                'assets/images/projects/n-hexane-hazard-zone/dashboard/pasted-1777173398947-0.png',
                'assets/images/projects/n-hexane-hazard-zone/webapp-distribusi-data.png',
                'assets/images/projects/n-hexane-hazard-zone/learning-curve.png',
                'assets/images/projects/n-hexane-hazard-zone/Flowchart Thesis Tugas akhir.png',
                'assets/images/projects/n-hexane-hazard-zone/correlation_heatmap tesis.png'
            ]
        },
        'analisis-aja': {
            title: 'Analisis.Aja — AI Root-Cause Analysis Platform',
            role: 'AI product — built end-to-end for HSSE/QA problem analysis',
            description: `
                <p><strong>Focus:</strong> turning raw work documents (PDF, DOCX, Excel, free text) into structured, professional problem-analysis reports.</p>
                <ul>
                    <li>Three analysis methods: 5 Why, Fishbone/Ishikawa (6M, HSSE, and Office presets), and a full 10-section RCA report.</li>
                    <li>Evidence-based pipeline: document parsing → AI evidence extraction → analysis engine, with strict separation of verified facts, assumptions, and missing information.</li>
                    <li>Every AI output is schema-validated before it reaches the report, with a full audit trail of each AI run.</li>
                    <li>Built with Next.js + TypeScript, Claude and Gemini as analysis engines, and a credit-based usage system.</li>
                </ul>
            `,
            images: [
                'assets/images/projects/analisis-aja/dashboard.png',
                'assets/images/projects/analisis-aja/landing.png',
                'assets/images/projects/analisis-aja/pilih-metode.png',
                'assets/images/projects/analisis-aja/wizard.png',
                'assets/images/projects/analisis-aja/laporan-5why-1.png',
                'assets/images/projects/analisis-aja/laporan-5why-2.png',
                'assets/images/projects/analisis-aja/laporan-5why-3.png'
            ]
        },
        'mwt-rekap-bot': {
            title: 'AI Bot for MWT Inspection Reporting',
            role: 'Client project — commissioned for Pertamina field operations',
            description: `
                <p><strong>Focus:</strong> eliminating manual data entry for Management Walkthrough (MWT) inspection reports — commissioned by a Pertamina professional, delivered and running.</p>
                <ul>
                    <li>Field inspectors send free-form reports to a Telegram bot — plain text, photos, or voice notes in operational Indonesian.</li>
                    <li>Voice notes are transcribed with Whisper; Gemini extracts the structured record (inspector, finding, recommendation, PIC, status) and asks clarifying questions when required fields are missing.</li>
                    <li>Evidence photos are uploaded to Google Drive and each report lands as a numbered row in Google Sheets — no manual rekap.</li>
                    <li>Deployed as serverless functions (Netlify) with webhook-based Telegram integration.</li>
                </ul>
            `,
            images: [
                'assets/images/projects/mwt-rekap-bot/telegram-report.png',
                'assets/images/projects/mwt-rekap-bot/telegram-report-2.png',
                'assets/images/projects/mwt-rekap-bot/sheet-rekap.png',
                'assets/images/projects/mwt-rekap-bot/sheet-rekap-2.png',
                'assets/images/projects/mwt-rekap-bot/flowchart.jpg'
            ]
        },
        'prompt-aja': {
            title: 'prompt.aja — AI Visual Content Platform',
            role: 'AI SaaS — full-stack MVP, designed, built & deployed',
            description: `
                <p><strong>Focus:</strong> a one-stop platform for generating social-media-ready visual content with AI.</p>
                <ul>
                    <li>Five image models and five video models (text-to-image, image-to-image, text-to-video, motion transfer, lip sync) served through one interface.</li>
                    <li>Credit system with atomic deduct/refund transactions, plan tiers, and full generation history.</li>
                    <li>AI prompt enhancer, content safety filtering across 18+ categories, rate limiting, and webhook + polling job handling.</li>
                    <li>Built with Next.js 15 + TypeScript, Supabase (auth, database, storage), and Replicate — deployed on Netlify.</li>
                </ul>
            `,
            images: [
                'assets/images/projects/prompt-aja/landing.jpg',
                'assets/images/projects/prompt-aja/dashboard-user.jpg',
                'assets/images/projects/prompt-aja/history.jpg'
            ]
        },
        'energy-transition-indonesia': {
            title: 'Evidence-Based Energy Transition Analysis for Indonesia',
            role: 'First author — accepted, SUSTINERE: Journal of Environment and Sustainability (Scopus-indexed · SINTA 2)',
            description: `
                <p><strong>Focus:</strong> statistical feasibility analysis for Indonesia's energy transition and sustainability policy decisions.</p>
                <ul>
                    <li>Used ARIMA forecasting to project Indonesia's energy supply trajectory through 2060.</li>
                    <li>Applied multiple regression to quantify the relationship between renewable energy, non-renewable energy, and CO2 emissions.</li>
                    <li>Ran 10,000-iteration Monte Carlo simulations to estimate renewable energy target feasibility under uncertainty.</li>
                    <li>Key findings: the 2025 renewable energy target has a 65.21% probability of achievement, while the 2060 APS 78% target remains at 0.00% under current projected trends.</li>
                </ul>
            `,
            images: [
                'assets/images/projects/energy-transition-indonesia/Picture2.png',
                'assets/images/projects/energy-transition-indonesia/mc-distribution-2025.png',
                'assets/images/projects/energy-transition-indonesia/mc-prob-78pct-2030-2060.png',
                'assets/images/projects/energy-transition-indonesia/mc-sensitivity-2025.png',
                'assets/images/projects/energy-transition-indonesia/pasted-1777173495236-0.png',
                'assets/images/projects/energy-transition-indonesia/pasted-1777173562225-1.png',
                'assets/images/projects/energy-transition-indonesia/Picture1.png',
                'assets/images/projects/energy-transition-indonesia/halaman pertama promoting evidance research paper.png'
            ]
        },
        'heart-vs-slim': {
            title: 'Comparative Analysis of HEART vs SLIM',
            role: 'Project leader — published in Motivection (national accredited journal)',
            description: `
                <p><strong>Focus:</strong> Human Reliability Assessment for safety-risk evaluation, applied to a Boeing 737 MAX accident case study.</p>
                <ul>
                    <li>Compared HEART (Human Error Assessment and Reduction Technique) and SLIM (Success Likelihood Index Method).</li>
                    <li>Calculated human error probabilities and interpreted the implications for safety and reliability decision making.</li>
                    <li>Compared method assumptions, sensitivity, and interpretability to guide HRA method selection.</li>
                </ul>
            `,
            link: {
                href: 'https://doi.org/10.46574/motivection.v7i1.431',
                label: 'Read the paper — DOI 10.46574/motivection.v7i1.431'
            },
            images: [
                'assets/images/projects/heart-vs-slim/1.jpg',
                'assets/images/projects/heart-vs-slim/2.png',
                'assets/images/projects/heart-vs-slim/3.png',
                'assets/images/projects/heart-vs-slim/4.png'
            ]
        },
        'excel-engineering-templates': {
            title: 'Excel Engineering Calculation Suite',
            role: 'Engineering tooling — risk & consequence calculations',
            description: `
                <p><strong>Focus:</strong> turning engineering equations into reusable Excel-based calculation tools.</p>
                <ul>
                    <li>Developed structured templates for risk and consequence-related calculations, including TNT explosion blast and pool fire workflows.</li>
                    <li>Designed calculation sheets with input sections, formulas, outputs, and visual plots to support faster engineering analysis.</li>
                    <li>Useful for early-stage screening, calculation checking, and technical communication in safety and risk projects.</li>
                </ul>
            `,
            images: [
                'assets/images/projects/excel-engineering-templates/contoh tampilan excel projek 5, penentuan zona explosio.png',
                'assets/images/projects/excel-engineering-templates/time_efficiency.png',
                'assets/images/projects/excel-engineering-templates/score_distribution.png',
                'assets/images/projects/excel-engineering-templates/satisfaction_rating.png'
            ]
        },
        'cnc-failure-identification': {
            title: 'Machine Learning for CNC Failure Identification',
            role: 'AI engineering bootcamp capstone — graded 95/A (Certificate of Excellence)',
            description: `
                <p><strong>Focus:</strong> machine learning model comparison for CNC machine condition and failure identification on the AI4I 2020 dataset (10,000 sensor records, 5 failure classes).</p>
                <ul>
                    <li>Handled severe class imbalance with SMOTE, then compared Decision Tree, Random Forest, XGBoost, and ANN/MLP.</li>
                    <li>XGBoost selected on test performance (98% accuracy) with per-class F1 heatmaps and train-test overfitting diagnostics.</li>
                    <li>Deployed as an interactive Streamlit dashboard with physics-informed EDA, single prediction with handling recommendations, and batch CSV prediction.</li>
                </ul>
            `,
            link: {
                href: 'https://huggingface.co/spaces/MelioniDas31/CapstoneBrainAcademy',
                label: 'Open the Streamlit dashboard on Hugging Face Spaces'
            },
            images: [
                'assets/images/projects/cnc-failure-identification/04_train_vs_test_overfitting.png',
                'assets/images/projects/cnc-failure-identification/02_f1_heatmap_per_class.png',
                'assets/images/projects/cnc-failure-identification/flowchart capstone ai engineering bootcamp.png'
            ]
        },
        'perovskite-halide': {
            title: 'Perovskite Halide as Fluorescent Taggant',
            role: 'Researcher — feasibility study & HKI-registered work',
            description: `
                <p><strong>Focus:</strong> feasibility study of Perovskite Halide materials as fluorescent taggants for oil & gas line tracer applications.</p>
                <ul>
                    <li>Analyzed potential use cases for leak detection, flow path tracing, pipeline monitoring, and environmental monitoring.</li>
                    <li>Evaluated technical, economic, market, regulatory, and implementation feasibility against conventional tracer methods.</li>
                    <li>Supported the study with market-distribution analysis and research documentation.</li>
                    <li>The work is connected to an HKI copyright registration record.</li>
                </ul>
            `,
            images: [
                'assets/images/projects/perovskite-halide/pasted-1777173233642-0.png',
                'assets/images/projects/perovskite-halide/pasted-1777173255917-0.png',
                'assets/images/projects/perovskite-halide/1.jpg',
                'assets/images/projects/perovskite-halide/2.jpg',
                'assets/images/credentials/hakcipta untuk projekl 1.png'
            ]
        },
        'hero-helmets': {
            title: 'HERO Helmets: Bio-Composite Safety Helmet',
            role: 'Team leader — funded by Kemdikbudristek (PKM-KC)',
            description: `
                <p><strong>Innovation:</strong> industrial safety helmet using water hyacinth fiber biocomposites.</p>
                <ul>
                    <li>Led the team and contributed to prototype design, material analysis, and product development direction.</li>
                    <li>Optimized manufacturing using vacuum infusion and evaluated fiber-to-matrix ratio considerations.</li>
                    <li>Conducted mechanical testing for impact resistance and tensile strength to support safety compliance.</li>
                    <li>Connected occupational safety equipment with sustainability and material innovation.</li>
                </ul>
            `,
            images: [
                'assets/images/projects/hero-helmets/1.png',
                'assets/images/projects/hero-helmets/2.jpg',
                'assets/images/projects/hero-helmets/prototype helm 2.jpg',
                'assets/images/projects/hero-helmets/prototype helm 3.jpg',
                'assets/images/projects/hero-helmets/spesimen uji tarik.jpg'
            ]
        },
        'hvac-design': {
            title: 'HVAC System Design & Life Cycle Assessment',
            role: 'Project leader',
            description: `
                <p><strong>Focus:</strong> HVAC design, cooling-load analysis, and carbon-footprint comparison.</p>
                <ul>
                    <li>Calculated total cooling requirements, identifying a peak load of 1,020.8 kW and SHR of 0.627.</li>
                    <li>Compared Water-Cooled Chiller + VAV and RTU + VAV systems for air distribution and energy efficiency.</li>
                    <li>Evaluated embodied and operational carbon, identifying steel-driven embodied carbon as a major contributor.</li>
                </ul>
            `,
            images: [
                'assets/images/projects/hvac-design/1.png',
                'assets/images/projects/hvac-design/2.png',
                'assets/images/projects/hvac-design/3.png',
                'assets/images/projects/hvac-design/4.png'
            ]
        },
        'autonomous-trash-bin': {
            title: 'Autonomous Trash Bin',
            role: 'Capstone project leader',
            description: `
                <p><strong>Goal:</strong> line-follower based automation for small-scale waste management.</p>
                <ul>
                    <li>Led end-to-end development of a mechatronic waste-management robot.</li>
                    <li>Integrated IR line-follower navigation, ultrasonic sensing, servo actuation, and microcontroller logic.</li>
                    <li>Conducted performance testing on sensor sensitivity, response time, and load-carrying capability.</li>
                </ul>
            `,
            images: [
                'assets/images/projects/autonomous-trash-bin/video.mp4',
                'assets/images/projects/autonomous-trash-bin/1.jpg',
                'assets/images/projects/autonomous-trash-bin/2.jpg'
            ]
        },
        'electric-oven': {
            title: 'Low-Cost Electric Oven Prototype',
            role: 'Heat transfer course project',
            description: `
                <p><strong>Project:</strong> design and fabrication of a functional prototype oven using upcycled heating elements.</p>
                <ul>
                    <li>Engineered a composite insulation system using aluminum foil, cardboard, and polystyrene.</li>
                    <li>Analyzed heating rate and thermal retention to evaluate insulation effectiveness.</li>
                    <li>Demonstrated practical heat-transfer understanding through low-cost prototyping.</li>
                </ul>
            `,
            images: [
                'assets/images/projects/electric-oven/WhatsApp Image 2026-02-12 at 22.19.14.jpeg'
            ]
        },
        'sekitar-kita': {
            title: 'Sekitar Kita by SRE Indonesia',
            role: 'Graphic design volunteer — 6 months',
            description: `
                <p><strong>Contribution:</strong> branding and visual communication for sustainability programs.</p>
                <ul>
                    <li>Designed and managed visual content for Instagram and event posters.</li>
                    <li>Participated in renewable energy conferences, solar power plant field visits, and waste management education programs.</li>
                </ul>
            `,
            images: [
                'assets/images/projects/sekitar-kita/WhatsApp Image 2026-02-12 at 22.09.00.jpeg',
                'assets/images/projects/sekitar-kita/WhatsApp Image 2026-02-12 at 22.09.01.jpeg'
            ]
        }
    };

    /* ---------- Reveal on scroll (one-time) ---------- */

    const revealEls = document.querySelectorAll('[data-reveal]');

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
        revealEls.forEach(el => el.classList.add('is-revealed'));
    } else {
        let staggerIndex = 0;
        let staggerReset = null;

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                // Stagger elements that come into view in the same frame batch
                entry.target.style.setProperty('--reveal-delay', `${Math.min(staggerIndex * 70, 280)}ms`);
                staggerIndex += 1;
                entry.target.classList.add('is-revealed');
                observer.unobserve(entry.target);
            });
            clearTimeout(staggerReset);
            staggerReset = setTimeout(() => { staggerIndex = 0; }, 200);
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        revealEls.forEach(el => observer.observe(el));
    }

    /* ---------- Top bar state ---------- */

    const topbar = document.querySelector('.topbar');
    const syncTopbar = () => topbar.classList.toggle('scrolled', window.scrollY > 24);
    syncTopbar();
    window.addEventListener('scroll', syncTopbar, { passive: true });

    /* ---------- Mobile navigation ---------- */

    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    const closeNav = () => {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
    };

    navToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeNav);
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && navMenu.classList.contains('open')) {
            closeNav();
            navToggle.focus();
        }
    });

    /* ---------- Scroll spy: active nav link ---------- */

    const navLinks = document.querySelectorAll('[data-nav]');
    const spyTargets = [...navLinks]
        .map(link => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    if (spyTargets.length) {
        const setActive = id => {
            navLinks.forEach(link => {
                if (link.getAttribute('href') === `#${id}`) {
                    link.setAttribute('aria-current', 'true');
                } else {
                    link.removeAttribute('aria-current');
                }
            });
        };

        let spyQueued = false;
        const updateSpy = () => {
            spyQueued = false;
            const line = window.scrollY + window.innerHeight * 0.38;
            let currentId = null;
            spyTargets.forEach(target => {
                if (target.offsetTop <= line) currentId = target.id;
            });
            // At the very bottom, always highlight the last section
            if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
                currentId = spyTargets[spyTargets.length - 1].id;
            }
            setActive(currentId);
        };

        window.addEventListener('scroll', () => {
            if (!spyQueued) {
                spyQueued = true;
                requestAnimationFrame(updateSpy);
            }
        }, { passive: true });
        updateSpy();
    }

    /* ---------- Footer year ---------- */

    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    /* ---------- Project modal & carousel ---------- */

    const modal = document.getElementById('project-modal');
    const modalPanel = modal.querySelector('.modal-panel');
    const modalTitle = document.getElementById('modal-title');
    const modalRole = document.getElementById('modal-role');
    const modalImage = document.getElementById('modal-image');
    const modalVideo = document.getElementById('modal-video');
    const modalDescription = document.getElementById('modal-description');
    const modalLinkWrap = document.getElementById('modal-link-wrap');
    const modalLink = document.getElementById('modal-link');
    const closeBtn = modal.querySelector('.modal-close');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const indicatorsContainer = document.getElementById('carousel-indicators');

    let currentMedia = [];
    let currentIndex = 0;
    let lastFocusedElement = null;

    function updateControls() {
        const several = currentMedia.length > 1;
        prevBtn.style.display = several ? 'flex' : 'none';
        nextBtn.style.display = several ? 'flex' : 'none';
        indicatorsContainer.style.display = several ? 'flex' : 'none';
    }

    function updateCarousel() {
        if (!currentMedia.length) {
            modalImage.style.display = 'none';
            modalVideo.style.display = 'none';
            updateControls();
            return;
        }

        const src = currentMedia[currentIndex];
        const isVideo = src.toLowerCase().endsWith('.mp4');

        modalVideo.pause();
        modalVideo.removeAttribute('src');
        modalVideo.style.display = 'none';
        modalImage.style.display = 'none';

        if (isVideo) {
            modalVideo.src = src;
            modalVideo.style.display = 'block';
            modalVideo.load();
            if (!prefersReducedMotion) modalVideo.play().catch(() => {});
        } else {
            modalImage.style.opacity = 0;
            modalImage.src = src;
            modalImage.alt = `${modalTitle.textContent} — media ${currentIndex + 1} of ${currentMedia.length}`;
            modalImage.style.display = 'block';
            requestAnimationFrame(() => {
                modalImage.style.opacity = 1;
            });
        }

        indicatorsContainer.querySelectorAll('.indicator').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });

        updateControls();
    }

    function createIndicators() {
        indicatorsContainer.innerHTML = '';
        currentMedia.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.className = 'indicator';
            dot.setAttribute('aria-label', `Show project media ${index + 1}`);
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateCarousel();
            });
            indicatorsContainer.appendChild(dot);
        });
    }

    function openProject(projectId) {
        const data = projects[projectId];
        if (!data) return;

        lastFocusedElement = document.activeElement;
        modalTitle.textContent = data.title;
        modalRole.textContent = data.role;
        modalDescription.innerHTML = data.description;

        if (data.link) {
            modalLink.href = data.link.href;
            modalLink.firstChild.textContent = `${data.link.label} `;
            modalLinkWrap.hidden = false;
        } else {
            modalLinkWrap.hidden = true;
        }

        currentMedia = data.images || [];
        currentIndex = 0;

        createIndicators();
        updateCarousel();

        modal.classList.add('show');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        modalPanel.scrollTop = 0;
        requestAnimationFrame(() => closeBtn.focus());
    }

    function closeModal() {
        modal.classList.remove('show');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        modalVideo.pause();
        modalVideo.removeAttribute('src');
        if (lastFocusedElement) lastFocusedElement.focus();
    }

    document.querySelectorAll('[data-project]').forEach(trigger => {
        trigger.addEventListener('click', () => openProject(trigger.getAttribute('data-project')));
    });

    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('mousedown', event => {
        if (event.target === modal) closeModal();
    });

    prevBtn.addEventListener('click', () => {
        if (currentMedia.length <= 1) return;
        currentIndex = currentIndex === 0 ? currentMedia.length - 1 : currentIndex - 1;
        updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
        if (currentMedia.length <= 1) return;
        currentIndex = currentIndex === currentMedia.length - 1 ? 0 : currentIndex + 1;
        updateCarousel();
    });

    document.addEventListener('keydown', event => {
        if (!modal.classList.contains('show')) return;

        if (event.key === 'Escape') {
            closeModal();
            return;
        }
        if (event.key === 'ArrowLeft') prevBtn.click();
        if (event.key === 'ArrowRight') nextBtn.click();

        // Keep focus inside the dialog while it is open
        if (event.key === 'Tab') {
            const focusables = modalPanel.querySelectorAll(
                'button, [href], video[controls], [tabindex]:not([tabindex="-1"])'
            );
            const list = [...focusables].filter(el => el.offsetParent !== null || el === document.activeElement);
            if (!list.length) return;
            const first = list[0];
            const last = list[list.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        }
    });
});
