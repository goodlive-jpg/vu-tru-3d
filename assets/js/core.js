(() => {
'use strict';

/* ---------------- data ---------------- */
const DATA = {
  sun: {name:'Mặt Trời', en:'Sun', type:'Ngôi sao', color:'#ffcf6b',
    tag:'Ngôi sao ở trung tâm, chiếm 99,86% khối lượng của cả hệ Mặt Trời.',
    desc:'Mỗi giây, Mặt Trời biến khoảng 600 triệu tấn hydro thành heli, giải phóng năng lượng nuôi sống gần như mọi sự sống trên Trái Đất. Lõi của nó nóng tới 15 triệu °C.',
    stats:[['Đường kính','1.392.700 km'],['Nhiệt độ bề mặt','5.500 °C'],['Nhiệt độ lõi','15 triệu °C'],['Tuổi','~4,6 tỷ năm']],
    fact:'Ánh sáng Mặt Trời mất 8 phút 20 giây để đến Trái Đất — bạn luôn nhìn thấy Mặt Trời của quá khứ.'},
  mercury: {name:'Sao Thủy', en:'Mercury', type:'Hành tinh đá', color:'#b7b0a2',
    tag:'Hành tinh nhỏ nhất, nhanh nhất và gần Mặt Trời nhất.',
    desc:'Bề mặt Sao Thủy phủ đầy hố va chạm, gần như không có khí quyển để giữ nhiệt. Ban ngày nóng đến mức chảy chì, ban đêm lạnh hơn cả Nam Cực.',
    stats:[['Đường kính','4.879 km'],['Cách Mặt Trời','57,9 triệu km'],['Một ngày','58,6 ngày'],['Một năm','88 ngày']],
    fact:'Một ngày Mặt Trời trên Sao Thủy (176 ngày Trái Đất) dài gấp đôi một năm của nó (88 ngày).'},
  venus: {name:'Sao Kim', en:'Venus', type:'Hành tinh đá', color:'#e6bd85',
    tag:'Hành tinh nóng nhất — một lò hấp vũ trụ dưới lớp mây axit.',
    desc:'Sao Kim bị bao phủ bởi mây axit sunfuric dày đặc, tạo hiệu ứng nhà kính cực đoan. Nhiệt độ bề mặt đủ để nấu chảy chì, và áp suất gấp 90 lần Trái Đất.',
    stats:[['Đường kính','12.104 km'],['Cách Mặt Trời','108,2 triệu km'],['Một ngày','243 ngày'],['Nhiệt độ','~464 °C']],
    fact:'Sao Kim quay ngược chiều và rất chậm — một ngày trên đó dài hơn một năm.'},
  earth: {name:'Trái Đất', en:'Earth', type:'Hành tinh đá', color:'#5fa8ff',
    tag:'Hành tinh duy nhất được biết có nước lỏng bền vững và sự sống.',
    desc:'Đại dương bao phủ 71% bề mặt. Từ trường và khí quyển bảo vệ chúng ta khỏi bức xạ vũ trụ, còn Mặt Trăng giữ ổn định trục quay của hành tinh.',
    stats:[['Đường kính','12.742 km'],['Cách Mặt Trời','149,6 triệu km'],['Một ngày','24 giờ'],['Một năm','365,25 ngày']],
    fact:'71% bề mặt Trái Đất là nước, nhưng nước chỉ chiếm khoảng 0,02% khối lượng hành tinh.'},
  mars: {name:'Sao Hỏa', en:'Mars', type:'Hành tinh đá', color:'#d1683f',
    tag:'Thế giới sa mạc lạnh giá, từng có nước chảy trên bề mặt.',
    desc:'Sao Hỏa có những hẻm núi khổng lồ, núi lửa cao nhất hệ Mặt Trời và những vùng cực băng giá. Các robot NASA đang tìm dấu vết sự sống cổ đại trong đá.',
    stats:[['Đường kính','6.779 km'],['Cách Mặt Trời','227,9 triệu km'],['Một ngày','24,6 giờ'],['Nhiệt độ','-153…20 °C']],
    fact:'Olympus Mons cao 21,9 km — gần 2,5 lần Everest, là núi lửa lớn nhất hệ Mặt Trời.'},
  jupiter: {name:'Sao Mộc', en:'Jupiter', type:'Hành tinh khí', color:'#d9a878',
    tag:'Gã khổng lồ nặng gấp 2,5 lần tất cả các hành tinh còn lại cộng lại.',
    desc:'Sao Mộc là một quả cầu khí khổng lồ với những dải mây xoáy. Vết Đỏ Lớn là cơn bão lớn hơn Trái Đất, đã tồn tại ít nhất vài trăm năm.',
    stats:[['Đường kính','139.820 km'],['Cách Mặt Trời','778,5 triệu km'],['Một ngày','9,9 giờ'],['Mặt trăng','95 đã biết']],
    fact:'Europa — mặt trăng của Sao Mộc — có thể giấu một đại dương nước mặn dưới lớp băng, nơi sự sống có thể tồn tại.'},
  saturn: {name:'Sao Thổ', en:'Saturn', type:'Hành tinh khí', color:'#e8d3a3',
    tag:'Nổi tiếng với hệ vành đai băng và đá rộng 270.000 km.',
    desc:'Những vành đai của Sao Thổ được tạo từ vô số hạt băng, đá và bụi, rộng hàng trăm nghìn km nhưng chỉ dày vài chục mét ở nhiều nơi.',
    stats:[['Đường kính','116.460 km'],['Cách Mặt Trời','1,43 tỷ km'],['Một ngày','10,7 giờ'],['Mặt trăng','146 đã biết']],
    fact:'Mật độ trung bình của Sao Thổ thấp hơn nước — về lý thuyết, nó có thể nổi.'},
  uranus: {name:'Sao Thiên Vương', en:'Uranus', type:'Hành tinh băng', color:'#9fe3e6',
    tag:'Hành tinh quay nghiêng, màu xanh lam nhạt vì khí metan.',
    desc:'Sao Thiên Vương quay gần như nằm ngang, có lẽ do một va chạm khổng lồ trong quá khứ. Khí metan trong khí quyển hấp thụ ánh sáng đỏ, để lại màu xanh lam.',
    stats:[['Đường kính','50.724 km'],['Cách Mặt Trời','2,87 tỷ km'],['Một ngày','17,2 giờ'],['Độ nghiêng trục','98°']],
    fact:'Trục quay nghiêng 98° khiến mỗi cực có 42 năm ngày và 42 năm đêm liên tục.'},
  neptune: {name:'Sao Hải Vương', en:'Neptune', type:'Hành tinh băng', color:'#4f7bff',
    tag:'Hành tinh xa nhất, tối và lạnh nhất — với gió nhanh nhất hệ Mặt Trời.',
    desc:'Sao Hải Vương có những cơn gió đạt 2.100 km/h, nhanh hơn bất kỳ nơi nào khác trong hệ Mặt Trời. Nó được tìm ra bằng toán học trước khi được nhìn thấy.',
    stats:[['Đường kính','49.244 km'],['Cách Mặt Trời','4,5 tỷ km'],['Một ngày','16,1 giờ'],['Nhiệt độ','-214 °C']],
    fact:'Sao Hải Vương được dự đoán bằng tính toán quỹ đạo rồi mới được quan sát — một chiến thắng của toán học.'},
  ceres: {name:'Ceres', en:'1 Ceres', type:'Hành tinh lùn', color:'#b9b2a4',
    tag:'Thiên thể lớn nhất trong vành đai tiểu hành tinh.',
    desc:'Ceres chiếm khoảng 25% khối lượng của cả vành đai. Dưới lớp vỏ đá có thể chứa băng nước, và những đốm sáng trên bề mặt là muối phản chiếu ánh sáng.',
    stats:[['Đường kính','939 km'],['Cách Mặt Trời','2,77 AU'],['Một năm','4,6 năm'],['Nhiệt độ','~-105 °C']],
    fact:'Ceres được xếp là hành tinh khi phát hiện năm 1801, rồi bị hạ cấp thành tiểu hành tinh, và nay là hành tinh lùn.'},
  vesta: {name:'Vesta', en:'4 Vesta', type:'Tiểu hành tinh', color:'#c8a98a',
    tag:'Tiểu hành tinh sáng nhất có thể thấy bằng mắt thường.',
    desc:'Vesta có bề mặt đa dạng với hố va chạm khổng lồ ở cực nam, nơi từng xảy ra một vụ va chạm làm bắn vật liệu vào không gian — một phần rơi xuống Trái Đất thành thiên thạch.',
    stats:[['Đường kính','525 km'],['Cách Mặt Trời','2,36 AU'],['Một năm','3,6 năm'],['Nhiệt độ','~-108 °C']],
    fact:'Khoảng 6% thiên thạch rơi xuống Trái Đất được cho là mảnh vỡ từ Vesta.'},
  psyche: {name:'Psyche', en:'16 Psyche', type:'Tiểu hành tinh kim loại', color:'#a9a29b',
    tag:'Một thế giới kim loại — có thể là lõi của hành tinh thất bại.',
    desc:'Psyche giàu sắt và niken, khác với hầu hết tiểu hành tinh đá. Các nhà khoa học cho rằng nó có thể là phần lõi còn lại của một hành tinh non bị mất lớp vỏ do va chạm.',
    stats:[['Đường kính','226 km'],['Cách Mặt Trời','2,92 AU'],['Một năm','5 năm'],['Thành phần','Sắt · Niken']],
    fact:'Sứ mệnh Psyche của NASA được phóng năm 2023 và dự kiến đến nơi vào năm 2029.'}
};

const seq = ['mercury','venus','earth','mars','jupiter','saturn','uranus','neptune','ceres','vesta','psyche'];

const TIMELINE = [
  {year:'t = 0', when:'13,8 tỷ năm trước', name:'Big Bang', title:'Vụ nổ khởi nguyên', desc:'Không gian, thời gian và vật chất bắt đầu giãn nở từ một điểm kỳ dị. Đây là mốc mà mọi mô hình vũ học hiện đại đều hướng về.'},
  {year:'380.000 năm', when:'sau Big Bang', name:'Ánh sáng đầu tiên', title:'Bức xạ nền vũ trụ', desc:'Electron kết hợp với hạt nhân, vũ trụ trở nên trong suốt và ánh sáng thoát ra tự do. Bức xạ nền vi sóng (CMB) mà chúng ta đo được hôm nay chính là dấu vết của khoảnh khắc này.'},
  {year:'100–200 triệu năm', when:'sau Big Bang', name:'Những ngôi sao đầu tiên', title:'Những ngọn đèn đầu tiên', desc:'Khí hydro và heli co lại dưới trọng lực, bắt đầu phản ứng nhiệt hạch. Những ngôi sao đầu tiên bật sáng, tạo ra các nguyên tố nặng hơn trong lõi của chúng.'},
  {year:'1 tỷ năm', when:'sau Big Bang', name:'Thiên hà đầu tiên', title:'Những hòn đảo sao', desc:'Hàng tỷ ngôi sao liên kết với nhau thành những thiên hà đầu tiên. Các cấu trúc lớn nhất của vũ trụ bắt đầu thành hình.'},
  {year:'9,2 tỷ năm', when:'sau Big Bang', name:'Hệ Mặt Trời', title:'Mặt Trời và các hành tinh', desc:'Một đám mây khí và bụi sụp đổ tạo ra Mặt Trời cùng các hành tinh. Các mảnh vụn còn sót lại tạo thành vành đai tiểu hành tinh và sao chổi.'},
  {year:'9,3 tỷ năm', when:'sau Big Bang', name:'Trái Đất', title:'Một hành tinh xanh', desc:'Trái Đất nguội dần, hình thành vỏ và đại dương. Mặt Trăng ra đời sau một vụ va chạm khổng lồ với một thiên thể cỡ Sao Hỏa.'},
  {year:'10 tỷ năm', when:'sau Big Bang', name:'Sự sống đầu tiên', title:'Những tế bào đầu tiên', desc:'Trong đại dương nguyên thủy, các phân tử tự nhân bản xuất hiện. Sự sống đơn giản bắt đầu hành trình tiến hóa dài 3,8 tỷ năm.'},
  {year:'13,8 tỷ năm', when:'sau Big Bang', name:'Hôm nay', title:'Bạn đang ở đây', desc:'Vũ trụ vẫn đang giãn nở. Bạn là kết quả của 13,8 tỷ năm tiến hóa vật chất — và là một phần của vũ trụ đang tự quan sát chính mình.'}
];

const STAGES = [
  {time:'t = 0', temp:'~10³² K', state:'Điểm kỳ dị', label:'ĐIỂM KỲ DỊ · t = 0',
   note:'<b>Mọi thứ bắt đầu.</b> Toàn bộ vật chất, năng lượng, không gian và thời gian bị nén vào một điểm có mật độ vô hạn. Các định luật vật lý quen thuộc chưa thể mô tả khoảnh khắc này.'},
  {time:'10⁻³⁶ giây', temp:'~10²⁷ K', state:'Giãn nở phi mã', label:'LẠM PHÁT · 10⁻³⁶ GIÂY',
   note:'<b>Vũ trụ phình ra.</b> Trong một phần nhỏ của giây, không gian giãn nở nhanh hơn ánh sáng, làm vũ trụ phẳng và đồng đều. Những dao động lượng tử bị phóng to thành hạt giống của các thiên hà sau này.'},
  {time:'3 phút', temp:'~3.000 K', state:'Đục như sương mù', label:'VŨ TRỤ TỐI · 3 PHÚT',
   note:'<b>Vũ trụ nguội dần.</b> Proton và neutron kết hợp thành hạt nhân hydro, heli và một ít liti. Plasma nóng khiến ánh sáng bị tán xạ liên tục — vũ trụ khi ấy đục như sương mù.'},
  {time:'380.000 năm', temp:'~3.000 K', state:'Trong suốt', label:'ÁNH SÁNG ĐẦU TIÊN · 380.000 NĂM',
   note:'<b>Ánh sáng được giải phóng.</b> Electron kết hợp với hạt nhân, vũ trụ trở nên trong suốt. Ánh sáng đầu tiên thoát ra và vẫn đang lan truyền — chúng ta thấy nó dưới dạng bức xạ nền vi sóng CMB.'}
];

/* ---------------- helpers ---------------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const clamp = (v,a,b) => Math.max(a, Math.min(b, v));
const lerp = (a,b,t) => a + (b-a)*t;
const pad2 = n => String(n).padStart(2,'0');
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------------- starfield ---------------- */
const starCanvas = $('#stars');
const sctx = starCanvas.getContext('2d');
let stars = [], meteors = [], meteorAt = 4, DPR = 1, SW = 0, SH = 0;
function initStars(){
  DPR = Math.min(devicePixelRatio || 1, 2);
  SW = innerWidth; SH = innerHeight;
  starCanvas.width = SW*DPR; starCanvas.height = SH*DPR;
  sctx.setTransform(DPR,0,0,DPR,0,0);
  const count = Math.round(SW*SH/7000);
  stars = Array.from({length: count}, () => ({
    x: Math.random()*SW, y: Math.random()*SH,
    r: Math.random()*1.25 + .25,
    z: Math.random()*.8 + .2,
    p: Math.random()*Math.PI*2,
    s: Math.random()*.8 + .25,
    warm: Math.random() < .12,
    cool: Math.random() < .22
  }));
}
function drawStars(t, dt){
  sctx.clearRect(0,0,SW,SH);
  for (const s of stars){
    const tw = .45 + .55*Math.abs(Math.sin(t*s.s + s.p));
    s.y += dt * 1.6 * s.z;
    if (s.y > SH+2){ s.y = -2; s.x = Math.random()*SW; }
    const hue = s.warm ? 38 : 218;
    const sat = s.warm ? 70 : 32;
    const lig = s.warm ? 80 : 90;
    sctx.beginPath();
    sctx.fillStyle = `hsla(${hue},${sat}%,${lig}%,${tw*.85*s.z})`;
    sctx.arc(s.x, s.y, s.r, 0, 7);
    sctx.fill();
    if (s.r > 1.15 && tw > .9){
      sctx.strokeStyle = `rgba(190,215,255,${tw*.18})`;
      sctx.lineWidth = .6;
      sctx.beginPath();
      sctx.moveTo(s.x-3.2,s.y); sctx.lineTo(s.x+3.2,s.y);
      sctx.moveTo(s.x,s.y-3.2); sctx.lineTo(s.x,s.y+3.2);
      sctx.stroke();
    }
  }
  meteorAt -= dt;
  if (meteorAt <= 0){
    meteorAt = 8 + Math.random()*10;
    meteors.push({x: Math.random()*SW*.8, y: -40, vx: 150+Math.random()*140, vy: 220+Math.random()*160, life: 1});
  }
  for (let i = meteors.length-1; i >= 0; i--){
    const m = meteors[i];
    m.x += m.vx*dt; m.y += m.vy*dt; m.life -= dt*.55;
    if (m.life <= 0 || m.y > SH+60 || m.x > SW+60){ meteors.splice(i,1); continue; }
    const g = sctx.createLinearGradient(m.x, m.y, m.x-m.vx*.09, m.y-m.vy*.09);
    g.addColorStop(0, `rgba(220,235,255,${.55*m.life})`);
    g.addColorStop(1, 'rgba(220,235,255,0)');
    sctx.strokeStyle = g; sctx.lineWidth = 1.4;
    sctx.beginPath(); sctx.moveTo(m.x,m.y); sctx.lineTo(m.x-m.vx*.09, m.y-m.vy*.09); sctx.stroke();
  }
}
initStars();

/* ---------------- procedural textures ---------------- */
const cssCache = new Map();
const threeTexCache = new Map();
function hash2(x,y,s){ const n = Math.sin(x*127.1 + y*311.7 + s*57.31)*43758.5453; return n - Math.floor(n); }
function vnoise(x,y,s){
  const xi = Math.floor(x), yi = Math.floor(y), xf = x-xi, yf = y-yi;
  const u = xf*xf*(3-2*xf), v = yf*yf*(3-2*yf);
  const a = hash2(xi,yi,s), b = hash2(xi+1,yi,s), c = hash2(xi,yi+1,s), d = hash2(xi+1,yi+1,s);
  return a + (b-a)*u + (c-a)*v + (a-b-c+d)*u*v;
}
function fbm(x,y,s,oct){
  oct = oct || 3;
  let v = 0, amp = .5, f = 1;
  for (let i=0;i<oct;i++){ v += amp*vnoise(x*f,y*f,s+i*11); f *= 2; amp *= .5; }
  return v;
}
function mix(a,b,t){ return [a[0]+(b[0]-a[0])*t, a[1]+(b[1]-a[1])*t, a[2]+(b[2]-a[2])*t]; }
function mulberry(a){
  return function(){
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
function craters(ctx, W, H, n, seed){
  const rnd = mulberry(seed);
  for (let i=0;i<n;i++){
    const x = rnd()*W, y = rnd()*H, r = 2 + rnd()*rnd()*15;
    const g = ctx.createRadialGradient(x-r*.25, y-r*.25, r*.1, x, y, r);
    g.addColorStop(0, 'rgba(255,255,255,.10)');
    g.addColorStop(.55, 'rgba(0,0,0,0)');
    g.addColorStop(.82, 'rgba(0,0,0,.26)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(x,y,r,0,7); ctx.fill();
  }
}
const seeds = {mercury:1,venus:2,mars:3,jupiter:4,saturn:5,uranus:6,neptune:7,sun:8,ceres:9,vesta:10,psyche:11};
function buildTexture(key){
  if (cssCache.has(key)) return cssCache.get(key);
  if (key === 'earth'){
    const entry = {url:'assets/img/earth.jpg', canvas:null};
    cssCache.set(key, entry);
    return entry;
  }
  const W = 384, H = 192;
  const c = document.createElement('canvas'); c.width = W; c.height = H;
  const ctx = c.getContext('2d');
  const img = ctx.createImageData(W,H);
  const d = img.data;
  const seed = seeds[key] || 1;

  for (let y=0;y<H;y++){
    const v = y/H;
    for (let x=0;x<W;x++){
      const u = x/W;
      const n = fbm(u*7, v*4, seed);
      let col;
      if (key === 'mercury'){
        const g = .58 + .5*fbm(u*13, v*9, seed+2);
        col = [128*g, 122*g, 112*g];
      } else if (key === 'venus'){
        const s = Math.sin(v*Math.PI*9 + fbm(u*5,v*3,seed)*7);
        col = mix([196,138,74],[242,210,152], clamp(.5+.5*s + .25*n,0,1));
      } else if (key === 'mars'){
        const dark = fbm(u*6,v*5,seed+4);
        col = mix([132,62,42],[196,104,64], clamp(dark*1.4,0,1));
        const pole = Math.max(0, Math.min(1, (Math.abs(v-.5)-.405)/.06));
        col = mix(col,[238,236,232], pole*.9);
      } else if (key === 'jupiter'){
        const swirl = fbm(u*4, v*14, seed+3);
        const band = Math.sin(v*Math.PI*26 + swirl*7);
        const pal = [[150,100,72],[206,168,126],[238,220,188],[178,128,92],[244,232,206]];
        const t = clamp(.5+.5*band + (n-.5)*.35, 0, .999);
        const f = t*(pal.length-1), i = Math.floor(f);
        col = mix(pal[i], pal[Math.min(pal.length-1,i+1)], f-i);
      } else if (key === 'saturn'){
        const swirl = fbm(u*4, v*12, seed+5);
        const band = Math.sin(v*Math.PI*18 + swirl*5);
        const pal = [[206,180,132],[232,214,174],[246,236,206],[196,168,120]];
        const t = clamp(.5+.5*band + (n-.5)*.25, 0, .999);
        const f = t*(pal.length-1), i = Math.floor(f);
        col = mix(pal[i], pal[Math.min(pal.length-1,i+1)], f-i);
      } else if (key === 'uranus'){
        const band = Math.sin(v*Math.PI*6 + n*1.4);
        col = mix([128,206,212],[178,235,238], clamp(.5+.5*band*.5 + .2*n,0,1));
      } else if (key === 'neptune'){
        const band = Math.sin(v*Math.PI*8 + fbm(u*3,v*4,seed)*4);
        col = mix([36,72,168],[74,126,232], clamp(.5+.5*band*.6 + .25*n,0,1));
      } else if (key === 'sun'){
        const t = fbm(u*8,v*8,seed+1);
        col = mix([255,142,38],[255,226,132], clamp(.25+t*.9,0,1));
      } else if (key === 'ceres'){
        const g = .55 + .55*fbm(u*11,v*8,seed+2);
        col = [132*g, 126*g, 118*g];
      } else if (key === 'vesta'){
        const g = .5 + .6*fbm(u*10,v*8,seed+6);
        col = [150*g, 120*g, 98*g];
      } else if (key === 'psyche'){
        const g = .45 + .65*fbm(u*12,v*9,seed+7);
        col = [118*g, 112*g, 106*g];
      } else {
        col = [180,180,180];
      }
      const o = (y*W+x)*4;
      d[o] = col[0]; d[o+1] = col[1]; d[o+2] = col[2]; d[o+3] = 255;
    }
  }
  ctx.putImageData(img,0,0);

  if (key === 'jupiter'){
    const g = ctx.createRadialGradient(W*.68,H*.64,2,W*.68,H*.64,28);
    g.addColorStop(0,'rgba(206,104,72,.95)');
    g.addColorStop(.6,'rgba(186,88,62,.65)');
    g.addColorStop(1,'rgba(186,88,62,0)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(W*.68,H*.64,30,15,0,0,7); ctx.fill();
  }
  if (key === 'neptune'){
    const g = ctx.createRadialGradient(W*.62,H*.62,2,W*.62,H*.62,26);
    g.addColorStop(0,'rgba(12,28,80,.85)');
    g.addColorStop(1,'rgba(12,28,80,0)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(W*.62,H*.62,26,14,0,0,7); ctx.fill();
  }
  if (['mercury','mars','ceres','vesta','psyche'].includes(key)){
    craters(ctx,W,H, key==='mercury'?70:45, seed*97+3);
  }
  const entry = {url:c.toDataURL('image/jpeg',.86), canvas:c};
  cssCache.set(key, entry);
  return entry;
}

let textureLoader = null;
function threeTexture(key){
  if (threeTexCache.has(key)) return threeTexCache.get(key);
  let tex;
  if (key === 'earth'){
    if (!textureLoader) textureLoader = new THREE.TextureLoader();
    tex = textureLoader.load(window.EARTH_IMG || 'assets/img/earth.jpg');
    tex.wrapS = THREE.RepeatWrapping;
  } else {
    tex = new THREE.CanvasTexture(buildTexture(key).canvas);
  }
  if ('colorSpace' in tex) tex.colorSpace = THREE.SRGBColorSpace;
  else if ('encoding' in tex) tex.encoding = THREE.sRGBEncoding;
  tex.anisotropy = 4;
  threeTexCache.set(key, tex);
  return tex;
}
function applyOrbs(){
  $$('[data-orb]').forEach(el => {
    const entry = buildTexture(el.dataset.orb);
    const t = el.querySelector('.tex');
    if (t) t.style.backgroundImage = `url('${entry.url}')`;
  });
}

/* ---------------- navigation ---------------- */
const slides = $$('.slide');
const dotsWrap = $('#dots');
const N = slides.length;
let current = 0;
let activeSceneIdx = null;
const scenes = {};

slides.forEach((s,i) => {
  const b = document.createElement('button');
  b.type = 'button';
  b.dataset.label = s.dataset.title || String(i+1);
  b.setAttribute('aria-label', `Trang ${i+1}: ${s.dataset.title || ''}`);
  if (i === 0) b.classList.add('on');
  b.addEventListener('click', () => go(i));
  dotsWrap.appendChild(b);
});

function go(n){
  n = clamp(n, 0, N-1);
  if (n === current) return;
  const old = slides[current];
  const next = slides[n];
  old.classList.remove('is-active');
  old.classList.add('is-leaving');
  setTimeout(() => old.classList.remove('is-leaving'), 700);
  next.classList.add('is-active');
  next.scrollTop = 0;
  current = n;

  $$('.dots button').forEach((d,i) => d.classList.toggle('on', i === n));
  $('#cur-num').textContent = pad2(n+1);
  $('#progress-fill').style.width = ((n+1)/N*100).toFixed(2) + '%';

  if (n === 2) startTimeline(); else stopTimeline();
  if (n === 1) bbResize();

  const def = scenes[n];
  document.body.classList.toggle('scene-active', !!def);
  if (def){
    activeSceneIdx = n;
    if (!def.inited){
      def.inited = true;
      const loading = def.wrap.querySelector('.scene-loading');
      if (loading) loading.style.display = 'flex';
      setTimeout(() => {
        if (current !== n) { def.inited = false; return; }
        try {
          const inst = def.factory();
          def.resize = inst.resize;
          def.frame = inst.frame;
          def.dispose = inst.dispose;
          if (def.wrap) def.wrap.classList.add('ready');
          inst.resize();
        } catch(err){
          console.error(err);
          if (loading) loading.textContent = 'Thiết bị này không hỗ trợ WebGL.';
        }
      }, 60);
    } else if (def.resize){
      def.resize();
    }
  } else {
    activeSceneIdx = null;
  }
  if (n === 9) applyOrbs();
}
function next(){ go(current+1); }
function prev(){ go(current-1); }

addEventListener('keydown', e => {
  if (e.key === 'Escape'){ closeModal(); return; }
  if ($('#modal').classList.contains('on')) return;
  if (['ArrowRight','ArrowDown','PageDown',' '].includes(e.key)){ e.preventDefault(); next(); }
  else if (['ArrowLeft','ArrowUp','PageUp'].includes(e.key)){ e.preventDefault(); prev(); }
  else if (e.key === 'Home'){ e.preventDefault(); go(0); }
  else if (e.key === 'End'){ e.preventDefault(); go(N-1); }
});

let wheelLock = 0;
addEventListener('wheel', e => {
  if ($('#modal').classList.contains('on')) return;
  if (Math.abs(e.deltaY) < 18) return;
  const sl = slides[current];
  if (sl && sl.scrollHeight > sl.clientHeight + 2){
    const atEnd = sl.scrollTop + sl.clientHeight >= sl.scrollHeight - 2;
    const atTop = sl.scrollTop <= 2;
    if ((e.deltaY > 0 && !atEnd) || (e.deltaY < 0 && !atTop)){
      e.preventDefault();
      sl.scrollTop = clamp(sl.scrollTop + e.deltaY, 0, sl.scrollHeight - sl.clientHeight);
      return;
    }
  }
  const now = performance.now();
  if (now - wheelLock < 850) return;
  wheelLock = now;
  if (e.deltaY > 0) next(); else prev();
}, {passive:false});

let touchX = 0, touchY = 0, touchBlocked = false;
addEventListener('touchstart', e => {
  const t = e.changedTouches[0];
  touchX = t.clientX; touchY = t.clientY;
  touchBlocked = !!(e.target.closest && e.target.closest('.planet-bar,.tl-track-wrap,.modal-card'));
}, {passive:true});
addEventListener('touchend', e => {
  if (touchBlocked || $('#modal').classList.contains('on')) return;
  const t = e.changedTouches[0];
  const dx = t.clientX - touchX, dy = t.clientY - touchY;
  if (Math.abs(dx) > 52 && Math.abs(dx) > Math.abs(dy)*1.3){ if (dx < 0) next(); else prev(); }
}, {passive:true});

$$('[data-goto]').forEach(b => b.addEventListener('click', () => go(+b.dataset.goto)));

/* ---------------- big bang ---------------- */
const bbCanvas = $('#bb-canvas');
const bbCtx = bbCanvas.getContext('2d');
let bbT = 0, bbStage = 0, bbParticles = [], bbW = 0, bbH = 0, bbDpr = 1;
let bbFactor = 1, bbTargetFactor = 1;

function bbResize(){
  const r = bbCanvas.parentElement.getBoundingClientRect();
  if (!r.width || !r.height) return;
  bbDpr = Math.min(devicePixelRatio || 1, 2);
  bbW = r.width; bbH = r.height;
  bbCanvas.width = bbW*bbDpr; bbCanvas.height = bbH*bbDpr;
  bbCtx.setTransform(bbDpr,0,0,bbDpr,0,0);
  if (!bbParticles.length) bbMake();
}
function bbMake(){
  const n = 300;
  bbParticles = Array.from({length: n}, (_, i) => ({
    a: Math.random()*Math.PI*2,
    sp: .18 + Math.pow(Math.random(), .7)*.95,
    sz: .5 + Math.random()*1.7,
    off: Math.random()*6.28,
    hue: i % 9 === 0 ? 25 : (i % 5 === 0 ? 210 : 0)
  }));
}
function setStage(i){
  bbStage = i;
  const s = STAGES[i];
  $('#bb-time').textContent = s.time;
  $('#bb-temp').textContent = s.temp;
  $('#bb-state').textContent = s.state;
  $('#bb-note').innerHTML = s.note;
  $('#bb-core-label').textContent = s.label;
  $$('.stage-btn').forEach(b => {
    const on = +b.dataset.stage === i;
    b.classList.toggle('on', on);
    b.setAttribute('aria-selected', on ? 'true' : 'false');
  });
  bbTargetFactor = [0.035, 1, 0.72, 0.95][i];
  bbT = 0;
}
function bbReset(){
  bbT = 0;
  bbFactor = bbTargetFactor = [0.035, 1, 0.72, 0.95][bbStage];
}
$$('.stage-btn').forEach(b => b.addEventListener('click', () => setStage(+b.dataset.stage)));

function bbDraw(dt){
  bbT += dt;
  bbFactor = lerp(bbFactor, bbTargetFactor, Math.min(1, dt*1.6));
  const w = bbW, h = bbH;
  if (!w || !h) return;
  bbCtx.globalCompositeOperation = 'source-over';
  bbCtx.fillStyle = 'rgba(4,5,14,.26)';
  bbCtx.fillRect(0,0,w,h);
  bbCtx.globalCompositeOperation = 'lighter';

  const cx = w*.5, cy = h*.52, maxR = Math.min(w,h)*.46;
  const palette = [
    ['rgba(180,225,255,', 'rgba(255,255,255,'],
    ['rgba(170,205,255,', 'rgba(255,238,210,'],
    ['rgba(255,150,80,', 'rgba(255,210,130,'],
    ['rgba(170,205,255,', 'rgba(255,245,225,']
  ][bbStage];

  const coreR = bbStage === 0 ? 5 + Math.sin(bbT*5)*1.6 : (14 + Math.sin(bbT*1.6)*3) * (1 + (1-bbFactor)*.4);
  const g = bbCtx.createRadialGradient(cx,cy,0,cx,cy,coreR*7);
  g.addColorStop(0, palette[1] + '.95)');
  g.addColorStop(.16, palette[0] + '.55)');
  g.addColorStop(.45, palette[0] + '.12)');
  g.addColorStop(1, palette[0] + '0)');
  bbCtx.fillStyle = g;
  bbCtx.beginPath(); bbCtx.arc(cx,cy,coreR*7,0,7); bbCtx.fill();

  if (bbStage === 1 || bbStage === 3){
    for (let k=0;k<3;k++){
      const p = ((bbT*.26 + k/3) % 1);
      const rr = maxR * p * bbFactor;
      bbCtx.strokeStyle = palette[0] + (0.16*(1-p)) + ')';
      bbCtx.lineWidth = 1;
      bbCtx.beginPath(); bbCtx.arc(cx,cy,rr,0,7); bbCtx.stroke();
    }
  }
  for (const p of bbParticles){
    const wob = 1 + Math.sin(bbT*.6 + p.off)*.045;
    const r = maxR * p.sp * bbFactor * wob;
    const x = cx + Math.cos(p.a)*r, y = cy + Math.sin(p.a)*r*.92;
    const c = p.hue === 25 ? 'rgba(255,196,120,' : (p.hue === 210 ? 'rgba(150,195,255,' : 'rgba(226,238,255,');
    const a = bbStage === 0 ? .15 : clamp(.8 - r/maxR*.55, .12, .85);
    bbCtx.fillStyle = c + a + ')';
    bbCtx.beginPath(); bbCtx.arc(x,y,p.sz*(1+bbFactor*.25),0,7); bbCtx.fill();
  }
  bbCtx.globalCompositeOperation = 'source-over';
}

/* ---------------- timeline ---------------- */
const tlNodes = $('#tl-nodes');
TIMELINE.forEach((ev,i) => {
  const b = document.createElement('button');
  b.className = 'tl-node';
  b.type = 'button';
  b.dataset.i = i;
  b.innerHTML = `<span class="dot"></span><span class="tl-time">${ev.year}</span><span class="tl-name">${ev.name}</span>`;
  b.addEventListener('click', () => {
    tlUser = true; stopTimeline(); setTl(i);
    $('#tl-play').textContent = 'Tự động phát · TẮT';
  });
  tlNodes.appendChild(b);
});
let tlIdx = 0, tlTimer = null, tlUser = false;
function setTl(i){
  tlIdx = i;
  const ev = TIMELINE[i];
  const detail = $('#tl-detail');
  detail.style.transition = 'opacity .2s, transform .2s';
  detail.style.opacity = '.15';
  detail.style.transform = 'translateY(6px)';
  setTimeout(() => {
    $('#tl-year').innerHTML = `${ev.year}<small>${ev.when}</small>`;
    $('#tl-title').textContent = ev.title;
    $('#tl-desc').textContent = ev.desc;
    detail.style.transition = 'opacity .45s, transform .45s';
    detail.style.opacity = '1';
    detail.style.transform = 'none';
  }, 110);
  $('#tl-fill').style.width = (i/(TIMELINE.length-1)*100) + '%';
  $$('.tl-node').forEach((n,k) => {
    n.classList.toggle('on', k === i);
    n.classList.toggle('done', k < i);
  });
}
function startTimeline(){
  setTl(tlIdx);
  if (!tlTimer && !tlUser && !reduceMotion){
    tlTimer = setInterval(() => {
      tlIdx = (tlIdx + 1) % TIMELINE.length;
      setTl(tlIdx);
    }, 4200);
  }
}
function stopTimeline(){ if (tlTimer){ clearInterval(tlTimer); tlTimer = null; } }
$('#tl-play').addEventListener('click', () => {
  tlUser = !tlUser;
  $('#tl-play').textContent = 'Tự động phát · ' + (tlUser ? 'TẮT' : 'BẬT');
  if (tlUser) stopTimeline();
  else { tlUser = false; startTimeline(); }
});

/* ---------------- cards + bar ---------------- */
const giants = ['jupiter','saturn','uranus','neptune'];
function renderCards(keys, target){
  const wrap = $(target);
  keys.forEach((key, i) => {
    const d = DATA[key];
    const el = document.createElement('article');
    el.className = 'planet-card reveal';
    el.style.setProperty('--d', (.18 + i*.07) + 's');
    el.dataset.planet = key;
    el.tabIndex = 0;
    el.setAttribute('role','button');
    el.setAttribute('aria-label', `Khám phá ${d.name}`);
    const stat2Label = giants.includes(key) ? 'Một ngày' : 'Một năm';
    const stat2Value = giants.includes(key) ? d.stats[2][1] : d.stats[3][1];
    el.innerHTML = `
      <div class="pc-top"><span class="pc-num">${pad2(i+1)}</span><span class="pc-type">${d.type}</span></div>
      <div class="orb-wrap${key==='saturn'?' has-ring':''}">
        <div class="orb" data-orb="${key}"><span class="tex"></span></div>
      </div>
      <h3>${d.name}</h3>
      <p class="pc-en">${d.en}</p>
      <div class="pc-stats">
        <span>Đường kính</span><b>${d.stats[0][1]}</b>
        <span>${stat2Label}</span><b>${stat2Value}</b>
      </div>
      <div class="pc-go">Khám phá <span>→</span></div>`;
    el.addEventListener('click', () => openInfo(key));
    el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' '){ e.preventDefault(); openInfo(key); } });
    wrap.appendChild(el);
  });
}
renderCards(['mercury','venus','earth','mars'], '#rocky-grid');
renderCards(['jupiter','saturn','uranus','neptune'], '#giant-grid');

const bar = $('#planet-bar');
['sun', ...seq.slice(0,8)].forEach(key => {
  const d = DATA[key];
  const b = document.createElement('button');
  b.className = 'pchip' + (key === 'sun' ? ' sun' : '');
  b.type = 'button';
  b.dataset.planet = key;
  b.innerHTML = `<i style="--c:${d.color}"></i>${key === 'sun' ? 'Mặt Trời' : d.name}`;
  b.addEventListener('click', () => openInfo(key));
  bar.appendChild(b);
});
$$('.hud .pchip[data-planet]').forEach(b => b.addEventListener('click', () => openInfo(b.dataset.planet)));

/* ---------------- modal ---------------- */
const modal = $('#modal');
let modalKey = null;
function openInfo(key){
  const d = DATA[key];
  if (!d) return;
  modalKey = key;
  $('#m-type').textContent = d.type;
  $('#m-name').textContent = d.name;
  $('#m-en').textContent = d.en;
  $('#m-tag').textContent = d.tag;
  $('#m-desc').textContent = d.desc;
  $('#m-fact').textContent = d.fact;
  $('#m-grid').innerHTML = d.stats.map(([k,v]) => `<div class="m-stat"><span>${k}</span><b>${v}</b></div>`).join('');
  const entry = buildTexture(key);
  $('#m-tex').style.backgroundImage = `url('${entry.url}')`;
  const orb = $('#m-orb');
  orb.style.boxShadow = key === 'sun'
    ? 'inset -20px -16px 50px rgba(120,40,0,.5), inset 8px 8px 40px rgba(255,240,180,.5), 0 0 100px rgba(255,170,60,.55)'
    : 'inset -30px -24px 60px rgba(0,0,0,.82), inset 8px 8px 40px rgba(255,255,255,.1), 0 0 80px rgba(100,150,255,.25)';
  modal.classList.add('on');
  document.body.classList.add('modal-open');
  $('#m-close').focus({preventScroll:true});
}
function closeModal(){
  if (!modal.classList.contains('on')) return;
  modal.classList.remove('on');
  document.body.classList.remove('modal-open');
  modalKey = null;
}
$('#m-close').addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
$('#m-prev').addEventListener('click', () => stepModal(-1));
$('#m-next').addEventListener('click', () => stepModal(1));
function stepModal(dir){
  if (!modalKey) return;
  const i = seq.indexOf(modalKey);
  if (i < 0){ openInfo(seq[dir > 0 ? 0 : seq.length-1]); return; }
  openInfo(seq[(i + dir + seq.length) % seq.length]);
}

/* ---------------- shared three.js ---------------- */
function makeRenderer(canvas){
  const r = new THREE.WebGLRenderer({canvas, antialias:true, alpha:true, powerPreference:'high-performance'});
  r.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
  if ('outputColorSpace' in r) r.outputColorSpace = THREE.SRGBColorSpace;
  else if ('outputEncoding' in r) r.outputEncoding = THREE.sRGBEncoding;
  r.setClearColor(0x000000, 0);
  return r;
}
const tip = $('#hover-tip');
function showTip(text, x, y){
  tip.textContent = text;
  tip.style.left = x + 'px';
  tip.style.top = y + 'px';
  tip.classList.add('on');
}
function hideTip(){ tip.classList.remove('on'); }

function attachDrag(el, onChange){
  let down = false, sx = 0, sy = 0, moved = 0;
  el.addEventListener('pointerdown', e => {
    down = true; sx = e.clientX; sy = e.clientY; moved = 0;
    if (el.setPointerCapture) el.setPointerCapture(e.pointerId);
  });
  el.addEventListener('pointermove', e => {
    if (!down) return;
    const dx = e.clientX - sx, dy = e.clientY - sy;
    moved += Math.abs(dx) + Math.abs(dy);
    sx = e.clientX; sy = e.clientY;
    onChange(dx, dy, e);
  });
  const up = () => { down = false; };
  el.addEventListener('pointerup', up);
  el.addEventListener('pointercancel', up);
  el.addEventListener('pointerleave', up);
  return { get moved(){ return moved; }, get down(){ return down; } };
}

function registerScene(idx, wrap, factory){ scenes[idx] = {wrap, factory, inited:false}; }

/* ---------------- master loop ---------------- */
let last = performance.now();
function tick(now){
  const dt = Math.min((now - last)/1000, .05);
  last = now;
  const t = now/1000;
  drawStars(t, dt);
  if (current === 1) bbDraw(dt);
  const s = scenes[activeSceneIdx];
  if (s && s.frame) s.frame(dt, t);
  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);

addEventListener('resize', () => {
  initStars();
  bbResize();
  const s = scenes[activeSceneIdx];
  if (s && s.resize) s.resize();
});

/* init */
addEventListener('load', () => {
  bbResize();
  applyOrbs();
  $('#progress-fill').style.width = (1/N*100).toFixed(2) + '%';
});

window.UNIVERSE = {
  DATA, seq, go, next, prev, openInfo, closeModal,
  threeTexture, makeRenderer, showTip, hideTip, attachDrag, clamp, lerp,
  registerScene, reduceMotion,
  get current(){ return current; },
  get scenes(){ return scenes; }
};
})();
