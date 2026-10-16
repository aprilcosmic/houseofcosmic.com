// Cielo estrellado de fondo. Dibuja estrellas en un canvas fijo detrás del sitio.
// Si la persona prefiere menos movimiento, las estrellas no titilan.
(function () {
  var canvas = document.querySelector('.cielo');
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext('2d');
  var quieto = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var estrellas = [];
  var dpr = Math.min(window.devicePixelRatio || 1, 2);

  function crear() {
    var w = window.innerWidth, h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var total = Math.round((w * h) / 4500);
    estrellas = [];
    for (var i = 0; i < total; i++) {
      var grande = Math.random() < 0.06;
      estrellas.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: grande ? 1.2 + Math.random() * 0.8 : 0.3 + Math.random() * 0.7,
        base: 0.35 + Math.random() * 0.65,
        vel: 0.4 + Math.random() * 1.6,
        fase: Math.random() * Math.PI * 2,
        calida: Math.random() < 0.15
      });
    }
  }

  function dibujar(t) {
    var w = window.innerWidth, h = window.innerHeight;
    ctx.clearRect(0, 0, w, h);
    for (var i = 0; i < estrellas.length; i++) {
      var e = estrellas[i];
      var a = quieto ? e.base : e.base * (0.6 + 0.4 * Math.sin(t / 1000 * e.vel + e.fase));
      ctx.globalAlpha = a;
      ctx.fillStyle = e.calida ? '#f3d9a4' : '#f4ecdf';
      ctx.beginPath();
      ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    if (!quieto) requestAnimationFrame(dibujar);
  }

  crear();
  var espera;
  window.addEventListener('resize', function () {
    clearTimeout(espera);
    espera = setTimeout(function () { crear(); if (quieto) dibujar(0); }, 150);
  });
  if (quieto) dibujar(0); else requestAnimationFrame(dibujar);
})();
