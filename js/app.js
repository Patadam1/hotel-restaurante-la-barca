/* Lógica y animaciones de la web: idioma, "abierto ahora", carta con vista previa,
   pestañas de la pastelería, habitaciones arrastrables y entradas al hacer scroll. */
(function () {
  const D = window.LA_BARCA;
  const EN = window.LA_BARCA_EN;
  const UI = window.LA_BARCA_UI;
  const raiz = document.documentElement;
  const quieto = window.matchMedia("(prefers-reduced-motion: reduce)").matches || /[?&]quieto/.test(location.search);
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  raiz.classList.add("js");

  /* ---------- Idioma ---------- */
  let lang = "es";
  try {
    const pedido = new URLSearchParams(location.search).get("lang");
    lang = pedido === "en" || pedido === "es" ? pedido : (localStorage.getItem("labarca-lang") || "es");
  } catch (e) { /* sin almacenamiento: español */ }

  // Guardamos el español original de cada texto y las fotos de las frases.
  $$("[data-i18n]").forEach((el) => { el.dataset.es = el.textContent; });
  $$("[data-i18n-html]").forEach((el) => {
    el.dataset.es = el.innerHTML;
    el._fotos = $$(".pic", el).map((p) => p.outerHTML);
  });

  const BANDERA_UK = `<svg viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice"><clipPath id="uk-t"><path d="M30,15h30v15zv15h-30zh-30v-15zv-15h30z"/></clipPath><rect width="60" height="30" fill="#012169"/><path d="M0,0L60,30M60,0L0,30" stroke="#fff" stroke-width="6"/><path d="M0,0L60,30M60,0L0,30" clip-path="url(#uk-t)" stroke="#C8102E" stroke-width="4"/><path d="M30,0v30M0,15h60" stroke="#fff" stroke-width="10"/><path d="M30,0v30M0,15h60" stroke="#C8102E" stroke-width="6"/></svg>`;
  const BANDERA_ES = `<svg viewBox="0 0 750 500" preserveAspectRatio="xMidYMid slice"><rect width="750" height="500" fill="#AA151B"/><rect y="125" width="750" height="250" fill="#F1BF00"/></svg>`;

  function t(es, en) { return lang === "en" ? en : es; }
  function tx(obj) { return obj ? obj[lang] || obj.es : ""; }

  function aplicarIdioma() {
    raiz.lang = lang;
    $$("[data-i18n]").forEach((el) => {
      const clave = el.dataset.i18n;
      el.textContent = lang === "en" && EN[clave] ? EN[clave] : el.dataset.es;
    });
    $$("[data-i18n-html]").forEach((el) => {
      const clave = el.dataset.i18nHtml;
      if (lang === "en" && EN[clave]) {
        el.innerHTML = EN[clave].replace(/\{(\d)\}/g, (_, n) => el._fotos[n - 1] || "");
      } else {
        el.innerHTML = el.dataset.es;
      }
    });
    const boton = $("[data-lang-toggle]");
    $("[data-lang-txt]", boton).textContent = UI[lang].ingles;
    // La bandera es la del idioma al que se cambia: Reino Unido en español, España en inglés.
    $("[data-bandera]", boton).innerHTML = lang === "es" ? BANDERA_UK : BANDERA_ES;
    boton.setAttribute("aria-label", UI[lang].inglesLabel);
    pintarCarta();
    pintarDulces(dulceActivo);
    pintarHabitaciones();
    pintarHorario();
  }

  $("[data-lang-toggle]").addEventListener("click", () => {
    lang = lang === "es" ? "en" : "es";
    try { localStorage.setItem("labarca-lang", lang); } catch (e) { /* nada */ }
    aplicarIdioma();
    observarEntradas();
  });

  /* ---------- Horario y "abierto ahora" ---------- */
  function minutos(hhmm) { const [h, m] = hhmm.split(":").map(Number); return h * 60 + m; }
  function hora(hhmm) { return hhmm === "24:00" ? UI[lang].medianoche : hhmm; }

  function estadoAhora(fecha = new Date()) {
    const dia = fecha.getDay();
    const ahora = fecha.getHours() * 60 + fecha.getMinutes();
    const hoy = D.horario[dia];
    if (ahora >= minutos(hoy.abre) && ahora < minutos(hoy.cierra)) return { abierto: true, texto: UI[lang].abierto(hora(hoy.cierra)) };
    if (ahora < minutos(hoy.abre)) return { abierto: false, texto: UI[lang].abreHoy(hoy.abre) };
    return { abierto: false, texto: UI[lang].abreMañana(D.horario[(dia + 1) % 7].abre) };
  }

  function pintarHorario() {
    const fecha = new Date();
    const dia = fecha.getDay();
    const est = estadoAhora(fecha);
    const estado = $("[data-estado]");
    estado.classList.toggle("is-abierto", est.abierto);
    $("[data-estado-texto]").textContent = est.texto;

    const hoy = D.horario[dia];
    $("[data-hoy]").innerHTML = UI[lang].hoy(UI[lang].dias[dia], hoy.abre, hora(hoy.cierra));

    // La semana empieza en lunes.
    const orden = [1, 2, 3, 4, 5, 6, 0];
    $("[data-semana]").innerHTML = orden.map((d) =>
      `<li class="${d === dia ? "is-hoy" : ""}"><span class="dia-nombre">${UI[lang].dias[d]}</span><span>${D.horario[d].abre} – ${hora(D.horario[d].cierra)}</span></li>`
    ).join("");
  }
  setInterval(pintarHorario, 60000);

  /* ---------- La carta: pestañas por sección y vista previa ---------- */
  const CARTA = window.LA_BARCA_CARTA;
  const carta = $(".carta");
  const lista = $("[data-carta]");
  const vistaFotos = $("[data-vista-fotos]");
  const vistaNombre = $("[data-vista-nombre]");
  let seccion = 0;

  function precio(n) {
    if (n == null) return "";
    const fijo = n.toFixed(2);
    return lang === "en" ? `€${fijo}` : `${fijo.replace(".", ",")} €`;
  }

  function pintarCarta() {
    const tabs = $("[data-carta-tabs]");
    tabs.innerHTML = CARTA.map((c, i) => `
      <button class="carta-tab" type="button" role="tab" id="ctab-${c.id}" aria-controls="carta-panel"
        aria-selected="${i === seccion}" tabindex="${i === seccion ? 0 : -1}" data-i="${i}">${tx(c.nombre)}</button>`).join("");

    const cat = CARTA[seccion];
    lista.id = "carta-panel";
    lista.setAttribute("role", "tabpanel");
    lista.setAttribute("aria-labelledby", `ctab-${cat.id}`);
    lista.innerHTML = `
      <div class="carta-cat">
        <div class="carta-cat-head">
          <h3 class="carta-cat-nombre">${tx(cat.nombre)}</h3>
          <span class="carta-cat-num">${UI[lang].platos(cat.platos.length)}</span>
        </div>
        ${cat.nota ? `<p class="carta-nota">${tx(cat.nota)}</p>` : ""}
        <ul class="carta-platos">
          ${cat.platos.map((p, n) => `
            <li class="plato-fila" data-plato="${n}" style="--i:${n}">
              <span class="plato-thumb">${p.foto
                ? `<img src="assets/fotos/${p.foto}.jpg" alt="" width="64" height="76" loading="lazy">`
                : `<span class="plato-thumb-vacio" aria-hidden="true">${tx(p.nombre).charAt(0)}</span>`}</span>
              <span>
                <span class="plato-nombre"><span>${tx(p.nombre)}</span>${p.precio != null ? `<span class="plato-precio">${precio(p.precio)}</span>` : ""}</span>
                ${tx(p.desc) ? `<span class="plato-desc">${tx(p.desc)}</span>` : ""}
              </span>
            </li>`).join("")}
        </ul>
      </div>`;

    // La vista previa: una capa por plato de la sección, solo cambia la opacidad.
    vistaFotos.innerHTML = cat.platos.map((p, n) => p.foto
      ? `<img src="assets/fotos/${p.foto}.jpg" alt="" data-n="${n}" loading="lazy">`
      : `<div class="carta-vista-texto" data-n="${n}"><span>${tx(p.nombre)}</span>${p.precio != null ? `<span class="carta-vista-precio">${precio(p.precio)}</span>` : ""}</div>`).join("");
    const primeraFoto = cat.platos.findIndex((p) => p.foto);
    activarPlato(primeraFoto >= 0 ? primeraFoto : 0);

    $$(".plato-fila", lista).forEach((fila) => {
      fila.addEventListener("pointerenter", (e) => {
        if (e.pointerType !== "mouse") return;
        carta.classList.add("is-apuntando");
        activarPlato(Number(fila.dataset.plato));
      });
    });
  }

  function activarPlato(n) {
    const platos = CARTA[seccion].platos;
    $$("[data-n]", vistaFotos).forEach((el) => el.classList.toggle("is-on", Number(el.dataset.n) === n));
    $$(".plato-fila", lista).forEach((f) => f.classList.toggle("is-activa", Number(f.dataset.plato) === n && carta.classList.contains("is-apuntando")));
    vistaNombre.textContent = platos[n] && platos[n].foto ? tx(platos[n].nombre) : "";
  }

  function cambiarSeccion(n, enfocar) {
    seccion = (n + CARTA.length) % CARTA.length;
    carta.classList.remove("is-apuntando");
    pintarCarta();
    lista.classList.remove("is-cambio");
    void lista.offsetWidth; // reinicia la animación de entrada de las filas
    lista.classList.add("is-cambio");
    const tab = $(`#ctab-${CARTA[seccion].id}`);
    tab.scrollIntoView({ block: "nearest", inline: "center", behavior: quieto ? "auto" : "smooth" });
    if (enfocar) tab.focus();
  }

  lista.addEventListener("pointerleave", () => {
    carta.classList.remove("is-apuntando");
    $$(".plato-fila", lista).forEach((f) => f.classList.remove("is-activa"));
  });
  $("[data-carta-tabs]").addEventListener("click", (e) => {
    const b = e.target.closest("[role=tab]");
    if (b) cambiarSeccion(Number(b.dataset.i), false);
  });
  $("[data-carta-tabs]").addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") cambiarSeccion(seccion + 1, true);
    if (e.key === "ArrowLeft") cambiarSeccion(seccion - 1, true);
  });

  /* ---------- Pastelería y heladería ---------- */
  let dulceActivo = 0;
  function pintarDulces(activo) {
    dulceActivo = activo;
    const tabs = $("[data-dulces-tabs]");
    tabs.innerHTML = D.dulces.map((d, i) => `
      <button class="dulces-tab" type="button" role="tab" id="tab-${d.id}" aria-controls="panel-dulces"
        aria-selected="${i === activo}" tabindex="${i === activo ? 0 : -1}" data-i="${i}">${tx(d.pestana)}</button>`).join("");

    const d = D.dulces[activo];
    const cuerpo = $("[data-dulces-cuerpo]");
    cuerpo.id = "panel-dulces";
    cuerpo.setAttribute("role", "tabpanel");
    cuerpo.setAttribute("aria-labelledby", `tab-${d.id}`);
    let extra = "";
    if (d.id === "helados") {
      extra = `<ul class="precios">
        <li><strong>${t("Una bola", "One scoop")}</strong><span>${t("2,50 €", "€2.50")}</span></li>
        <li><strong>${t("Dos bolas", "Two scoops")}</strong><span>${t("4,50 €", "€4.50")}</span></li>
        <li><strong>${t("Batidos", "Milkshakes")}</strong><span>${t("3,50 €", "€3.50")}</span></li>
        <li><strong>${t("Granizados", "Slushies")}</strong><span>${t("2,50 €", "€2.50")}</span></li>
      </ul>`;
    } else if (d.id === "bolleria") {
      extra = `<p class="extra">${t("También tenemos productos del pueblo: almendras JMP y dulces COBO.", "We also sell local treats: JMP almonds and COBO sweets.")}</p>`;
    }
    cuerpo.innerHTML = `<h3 class="dulces-cuerpo-titulo">${tx(d.titulo)}</h3>
      <p class="dulces-cuerpo-texto">${d.id === "helados" ? t("Ocho sabores, batidos y granizados de café, horchata o limón.", "Eight flavours, milkshakes and coffee, horchata or lemon slushies.") : tx(d.texto)}</p>${extra}`;

    const plato = $("[data-dulce-foto]");
    if (d.foto) {
      plato.innerHTML = `<img src="assets/fotos/${d.foto}.jpg" alt="${tx(d.titulo)}" width="1200" height="1500" loading="lazy">`;
    } else {
      plato.innerHTML = `<div class="helados"><ul class="helados-bolas" aria-label="${t("Sabores", "Flavours")}">
        ${D.sabores.map((s, i) => `<li class="bola" style="--c:${s.color};--i:${i}"><span>${tx(s)}</span></li>`).join("")}
      </ul></div>`;
    }
  }

  $("[data-dulces-tabs]").addEventListener("click", (e) => {
    const b = e.target.closest("[role=tab]");
    if (b) pintarDulces(Number(b.dataset.i));
  });
  $("[data-dulces-tabs]").addEventListener("keydown", (e) => {
    if (!["ArrowRight", "ArrowLeft"].includes(e.key)) return;
    const n = (dulceActivo + (e.key === "ArrowRight" ? 1 : -1) + D.dulces.length) % D.dulces.length;
    pintarDulces(n);
    $(`#tab-${D.dulces[n].id}`).focus();
  });

  /* ---------- Habitaciones: carrusel que no para ---------- */
  // Las fotos van dos veces seguidas: cuando la tira llega a la copia, salta
  // atrás exactamente media tira y el bucle no se nota.
  const tira = $("[data-habitaciones]");
  let mitad = 0;
  function pintarHabitaciones() {
    const ficha = (h, i, copia) => `
      <figure class="hab" style="--i:${i}"${copia ? ' aria-hidden="true"' : ""}>
        <div class="hab-foto arch"><img src="assets/fotos/${h.foto}.jpg" alt="${copia ? "" : `${UI[lang].habAlt} ${tx(h.nombre)}`}" width="1024" height="684" loading="lazy" draggable="false"></div>
        <figcaption>${tx(h.nombre)}</figcaption>
      </figure>`;
    tira.innerHTML = D.habitaciones.map((h, i) => ficha(h, i, false)).join("") + D.habitaciones.map((h, i) => ficha(h, i, true)).join("");
    medirTira();
  }
  function medirTira() {
    const fichas = tira.children;
    const n = D.habitaciones.length;
    mitad = fichas[n] ? fichas[n].offsetLeft - fichas[0].offsetLeft : 0;
  }
  window.addEventListener("resize", medirTira);

  (function carrusel() {
    const VELOCIDAD = window.matchMedia("(max-width: 760px)").matches ? 28 : 38; // px por segundo
    let pos = 0, puesto = -1, ultimo = 0, usuario = 0, tocando = false, visible = false, raf = 0;

    // Si el visitante desliza (rueda, trackpad, dedo o ratón), la tira le sigue
    // y el avance automático espera un momento antes de seguir.
    tira.addEventListener("scroll", () => {
      if (Math.abs(tira.scrollLeft - puesto) > 2) usuario = performance.now();
      // El bucle propio mantiene la posición entre 1 y mitad + 1; fuera de ahí es el visitante.
      if (mitad && tira.scrollLeft >= mitad + 2) tira.scrollLeft -= mitad;
      else if (mitad && tira.scrollLeft < 1) tira.scrollLeft += mitad;
    }, { passive: true });
    tira.addEventListener("touchstart", () => { tocando = true; }, { passive: true });
    tira.addEventListener("touchend", () => { tocando = false; usuario = performance.now(); }, { passive: true });

    function paso(t) {
      const dt = ultimo ? Math.min(t - ultimo, 64) : 16;
      ultimo = t;
      const libre = !tocando && !tira.classList.contains("is-arrastrando") && t - usuario > 700;
      if (Math.abs(tira.scrollLeft - puesto) > 2) pos = tira.scrollLeft; // el visitante la ha movido
      if (libre && mitad) {
        pos += VELOCIDAD * dt / 1000;
        if (pos < 1) pos += mitad;
        if (pos >= mitad + 1) pos -= mitad;
        tira.scrollLeft = pos;
        puesto = tira.scrollLeft;
      }
      raf = requestAnimationFrame(paso);
    }
    function arrancar() { cancelAnimationFrame(raf); ultimo = 0; if (visible && !document.hidden && !quieto) raf = requestAnimationFrame(paso); }
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; arrancar(); }).observe(tira);
    document.addEventListener("visibilitychange", arrancar);
  })();

  (function arrastre() {
    let x0 = 0, s0 = 0, vel = 0, ultimoX = 0, ultimoT = 0, activo = false, movido = false, inercia = 0;
    tira.addEventListener("pointerdown", (e) => {
      if (e.pointerType !== "mouse") return; // en el móvil, el scroll nativo
      activo = true; movido = false; cancelAnimationFrame(inercia);
      x0 = e.clientX; s0 = tira.scrollLeft; ultimoX = e.clientX; ultimoT = performance.now(); vel = 0;
      tira.setPointerCapture(e.pointerId);
    });
    tira.addEventListener("pointermove", (e) => {
      if (!activo) return;
      const dx = e.clientX - x0;
      if (Math.abs(dx) > 4) { movido = true; tira.classList.add("is-arrastrando"); }
      tira.scrollLeft = s0 - dx;
      const ahora = performance.now();
      vel = (e.clientX - ultimoX) / Math.max(ahora - ultimoT, 1);
      ultimoX = e.clientX; ultimoT = ahora;
    });
    const soltar = () => {
      if (!activo) return;
      activo = false;
      let v = -vel * 16;
      const deslizar = () => {
        tira.scrollLeft += v; v *= 0.94;
        if (Math.abs(v) > 0.5) inercia = requestAnimationFrame(deslizar);
        else tira.classList.remove("is-arrastrando");
      };
      if (movido && !quieto) inercia = requestAnimationFrame(deslizar);
      else tira.classList.remove("is-arrastrando");
    };
    tira.addEventListener("pointerup", soltar);
    tira.addEventListener("pointercancel", soltar);
    tira.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") tira.scrollBy({ left: 300, behavior: "smooth" });
      if (e.key === "ArrowLeft") tira.scrollBy({ left: -300, behavior: "smooth" });
    });
  })();

  /* ---------- Pie: LA BARCA en arcos ---------- */
  (function marca() {
    const el = $("[data-marca]");
    const alturas = [86, 100, 0, 74, 92, 100, 80, 96];
    el.innerHTML = "LA BARCA".split("").map((c, i) => c === " "
      ? `<span class="letra hueco" aria-hidden="true" style="--h:0;--i:${i}"></span>`
      : `<span class="letra" aria-hidden="true" style="--h:${alturas[i]}%;--i:${i}">${c}</span>`).join("");
  })();

  /* ---------- Título: letra a letra ---------- */
  $$(".split").forEach((el) => {
    const texto = el.textContent;
    el.setAttribute("aria-hidden", "true");
    el.innerHTML = texto.split("").map((c, i) => c === " " ? " " : `<span class="ch" style="--i:${i}">${c}</span>`).join("");
  });

  /* ---------- Portada: fotos que se relevan ---------- */
  (function diapositivas() {
    const fotos = $$("[data-slides] img");
    let n = 0, timer = 0;
    const poner = (i) => {
      fotos.forEach((f, k) => f.classList.toggle("is-on", k === i));
    };
    poner(0);
    if (quieto) return;
    const arrancar = () => { clearInterval(timer); timer = setInterval(() => { n = (n + 1) % fotos.length; poner(n); }, 5200); };
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) arrancar(); else clearInterval(timer); });
    io.observe($(".hero"));
  })();

  /* ---------- Entradas al hacer scroll ---------- */
  let io;
  function observarEntradas() {
    if (io) io.disconnect();
    if (quieto || !("IntersectionObserver" in window)) {
      $$(".reveal, .habitaciones, .pie-marca, .mapa").forEach((el) => el.classList.add("is-in"));
      return;
    }
    // Retardo escalonado dentro de cada sección.
    $$("section, footer").forEach((sec) => {
      $$(".reveal", sec).forEach((el, i) => { if (!el.classList.contains("is-in")) el.style.setProperty("--d", `${(i % 6) * 80}ms`); });
    });
    io = new IntersectionObserver((entradas) => {
      entradas.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    $$(".reveal:not(.is-in), .habitaciones:not(.is-in), .pie-marca:not(.is-in), .mapa:not(.is-in)").forEach((el) => io.observe(el));
  }

  /* ---------- Barra, travesía y dock ---------- */
  const bar = $(".bar");
  const hero = $(".hero");
  const dock = $(".dock");
  let pidiendo = false;
  function alHacerScroll() {
    pidiendo = false;
    const y = window.scrollY;
    const finHero = hero.offsetHeight - bar.offsetHeight;
    bar.classList.toggle("is-solida", y > finHero - 10);
    const total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.setProperty("--progreso", total > 0 ? Math.min(y / total, 1).toFixed(4) : 0);
    dock.classList.toggle("is-visible", y > window.innerHeight * 0.6);
  }
  window.addEventListener("scroll", () => {
    if (!pidiendo) { pidiendo = true; requestAnimationFrame(alHacerScroll); }
  }, { passive: true });

  /* ---------- Arranque ---------- */
  aplicarIdioma();
  observarEntradas();
  alHacerScroll();
  requestAnimationFrame(() => requestAnimationFrame(() => raiz.classList.add("is-listo")));
})();
