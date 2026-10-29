(() => {
'use strict';
const U = window.UNIVERSE;
const { THREE } = window;
const { DATA, clamp, lerp, reduceMotion } = U;
const $ = s => document.querySelector(s);

let sharedGL = null;
function setup(){
  if (!sharedGL){
    const canvas = $('#gl-stage');
    sharedGL = { canvas, renderer: U.makeRenderer(canvas) };
    canvas.addEventListener('webglcontextrestored', () => {
      setTimeout(() => {
        const w = canvas.clientWidth || innerWidth, h = canvas.clientHeight || innerHeight;
        sharedGL.renderer.setSize(1, 1, false);
        sharedGL.renderer.setSize(w, h, false);
        sharedGL.renderer.setViewport(0, 0, w, h);
      }, 0);
    });
  }
  const { canvas, renderer } = sharedGL;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, .1, 4000);
  return { canvas, renderer, scene, camera };
}
function fit(wrap, renderer, camera){
  const r = wrap.getBoundingClientRect();
  if (!r.width || !r.height) return;
  renderer.setSize(r.width, r.height, false);
  camera.aspect = r.width / r.height;
  camera.updateProjectionMatrix();
}

/* ================= SOLAR SYSTEM ================= */
function createSolar(){
  const wrap = $('#solar-scene');
  const isActive = () => wrap.closest('.slide').classList.contains('is-active');
  const { canvas, renderer, scene, camera } = setup();
  scene.add(new THREE.AmbientLight(0x9fb6ff, .5));
  const sunLight = new THREE.PointLight(0xffe4ba, 2.4, 0, 0);
  scene.add(sunLight);

  const cam = { theta: .34, phi: 1.02, r: 118 };
  function updateCamera(){
    const x = cam.r * Math.sin(cam.phi) * Math.sin(cam.theta);
    const y = cam.r * Math.cos(cam.phi);
    const z = cam.r * Math.sin(cam.phi) * Math.cos(cam.theta);
    camera.position.set(x, y, z);
    camera.lookAt(0, 0, 0);
    camera.updateMatrixWorld();
  }

  const clickables = [];
  const planets = [];

  const sunMesh = new THREE.Mesh(
    new THREE.SphereGeometry(6.4, 48, 32),
    new THREE.MeshBasicMaterial({ map: U.threeTexture('sun') })
  );
  sunMesh.userData.key = 'sun';
  scene.add(sunMesh);
  clickables.push(sunMesh);

  const glowC = document.createElement('canvas');
  glowC.width = glowC.height = 256;
  const gc = glowC.getContext('2d');
  const gg = gc.createRadialGradient(128,128,0,128,128,128);
  gg.addColorStop(0, 'rgba(255,244,214,1)');
  gg.addColorStop(.22, 'rgba(255,206,120,.65)');
  gg.addColorStop(.5, 'rgba(255,150,50,.18)');
  gg.addColorStop(1, 'rgba(255,120,30,0)');
  gc.fillStyle = gg; gc.fillRect(0,0,256,256);
  const glow = new THREE.Sprite(new THREE.SpriteMaterial({
    map: new THREE.CanvasTexture(glowC), blending: THREE.AdditiveBlending,
    depthWrite: false, transparent: true
  }));
  glow.scale.set(44,44,1);
  scene.add(glow);

  const config = [
    ['mercury', .62, 11.5, .32, .10],
    ['venus', 1.0, 15.2, .25, -.06],
    ['earth', 1.08, 19.2, .20, 0],
    ['mars', .8, 23.2, .16, .08],
    ['jupiter', 3.3, 33.5, .085, .04],
    ['saturn', 2.8, 43.2, .062, -.10],
    ['uranus', 1.85, 52.2, .045, .06],
    ['neptune', 1.8, 60.2, .036, -.05]
  ];

  config.forEach(([key, radius, orbit, speed, inc]) => {
    const group = new THREE.Group();
    group.rotation.x = inc;
    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(1, 40, 28),
      new THREE.MeshStandardMaterial({ map: U.threeTexture(key), roughness: .95, metalness: 0 })
    );
    mesh.scale.setScalar(radius);
    mesh.userData.key = key;
    group.add(mesh);

    if (key === 'saturn'){
      const rc = document.createElement('canvas');
      rc.width = rc.height = 256;
      const rx = rc.getContext('2d');
      for (let i=0;i<256;i++){
        const rr = i/256;
        if (rr < .36 || rr > .95) continue;
        let a = .16 + .42*Math.abs(Math.sin(rr*36));
        if (rr > .74 && rr < .8) a *= .2;
        if (rr > .86) a *= .6;
        rx.strokeStyle = `rgba(238,220,180,${a})`;
        rx.lineWidth = 1.2;
        rx.beginPath(); rx.arc(128,128,i,0,7); rx.stroke();
      }
      const rtex = new THREE.CanvasTexture(rc);
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(1.42, 2.55, 96),
        new THREE.MeshBasicMaterial({ map: rtex, transparent: true, side: THREE.DoubleSide, opacity: .92, depthWrite: false })
      );
      ring.rotation.x = -Math.PI/2;
      group.add(ring);
      group.rotation.z = .28;
    }
    scene.add(group);
    planets.push({ key, group, mesh, radius, orbit, speed, angle: Math.random()*Math.PI*2, hover: 1 });
    clickables.push(mesh);
  });

  const orbitMat = new THREE.LineBasicMaterial({ color: 0x7f9fe0, transparent: true, opacity: .16 });
  config.forEach(([, , orbit, , inc]) => {
    const pts = [];
    for (let i=0;i<=160;i++){
      const a = i/160*Math.PI*2;
      pts.push(new THREE.Vector3(Math.cos(a)*orbit, 0, Math.sin(a)*orbit));
    }
    const line = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(pts), orbitMat);
    line.rotation.x = inc;
    scene.add(line);
  });

  const dustGeo = new THREE.BufferGeometry();
  const dn = 650, dp = new Float32Array(dn*3);
  for (let i=0;i<dn;i++){
    const r = 70 + Math.random()*150, a = Math.random()*Math.PI*2, y = (Math.random()-.5)*150;
    dp[i*3] = Math.cos(a)*r; dp[i*3+1] = y; dp[i*3+2] = Math.sin(a)*r;
  }
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dp,3));
  scene.add(new THREE.Points(dustGeo, new THREE.PointsMaterial({
    color: 0x8fa8e0, size: .4, transparent: true, opacity: .55, depthWrite: false
  })));

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let hovered = null;
  const drag = U.attachDrag(canvas, (dx, dy) => {
    if (!isActive()) return;
    cam.theta -= dx*.0045;
    cam.phi = clamp(cam.phi + dy*.003, .5, 1.4);
  });

  function pick(e){
    const r = canvas.getBoundingClientRect();
    pointer.x = ((e.clientX - r.left)/r.width)*2 - 1;
    pointer.y = -((e.clientY - r.top)/r.height)*2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(clickables, false);
    return hits.length ? hits[0].object.userData.key : null;
  }
  canvas.addEventListener('pointermove', e => {
    if (!isActive()) return;
    if (drag.down){ U.hideTip(); return; }
    const key = pick(e);
    hovered = key;
    if (key){
      canvas.style.cursor = 'pointer';
      U.showTip(DATA[key].name, e.clientX, e.clientY);
    } else {
      canvas.style.cursor = 'grab';
      U.hideTip();
    }
  });
  canvas.addEventListener('pointerleave', () => { U.hideTip(); hovered = null; });
  canvas.addEventListener('pointerup', e => {
    if (!isActive()) return;
    if (drag.moved > 14) return;
    const key = pick(e);
    if (key) U.openInfo(key);
  });

  updateCamera();
  const clock = new THREE.Clock();
  let time = 0;
  return {
    resize(){ fit(wrap, renderer, camera); },
    frame(dt){
      time += dt;
      if (!drag.down && !reduceMotion) cam.theta += dt*.016;
      planets.forEach(p => {
        p.angle += p.speed*dt;
        p.group.position.set(Math.cos(p.angle)*p.orbit, 0, Math.sin(p.angle)*p.orbit);
        p.mesh.rotation.y += dt*.35;
        const target = hovered === p.key ? 1.16 : 1;
        p.hover = lerp(p.hover, target, .12);
        p.mesh.scale.setScalar(p.radius*p.hover);
      });
      sunMesh.rotation.y += dt*.05;
      glow.scale.setScalar(44 + Math.sin(time*1.2)*1.6);
      updateCamera();
      renderer.render(scene, camera);
    }
  };
}

/* ================= ASTEROID BELT ================= */
function createBelt(){
  const wrap = $('#belt-scene');
  const isActive = () => wrap.closest('.slide').classList.contains('is-active');
  const { canvas, renderer, scene, camera } = setup();
  camera.position.set(0, 17, 46);
  camera.fov = 48;
  camera.updateProjectionMatrix();
  camera.lookAt(0, 0, 0);
  camera.updateMatrixWorld();
  scene.add(new THREE.AmbientLight(0x93a8dd, .75));
  const dir = new THREE.DirectionalLight(0xffe2bd, 2.2);
  dir.position.set(14, 22, 18);
  scene.add(dir);
  const rim = new THREE.DirectionalLight(0x5f7fff, 1.2);
  rim.position.set(-18, -6, -16);
  scene.add(rim);

  const belt = new THREE.Group();
  scene.add(belt);

  const COUNT = 900;
  const geo = new THREE.IcosahedronGeometry(1, 0);
  const mat = new THREE.MeshStandardMaterial({ color: 0x8d857a, roughness: 1, metalness: .05, flatShading: true });
  const inst = new THREE.InstancedMesh(geo, mat, COUNT);
  const dummy = new THREE.Object3D();
  const color = new THREE.Color();
  const rnd = (a,b) => a + Math.random()*(b-a);
  for (let i=0;i<COUNT;i++){
    const a = Math.random()*Math.PI*2;
    const r = rnd(18.5, 27);
    const y = (Math.random()-.5)*(1.1 + Math.random()*1.6);
    dummy.position.set(Math.cos(a)*r, y, Math.sin(a)*r);
    dummy.rotation.set(Math.random()*6, Math.random()*6, Math.random()*6);
    const s = .05 + Math.pow(Math.random(), 2.4)*.42;
    dummy.scale.set(s*rnd(.7,1.4), s*rnd(.6,1.15), s*rnd(.7,1.4));
    dummy.updateMatrix();
    inst.setMatrixAt(i, dummy.matrix);
    color.setHSL(.09, .12, rnd(.22, .48));
    inst.setColorAt(i, color);
  }
  belt.add(inst);

  const dustGeo = new THREE.BufferGeometry();
  const dn = 600, dp = new Float32Array(dn*3);
  for (let i=0;i<dn;i++){
    const a = Math.random()*Math.PI*2, r = 18 + Math.random()*10;
    dp[i*3] = Math.cos(a)*r;
    dp[i*3+1] = (Math.random()-.5)*4;
    dp[i*3+2] = Math.sin(a)*r;
  }
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dp,3));
  belt.add(new THREE.Points(dustGeo, new THREE.PointsMaterial({ color:0xb9a88f, size:.12, transparent:true, opacity:.5, depthWrite:false })));

  const named = [];
  const defs = [
    ['ceres', 1.35, 0.7, 1],
    ['vesta', .88, 1.7, .12],
    ['psyche', .72, 4.3, .08]
  ];
  defs.forEach(([key, scale, angle, spin]) => {
    const m = new THREE.Mesh(
      new THREE.SphereGeometry(1, 32, 22),
      new THREE.MeshStandardMaterial({ map: U.threeTexture(key), roughness: .98, metalness: key === 'psyche' ? .45 : 0 })
    );
    const a = angle, r = 22 + (key === 'ceres' ? 0 : key === 'vesta' ? 1.5 : -2.2);
    m.position.set(Math.cos(a)*r, key === 'ceres' ? .8 : -.4, Math.sin(a)*r);
    m.scale.setScalar(scale);
    m.userData.key = key;
    belt.add(m);
    named.push({ key, mesh: m, scale, spin });
  });

  const labelsWrap = $('#belt-labels');
  const labels = named.map(n => {
    const el = document.createElement('button');
    el.className = 'belt-label';
    el.type = 'button';
    el.textContent = DATA[n.key].name;
    el.style.opacity = '0';
    el.style.pointerEvents = 'none';
    el.tabIndex = -1;
    el.addEventListener('click', e => { e.stopPropagation(); U.openInfo(n.key); });
    labelsWrap.appendChild(el);
    return el;
  });

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const v = new THREE.Vector3();
  let hovered = null;
  const drag = U.attachDrag(canvas, (dx, dy) => {
    if (!isActive()) return;
    belt.rotation.y += dx*.005;
    belt.rotation.x = clamp(belt.rotation.x + dy*.002, -.32, .32);
  });

  function pick(e){
    const r = canvas.getBoundingClientRect();
    pointer.x = ((e.clientX - r.left)/r.width)*2 - 1;
    pointer.y = -((e.clientY - r.top)/r.height)*2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(named.map(n => n.mesh), false);
    return hits.length ? hits[0].object.userData.key : null;
  }
  canvas.addEventListener('pointermove', e => {
    if (!isActive()) return;
    if (drag.down){ U.hideTip(); return; }
    const key = pick(e);
    hovered = key;
    if (key){
      canvas.style.cursor = 'pointer';
      U.showTip(DATA[key].name, e.clientX, e.clientY);
    } else {
      canvas.style.cursor = 'grab';
      U.hideTip();
    }
  });
  canvas.addEventListener('pointerleave', () => { U.hideTip(); hovered = null; });
  canvas.addEventListener('pointerup', e => {
    if (!isActive()) return;
    if (drag.moved > 14) return;
    const key = pick(e);
    if (key) U.openInfo(key);
  });

  return {
    resize(){ fit(wrap, renderer, camera); },
    frame(dt){
      if (!drag.down && !reduceMotion) belt.rotation.y += dt*.028;
      named.forEach((n, i) => {
        n.mesh.rotation.y += dt*(.3 + n.spin);
        const target = hovered === n.key ? 1.18 : 1;
        n.mesh.scale.setScalar(n.scale * lerp(n.mesh.scale.x/n.scale, target, .12));
        n.mesh.getWorldPosition(v);
        v.project(camera);
        const el = labels[i];
        const x = (v.x*.5 + .5) * wrap.clientWidth;
        const y = (-v.y*.5 + .5) * wrap.clientHeight;
        const outside = v.z > 1 || x < -40 || y < -40 || x > wrap.clientWidth + 40 || y > wrap.clientHeight + 40;
        el.style.opacity = outside ? '0' : '1';
        el.style.pointerEvents = outside ? 'none' : 'auto';
        el.tabIndex = outside ? -1 : 0;
        if (!outside){
          el.style.left = x + 'px';
          el.style.top = y + 'px';
        }
      });
      inst.rotation.y += dt*.02;
      renderer.render(scene, camera);
    }
  };
}

/* ================= GALAXY ================= */
function createGalaxy(){
  const wrap = $('#galaxy-scene');
  const isActive = () => wrap.closest('.slide').classList.contains('is-active');
  const { canvas, renderer, scene, camera } = setup();
  camera.position.set(0, 55, 115);
  camera.lookAt(0, 0, 0);
  camera.updateMatrixWorld();
  camera.fov = 38;
  camera.updateProjectionMatrix();

  const group = new THREE.Group();
  group.rotation.z = .18;
  scene.add(group);

  const COUNT = 34000;
  const pos = new Float32Array(COUNT*3);
  const col = new Float32Array(COUNT*3);
  const cCore = new THREE.Color('#ffe2b0');
  const cMid = new THREE.Color('#8fb2ff');
  const cOut = new THREE.Color('#b98cff');
  const tmp = new THREE.Color();
  const ARMS = 4;
  for (let i=0;i<COUNT;i++){
    const t = Math.pow(Math.random(), .62);
    const r = t * 46;
    const branch = i % ARMS;
    const scatter = (1 - t*.72) * (Math.random()-.5) * (2.2 + t*2.6);
    const angle = branch/ARMS*Math.PI*2 + r*.145 + (Math.random()-.5)*.55;
    const x = Math.cos(angle)*r + scatter + (Math.random()-.5)*1.6;
    const z = Math.sin(angle)*r + scatter + (Math.random()-.5)*1.6;
    const y = (Math.random()-.5) * (4.2*(1-t) + .55) * (Math.random() < .12 ? 2.6 : 1);
    pos[i*3] = x; pos[i*3+1] = y; pos[i*3+2] = z;
    const k = clamp(t, 0, 1);
    if (k < .5) tmp.copy(cCore).lerp(cMid, k*2);
    else tmp.copy(cMid).lerp(cOut, (k-.5)*2);
    tmp.offsetHSL(0, 0, (Math.random()-.5)*.12);
    col[i*3] = tmp.r; col[i*3+1] = tmp.g; col[i*3+2] = tmp.b;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos,3));
  geo.setAttribute('color', new THREE.BufferAttribute(col,3));
  const points = new THREE.Points(geo, new THREE.PointsMaterial({
    size: .34, vertexColors: true, transparent: true, opacity: .92,
    blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true
  }));
  group.add(points);

  const coreC = document.createElement('canvas');
  coreC.width = coreC.height = 256;
  const cc = coreC.getContext('2d');
  const cg = cc.createRadialGradient(128,128,0,128,128,128);
  cg.addColorStop(0, 'rgba(255,248,224,1)');
  cg.addColorStop(.18, 'rgba(255,218,158,.8)');
  cg.addColorStop(.45, 'rgba(255,170,110,.22)');
  cg.addColorStop(1, 'rgba(255,140,80,0)');
  cc.fillStyle = cg; cc.fillRect(0,0,256,256);
  const coreGlow = new THREE.Sprite(new THREE.SpriteMaterial({
    map: new THREE.CanvasTexture(coreC), blending: THREE.AdditiveBlending,
    depthWrite: false, transparent: true
  }));
  coreGlow.scale.set(17, 17, 1);
  group.add(coreGlow);

  const drag = U.attachDrag(canvas, (dx, dy) => {
    if (!isActive()) return;
    group.rotation.y += dx*.0045;
    group.rotation.x = clamp(group.rotation.x + dy*.0025, -.55, .55);
  });
  canvas.addEventListener('pointermove', () => { if (!isActive()) return; if (!drag.down) canvas.style.cursor = 'grab'; });

  return {
    resize(){ fit(wrap, renderer, camera); },
    frame(dt){
      if (!drag.down && !reduceMotion) group.rotation.y += dt*.045;
      coreGlow.scale.setScalar(17 + Math.sin(performance.now()*.0008)*.7);
      renderer.render(scene, camera);
    }
  };
}

/* ================= BLACK HOLE ================= */
function createBlackHole(){
  const wrap = $('#bh-scene');
  const isActive = () => wrap.closest('.slide').classList.contains('is-active');
  const { canvas, renderer, scene, camera } = setup();
  camera.position.set(0, 9, 29);
  camera.lookAt(0, 0, 0);
  camera.updateMatrixWorld();

  const group = new THREE.Group();
  group.rotation.x = .12;
  scene.add(group);

  const dark = new THREE.Mesh(
    new THREE.SphereGeometry(2.15, 48, 32),
    new THREE.MeshBasicMaterial({ color: 0x000000 })
  );
  group.add(dark);

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(2.62, .055, 12, 180),
    new THREE.MeshBasicMaterial({ color: 0xffe1b0, transparent: true, opacity: .95 })
  );
  ring.rotation.x = Math.PI/2;
  group.add(ring);
  const ring2 = new THREE.Mesh(
    new THREE.TorusGeometry(2.95, .11, 12, 180),
    new THREE.MeshBasicMaterial({ color: 0xff9a45, transparent: true, opacity: .22, blending: THREE.AdditiveBlending })
  );
  ring2.rotation.x = Math.PI/2;
  group.add(ring2);

  function disk(radiusMin, radiusMax, count, size, opacity, hueInner, hueOuter){
    const pos = new Float32Array(count*3);
    const col = new Float32Array(count*3);
    const ci = new THREE.Color(hueInner);
    const co = new THREE.Color(hueOuter);
    const tmp = new THREE.Color();
    for (let i=0;i<count;i++){
      const t = Math.pow(Math.random(), .55);
      const r = radiusMin + t*(radiusMax-radiusMin);
      const a = Math.random()*Math.PI*2;
      const y = (Math.random()-.5) * (.10 + t*.42);
      pos[i*3] = Math.cos(a)*r;
      pos[i*3+1] = y;
      pos[i*3+2] = Math.sin(a)*r;
      tmp.copy(ci).lerp(co, t);
      tmp.offsetHSL(0, 0, (Math.random()-.5)*.10);
      col[i*3] = tmp.r; col[i*3+1] = tmp.g; col[i*3+2] = tmp.b;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos,3));
    g.setAttribute('color', new THREE.BufferAttribute(col,3));
    const p = new THREE.Points(g, new THREE.PointsMaterial({
      size, vertexColors: true, transparent: true, opacity,
      blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true
    }));
    return p;
  }

  const inner = disk(2.9, 8, 9000, .105, .95, '#fff6dc', '#ffb260');
  const outer = disk(7.5, 16, 9000, .085, .55, '#ffb260', '#c2410c');
  group.add(inner, outer);

  const glowC = document.createElement('canvas');
  glowC.width = glowC.height = 256;
  const gc = glowC.getContext('2d');
  const gg = gc.createRadialGradient(128,128,0,128,128,128);
  gg.addColorStop(0, 'rgba(255,232,190,.85)');
  gg.addColorStop(.28, 'rgba(255,150,70,.35)');
  gg.addColorStop(.62, 'rgba(255,90,40,.08)');
  gg.addColorStop(1, 'rgba(255,80,30,0)');
  gc.fillStyle = gg; gc.fillRect(0,0,256,256);
  const glow = new THREE.Sprite(new THREE.SpriteMaterial({
    map: new THREE.CanvasTexture(glowC), blending: THREE.AdditiveBlending,
    depthWrite: false, transparent: true
  }));
  glow.scale.set(19, 13, 1);
  group.add(glow);

  const starGeo = new THREE.BufferGeometry();
  const sn = 500, sp = new Float32Array(sn*3);
  for (let i=0;i<sn;i++){
    const r = 22 + Math.random()*40, a = Math.random()*Math.PI*2, y = (Math.random()-.5)*50;
    sp[i*3] = Math.cos(a)*r; sp[i*3+1] = y; sp[i*3+2] = Math.sin(a)*r;
  }
  starGeo.setAttribute('position', new THREE.BufferAttribute(sp,3));
  scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({
    color: 0x9fb4ef, size: .16, transparent: true, opacity: .5, depthWrite: false
  })));

  const drag = U.attachDrag(canvas, (dx, dy) => {
    if (!isActive()) return;
    group.rotation.y += dx*.006;
    group.rotation.x = clamp(group.rotation.x + dy*.003, -.45, .55);
  });
  canvas.addEventListener('pointermove', () => { if (!isActive()) return; if (!drag.down) canvas.style.cursor = 'grab'; });

  let t0 = performance.now();
  return {
    resize(){ fit(wrap, renderer, camera); },
    frame(dt){
      const t = (performance.now()-t0)/1000;
      inner.rotation.y += dt*.55;
      outer.rotation.y += dt*.18;
      ring.material.opacity = .85 + Math.sin(t*1.4)*.1;
      ring2.scale.setScalar(1 + Math.sin(t*.8)*.012);
      if (!drag.down && !reduceMotion){
        group.rotation.y += dt*.03;
        group.rotation.x = .12 + Math.sin(t*.22)*.035;
      }
      renderer.render(scene, camera);
    }
  };
}

/* register */
U.registerScene(3, $('#solar-scene'), createSolar);
U.registerScene(6, $('#belt-scene'), createBelt);
U.registerScene(7, $('#galaxy-scene'), createGalaxy);
U.registerScene(8, $('#bh-scene'), createBlackHole);
})();
