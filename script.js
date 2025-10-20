// Nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('#nav-list');
if (navToggle && navList) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navList.classList.toggle('show');
  });
}

// Smooth scroll for internal links
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;
  const id = link.getAttribute('href');
  if (!id || id === '#') return;
  const target = document.querySelector(id);
  if (!target) return;
  e.preventDefault();
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// Year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// Skills config and renderer (cards)
const skillsConfig = {
  groups: [
    {
      title: 'Frontend', icon: '🎨', items: [
        'TypeScript', 'JavaScript', 'Reactjs', 'Next.js', 'CSS / SASS', 'HTML', 'Tailwind'
      ]
    },
    {
      title: 'Backend', icon: '🛠️', items: [
        'Node.js', 'Express', 'Postgresql', 'PHP'
      ]
    },
    {
      title: 'Others', icon: '✨', items: [
        'Docker', 'Git', 'CI/CD', 'Testing'
      ]
    }
  ]
};

function renderSkillCards() {
  const grid = document.getElementById('skills-cards');
  if (!grid) return;
  grid.innerHTML = '';
  for (const group of skillsConfig.groups) {
    const card = document.createElement('article');
    card.className = 'skill-card tilt';

    const shine = document.createElement('div');
    shine.className = 'shine';
    shine.setAttribute('aria-hidden', 'true');

    const title = document.createElement('h3');
    title.textContent = group.title;

    const list = document.createElement('ul');
    list.className = 'skill-list';
const iconMap = {
  'TypeScript': '🔷',      // Blue diamond for TypeScript
  'JavaScript': '🟨',      // Yellow square for JS
  'React': '⚛️',           // Atom icon for React
  'Next.js': '⏩',          // Fast forward for Next.js
  'CSS / SASS': '🎨',       // Palette for styling
  'HTML': '📄',             // Page/document for HTML
  'Tailwind': '💨',         // Wind for Tailwind
  'Node.js': '🟢',           // Green circle for Node.js
  'Express': '🚂',           // Train for Express
  'PHP': '🐘',              // Elephant for PHP
  'Postgresql': '🗄️',       // Elephant for PostgreSQL
  'Docker': '🐳',           // Whale for Docker
  'Git': '🌲',               // Tree for Git (like a branch)
  'CI/CD': '⚙️',            // Gear for automation
  'Testing': '🧪'           // Test tube for testing
};

    for (const item of group.items) {
      const li = document.createElement('li');
      const ic = document.createElement('span');
      ic.className = 'pill-icon';
      ic.setAttribute('aria-hidden', 'true');
      ic.textContent = iconMap[item] || '✨';
      const label = document.createElement('span');
      label.textContent = item;
      li.appendChild(ic);
      li.appendChild(label);
      list.appendChild(li);
    }

    card.appendChild(shine);
    card.appendChild(title);
    card.appendChild(list);
    grid.appendChild(card);
  }
}

document.addEventListener('DOMContentLoaded', renderSkillCards);

// 3D tilt for tilt-enabled cards
function attachTilt() {
  const cards = document.querySelectorAll('.tilt');
  cards.forEach((card) => {
    const bound = { w: 0, h: 0 };
    function setVars(e) {
      const r = card.getBoundingClientRect();
      bound.w = r.width; bound.h = r.height;
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const rx = ((y / bound.h) - 0.5) * -6; // rotateX
      const ry = ((x / bound.w) - 0.5) * 6;  // rotateY
      card.style.setProperty('--rx', rx.toFixed(2) + 'deg');
      card.style.setProperty('--ry', ry.toFixed(2) + 'deg');
      card.style.setProperty('--mx', x + 'px');
      card.style.setProperty('--my', y + 'px');
    }
    card.addEventListener('mousemove', setVars);
    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
      card.style.setProperty('--mx', '50%');
      card.style.setProperty('--my', '0%');
    });
  });
}

document.addEventListener('DOMContentLoaded', attachTilt);

// About stats counter
function animateCounters() {
  const nums = document.querySelectorAll('.about-stats .num');
  nums.forEach((el) => {
    const target = Number(el.getAttribute('data-target') || '0');
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 60));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = String(current);
    }, 16);
  });
}

document.addEventListener('DOMContentLoaded', animateCounters);


