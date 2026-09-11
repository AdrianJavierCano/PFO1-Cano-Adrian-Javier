// ==========================================================================
// ADRIAN JAVIER CANO // CYBER DEFENSE & REAL HACKING ENGINE
// ==========================================================================

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// --- 1. WEB AUDIO SYNTHESIZER (TACTICAL SOUND FX) ---
let audioCtx = null;
let audioEnabled = false;

function initAudio() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) audioCtx = new AudioContext();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

function playCyberBeep(freq = 800, type = 'sine', duration = 0.04, vol = 0.04) {
  if (!audioEnabled || !audioCtx) return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(vol, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {
    // Silently ignore audio errors
  }
}

function playBreachAlarm() {
  if (!audioEnabled || !audioCtx) return;
  playCyberBeep(450, 'sawtooth', 0.15, 0.08);
  setTimeout(() => playCyberBeep(350, 'sawtooth', 0.2, 0.08), 150);
}

const audioToggleBtn = document.getElementById('audioToggle');
const audioStatusText = document.getElementById('audioStatus');
if (audioToggleBtn) {
  audioToggleBtn.addEventListener('click', () => {
    initAudio();
    audioEnabled = !audioEnabled;
    audioStatusText.textContent = audioEnabled ? 'ON' : 'OFF';
    audioToggleBtn.classList.toggle('active', audioEnabled);
    if (audioEnabled) {
      playCyberBeep(1200, 'square', 0.08, 0.05);
      setTimeout(() => playCyberBeep(1800, 'sine', 0.1, 0.04), 80);
    }
  });
}

// --- 2. CUSTOM CYBERNETIC TACTICAL CURSOR HUD ---
const cyberCursor = document.getElementById('cyberCursor');
const cursorLabel = document.getElementById('cursorLabel');

let mouseX = -100, mouseY = -100;
let cursorX = -100, cursorY = -100;

if (cyberCursor && !reduceMotion) {
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cyberCursor.classList.add('active');
  });

  window.addEventListener('mouseleave', () => {
    cyberCursor.classList.remove('active');
  });

  function renderCursor() {
    cursorX += (mouseX - cursorX) * 0.35;
    cursorY += (mouseY - cursorY) * 0.35;
    cyberCursor.style.left = `${cursorX}px`;
    cyberCursor.style.top = `${cursorY}px`;
    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  window.addEventListener('mousedown', (e) => {
    cyberCursor.classList.add('clicking');
    playCyberBeep(1300, 'sawtooth', 0.03, 0.03);
    spawnClickSparks(e.clientX, e.clientY);
  });

  window.addEventListener('mouseup', () => {
    cyberCursor.classList.remove('clicking');
  });

  const targetSelectors = 'a, button, input, textarea, .cap, .case, .btn-cyber, .hud-btn, .channel, .nav-toggle, .btn-cipher-toggle, .privesc-close, [data-scramble]';

  document.addEventListener('mouseover', (e) => {
    const target = e.target.closest(targetSelectors);
    if (target) {
      cyberCursor.classList.add('locked');

      let labelText = 'TARGET_LOCK';
      if (target.id === 'btnLaunchPrivesc' || target.id === 'privescHudBtn') labelText = 'ROOT_EXPLOIT';
      else if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') labelText = 'INPUT_FIELD';
      else if (target.classList.contains('btn-cyber') || target.tagName === 'BUTTON') labelText = 'EXEC_ACTION';
      else if (target.classList.contains('case')) labelText = 'CLASSIFIED_OP';
      else if (target.classList.contains('cap')) labelText = 'CAPABILITY';
      else if (target.tagName === 'A') labelText = 'SEC_LINK';

      if (cursorLabel) cursorLabel.textContent = labelText;
      playCyberBeep(1500, 'triangle', 0.02, 0.015);
    }
  });

  document.addEventListener('mouseout', (e) => {
    const target = e.target.closest(targetSelectors);
    if (target) {
      cyberCursor.classList.remove('locked');
      if (cursorLabel) cursorLabel.textContent = 'TARGET_LOCK';
    }
  });
}

function spawnClickSparks(x, y) {
  if (reduceMotion) return;
  const sparkCount = 6;
  for (let i = 0; i < sparkCount; i++) {
    const spark = document.createElement('div');
    spark.className = 'cyber-spark';
    const angle = (Math.PI * 2 / sparkCount) * i + (Math.random() - 0.5);
    const distance = 25 + Math.random() * 30;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;
    const size = 3 + Math.random() * 3;
    const color = Math.random() > 0.5 ? '#00ff66' : '#00f0ff';

    spark.style.width = `${size}px`;
    spark.style.height = `${size}px`;
    spark.style.backgroundColor = color;
    spark.style.boxShadow = `0 0 8px ${color}`;
    spark.style.left = `${x}px`;
    spark.style.top = `${y}px`;
    spark.style.setProperty('--tx', `${tx}px`);
    spark.style.setProperty('--ty', `${ty}px`);

    document.body.appendChild(spark);
    setTimeout(() => spark.remove(), 600);
  }
}

// --- 3. 3D HOLOGRAPHIC TILT EFFECT ON CARDS ---
if (!reduceMotion) {
  const tiltElements = document.querySelectorAll('.case, .badge-card, .terminal');
  tiltElements.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });
}

// --- 4. SCROLL REVEAL OBSERVER ---
const revealItems = document.querySelectorAll('section, .skill-category, .case, .stat-box, .badge-card');
revealItems.forEach(el => el.classList.add('reveal-item'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
    }
  });
}, { threshold: 0.15 });

revealItems.forEach(el => revealObserver.observe(el));

// --- 5. TEXT DECRYPTION SCRAMBLE EFFECT ---
const scrambleChars = '0123456789ABCDEF!@#$%&*<>[]{}//_';
function scrambleText(element) {
  if (reduceMotion) return;
  const originalText = element.getAttribute('data-scramble') || element.innerText;
  let iteration = 0;
  clearInterval(element._scrambleInterval);

  element._scrambleInterval = setInterval(() => {
    element.innerText = originalText
      .split('')
      .map((letter, index) => {
        if (letter === ' ' || letter === '\n') return letter;
        if (index < iteration) return originalText[index];
        return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
      })
      .join('');

    if (iteration >= originalText.length) {
      clearInterval(element._scrambleInterval);
      element.innerText = originalText;
    }
    iteration += 1 / 2;
  }, 25);
}

document.querySelectorAll('[data-scramble]').forEach(el => {
  el.addEventListener('mouseenter', () => {
    playCyberBeep(1400, 'sine', 0.02, 0.02);
    scrambleText(el);
  });
});

// --- 6. DOSSIER BIO LIVE DECRYPTION MATRIX ENGINE ---
const bioParagraphs = document.querySelectorAll('.decrypt-bio-text');
const btnDecryptBio = document.getElementById('btnDecryptBio');
const cipherStatusIndicator = document.getElementById('cipherStatusIndicator');
let isDecrypting = false;

const rawBioHTML = [
  'Tecnólogo autodidacta y analista con mentalidad defensiva en el ecosistema informático. Apasionado por la convergencia entre la <strong>ciberseguridad ofensiva/defensiva</strong>, la ingeniería de <strong>sistemas multi-agente de IA</strong>, y los marcos normativos de <strong>derecho informático</strong>.',
  'Construyo herramientas de protección, auditoría y automatización inteligente. Mi enfoque une la práctica rigurosa en entornos de simulación táctica (Homelabs, TryHackMe, HackTheBox) con la formación académica en la carrera de <strong>Abogacía con orientación en Derecho Informático</strong> y la <strong>Tecnicatura en Desarrollo de Sistemas Web (Front End) en el IFTS29</strong>.',
  'Capacidad comprobada para diseñar sistemas resilientes ante amenazas modernas, orquestar flujos autónomos de IA con routing local determinístico y garantizar el cumplimiento normativo legal-técnico.'
];

function decryptBioSection() {
  if (isDecrypting || reduceMotion) return;
  isDecrypting = true;

  if (cipherStatusIndicator) {
    cipherStatusIndicator.innerHTML = '<span class="cipher-dot" style="background:var(--cyan);box-shadow:0 0 8px var(--cyan);"></span> <span>ESTADO: <strong style="color:var(--cyan)">DESCIFRANDO PAYLOAD AES-256...</strong></span>';
  }
  playCyberBeep(900, 'sine', 0.06, 0.04);

  bioParagraphs.forEach((p, pIndex) => {
    const rawText = p.getAttribute('data-original') || p.innerText;
    p.classList.add('ciphering');
    let step = 0;

    const interval = setInterval(() => {
      step += 3;
      p.innerText = rawText.split('').map((char, cIdx) => {
        if (char === ' ') return ' ';
        if (cIdx < step) return rawText[cIdx];
        return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
      }).join('');

      if (step % 9 === 0) playCyberBeep(1200 + Math.random() * 600, 'sine', 0.015, 0.01);

      if (step >= rawText.length) {
        clearInterval(interval);
        p.innerHTML = rawBioHTML[pIndex] || rawText;
        p.classList.remove('ciphering');

        if (pIndex === bioParagraphs.length - 1) {
          isDecrypting = false;
          if (cipherStatusIndicator) {
            cipherStatusIndicator.innerHTML = '<span class="cipher-dot" style="background:var(--green);box-shadow:0 0 8px var(--green);"></span> <span>ESTADO: <strong style="color:var(--green)">PAYLOAD_DESCIFRADO [AES-256-GCM]</strong></span>';
          }
          playCyberBeep(1600, 'sine', 0.08, 0.04);
        }
      }
    }, 20);
  });
}

if (btnDecryptBio) {
  btnDecryptBio.addEventListener('click', () => {
    decryptBioSection();
  });
}

const bioSectionEl = document.getElementById('sobre-mi');
if (bioSectionEl) {
  let bioDecryptedOnce = false;
  const bioObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !bioDecryptedOnce) {
        bioDecryptedOnce = true;
        setTimeout(decryptBioSection, 250);
      }
    });
  }, { threshold: 0.3 });
  bioObserver.observe(bioSectionEl);
}

// --- 7. LINUX PRIVILEGE ESCALATION EXPLOIT SIMULATION ENGINE ---
const privescModal = document.getElementById('privescModal');
const privescTerminalBody = document.getElementById('privescTerminalBody');
const hackedBanner = document.getElementById('hackedBanner');
const privescStatusText = document.getElementById('privescStatusText');
const btnLaunchPrivesc = document.getElementById('btnLaunchPrivesc');
const privescHudBtn = document.getElementById('privescHudBtn');
const closePrivescModal = document.getElementById('closePrivescModal');
const btnRestartPrivesc = document.getElementById('btnRestartPrivesc');
let lastFocusedElement = null;

const privescExploitSequence = [
  { text: 'adrian@victim-srv-01:~$ whoami && id', cls: 'prompt', delay: 350 },
  { text: 'uid=1000(adrian) gid=1000(adrian) groups=1000(adrian)', cls: 'out', delay: 400 },
  { text: 'adrian@victim-srv-01:~$ sudo -l', cls: 'prompt', delay: 450 },
  { text: 'Matching Defaults entries for adrian on victim-srv-01:\n    env_reset, mail_badpass, secure_path=/usr/local/sbin\\:/usr/local/bin\\:/usr/sbin\nUser adrian may run the following commands on victim-srv-01:\n    (ALL : ALL) NOPASSWD: /usr/bin/find, /usr/bin/pkexec', cls: 'out warn-highlight', delay: 600 },
  { text: 'adrian@victim-srv-01:~$ /usr/bin/find . -exec /bin/sh -p \\; -quit', cls: 'prompt', delay: 600 },
  { text: '[+] [EXPLOIT] Analizando permisos SUID y privilegios sudo...', cls: 'out sec-highlight', delay: 350 },
  { text: '[+] [EXPLOIT] Desbordando límites de proceso con Shellcode SUID...', cls: 'out sec-highlight', delay: 400 },
  { text: '[+] [EXPLOIT] Sobrescribiendo credenciales de proceso: CAP_SYS_ADMIN', cls: 'out sec-highlight', delay: 450 },
  { text: '[+] [EXPLOIT] Invocando shell interactiva de superusuario /bin/bash (euid=0)...', cls: 'out sec-highlight', delay: 500 },
  { text: '# whoami && id', cls: 'prompt', delay: 450 },
  { text: 'root\nuid=0(root) gid=0(root) groups=0(root)', cls: 'out danger-highlight', delay: 300 },
  { text: '>>> [!] ROOT PRIVILEGES ACQUIRED // KERNEL COMPROMISED [!] <<<', cls: 'out danger-highlight', delay: 200 }
];

let privescTimeout = null;

function openPrivescLab() {
  if (!privescModal) return;
  lastFocusedElement = document.activeElement;
  initAudio();
  privescModal.classList.add('active');
  privescModal.setAttribute('aria-hidden', 'false');
  closePrivescModal?.focus();
  runPrivescExploit();
}

function closePrivescLab() {
  if (!privescModal) return;
  privescModal.classList.remove('active');
  privescModal.setAttribute('aria-hidden', 'true');
  clearTimeout(privescTimeout);
  if (lastFocusedElement instanceof HTMLElement) lastFocusedElement.focus();
}

function runPrivescExploit() {
  if (!privescTerminalBody) return;
  clearTimeout(privescTimeout);
  privescTerminalBody.innerHTML = '';
  if (hackedBanner) hackedBanner.style.display = 'none';
  if (privescStatusText) privescStatusText.textContent = 'STATUS: EJECUTANDO EXPLOIT DE ESCALADA...';

  let stepIdx = 0;
  function executeNextStep() {
    if (stepIdx >= privescExploitSequence.length) {
      if (hackedBanner) hackedBanner.style.display = 'block';
      if (privescStatusText) privescStatusText.innerHTML = '<span style="color:var(--danger)">STATUS: 💀 SISTEMA COMPROMETIDO (ROOT #)</span>';
      playBreachAlarm();
      return;
    }

    const step = privescExploitSequence[stepIdx];
    const lineDiv = document.createElement('div');
    lineDiv.className = `line ${step.cls}`;
    lineDiv.textContent = step.text;
    privescTerminalBody.appendChild(lineDiv);
    privescTerminalBody.scrollTop = privescTerminalBody.scrollHeight;

    playCyberBeep(step.cls.includes('danger') ? 500 : 1000 + Math.random() * 400, 'sine', 0.02, 0.02);

    stepIdx++;
    privescTimeout = setTimeout(executeNextStep, step.delay);
  }

  executeNextStep();
}

if (btnLaunchPrivesc) btnLaunchPrivesc.addEventListener('click', openPrivescLab);
if (privescHudBtn) privescHudBtn.addEventListener('click', openPrivescLab);
if (closePrivescModal) closePrivescModal.addEventListener('click', closePrivescLab);
if (btnRestartPrivesc) btnRestartPrivesc.addEventListener('click', runPrivescExploit);

if (privescModal) {
  privescModal.addEventListener('click', (e) => {
    if (e.target === privescModal) closePrivescLab();
  });
}
window.addEventListener('keydown', (e) => {
  if (!privescModal?.classList.contains('active')) return;
  if (e.key === 'Escape') {
    closePrivescLab();
    return;
  }
  if (e.key === 'Tab') {
    const focusable = privescModal.querySelectorAll(
      'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});

// --- 8. INTERACTIVE CLI TERMINAL ENGINE ---
const typedBody = document.getElementById('typedBody');
const termCliInput = document.getElementById('termCliInput');

const bootLines = [
  { p: '$ sys_init --defense-mode', html: '<span class="prompt">$ sys_init --defense-mode</span>' },
  {
    p: '> [OK] Núcleo cargado. Operador: Adrian Javier Cano (SEC_OPS)',
    html: '<span class="out">> [OK] Núcleo cargado. Operador: <strong>Adrian Javier Cano</strong> <span class="sec-highlight">[SEC_OPS]</span></span>'
  },
  { p: '$ cat clearance_status.txt', html: '<span class="prompt">$ cat clearance_status.txt</span>' },
  {
    p: '> [ONLINE] Blue Team / Threat Intel · LangGraph & Ollama · Derecho Informático',
    html: '<span class="out">> [ONLINE] <span class="sec-highlight">Blue Team / Threat Intel</span> · <strong>LangGraph & Ollama</strong> · <strong>Derecho Informático</strong></span>'
  }
];

let bootLineIdx = 0, bootCharIdx = 0;
function typeBootSequence() {
  if (bootLineIdx >= bootLines.length) return;
  const current = bootLines[bootLineIdx];

  if (bootCharIdx === 0) {
    const div = document.createElement('div');
    div.className = 'line prompt';
    typedBody.appendChild(div);
  }

  const div = typedBody.lastElementChild;
  if (bootCharIdx < current.p.length) {
    div.textContent = current.p.slice(0, bootCharIdx + 1);
    bootCharIdx++;
    if (bootCharIdx % 3 === 0) playCyberBeep(900 + Math.random() * 400, 'sine', 0.015, 0.01);
    setTimeout(typeBootSequence, 20);
  } else {
    div.innerHTML = current.html;
    bootLineIdx++;
    bootCharIdx = 0;
    typedBody.scrollTop = typedBody.scrollHeight;
    setTimeout(typeBootSequence, 240);
  }
}

if (reduceMotion) {
  typedBody.innerHTML = bootLines.map(l => `<div class="line">${l.html}</div>`).join('');
} else {
  typeBootSequence();
}

const commandHistory = [];
let historyIndex = -1;

function printToTerminal(htmlContent) {
  const div = document.createElement('div');
  div.className = 'line';
  div.innerHTML = htmlContent;
  typedBody.appendChild(div);
  typedBody.scrollTop = typedBody.scrollHeight;
}

function escapeHTML(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }[character]));
}

function processCommand(rawCmd) {
  const cmd = rawCmd.trim().toLowerCase();
  printToTerminal(`<span class="prompt">adrian@sec-ops:~$ ${escapeHTML(rawCmd)}</span>`);

  if (!cmd) return;
  playCyberBeep(1100, 'triangle', 0.04, 0.04);

  switch (cmd) {
    case 'help':
      printToTerminal(`
<span class="out">COMANDOS DISPONIBLES //
  <strong>help</strong>        - Muestra esta lista de comandos
  <strong>whoami</strong>      - Identidad y autorización del operador
  <strong>privesc</strong>     - 💀 Ejecuta la simulación de escalada de privilegios Linux (Root Exploit)
  <strong>skills</strong>      - Despliega la matriz de capacidades
  <strong>projects</strong>    - Lista las operaciones y proyectos clasificados
  <strong>defense</strong>     - Telemetría del estado de seguridad
  <strong>dossier</strong>     - Desplaza a la sección Sobre Mí
  <strong>decrypt</strong>     - Descifra el expediente del dossier
  <strong>contact</strong>     - Acceso al canal de transmisión cifrada
  <strong>clear</strong>       - Limpia la pantalla de la terminal
  <strong>audio</strong>       - Alterna efectos sonoros tácticos
  <strong>matrix</strong>      - Alterna modo visual de radar/red
</span>`);
      break;

    case 'whoami':
      printToTerminal(`<span class="out">> OPERADOR: <strong>Adrian Javier Cano</strong> | ESPECIALIDAD: <strong>Ciberseguridad Defensiva & Sistemas de IA</strong> | JURISDICCIÓN: <strong>Argentina (Derecho Informático)</strong></span>`);
      break;

    case 'privesc':
    case 'hack':
    case 'root':
    case 'sudo':
    case 'exploit':
      printToTerminal(`<span class="out" style="color:var(--danger)">[💀] Lanzando simulación de escalada de privilegios Linux (Root Exploit)...</span>`);
      openPrivescLab();
      break;

    case 'skills':
    case 'capacidades':
      printToTerminal(`
<span class="out">> CAPACIDADES REGISTRADAS:
  [+] Ciberseguridad Defensiva (Blue Team, Hardening, SIEM, Parrot OS)
  [+] Arquitecturas IA Multi-Agente (LangGraph, Ollama, LanceDB, RAG)
  [+] Derecho Informático (Evidencia Digital, Habeas Data, Compliance)
  [+] Desarrollo Web Táctico (HTML5/CSS3/Vanilla JS, Node.js, TS)
</span>`);
      document.querySelector('#habilidades')?.scrollIntoView({ behavior: 'smooth' });
      break;

    case 'projects':
    case 'proyectos':
      printToTerminal(`
<span class="out">> EXPEDIENTES Y OPERACIONES:
  1. <strong>JARVIS Cyber</strong> [En desarrollo] - Asistente multi-agente de ciberseguridad
  2. <strong>Automaton+</strong> [En desarrollo] - Agente autónomo multi-LLM con routing
  3. <strong>Themis AI</strong> [Operativo] - Plataforma legal tech con RAG e InfoLeg
  4. <strong>Mendoza Integrity Monitor</strong> [Operativo] - Transparencia y estándares OCDE
</span>`);
      document.querySelector('#proyectos')?.scrollIntoView({ behavior: 'smooth' });
      break;

    case 'defense':
    case 'status':
      printToTerminal(`<span class="out">> [DEFENSE STATUS]: <span class="sec-highlight">ACTIVO</span> | FIREWALL: <span class="sec-highlight">ENFORCING</span> | DEFCON: <span class="warn-highlight">2</span> | ENCRYPTION: <strong style="color:var(--cyan)">AES-256-GCM</strong></span>`);
      break;

    case 'decrypt':
    case 'cipher':
      decryptBioSection();
      printToTerminal(`<span class="out">> Ejecutando rutina de descifrado criptográfico en Dossier...</span>`);
      document.querySelector('#sobre-mi')?.scrollIntoView({ behavior: 'smooth' });
      break;

    case 'dossier':
    case 'sobre-mi':
      printToTerminal(`<span class="out">> Navegando a Dossier de Perfil...</span>`);
      document.querySelector('#sobre-mi')?.scrollIntoView({ behavior: 'smooth' });
      break;

    case 'contact':
    case 'contacto':
      printToTerminal(`<span class="out">> Abriendo canal de transmisión segura...</span>`);
      document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' });
      break;

    case 'clear':
      typedBody.innerHTML = '';
      break;

    case 'audio':
      if (audioToggleBtn) audioToggleBtn.click();
      printToTerminal(`<span class="out">> Audio táctico: <strong>${audioEnabled ? 'ACTIVADO' : 'DESACTIVADO'}</strong></span>`);
      break;

    case 'matrix':
    case 'radar':
      toggleCanvasMode();
      printToTerminal(`<span class="out">> Modo de visualización cambiado a: <strong>${canvasMode}</strong></span>`);
      break;

    default:
      printToTerminal(`<span class="out" style="color:var(--danger)">[!] Comando no reconocido: '${escapeHTML(rawCmd)}'. Escribe '<strong>help</strong>' para consultar el manual.</span>`);
  }
}

if (termCliInput) {
  termCliInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = termCliInput.value;
      if (val.trim()) {
        commandHistory.push(val);
        historyIndex = commandHistory.length;
      }
      processCommand(val);
      termCliInput.value = '';
    } else if (e.key === 'ArrowUp') {
      if (historyIndex > 0) {
        historyIndex--;
        termCliInput.value = commandHistory[historyIndex] || '';
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        termCliInput.value = commandHistory[historyIndex] || '';
      } else {
        historyIndex = commandHistory.length;
        termCliInput.value = '';
      }
    }
  });
}

// --- 9. STATIC TACTICAL EXPLOIT MATRIX GRID (TERMINATING IN SYSTEM HACKED) ---
const canvas = document.getElementById('net');
const ctx = canvas ? canvas.getContext('2d') : null;
let w, h;
let canvasMouse = { x: -1000, y: -1000, active: false };
let radarAngle = 0;
let canvasMode = 'NET';
let animTime = 0;

const exploitCommandSteps = [
  'adrian@target-host:~$ whoami && id -> uid=1000(adrian) gid=1000(adrian)',
  'adrian@target-host:~$ sudo -l -> (ALL : ALL) NOPASSWD: /usr/bin/find, /usr/bin/pkexec',
  '[+] [RECON] Scanning SUID binaries: /usr/bin/find (4755 permissions found)',
  'adrian@target-host:~$ /usr/bin/find . -exec /bin/sh -p \\; -quit',
  '[+] [EXPLOIT] Analizando offsets de memoria: 0x7fffffffe420 -> [EIP OVERWRITE]',
  '[+] [SHELLCODE] Inyectando payload x86_64: 48 31 c0 50 48 bf 2f 62 69 6e 2f 2f 73 68',
  '[+] [KERNEL] Syscall sys_execve("/bin/sh", ["-p"], NULL) -> CAP_SYS_ADMIN',
  '[+] [AUTH] Sobrescribiendo credenciales de proceso: euid=0(root)',
  '# whoami && id -> uid=0(root) gid=0(root) groups=0(root)',
  '>>> [!] SYSTEM HACKED // ACCESS LEVEL: ROOT (uid=0) [!] <<<',
  '>>> [!] KERNEL COMPROMISED // PRIVILEGES ESCALATED [!] <<<',
  '>>> [!] ROOT SHELL ACQUIRED // 0x7ffd98b0 [!] <<<',
  'NMAP 192.168.1.105 [PORT 22/OPEN ssh] [PORT 443/OPEN https] [PORT 8080/OPEN]',
  'IPTABLES: DROP TCP 185.220.101.5:4444 -> 10.0.0.4:443 [FLAGS: SYN-ACK]',
  'REVERSE_SHELL: TCP CONNECTED 10.10.14.23:9001 <- 10.10.11.100:443',
  'AES_256_GCM_DECRYPT(CIPHERTEXT=0x9f84a1, IV=0x11e4) -> VALID_KEY',
  '0x00401140 <+0>: push rbp; mov rbp, rsp; sub rsp, 0x20; syscall',
  'WIRESHARK: TLSv1.3 Encrypted Handshake [JA3 Fingerprint: e7d705a]'
];

let gridLines = [];

function resizeCanvas() {
  if (!canvas) return;
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}

function initGridLines() {
  if (!w || !h) return;
  const rowHeight = 34;
  const rowCount = Math.floor(h / rowHeight) + 1;

  gridLines = Array.from({ length: rowCount }, (_, i) => {
    const isRootBanner = i % 4 === 3;
    return {
      baseY: i * rowHeight + 22,
      baseX: 20 + (i % 3) * 15,
      stepIndex: isRootBanner ? 9 + (i % 3) : i % exploitCommandSteps.length,
      currentText: '',
      charProgress: 0,
      typingSpeed: 0.4 + Math.random() * 0.6,
      opacity: isRootBanner ? 0.28 : 0.11 + Math.random() * 0.14,
      isRootBanner: isRootBanner,
      glitchCooldown: Math.floor(Math.random() * 80),
      driftPhase: Math.random() * Math.PI * 2
    };
  });
}

function drawHackingBackground() {
  if (!ctx || !w || !h) return;
  ctx.clearRect(0, 0, w, h);
  animTime += 0.015;

  // 1. Draw Static Living Exploit Grid with Wave & Glitch
  gridLines.forEach((row) => {
    // Breathing floating motion (NO falling)
    const waveY = row.baseY + Math.sin(animTime + row.driftPhase) * 3;
    const waveX = row.baseX + Math.cos(animTime * 0.8 + row.driftPhase) * 4;

    // Typewriter progressive decoding in place
    const fullText = exploitCommandSteps[row.stepIndex];
    if (row.charProgress < fullText.length) {
      row.charProgress += row.typingSpeed;
    } else {
      // Small chance to cycle to next exploit log or root status
      if (Math.random() < 0.003) {
        row.stepIndex = (row.stepIndex + 1) % exploitCommandSteps.length;
        row.isRootBanner = exploitCommandSteps[row.stepIndex].includes('SYSTEM HACKED') || exploitCommandSteps[row.stepIndex].includes('ROOT');
        row.charProgress = 0;
      }
    }

    const currentLen = Math.floor(row.charProgress);
    let displayText = fullText.slice(0, currentLen);

    // Random micro glitch in place
    if (Math.random() < 0.03) {
      displayText = displayText.replace(/[a-zA-Z0-9]/, scrambleChars[Math.floor(Math.random() * scrambleChars.length)]);
    }

    // Proximity effect to mouse
    let mouseBoost = 1;
    if (canvasMouse.active) {
      const dMouse = Math.hypot(waveX - canvasMouse.x, waveY - canvasMouse.y);
      if (dMouse < 160) {
        mouseBoost = 1 + (1 - dMouse / 160) * 1.5;
      }
    }

    const isHacked = row.isRootBanner || fullText.includes('SYSTEM HACKED') || fullText.includes('ROOT');

    ctx.font = isHacked ? "bold 11px 'JetBrains Mono', monospace" : "10px 'JetBrains Mono', monospace";
    ctx.fillStyle = isHacked
      ? `rgba(255, 0, 68, ${Math.min(1, row.opacity * 1.6 * mouseBoost)})`
      : `rgba(0, 255, 102, ${Math.min(0.8, row.opacity * mouseBoost)})`;

    if (isHacked) {
      ctx.shadowBlur = 8;
      ctx.shadowColor = 'rgba(255, 0, 68, 0.6)';
    }

    ctx.fillText(displayText, waveX, waveY);
    ctx.shadowBlur = 0;
  });

  // 2. Interactive Radar Sweep Mode if toggled
  if (canvasMode === 'RADAR') {
    const cx = w / 2;
    const cy = h / 2;
    const maxR = Math.max(w, h) * 0.6;

    for (let r = 80; r < maxR; r += 90) {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 255, 102, 0.05)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    radarAngle += 0.018;
    const sx = cx + Math.cos(radarAngle) * maxR;
    const sy = cy + Math.sin(radarAngle) * maxR;

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, maxR, radarAngle - 0.25, radarAngle);
    ctx.closePath();
    ctx.fillStyle = 'rgba(0, 255, 102, 0.03)';
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(sx, sy);
    ctx.strokeStyle = 'rgba(0, 255, 102, 0.35)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  // 3. Mouse Targeting Reticle
  if (canvasMouse.active) {
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(canvasMouse.x, canvasMouse.y, 22, 0, Math.PI * 2);
    ctx.stroke();

    ctx.font = "8px 'JetBrains Mono', monospace";
    ctx.fillStyle = 'rgba(0, 240, 255, 0.4)';
    ctx.fillText(`SYS_SCAN[${Math.floor(canvasMouse.x)},${Math.floor(canvasMouse.y)}]`, canvasMouse.x + 28, canvasMouse.y + 4);
  }

  requestAnimationFrame(drawHackingBackground);
}

if (canvas) {
  window.addEventListener('resize', () => {
    resizeCanvas();
    initGridLines();
  });
  window.addEventListener('mousemove', (e) => {
    canvasMouse.x = e.clientX;
    canvasMouse.y = e.clientY;
    canvasMouse.active = true;
  });
  window.addEventListener('mouseleave', () => {
    canvasMouse.active = false;
  });
  resizeCanvas();
  initGridLines();
  if (!reduceMotion) drawHackingBackground();
}

function toggleCanvasMode() {
  canvasMode = canvasMode === 'NET' ? 'RADAR' : 'NET';
  const statusEl = document.getElementById('canvasModeStatus');
  if (statusEl) statusEl.textContent = canvasMode;
}

const canvasModeBtn = document.getElementById('canvasModeToggle');
if (canvasModeBtn) {
  canvasModeBtn.addEventListener('click', () => {
    toggleCanvasMode();
    playCyberBeep(1300, 'sine', 0.05, 0.04);
  });
}

// --- 10. FOTO DE PERFIL / DOSSIER (GARANTIZADA SIEMPRE VISIBLE) ---
const profileImg = document.getElementById('profileImg');
const phLabel = document.getElementById('phLabel');
if (profileImg) {
  profileImg.style.display = 'block';
  if (phLabel) phLabel.style.display = 'none';

  profileImg.addEventListener('error', () => {
    // Si foto.jpg falla, prueba la alternativa en assets
    if (!profileImg.src.includes('WhatsApp')) {
      profileImg.src = 'assets/WhatsApp Image 2026-08-28 at 21.17.30.jpeg';
      profileImg.style.display = 'block';
      if (phLabel) phLabel.style.display = 'none';
    } else {
      profileImg.style.display = 'none';
      if (phLabel) phLabel.style.display = 'block';
    }
  });
}

// --- 11. MOBILE NAVIGATION ---
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    playCyberBeep(950, 'triangle', 0.03, 0.03);
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// --- 12. ENCRYPTED COMMS CONTACT FORM ---
const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
const submitBtn = document.getElementById('submitBtn');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.reportValidity()) {
      const invalidField = form.querySelector(':invalid');
      invalidField?.focus();
      formNote.textContent = '[!] Revisá los campos marcados y completá la información requerida.';
      formNote.style.color = 'var(--danger)';
      playCyberBeep(400, 'sawtooth', 0.1, 0.05);
      return;
    }

    const name = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('mensaje').value.trim();
    const subject = encodeURIComponent(`Consulta desde el portfolio de ${name}`);
    const body = encodeURIComponent(`Nombre: ${name}\nEmail: ${email}\n\n${message}`);

    formNote.style.color = 'var(--cyan)';
    formNote.textContent = '> Preparando el mensaje en tu cliente de correo…';
    if (submitBtn) submitBtn.disabled = true;
    playCyberBeep(900, 'sine', 0.05, 0.03);

    setTimeout(() => {
      window.location.href = `mailto:canoadrianjavier@gmail.com?subject=${subject}&body=${body}`;
      formNote.style.color = 'var(--green)';
      formNote.textContent = '[✓] Se abrió tu cliente de correo. Revisá el mensaje antes de enviarlo.';
      playCyberBeep(1200, 'sine', 0.04, 0.03);
      if (submitBtn) submitBtn.disabled = false;
    }, 250);
  });
}
