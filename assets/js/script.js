document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalRole = document.getElementById('modal-role');
    const modalImage = document.getElementById('modal-image');
    const modalVideo = document.getElementById('modal-video');
    const modalDescription = document.getElementById('modal-description');
    const closeModal = document.querySelector('.close-modal');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const indicatorsContainer = document.getElementById('carousel-indicators');

    let currentProjectImages = [];
    let currentImageIndex = 0;
    let lastFocusedElement = null;

    function setupRevealAnimations() {
        const revealElements = document.querySelectorAll(
            '.glass-card, .section-header, .hero-content, .hero-image-container, .timeline-item, .skill-group, .org-card, .project-card, .credential-card, .footer-content'
        );

        const activateVisibleElement = element => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight * 0.92 && rect.bottom > window.innerHeight * 0.08;

            if (isVisible && !element.classList.contains('active')) {
                requestAnimationFrame(() => element.classList.add('active'));
            }
        };

        revealElements.forEach((element, index) => {
            const groupPosition = index % 6;
            element.style.setProperty('--reveal-delay', `${Math.min(groupPosition * 70, 280)}ms`);
            element.style.setProperty('--reveal-y', '56px');
            if (!element.classList.contains('hero-content')) {
                element.classList.remove('active');
            }
        });

        if (!('IntersectionObserver' in window)) {
            revealElements.forEach(element => element.classList.add('active'));
            return;
        }

        const revealOnScroll = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                const target = entry.target;

                if (entry.isIntersecting) {
                    const enteringFromBottom = entry.boundingClientRect.top > window.innerHeight * 0.45;
                    target.style.setProperty('--reveal-y', enteringFromBottom ? '56px' : '-48px');

                    if (!target.classList.contains('active')) {
                        requestAnimationFrame(() => target.classList.add('active'));
                    }
                } else {
                    const exitingAbove = entry.boundingClientRect.top < 0;
                    target.style.setProperty('--reveal-y', exitingAbove ? '-48px' : '56px');
                    target.classList.remove('active');
                }
            });
        }, {
            threshold: 0.08,
            rootMargin: '0px 0px -72px 0px'
        });

        revealElements.forEach(element => revealOnScroll.observe(element));

        requestAnimationFrame(() => {
            revealElements.forEach(activateVisibleElement);
        });

        setTimeout(() => {
            document.querySelectorAll('.hero-content, .hero-image-container').forEach(element => {
                element.classList.add('active');
            });
            revealElements.forEach(activateVisibleElement);
        }, 120);

        window.addEventListener('scroll', () => {
            revealElements.forEach(activateVisibleElement);
        }, { passive: true });
    }

    const projects = {
        'n-hexane-hazard-zone': {
            title: 'n-Hexane Hazard Zone Prediction',
            role: 'Undergraduate Thesis | Process Safety, QRA & ML Surrogate Modeling',
            description: `
                <p><strong>Focus:</strong> Rapid hazard-zone prediction for n-Hexane tank overfill scenarios using ALOHA simulation outputs as ground truth.</p>
                <ul>
                    <li>Built a dataset of 1,215 full-factorial scenarios covering atmospheric stability, wind speed, temperature, release rate, effective spill duration, and liquid thickness.</li>
                    <li>Modeled red, orange, and yellow LEL-based hazard-zone radii using Multiple Linear Regression, Random Forest, and Artificial Neural Network approaches.</li>
                    <li>Developed a dashboard-style decision-support interface to communicate scenario severity, model comparison, and dominant risk drivers.</li>
                    <li>Positioned the workflow for rapid risk screening, emergency response planning, and process safety decision support.</li>
                </ul>
            `,
            images: [
                'assets/images/projects/n-hexane-hazard-zone/dashboard/pasted-1777173393954-0.png',
                'assets/images/projects/n-hexane-hazard-zone/dashboard/pasted-1777173398947-0.png',
                'assets/images/projects/n-hexane-hazard-zone/Flowchart Thesis Tugas akhir.png',
                'assets/images/projects/n-hexane-hazard-zone/correlation_heatmap tesis.png'
            ]
        },
        'energy-transition-indonesia': {
            title: 'Evidence-Based Energy Transition Analysis for Indonesia',
            role: 'First Author | Manuscript under pre-review',
            description: `
                <p><strong>Focus:</strong> Statistical analysis for Indonesia's energy transition and sustainability policy decisions.</p>
                <ul>
                    <li>Used ARIMA forecasting to project Indonesia's energy supply trajectory through 2060.</li>
                    <li>Applied multiple regression to quantify the relationship between renewable energy, non-renewable energy, and CO2 emissions.</li>
                    <li>Ran 10,000-iteration Monte Carlo simulations to estimate renewable energy target feasibility under uncertainty.</li>
                    <li>Key findings: the 2025 renewable energy target has a 65.21% probability of achievement, while the 2060 APS 78% target remains at 0.00% under current projected trends.</li>
                </ul>
            `,
            images: [
                'assets/images/projects/energy-transition-indonesia/Picture2.png',
                'assets/images/projects/energy-transition-indonesia/pasted-1777173495236-0.png',
                'assets/images/projects/energy-transition-indonesia/pasted-1777173562225-1.png',
                'assets/images/projects/energy-transition-indonesia/Picture1.png',
                'assets/images/projects/energy-transition-indonesia/halaman pertama promoting evidance research paper.png'
            ]
        },
        'heart-vs-slim': {
            title: 'Comparative Analysis of HEART vs SLIM',
            role: 'Project Leader | Published in Motivtech Journal',
            description: `
                <p><strong>Focus:</strong> Human Reliability Assessment for safety-risk evaluation.</p>
                <ul>
                    <li>Compared HEART (Human Error Assessment and Reduction Technique) and SLIM (Success Likelihood Index Method).</li>
                    <li>Calculated human error likelihood and interpreted the implications for safety and reliability decision making.</li>
                    <li>Strengthened the portfolio's process safety and human factors foundation through a published research output.</li>
                    <li>Published in Motivtech Journal with DOI: 10.46574/motivection.v7i1.431.</li>
                </ul>
            `,
            images: [
                'assets/images/projects/heart-vs-slim/1.jpg',
                'assets/images/projects/heart-vs-slim/2.png',
                'assets/images/projects/heart-vs-slim/3.png',
                'assets/images/projects/heart-vs-slim/4.png'
            ]
        },
        'excel-engineering-templates': {
            title: 'Excel Engineering Calculation Templates',
            role: 'Engineering Tooling | Risk & Consequence Calculations',
            description: `
                <p><strong>Focus:</strong> Turning engineering equations into reusable Excel-based calculation tools.</p>
                <ul>
                    <li>Developed structured templates for risk and consequence-related calculations, including TNT explosion blast and pool fire workflows.</li>
                    <li>Designed calculation sheets with input sections, formulas, outputs, and visual plots to support faster engineering analysis.</li>
                    <li>Demonstrated ability to translate theoretical engineering methods into practical, reusable tools.</li>
                    <li>Useful for early-stage screening, calculation checking, and technical communication in safety/risk projects.</li>
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
            role: 'AI Engineering Project | Predictive Maintenance',
            description: `
                <p><strong>Focus:</strong> Machine learning model comparison for CNC machine condition and failure identification.</p>
                <ul>
                    <li>Performed data preprocessing, train-test splitting, model training, and evaluation for machine failure classification.</li>
                    <li>Compared models such as Random Forest, XGBoost, Logistic Regression, and ANN/MLP.</li>
                    <li>Evaluated performance with accuracy, macro F1-score, per-class F1 heatmap, and train-test overfitting diagnostics.</li>
                    <li>Connected the output to predictive maintenance, manufacturing analytics, and reliability decision support.</li>
                </ul>
            `,
            images: [
                'assets/images/projects/cnc-failure-identification/04_train_vs_test_overfitting.png',
                'assets/images/projects/cnc-failure-identification/02_f1_heatmap_per_class.png',
                'assets/images/projects/cnc-failure-identification/flowchart capstone ai engineering bootcamp.png'
            ]
        },
        'perovskite-halide': {
            title: 'Perovskite Halide as Fluorescent Taggant',
            role: 'Researcher | Feasibility Study & HKI-registered work',
            description: `
                <p><strong>Focus:</strong> Feasibility study of Perovskite Halide materials as fluorescent taggants for Oil & Gas line tracer applications.</p>
                <ul>
                    <li>Analyzed potential use cases for leak detection, flow path tracing, pipeline monitoring, and environmental monitoring.</li>
                    <li>Evaluated technical, economic, market, regulatory, and implementation feasibility compared to conventional tracer methods.</li>
                    <li>Supported the study with market-distribution analysis and research documentation.</li>
                    <li>The work is connected to an HKI registration record for the feasibility study output.</li>
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
            role: 'Team Leader | Funded by Kemdikbudristek (PKM-KC)',
            description: `
                <p><strong>Innovation:</strong> Industrial safety helmet using water hyacinth fiber biocomposites.</p>
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
            title: 'HVAC System Design & Life Cycle Assessment (LCA)',
            role: 'Project Leader',
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
            role: 'Capstone Project Leader',
            description: `
                <p><strong>Goal:</strong> Line follower based automation for small-scale waste management.</p>
                <ul>
                    <li>Led end-to-end development of a mechatronic waste-management robot.</li>
                    <li>Integrated IR line follower navigation, ultrasonic sensing, servo actuation, and microcontroller logic.</li>
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
            role: 'Heat Transfer Course Project',
            description: `
                <p><strong>Project:</strong> Design and fabrication of a functional prototype oven using upcycled heating elements.</p>
                <ul>
                    <li>Engineered a composite insulation system using aluminum foil, cardboard, and polystyrene.</li>
                    <li>Analyzed heating rate and thermal retention to evaluate insulation effectiveness.</li>
                    <li>Demonstrated practical heat transfer understanding through low-cost prototyping.</li>
                </ul>
            `,
            images: [
                'assets/images/projects/electric-oven/WhatsApp Image 2026-02-12 at 22.19.14.jpeg'
            ]
        },
        'sekitar-kita': {
            title: 'Sekitar Kita by SRE Indonesia',
            role: 'Graphic Design Volunteer (6 Months)',
            description: `
                <p><strong>Contribution:</strong> Branding and visual communication for sustainability programs.</p>
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

    function syncNavbarState() {
        navbar.classList.toggle('scrolled', window.scrollY > 32);
    }

    function closeMobileNav() {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    }

    function updateCarouselControls() {
        const hasMultipleItems = currentProjectImages.length > 1;
        prevBtn.style.display = hasMultipleItems ? 'flex' : 'none';
        nextBtn.style.display = hasMultipleItems ? 'flex' : 'none';
        indicatorsContainer.style.display = hasMultipleItems ? 'flex' : 'none';
    }

    function updateCarousel() {
        if (!currentProjectImages.length) {
            modalImage.style.display = 'none';
            modalVideo.style.display = 'none';
            updateCarouselControls();
            return;
        }

        const currentSrc = currentProjectImages[currentImageIndex];
        const isVideo = currentSrc.toLowerCase().endsWith('.mp4');

        modalVideo.pause();
        modalVideo.removeAttribute('src');
        modalVideo.style.display = 'none';
        modalImage.style.display = 'none';

        if (isVideo) {
            modalVideo.src = currentSrc;
            modalVideo.style.display = 'block';
            modalVideo.load();
            modalVideo.play().catch(() => {});
        } else {
            modalImage.style.opacity = 0;
            modalImage.src = currentSrc;
            modalImage.alt = `${modalTitle.textContent} project media`;
            modalImage.style.display = 'block';
            requestAnimationFrame(() => {
                modalImage.style.opacity = 1;
            });
        }

        document.querySelectorAll('.indicator').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentImageIndex);
        });

        updateCarouselControls();
    }

    function createIndicators() {
        indicatorsContainer.innerHTML = '';
        currentProjectImages.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.className = 'indicator';
            dot.setAttribute('aria-label', `Show project media ${index + 1}`);
            dot.addEventListener('click', () => {
                currentImageIndex = index;
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
        currentProjectImages = data.images || [];
        currentImageIndex = 0;

        createIndicators();
        updateCarousel();

        modal.style.display = 'flex';
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        requestAnimationFrame(() => {
            modal.classList.add('show');
            closeModal.focus();
        });
    }

    function closeModalFunc() {
        modal.classList.remove('show');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        modalVideo.pause();

        setTimeout(() => {
            modal.style.display = 'none';
            modalVideo.removeAttribute('src');
            if (lastFocusedElement) lastFocusedElement.focus();
        }, 280);
    }

    setupRevealAnimations();

    if (!navbar || !hamburger || !navLinks || !modal || !modalTitle || !modalRole || !modalImage || !modalVideo || !modalDescription || !closeModal || !prevBtn || !nextBtn || !indicatorsContainer) {
        return;
    }

    syncNavbarState();
    window.addEventListener('scroll', syncNavbarState, { passive: true });

    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('active');
        hamburger.classList.toggle('active', isOpen);
        hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) closeMobileNav();
        });
    });

    document.querySelectorAll('[data-project]').forEach(item => {
        item.setAttribute('role', 'button');
        item.setAttribute('tabindex', '0');
        item.addEventListener('click', () => openProject(item.getAttribute('data-project')));
        item.addEventListener('keydown', event => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openProject(item.getAttribute('data-project'));
            }
        });
    });

    prevBtn.addEventListener('click', () => {
        if (currentProjectImages.length <= 1) return;
        currentImageIndex = currentImageIndex === 0 ? currentProjectImages.length - 1 : currentImageIndex - 1;
        updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
        if (currentProjectImages.length <= 1) return;
        currentImageIndex = currentImageIndex === currentProjectImages.length - 1 ? 0 : currentImageIndex + 1;
        updateCarousel();
    });

    closeModal.addEventListener('click', closeModalFunc);

    window.addEventListener('click', event => {
        if (event.target === modal) closeModalFunc();
    });

    window.addEventListener('keydown', event => {
        if (!modal.classList.contains('show')) return;

        if (event.key === 'Escape') closeModalFunc();
        if (event.key === 'ArrowLeft') prevBtn.click();
        if (event.key === 'ArrowRight') nextBtn.click();
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (event) {
            const target = document.querySelector(this.getAttribute('href'));
            if (!target) return;

            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        });
    });

});
