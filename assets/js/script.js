document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(13, 17, 23, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
        } else {
            navbar.style.background = 'rgba(13, 17, 23, 0.85)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // --- Project Modals ---
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

    // Project Data
    const projects = {
        'heart-vs-slim': {
            title: 'Comparative Analysis of HEART vs SLIM',
            role: 'Project Leader | Published in Motivtech Journal',
            description: `
                <p><strong>Goal:</strong> Analyze human error probability in MCAS operations.</p>
                <p>Conducted a comparative study of two major Human Reliability Assessment (HRA) methods: HEART (Human Error Assessment and Reduction Technique) and SLIM (Success Likelihood Index Method).</p>
                <ul>
                    <li>Utilized HEART and SLIM methods to calculate failure likelihood.</li>
                    <li>Demonstrated proficiency in data-driven reliability analysis.</li>
                    <li>Published results in Motivtech Journal (doi.org/10.46574/motivection.v7i1.431).</li>
                </ul>
            `,
            images: [
                'assets/images/projects/heart-vs-slim/1.jpg',
                'assets/images/projects/heart-vs-slim/2.png',
                'assets/images/projects/heart-vs-slim/3.png',
                'assets/images/projects/heart-vs-slim/4.png'
            ]
        },
        'hvac-design': {
            title: 'HVAC System Design & Life Cycle Assessment (LCA)',
            role: 'Project Leader',
            description: `
                <p><strong>Cooling Load Analysis:</strong> Calculated total cooling requirements, identifying a <strong>peak load of 1,020.8 kW</strong> and a Sensible Heat Ratio (SHR) of 0.627, highlighting high latent heat (humidity) as a critical design factor.</p>
                <p><strong>System Comparative Study:</strong> Conducted a technical comparison between a Water-Cooled Chiller system with Variable Air Volume (VAV) and a Rooftop Unit (RTU) system with VAV to optimize air distribution and energy efficiency.</p>
                <p><strong>Life Cycle Assessment (LCA):</strong> Evaluated both Embodied and Operational Carbon footprints. Analysis revealed that Embodied Carbon accounted for 61% of total emissions (primarily driven by steel materials), while the Water-Cooled Chiller system demonstrated superior efficiency in Operational Carbon reduction compared to the RTU system.</p>
            `,
            images: [
                'assets/images/projects/hvac-design/1.png',
                'assets/images/projects/hvac-design/2.png',
                'assets/images/projects/hvac-design/3.png',
                'assets/images/projects/hvac-design/4.png'
            ]
        },
        'hero-helmets': {
            title: 'HERO Helmets: Bio-Composite Safety Helmet',
            role: 'Team Leader | Funded by Kemdikbudristek (PKM-KC)',
            description: `
                <p><strong>Innovation:</strong> Industrial safety helmet using water hyacinth fiber biocomposites.</p>
                <ul>
                    <li>Designed the helmet prototype and optimized the manufacturing process using vacuum infusion.</li>
                    <li>Conducted mechanical testing (Impact Resistance and Tensile Strength) to ensure compliance with SNI/ASTM standards.</li>
                    <li>Analyzed material properties to determine the optimal fiber-to-matrix ratio for maximum durability.</li>
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
        'perovskite-halide': {
            title: 'Perovskite Halide as Fluorescent Taggant',
            role: 'Researcher',
            description: `
                <p><strong>Feasibility Study:</strong> Utilizing Perovskite Halide materials as fluorescent taggants for advanced Line Tracer applications in Oil & Gas operations.</p>
                <ul>
                    <li>Analyzed the optical properties and stability of the material to detect leaks or trace flow paths in pipeline systems.</li>
                    <li>Evaluated the economic and technical viability of implementing this nanomaterial technology compared to conventional tracing methods.</li>
                </ul>
            `,
            images: [
                'assets/images/projects/perovskite-halide/1.jpg',
                'assets/images/projects/perovskite-halide/2.jpg'
            ]
        },
        'autonomous-trash-bin': {
            title: 'Autonomous Trash Bin',
            role: 'Capstone Project Leader',
            description: `
                <p><strong>Goal:</strong> Line Follower Based Automation for Waste Management.</p>
                <ul>
                    <li>Led the end-to-end development of a mechatronic waste management robot.</li>
                    <li>Engineered an automated navigation system using IR sensors (Line Follower) and microcontroller logic.</li>
                    <li>Designed the touchless actuation mechanism utilizing Ultrasonic sensors and Servo motors for automatic lid operation.</li>
                    <li>Conducted performance testing on sensor sensitivity and load-carrying efficiency.</li>
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
                    <li>Engineered a composite insulation system using aluminum foil, cardboard, and polystyrene to minimize heat loss.</li>
                    <li>Analyzed the heating rate and thermal retention of the chamber to evaluate efficiency.</li>
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
                <p><strong>Contribution:</strong> Branding and Visual Communication.</p>
                <ul>
                    <li>Designed and managed engaging visual content for Instagram and event posters.</li>
                    <li>Actively participated in key environmental initiatives, including renewable energy conferences, solar power plant (PLTS) field visits, and waste management education programs ("Sekolah Sampah").</li>
                </ul>
            `,
            images: [
                'assets/images/projects/sekitar-kita/1.jpg',
                'assets/images/projects/sekitar-kita/2.jpg',
                'assets/images/projects/sekitar-kita/3.jpg',
                'assets/images/projects/sekitar-kita/4.webp'
            ]
        }
    };

    function updateCarousel() {
        if (currentProjectImages.length > 0) {
            const currentSrc = currentProjectImages[currentImageIndex];
            const isVideo = currentSrc.endsWith('.mp4');

            // Reset states
            modalImage.style.display = 'none';
            modalVideo.style.display = 'none';
            modalVideo.pause();

            if (isVideo) {
                modalVideo.src = currentSrc;
                modalVideo.style.display = 'block';
                modalVideo.play().catch(e => console.log('Autoplay prevented:', e));
            } else {
                modalImage.style.opacity = 0;
                modalImage.style.display = 'block';
                setTimeout(() => {
                    modalImage.src = currentSrc;
                    modalImage.style.opacity = 1;
                }, 200);
            }

            // Update indicators
            const dots = document.querySelectorAll('.indicator');
            dots.forEach((dot, index) => {
                if (index === currentImageIndex) dot.classList.add('active');
                else dot.classList.remove('active');
            });
        }
    }

    function createIndicators() {
        indicatorsContainer.innerHTML = '';
        if (currentProjectImages.length > 1) {
            currentProjectImages.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.classList.add('indicator');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => {
                    currentImageIndex = index;
                    updateCarousel();
                });
                indicatorsContainer.appendChild(dot);
            });
        }
    }

    prevBtn.addEventListener('click', () => {
        if (currentProjectImages.length > 1) {
            currentImageIndex = (currentImageIndex === 0) ? currentProjectImages.length - 1 : currentImageIndex - 1;
            updateCarousel();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentProjectImages.length > 1) {
            currentImageIndex = (currentImageIndex === currentProjectImages.length - 1) ? 0 : currentImageIndex + 1;
            updateCarousel();
        }
    });

    // Open Modal
    document.querySelectorAll('[data-project]').forEach(item => {
        item.addEventListener('click', () => {
            const projectId = item.getAttribute('data-project');
            const data = projects[projectId];

            if (data) {
                modalTitle.textContent = data.title;
                modalRole.textContent = data.role;
                modalDescription.innerHTML = data.description;

                currentProjectImages = data.images || [];
                currentImageIndex = 0;

                // Setup Carousel
                if (currentProjectImages.length > 0) {
                    // Check initial item
                    const firstSrc = currentProjectImages[0];
                    if (firstSrc.endsWith('.mp4')) {
                        modalVideo.src = firstSrc;
                        modalVideo.style.display = 'block';
                        modalImage.style.display = 'none';
                    } else {
                        modalImage.src = firstSrc;
                        modalImage.style.display = 'block';
                        modalVideo.style.display = 'none';
                    }

                    createIndicators();

                    if (currentProjectImages.length > 1) {
                        prevBtn.style.display = 'flex';
                        nextBtn.style.display = 'flex';
                    } else {
                        prevBtn.style.display = 'none';
                        nextBtn.style.display = 'none';
                    }
                } else {
                    modalImage.style.display = 'none';
                    prevBtn.style.display = 'none';
                    nextBtn.style.display = 'none';
                }

                modal.style.display = 'flex'; // Ensure flex for centering
                // Force reflow to enable transition
                void modal.offsetWidth;
                modal.classList.add('show');

                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    });

    // Close Modal
    function closeModalFunc() {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            modalVideo.pause(); // Ensure video stops
            modalVideo.src = "";
        }, 400); // Wait for transition
        document.body.style.overflow = 'auto';
    }

    closeModal.addEventListener('click', closeModalFunc);

    // Close on clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalFunc();
        }
    });

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll Reveal Animation with Intersection Observer
    // Target more elements for the reveal effect
    const revealElements = document.querySelectorAll('.glass-card, .section-title, .hero-content, .hero-image-wrapper, .timeline-item, .skill-group, .org-card, .project-card, .footer-content');

    const revealOptions = {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Offset slightly so it affects top/bottom entrance
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, revealOptions);

    revealElements.forEach(element => {
        revealOnScroll.observe(element);
    });

    // Parallax Effect for Background Globes
    const globes = document.querySelectorAll('.globe');

    window.addEventListener('scroll', () => {
        const scrollValue = window.scrollY;

        globes.forEach((globe, index) => {
            const speed = (index + 1) * 0.2;
            const yPos = scrollValue * speed;
            const xPos = index % 2 === 0 ? scrollValue * 0.05 : -scrollValue * 0.05;

            globe.style.transform = `translate(${xPos}px, ${yPos}px)`;
        });
    });
});
