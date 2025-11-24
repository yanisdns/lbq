// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== NAVBAR STICKY & SCROLL EFFECT =====
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // ===== MENU BURGER MOBILE =====
    const burger = document.querySelector('.burger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    burger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animation du burger
        burger.classList.toggle('active');
    });

    // Fermer le menu lors du clic sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            burger.classList.remove('active');
        });
    });

    // ===== SLIDER HERO =====
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    const slideInterval = 5000; // 5 secondes

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    // Démarrer le slider automatique
    setInterval(nextSlide, slideInterval);

    // ===== SMOOTH SCROLL =====
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Compensation pour la navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== ANIMATION AU SCROLL =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Sélectionner les éléments à animer
    const elementsToAnimate = document.querySelectorAll('.realisation-card, .contact-item, .engagement-content');
    
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // ===== ANIMATION DES CARTES DE RÉALISATIONS =====
    const realisationCards = document.querySelectorAll('.realisation-card');
    
    realisationCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });

    // ===== EFFET PARALLAXE HERO =====
    const heroContent = document.querySelector('.hero-content');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroContent.style.opacity = 1 - (scrolled / 600);
        }
    });

    // ===== COMPTEUR D'ANIMATION POUR LES CHIFFRES =====
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = Math.ceil(target);
                clearInterval(timer);
            } else {
                element.textContent = Math.ceil(start);
            }
        }, 16);
    }

    // ===== HOVER EFFECT SUR LES LIENS DE NAVIGATION =====
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // // ===== LAZY LOADING POUR LES IMAGES =====
    // const images = document.querySelectorAll('img[src]');
    
    // const imageObserver = new IntersectionObserver((entries, observer) => {
    //     entries.forEach(entry => {
    //         if (entry.isIntersecting) {
    //             const img = entry.target;
    //             img.style.opacity = '0';
    //             img.style.transition = 'opacity 0.5s ease';
                
    //             img.onload = () => {
    //                 img.style.opacity = '1';
    //             };
                
    //             observer.unobserve(img);
    //         }
    //     });
    // });
    
    // images.forEach(img => imageObserver.observe(img));

    // ===== EFFET DE TYPING POUR LE TITRE HERO (optionnel) =====
    // Vous pouvez décommenter cette section si vous voulez un effet de typing
    /*
    const heroTitle = document.querySelector('.hero-title');
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }
    
    setTimeout(typeWriter, 500);
    */

    // ===== ACTIVE LINK DANS LA NAVIGATION =====
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector(`.nav-menu a[href*=${sectionId}]`)?.classList.add('active-link');
            } else {
                document.querySelector(`.nav-menu a[href*=${sectionId}]`)?.classList.remove('active-link');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);

    // ===== PROTECTION CONTRE LE SCROLL HORIZONTAL =====
    document.body.style.overflowX = 'hidden';

    // ===== ANIMATION DES ICONES SOCIAL MEDIA =====
    const socialLinks = document.querySelectorAll('.footer-social a');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) rotate(5deg)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg)';
        });
    });

    // ===== EFFET DE GLOW SUR L'AMPERSAND =====
    const ampersands = document.querySelectorAll('.ampersand');
    
    ampersands.forEach(amp => {
        amp.addEventListener('mouseenter', function() {
            this.style.textShadow = '0 0 20px rgba(0, 217, 255, 0.8)';
            this.style.transform = 'scale(1.1)';
        });
        
        amp.addEventListener('mouseleave', function() {
            this.style.textShadow = 'none';
            this.style.transform = 'scale(1)';
        });
        
        // Transition CSS pour l'ampersand
        amp.style.transition = 'all 0.3s ease';
    });
});