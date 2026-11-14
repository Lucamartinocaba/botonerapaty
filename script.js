const botones = document.querySelectorAll('.pad-btn');
const btnDetener = document.getElementById('btn-detener');
const sliderVolumen = document.getElementById('volumen');

let audioActual = null;
let volumenActual = 1; // Guarda el volumen elegido (1 = 100%)

// Escucha cuando mueves la barra de volumen
sliderVolumen.addEventListener('input', (evento) => {
  volumenActual = evento.target.value;
  
  // Si hay un audio sonando ahora mismo, le cambia el volumen en vivo
  if (audioActual) {
    audioActual.volume = volumenActual;
  }
});

botones.forEach(boton => {
  boton.addEventListener('click', () => {
    // 1. Detiene el sonido anterior si sigue activo
    if (audioActual) {
      audioActual.pause();
      audioActual.currentTime = 0;
    }

    // 2. Crea el nuevo audio y le aplica el volumen de la barra
    const rutaArchivo = boton.getAttribute('data-sonido');
    audioActual = new Audio(rutaArchivo);
    audioActual.volume = volumenActual; 
    audioActual.play();

    // 3. Efecto visual mientras suena
    botones.forEach(b => b.classList.remove('sonando'));
    boton.classList.add('sonando');
    
    audioActual.onended = () => {
      boton.classList.remove('sonando');
    };
  });
});

// Función para el botón de detener
btnDetener.addEventListener('click', () => {
  if (audioActual) {
    audioActual.pause();
    audioActual.currentTime = 0;
    botones.forEach(b => b.classList.remove('sonando'));
  }
});