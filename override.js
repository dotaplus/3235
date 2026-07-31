// Navbar blur on scroll
const navbar = document.querySelector('.MC_globalHeaderA');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('vr-nav--scrolled');
  } else {
    navbar.classList.remove('vr-nav--scrolled');
  }
}, { passive: true });

// Copy IP
function copyIp() {
  const ip = document.getElementById('serverIp').textContent;
  navigator.clipboard.writeText(ip).then(() => {
    const btn = document.querySelector('.vr-ip .MC_Button_Primary');
    const span = btn.querySelector('span');
    const orig = span.textContent;
    span.textContent = 'Скопировано';
    setTimeout(() => { span.textContent = orig; }, 2000);
  });
}

// Плавная прокрутка для якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#' || href.startsWith('#!')) return;
    
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const headerHeight = document.querySelector('.MC_globalHeader').offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});