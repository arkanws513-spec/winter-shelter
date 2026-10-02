(function(){
const SKY_MILESTONES=[5,10,15,20,30,40,50];
const TOWER_CARDS=[
{id:"t01",name:"نصل الفجر",icon:"🗡️",role:"هجوم",desc:"هجوم شديد وسرعة عالية.",atk:10,hp:25,max:25},
{id:"t02",name:"درع العرش",icon:"👑",role:"دفاع",desc:"دفاع وصد مرتفعان.",atk:4,hp:42,max:42},
{id:"t03",name:"طيف القمر",icon:"🌘",role:"مراوغة",desc:"مراوغ بشكل استثنائي.",atk:7,hp:22,max:22},
{id:"t04",name:"سهم العاصفة",icon:"🏹",role:"هجوم",desc:"يضرب بقوة مع دقة عالية.",atk:9,hp:24,max:24},
{id:"t05",name:"حارس السماء",icon:"🛡️",role:"دفاع",desc:"يتحمل الضربات الثقيلة.",atk:3,hp:45,max:45},
{id:"t06",name:"روح السراب",icon:"🦋",role:"مراوغة",desc:"يصعب إصابته.",atk:6,hp:23,max:23},
{id:"t07",name:"ملك البرق",icon:"⚡",role:"هجوم",desc:"ضربة انفجارية.",atk:11,hp:20,max:20},
{id:"t08",name:"حصن النجوم",icon:"🏰",role:"دفاع",desc:"أعلى دفاع في بطاقات البرج.",atk:2,hp:48,max:48},
{id:"t09",name:"عين الليل",icon:"🌌",role:"دقة",desc:"توازن بين الهجوم والمراوغة.",atk:8,hp:27,max:27},
{id:"t10",name:"فارس الشهاب",icon:"☄️",role:"هجوم",desc:"هجوم قوي جدًا.",atk:12,hp:19,max:19},
{id:"t11",name:"حارس البوابة العليا",icon:"🚧",role:"دفاع",desc:"صد مرتفع للغاية.",atk:3,hp:46,max:46},
{id:"t12",name:"راقص الريح",icon:"🌬️",role:"مراوغة",desc:"مراوغة أسطورية.",atk:7,hp:21,max:21},
{id:"t13",name:"قاهر العمالقة",icon:"🐉",role:"هجوم",desc:"هجوم هائل مقابل دفاع أقل.",atk:13,hp:18,max:18},
{id:"t14",name:"حارس الأفق",icon:"🌠",role:"دفاع",desc:"توازن دفاعي نادر.",atk:5,hp:40,max:40},
{id:"t15",name:"إمبراطور البرج",icon:"🔱",role:"أسطوري",desc:"بطاقة نادرة من الطابق الأخير.",atk:14,hp:30,max:30}
];
const TOWER_STATS={
t01:{rank:"امتياز البرج",def:8,block:18,dodge:24,special:"نصل الفجر"},
t02:{rank:"امتياز البرج",def:34,block:72,dodge:2,special:"درع العرش"},
t03:{rank:"امتياز البرج",def:8,block:10,dodge:72,special:"طيف القمر"},
t04:{rank:"امتياز البرج",def:10,block:12,dodge:30,special:"سهم العاصفة"},
t05:{rank:"امتياز البرج",def:38,block:66,dodge:3,special:"حارس السماء"},
t06:{rank:"امتياز البرج",def:7,block:9,dodge:78,special:"روح السراب"},
t07:{rank:"امتياز البرج",def:3,block:5,dodge:18,special:"ملك البرق"},
t08:{rank:"امتياز البرج",def:42,block:80,dodge:1,special:"حصن النجوم"},
t09:{rank:"امتياز البرج",def:12,block:18,dodge:36,special:"عين الليل"},
t10:{rank:"امتياز البرج",def:2,block:4,dodge:20,special:"فارس الشهاب"},
t11:{rank:"امتياز البرج",def:40,block:76,dodge:2,special:"حارس البوابة العليا"},
t12:{rank:"امتياز البرج",def:8,block:8,dodge:82,special:"راقص الريح"},
t13:{rank:"امتياز البرج",def:1,block:3,dodge:14,special:"قاهر العمالقة"},
t14:{rank:"امتياز البرج",def:30,block:52,dodge:10,special:"حارس الأفق"},
t15:{rank:"امتياز البرج",def:20,block:28,dodge:26,special:"إمبراطور البرج"}
};
window.TOWER_STATS=TOWER_STATS;window.TOWER_CARDS=TOWER_CARDS;
function ensure(){
 profile.towerFloor=Math.max(1,Math.min(50,Number(profile.towerFloor||1)));
 profile.towerPoints=Math.max(0,Number(profile.towerPoints||0));
 profile.towerOwned=Array.isArray(profile.towerOwned)?[...new Set(profile.towerOwned.filter(id=>TOWER_CARDS.some(c=>c.id===id)))]:[];
 profile.freeStats=profile.freeStats&&typeof profile.freeStats==='object'?profile.freeStats:{atk:0,def:0,block:0,dodge:0};
 ['atk','def','block','dodge'].forEach(k=>{profile.freeStats[k]=Math.max(0,Number(profile.freeStats[k]||0));});
 profile.pvpWins=Number(profile.pvpWins||0);profile.pvpLosses=Number(profile.pvpLosses||0);
}
function cardById(id){return TOWER_CARDS.find(c=>c.id===id)||cardPool.find(c=>c.id===id)}
function towerCard(id){const c=cardById(id);return c?freshCard(c):null}
function renderTower(){
 ensure();const f=profile.towerFloor,owned=profile.towerOwned;
 const deck=profile.deckIds&&profile.deckIds.length?profile.deckIds:[];
 profile.deckIds=deck.length?deck:shuffle(cardPool).slice(0,5).map(x=>x.id);
 const current=profile.deckIds.map(id=>cardById(id)).filter(Boolean);

 document.getElementById('towerContent').innerHTML=
 '<div class="towerHero"><h2>🏯 برج السماء</h2><p>50 طابقًا. كل طابق أقوى من السابق. الفوز يمنحك نقطتين حرتين لتطوير صفاتك الشخصية، والطوابق الخاصة تمنحك فرصة اختيار بطاقة امتياز من 15 بطاقة لا تظهر عشوائيًا في المعارك.</p>'+
 '<div class="towerStats"><div class="towerStat"><span>الطابق الحالي</span><b>'+f+'/50</b></div><div class="towerStat"><span>النقاط الحرة</span><b>'+profile.towerPoints+'</b></div><div class="towerStat"><span>بطاقات الامتياز</span><b>'+owned.length+'</b></div></div></div>'+
 '<div class="towerFloor"><div><b>الطابق '+f+'</b><span> قوة الخصم: '+(100+f*8)+'%</span></div><button class="towerBtn" onclick="startTower()">⚔️ دخول</button></div>'+
 '<div class="towerFloor"><div><b>🃏 تشكيلتك الحالية</b><span>'+current.map(c=>c.name).join(' · ')+'</span></div><button class="towerBtn" onclick="openDeckBuilder()">تعديل</button></div>'+
 '<div class="towerFloor"><div><b>📈 صفاتك الشخصية</b><span>تضاف تلقائيًا لكل بطاقة تستخدمها</span></div><button class="towerBtn" onclick="openStatsUpgrade()">تطوير</button></div>'+
 '<div class="towerFloor"><div><b>🃏 بطاقات البرج الخاصة</b><span>'+owned.length+' / 15 مكتسبة</span></div><button class="towerBtn" onclick="openOwnedCards()">عرض</button></div>'+
 '<div class="small">الطوابق الخاصة: '+SKY_MILESTONES.join(' · ')+'</div>';
}
function openDeckBuilder(){
 ensure();
 const pool=[...cardPool,...TOWER_CARDS].filter((c,i,a)=>a.findIndex(x=>x.id===c.id)===i);
 const current=profile.deckIds||[];
 openPanel('🃏 تشكيلتك — 5 بطاقات','<div class="quest"><b>يمكنك إدخال بطاقات امتياز البرج بدل بطاقاتك الأساسية.</b><span>الحد الأقصى 5 بطاقات. بطاقات البرج تظهر بعلامة 🏯.</span></div><div class="towerCards">'+pool.map(c=>{
   const on=current.includes(c.id);
   const special=TOWER_CARDS.some(x=>x.id===c.id);
   return '<button class="towerCard pickChoice '+(on?'selected':'')+'" onclick="toggleDeckCard(\''+c.id+'\')"><div class="tcIcon">'+c.icon+'</div><b>'+c.name+'</b><small>'+(special?'🏯 امتياز':'أساسية')+' · ⚔️ '+c.atk+'</small></button>';
 }).join('')+'</div><button class="towerBtn" style="margin-top:10px" onclick="saveDeckBuilder()">💾 حفظ التشكيلة</button>');
}
function toggleDeckCard(id){
 ensure();
 const current=profile.deckIds||[];
 if(current.includes(id)){profile.deckIds=current.filter(x=>x!==id);openDeckBuilder();return}
 if(!profile.towerOwned.includes(id)&&TOWER_CARDS.some(x=>x.id===id)){msg('هذه بطاقة امتياز لم تحصل عليها بعد.');return}
 if(current.length>=5){msg('التشكيلة مكتملة — أزل بطاقة أولًا.');return}
 profile.deckIds=[...current,id];openDeckBuilder();
}
function saveDeckBuilder(){
 ensure();
 if((profile.deckIds||[]).length!==5){msg('يجب أن تحتوي التشكيلة على 5 بطاقات.');return}
 saveProfile();renderTower();openPanel('✅ تم حفظ التشكيلة','<div class="quest"><b>تم اعتماد البطاقات الخمس.</b><span>سيتم استخدامها في برج السماء، ويمكنك تعديلها متى شئت.</span></div>');
}
function openStatsUpgrade(){
 ensure();openPanel('تطوير صفاتك الشخصية','<div class="quest"><b>النقاط الحرة: '+profile.towerPoints+'</b><span>كل نقطة = +1 في الصفة التي تختارها، وتنتقل تلقائيًا إلى كل بطاقة في المعركة.</span></div><div class="freePointGrid">'+
 [['atk','⚔️ القوة'],['def','🛡️ الدفاع'],['block','⛨ الصد'],['dodge','💨 المراوغة']].map(x=>'<button class="pointBtn" onclick="spendTowerPoint(\''+x[0]+'\')"><b>'+x[1]+'</b><span>المستوى الحالي: '+profile.freeStats[x[0]]+'</span></button>').join('')+'</div>');
}
function spendTowerPoint(k){ensure();if(profile.towerPoints<1){msg('لا توجد نقاط حرة.');return}profile.towerPoints--;profile.freeStats[k]++;saveProfile();openStatsUpgrade();renderTower();}
function openOwnedCards(){
 ensure();openPanel('بطاقات امتياز البرج',ownedHtml());
}
function ownedHtml(){
 if(!profile.towerOwned.length)return '<div class="small">لم تحصل على بطاقة من البرج بعد.</div>';
 return '<div class="towerCards">'+profile.towerOwned.map(id=>{const c=cardById(id);return '<div class="towerCard"><div class="tcIcon">'+c.icon+'</div><b>'+c.name+'</b><small>'+c.role+' · ⚔️ '+c.atk+'</small></div>'}).join('')+'</div><div class="small" style="margin-top:10px">يمكنك استبدال بطاقتين من تشكيلتك الأساسية ببطاقتين من هذه المجموعة.</div>';
}
function chooseTowerReward(){
 const available=TOWER_CARDS.filter(c=>!profile.towerOwned.includes(c.id));
 const choices=shuffle(available).slice(0,15);
 openPanel('🎴 اختر بطاقة واحدة','<div class="quest"><b>اختيار عشوائي من 15 بطاقة مقلوبة</b><span>اختر بطاقة واحدة فقط. هذه البطاقة تصبح ملكك ولن تظهر عشوائيًا في المعارك.</span></div><div class="towerCards">'+choices.map((c,i)=>'<button class="towerCard back pickChoice" onclick="claimTowerCard(\''+c.id+'\')"><div class="tcIcon">❔</div><b>بطاقة '+(i+1)+'</b><small>مخفية</small></button>').join('')+'</div>');
}
function claimTowerCard(id){
 ensure();
 if(!TOWER_CARDS.some(c=>c.id===id)||profile.towerOwned.includes(id)){openPanel('ℹ️ البطاقة غير متاحة','<div class="small">هذه البطاقة حصلت عليها بالفعل أو لم تعد متاحة للاختيار.</div>');return;}
 profile.towerOwned.push(id);saveProfile();const c=cardById(id);
 openPanel('🏆 تم الحصول على بطاقة','<div class="towerCard" style="max-width:160px;margin:auto"><div class="tcIcon">'+c.icon+'</div><b>'+c.name+'</b><small>'+c.role+' · ⚔️ '+c.atk+'</small></div><p class="small">أصبحت هذه البطاقة ملكك ويمكنك استخدامها بدل أي بطاقة من تشكيلتك الأساسية.</p>');
 renderTower();
}
function startTower(){
 ensure();const floor=profile.towerFloor;
 state={player:getBattleDeck(),enemy:buildTowerEnemy(floor),energy:3,round:1,combo:0,selected:null,target:null,over:false,turn:'player',usedIds:[]};
 battleNumber=1;matchPlayerWins=0;matchEnemyWins=0;matchOver=false;battleEnding=false;
 state.mode='tower';state.towerFloor=floor;
 showScreen('battleScreen');render();msg('برج السماء — الطابق '+floor+'. خصم هذا الطابق أقوى من السابق.');
}
function getBattleDeck(){
 ensure();
 const validIds=new Set([...cardPool.map(x=>x.id),...profile.towerOwned]);
 const saved=(Array.isArray(profile.deckIds)?profile.deckIds:[]).filter(id=>validIds.has(id));
 const ids=saved.length===5?[...new Set(saved)]:[];
 const finalIds=ids.length===5?ids:shuffle(cardPool).slice(0,5).map(x=>x.id);
 profile.deckIds=finalIds;
 return finalIds.map(id=>cardById(id)).filter(Boolean).map(freshCard);
}
function buildTowerEnemy(f){
 const base=shuffle(cardPool).slice(0,5);
 const hpMul=1+f*.035,atkAdd=Math.floor(f*.18);
 return base.map(x=>{const c=freshCard(x);c.max=Math.round(x.max*hpMul);c.hp=c.max;c.atk=x.atk+atkAdd;c._towerBonus=f;return c});
}
function nextTowerFloor(){
 const won=state&&alive(state.player).length>0&&alive(state.enemy).length===0;
 if(!won)return;
 if(profile.towerFloor<50){profile.towerFloor++;profile.towerPoints+=2;saveProfile();if(SKY_MILESTONES.includes(profile.towerFloor-1)){}}
 if(SKY_MILESTONES.includes(profile.towerFloor-1))chooseTowerReward();
 else {renderTower();showScreen('towerScreen');}
}
function enterTower(){ensure();renderTower();showScreen('towerScreen')}
function enterPvp(){showScreen('pvpScreen');renderPvp()}
function renderPvp(){document.getElementById('pvpContent').innerHTML='<div class="pvpBox"><h2>🌐 قتال ضد لاعب</h2><p>هذا النظام مخصص لمواجهة لاعب حقيقي عبر الحسابات. البحث عن خصم يتم من خلال قائمة انتظار مشتركة، ثم تنتقل المعركة إلى نفس نظام المبارزة الحالي.</p><div class="pvpStatus" id="pvpStatus">جاهز للبحث عن لاعب.</div><button class="pvpBtn" onclick="startPvpQueue()">🔎 البحث عن خصم</button><button class="pvpBtn secondary" onclick="openPanel(\'معلومات القتال ضد لاعب\',\'<div class=quest><b>كيف يعمل؟</b><span>يتم مطابقة اللاعبين المسجلين بحساباتهم، ولا تدخل بطاقات امتياز البرج في قائمة البطاقات العشوائية للخصم.</span></div>\')">ℹ️ التفاصيل</button></div>'}
async function startPvpQueue(){
 const el=document.getElementById('pvpStatus');if(!cloudUser){el.textContent='سجّل الدخول بحساب Google أولًا حتى يمكن مطابقتك مع لاعب حقيقي.';return}
 el.textContent='جاري البحث عن خصم...';
 const me=cloudUser.id;
 const {data:wait}=await supabaseClient.from('card_legends_pvp').select('*').eq('status','waiting').neq('host_id',me).limit(1).maybeSingle();
 if(wait){
   const {error}=await supabaseClient.from('card_legends_pvp').update({guest_id:me,guest_deck:getBattleDeck().map(x=>x.id),status:'matched',updated_at:new Date().toISOString()}).eq('id',wait.id).eq('status','waiting');
   if(!error){el.textContent='تم العثور على خصم! جهّز تشكيلتك.';launchPvp(wait.id,'guest',wait);}
   return;
 }
 const {data,error}=await supabaseClient.from('card_legends_pvp').insert({host_id:me,status:'waiting',host_deck:getBattleDeck().map(x=>x.id)}).select().single();
 if(error){el.textContent='تعذر بدء البحث. تأكد من تسجيل الدخول ثم حاول مرة أخرى.';console.error(error);return}
 el.textContent='أنت في قائمة الانتظار...';
 const ch=supabaseClient.channel('pvp-'+data.id).on('postgres_changes',{event:'UPDATE',schema:'public',table:'card_legends_pvp',filter:'id=eq.'+data.id},payload=>{
   if(payload.new.status==='matched'&&payload.new.guest_id===me){launchPvp(data.id,'host',payload.new)}
 }).subscribe();
 window._pvpChannel=ch;
}
function launchPvp(id,side,row){
 if(window._pvpChannel)supabaseClient.removeChannel(window._pvpChannel);
 const enemyIds=side==='host'?(row.guest_deck||[]):(row.host_deck||[]);
 const enemy=enemyIds.map(x=>freshCard(cardPool.find(c=>c.id===x)||TOWER_CARDS.find(c=>c.id===x))).filter(Boolean);
 state={player:getBattleDeck(),enemy:enemy.length?enemy:shuffle(cardPool).slice(0,5).map(freshCard),energy:3,round:1,combo:0,selected:null,target:null,over:false,turn:'player',usedIds:[],mode:'pvp'};
 showScreen('battleScreen');render();msg('تمت مطابقتك مع لاعب حقيقي. تبدأ المواجهة الآن.');
}
window.openDeckBuilder=openDeckBuilder;window.toggleDeckCard=toggleDeckCard;window.saveDeckBuilder=saveDeckBuilder;window.enterTower=enterTower;window.enterPvp=enterPvp;window.startTower=startTower;window.spendTowerPoint=spendTowerPoint;window.openStatsUpgrade=openStatsUpgrade;window.openOwnedCards=openOwnedCards;window.claimTowerCard=claimTowerCard;window.nextTowerFloor=nextTowerFloor;
window.startPvpQueue=startPvpQueue;window.renderPvp=renderPvp;window.chooseTowerReward=chooseTowerReward;window.renderTower=renderTower;
document.getElementById('openTower').onclick=enterTower;
document.getElementById('openPvp').onclick=enterPvp;
ensure();
})();