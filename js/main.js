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
var jtAI_URL = '/api/chat';
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

  // Auto-send callback request to manager via WhatsApp
  var msg = '📞 *Javed Travel — Callback Request*\n\nA customer has requested a callback.\n*Their Number:* ' + phone + '\n\nPlease call them as soon as possible. ✈️';
  window.open('https://wa.me/9203181132286?text=' + encodeURIComponent(msg), '_blank');

  setTimeout(function () { jtCloseManager(); }, 2500);
}

// ===== FLIGHT BOOKING =====
function bfSetTrip(type) {
  var returnField = document.getElementById('bf-return-field');
  if (type === 'return') {
    returnField.style.display = 'block';
  } else {
    returnField.style.display = 'none';
  }
}

function bfSubmit() {
  var name = document.getElementById('bf-name').value.trim();
  var cnic = document.getElementById('bf-cnic').value.trim();
  var phone = document.getElementById('bf-phone').value.trim();
  var email = document.getElementById('bf-email').value.trim();
  var from = document.getElementById('bf-from').value;
  var to = document.getElementById('bf-to').value;
  var airline = document.getElementById('bf-airline').value;
  var cls = document.getElementById('bf-class').value;
  var depart = document.getElementById('bf-depart').value;
  var returnDate = document.getElementById('bf-return-date').value;
  var passengers = document.getElementById('bf-passengers').value;
  var time = document.getElementById('bf-time').value;
  var notes = document.getElementById('bf-notes').value.trim();
  var tripType = document.querySelector('input[name="tripType"]:checked').value;

  if (!name)  { alert('Please enter your full name.'); return; }
  if (!cnic)  { alert('Please enter your CNIC number.'); return; }
  if (!phone || phone.length < 8) { alert('Please enter a valid phone number.'); return; }
  if (!from)  { alert('Please select departure city.'); return; }
  if (!to)    { alert('Please select arrival city.'); return; }
  if (!depart){ alert('Please select a departure date.'); return; }

  var msg = '✈️ *JAVED TRAVEL — Flight Booking Request*\n\n' +
    '*Trip Type:* ' + tripType + '\n' +
    '*Name:* ' + name + '\n' +
    '*CNIC:* ' + cnic + '\n' +
    '*Phone:* ' + phone + '\n' +
    (email ? '*Email:* ' + email + '\n' : '') +
    '*From:* ' + from + '\n' +
    '*To:* ' + to + '\n' +
    '*Airline:* ' + (airline || 'Any') + '\n' +
    '*Class:* ' + cls + '\n' +
    '*Departure:* ' + depart + '\n' +
    (returnDate ? '*Return:* ' + returnDate + '\n' : '') +
    '*Passengers:* ' + passengers + '\n' +
    '*Preferred Time:* ' + time + '\n' +
    (notes ? '*Notes:* ' + notes : '');

  var waURL = 'https://wa.me/9203181132286?text=' + encodeURIComponent(msg);

  // Auto-open WhatsApp with booking details
  window.open(waURL, '_blank');

  // Update the "Also WhatsApp" link in success message
  document.getElementById('bf-wa-link').href = waURL;

  // Show success, hide form
  document.getElementById('bf-success').style.display = 'block';
  document.getElementById('bf-success').scrollIntoView({ behavior: 'smooth' });
  document.querySelector('.bf-form-grid').style.display = 'none';
  document.querySelector('.bf-submit-row').style.display = 'none';
  document.querySelector('.bf-full').style.display = 'none';
  document.querySelector('.bf-trip-toggle').style.display = 'none';
}

// ===== MOBILE NAV =====
function jtToggleNav() {
  document.getElementById('nav-links').classList.toggle('open');
}
function jtCloseNav() {
  document.getElementById('nav-links').classList.remove('open');
}

// ===== ANIMATED COUNTERS =====
var jtCounterDone = false;
var jtStatsBar = document.querySelector('.jt-stats-bar');
if (jtStatsBar) {
  var jtCounterObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting && !jtCounterDone) {
        jtCounterDone = true;
        document.querySelectorAll('.jt-counter').forEach(function(el) {
          var target = parseInt(el.getAttribute('data-target'));
          var start = 0;
          var step = target / 80;
          var timer = setInterval(function() {
            start += step;
            if (start >= target) { start = target; clearInterval(timer); }
            el.textContent = Math.floor(start);
          }, 20);
        });
      }
    });
  }, { threshold: 0.3 });
  jtCounterObserver.observe(jtStatsBar);
}

// ===== CONTACT FORM =====
function cfSubmit() {
  var name    = document.getElementById('cf-name').value.trim();
  var phone   = document.getElementById('cf-phone').value.trim();
  var email   = document.getElementById('cf-email').value.trim();
  var subject = document.getElementById('cf-subject').value;
  var message = document.getElementById('cf-message').value.trim();

  if (!name)    { alert('Please enter your name.'); return; }
  if (!phone || phone.length < 8) { alert('Please enter a valid phone number.'); return; }
  if (!subject) { alert('Please select a subject.'); return; }
  if (!message) { alert('Please write your message.'); return; }

  var msg = '✈️ *Javed Travel — Contact Form*\n\n' +
    '*Name:* ' + name + '\n' +
    '*Phone:* ' + phone + '\n' +
    (email ? '*Email:* ' + email + '\n' : '') +
    '*Subject:* ' + subject + '\n' +
    '*Message:* ' + message;

  window.open('https://wa.me/9203181132286?text=' + encodeURIComponent(msg), '_blank');
  document.getElementById('cf-form-body').style.display = 'none';
  document.getElementById('cf-success').style.display = 'block';
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
