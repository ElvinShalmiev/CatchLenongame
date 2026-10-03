import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js';
import { getAuth, onAuthStateChanged, signInAnonymously } from 'https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js';
import { collection, doc, getDoc, getDocs, getFirestore, serverTimestamp, setDoc } from 'https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js';

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
const PROGRESS_KEY = 'catch-lennon-secret-progress';
const PHOTOS_KEY = 'catch-lennon-secret-photos';
const TEASER_KEY = 'catch-lennon-secret-teaser-seen';
const COMMUNITY_KEY = 'catch-lennon-community-invite-seen';
const WHATSAPP_COMMUNITY_URL = 'https://chat.whatsapp.com/FokVbvCQX8g1jfteCbklnn';
let playerName = (localStorage.getItem(NAME_KEY) || '').trim();
let currentUser = null;
let progress = readProgress();

const escapeHtml = value => String(value).replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
const cleanName = value => value.trim().replace(/\s+/g,' ').slice(0,24);

document.body.insertAdjacentHTML('beforeend', `
  <button class="secret-trigger" type="button" aria-label="Secret bonus progress"><span aria-hidden="true">🎁</span> <strong id="secret-progress">${progress.wins}/50</strong></button>
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
  </div>
  <div class="player-overlay" id="secret-message" hidden>
    <section class="player-card secret-card" role="dialog" aria-modal="true" aria-labelledby="secret-message-title">
      <div class="secret-gift" aria-hidden="true">?</div><h2 id="secret-message-title">A SECRET IS WAITING</h2>
      <p id="secret-message-copy">Catch Lennon 50 times to unlock a one-time surprise round.</p>
      <strong class="secret-count" id="secret-message-count">${progress.wins} / 50</strong>
      <button class="primary-button secret-close" type="button">KEEP PLAYING</button>
    </section>
  </div>
  <div class="player-overlay" id="secret-setup" hidden>
    <section class="player-card secret-card setup-card" role="dialog" aria-modal="true" aria-labelledby="secret-setup-title">
      <div class="secret-gift unlocked" aria-hidden="true">★</div><h2 id="secret-setup-title">CREATE YOUR SURPRISE</h2>
      <p>Name a pet or person and choose up to 5 photos. Photos stay only on this device.</p>
      <form id="secret-form" class="player-name-form">
        <input id="secret-name" class="player-name-input" maxlength="24" placeholder="Pet or person's name" required>
        <label class="photo-picker" for="secret-photos"><span>ADD PHOTOS</span><small>1–5 JPG, PNG or WEBP</small></label>
        <input id="secret-photos" class="visually-hidden" type="file" accept="image/jpeg,image/png,image/webp" multiple required>
        <div id="secret-previews" class="secret-previews"></div><p id="secret-error" class="player-error" role="alert"></p>
        <button class="primary-button" type="submit">START SECRET ROUND</button>
      </form>
    </section>
  </div>
  <div class="player-overlay" id="community-modal" hidden>
    <section class="player-card secret-card" role="dialog" aria-modal="true" aria-labelledby="community-title">
      <div class="community-mark" aria-hidden="true">WA</div><h2 id="community-title">JOIN THE COMMUNITY</h2>
      <p>You caught Lennon! Join the WhatsApp community for updates and new surprises.</p>
      <a id="community-link" class="primary-button community-link" target="_blank" rel="noopener noreferrer">JOIN WHATSAPP</a>
      <button class="change-name community-later" type="button">Maybe later</button>
    </section>
  </div>`);

const gate = document.getElementById('name-gate');
const modal = document.getElementById('leaderboard-modal');
const nameInput = document.getElementById('player-name-input');
const nameError = document.getElementById('player-name-error');
const list = document.getElementById('leaderboard-list');
const status = document.getElementById('leaderboard-status');
const you = document.getElementById('leaderboard-you');
const secretMessage = document.getElementById('secret-message');
const secretSetup = document.getElementById('secret-setup');
const communityModal = document.getElementById('community-modal');

function readProgress() { try { const saved=JSON.parse(localStorage.getItem(PROGRESS_KEY));return {wins:Math.min(50,Math.max(0,Number(saved?.wins)||0)),cycles:Math.max(0,Number(saved?.cycles)||0),unlocked:Boolean(saved?.unlocked)}; } catch { return {wins:0,cycles:0,unlocked:false}; } }
function renderProgress() { document.getElementById('secret-progress').textContent=`${progress.wins}/50`;document.getElementById('secret-message-count').textContent=`${progress.wins} / 50`;document.querySelector('.secret-trigger').classList.toggle('is-unlocked',progress.unlocked);localStorage.setItem(PROGRESS_KEY,JSON.stringify(progress)); }
async function saveProgress() { renderProgress();try { const user=await ensureAuth();await setDoc(doc(db,'progress',user.uid),{uid:user.uid,wins:progress.wins,cycles:progress.cycles,unlocked:progress.unlocked,updatedAt:serverTimestamp()},{merge:false}); } catch(error) { if(error?.code!=='permission-denied')console.error(error); } }
async function loadProgress() { try { const user=await ensureAuth();const snapshot=await getDoc(doc(db,'progress',user.uid));if(snapshot.exists()){const remote=snapshot.data();progress={wins:Math.min(50,Math.max(progress.wins,Number(remote.wins)||0)),cycles:Math.max(progress.cycles,Number(remote.cycles)||0),unlocked:progress.unlocked||Boolean(remote.unlocked)};}renderProgress(); } catch(error){console.error(error);} }

function openSecretMessage(copy) { if(copy)document.getElementById('secret-message-copy').textContent=copy;renderProgress();secretMessage.hidden=false; }
function openCommunityInvite() { localStorage.setItem(COMMUNITY_KEY,'1');const link=document.getElementById('community-link');if(WHATSAPP_COMMUNITY_URL){link.href=WHATSAPP_COMMUNITY_URL;link.removeAttribute('aria-disabled');}else{link.removeAttribute('href');link.setAttribute('aria-disabled','true');link.textContent='LINK COMING SOON';}communityModal.hidden=false; }
function loadStoredPhotos(){try{return JSON.parse(localStorage.getItem(PHOTOS_KEY))||[];}catch{return [];}}
function resizePhoto(file){return new Promise((resolve,reject)=>{const reader=new FileReader();reader.onerror=()=>reject(new Error('read'));reader.onload=()=>{const image=new Image();image.onerror=()=>reject(new Error('image'));image.onload=()=>{const max=640,scale=Math.min(1,max/Math.max(image.width,image.height)),canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(image.width*scale));canvas.height=Math.max(1,Math.round(image.height*scale));canvas.getContext('2d').drawImage(image,0,0,canvas.width,canvas.height);resolve(canvas.toDataURL('image/webp',.8));};image.src=reader.result;};reader.readAsDataURL(file);});}
function renderPhotoPreviews(photos){const box=document.getElementById('secret-previews');box.replaceChildren();photos.forEach(src=>{const img=document.createElement('img');img.src=src;img.alt='Selected character';box.append(img);});}

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

window.addEventListener('lennon:escaped',()=>{
  if(localStorage.getItem(TEASER_KEY))return;
  localStorage.setItem(TEASER_KEY,'1');
  setTimeout(()=>openSecretMessage('Win 50 rounds to create your own character and unlock a one-time surprise hunt.'),350);
});

window.addEventListener('lennon:caught',async()=>{
  progress.wins=Math.min(50,progress.wins+1);
  progress.unlocked=progress.wins>=50;
  await saveProgress();
  if(progress.unlocked)setTimeout(()=>{secretSetup.hidden=false;renderPhotoPreviews(loadStoredPhotos());},5300);
  else if(progress.wins===1 && !localStorage.getItem(COMMUNITY_KEY))setTimeout(openCommunityInvite,5300);
});

window.addEventListener('lennon:special-caught',async()=>{
  progress={wins:0,cycles:progress.cycles+1,unlocked:false};
  localStorage.removeItem(PHOTOS_KEY);
  await saveProgress();
});

document.querySelector('.secret-trigger').addEventListener('click',()=>{
  if(progress.unlocked){secretSetup.hidden=false;renderPhotoPreviews(loadStoredPhotos());}
  else openSecretMessage();
});
document.querySelector('.secret-close').addEventListener('click',()=>{secretMessage.hidden=true;});
secretMessage.addEventListener('click',event=>{if(event.target===secretMessage)secretMessage.hidden=true;});
document.querySelector('.community-later').addEventListener('click',()=>{communityModal.hidden=true;});
communityModal.addEventListener('click',event=>{if(event.target===communityModal)communityModal.hidden=true;});

document.getElementById('secret-photos').addEventListener('change',async event=>{
  const error=document.getElementById('secret-error');error.textContent='';
  const files=[...event.target.files].slice(0,5);
  try { const photos=await Promise.all(files.map(resizePhoto));localStorage.setItem(PHOTOS_KEY,JSON.stringify(photos));renderPhotoPreviews(photos); }
  catch { error.textContent='One of the photos could not be opened. Try another photo.'; }
});
document.getElementById('secret-form').addEventListener('submit',event=>{
  event.preventDefault();const name=cleanName(document.getElementById('secret-name').value),photos=loadStoredPhotos(),error=document.getElementById('secret-error');
  if(name.length<2){error.textContent='Enter at least 2 characters.';return;}
  if(!photos.length){error.textContent='Choose at least one photo.';return;}
  if(!progress.unlocked){error.textContent='This surprise unlocks after 50 wins.';return;}
  error.textContent='';secretSetup.hidden=true;
  if(!window.startLennonSecretRound({name,photos})){error.textContent='Could not start the round. Refresh and try again.';secretSetup.hidden=false;return;}
  window.gtag?.('event','secret_round_started',{photo_count:photos.length,cycle:progress.cycles+1});
});

if (!playerName) openNameGate();
ensureAuth().then(loadProgress).catch(console.error);
renderProgress();
