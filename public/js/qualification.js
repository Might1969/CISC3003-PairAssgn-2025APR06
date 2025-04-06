// qualification.js - Fixed Version
document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observers
  const createObserver = (selector, callback, options = { threshold: 0.3 }) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => entry.isIntersecting && callback(entry));
    }, options);
    document.querySelectorAll(selector).forEach(el => observer.observe(el));
  };

  // Timeline Animation
  createObserver('.timeline-item', (entry) => {
    entry.target.style.opacity = '1';
    entry.target.style.transform = 'translateY(0)';
  });

  // Counter Animation
  createObserver('.counter-item', (entry) => {
    const countElement = entry.target.querySelector('.count');
    if (!countElement.dataset.animated) {
      const target = +countElement.dataset.target;
      let current = 0;
      const increment = target / 100;
      
      const updateCount = () => {
        if (current < target) {
          current = Math.ceil(current + increment);
          countElement.textContent = current < 10 ? `0${current}` : current;
          requestAnimationFrame(updateCount);
        } else {
          countElement.textContent = target;
        }
      }
      updateCount();
      countElement.dataset.animated = 'true';
    }
  }, { threshold: 1 });

  // Theme Switcher
  const themeSwitcher = document.createElement('div');
  themeSwitcher.className = 'theme-switcher';
  themeSwitcher.innerHTML = '🌓';
  Object.assign(themeSwitcher.style, {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    fontSize: '24px',
    cursor: 'pointer',
    zIndex: '1000',
    background: '#fff',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
  });

  const themes = ['light-theme', 'dark-theme', 'professional-theme'];
  const themeIcons = ['🌓', '🌞', '💼'];
  let currentTheme = 0;
  
  themeSwitcher.addEventListener('click', () => {
    document.body.classList.remove(themes[currentTheme]);
    currentTheme = (currentTheme + 1) % themes.length;
    document.body.classList.add(themes[currentTheme]);
    themeSwitcher.innerHTML = themeIcons[currentTheme];
    themeSwitcher.style.background = currentTheme === 1 ? '#2d314d' : '#fff';
  });
  
  document.body.appendChild(themeSwitcher);
});