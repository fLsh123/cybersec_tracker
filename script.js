// ─── STATE ───
let state = {
  skills: [],
  tasks: [],
  resources: [],
  completedResources: [],
  notes: [],
  goals: [],
  events: [],
  studySessions: 0,
  activeNote: null,
  taskFilter: 'all',
  resFilter: 'all',
  unlockedAchievements: []
};

// ─── BUILTIN RESOURCES ───
const BUILTIN_RESOURCES = [
  { id: 'b1', title: 'TryHackMe', url: 'https://tryhackme.com', desc: 'Gamified cybersecurity learning with guided rooms for all levels.', cat: 'Penetration Testing', type: 'free', builtin: true },
  { id: 'b2', title: 'HackTheBox', url: 'https://hackthebox.com', desc: 'Advanced labs and CTF-style challenges for penetration testers.', cat: 'Penetration Testing', type: 'free', builtin: true },
  { id: 'b3', title: 'PortSwigger Web Security Academy', url: 'https://portswigger.net/web-security', desc: 'Free, comprehensive web application security training by Burp Suite creators.', cat: 'Application Security', type: 'free', builtin: true },
  { id: 'b4', title: 'OWASP Top 10', url: 'https://owasp.org/Top10/', desc: 'The definitive top 10 web application security risks, updated regularly.', cat: 'Application Security', type: 'free', builtin: true },
  { id: 'b5', title: 'Wireshark', url: 'https://www.wireshark.org', desc: 'The world\'s foremost network protocol analyzer for traffic analysis.', cat: 'Network Security', type: 'free', builtin: true },
  { id: 'b6', title: 'Nmap', url: 'https://nmap.org', desc: 'Powerful network scanner for host discovery and port enumeration.', cat: 'Network Security', type: 'free', builtin: true },
  { id: 'b7', title: 'SANS Institute', url: 'https://www.sans.org', desc: 'World-class cybersecurity training and GIAC certifications.', cat: 'General', type: 'paid', builtin: true },
  { id: 'b8', title: 'CompTIA Security+', url: 'https://www.comptia.org/certifications/security', desc: 'Entry-level security certification covering core security concepts.', cat: 'General', type: 'cert', builtin: true },
  { id: 'b9', title: 'Offensive Security (OSCP)', url: 'https://www.offsec.com/courses/pen-200/', desc: 'The gold standard penetration testing certification with 24-hour exam.', cat: 'Penetration Testing', type: 'cert', builtin: true },
  { id: 'b10', title: 'DFIR.training', url: 'https://www.dfir.training', desc: 'Free and paid digital forensics and incident response training resources.', cat: 'Incident Response & Forensics', type: 'free', builtin: true },
  { id: 'b11', title: 'CyberDefenders', url: 'https://cyberdefenders.org', desc: 'Blue team labs focusing on forensics, SIEM, and threat hunting.', cat: 'Incident Response & Forensics', type: 'free', builtin: true },
  { id: 'b12', title: 'Cryptohack', url: 'https://cryptohack.org', desc: 'Fun, interactive platform to learn modern cryptography through challenges.', cat: 'General', type: 'free', builtin: true },
  { id: 'b13', title: 'Shodan', url: 'https://shodan.io', desc: 'Search engine for internet-connected devices, widely used in OSINT.', cat: 'General', type: 'free', builtin: true },
  { id: 'b14', title: 'MITRE ATT&CK', url: 'https://attack.mitre.org', desc: 'Globally-accessible knowledge base of adversary tactics and techniques.', cat: 'Incident Response & Forensics', type: 'free', builtin: true },
  { id: 'b15', title: 'VulnHub', url: 'https://vulnhub.com', desc: 'Free downloadable vulnerable VMs for offline practice.', cat: 'Penetration Testing', type: 'free', builtin: true },
  { id: 'b16', title: 'Malware Traffic Analysis', url: 'https://malware-traffic-analysis.net', desc: 'Real malware pcap files for practicing network forensics.', cat: 'Incident Response & Forensics', type: 'free', builtin: true },
  { id: 'b17', title: 'CEH (EC-Council)', url: 'https://www.eccouncil.org/train-certify/certified-ethical-hacker-ceh/', desc: 'Certified Ethical Hacker — mid-level certification covering attack techniques.', cat: 'Penetration Testing', type: 'cert', builtin: true },
  { id: 'b18', title: 'IppSec YouTube', url: 'https://www.youtube.com/@ippsec', desc: 'HTB machine walkthroughs — best free resource for pentest methodology.', cat: 'Penetration Testing', type: 'free', builtin: true },
  { id: 'b19', title: 'TCM Security Academy', url: 'https://academy.tcm-sec.com', desc: 'Affordable practical courses including PNPT certification prep.', cat: 'Penetration Testing', type: 'paid', builtin: true },
  { id: 'b20', title: 'Blue Team Labs Online', url: 'https://blueteamlabs.online', desc: 'SOC analyst and blue team focused challenges and labs.', cat: 'Incident Response & Forensics', type: 'free', builtin: true },
  { id: 'b21', title: 'Cisco Networking Academy', url: 'https://netacad.com', desc: 'Free networking courses including CyberOps and network fundamentals.', cat: 'Network Security', type: 'free', builtin: true },
  { id: 'b22', title: 'CISSP (ISC2)', url: 'https://www.isc2.org/certifications/cissp', desc: 'The premier advanced security management certification globally.', cat: 'GRC / Compliance', type: 'cert', builtin: true },
  { id: 'b23', title: 'HackerOne', url: 'https://hackerone.com', desc: 'Bug bounty platform to practice on real targets and earn rewards.', cat: 'Application Security', type: 'free', builtin: true },
  { id: 'b24', title: 'ANY.RUN', url: 'https://any.run', desc: 'Interactive online malware sandbox for dynamic analysis.', cat: 'Incident Response & Forensics', type: 'free', builtin: true },
  { id: 'b25', title: 'Certified Junior Cybersecurity Analyst', url: 'https://skillsforall.com/course/junior-cybersecurity-analyst', desc: 'Practical SOC and defense skills certification by Cisco.', cat: 'Incident Response & Forensics', type: 'cert', builtin: true },
  { id: 'b26', title: 'ISC2 Certified in Cybersecurity (CC)', url: 'https://www.isc2.org/certifications/cc', desc: 'A great foundational cert that is often free to take.', cat: 'General', type: 'cert', builtin: true },
  { id: 'b27', title: 'eJPT (Junior Penetration Tester)', url: 'https://ine.com/learning/certifications/internal/ejpt', desc: 'Hands-on offensive security for those interested in the Red Team side.', cat: 'Penetration Testing', type: 'cert', builtin: true },
];

// ─── PERSISTENCE ───
function save() {
  localStorage.setItem('cybersec-tracker', JSON.stringify(state));
}

function load() {
  const s = localStorage.getItem('cybersec-tracker');
  if (s) {
    try {
      state = { ...state, ...JSON.parse(s) };
      if (!state.completedResources) state.completedResources = [];
      if (!state.goals) state.goals = [];
      if (!state.events) state.events = [];
      if (!state.studySessions) state.studySessions = 0;
      if (!state.unlockedAchievements) state.unlockedAchievements = [];
    } catch (e) { }
  }
}

// ─── XP SYSTEM ───
const LEVELS = [
  { name: 'Script Kiddie', xp: 0 },
  { name: 'Recon Analyst', xp: 200 },
  { name: 'Packet Sniffer', xp: 500 },
  { name: 'Exploit Dev', xp: 1000 },
  { name: 'CTF Veteran', xp: 2000 },
  { name: 'Red Teamer', xp: 3500 },
  { name: 'Security Engineer', xp: 5500 },
  { name: 'Threat Hunter', xp: 8000 },
  { name: 'Zero-Day Hunter', xp: 12000 },
  { name: 'Elite Hacker', xp: 20000 },
];

function getXP() {
  let xp = 0;
  state.skills.forEach(s => { xp += Math.floor(s.progress / 10) * 20; });
  state.tasks.forEach(t => { if (t.done) { xp += t.priority === 'high' ? 50 : t.priority === 'medium' ? 30 : 15; } });
  state.resources.forEach(() => { xp += 5; });
  if (state.completedResources) {
    state.completedResources.forEach(() => { xp += 50; });
  }
  if (state.goals) {
    state.goals.forEach(g => { if (g.done) xp += 100; });
  }
  return xp;
}

function getLevelInfo(xp) {
  let level = 0, rank = LEVELS[0];
  for (let i = 0; i < LEVELS.length; i++) {
    if (xp >= LEVELS[i].xp) { level = i + 1; rank = LEVELS[i]; }
  }
  const nextXP = level < LEVELS.length ? LEVELS[level].xp : LEVELS[LEVELS.length - 1].xp;
  const curLvlXP = LEVELS[level - 1]?.xp || 0;
  const pct = level < LEVELS.length ? Math.min(100, Math.round((xp - curLvlXP) / (nextXP - curLvlXP) * 100)) : 100;
  return { level, name: rank.name, nextXP, curXP: xp, pct };
}

// ─── UTIL ───
function esc(s) {
  return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ─── TABS ───
function switchTab(name) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.getElementById('panel-' + name).classList.add('active');
  const tabEl = document.getElementById('tab-' + name);
  if (tabEl) tabEl.classList.add('active');
  if (name === 'dashboard') renderDashboard();
  if (name === 'skills') renderSkills();
  if (name === 'tasks') renderTasks();
  if (name === 'resources') renderResources();
  if (name === 'notes') renderNotes();
  if (name === 'goals') renderGoals();
  if (name === 'timeline') renderTimeline();
  if (name === 'achievements') renderAchievements();
}

// ─── HEADER ───
function updateHeader() {
  const xp = getXP();
  const lvl = getLevelInfo(xp);
  const done = state.tasks.filter(t => t.done).length;
  document.getElementById('h-skills').textContent = state.skills.length;
  document.getElementById('h-tasks').textContent = done;
  document.getElementById('h-resources').textContent = BUILTIN_RESOURCES.length + state.resources.length;
  document.getElementById('h-level').textContent = lvl.level;
}

// ─── TOAST ───
function showToast(msg) {
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2800);
}

// ─── MODALS ───
function closeModal() {
  const modals = document.querySelectorAll('.modal');
  modals.forEach(m => m.style.display = 'none');
}

// ─── CHECK URL ───
function checkResourceURL() {
  document.getElementById('check-result').textContent = '';
  document.getElementById('check-url').value = '';
  document.getElementById('check-modal').style.display = 'flex';
}

function doCheckURL() {
  const url = document.getElementById('check-url').value.trim();
  const el = document.getElementById('check-result');
  if (!url) { el.textContent = 'Enter a URL first.'; return; }
  const all = [...BUILTIN_RESOURCES, ...state.resources];
  const norm = u => u.toLowerCase().replace(/\/$/, '').replace(/^https?:\/\/(www\.)?/, '');
  const found = all.find(r => norm(r.url) === norm(url));
  if (found) {
    el.style.color = 'var(--yellow)';
    el.textContent = `⚠ Already in your resources: "${found.title}" (${found.cat})`;
  } else {
    el.style.color = 'var(--accent)';
    el.textContent = `✓ Not found — you can add this resource!`;
  }
}

// ─── POMODORO TIMER ───
let timerInterval = null;
let timerSeconds = 25*60;
let timerRunning = false;
let timerTotal = 25*60;

function setTimerMode() {
  const mins = parseInt(document.getElementById('timer-mode').value);
  timerTotal = mins*60;
  timerSeconds = timerTotal;
  timerRunning = false;
  clearInterval(timerInterval);
  document.getElementById('timer-toggle').textContent = '▶';
  document.getElementById('timer-display').textContent = formatTimer(timerSeconds);
  document.getElementById('timer-label').textContent = mins===5?'Break':mins===10?'Short Break':'Focus Session';
  document.getElementById('timer-widget').classList.remove('timer-active');
}

function formatTimer(s) {
  const m = Math.floor(s/60);
  const sec = s%60;
  return String(m).padStart(2,'0')+':'+String(sec).padStart(2,'0');
}

function toggleTimer() {
  if (timerRunning) {
    clearInterval(timerInterval);
    timerRunning = false;
    document.getElementById('timer-toggle').textContent = '▶';
    document.getElementById('timer-widget').classList.remove('timer-active');
  } else {
    timerRunning = true;
    document.getElementById('timer-toggle').textContent = '⏸';
    document.getElementById('timer-widget').classList.add('timer-active');
    timerInterval = setInterval(() => {
      timerSeconds--;
      document.getElementById('timer-display').textContent = formatTimer(timerSeconds);
      if (timerSeconds <= 0) {
        clearInterval(timerInterval);
        timerRunning = false;
        document.getElementById('timer-toggle').textContent = '▶';
        document.getElementById('timer-widget').classList.remove('timer-active');
        state.studySessions = (state.studySessions||0)+1;
        save();
        checkAchievements();
        showToast('⏱️ Session complete! +XP earned');
        document.getElementById('timer-display').textContent = formatTimer(timerTotal);
        timerSeconds = timerTotal;
        updateHeader();
        if(document.getElementById('panel-dashboard').classList.contains('active')) renderDashboard();
      }
    },1000);
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  timerRunning = false;
  timerSeconds = timerTotal;
  document.getElementById('timer-toggle').textContent = '▶';
  document.getElementById('timer-display').textContent = formatTimer(timerSeconds);
  document.getElementById('timer-widget').classList.remove('timer-active');
}

// ─── RADAR CHART ───
function drawRadar() {
  const canvas = document.getElementById('radar-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const cx = W/2, cy = H/2 + 10;
  const R = Math.min(W,H)*0.38;
  const cats = ['Vulnerability\nMgmt','Network\nSecurity','IAM','Application\nSec','IR &\nForensics','GRC /\nCompliance','Pen\nTesting'];
  const catKeys = ['Vulnerability Management','Network Security','Identity & Access Management','Application Security','Incident Response & Forensics','GRC / Compliance','Penetration Testing'];
  const N = cats.length;
  ctx.clearRect(0,0,W,H);

  // Compute average per category
  const vals = catKeys.map(k => {
    const matched = state.skills.filter(s => s.cat === k);
    if (!matched.length) return 0;
    return matched.reduce((a,b) => a+b.progress,0)/matched.length/100;
  });

  // Draw web
  for (let ring=1;ring<=5;ring++) {
    ctx.beginPath();
    for (let i=0;i<N;i++) {
      const angle = (i/N)*Math.PI*2 - Math.PI/2;
      const x = cx + R*(ring/5)*Math.cos(angle);
      const y = cy + R*(ring/5)*Math.sin(angle);
      i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
    }
    ctx.closePath();
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // Axes
  for (let i=0;i<N;i++) {
    const angle = (i/N)*Math.PI*2 - Math.PI/2;
    ctx.beginPath();
    ctx.moveTo(cx,cy);
    ctx.lineTo(cx+R*Math.cos(angle), cy+R*Math.sin(angle));
    ctx.strokeStyle='rgba(255,255,255,0.08)';
    ctx.stroke();
  }

  // Fill
  ctx.beginPath();
  for (let i=0;i<N;i++) {
    const angle=(i/N)*Math.PI*2-Math.PI/2;
    const x=cx+R*vals[i]*Math.cos(angle);
    const y=cy+R*vals[i]*Math.sin(angle);
    i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
  }
  ctx.closePath();
  ctx.fillStyle='rgba(0,255,157,0.12)';
  ctx.fill();
  ctx.strokeStyle='rgba(0,255,157,0.7)';
  ctx.lineWidth=2;
  ctx.stroke();

  // Labels
  ctx.font='10px JetBrains Mono, monospace';
  ctx.fillStyle='rgba(138,149,163,0.9)';
  ctx.textAlign='center';
  for (let i=0;i<N;i++) {
    const angle=(i/N)*Math.PI*2-Math.PI/2;
    const lx=cx+(R+22)*Math.cos(angle);
    const ly=cy+(R+22)*Math.sin(angle);
    const lines=cats[i].split('\n');
    lines.forEach((l,li)=>ctx.fillText(l,lx,ly+li*12-(lines.length-1)*6));
  }

  // Legend
  const legend = document.getElementById('radar-legend');
  if (legend) {
    legend.innerHTML = catKeys.map((k,i)=>`<div class="radar-leg-item"><span style="color:var(--accent)">${Math.round(vals[i]*100)}%</span> ${k}</div>`).join('');
  }
}

// ─── SKILLS ───
function addSkill() {
  const name = document.getElementById('skill-name').value.trim();
  const cat = document.getElementById('skill-cat').value;
  const prog = Math.min(100, Math.max(0, parseInt(document.getElementById('skill-prog').value) || 0));
  if (!name) { showToast('Enter a skill name'); return; }
  if (state.skills.find(s => s.name.toLowerCase() === name.toLowerCase())) {
    showToast('Skill already exists!'); return;
  }
  state.skills.push({ id: Date.now(), name, cat, progress: prog });
  document.getElementById('skill-name').value = '';
  document.getElementById('skill-prog').value = 0;
  save(); renderSkills(); updateHeader();
  showToast('Skill added! +XP');
}

function updateSkillProgress(id, val) {
  const s = state.skills.find(x => x.id === id);
  if (s) { s.progress = parseInt(val); save(); updateHeader(); }
}

function editSkill(id) {
  const s = state.skills.find(x => x.id === id);
  if (!s) return;
  document.getElementById('es-id').value = s.id;
  document.getElementById('es-name').value = s.name;
  document.getElementById('es-cat').value = s.cat;
  document.getElementById('edit-skill-modal').style.display = 'flex';
}

function saveSkillEdit() {
  const id = parseInt(document.getElementById('es-id').value);
  const name = document.getElementById('es-name').value.trim();
  const cat = document.getElementById('es-cat').value;
  if (!name) { showToast('Skill name required'); return; }
  const s = state.skills.find(x => x.id === id);
  if (s) {
    s.name = name;
    s.cat = cat;
    save();
    renderSkills();
    renderDashboard();
    updateHeader();
    document.getElementById('edit-skill-modal').style.display = 'none';
    showToast('Skill updated!');
  }
}

function deleteSkill(id) {
  state.skills = state.skills.filter(x => x.id !== id);
  save(); renderSkills(); renderDashboard(); updateHeader();
}

function badgeClass(prog) {
  if (prog < 25) return 'beginner';
  if (prog < 50) return 'intermediate';
  if (prog < 80) return 'advanced';
  return 'expert';
}

function badgeLabel(prog) {
  if (prog < 25) return 'Beginner';
  if (prog < 50) return 'Intermediate';
  if (prog < 80) return 'Advanced';
  return 'Expert';
}

function renderSkills() {
  const grid = document.getElementById('skills-grid');
  updateTaskSkillDropdown();
  if (!state.skills.length) {
    grid.innerHTML = '<div class="empty-state" style="grid-column:1/-1"><div class="icon">🎯</div><p>Add your first skill above</p></div>';
    return;
  }
  grid.innerHTML = state.skills.map(s => `
    <div class="skill-card">
      <div class="skill-top">
        <div>
          <div class="skill-name">${esc(s.name)}</div>
          <div style="font-size:10px;color:var(--text3);margin-top:2px">${esc(s.cat)}</div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px">
          <span class="skill-badge badge-${badgeClass(s.progress)}">${badgeLabel(s.progress)}</span>
          <div style="display:flex;gap:4px">
            <button class="btn btn-ghost btn-sm" style="padding:4px 8px" onclick="editSkill(${s.id})">✎</button>
            <button class="btn btn-danger btn-sm" style="padding:4px 8px" onclick="deleteSkill(${s.id})">✕</button>
          </div>
        </div>
      </div>
      <div class="skill-progress-edit">
        <input type="range" min="0" max="100" value="${s.progress}"
          oninput="updateSkillProgress(${s.id},this.value);this.nextElementSibling.textContent=this.value+'%';this.closest('.skill-card').querySelector('.skill-fill').style.width=this.value+'%'"
          style="flex:1"/>
        <span class="skill-pct">${s.progress}%</span>
      </div>
      <div class="skill-bar" style="margin-top:8px"><div class="skill-fill" style="width:${s.progress}%"></div></div>
      <div class="skill-meta">
        <span>${esc(s.cat)}</span>
        <span>${s.progress}% complete</span>
      </div>
    </div>
  `).join('');
}

// ─── TASKS ───
function updateTaskSkillDropdown() {
  const sel = document.getElementById('task-skill');
  if (!sel) return;
  const cur = sel.value;
  sel.innerHTML = '<option value="">— none —</option>' + state.skills.map(s =>
    `<option value="${esc(s.name)}" ${s.name === cur ? 'selected' : ''}>${esc(s.name)}</option>`).join('');
}

function filterTasks(f, btn) {
  state.taskFilter = f;
  document.querySelectorAll('#panel-tasks .filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderTasks();
}

function addTask() {
  const name = document.getElementById('task-name').value.trim();
  const skill = document.getElementById('task-skill').value;
  const priority = document.getElementById('task-priority').value;
  const due = document.getElementById('task-due').value;
  if (!name) { showToast('Enter a task name'); return; }
  state.tasks.push({ id: Date.now(), name, skill, priority, due, done: false });
  document.getElementById('task-name').value = '';
  document.getElementById('task-due').value = '';
  save(); renderTasks(); updateHeader();
  showToast('Task added!');
}

function toggleTask(id) {
  const t = state.tasks.find(x => x.id === id);
  if (t) {
    t.done = !t.done;
    if (t.done && t.skill) {
      const s = state.skills.find(x => x.name === t.skill);
      if (s && s.progress < 100) {
        s.progress = Math.min(100, s.progress + 10);
        setTimeout(() => showToast(`+10% progress to ${s.name}!`), 1500);
      }
    }
    save(); renderTasks(); updateHeader(); renderSkills();
    if (t.done) showToast('Task complete! +XP earned');
  }
}

function deleteTask(id) {
  state.tasks = state.tasks.filter(x => x.id !== id);
  save(); renderTasks(); updateHeader();
}

function renderTasks() {
  const list = document.getElementById('tasks-list');
  const search = (document.getElementById('task-search')?.value || '').toLowerCase();
  let tasks = state.tasks.filter(t => {
    if (search && !t.name.toLowerCase().includes(search)) return false;
    if (state.taskFilter === 'pending') return !t.done;
    if (state.taskFilter === 'done') return t.done;
    if (state.taskFilter === 'high') return t.priority === 'high' && !t.done;
    return true;
  });
  if (!tasks.length) {
    list.innerHTML = '<div class="empty-state"><div class="icon">✅</div><p>No tasks here</p></div>';
    return;
  }
  const today = new Date().toISOString().split('T')[0];
  list.innerHTML = tasks.map(t => {
    const overdue = t.due && t.due < today && !t.done;
    return `
    <div class="task-item ${t.done ? 'done' : ''}">
      <div class="task-check ${t.done ? 'checked' : ''}" onclick="toggleTask(${t.id})">${t.done ? '✓' : ''}</div>
      <div class="task-name">${esc(t.name)}</div>
      ${t.skill ? `<span class="task-skill">${esc(t.skill)}</span>` : ''}
      <span class="task-priority priority-${t.priority}">${t.priority}</span>
      ${t.due ? `<span class="task-due ${overdue ? 'overdue' : ''}">${overdue ? '⚠ ' : ''} ${t.due}</span>` : ''}
      <button class="btn btn-danger btn-sm" onclick="deleteTask(${t.id})">✕</button>
    </div>`;
  }).join('');
}

// ─── RESOURCES ───
function filterRes(f, btn) {
  state.resFilter = f;
  document.querySelectorAll('.filter-row .filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderResources();
}

function openAddResource() {
  document.getElementById('res-modal').style.display = 'flex';
}

function addResource() {
  const title = document.getElementById('r-title').value.trim();
  const url = document.getElementById('r-url').value.trim();
  const desc = document.getElementById('r-desc').value.trim();
  const cat = document.getElementById('r-cat').value;
  const type = document.getElementById('r-type').value;
  if (!title || !url) { showToast('Title and URL required'); return; }

  // Check if already exists
  const all = [...BUILTIN_RESOURCES, ...state.resources];
  const existing = all.find(r => r.url.toLowerCase().replace(/\/$/, '') === url.toLowerCase().replace(/\/$/, ''));
  if (existing) {
    showToast(`Already in resources: "${existing.title}"`);
    return;
  }

  state.resources.push({ id: Date.now(), title, url, desc, cat, type, builtin: false });
  closeModal();
  save(); renderResources(); updateHeader();
  showToast('Resource added!');
}

function deleteResource(id) {
  state.resources = state.resources.filter(x => x.id !== id);
  save(); renderResources(); updateHeader();
}

function editResource(id) {
  const r = state.resources.find(x => x.id === id);
  if (!r) return;
  document.getElementById('er-id').value = r.id;
  document.getElementById('er-title').value = r.title;
  document.getElementById('er-url').value = r.url;
  document.getElementById('er-desc').value = r.desc;
  document.getElementById('er-cat').value = r.cat;
  document.getElementById('er-type').value = r.type;
  document.getElementById('edit-res-modal').style.display = 'flex';
}

function saveResourceEdit() {
  const id = parseInt(document.getElementById('er-id').value);
  const title = document.getElementById('er-title').value.trim();
  const url = document.getElementById('er-url').value.trim();
  const desc = document.getElementById('er-desc').value.trim();
  const cat = document.getElementById('er-cat').value;
  const type = document.getElementById('er-type').value;
  if (!title || !url) { showToast('Title and URL required'); return; }

  const r = state.resources.find(x => x.id === id);
  if (r) {
    r.title = title;
    r.url = url;
    r.desc = desc;
    r.cat = cat;
    r.type = type;
    save();
    renderResources();
    updateHeader();
    document.getElementById('edit-res-modal').style.display = 'none';
    showToast('Resource updated!');
  }
}

function toggleResourceComplete(id) {
  if (!state.completedResources) state.completedResources = [];
  const idx = state.completedResources.indexOf(String(id));
  if (idx > -1) {
    state.completedResources.splice(idx, 1);
  } else {
    state.completedResources.push(String(id));
    showToast('Resource completed! +XP earned');

    // Automatically boost skills in the same category
    const all = [...BUILTIN_RESOURCES, ...state.resources];
    const res = all.find(r => String(r.id) === String(id));
    if (res && res.cat) {
      let boosted = false;
      state.skills.forEach(s => {
        if (s.cat === res.cat && s.progress < 100) {
          s.progress = Math.min(100, s.progress + 10);
          boosted = true;
        }
      });
      if (boosted) {
        setTimeout(() => showToast(`+10% progress to ${res.cat} skills!`), 1500);
      }
    }
  }
  save();
  renderResources();
  renderSkills();
  updateHeader();
  if (document.getElementById('panel-dashboard').classList.contains('active')) renderDashboard();
}

function renderResources() {
  const grid = document.getElementById('resource-grid');
  const search = (document.getElementById('res-search')?.value || '').toLowerCase();
  const all = [...BUILTIN_RESOURCES, ...state.resources];

  let filtered = all.filter(r => {
    if (search && !r.title.toLowerCase().includes(search) && !r.desc.toLowerCase().includes(search) && !r.cat.toLowerCase().includes(search)) return false;
    if (state.resFilter === 'free') return r.type === 'free';
    if (state.resFilter === 'cert') return r.type === 'cert';
    if (state.resFilter === 'all') return true;
    return r.cat === state.resFilter;
  });

  if (!filtered.length) {
    grid.innerHTML = '<div class="empty-state" style="grid-column:1/-1"><div class="icon">📚</div><p>No resources found</p></div>';
    return;
  }

  grid.innerHTML = filtered.map(r => {
    const isComp = state.completedResources && state.completedResources.includes(String(r.id));
    return `
    <div class="resource-card ${!r.builtin ? 'user-resource' : ''} ${isComp ? 'completed-card' : ''}">
      ${isComp ? '<div class="owned-badge">✓</div>' : ''}
      <div class="resource-top">
        <div class="resource-title" style="${isComp ? 'margin-right:28px' : ''}">${esc(r.title)}</div>
        <span class="resource-tag tag-${r.type}">${r.type}</span>
      </div>
      <div class="resource-desc">${esc(r.desc)}</div>
      <div class="resource-bottom">
        <span class="resource-cat">${esc(r.cat)}</span>
        <div class="resource-actions">
          <button class="btn ${isComp ? 'btn-ghost' : 'btn-primary'} btn-sm" onclick="toggleResourceComplete('${r.id}')">${isComp ? 'Completed' : 'Mark Done'}</button>
          <a href="${esc(r.url)}" target="_blank" class="resource-link">Visit →</a>
          ${!r.builtin ? `<button class="btn btn-ghost btn-sm" style="padding:4px 8px;border:1px solid var(--border2);border-radius:6px;font-size:12px;color:var(--text3);" onclick="editResource(${r.id})">✎</button>` : ''}
          ${!r.builtin ? `<button class="resource-delete" onclick="deleteResource(${r.id})">✕</button>` : ''}
        </div>
      </div>
    </div>
    `;
  }).join('');
}

// ─── NOTES ───
function addNote() {
  const note = { id: Date.now(), title: 'New Note', content: '', date: new Date().toLocaleDateString() };
  state.notes.unshift(note);
  state.activeNote = note.id;
  save(); renderNotes();
}

function selectNote(id) {
  state.activeNote = id;
  renderNotes();
}

function updateNoteTitle(id, val) {
  const n = state.notes.find(x => x.id === id);
  if (n) { n.title = val; save(); renderNoteList(); }
}

function updateNoteContent(id, val) {
  const n = state.notes.find(x => x.id === id);
  if (n) { n.content = val; save(); }
}

function deleteNote(id) {
  state.notes = state.notes.filter(x => x.id !== id);
  if (state.activeNote === id) state.activeNote = state.notes[0]?.id || null;
  save(); renderNotes();
}

function renderNoteList() {
  const list = document.getElementById('notes-list');
  if (!state.notes.length) {
    list.innerHTML = '<div style="padding:20px;text-align:center;font-size:11px;color:var(--text3)">No notes yet</div>';
    return;
  }
  list.innerHTML = state.notes.map(n => `
    <div class="note-list-item ${n.id === state.activeNote ? 'active' : ''}" onclick="selectNote(${n.id})">
      <div class="note-list-title">${esc(n.title) || 'Untitled'}</div>
      <div class="note-list-date">${n.date}</div>
    </div>
  `).join('');
}

function renderNotes() {
  renderNoteList();
  const editor = document.getElementById('note-editor');
  const note = state.notes.find(n => n.id === state.activeNote);
  if (!note) {
    editor.innerHTML = '<div class="note-placeholder">Select a note or create a new one</div>';
    return;
  }
  editor.innerHTML = `
    <div class="note-editor-top">
      <input class="note-title-input" value="${esc(note.title)}" placeholder="Note title"
        oninput="updateNoteTitle(${note.id}, this.value)"/>
      <button class="btn btn-danger btn-sm" onclick="deleteNote(${note.id})">Delete</button>
    </div>
    <textarea class="note-textarea" placeholder="Write your notes here... (Markdown-friendly)"
      oninput="updateNoteContent(${note.id}, this.value)">${esc(note.content)}</textarea>
  `;
}

// ─── GOALS ───
var GOAL_ICONS = { Certification:'🏅', 'Skill Mastery':'🎯', 'Job / Internship':'💼', 'CTF / Competition':'🚩', 'Course Completion':'📖', Project:'🔧', Networking:'🤝', Other:'⭐' };

function addGoal() {
  const title = document.getElementById('goal-title').value.trim();
  const cat = document.getElementById('goal-cat').value;
  const date = document.getElementById('goal-date').value;
  const priority = document.getElementById('goal-priority').value;
  if (!title) { showToast('Enter a goal title'); return; }
  state.goals.push({ id: Date.now(), title, cat, date, priority, done: false });
  document.getElementById('goal-title').value = '';
  document.getElementById('goal-date').value = '';
  save(); renderGoals(); checkAchievements();
  showToast('Goal added!');
}

function toggleGoal(id) {
  const g = state.goals.find(x => x.id === id);
  if (g) {
    g.done = !g.done;
    if (g.done) showToast('Goal completed! 🎉 +XP');
    save(); renderGoals(); updateHeader(); checkAchievements();
    if (document.getElementById('panel-dashboard').classList.contains('active')) renderDashboard();
  }
}

function deleteGoal(id) {
  state.goals = state.goals.filter(x => x.id !== id);
  save(); renderGoals();
}

function renderGoals() {
  const list = document.getElementById('goals-list');
  if (!list) return;
  if (!state.goals.length) {
    list.innerHTML = '<div class="empty-state"><div class="icon">🚀</div><p>No goals yet — add your first career goal above</p></div>';
    return;
  }
  const today = new Date().toISOString().split('T')[0];
  const sorted = [...state.goals].sort((a, b) => {
    if (a.done !== b.done) return a.done ? 1 : -1;
    const pa = {high:0,medium:1,low:2}[a.priority];
    const pb = {high:0,medium:1,low:2}[b.priority];
    return pa - pb;
  });
  list.innerHTML = sorted.map(g => {
    const overdue = g.date && g.date < today && !g.done;
    const daysLeft = g.date ? Math.ceil((new Date(g.date) - new Date()) / 86400000) : null;
    const icon = GOAL_ICONS[g.cat] || '⭐';
    return `<div class="goal-item ${g.done ? 'done' : ''} ${overdue ? 'overdue-goal' : ''}">
      <div class="goal-icon">${icon}</div>
      <div class="goal-body">
        <div class="goal-title-text">${esc(g.title)}</div>
        <div class="goal-meta">
          <span class="task-priority priority-${g.priority}">${g.priority}</span>
          <span style="font-size:10px;color:var(--text3)">${esc(g.cat)}</span>
          ${g.date ? `<span class="task-due ${overdue?'overdue':''}">${overdue?'⚠ Overdue':daysLeft<=0?'Today':daysLeft===1?'Tomorrow':daysLeft+' days left'}</span>` : ''}
        </div>
      </div>
      <div class="goal-actions">
        <button class="btn ${g.done?'btn-ghost':'btn-primary'} btn-sm" onclick="toggleGoal(${g.id})">${g.done?'✓ Done':'Mark Done'}</button>
        <button class="btn btn-danger btn-sm" onclick="deleteGoal(${g.id})">✕</button>
      </div>
    </div>`;
  }).join('');
}

// ─── TIMELINE ───
var EV_COLORS = { cert:'var(--purple)', job:'var(--accent)', course:'var(--blue)', ctf:'var(--yellow)', project:'var(--red)', milestone:'var(--yellow)' };
var EV_ICONS  = { cert:'🏅', job:'💼', course:'📖', ctf:'🚩', project:'🔧', milestone:'⭐' };

function openAddEvent() {
  document.getElementById('ev-title').value = '';
  document.getElementById('ev-desc').value = '';
  document.getElementById('ev-date').value = new Date().toISOString().split('T')[0];
  document.getElementById('event-modal').style.display = 'flex';
}

function addEvent() {
  const title = document.getElementById('ev-title').value.trim();
  const date  = document.getElementById('ev-date').value;
  const type  = document.getElementById('ev-type').value;
  const desc  = document.getElementById('ev-desc').value.trim();
  if (!title || !date) { showToast('Title and date required'); return; }
  state.events.push({ id: Date.now(), title, date, type, desc });
  document.getElementById('event-modal').style.display = 'none';
  save(); renderTimeline(); checkAchievements();
  showToast('Event added to timeline!');
}

function deleteEvent(id) {
  state.events = state.events.filter(x => x.id !== id);
  save(); renderTimeline();
}

function renderTimeline() {
  const list = document.getElementById('timeline-list');
  if (!list) return;
  if (!state.events.length) {
    list.innerHTML = '<div class="empty-state"><div class="icon">📅</div><p>No events yet — log your career milestones</p></div>';
    return;
  }
  const sorted = [...state.events].sort((a, b) => b.date.localeCompare(a.date));
  list.innerHTML = sorted.map((ev, i) => `
    <div class="tl-item">
      <div class="tl-dot" style="background:${EV_COLORS[ev.type]||'var(--accent)'}; box-shadow:0 0 8px ${EV_COLORS[ev.type]||'var(--accent)'}60">${EV_ICONS[ev.type]||'⭐'}</div>
      <div class="tl-line" ${i===sorted.length-1?'style="background:transparent"':''}></div>
      <div class="tl-card">
        <div class="tl-date">${ev.date}</div>
        <div class="tl-title">${esc(ev.title)}</div>
        ${ev.desc?`<div class="tl-desc">${esc(ev.desc)}</div>`:''}
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px">
          <span class="resource-tag" style="background:${EV_COLORS[ev.type]||'var(--accent)'}22;color:${EV_COLORS[ev.type]||'var(--accent)'};border:1px solid ${EV_COLORS[ev.type]||'var(--accent)'}44">${ev.type}</span>
          <button class="btn btn-danger btn-sm" onclick="deleteEvent(${ev.id})">✕</button>
        </div>
      </div>
    </div>`).join('');
}

// ─── ACHIEVEMENTS ───
var ACHIEVEMENTS = [
  { id:'first_skill',   icon:'🎯', name:'First Step',         desc:'Add your first skill',                  check: s => s.skills.length >= 1 },
  { id:'skill5',        icon:'🧠', name:'Skill Collector',    desc:'Track 5 skills',                        check: s => s.skills.length >= 5 },
  { id:'skill10',       icon:'💡', name:'Knowledge Base',     desc:'Track 10 skills',                       check: s => s.skills.length >= 10 },
  { id:'expert_skill',  icon:'🏆', name:'Expert Status',      desc:'Get any skill to 100%',                 check: s => s.skills.some(x => x.progress >= 100) },
  { id:'task5',         icon:'✅', name:'Task Master',        desc:'Complete 5 tasks',                      check: s => s.tasks.filter(t=>t.done).length >= 5 },
  { id:'task20',        icon:'⚡', name:'Productivity Pro',   desc:'Complete 20 tasks',                     check: s => s.tasks.filter(t=>t.done).length >= 20 },
  { id:'first_cert',    icon:'📜', name:'Certified',          desc:'Complete a Certification resource',     check: s => (s.completedResources||[]).some(id => { const r=[...BUILTIN_RESOURCES,...s.resources].find(x=>String(x.id)===String(id)); return r&&r.type==='cert'; }) },
  { id:'xp500',         icon:'🔋', name:'XP Grinder',         desc:'Earn 500 XP',                          check: s => { let xp=0; s.skills.forEach(sk=>xp+=Math.floor(sk.progress/10)*20); s.tasks.forEach(t=>{ if(t.done) xp+=t.priority==='high'?50:t.priority==='medium'?30:15; }); s.resources.forEach(()=>xp+=5); (s.completedResources||[]).forEach(()=>xp+=50); (s.goals||[]).forEach(g=>{ if(g.done) xp+=100; }); return xp>=500; } },
  { id:'xp2000',        icon:'💎', name:'Diamond Hacker',     desc:'Earn 2000 XP',                         check: s => { let xp=0; s.skills.forEach(sk=>xp+=Math.floor(sk.progress/10)*20); s.tasks.forEach(t=>{ if(t.done) xp+=t.priority==='high'?50:t.priority==='medium'?30:15; }); s.resources.forEach(()=>xp+=5); (s.completedResources||[]).forEach(()=>xp+=50); (s.goals||[]).forEach(g=>{ if(g.done) xp+=100; }); return xp>=2000; } },
  { id:'first_goal',    icon:'🚀', name:'Goal Setter',        desc:'Add your first career goal',           check: s => (s.goals||[]).length >= 1 },
  { id:'goal_done',     icon:'🎖️', name:'Goal Crusher',       desc:'Complete a career goal',               check: s => (s.goals||[]).some(g=>g.done) },
  { id:'first_event',  icon:'📅', name:'Career Chronicler',  desc:'Log your first career event',          check: s => (s.events||[]).length >= 1 },
  { id:'events5',       icon:'🗺️', name:'Career Builder',     desc:'Log 5 career events',                  check: s => (s.events||[]).length >= 5 },
  { id:'timer1',        icon:'⏱️', name:'Focused',            desc:'Complete a study timer session',       check: s => (s.studySessions||0) >= 1 },
  { id:'timer10',       icon:'🔥', name:'Deep Work',          desc:'Complete 10 study sessions',           check: s => (s.studySessions||0) >= 10 },
  { id:'notes3',        icon:'📝', name:'Note Taker',         desc:'Write 3 notes',                        check: s => s.notes.length >= 3 },
  { id:'resources10',   icon:'📚', name:'Resource Hoarder',   desc:'Complete 10 resources',                check: s => (s.completedResources||[]).length >= 10 },
  { id:'all_cats',      icon:'🌐', name:'Full Spectrum',      desc:'Have a skill in every category',       check: s => { const cats=['Vulnerability Management','Network Security','Identity & Access Management','Application Security','Incident Response & Forensics','GRC / Compliance','Penetration Testing']; return cats.every(c=>s.skills.some(sk=>sk.cat===c)); } },
];

function checkAchievements() {
  let newUnlock = false;
  if (!state.unlockedAchievements) state.unlockedAchievements = [];
  ACHIEVEMENTS.forEach(a => {
    if (!state.unlockedAchievements.includes(a.id) && a.check(state)) {
      state.unlockedAchievements.push(a.id);
      newUnlock = true;
      setTimeout(() => showToast(`🏆 Achievement unlocked: ${a.name}!`), 500);
    }
  });
  if (newUnlock) save();
}

function renderAchievements() {
  const grid = document.getElementById('achievements-grid');
  if (!grid) return;
  if (!state.unlockedAchievements) state.unlockedAchievements = [];
  const unlocked = state.unlockedAchievements;
  const total = ACHIEVEMENTS.length;
  const done = unlocked.length;
  grid.innerHTML = `<div class="ach-progress-bar-wrap" style="margin-bottom:20px">
    <div style="display:flex;justify-content:space-between;margin-bottom:6px">
      <span style="font-size:12px;color:var(--text2)">Progress</span>
      <span style="font-size:12px;color:var(--accent)">${done} / ${total}</span>
    </div>
    <div class="xp-bar"><div class="xp-fill" style="width:${Math.round(done/total*100)}%"></div></div>
  </div>` +
  ACHIEVEMENTS.map(a => {
    const earned = unlocked.includes(a.id);
    return `<div class="ach-card ${earned?'earned':'locked'}">
      <div class="ach-icon">${a.icon}</div>
      <div class="ach-name">${a.name}</div>
      <div class="ach-desc">${a.desc}</div>
      ${earned?'<div class="ach-earned-badge">✓ Earned</div>':'<div class="ach-locked-badge">🔒 Locked</div>'}
    </div>`;
  }).join('');
}

// ─── DASHBOARD ───
function renderDashboard() {
  const xp = getXP();
  const lvl = getLevelInfo(xp);
  const done = state.tasks.filter(t => t.done).length;
  const total = state.tasks.length;

  document.getElementById('d-xp').textContent = xp;
  document.getElementById('d-skills').textContent = state.skills.length;
  document.getElementById('d-done').textContent = done;
  document.getElementById('d-task-sub').textContent = `of ${total} total`;
  document.getElementById('d-res').textContent = BUILTIN_RESOURCES.length + state.resources.length;

  document.getElementById('xp-level').textContent = lvl.level;
  document.getElementById('xp-rank').textContent = lvl.name;
  document.getElementById('xp-cur').textContent = xp;
  document.getElementById('xp-next').textContent = lvl.nextXP;
  document.getElementById('xp-fill').style.width = lvl.pct + '%';
  document.getElementById('xp-sub-text').textContent = `${lvl.nextXP - xp} XP to next level`;

  // dash skills
  const sg = document.getElementById('dash-skill-grid');
  if (!state.skills.length) {
    sg.innerHTML = '<div class="empty-state" style="grid-column:1/-1"><div class="icon">🎯</div><p>No skills yet — add them in the Skills tab</p></div>';
  } else {
    sg.innerHTML = state.skills.slice(0, 6).map(s => `
      <div class="skill-card" onclick="switchTab('skills')">
        <div class="skill-top">
          <div class="skill-name">${esc(s.name)}</div>
          <span class="skill-badge badge-${badgeClass(s.progress)}">${badgeLabel(s.progress)}</span>
        </div>
        <div class="skill-bar"><div class="skill-fill" style="width:${s.progress}%"></div></div>
        <div class="skill-meta"><span>${esc(s.cat)}</span><span>${s.progress}%</span></div>
      </div>
    `).join('');
  }

  // dash tasks (upcoming, not done)
  const dt = document.getElementById('dash-tasks');
  const pending = state.tasks.filter(t => !t.done).slice(0, 5);
  if (!pending.length) {
    dt.innerHTML = '<div class="empty-state"><div class="icon">🎉</div><p>All tasks complete!</p></div>';
  } else {
    const today = new Date().toISOString().split('T')[0];
    dt.innerHTML = pending.map(t => {
      const overdue = t.due && t.due < today;
      return `<div class="task-item">
        <div class="task-check" onclick="toggleTask(${t.id})"></div>
        <div class="task-name">${esc(t.name)}</div>
        ${t.skill ? `<span class="task-skill">${esc(t.skill)}</span>` : ''}
        <span class="task-priority priority-${t.priority}">${t.priority}</span>
        ${t.due ? `<span class="task-due ${overdue ? 'overdue' : ''}">${t.due}</span>` : ''}
      </div>`;
    }).join('');
  }

  setTimeout(drawRadar, 50);
  checkAchievements();
}

// ─── EXPORT / IMPORT ───
function exportData() {
  const data = JSON.stringify(state, null, 2);
  const blob = new Blob([data], {type:'application/json'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'cybersec-tracker-backup.json';
  a.click();
  showToast('Data exported!');
}

function importData(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const imported = JSON.parse(e.target.result);
      state = { ...state, ...imported };
      save();
      renderDashboard(); renderSkills(); renderTasks(); renderResources(); renderNotes();
      renderGoals(); renderTimeline(); renderAchievements();
      updateHeader();
      showToast('Data imported successfully!');
    } catch(err) {
      showToast('Error: invalid file');
    }
  };
  reader.readAsText(file);
  event.target.value = '';
}

// ─── INIT ───
window.addEventListener('DOMContentLoaded', () => {
  load();
  renderDashboard();
  renderResources();
  updateHeader();
});
