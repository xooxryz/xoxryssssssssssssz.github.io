// Rohan Portfolio interactions
const themeBtn = document.getElementById('themeToggle');
const root = document.documentElement;

function setTheme(mode){
  root.setAttribute('data-theme', mode);
  localStorage.setItem('theme', mode);
}

function initTheme(){
  const saved = localStorage.getItem('theme');
  if(saved){ setTheme(saved); }
}

if(themeBtn){
  themeBtn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') || 'system';
    const next = current === 'dark' ? 'light' : current === 'light' ? 'system' : 'dark';
    setTheme(next);
    themeBtn.title = `Theme: ${next}`;
  });
}

function tickClock(){
  const el = document.getElementById('localTime');
  if(!el) return;
  const now = new Date();
  el.textContent = now.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
}
setInterval(tickClock, 1000);
tickClock();

// Load projects from JSON
async function loadProjects(){
  try{
    const res = await fetch('projects.json');
    const items = await res.json();
    const grid = document.getElementById('projectGrid');
    grid.innerHTML = items.map(p => `
      <article class="card project-card">
        <img src="${p.image}" alt="${p.title} preview">
        <h3>${p.title}</h3>
        <p class="muted">${p.description}</p>
        <div class="tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
        <div class="card-actions">
          ${p.demo ? `<a class="btn primary" target="_blank" rel="noopener" href="${p.demo}">Live Demo</a>` : ''}
          ${p.repo ? `<a class="btn" target="_blank" rel="noopener" href="${p.repo}">Repository</a>` : ''}
        </div>
      </article>
    `).join('');
  }catch(e){
    console.error('Failed to load projects.json', e);
  }
}

document.getElementById('year').textContent = new Date().getFullYear();
initTheme();
loadProjects();
