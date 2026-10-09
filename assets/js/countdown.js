// Cuenta regresiva al Cowboy Cosmic Ball.
// La fecha/hora objetivo vive en el atributo data-target del elemento #countdown (index.html).
(function () {
  var el = document.getElementById('countdown');
  if (!el) return;
  var target = new Date(el.getAttribute('data-target')).getTime();
  var parts = {};
  ['dias', 'horas', 'minutos', 'segundos'].forEach(function (u) {
    parts[u] = el.querySelector('[data-unit="' + u + '"]');
  });

  function tick() {
    var diff = target - Date.now();
    if (diff <= 0) {
      el.innerHTML = '<p>Hoy es el ball.</p>';
      clearInterval(timer);
      return;
    }
    var s = Math.floor(diff / 1000);
    parts.dias.textContent = Math.floor(s / 86400);
    parts.horas.textContent = Math.floor((s % 86400) / 3600);
    parts.minutos.textContent = Math.floor((s % 3600) / 60);
    parts.segundos.textContent = s % 60;
  }

  var timer = setInterval(tick, 1000);
  tick();
})();
