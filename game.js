(() => {
  'use strict';
  const MEDIA = window.LENNON_MEDIA;
  const COPY = {
    he: {
      title: 'תפסו את לנון!', brandSub: 'אמן הבריחות', tools: 'הגדרות המשחק', home: 'לעמוד הפתיחה', language: 'החלפת שפה', soundOn: 'מוזיקה', soundOff: 'שקט', enableSound: 'הפעלת מוזיקה', disableSound: 'השתקת מוזיקה',
      introKicker: 'כלב אחד. אפס כוונות להיתפס.', introTitle: 'תפסו אותי!!!!', introBubble: 'נראה אתכם.', start: 'תפסו אותי!!!!', instructions: 'מצאו את לנון בתמונה ולחצו עליו.',
      onTheLoose: 'לנון שוב ברח', findHim: 'איפה אני?', attempts: 'ניסיונות', time: 'זמן', loading: 'לנון בוחר מקום להתחבא…', arena: 'מצאו את לנון בתמונה', catchDog: 'לתפוס את לנון', playHint: 'לחצו על לנון. הוא כבר ימצא לאן לברוח.',
      taunts: ['נסה שוב חחח', 'כמעט. כמעט!', 'אופס, אני פה!', 'לא היום!', 'מה, כבר התעייפתם?', 'טוב, עכשיו באמת. חחח'],
      caughtKicker: 'רגע… מה?!', caughtTitle: 'תפסתם אותי!', caughtQuote: 'אני לא כועס. אני ממש כועס.', coolingDown: 'תנו לי להירגע רגע', countdownAnnouncement: 'בעוד חמש שניות נעבור למסך המשחק החוזר.',
      replayKicker: 'טוב, הפעם הצלחתם.', replayTitle: 'נסה שוב?', replayButton: 'עוד סיבוב!', replayHint: 'מקום אחר. אותו לנון.', result: (n, t) => `${n} ניסיונות · ${t} שניות · לנון דורש משחק חוזר.`,
      footer: 'כלב טוב. קצת פחות ממושמע.', credits: 'קרדיטים לתמונות ולגופנים', previewNote: 'מהדורה ראשונה · תמונות מקוריות של לנון', imageMissing: 'התמונה לא נטענה. אפשר להמשיך לשחק על הרקע הפשוט.', photo: 'צילום',
      places: {dogpark:'פארק כלבים', park:'בפארק', playground:'גינת משחקים', stadium:'מגרש ספורט', florentin:'פלורנטין, תל אביב'},
      alt: {portrait:'לנון', angry:'לנון כועס אחרי שנתפס', replay:'לנון מוכן לעוד סיבוב'}, pendingPhoto:'תמונה בהמשך'
    },
    ru: {
      title: 'Поймай Леннона!', brandSub: 'Мастер побегов', tools: 'Настройки игры', home: 'На стартовый экран', language: 'Выбрать язык', soundOn: 'Музыка', soundOff: 'Тихо', enableSound: 'Включить музыку', disableSound: 'Выключить музыку',
      introKicker: 'Один пёс. Ноль планов сдаваться.', introTitle: 'Поймай меня!!!!', introBubble: 'Ну, попробуй.', start: 'Поймай меня!!!!', instructions: 'Найди Леннона на фото и нажми на него.',
      onTheLoose: 'Леннон опять сбежал', findHim: 'Где я?', attempts: 'Попытки', time: 'Время', loading: 'Леннон выбирает укрытие…', arena: 'Найди Леннона на фотографии', catchDog: 'Поймать Леннона', playHint: 'Нажми на Леннона. Он найдёт, куда сбежать.',
      taunts: ['Ещё раз, ха-ха!', 'Почти. Почти!', 'Ой, я уже тут!', 'Не сегодня!', 'Уже устал?', 'Ну всё, теперь точно. Ха-ха!'],
      caughtKicker: 'Стоп… что?!', caughtTitle: 'Ты меня поймал!', caughtQuote: 'Я не злюсь. Я очень злюсь.', coolingDown: 'Дай мне остыть', countdownAnnouncement: 'Через пять секунд появится экран новой игры.',
      replayKicker: 'Ладно, в этот раз получилось.', replayTitle: 'Ещё раз?', replayButton: 'Ещё раунд!', replayHint: 'Новое место. Тот же Леннон.', result: (n, t) => `${n} ${pluralRu(n, ['попытка','попытки','попыток'])} · ${t} с · Леннон требует реванш.`,
      footer: 'Хороший пёс. Почти послушный.', credits: 'Фото и шрифты', previewNote: 'Первая версия · оригинальные фото Леннона', imageMissing: 'Фото не загрузилось. Можно играть на простом фоне.', photo: 'Фото',
      places: {dogpark:'Собачья площадка', park:'В парке', playground:'Детская площадка', stadium:'Спортивное поле', florentin:'Флорентин, Тель-Авив'},
      alt: {portrait:'Леннон', angry:'Сердитый Леннон после поимки', replay:'Леннон готов к новому раунду'}, pendingPhoto:'ФОТО ПОЗЖЕ'
    },
    en: {
      title: 'Catch Lennon!', brandSub: 'Escape artist', tools: 'Game settings', home: 'Back to the start', language: 'Choose a language', soundOn: 'Music', soundOff: 'Muted', enableSound: 'Turn music on', disableSound: 'Mute music',
      introKicker: 'One dog. Zero plans to get caught.', introTitle: 'Catch me!!!!', introBubble: 'Go on. Try.', start: 'Catch me!!!!', instructions: 'Find Lennon in the photo and tap him.',
      onTheLoose: 'Lennon is loose again', findHim: 'Where am I?', attempts: 'Attempts', time: 'Time', loading: 'Lennon is finding a hiding spot…', arena: 'Find Lennon in the photograph', catchDog: 'Catch Lennon', playHint: 'Tap Lennon. He already has an escape plan.',
      taunts: ['Try again, haha!', 'Close. So close!', 'Oops, over here!', 'Not today!', 'Tired already?', 'Okay, this time. Haha!'],
      caughtKicker: 'Wait… what?!', caughtTitle: 'You caught me!', caughtQuote: "I'm not mad. I'm very mad.", coolingDown: 'Give me a second to cool off', countdownAnnouncement: 'The play-again screen will appear in five seconds.',
      replayKicker: 'Fine. You got me this time.', replayTitle: 'Try again?', replayButton: 'One more round!', replayHint: 'New place. Same Lennon.', result: (n,t) => `${n} attempts · ${t}s · Lennon wants a rematch.`,
      footer: 'Good dog. Selective listener.', credits: 'Photo & font credits', previewNote: "First edition · Lennon's original photos", imageMissing: 'The photo could not load. You can still play on the plain background.', photo: 'Photo',
      places: {dogpark:'Dog park', park:'In the park', playground:'Playground', stadium:'Sports field', florentin:'Florentin, Tel Aviv'},
      alt: {portrait:'Lennon', angry:'Lennon looking angry after being caught', replay:'Lennon ready for another round'}, pendingPhoto:'PHOTO TO COME'
    }
  };
  function pluralRu(n, words) { return words[n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14) ? 1 : 2]; }
  const $ = id => document.getElementById(id);
  const screens = ['language', 'intro', 'play', 'caught', 'replay'];
  const state = { screen:'language', lang:'he', attempts:0, earlyEscapes:3, lastScene:-1, scene:null, sticker:-1, position:null, elapsed:0, lastTick:0, countdown:5000, active:false, lockedUntil:0, round:0, sound:false, taunt:-1 };
  let ticker = null, toastTimer = null, loadTimer = null, loadCancel = null;
  const text = key => COPY[state.lang][key];
  const trackEvent = (name, params={}) => {
    if (typeof window.gtag !== 'function') return;
    window.gtag('event', name, { language:state.lang, ...params });
  };
  const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  function differentIndex(length, previous) { if (length < 2) return 0; const next = randomInt(0, length - 2); return next >= previous && previous >= 0 ? next + 1 : next; }
  function formatTime(ms) { const sec = Math.floor(ms / 1000); return `${String(Math.floor(sec / 60)).padStart(2,'0')}:${String(sec % 60).padStart(2,'0')}`; }

  const audio = {
    ctx:null, timer:null, step:0,
    init() { try { if (!this.ctx) { const Context = window.AudioContext || window.webkitAudioContext; if (!Context) return false; this.ctx = new Context(); } if (this.ctx.state === 'suspended') this.ctx.resume().catch(() => {}); return true; } catch { return false; } },
    tone(freq, duration=.11, delay=0, volume=.026, type='triangle') { if (!this.ctx || !state.sound || document.hidden) return; try { const t=this.ctx.currentTime+delay, oscillator=this.ctx.createOscillator(), gain=this.ctx.createGain(); oscillator.type=type; oscillator.frequency.value=freq; gain.gain.setValueAtTime(0,t); gain.gain.linearRampToValueAtTime(volume,t+.012); gain.gain.exponentialRampToValueAtTime(.0001,t+duration); oscillator.connect(gain); gain.connect(this.ctx.destination); oscillator.start(t); oscillator.stop(t+duration+.015); oscillator.onended=()=>{oscillator.disconnect();gain.disconnect();}; } catch {} },
    start() { this.stop(); if (!state.sound || state.screen !== 'play' || !state.active || document.hidden || !this.init()) return; const melody=[523.25,0,659.25,783.99,659.25,0,587.33,0,523.25,659.25,0,880,783.99,0,587.33,0]; this.timer=setInterval(()=>{const n=melody[this.step++ % melody.length];if(n)this.tone(n,.095,0,.014);if(this.step%4===1)this.tone(130.81,.16,0,.018,'sine');},205); },
    stop() { if(this.timer)clearInterval(this.timer); this.timer=null; },
    escape() { this.tone(740,.08); this.tone(440,.10,.085); },
    win() { [392,494,587,784].forEach((n,i)=>this.tone(n,.22,i*.10,.032)); }
  };

  function updateSound() { $('sound-label').textContent=text(state.sound?'soundOn':'soundOff'); $('sound-button').setAttribute('aria-label',text(state.sound?'disableSound':'enableSound')); $('sound-button').setAttribute('aria-pressed',String(state.sound)); $('sound-button').classList.toggle('sound-on',state.sound); }
  function setLanguage(lang) {
    state.lang=lang; document.documentElement.lang=lang; document.documentElement.dir=lang==='he'?'rtl':'ltr'; document.title=COPY[lang].title;
    document.querySelectorAll('[data-i18n]').forEach(el=>{const value=text(el.dataset.i18n);if(typeof value==='string')el.textContent=value;});
    $('language-short').textContent=lang.toUpperCase(); $('home-button').setAttribute('aria-label',text('home')); $('language-button').setAttribute('aria-label',text('language')); $('tools').setAttribute('aria-label',text('tools')); $('arena').setAttribute('aria-label',text('arena')); $('dog-target').setAttribute('aria-label',text('catchDog')); updateSound(); renderPortraits();
  }
  function makeSticker(container, src, variant=0, alt='') {
    container.replaceChildren();
    const fallback=()=>{ container.replaceChildren();const chip=document.createElement('span');chip.className='placeholder-sticker';chip.dataset.pose=String(variant%4);const name=document.createElement('strong');name.textContent=variant===9?'GRRR!':'LENNON';const caption=document.createElement('small');caption.textContent=variant===9?'!!!':text('pendingPhoto');chip.append(name,caption);container.append(chip); };
    if (!src) { fallback(); return; }
    const img=new Image();img.alt=alt;img.draggable=false;img.onerror=fallback;img.src=src;container.append(img);
  }
  function renderPortraits() {
    makeSticker($('intro-portrait'),MEDIA.portrait,0,text('alt').portrait);
    makeSticker($('angry-portrait'),MEDIA.angry||MEDIA.portrait,9,text('alt').angry);
    makeSticker($('replay-portrait'),MEDIA.replay||MEDIA.portrait,1,text('alt').replay);
    document.querySelectorAll('.preview-note').forEach(el=>{el.hidden=!!(MEDIA.portrait && MEDIA.stickers.length && MEDIA.angry && MEDIA.replay);});
  }
  function stopActivity() {
    if(ticker)clearInterval(ticker);ticker=null; clearTimeout(toastTimer);clearTimeout(loadTimer);
    if(loadCancel){loadCancel();loadCancel=null;}
    audio.stop();state.active=false;state.round++;
    $('game-toast').classList.remove('visible');$('game-toast').textContent='';
  }
  function showScreen(name) {
    stopActivity();state.screen=name;
    screens.forEach(screen=>{$(`screen-${screen}`).hidden=screen!==name;});
    $('language-button').hidden=name==='language';
    const heading=$(`screen-${name}`).querySelector('h1');heading?.focus({preventScroll:true});
    window.scrollTo({top:0,behavior:'instant'});
  }
  function goHome() { showScreen('intro'); }
  function nextScene() {
    const items=MEDIA.scenes;
    if(!items.length)return {id:'park',src:'',author:'',source:'',position:'50% 50%'};
    const index=differentIndex(items.length,state.lastScene);state.lastScene=index;return items[index];
  }
  function loadScene(scene, token) {
    return new Promise(resolve=>{
      const img=$('scene-photo');let done=false;
      const finish=ok=>{if(done)return;done=true;clearTimeout(loadTimer);img.onload=null;img.onerror=null;loadCancel=null;if(token!==state.round){resolve(false);return;}img.hidden=!ok;$('scene-error').hidden=ok;$('scene-error').textContent=ok?'':text('imageMissing');resolve(true);};
      loadCancel=()=>{if(done)return;done=true;img.onload=null;img.onerror=null;resolve(false);};
      img.onload=()=>finish(true);img.onerror=()=>finish(false);img.style.objectPosition=scene.position||'50% 50%';
      loadTimer=setTimeout(()=>finish(false),6500);
      if(scene.src){img.src=scene.src;if(img.complete && img.naturalWidth)finish(true);}else{img.removeAttribute('src');finish(false);}
    });
  }
  async function startRound() {
    showScreen('play');const token=state.round;state.attempts=0;state.earlyEscapes=randomInt(3,5);state.elapsed=0;state.position=null;state.sticker=-1;state.taunt=-1;state.lockedUntil=0;
    state.scene=nextScene();$('scene-name').textContent=text('places')[state.scene.id]||state.scene.id;$('scene-credit').replaceChildren();
    if(state.scene.author && state.scene.source){const a=document.createElement('a');a.textContent=`${text('photo')}: ${state.scene.author}`;a.href=state.scene.source;a.target='_blank';a.rel='noopener noreferrer';$('scene-credit').append(a);}
    $('attempt-count').textContent='00';$('elapsed-time').textContent='00:00';$('dog-target').hidden=true;$('scene-loading').hidden=false;$('scene-error').hidden=true;
    if(state.sound)audio.init();
    if(!await loadScene(state.scene,token) || token!==state.round || state.screen!=='play')return;
    $('scene-loading').hidden=true;$('dog-target').hidden=false;state.active=true;updateSticker();placeDog();state.lastTick=performance.now();ticker=setInterval(tick,100);audio.start();
  }
  function updateSticker() {
    const n=MEDIA.stickers.length;state.sticker=differentIndex(n||4,state.sticker);
    makeSticker($('target-art'),n?MEDIA.stickers[state.sticker]:'',state.sticker,'');
  }
  function placeDog() {
    const arena=$('arena');const target=$('dog-target');const width=arena.clientWidth,height=arena.clientHeight;
    const size=Math.max(64,Math.min(width<600?90:115, (width<600?90:115)-state.attempts*1.8));
    target.style.width=`${size}px`;target.style.height=`${size}px`;
    const minX=12,maxX=Math.max(minX,width-size-12),minY=Math.max(75,height*.25),maxY=Math.max(minY,height-size-83);
    let best=null,bestDistance=-1;
    for(let i=0;i<25;i++){const p={x:randomInt(minX,Math.floor(maxX)),y:randomInt(Math.ceil(minY),Math.floor(maxY))};const distance=state.position?Math.hypot(p.x-state.position.x,p.y-state.position.y):Infinity;if(distance>bestDistance){best=p;bestDistance=distance;}if(distance>Math.min(width,height)*.38)break;}
    state.position=best;target.style.left=`${best.x}px`;target.style.top=`${best.y}px`;
    target.classList.remove('pop');void target.offsetWidth;target.classList.add('pop');
  }
  function notifyEscape() { const options=text('taunts');state.taunt=state.attempts===1?0:differentIndex(options.length,state.taunt);$('game-toast').textContent=options[state.taunt];$('game-toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('game-toast').classList.remove('visible'),1100); }
  function attemptCatch(event) {
    if(state.screen!=='play'||!state.active||performance.now()<state.lockedUntil||document.hidden)return;
    state.lockedUntil=performance.now()+210;state.attempts++;$('attempt-count').textContent=String(state.attempts).padStart(2,'0');
    trackEvent('lennon_click',{attempt_number:state.attempts,scene:state.scene?.id||'unknown'});
    const chance=Math.min(.75,.10+Math.max(0,state.attempts-state.earlyEscapes-1)*.075);
    const caught=state.attempts>state.earlyEscapes && (state.attempts>=16 || Math.random()<chance);
    if(caught){capture();return;}
    updateSticker();placeDog();notifyEscape();audio.escape();
  }
  function tick() {
    const now=performance.now();const delta=Math.max(0,now-state.lastTick);state.lastTick=now;if(document.hidden)return;
    if(state.screen==='play'&&state.active){state.elapsed+=delta;$('elapsed-time').textContent=formatTime(state.elapsed);}
    else if(state.screen==='caught'){state.countdown=Math.max(0,state.countdown-delta);$('countdown').textContent=String(Math.ceil(state.countdown/1000));if(state.countdown<=0)showReplay();}
  }
  function capture() { tick();trackEvent('lennon_caught',{attempts:state.attempts,duration_seconds:Math.max(1,Math.round(state.elapsed/1000)),scene:state.scene?.id||'unknown'});showScreen('caught');state.countdown=5000;$('countdown').textContent='5';state.lastTick=performance.now();ticker=setInterval(tick,60);audio.win(); }
  function showReplay() { $('result-summary').textContent=text('result')(state.attempts,Math.max(1,Math.round(state.elapsed/1000)));showScreen('replay'); }
  function renderCredits() {
    const container=$('credits-content');
    MEDIA.credits.forEach(item=>{const p=document.createElement('p');p.dir='auto';const a=document.createElement('a');a.href=item.source;a.target='_blank';a.rel='noopener noreferrer';a.textContent=item.title;const license=document.createElement('a');license.href=item.licenseUrl;license.target='_blank';license.rel='noopener noreferrer';license.textContent=item.license;p.append(a,document.createTextNode(` — ${item.author}. `),license);container.append(p);});
  }

  window.handleLennonAction = (event, action) => {
    const button = event.currentTarget;
    if (action === 'select-language') { setLanguage(button.dataset.language); trackEvent('language_selected',{selected_language:state.lang}); showScreen('intro'); return; }
    if (action === 'start') { const replay=state.screen==='replay';trackEvent(replay?'game_restart':'game_start',{round_number:state.round+1});startRound(); return; }
    if (action === 'catch') { attemptCatch(event); return; }
    if (action === 'home') { if (state.screen !== 'language') goHome(); return; }
    if (action === 'language') { showScreen('language'); return; }
    if (action === 'sound') {
      state.sound=!state.sound;if(state.sound&&!audio.init())state.sound=false;updateSound();
      if(state.sound){audio.start();audio.tone(523,.08);}else audio.stop();
    }
  };
  document.addEventListener('visibilitychange',()=>{state.lastTick=performance.now();if(document.hidden){audio.stop();if(audio.ctx)audio.ctx.suspend().catch(()=>{});}else if(state.sound){audio.init();audio.start();}});
  window.addEventListener('pagehide',()=>{audio.stop();if(audio.ctx)audio.ctx.suspend().catch(()=>{});});
  window.addEventListener('pageshow',()=>{state.lastTick=performance.now();if(state.sound)audio.start();});
  let resizeTask;window.addEventListener('resize',()=>{clearTimeout(resizeTask);resizeTask=setTimeout(()=>{if(state.screen==='play'&&state.active)placeDog();},120);});
  if(MEDIA.logo){$('brand-photo').src=MEDIA.logo;$('brand-photo').hidden=false;$('brand-initial').hidden=true;$('brand-photo').onerror=()=>{$('brand-photo').hidden=true;$('brand-initial').hidden=false;};}
  if(MEDIA.fire){$('fire-photo').src=MEDIA.fire;$('fire-photo').onerror=()=>{$('fire-photo').hidden=true;};}else $('fire-photo').hidden=true;
  renderCredits();setLanguage('he');showScreen('language');
})();
