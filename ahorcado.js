// ### VARIABLES ###

// Array de palabras
var palabras = [
  ["atlantico", "Un océano"],
  ["computador", "Una máquina"],
  ["plaza", "Espacio público"],
  ["banano", "Una fruta"],
  ["everest", "Un monte"],
  ["perro", "Un animal"],
  ["colombia", "Un país"],
  ["colegio", "Lugar para estudiar"],
  ["carrera", "carros"],
  ["deportivopereira", "Mejor equipo de Colombia"],
  ["pastel", "fiesta"],
  ["hermano", "familia"]
];

// Palabra a averiguar
var palabra = "";
// Nº aleatorio
var rand;
// Palabra oculta
var oculta = [];
// Elemento html de la palabra
var hueco = document.getElementById("palabra");
// Contador de intentos
var cont = 6;
// Botones de letras
var buttons = document.getElementsByClassName('letra');
// Boton de reset
var btnInicio = document.getElementById("reset");

// ### FUNCIONES ###

// Escoger palabra al azar
function generaPalabra() {
  rand = Math.floor(Math.random() * palabras.length);
  palabra = palabras[rand][0].toUpperCase();
  console.log(palabra);
}

// Funcion para pintar los guiones de la palabra
function pintarGuiones(longitud) {
  oculta = [];
  for (var i = 0; i < longitud; i++) {
      oculta[i] = "_";
  }
  hueco.innerHTML = oculta.join(" ");
}

// Generar el teclado
function generaABC(inicio, fin) {
  var abecedario = '';
  for (var i = inicio.charCodeAt(0); i <= fin.charCodeAt(0); i++) {
      abecedario += '<button class="letra" id="' + String.fromCharCode(i) + '" onclick="compruebaLetra(\'' + String.fromCharCode(i) + '\')">' + String.fromCharCode(i) + '</button>';
  }
  document.getElementById("abcdario").innerHTML = abecedario;
}

// Comprueba la letra elegida
function compruebaLetra(letra) {
  document.getElementById(letra).disabled = true; // Deshabilita el botón de la letra seleccionada
  letra = letra.toUpperCase(); // Asegura que la letra sea mayúscula
  if (palabra.indexOf(letra) !== -1) {
      for (var j = 0; j < palabra.length; j++) {
          if (palabra[j] === letra) {
              oculta[j] = letra;
          }
      }
      hueco.innerHTML = oculta.join(" ");
      document.getElementById("acierto").innerHTML = "¡Bien!";
      document.getElementById("acierto").className += "acierto verde";
  } else {
      cont--;
      document.getElementById("intentos").innerHTML = cont;
      document.getElementById("acierto").innerHTML = "¡Fallaste!";
      document.getElementById("acierto").className += "acierto rojo";

      // Ocultar todas las imágenes del ahorcado y mostrar la actual
      document.querySelectorAll('.ahorcado-img').forEach(img => img.style.display = 'none');
      document.querySelector("#image" + cont).style.display = "block"; // Muestra la imagen correspondiente al intento fallido
  }
  compruebaFin();
  setTimeout(function () {
      document.getElementById("acierto").className = "";
  }, 800);
}

// Obtener pista
function pista() {
  document.getElementById("hueco-pista").innerHTML = palabras[rand][1];
}

// Comprueba si ha finalizado
function compruebaFin() {
  if (oculta.indexOf("_") === -1) {
      // El jugador ha ganado
      mostrarMensaje("¡Felicidades! Has adivinado la palabra: " + palabra + " 🎉");
      for (var i = 0; i < buttons.length; i++) {
          buttons[i].disabled = true; // Desactiva todos los botones
      }
      document.getElementById("reset").innerHTML = "Empezar de nuevo"; // Cambia el texto del botón
      btnInicio.onclick = function () { location.reload() }; // Reinicia el juego
  } else if (cont === 0) {
      // El jugador ha perdido
      mostrarMensaje("Game Over. La palabra era: " + palabra + " 😢");
      for (var i = 0; i < buttons.length; i++) {
          buttons[i].disabled = true; // Desactiva todos los botones
      }
      document.getElementById("reset").innerHTML = "Empezar de nuevo"; // Cambia el texto del botón
      btnInicio.onclick = function () { location.reload() }; // Reinicia el juego
  }
}

// Función para mostrar mensajes dinámicos
function mostrarMensaje(mensaje) {
  const msgFinal = document.getElementById("msg-final");
  msgFinal.innerHTML = mensaje;
  msgFinal.style.transform = "scale(1)";
  msgFinal.style.animation = "fadeIn 0.5s forwards";
  
  setTimeout(() => {
      msgFinal.style.transform = "scale(0)";
  }, 3000); // Mensaje se oculta después de 3 segundos
}

// Restablecer juego
function inicio() {
  generaPalabra();
  pintarGuiones(palabra.length);
  generaABC("A", "Z"); // Se cambió a "A" para que coincida con el uso de mayúsculas
  cont = 6;
  document.getElementById("intentos").innerHTML = cont;
  document.querySelectorAll('.ahorcado-img').forEach(img => img.style.display = 'none'); // Ocultar todas las imágenes del ahorcado al iniciar
  document.querySelector("#image6").style.display = "block"; // Mostrar la imagen inicial del ahorcado
}

// Iniciar
window.onload = inicio;
