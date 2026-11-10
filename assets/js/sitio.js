// =========================================================
// FECHA DEL BALL: se cambia aquí y en ningún otro lado.
// POR CONFIRMAR: el 27 de marzo se descartó por Semana Santa;
// la propuesta es el sábado 13 de marzo de 2027. La hora (9 PM)
// también está por confirmar.
// =========================================================
var BALL = {
  inicio: "2027-03-13T21:00:00-07:00",
  fechaLarga: "Sábado 13 de marzo de 2027",
  fechaCorta: "13 de marzo"
};

// =========================================================
// TIENDA: aquí se pegan los precios y las ligas de pago.
// - precio: solo el número, sin signo ni comas (ej. 650).
// - liga: la liga de pago (Stripe o Mercado Pago).
// Si la liga está vacía, el botón dice "Próximamente" y no se puede usar.
// Si el precio está vacío, se ve "Muy pronto".
// =========================================================
var TIENDA = {
  paquete:  { precio: "",    liga: "" }, // Paquete Cosmic (boleto + playera a elegir + abanico Cosmic)
  leclair:  { precio: "",    liga: "" }, // Paquete L'éclair (boleto + playera a elegir + abanico L'éclair)
  vaquere:  { precio: "150", liga: "" }, // Boleto fase 1: Preventa Vaquere, primeras 30 entradas
  preventa: { precio: "200", liga: "" }, // Boleto fase 2: Preventa, hasta el 31 ene
  febrero:  { precio: "250", liga: "" }, // Boleto fase 3: Febrero, 1 al 28 feb
  general:  { precio: "300", liga: "" }, // Boleto fase 4: General, todo marzo hasta el ball
  playera:  { precio: "400", liga: "" }, // Playera Cowboy Cosmic (dos diseños)
  abanico:  { precio: "250", liga: "" }, // Abanico (Cosmic o L'éclair)
  brinco:   { precio: "",    liga: "" }, // Playera Brinco
  cabello:  { precio: "",    liga: "" }, // Playera Cabello de niña
  graphic:  { precio: "",    liga: "" }, // Playera Super Graphic Girls Club
  jutonio:  { precio: "",    liga: "" }  // Playera Jutonio, Take Off to the Planet (negra o blanca)
};

(function () {
  // Precios y botones de la tienda
  var formato = function (n) { return "$" + Number(n).toLocaleString("es-MX"); };
  document.querySelectorAll("[data-precio]").forEach(function (el) {
    var p = TIENDA[el.getAttribute("data-precio")];
    if (p && p.precio) { el.textContent = formato(p.precio); el.parentNode.classList.add("con-precio"); }
  });
  document.querySelectorAll("[data-producto]").forEach(function (el) {
    var p = TIENDA[el.getAttribute("data-producto")];
    if (p && p.liga) {
      el.href = p.liga;
      el.removeAttribute("aria-disabled");
      el.textContent = "Comprar";
    }
  });

  // Versiones de un producto (abanico Cosmic o L'éclair, color de playera)
  document.querySelectorAll(".variantes").forEach(function (grupo) {
    var img = grupo.closest(".producto").querySelector(".producto-foto img");
    grupo.querySelectorAll("button").forEach(function (b) {
      var precarga = new Image(); precarga.src = b.getAttribute("data-img");
      b.addEventListener("click", function () {
        grupo.querySelectorAll("button").forEach(function (o) { o.setAttribute("aria-pressed", o === b ? "true" : "false"); });
        img.src = b.getAttribute("data-img");
        img.alt = b.getAttribute("data-alt");
      });
    });
  });

  // Textos de fecha en todo el sitio
  document.querySelectorAll("[data-fecha]").forEach(function (el) {
    el.textContent = el.getAttribute("data-fecha") === "corta" ? BALL.fechaCorta : BALL.fechaLarga;
  });

  // Cuenta regresiva
  var reloj = document.getElementById("reloj");
  if (reloj) {
    var meta = new Date(BALL.inicio).getTime();
    var campos = {};
    ["dias", "horas", "minutos", "segundos"].forEach(function (u) {
      campos[u] = reloj.querySelector('[data-unidad="' + u + '"]');
    });
    var dos = function (n) { return n < 10 ? "0" + n : String(n); };
    var tick = function () {
      var resta = meta - Date.now();
      if (resta <= 0) {
        reloj.innerHTML = "<p>Hoy es el ball.</p>";
        clearInterval(t);
        return;
      }
      var s = Math.floor(resta / 1000);
      campos.dias.textContent = Math.floor(s / 86400);
      campos.horas.textContent = dos(Math.floor((s % 86400) / 3600));
      campos.minutos.textContent = dos(Math.floor((s % 3600) / 60));
      campos.segundos.textContent = dos(s % 60);
    };
    var t = setInterval(tick, 1000);
    tick();
  }

  // Menú de la cápsula en celular
  var dock = document.querySelector(".dock");
  var boton = document.querySelector(".dock-menu");
  if (dock && boton) {
    boton.addEventListener("click", function () {
      var abierto = dock.classList.toggle("abierto");
      boton.setAttribute("aria-expanded", abierto ? "true" : "false");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && dock.classList.contains("abierto")) { dock.classList.remove("abierto"); boton.setAttribute("aria-expanded", "false"); boton.focus(); }
    });
  }

  // Cuenta regresiva en miniatura dentro de la cápsula
  var mini = document.querySelector("[data-mini-reloj]");
  if (mini) {
    var metaMini = new Date(BALL.inicio).getTime();
    var pad = function (n) { return n < 10 ? "0" + n : String(n); };
    var tickMini = function () {
      var r = Math.max(0, Math.floor((metaMini - Date.now()) / 1000));
      if (r === 0) { mini.innerHTML = "<b>Hoy</b>"; return; }
      mini.innerHTML = "<b>" + Math.floor(r / 86400) + "d</b> " + pad(Math.floor((r % 86400) / 3600)) + ":" + pad(Math.floor((r % 3600) / 60)) + ":" + pad(r % 60);
    };
    tickMini();
    setInterval(tickMini, 1000);
  }

  // Flechas del carrusel de categorías
  document.querySelectorAll("[data-carrusel]").forEach(function (cabeza) {
    var lista = document.getElementById(cabeza.getAttribute("data-carrusel"));
    if (!lista) return;
    var prev = cabeza.querySelector("[data-dir='-1']");
    var next = cabeza.querySelector("[data-dir='1']");
    var paso = function () {
      var item = lista.querySelector("li");
      return item ? item.getBoundingClientRect().width + 20 : 300;
    };
    var actualizar = function () {
      prev.disabled = lista.scrollLeft <= 4;
      next.disabled = lista.scrollLeft + lista.clientWidth >= lista.scrollWidth - 4;
    };
    [prev, next].forEach(function (b) {
      b.addEventListener("click", function () {
        lista.scrollBy({ left: paso() * Number(b.getAttribute("data-dir")), behavior: "smooth" });
      });
    });
    lista.addEventListener("scroll", actualizar, { passive: true });
    actualizar();
  });
})();

// =========================================================
// CIELO: estrellas sobre todos los fondos negros.
// Puntos de luz suaves (no dibujos), que titilan y se desplazan
// muy lento, con una estrella fugaz de vez en cuando.
// =========================================================
(function () {
  var hosts = document.querySelectorAll(".hero, .cabecera-negra, .seccion-negra, .paquete, .cierre, .pie, .poster-pronto");
  var lienzo = document.createElement("canvas");
  if (!hosts.length || !lienzo.getContext) return;
  var quieto = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var dpr = Math.min(window.devicePixelRatio || 1, 2);

  // tonos reales de estrellas: blanco, azulado, cálido y alguna rojiza
  var TONOS = [[255, 255, 255], [255, 255, 255], [255, 255, 255], [212, 224, 255], [196, 212, 255], [255, 238, 218], [255, 214, 196]];
  var brillos = TONOS.map(function (rgb) {
    var s = 64, c = document.createElement("canvas");
    c.width = c.height = s;
    var g = c.getContext("2d");
    var k = "rgba(" + rgb.join(",") + ",";
    var r = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    r.addColorStop(0, k + "1)");
    r.addColorStop(0.07, k + "0.95)");
    r.addColorStop(0.16, k + "0.35)");
    r.addColorStop(0.4, k + "0.07)");
    r.addColorStop(1, k + "0)");
    g.fillStyle = r;
    g.fillRect(0, 0, s, s);
    return c;
  });

  var cielos = [];
  hosts.forEach(function (host) {
    var c = document.createElement("canvas");
    c.className = "cielo";
    c.setAttribute("aria-hidden", "true");
    host.insertBefore(c, host.firstChild);
    host.classList.add("con-cielo");
    cielos.push({ host: host, c: c, ctx: c.getContext("2d"), estrellas: [], w: 0, h: 0, visible: true, fugaz: null, espera: 2000 + Math.random() * 6000 });
  });

  function poblar(o) {
    var w = o.host.clientWidth, h = o.host.clientHeight;
    if (!w || !h) return;
    o.w = w; o.h = h;
    o.c.width = Math.round(w * dpr); o.c.height = Math.round(h * dpr);
    o.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var n = Math.min(1500, Math.round((w * h) / 1150));
    o.estrellas = [];
    for (var i = 0; i < n; i++) {
      var m = Math.pow(Math.random(), 3.2); // muchas tenues, varias brillantes
      o.estrellas.push({
        x: Math.random() * w, y: Math.random() * h,
        tam: 2.6 + m * 12,                       // tamaño del halo
        luz: 0.42 + m * 0.58,                    // brillo base
        tono: Math.floor(Math.random() * TONOS.length),
        fase: Math.random() * 6.283,
        vel: 0.0014 + Math.random() * 0.0042,    // velocidad del titileo
        prof: 0.2 + m * 0.8,                     // las brillantes se mueven más (parallax)
        osc: 0.5 + Math.random() * 0.45,         // cuánto se apagan al titilar
        chispa: Math.random() * 9000,            // cuándo atrapa la luz, como glitter
        brillo: 0
      });
    }
  }

  function dibujar(o, t, dt) {
    var ctx = o.ctx, w = o.w, h = o.h;
    ctx.clearRect(0, 0, w, h);
    for (var i = 0; i < o.estrellas.length; i++) {
      var s = o.estrellas[i];
      if (!quieto) {
        s.x -= s.prof * dt * 0.006;
        s.y += s.prof * dt * 0.002;
        s.chispa -= dt;
        if (s.chispa <= 0) { s.brillo = 1; s.chispa = 2500 + Math.random() * 9000; }
        if (s.brillo > 0) s.brillo = Math.max(0, s.brillo - dt / 420);
        if (s.x < -8) { s.x = w + 8; s.y = Math.random() * h; }
        if (s.y > h + 8) { s.y = -8; s.x = Math.random() * w; }
      }
      var ola = 0.6 * Math.sin(s.fase + t * s.vel) + 0.4 * Math.sin(s.fase * 2.3 + t * s.vel * 2.9);
      var a = s.luz * (1 - s.osc * (0.5 - 0.5 * ola));
      var ch = s.brillo * s.brillo;                 // destello rápido que se apaga suave
      var tam = s.tam * (1 + ch * 1.6);
      ctx.globalAlpha = Math.min(1, a + ch);
      ctx.drawImage(brillos[s.tono], s.x - tam / 2, s.y - tam / 2, tam, tam);
    }
    // estrella fugaz, muy de vez en cuando
    if (!quieto) {
      o.espera -= dt;
      if (!o.fugaz && o.espera <= 0) {
        var ang = (Math.random() < 0.5 ? 155 : 25) + Math.random() * 12;
        ang = ang * Math.PI / 180;
        o.fugaz = { x: w * (0.15 + Math.random() * 0.7), y: h * Math.random() * 0.5, dx: Math.cos(ang), dy: Math.sin(ang), largo: 70 + Math.random() * 90, dur: 650 + Math.random() * 450, t: 0 };
        o.espera = 7000 + Math.random() * 9000;
      }
      if (o.fugaz) {
        var f = o.fugaz; f.t += dt;
        var p = f.t / f.dur;
        if (p >= 1) { o.fugaz = null; }
        else {
          var recorrido = 260 * p;
          var cx = f.x + f.dx * recorrido, cy = f.y + f.dy * recorrido;
          var tx = cx - f.dx * f.largo, ty = cy - f.dy * f.largo;
          var g = ctx.createLinearGradient(tx, ty, cx, cy);
          g.addColorStop(0, "rgba(255,255,255,0)");
          g.addColorStop(1, "rgba(255,255,255,0.85)");
          ctx.globalAlpha = Math.sin(Math.PI * p) * 0.7;
          ctx.strokeStyle = g;
          ctx.lineWidth = 1.1;
          ctx.lineCap = "round";
          ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(cx, cy); ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 1;
  }

  cielos.forEach(poblar);

  if (quieto) {
    cielos.forEach(function (o) { dibujar(o, 0, 0); });
  } else {
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (e) {
          cielos.forEach(function (o) { if (o.c === e.target) o.visible = e.isIntersecting; });
        });
      });
      cielos.forEach(function (o) { io.observe(o.c); });
    }
    var antes = 0;
    var ciclo = function (t) {
      var dt = antes ? Math.min(t - antes, 50) : 16;
      antes = t;
      if (!document.hidden) {
        for (var i = 0; i < cielos.length; i++) if (cielos[i].visible && cielos[i].w) dibujar(cielos[i], t, dt);
      }
      requestAnimationFrame(ciclo);
    };
    requestAnimationFrame(ciclo);
  }

  // si cambia el tamaño de una sección, se vuelve a sembrar su cielo
  var resembrar = function (o) {
    if (o.host.clientWidth !== o.w || o.host.clientHeight !== o.h) { poblar(o); if (quieto) dibujar(o, 0, 0); }
  };
  if ("ResizeObserver" in window) {
    var ro = new ResizeObserver(function (entradas) {
      entradas.forEach(function (e) { cielos.forEach(function (o) { if (o.host === e.target) resembrar(o); }); });
    });
    cielos.forEach(function (o) { ro.observe(o.host); });
  } else {
    window.addEventListener("resize", function () { cielos.forEach(resembrar); });
  }
})();
