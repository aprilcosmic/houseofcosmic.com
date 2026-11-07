# houseofcosmic.com

Sitio de House of Cosmic. Durante la campaña del Cowboy Cosmic Ball el sitio está dedicado casi por completo al ball.

Diseño moderno: tipografía Geist Mono (la de aprilcosmic.com, licencia libre OFL), secciones negras y claras, esquinas suaves. Los dos actos: cromo y bola disco de Renaissance; rojo, mezclilla y blanco hueso de Cowboy Carter. La navegación es una cápsula flotante abajo con la cuenta regresiva en miniatura.

HTML plano, sin build. Se publica tal cual en GitHub Pages.

## Archivos

| Archivo | Qué es |
|---|---|
| `index.html` | Inicio: cuenta regresiva, lo esencial, casas, categorías, talento |
| `el-ball.html` | Concepto, sí es / no es, tres ideas, apertura, orden de la noche, créditos |
| `casas.html` | House of Cosmic, House of Le'Clair, Ballroom Navojoa, aliades |
| `categorias.html` | Las 8 categorías en orden, registro de lipsync, reglas |
| `talento.html` | Jueces (borradores), MC y DJ |
| `tienda.html` | Paquete Cosmic, boletos por fase, merch, cómo funciona la compra |
| `preguntas.html` | Preguntas frecuentes |
| `house-of-cosmic.html` | La casa, sus balls, la trilogía, integrantes |
| `gracias.html` | A donde regresa Stripe después de pagar |
| `404.html` | Página no encontrada |
| `assets/css/sitio.css` | Todo el diseño |
| `assets/js/sitio.js` | Fecha del ball, cuenta regresiva, menú en celular, carrusel |

## La fecha

La fecha del ball vive en un solo lugar: arriba de `assets/js/sitio.js` (`BALL.inicio`, `fechaLarga`, `fechaCorta`). Cámbiala ahí y se actualiza la cuenta regresiva y los textos con fecha.

## Tienda y pagos (Stripe)

Los precios y las ligas de pago se pegan arriba de `assets/js/sitio.js`, en el bloque `TIENDA`. Cada botón se activa solo cuando su liga está puesta; mientras esté vacía dice "Próximamente". En cada liga de Stripe, después del pago, redirigir a `https://houseofcosmic.com/gracias.html`.

## Marcas en el código

- `POR CONFIRMAR`, `POR ESCRIBIR`, `POR AGREGAR`: dato o texto que falta.
- `REVELAR`: se publica en una fecha de la campaña.
- `BORRADOR` / `NO PUBLICAR`: contenido listo que aún no se publica (en pantalla, marco morado).
- `PAGOS`: aquí van los Stripe Payment Links.

En pantalla, lo pendiente sale resaltado en amarillo (clase `pendiente`).

## Antes de lanzar

- Quitar `<meta name="robots" content="noindex">` de todas las páginas.
- Revisar que no quede nada en amarillo en lo que ya se anunció.
- Quitar o mantener ocultas las fichas en borrador. Ojo: si el repo es público, su texto se puede leer en el código.

_Última actualización: 7 de noviembre de 2026._
