# houseofcosmic.com

Sitio de House of Cosmic. Durante la campaña del Cowboy Cosmic Ball (27 de marzo de 2027) el sitio está dedicado casi por completo al ball.

**Estado: dummy de contenido.** Sin diseño y sin pagos. El CSS actual solo hace legible el texto.

## Estructura

| Archivo | Página |
|---|---|
| `index.html` | Inicio: countdown al centro y todo lo esencial para quien solo ve esta página. Las demás páginas son para profundizar |
| `el-ball.html` | Concepto, sí es / no es, tesis, la noche, quién lo hace |
| `casas.html` | House of Cosmic, House of L'eClair, Ballroom Navojoa, aliades |
| `categorias.html` | Categorías con apodo, registro de lipsync, reglas |
| `jueces.html` | Talento: jueces (borradores, se revelan uno por semana), MC y DJ |
| `tienda.html` | Paquete Cosmic, boletos por fase, merch, cómo funciona la compra |
| `preguntas.html` | Preguntas frecuentes, compras, cómo llegar |
| `house-of-cosmic.html` | La casa, sus balls y la trilogía (base para después del ball) |
| `404.html` | Página no encontrada (GitHub Pages la usa sola) |
| `CNAME` | Dominio para GitHub Pages |

HTML plano, sin build. El encabezado y el pie se repiten en cada página: si cambias el menú, cámbialo en todas.

## Marcas en el código

Busca estos comentarios para saber qué falta:

- `POR CONFIRMAR`: dato que depende de una confirmación (sede, hora, precios, grafía, talento).
- `POR DECIDIR`: política que hay que definir (reembolsos, transferencias, merch no recogida).
- `POR ESCRIBIR` / `POR AGREGAR`: texto o material que falta.
- `REVELAR`: contenido que se publica en una fecha de la campaña.
- `NO PUBLICAR` / `BORRADOR`: contenido listo que no se publica hasta que se cumpla la condición (en pantalla sale con marco morado).
- `PAGOS`: aquí van los Stripe Payment Links al final.

En pantalla, lo pendiente sale con fondo amarillo (clase `placeholder`).

## Antes de lanzar

- Quitar `<meta name="robots" content="noindex">` de todas las páginas.
- Revisar que no quede ningún `placeholder` visible en lo que ya se anunció.
- Conectar los botones de la tienda a Stripe y hacer una compra de prueba completa.
