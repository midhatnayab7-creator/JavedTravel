// ===== PRELOADER =====
window.addEventListener('load', function () {
  const preloader = document.getElementById('preloader');
  if (preloader) setTimeout(() => preloader.classList.add('hidden'), 800);

  // Show welcome hook after preloader finishes
  const shown = sessionStorage.getItem('jtWelcomeShown');
  if (!shown) {
    setTimeout(function () {
      const overlay = document.getElementById('jt-welcome-overlay');
      if (overlay) overlay.style.display = 'flex';
    }, 1600);
    setTimeout(function () {
      const overlay = document.getElementById('jt-welcome-overlay');
      if (overlay && overlay.style.display !== 'none') jtCloseWelcome();
    }, 9600);
  }
});

// ===== STARS =====
const starsContainer = document.getElementById('stars');
if (starsContainer) {
  for (let i = 0; i < 120; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    const size = Math.random() * 2.5 + 0.5;
    star.style.cssText = `width:${size}px;height:${size}px;top:${Math.random()*100}%;left:${Math.random()*100}%;animation-delay:${Math.random()*3}s;animation-duration:${2+Math.random()*3}s;`;
    starsContainer.appendChild(star);
  }
}

// ===== NAVBAR SCROLL =====
window.addEventListener('scroll', function () {
  const navbar = document.getElementById('navbar');
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== WELCOME HOOK =====
function jtCloseWelcome() {
  const overlay = document.getElementById('jt-welcome-overlay');
  const box = document.getElementById('jt-welcome-box');
  if (!overlay || overlay.style.display === 'none') return;
  box.classList.add('jt-fade-out');
  setTimeout(function () {
    overlay.style.display = 'none';
    sessionStorage.setItem('jtWelcomeShown', 'true');
  }, 500);
}

// ===== AI CHAT — Powered by Zara (Real AI via Groq) =====
var jtChatHistory = [];
var jtAI_URL = 'http://localhost:5000/chat';
var jtAiOnline = true; // will be checked on first message

function jtToggleChat() {
  document.getElementById('jt-chat-panel').classList.toggle('open');
}

function jtAddMessage(text, role) {
  var msgs = document.getElementById('jt-chat-messages');
  var div = document.createElement('div');
  div.className = 'jt-msg ' + role;
  div.innerHTML = text;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
  return div;
}

function jtShowTyping() {
  var msgs = document.getElementById('jt-chat-messages');
  var div = document.createElement('div');
  div.className = 'jt-msg bot';
  div.id = 'jt-typing';
  div.innerHTML = '<span style="opacity:0.6;letter-spacing:2px">Zara is typing...</span>';
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function jtRemoveTyping() {
  var t = document.getElementById('jt-typing');
  if (t) t.remove();
}

async function jtAskAI(userMessage) {
  jtShowTyping();
  try {
    var res = await fetch(jtAI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage, history: jtChatHistory })
    });
    var data = await res.json();
    jtRemoveTyping();
    var reply = data.reply || 'Sorry, I had a small issue. Please try again!';
    jtChatHistory.push({ role: 'user', content: userMessage });
    jtChatHistory.push({ role: 'assistant', content: reply });
    jtAddMessage(reply, 'bot');
  } catch (e) {
    jtRemoveTyping();
    // Fallback if AI server is offline
    jtAddMessage('Our AI assistant is currently warming up. Please call us at <strong>0300-1234567</strong> or leave your number and we\'ll call you back! 📞', 'bot');
  }
}

function jtQuickReply(text) {
  document.getElementById('jt-quick-replies').style.display = 'none';
  jtAddMessage(text, 'user');
  jtAskAI(text);
}

function jtSendMsg() {
  var input = document.getElementById('jt-chat-input');
  var text = input.value.trim();
  if (!text) return;
  input.value = '';
  document.getElementById('jt-quick-replies').style.display = 'none';
  jtAddMessage(text, 'user');
  jtAskAI(text);
}


// ===== MANAGER MODAL =====
function jtOpenManager() {
  document.getElementById('jt-manager-modal').classList.add('open');
  document.getElementById('jt-modal-success').style.display = 'none';
  document.getElementById('jt-phone-input').value = '';
}

function jtCloseManager() {
  document.getElementById('jt-manager-modal').classList.remove('open');
}

function jtSubmitPhone() {
  var phone = document.getElementById('jt-phone-input').value.trim();
  if (!phone || phone.length < 8) {
    document.getElementById('jt-phone-input').style.borderColor = '#ff4444';
    return;
  }
  document.getElementById('jt-phone-input').style.borderColor = '';
  document.getElementById('jt-modal-success').style.display = 'block';
  setTimeout(function () { jtCloseManager(); }, 2500);
}

// ===== FLIGHT TIMETABLE FILTER =====
function ftFilter(btn, dest) {
  // Update active tab
  document.querySelectorAll('.ft-tab').forEach(function(t) { t.classList.remove('active'); });
  btn.classList.add('active');
  // Show/hide rows
  document.querySelectorAll('#ft-tbody tr').forEach(function(row) {
    if (dest === 'all' || row.getAttribute('data-dest') === dest) {
      row.classList.remove('ft-hidden');
    } else {
      row.classList.add('ft-hidden');
    }
  });
}
