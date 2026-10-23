/* La laguna: el fondo vivo de la página.
   Ondas de agua que derivan despacio y se mueven con el scroll, anillos donde
   tocas o pasas el ratón, y de vez en cuando una bandada cruzando, como en la
   Laguna del Pueblo. Con "reducir movimiento" se dibuja una vez y se queda quieto. */
(function () {
  const canvas = document.querySelector(".laguna");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const quieto = window.matchMedia("(prefers-reduced-motion: reduce)").matches || /[?&]quieto/.test(location.search);
  const TINTA = "6, 43, 138"; // añil

  let w = 0, h = 0, dpr = 1;
  let ondas = [], anillos = [], bandadas = [];
  let scrollY = window.scrollY, scrollVel = 0;
  let proximaBandada = performance.now() + 3500;
  let ultimoAnillo = 0;

  function azar(a, b) { return a + Math.random() * (b - a); }

  function crearOndas() {
    const n = Math.round((w * h) / 22000);
    ondas = Array.from({ length: n }, () => ({
      x: azar(-100, w + 100),
      y: azar(0, h * 1.6),
      largo: azar(26, 96),
      alto: azar(2.5, 6),
      fase: azar(0, Math.PI * 2),
      vel: azar(0.06, 0.22),
      prof: azar(0.25, 1),
      alfa: azar(0.06, 0.16)
    }));
  }

  function medir() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth; h = window.innerHeight;
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    crearOndas();
  }

  function onda(o, t) {
    // Un trazo ondulado corto, como el brillo del agua.
    const y = ((o.y - scrollY * 0.18 * o.prof) % (h * 1.6) + h * 1.6) % (h * 1.6) - h * 0.3;
    const estira = 1 + Math.min(Math.abs(scrollVel) * 0.02, 0.8) * o.prof;
    const largo = o.largo * estira;
    const sube = Math.sin(t * 0.0012 + o.fase) * o.alto;
    ctx.beginPath();
    ctx.moveTo(o.x, y);
    ctx.quadraticCurveTo(o.x + largo * 0.25, y - sube, o.x + largo * 0.5, y);
    ctx.quadraticCurveTo(o.x + largo * 0.75, y + sube, o.x + largo, y);
    ctx.strokeStyle = `rgba(${TINTA}, ${o.alfa})`;
    ctx.lineWidth = 1.2 + o.prof * 1.4;
    ctx.stroke();
  }

  function nuevaBandada() {
    const izq = Math.random() < 0.6;
    const n = Math.round(azar(5, 10));
    const y0 = azar(h * 0.12, h * 0.5);
    const base = { x: izq ? -80 : w + 80, y: y0, vx: (izq ? 1 : -1) * azar(0.9, 1.5), vy: azar(-0.25, 0.08) };
    const aves = Array.from({ length: n }, (_, i) => {
      const fila = Math.ceil(i / 2), lado = i % 2 ? 1 : -1;
      return { dx: -fila * 22 * Math.sign(base.vx), dy: lado * fila * 12 + azar(-4, 4), fase: azar(0, 6), tam: azar(7, 11) };
    });
    bandadas.push({ ...base, aves });
  }

  function ave(x, y, tam, aleteo) {
    const a = Math.sin(aleteo) * tam * 0.55;
    ctx.beginPath();
    ctx.moveTo(x - tam, y - a);
    ctx.quadraticCurveTo(x - tam * 0.4, y - a * 0.2 - 2, x, y);
    ctx.quadraticCurveTo(x + tam * 0.4, y - a * 0.2 - 2, x + tam, y - a);
    ctx.stroke();
  }

  function anillo(x, y, fuerte) {
    anillos.push({ x, y, r: 2, alfa: fuerte ? 0.32 : 0.14, vel: fuerte ? 1.6 : 0.9 });
    if (anillos.length > 40) anillos.shift();
  }

  function dibujar(t) {
    ctx.clearRect(0, 0, w, h);
    ctx.lineCap = "round";

    for (const o of ondas) {
      if (!quieto) {
        o.x += o.vel * (1 + o.prof);
        if (o.x > w + 120) { o.x = -120; o.y = azar(0, h * 1.6); }
      }
      onda(o, quieto ? 0 : t);
    }

    for (let i = anillos.length - 1; i >= 0; i--) {
      const a = anillos[i];
      a.r += a.vel; a.alfa *= 0.975;
      ctx.beginPath();
      ctx.ellipse(a.x, a.y, a.r, a.r * 0.38, 0, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${TINTA}, ${a.alfa})`;
      ctx.lineWidth = 1.6;
      ctx.stroke();
      if (a.r > 18) {
        ctx.beginPath();
        ctx.ellipse(a.x, a.y, a.r * 0.6, a.r * 0.6 * 0.38, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${TINTA}, ${a.alfa * 0.7})`;
        ctx.stroke();
      }
      if (a.alfa < 0.01) anillos.splice(i, 1);
    }

    if (!quieto) {
      if (t > proximaBandada) { nuevaBandada(); proximaBandada = t + azar(9000, 18000); }
      ctx.strokeStyle = `rgba(${TINTA}, 0.42)`;
      ctx.lineWidth = 1.8;
      for (let i = bandadas.length - 1; i >= 0; i--) {
        const b = bandadas[i];
        b.x += b.vx; b.y += b.vy + Math.sin(t * 0.001 + b.x * 0.01) * 0.15;
        for (const p of b.aves) ave(b.x + p.dx, b.y + p.dy, p.tam, t * 0.012 + p.fase);
        if (b.x < -400 || b.x > w + 400) bandadas.splice(i, 1);
      }
    }
  }

  let raf = 0;
  function bucle(t) {
    scrollVel *= 0.9;
    dibujar(t);
    raf = requestAnimationFrame(bucle);
  }

  medir();
  if (quieto) {
    dibujar(0);
  } else {
    raf = requestAnimationFrame(bucle);
    document.addEventListener("visibilitychange", () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(bucle);
    });
    window.addEventListener("pointermove", (e) => {
      const ahora = performance.now();
      if (e.pointerType === "mouse" && ahora - ultimoAnillo > 140) { anillo(e.clientX, e.clientY, false); ultimoAnillo = ahora; }
    }, { passive: true });
    window.addEventListener("pointerdown", (e) => anillo(e.clientX, e.clientY, true), { passive: true });
  }

  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    scrollVel += (y - scrollY) * 0.4;
    scrollY = y;
    if (quieto) dibujar(0);
  }, { passive: true });

  let espera;
  window.addEventListener("resize", () => {
    clearTimeout(espera);
    espera = setTimeout(() => { medir(); if (quieto) dibujar(0); }, 150);
  });
})();
