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
// TIENDA: aquí se pegan los precios y las ligas de Stripe.
// - precio: solo el número, sin signo ni comas (ej. 650).
// - liga: la liga de pago de Stripe (empieza con https://buy.stripe.com/).
// Si la liga está vacía, el botón dice "Próximamente" y no se puede usar.
// Si el precio está vacío, se ve "por confirmar".
// =========================================================
var TIENDA = {
  paquete:  { precio: "", liga: "" }, // Paquete Cosmic (boleto + playera + abanico)
  vaquere:  { precio: "", liga: "" }, // Boleto fase 1: Preventa Vaquere (cupo 60)
  preventa: { precio: "", liga: "" }, // Boleto fase 2: Preventa
  general:  { precio: "", liga: "" }, // Boleto fase 3: General
  taquilla: { precio: "", liga: "" }, // Boleto fase 4: Taquilla (solo precio, se paga en puerta)
  playera:  { precio: "", liga: "" }, // Playera Cowboy Cosmic
  abanico:  { precio: "", liga: "" }  // Abanico Cowboy Cosmic
};

(function () {
  // Precios y botones de la tienda
  var formato = function (n) { return "$" + Number(n).toLocaleString("es-MX"); };
  document.querySelectorAll("[data-precio]").forEach(function (el) {
    var p = TIENDA[el.getAttribute("data-precio")];
    if (p && p.precio) { el.textContent = formato(p.precio); el.classList.remove("pendiente"); }
  });
  document.querySelectorAll("[data-producto]").forEach(function (el) {
    var p = TIENDA[el.getAttribute("data-producto")];
    if (p && p.liga) {
      el.href = p.liga;
      el.removeAttribute("aria-disabled");
      el.textContent = "Comprar";
    }
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
