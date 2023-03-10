// Configuración
var c = document.getElementById("matrix");
var ctx = c.getContext("2d");
var matrix = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
matrix = matrix.split("");

var font_size = 2;
var columns = c.width/font_size;
var drops = [];
for (var x = 0; x < columns; x++)
  drops[x] = 1; 

// Función para dibujar la animación
function draw() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
  ctx.fillRect(0, 0, c.width, c.height);

  ctx.fillStyle = "#0f0";
  ctx.font = font_size + "px arial";

  for (var i = 0; i < drops.length; i++) {
    var text = matrix[Math.floor(Math.random()*matrix.length)];
    ctx.fillText(text, i*font_size, drops[i]*font_size);

    if (drops[i]*font_size > c.height && Math.random() > 0.975)
      drops[i] = 0;

    drops[i]++;
  }
}

// Bucle para animar la matriz
setInterval(draw, 35);
