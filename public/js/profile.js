// profile.js - Interactive Features
// 调整滚动箭头位置
document.addEventListener('DOMContentLoaded', () => {
    const scrollBtn = document.querySelector('.hero-scroll');
    if (scrollBtn) {
        scrollBtn.style.bottom = '-2.5rem'; 
        scrollBtn.style.transform = 'translateX(-50%)'; 
    }
});
// Hero Scroll Button
document.querySelector('.hero-scroll').addEventListener('click', () => {
  document.querySelector('.profile-layout').scrollIntoView({ 
    behavior: 'smooth' 
  });
});

// Hobbies Carousel Controls
const hobbiesCarousel = document.querySelector('.hobbies-carousel');
let isDragging = false;
let startX, scrollLeft;

// Mouse/Touch Events
hobbiesCarousel.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.pageX - hobbiesCarousel.offsetLeft;
  scrollLeft = hobbiesCarousel.scrollLeft;
});

hobbiesCarousel.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - hobbiesCarousel.offsetLeft;
  const walk = (x - startX) * 2;
  hobbiesCarousel.scrollLeft = scrollLeft - walk;
});

document.addEventListener('mouseup', () => isDragging = false);

// Timeline Animation Observer
const timelineItems = document.querySelectorAll('.roadmap-phase');
const timelineObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateX(0)';
    }
  });
}, { threshold: 0.5 });

timelineItems.forEach(item => {
  item.style.opacity = 0;
  item.style.transform = 'translateX(-20px)';
  item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
  timelineObserver.observe(item);
});

// Contact Form Validation
const contactForm = document.querySelector('.contact-form');
const emailInput = document.querySelector('input[type="email"]');

emailInput.addEventListener('input', () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  emailInput.style.borderColor = emailRegex.test(emailInput.value) 
    ? '#6c5ce7' 
    : '#ff4757';});

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const submitBtn = document.querySelector('.form-button');
  
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  
  // Simulated API call
  setTimeout(() => {
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
    contactForm.reset();
    setTimeout(() => {
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    }, 2000);
  }, 1500);
});

// Blog Card Hover Effect
document.querySelectorAll('.blog-post').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.transform = `
      perspective(1000px)
      rotateX(${(y - rect.height/2) / 15}deg)
      rotateY(${-(x - rect.width/2) / 15}deg)
    `;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
  });
});

// Dynamic Social Feed Updater
const socialFeed = document.querySelector('.social-feed');
const socialPosts = [
  {
    platform: 'GitHub',
    content: 'Just open-sourced our new UI component library!',
    icon: 'fab fa-github'
  },
  // Add more posts...
];

socialPosts.forEach(post => {
  const postElement = document.createElement('div');
  postElement.className = 'social-post';
  postElement.innerHTML = `
    <div class="post-header">
      <i class="${post.icon}"></i>
      <span>${post.platform}</span>
    </div>
    <p class="post-excerpt">${post.content}</p>
  `;
  socialFeed.prepend(postElement);
});
