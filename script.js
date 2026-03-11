// ==============================================================================
// ADVANCED ANIMATIONS & INTERACTIVE EFFECTS
// ==============================================================================

// Page Loader
window.addEventListener('load', () => {
    const loader = document.querySelector('.page-loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 1500);
    }
});

// Custom Cursor
const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');

if (cursorDot && cursorRing) {
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth cursor animation
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.5;
        cursorY += (mouseY - cursorY) * 0.5;
        
        ringX += (mouseX - ringX) * 0.1;
        ringY += (mouseY - ringY) * 0.1;

        cursorDot.style.left = cursorX + 'px';
        cursorDot.style.top = cursorY + 'px';
        
        cursorRing.style.left = ringX + 'px';
        cursorRing.style.top = ringY + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .bento-card, .hobby-card');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
        element.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
    });
}

// Parallax Effect
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-layer');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach((element, index) => {
            const speed = (index + 1) * 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Scroll Reveal Animations
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale, .stagger-item');
    
    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check
}

// Magnetic Button Effect
function initMagneticButtons() {
    const magneticButtons = document.querySelectorAll('.magnetic-btn');
    
    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });
}

// Enhanced Timeline Interactions
function initTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timeline = document.querySelector('.experience-timeline');
    
    // Animate timeline line on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-line');
            }
        });
    }, { threshold: 0.1 });
    
    if (timeline) {
        observer.observe(timeline);
    }
    
    // Timeline item interactions - FIXED
    timelineItems.forEach(item => {
        // Remove existing onclick and add proper event listener
        item.addEventListener('click', (e) => {
            // Prevent event bubbling
            e.stopPropagation();
            
            // Toggle active state
            const isActive = item.classList.contains('active');
            
            // Close all items
            timelineItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// 3D Card Effects
function init3DCards() {
    const cards = document.querySelectorAll('.card-3d');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            const inner = card.querySelector('.card-3d-inner');
            if (inner) {
                inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const inner = card.querySelector('.card-3d-inner');
            if (inner) {
                inner.style.transform = 'rotateX(0) rotateY(0) scale(1)';
            }
        });
    });
}

// Smooth Scroll for Navigation
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active nav state
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });
}

// Glitch Text Effect
function initGlitchText() {
    const glitchTexts = document.querySelectorAll('.glitch-text');
    
    glitchTexts.forEach(text => {
        const originalText = text.textContent;
        text.setAttribute('data-text', originalText);
        
        // Random glitch effect
        setInterval(() => {
            if (Math.random() > 0.95) {
                text.style.animation = 'none';
                setTimeout(() => {
                    text.style.animation = '';
                }, 200);
            }
        }, 3000);
    });
}

// Floating Elements
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element, index) => {
        const amplitude = 10 + (index * 5);
        const frequency = 0.001 + (index * 0.0005);
        let phase = index * Math.PI / 3;
        
        function animate() {
            phase += frequency;
            const y = Math.sin(phase) * amplitude;
            element.style.transform = `translateY(${y}px)`;
            requestAnimationFrame(animate);
        }
        animate();
    });
}

// Initialize all animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initParallax();
    initScrollReveal();
    initMagneticButtons();
    initTimeline();
    init3DCards();
    initSmoothScroll();
    initGlitchText();
    initFloatingElements();
    initStarfield(); // Add starfield animation
    
    // Add animation classes to existing elements
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        if (!section.classList.contains('hero-section')) {
            section.classList.add('scroll-reveal');
        }
    });
    
    const cards = document.querySelectorAll('.bento-card, .project-card, .hobby-card');
    cards.forEach((card, index) => {
        card.classList.add('stagger-item');
    });
});

// Starfield Animation - Interactive stars that follow cursor
function initStarfield() {
    const canvas = document.getElementById('starfield-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let stars = [];
    let mouseX = 0;
    let mouseY = 0;
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create stars
    function createStars() {
        stars = [];
        for (let i = 0; i < 80; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 1 + 0.3,
                speedX: (Math.random() - 0.5) * 0.2,
                speedY: (Math.random() - 0.5) * 0.2,
                opacity: Math.random() * 0.3 + 0.1,
                twinkleSpeed: Math.random() * 0.01 + 0.005
            });
        }
    }
    createStars();
    
    // Mouse tracking
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Animation loop
    function animate() {
        // Clear canvas completely - no trails
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        stars.forEach(star => {
            // Move stars
            star.x += star.speedX;
            star.y += star.speedY;
            
            // Wrap around edges
            if (star.x < 0) star.x = canvas.width;
            if (star.x > canvas.width) star.x = 0;
            if (star.y < 0) star.y = canvas.height;
            if (star.y > canvas.height) star.y = 0;
            
            // Interactive cursor effect - stars react to mouse
            const dx = mouseX - star.x;
            const dy = mouseY - star.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = 100;
            
            if (distance < maxDistance) {
                const force = (1 - distance / maxDistance) * 1;
                star.x -= (dx / distance) * force;
                star.y -= (dy / distance) * force;
            }
            
            // Subtle twinkle effect
            star.opacity += Math.sin(Date.now() * star.twinkleSpeed) * 0.05;
            star.opacity = Math.max(0.05, Math.min(0.4, star.opacity));
            
            // Draw star - very subtle
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(150, 150, 200, ${star.opacity})`;
            ctx.fill();
        });
        
        requestAnimationFrame(animate);
    }
    animate();
}

// ==============================================================================
// TRANSLATION DICTIONARY
// ==============================================================================
const translations = {
    fr: {
        // Nav
        nav_home: "Accueil",
        nav_about: "À Propos",
        nav_experience: "Expériences",
        nav_education: "Formation",
        nav_skills: "Compétences",
        nav_projects: "Projets",
        nav_hobbies: "Centres d'intérêt",

        // Hero
        hero_greeting: "Bonjour, je suis",
        hero_title: "Alternant Management de SI & Développement",
        hero_subtitle: "Passionné par les solutions ERP et le développement logiciel, spécialisé dans l'intégration et la gestion de projet.",
        hero_cv_btn: "Télécharger mon CV",
        hero_contact_btn: "Me Contacter",

        // About
        about_heading: "À Propos",
        about_p1: "Passionné par les solutions ERP, j'interviens sur des projets en tant que Chef de Projet ERP et Intégrateur Logiciel, me concentrant sur le paramétrage, l'intégration, la personnalisation et le développement de modules spécifiques sur Odoo pour répondre aux besoins des entreprises.",
        about_p2: "Mon objectif est de créer des outils qui améliorent les processus métiers tout en garantissant fiabilité et sécurité. Mon intérêt pour les jeux FPS met en évidence mes compétences d'analyse rapide et de travail en équipe, que j'applique aux projets académiques et professionnels.",
        about_location: "42 rue Vaugelas, Annecy, 74000",
        about_card1_title: "Intégration",
        about_card1_desc: "Déploiement et personnalisation d'ERP.",
        about_card2_title: "Gestion de Projet",
        about_card2_desc: "Organisation et suivi rigoureux.",
        about_card3_title: "Développement Odoo",
        about_card3_desc: "Création de modules sur mesure.",

        // Experience
        exp_heading: "Expériences Professionnelles",
        exp_pi_date: "Depuis Septembre 2025",
        exp_title_1: "Développeur/Intégrateur Odoo",
        exp_company_1: "Pure-Illusion | Annecy (74)",
        exp_pi_task1: "Développement de modules",
        exp_pi_task2: "Ticketing",
        exp_pi_task3: "Intégration",
        exp_pi_task4: "Gestion de projet",

        exp_bio_date: "Avril 2025 – Juin 2025",
        exp_title_2: "Intégrateur Odoo",
        exp_company_2: "Bio&Lo | Lyon (69)",
        exp_bio_task1: "Mise en place de modes opératoires",
        exp_bio_task2: "Gestion du suivi du stock via des imports générés à partir de scripts python",

        exp_title_3: "Modélisateur 3D (Stage)",
        exp_company_3: "Cincinatti VR | Chambost-Allières (69)",
        exp_cincinatti_date: "Octobre 2022",

        exp_title_4: "Technicien réseau (Stage)",
        exp_company_4: "Inetech | Lissieu (69)",
        exp_inetech_date: "Août 2021",

        exp_summer_2025_date: "Été 2025",
        exp_summer_2023_date: "Été 2023",
        exp_summer_title: "Commis de salle",
        exp_summer_company: "Secteur Restauration",
        exp_summer_2025_company: "Osteria bella vista da Antonio e Marco | Lyon (69)",
        exp_summer_2023_company: "La Feuillée | Theizé (69)",

        // Education
        edu_heading: "Parcours Académique",
        edu_but_title: 'BUT Info "Intégration d\'Applications et Management du système d\'information"',
        edu_bac_title: "Bac STI2D spécialité ITEC (Mention Bien)",

        // Skills
        skills_heading: "Compétences",
        skills_filter_all: "Tout",
        skills_filter_programming: "Programmation",
        skills_filter_database: "Base de données",
        skills_filter_network: "Réseaux",
        skills_filter_management: "Gestion",
        skills_filter_odoo: "Odoo",
        skills_filter_sap: "SAP",
        skills_filter_powerplatform: "Power Platform",
        skills_filter_design: "Conception",
        skills_filter_languages: "Langues",
        skills_cat_tech: "Techniques",
        skills_prog: "Programmation",
        skills_web: "Développement Web",
        skills_db_network: "Données & Réseau",
        skills_uml: "Conception UML",
        skills_cat_erp: "Entreprise & ERP",
        skills_erp: "Systèmes ERP",
        skills_management: "Gestion de Projet",
        skills_agile: "Méthodes Agiles",
        skills_ticketing: "Ticketing",
        skills_cat_lang: "Langues",
        skills_lang_en: "Anglais",
        skills_level_en: "Intermédiaire (B1)",
        skills_lang_es: "Espagnol",
        skills_level_es: "Pré-intermédiaire (A2)",
        
        // Solar System Skills
        skill_gestion_de_projet: "Gestion de projet",
        skill_erp: "ERP",
        skill_base_de_donnees: "Base de données",
        skill_reseau: "Réseau",
        skill_programmation_web: "Programmation/Web",
        skill_conception_et_modelisation: "Conception et modélisation",
        skill_conception_assistee_par_ordinateur: "Conception assistée par ordinateur",
        skill_maths: "Maths",
        skill_physique: "Physique",
        skill_dimension_mecanique: "Dimension mécanique",
        skill_eco_conception: "Éco-conception",
        skill_prototypage_rapide: "Prototypage rapide",
        
        // Cloud Skills
        skill_python: "Python",
        skill_typescript: "TypeScript",
        skill_react: "React",
        skill_unity: "Unity",
        skill_wpf: "WPF",
        skill_css: "CSS",
        skill_postgresql: "PostgreSQL",
        skill_sql: "SQL",
        skill_linux: "Linux",
        skill_windows: "Windows",
        skill_odoo: "Odoo",
        skill_sap: "SAP",
        skill_powerplatform: "Power Platform",
        skill_dynamics365: "Dynamics365",
        skill_powerpage: "PowerPage",
        skill_power_automate: "Power Automate",
        skill_power_bi: "Power BI",
        skill_power_apps: "Power Apps",
        skill_dataverse: "Dataverse",
        skill_gestion_de_projet_cloud: "Gestion de projet",
        skill_methodes_agiles: "Méthodes Agiles",
        skill_developpement_de_modules: "Développement de modules",
        skill_developpement: "Développement",
        skill_ticketing_cloud: "Ticketing",
        skill_integration_cloud: "Intégration",
        skill_modes_operatoires: "Modes opératoires",
        skill_uml_cloud: "UML",
        skill_anglais_b1: "Anglais (B1)",
        skill_espagnol_a2: "Espagnol (A2)",

        // Projects
        proj_heading: "Mes Projets",
        proj_ai: "IA",
        proj_gamedev: "GameDev",
        proj_c6_desc: "Une version moderne de Puissance 4 qui défie les joueurs d'aligner 6 jetons. Avec un design élégant en WPF, le jeu propose des modes deux joueurs ou IA, des mécaniques de bonus et un chronomètre pour plus d'excitation.",
        proj_zs_desc: "Un jeu de survie tendu où vous repoussez des zombies implacables avec des ressources limitées. Avec une IA dynamique et une atmosphère immersive, c'est un combat palpitant pour survivre à la nuit contre la horde.",
        proj_badgeuse_desc: "Application web de gestion de badgeage (pointage) permettant de suivre les entrées et sorties des employés.",

        // Hobbies
        hobbies_heading: "Centres d'intérêt",
        hobbies_gym: "Musculation",
        hobbies_gym_desc: "Depuis 2 ans",
        hobbies_gaming: "Jeux Vidéo",
        hobbies_gaming_desc: "FPS (Valorant, Overwatch, Marvel Rivals), Clash Royale",
        hobbies_travel: "Voyages",
        hobbies_travel_desc: "Etats-Unis, Pérou, Espagne, Italie, Royaume-Uni, Belgique, Tchéquie",

        // Footer
        contact_heading: "Me Contacter",
        footer_rights: "Tous droits réservés"
    },
    en: {
        // Nav
        nav_home: "Home",
        nav_about: "About",
        nav_experience: "Experience",
        nav_education: "Education",
        nav_skills: "Skills",
        nav_projects: "Projects",
        nav_hobbies: "Hobbies",

        // Hero
        hero_greeting: "Hi, I am",
        hero_title: "Work-Study Student in IT Systems Management & Development",
        hero_subtitle: "Passionate about ERP solutions and software development, specializing in Odoo integration.",
        hero_cv_btn: "Download Resume",
        hero_contact_btn: "Contact Me",

        // About
        about_heading: "About",
        about_p1: "Passionate about ERP solutions, I work on projects as an ERP Project Manager and Software Integrator, focusing on configuration, integration, and customization to meet business needs.",
        about_p2: "My goal is to create tools that improve business processes while guaranteeing reliability and security. My interest in FPS games highlights my quick analysis and teamwork skills, which I apply to academic and professional projects.",
        about_location: "42 rue Vaugelas, Annecy, 74000",
        about_card1_title: "Integration",
        about_card1_desc: "ERP deployment and customization.",
        about_card2_title: "Project Management",
        about_card2_desc: "Rigorous organization and tracking.",
        about_card3_title: "Odoo Development",
        about_card3_desc: "Custom module creation.",

        // Experience
        exp_heading: "Professional Experience",
        exp_pi_date: "Since September 2025",
        exp_title_1: "Odoo Developer/Integrator",
        exp_company_1: "Pure-Illusion | Annecy (74)",
        exp_pi_task1: "Module development",
        exp_pi_task2: "Ticketing",
        exp_pi_task3: "Integration",
        exp_pi_task4: "Project management",

        exp_bio_date: "April 2025 – June 2025",
        exp_title_2: "Odoo Integrator",
        exp_company_2: "Bio&Lo | Lyon (69)",
        exp_bio_task1: "Implementation of operating procedures",
        exp_bio_task2: "Inventory tracking management via imports generated from Python scripts",

        exp_title_3: "3D Modeler (Internship)",
        exp_company_3: "Cincinatti VR | Chambost-Allières (69)",
        exp_cincinatti_date: "October 2022",

        exp_title_4: "Network Technician (Internship)",
        exp_company_4: "Inetech | Lissieu (69)",
        exp_inetech_date: "August 2021",

        exp_summer_date: "Summer 2023 & 2025",
        exp_summer_2025_date: "Summer 2025",
        exp_summer_2023_date: "Summer 2023",
        exp_summer_title: "Waiter",
        exp_summer_company: "Restaurant Sector",
        exp_summer_2025_company: "Osteria bella vista da Antonio e Marco | Lyon (69)",
        exp_summer_2023_company: "La Feuillée | Theizé (69)",

        // Education
        edu_heading: "Academic Background",
        edu_but_title: 'Bachelor in IT "Application Integration and IT System Management"',
        edu_bac_title: "High School Diploma in Science and Technology (Honors)",

        // Skills
        skills_heading: "My Skills",
        skills_filter_all: "All",
        skills_filter_programming: "Programming",
        skills_filter_database: "Database",
        skills_filter_network: "Network",
        skills_filter_management: "Management",
        skills_filter_odoo: "Odoo",
        skills_filter_sap: "SAP",
        skills_filter_powerplatform: "Power Platform",
        skills_filter_design: "Design",
        skills_filter_languages: "Languages",
        skills_cat_tech: "Technical",
        skills_prog: "Programming",
        skills_web: "Web Development",
        skills_db_network: "Data & Network",
        skills_uml: "UML Design",
        skills_cat_erp: "Business & ERP",
        skills_erp: "ERP Systems",
        skills_management: "Project Management",
        skills_agile: "Agile Methods",
        skills_ticketing: "Ticketing",
        skills_cat_lang: "Languages",
        skills_lang_en: "English",
        skills_level_en: "Intermediate (B1)",
        skills_lang_es: "Spanish",
        skills_level_es: "Pre-Intermediate (A2)",
        
        // Solar System Skills
        skill_gestion_de_projet: "Project Management",
        skill_erp: "ERP",
        skill_base_de_donnees: "Database",
        skill_reseau: "Network",
        skill_programmation_web: "Programming/Web",
        skill_conception_et_modelisation: "Design & Modeling",
        skill_conception_assistee_par_ordinateur: "Computer-Aided Design",
        skill_maths: "Maths",
        skill_physique: "Physics",
        skill_dimension_mecanique: "Mechanical Dimension",
        skill_eco_conception: "Eco-Design",
        skill_prototypage_rapide: "Rapid Prototyping",
        
        // Cloud Skills
        skill_python: "Python",
        skill_typescript: "TypeScript",
        skill_react: "React",
        skill_unity: "Unity",
        skill_wpf: "WPF",
        skill_css: "CSS",
        skill_postgresql: "PostgreSQL",
        skill_sql: "SQL",
        skill_linux: "Linux",
        skill_windows: "Windows",
        skill_odoo: "Odoo",
        skill_sap: "SAP",
        skill_powerplatform: "Power Platform",
        skill_dynamics365: "Dynamics365",
        skill_powerpage: "PowerPage",
        skill_power_automate: "Power Automate",
        skill_power_bi: "Power BI",
        skill_power_apps: "Power Apps",
        skill_dataverse: "Dataverse",
        skill_gestion_de_projet_cloud: "Project Management",
        skill_methodes_agiles: "Agile Methods",
        skill_developpement_de_modules: "Module Development",
        skill_ticketing_cloud: "Ticketing",
        skill_integration_cloud: "Integration",
        skill_modes_operatoires: "Operating Procedures",
        skill_uml_cloud: "UML",
        skill_anglais_b1: "English (B1)",
        skill_espagnol_a2: "Spanish (A2)",

        // Projects
        proj_heading: "My Projects",
        proj_ai: "AI",
        proj_gamedev: "GameDev",
        proj_c6_desc: "A modern take on Connect 4 challenging players to align 6 tokens. Featuring a sleek WPF design, the game offers two-player or AI modes, bonus mechanics, and a timer for added excitement.",
        proj_zs_desc: "A tense survival shooter where you fend off relentless zombies with limited resources. With dynamic AI and an immersive atmosphere, it's a thrilling fight to survive the night against the horde.",
        proj_badgeuse_desc: "Web application for badge management (time tracking) allowing to monitor employee check-ins and check-outs.",

        // Hobbies
        hobbies_heading: "Hobbies",
        hobbies_gym: "Workout",
        hobbies_gym_desc: "For 2 years",
        hobbies_gaming: "Video Games",
        hobbies_gaming_desc: "FPS (Valorant, Overwatch, Marvel Rivals), Clash Royale",
        hobbies_travel: "Traveling",
        hobbies_travel_desc: "USA, Peru, Spain, Italy, UK, Belgium, Czech Republic",

        // Footer
        contact_heading: "Contact Me",
        footer_rights: "All Rights Reserved"
    }
};

// ==============================================================================
// STATE & INIT
// ==============================================================================
let currentLang = 'fr';

document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');

    initNavigation();
    initScrollAnimations();
    initParticles();
    initCustomCursor();
    initTiltCards();
    initTimelineAnimation();
    initCountUp();
    initStarfield();

    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Initialize translations with default language
    const setLanguage = (lang) => {
        if (lang === currentLang) return;
        currentLang = lang;

        // Update Buttons
        const btnFr = document.getElementById('lang-fr');
        const btnEn = document.getElementById('lang-en');
        
        if (lang === 'fr') {
            btnFr.classList.add('active');
            btnEn.classList.remove('active');
            document.documentElement.lang = 'fr';
        } else {
            btnEn.classList.add('active');
            btnFr.classList.remove('active');
            document.documentElement.lang = 'en';
        }

        // Update DOM Elements
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                if (key === 'about_heading') {
                    el.innerHTML = lang === 'fr' ? 'À <span class="accent">Propos</span>' : 'A<span class="accent">bout</span>';
                } else if (key === 'exp_heading') {
                    el.innerHTML = lang === 'fr' ? 'Expériences <span class="accent">Professionnelles</span>' : 'Professional <span class="accent">Experience</span>';
                } else if (key === 'edu_heading') {
                    el.innerHTML = lang === 'fr' ? 'Parcours <span class="accent">Académique</span>' : 'Academic <span class="accent">Background</span>';
                } else if (key === 'skills_heading') {
                    el.innerHTML = lang === 'fr' ? 'Mes <span class="accent">Compétences</span>' : 'My <span class="accent">Skills</span>';
                } else if (key === 'proj_heading') {
                    el.innerHTML = lang === 'fr' ? 'Mes <span class="accent">Projets</span>' : 'My <span class="accent">Projects</span>';
                } else if (key === 'hobbies_heading') {
                    el.innerHTML = lang === 'fr' ? 'Centres <span class="accent">d\'intérêt</span>' : '<span class="accent">Hobbies</span>';
                } else if (key === 'hero_title') {
                    el.innerHTML = translations[lang][key] + '<span class="typing-cursor"></span>';
                } else {
                    el.textContent = translations[lang][key];
                }
            }
        });
    };
    
    // Set up language switcher buttons
    const btnFr = document.getElementById('lang-fr');
    const btnEn = document.getElementById('lang-en');
    if (btnFr) btnFr.addEventListener('click', () => setLanguage('fr'));
    if (btnEn) btnEn.addEventListener('click', () => setLanguage('en'));
    
    // Initialize with French
    setLanguage('fr');
    
    // Initialize Solar System Skills
    initSolarSystemSkills();
    
    // Initialize Skills Filters
    initSkillsFilters();
});

// ==============================================================================
// SOLAR SYSTEM SKILLS INTERACTIONS
// ==============================================================================
function initSolarSystemSkills() {
    // Attendre que le DOM soit complètement chargé
    setTimeout(() => {
        const planets = document.querySelectorAll('.skill-planet');
        console.log('Planets found:', planets.length); // Debug
        
        planets.forEach((planet, index) => {
            const tooltip = planet.querySelector('.skill-tooltip');
            const skillName = planet.getAttribute('data-skill');
            const solarSystem = planet.closest('.skills-solar-system');
            
            console.log(`Planet ${index}:`, skillName, 'Tooltip:', tooltip); // Debug
            
            if (!tooltip) {
                console.warn(`No tooltip found for planet: ${skillName}`); // Debug
                return; // Skip if no tooltip
            }
            
            planet.addEventListener('mouseenter', function() {
                console.log(`Mouse enter on: ${skillName}`); // Debug
                
                // Stop planet animation completely
                this.style.animationPlayState = 'paused';
                
                // Add glow effect to sun
                const sun = solarSystem.querySelector('.sun');
                if (sun) {
                    sun.style.boxShadow = '0 0 50px rgba(99, 102, 241, 0.8)';
                }
                
                // Move tooltip to solar system container and show it
                solarSystem.appendChild(tooltip);
                const skillKey = skillName.toLowerCase()
                    .replace(/[^a-z0-9éèêàâùûîïôö]/g, '_')
                    .replace(/é/g, 'e')
                    .replace(/è/g, 'e')
                    .replace(/ê/g, 'e')
                    .replace(/à/g, 'a')
                    .replace(/â/g, 'a')
                    .replace(/ù/g, 'u')
                    .replace(/û/g, 'u')
                    .replace(/î/g, 'i')
                    .replace(/ï/g, 'i')
                    .replace(/ô/g, 'o')
                    .replace(/ö/g, 'o')
                    .replace(/ /g, '_')
                    .replace(/-/g, '_');
                const translationKey = `skill_${skillKey}`;
                tooltip.textContent = translations[currentLang][translationKey] || skillName;
                tooltip.classList.add('active');
            });
            
            planet.addEventListener('mouseleave', function() {
                console.log(`Mouse leave on: ${skillName}`); // Debug
                
                // Resume planet animation
                this.style.animationPlayState = 'running';
                
                // Remove glow effect from sun
                const sun = solarSystem.querySelector('.sun');
                if (sun) {
                    sun.style.boxShadow = '0 0 30px rgba(99, 102, 241, 0.5)';
                }
                
                // Hide tooltip
                tooltip.classList.remove('active');
            });
            
            planet.addEventListener('click', function() {
                // Pulse animation on click
                this.style.animation = 'none';
                setTimeout(() => {
                    this.style.animation = 'planetPulse 0.6s ease';
                }, 10);
            });
        });
        
        // Add planet pulse animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes planetPulse {
                0% { transform: translateX(-50%) scale(1); }
                50% { transform: translateX(-50%) scale(1.5); }
                100% { transform: translateX(-50%) scale(1); }
            }
        `;
        document.head.appendChild(style);
    }, 100); // Petit délai pour s'assurer que tout est chargé
}

// ==============================================================================
// SKILLS FILTERS
// ==============================================================================
function initSkillsFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const skillTags = document.querySelectorAll('.skill-tag');
    
    if (!filterButtons.length || !skillTags.length) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter skills
            skillTags.forEach(tag => {
                if (filter === 'all') {
                    tag.classList.remove('hidden');
                } else {
                    const categories = tag.className.split(' ');
                    if (categories.includes(filter)) {
                        tag.classList.remove('hidden');
                    } else {
                        tag.classList.add('hidden');
                    }
                }
            });
            
            // Force reflow to ensure colors are applied
            setTimeout(() => {
                skillTags.forEach(tag => {
                    tag.style.display = tag.classList.contains('hidden') ? 'none' : '';
                });
            }, 10);
        });
    });
}

// ==============================================================================
// PARTICLE SYSTEM
// ==============================================================================
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let particles = [];
    let mouse = { x: null, y: null };
    const maxParticles = 60;
    const connectionDistance = 150;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 0.5;
            this.opacity = Math.random() * 0.5 + 0.1;
            // Color: mix of indigo, violet, cyan
            const colors = [
                [99, 102, 241],   // indigo
                [139, 92, 246],   // violet
                [6, 182, 212],    // cyan
            ];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            // Mouse repulsion
            if (mouse.x !== null && mouse.y !== null) {
                const dx = this.x - mouse.x;
                const dy = this.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    const force = (120 - dist) / 120;
                    this.vx += (dx / dist) * force * 0.3;
                    this.vy += (dy / dist) * force * 0.3;
                }
            }

            // Damping
            this.vx *= 0.99;
            this.vy *= 0.99;

            this.x += this.vx;
            this.y += this.vy;

            // Wrap around edges
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, ${this.opacity})`;
            ctx.fill();
        }
    }

    // Create particles
    for (let i = 0; i < maxParticles; i++) {
        particles.push(new Particle());
    }

    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < connectionDistance) {
                    const opacity = (1 - dist / connectionDistance) * 0.15;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        drawConnections();
        requestAnimationFrame(animate);
    }

    animate();
}

// ==============================================================================
// CUSTOM CURSOR
// ==============================================================================
function initCustomCursor() {
    // Only on desktop
    if (window.innerWidth < 900 || 'ontouchstart' in window) return;

    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = mouseX - 4 + 'px';
        dot.style.top = mouseY - 4 + 'px';
    });

    // Smoothly follow cursor with ring
    function animateRing() {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        ring.style.left = ringX - 17 + 'px';
        ring.style.top = ringY - 17 + 'px';
        requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover state for interactive elements
    const hoverTargets = document.querySelectorAll('a, button, .btn, .bento-card, .project-card, .hobby-card, .timeline-item');
    hoverTargets.forEach(target => {
        target.addEventListener('mouseenter', () => {
            ring.classList.add('hovering');
            dot.style.transform = 'scale(1.5)';
        });
        target.addEventListener('mouseleave', () => {
            ring.classList.remove('hovering');
            dot.style.transform = 'scale(1)';
        });
    });
}

// ==============================================================================
// TILT EFFECT FOR CARDS
// ==============================================================================
function initTiltCards() {
    if (window.innerWidth < 900 || 'ontouchstart' in window) return;

    const cards = document.querySelectorAll('.bento-card, .project-card, .hobby-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / centerY * -4;
            const rotateY = (x - centerX) / centerX * 4;

            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.01)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// ==============================================================================
// TIMELINE ANIMATION (Animate progress line when visible)
// ==============================================================================
function initTimelineAnimation() {
    const timeline = document.querySelector('.experience-timeline');
    if (!timeline) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                timeline.classList.add('animate-line');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    observer.observe(timeline);
}

// ==============================================================================
// COUNT-UP ANIMATION (optional for future stat numbers)
// ==============================================================================
function initCountUp() {
    const counters = document.querySelectorAll('[data-count]');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCount = () => {
            current += step;
            if (current >= target) {
                counter.textContent = target;
            } else {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCount);
            }
        };

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCount();
                observer.unobserve(counter);
            }
        }, { threshold: 0.5 });

        observer.observe(counter);
    });
}

// ==============================================================================
// NAVIGATION
// ==============================================================================
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Sticky Nav on Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active section highlighting
        updateActiveNav();
    });

    // Mobile Menu Toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when clicking a link
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
}

/**
 * Highlight active navigation link based on scroll position
 */
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    const scrollY = window.scrollY + 150;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ==============================================================================
// SCROLL ANIMATIONS (Enhanced with staggered reveals)
// ==============================================================================
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add staggered delay based on position within parent
                const parent = entry.target.parentElement;
                if (parent) {
                    const siblings = Array.from(parent.querySelectorAll('.animate-on-scroll, .animate-slide-left, .animate-scale'));
                    const index = siblings.indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll, .animate-slide-left, .animate-scale');
    animatedElements.forEach(el => observer.observe(el));

    // Section header animations
    const sectionHeaders = document.querySelectorAll('.section-header');
    const headerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                headerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    sectionHeaders.forEach(header => {
        header.style.opacity = '0';
        header.style.transform = 'translateY(30px)';
        header.style.transition = 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
        headerObserver.observe(header);
    });
}

// ==============================================================================
// SKILLS SHUFFLE
// ==============================================================================
function shuffleSkills() {
    const skillsCloud = document.querySelector('.skills-cloud');
    if (!skillsCloud) return;
    
    const skillTags = Array.from(skillsCloud.querySelectorAll('.skill-tag'));
    
    // M�langer al�atoirement les comp�tences
    for (let i = skillTags.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [skillTags[i], skillTags[j]] = [skillTags[j], skillTags[i]];
    }
    
    // Vider et r�ins�rer les comp�tences dans l'ordre m�lang�
    skillTags.forEach(tag => skillsCloud.appendChild(tag));
}

// Appeler le m�lange au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    shuffleSkills();
});


