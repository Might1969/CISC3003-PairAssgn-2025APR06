// home.js - Home Page Interactions

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.getElementById('btnHamburger');
    const mobileMenu = document.querySelector('.header__menu');
    
    hamburger.addEventListener('click', (e) => {
        e.preventDefault();
        hamburger.classList.toggle('open');
        mobileMenu.classList.toggle('has-fade');
    });

    // Member Card Interactions
    document.querySelectorAll('.member-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 15px 40px rgba(0,0,0,0.12)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 5px 20px rgba(0,0,0,0.08)';
        });
    });

    // Smooth Scroll for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Social Media Hover Effects
    document.querySelectorAll('.social__link').forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'scale(1.2)';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'scale(1)';
        });
    });

    // Active Link Tracking
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if(pageYOffset >= (sectionTop - sectionHeight/3)) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.header__links a').forEach(link => {
            link.classList.remove('action');
            if(link.getAttribute('href').includes(current)) {
                link.classList.add('action');
            }
        });
    });
});
