(function(){
const R={
c01:{rank:"نادر",def:14,block:42,dodge:6,special:"درع الفجر: صد إضافي في أول ضربة"},
c02:{rank:"قوي جدًا",def:5,block:8,dodge:4,special:"لهيب أزرق: فرصة ضربة حرجة"},
c03:{rank:"عادي",def:10,block:12,dodge:12,special:"استعادة: يستعيد جزءًا من صحته"},
c04:{rank:"مراوغ",def:8,block:10,dodge:48,special:"مرآة الليل: أول ضربة قد تنعكس"},
c05:{rank:"دفاع أسطوري",def:28,block:62,dodge:3,special:"قلب الجبل: صد هائل"},
c06:{rank:"قوي",def:6,block:8,dodge:30,special:"برق خاطف: ضرر أعلى عند بقاء هدف واحد"},
c07:{rank:"دفاع قوي",def:22,block:48,dodge:5,special:"بلورة الحماية: درع مؤقت"},
c08:{rank:"قوي",def:12,block:15,dodge:18,special:"دوامة: تقلل قوة الخصم"},
c09:{rank:"دعم",def:12,block:14,dodge:16,special:"نور الشفاء: استعادة صحة"},
c10:{rank:"عادي",def:11,block:18,dodge:12,special:"تركيز: يستعيد طاقة"},
c11:{rank:"دفاع قوي",def:24,block:52,dodge:4,special:"جذور: يحمي نفسه"},
c12:{rank:"هجوم أسطوري",def:2,block:5,dodge:14,special:"صاعقة الرعد: هجوم ضخم"},
c13:{rank:"قوي",def:9,block:13,dodge:20,special:"المد القمري: طاقة إضافية"},
c14:{rank:"متقلب",def:7,block:12,dodge:22,special:"كتاب الأسرار: تأثير عشوائي"},
c15:{rank:"دفاع أسطوري",def:30,block:68,dodge:2,special:"حصن البوابة: صد شبه كامل"},
c16:{rank:"شفاء",def:13,block:16,dodge:18,special:"تفتح: استعادة مستمرة"},
c17:{rank:"مراوغ",def:9,block:15,dodge:42,special:"اتجاه: مراوغة عالية"},
c18:{rank:"دعم قوي",def:15,block:20,dodge:13,special:"مطر: إضعاف الخصم"},
c19:{rank:"هجوم قوي",def:5,block:7,dodge:17,special:"وهج الشمس: ضرر إضافي"},
c20:{rank:"حظ",def:10,block:12,dodge:28,special:"مجازفة: فرصة صد أو طاقة"},
c21:{rank:"دفاع قوي",def:26,block:45,dodge:2,special:"عملاق السحاب: ثبات عالٍ"},
c22:{rank:"مراوغ",def:7,block:8,dodge:55,special:"الوهم: يتفادى أول هجوم غالبًا"},
c23:{rank:"هجوم قوي",def:6,block:8,dodge:25,special:"رصد: يضرب نقطة الضعف"},
c24:{rank:"دعم",def:18,block:25,dodge:8,special:"نهر الحياة: شفاء كبير"},
c25:{rank:"دفاع",def:21,block:38,dodge:9,special:"تجميد: يضعف الهجوم التالي"},
c26:{rank:"هجوم أسطوري",def:1,block:3,dodge:9,special:"شعلة النجوم: انفجار هائل"},
c27:{rank:"مراوغ",def:6,block:9,dodge:50,special:"خفة: مراوغة ثم هجوم سريع"},
c28:{rank:"دفاع قوي",def:23,block:50,dodge:5,special:"جذور الحكمة: درع للحظة"},
c29:{rank:"زمني",def:11,block:14,dodge:32,special:"اختلال الزمن: فرصة لإعادة الدور"},
c30:{rank:"هجوم أسطوري",def:12,block:10,dodge:18,special:"ثمن القوة: يزداد الهجوم مع سقوط الحلفاء"}
};
let duel=null;
function stats(u){return R[u.id]||{rank:"عادي",def:8,block:10,dodge:10,special:"مهارة خاصة"}}
function openDuel(pi,ei){const p=state.player[pi],e=state.enemy[ei];if(!p||!e||p.hp<=0||e.hp<=0)return;duel={pi,ei,step:0,paused:false,timer:null};p.duelUsed=false;e.duelUsed=false;document.getElementById('duelOverlay').classList.add('show');document.getElementById('duelAction').disabled=false;document.getElementById('duelPause').textContent='⏸️ إيقاف';document.getElementById('duelRetreat').disabled=false;document.getElementById('duelOverlay').classList.remove('duelPaused');document.getElementById('duelRound').textContent=p.name+' ضد '+e.name;document.getElementById('duelStatus').textContent='اختيار المقاتلين تم — كل ضربة ستأتي بالتناوب.';renderDuel()}
function renderDuel(){const p=state.player[duel.pi],e=state.enemy[duel.ei];const box=u=>{const s=stats(u);return '<div class="rankBadge">'+s.rank+'</div><div class="duelIcon">'+u.icon+'</div><div class="duelName">'+u.name+'</div><div class="duelRole">'+u.role+' · '+s.special+'</div><div class="statStrip"><span>⚔️ '+u.atk+'</span><span>🛡️ '+s.def+'</span><span>⛨ '+s.block+'%</span><span>💨 '+s.dodge+'%</span></div><div class="duelHp">'+Math.max(0,u.hp)+' / '+u.max+' صحة</div><div class="duelHpTrack"><div class="duelHpFill" style="width:'+Math.max(0,u.hp/u.max*100)+'%"></div></div>'};document.getElementById('duelPlayer').innerHTML=box(p);document.getElementById('duelEnemy').innerHTML=box(e)}
function fx(side,dmg,type){const f=document.getElementById('duelFx');const label=type==='dodge'?'مراوغة!':type==='block'?'صــــد!':type==='crit'?'ضربة حرجة!':'-'+dmg;f.innerHTML='<span class="fxBurst"></span><span class="fxSlash"></span><span class="damagePop '+type+'">'+label+'</span><span class="fxShock"></span>';const flash=document.getElementById('duelFlash');flash.classList.remove('on');void flash.offsetWidth;flash.classList.add('on');const a=document.getElementById(side==='player'?'duelPlayer':'duelEnemy'),t=document.getElementById(side==='player'?'duelEnemy':'duelPlayer');a.classList.remove('attacker');t.classList.remove('hit');void a.offsetWidth;void t.offsetWidth;a.classList.add('attacker');t.classList.add('hit');setTimeout(()=>f.innerHTML='',700)}
function attack(){if(!duel||duel.paused)return;const p=state.player[duel.pi],e=state.enemy[duel.ei];if(!p||!e){close();return}const pt=duel.step%2===0,a=pt?p:e,t=pt?e:p,as=stats(a),ts=stats(t);let dmg=a.atk,type='normal';if(pt){if(state.energy>=a.cost)state.energy-=a.cost;else dmg=Math.max(1,dmg-2);profile.plays++;saveProfile();if(a.id==='c12')dmg+=5;if(a.id==='c26')dmg+=8;if(a.id==='c19'&&p.hp<p.max*.55)dmg+=4;if(a.id==='c23'&&t.hp<=Math.min(...alive(state.enemy).map(x=>x.hp)))dmg+=3;if(a.id==='c30')dmg+=Math.max(0,5-alive(state.player).length)*2}else dmg=Math.max(0,a.atk-(a.atkDebuff||0));if(!t.duelUsed&&Math.random()*100<ts.dodge){type='dodge';t.duelUsed=true;fx(pt?'player':'enemy',0,type);document.getElementById('duelStatus').textContent=t.name+' استخدم المراوغة وتفادى الضربة!';duel.step++;nextAttack();return}let reduced=Math.max(0,dmg-Math.floor(ts.def*.35));if(Math.random()*100<ts.block){reduced=Math.floor(reduced*.28);type='block'}if((a.id==='c02'||a.id==='c12'||a.id==='c26')&&Math.random()<.22){reduced*=2;type='crit'}if(a.id==='c04'&&Math.random()<.25)reduced=Math.floor(reduced*.55);if(a.id==='c22'&&!a.duelUsed){a.duelUsed=true;reduced=Math.floor(reduced*.7)}if(a.id==='c20'&&Math.random()<.2)state.energy=Math.min(5,state.energy+1);if(a.id==='c03'||a.id==='c16')a.hp=Math.min(a.max,a.hp+(a.id==='c16'?3:2));if(a.id==='c24')a.hp=Math.min(a.max,a.hp+4);if(a.id==='c28')a.shield=Math.max(a.shield||0,5);if(a.id==='c18')t.atkDebuff=2;if(a.id==='c25')t.atkDebuff=3;if(a.id==='c08')t.atkDebuff=2;if(a.id==='c13')state.energy=Math.min(5,state.energy+1);if(a.id==='c10'&&reduced<a.atk)state.energy=Math.min(5,state.energy+1);if(a.id==='c29'&&Math.random()<.18)duel.step++;if(t.shield>0){reduced=Math.max(0,reduced-t.shield);t.shield=0}t.hp=Math.max(0,t.hp-reduced);fx(pt?'player':'enemy',reduced,type);document.getElementById('duelStatus').textContent=type==='block'?t.name+' صد معظم الهجوم!':a.name+' أصاب '+t.name+' بقوة '+reduced+'.';renderDuel();if(t.hp<=0){if(pt){profile.kills++;state.combo++;saveProfile();msg(a.name+' حسم المواجهة ضد '+t.name+'!')}setTimeout(()=>{close();checkWin();render()},900);return}duel.step++;nextAttack()}
function nextAttack(){
 document.getElementById('duelAction').disabled=true;
 if(duel&&duel.timer)clearTimeout(duel.timer);
 if(!duel||duel.paused)return;
 duel.timer=setTimeout(()=>{
   if(duel&&!duel.paused){document.getElementById('duelAction').disabled=false;attack()}
 },900);
}
function togglePause(){
 if(!duel)return;
 duel.paused=!duel.paused;
 const btn=document.getElementById('duelPause');
 document.getElementById('duelOverlay').classList.toggle('duelPaused',duel.paused);
 btn.textContent=duel.paused?'▶️ متابعة':'⏸️ إيقاف';
 document.getElementById('duelStatus').textContent=duel.paused?'المعركة متوقفة مؤقتًا. اضغط متابعة لاستكمال القتال.':'استئناف المعركة — الهجمات ستستمر بالتناوب.';
 if(!duel.paused){
   document.getElementById('duelAction').disabled=false;
   nextAttack();
 }
}
function retreat(){
 if(!duel)return;
 if(!confirm('هل تريد الانسحاب من المعركة؟ سيتم إنهاء المواجهة دون احتساب فوز.'))return;
 if(duel.timer)clearTimeout(duel.timer);
 document.getElementById('duelStatus').textContent='تم الانسحاب من المعركة.';
 close();
}

function close(){if(duel&&duel.timer)clearTimeout(duel.timer);document.getElementById('duelOverlay').classList.remove('show','duelPaused');document.getElementById('duelFx').innerHTML='';duel=null;state.selected=null;state.target=null;render()}
window.openDuel=openDuel;window.selectTarget=function(i){if(state.selected===null||state.over||state.turn!=='player')return;state.target=i;openDuel(state.selected,i)};document.getElementById('duelAction').onclick=attack;document.getElementById('duelPause').onclick=togglePause;document.getElementById('duelRetreat').onclick=retreat;
})();