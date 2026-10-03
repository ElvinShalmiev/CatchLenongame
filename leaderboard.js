import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js';
import { getAuth, onAuthStateChanged, signInAnonymously } from 'https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js';
import { collection, doc, getDocs, getFirestore, serverTimestamp, setDoc } from 'https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: 'AIzaSyCZ1cJjilrV5m6EWQCDrbMw27SvoavfZdc',
  authDomain: 'catchmegame-b5bde.firebaseapp.com',
  projectId: 'catchmegame-b5bde',
  storageBucket: 'catchmegame-b5bde.firebasestorage.app',
  messagingSenderId: '1076428254062',
  appId: '1:1076428254062:web:a21134817eef6c7b572f7f'
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const NAME_KEY = 'catch-lennon-player-name';
let playerName = (localStorage.getItem(NAME_KEY) || '').trim();
let currentUser = null;

const escapeHtml = value => String(value).replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
const cleanName = value => value.trim().replace(/\s+/g,' ').slice(0,24);

document.body.insertAdjacentHTML('beforeend', `
  <button class="leaderboard-trigger" type="button" aria-label="Open leaderboard">🏆 TOP 10</button>
  <div class="player-overlay" id="name-gate" hidden>
    <section class="player-card" role="dialog" aria-modal="true" aria-labelledby="name-title">
      <h2 id="name-title">WHO ARE YOU?</h2>
      <p>Enter your name · Введи имя · כתבו את השם</p>
      <form class="player-name-form" id="player-name-form">
        <input class="player-name-input" id="player-name-input" maxlength="24" autocomplete="nickname" placeholder="Your name" required>
        <p class="player-error" id="player-name-error" role="alert"></p>
        <button class="primary-button" type="submit">LET'S PLAY</button>
      </form>
    </section>
  </div>
  <div class="player-overlay" id="leaderboard-modal" hidden>
    <section class="player-card leaderboard-card" role="dialog" aria-modal="true" aria-labelledby="leaderboard-title">
      <div class="leaderboard-head"><h2 id="leaderboard-title">🏆 TOP 10</h2><button class="modal-close" type="button" aria-label="Close">×</button></div>
      <p class="leaderboard-status" id="leaderboard-status">Loading…</p>
      <ol class="leaderboard-list" id="leaderboard-list"></ol>
      <p class="leaderboard-you" id="leaderboard-you"></p>
      <button class="change-name" id="change-name" type="button">Change name · Сменить имя · שינוי שם</button>
    </section>
  </div>`);

const gate = document.getElementById('name-gate');
const modal = document.getElementById('leaderboard-modal');
const nameInput = document.getElementById('player-name-input');
const nameError = document.getElementById('player-name-error');
const list = document.getElementById('leaderboard-list');
const status = document.getElementById('leaderboard-status');
const you = document.getElementById('leaderboard-you');

function openNameGate() {
  gate.hidden = false;
  nameInput.value = playerName;
  setTimeout(() => nameInput.focus(), 0);
}

document.getElementById('player-name-form').addEventListener('submit', event => {
  event.preventDefault();
  const nextName = cleanName(nameInput.value);
  if (nextName.length < 2) { nameError.textContent = 'Please enter at least 2 characters.'; return; }
  playerName = nextName;
  localStorage.setItem(NAME_KEY, playerName);
  nameError.textContent = '';
  gate.hidden = true;
  window.gtag?.('event','player_named');
});

async function loadLeaderboard() {
  modal.hidden = false; status.hidden = false; status.textContent = 'Loading…'; list.replaceChildren(); you.textContent = '';
  try {
    if (!currentUser) await ensureAuth();
    const snapshot = await getDocs(collection(db,'scores'));
    const scores = snapshot.docs.map(item => item.data()).sort((a,b) => a.attempts-b.attempts || a.durationSeconds-b.durationSeconds).slice(0,10);
    status.hidden = scores.length > 0;
    if (!scores.length) status.textContent = 'Be the first player on the board!';
    scores.forEach((score,index) => {
      const row = document.createElement('li');
      row.className = `leaderboard-row${score.uid===currentUser?.uid?' is-me':''}`;
      const medal = ['🥇','🥈','🥉'][index] || `#${index+1}`;
      row.innerHTML = `<span class="leaderboard-rank">${medal}</span><span class="leaderboard-name">${escapeHtml(score.name)}</span><span class="leaderboard-score">${score.attempts} taps · ${score.durationSeconds}s</span>`;
      list.append(row);
    });
    const mine = snapshot.docs.map(item=>item.data()).find(score=>score.uid===currentUser?.uid);
    if (mine) { const all=snapshot.docs.map(item=>item.data()).sort((a,b)=>a.attempts-b.attempts||a.durationSeconds-b.durationSeconds);you.textContent=`You are #${all.findIndex(score=>score.uid===currentUser.uid)+1} of ${all.length}`; }
  } catch (error) { status.hidden=false;status.textContent='Leaderboard is temporarily unavailable.';console.error(error); }
}

async function ensureAuth() {
  if (currentUser) return currentUser;
  const credential = await signInAnonymously(auth);
  currentUser = credential.user;
  return currentUser;
}

async function saveBestScore(result) {
  if (!playerName) return;
  try {
    const user = await ensureAuth();
    await setDoc(doc(db,'scores',user.uid),{
      uid:user.uid,name:playerName,attempts:result.attempts,durationSeconds:result.durationSeconds,
      language:result.language,updatedAt:serverTimestamp()
    },{merge:false});
    window.gtag?.('event','leaderboard_score_saved',{attempts:result.attempts,duration_seconds:result.durationSeconds});
  } catch (error) {
    if (error?.code !== 'permission-denied') console.error(error);
  }
}

onAuthStateChanged(auth,user=>{currentUser=user;});
document.querySelector('.leaderboard-trigger').addEventListener('click',loadLeaderboard);
document.querySelector('.modal-close').addEventListener('click',()=>{modal.hidden=true;});
modal.addEventListener('click',event=>{if(event.target===modal)modal.hidden=true;});
document.getElementById('change-name').addEventListener('click',()=>{modal.hidden=true;openNameGate();});
window.addEventListener('lennon:caught',event=>saveBestScore(event.detail));

if (!playerName) openNameGate();
ensureAuth().catch(console.error);
