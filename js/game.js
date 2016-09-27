$(function () {

  var TicTacToe = (function () {

    var tablero,
        jugadorActual = 1,
        simboloActual = "X",
        finalJuegoFlag,
        celdas = $('#celdas > div'),
        ganadorFlag,
        filtroSolucion,
        solucion = [[0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
                   [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
                   [0, 4, 8], [2, 4, 6]];

    var cambiarJugador,
        iniciarJuego,
        verificarJuego,
        mensaje,
        nuevoJuego,
        limpiarTablero,
        obtenerSimbolo;

    cambiarJugador = function () {
      jugadorActual = jugadorActual ? 0 : 1;
      obtenerSimbolo();
    };

    obtenerSimbolo = function () {
      simboloActual = jugadorActual ? 'X' : 'O';
    };

    verificarJuego = function (indiceElemento) {
      ganadorFlag = false;
      filtroSolucion = solucion.filter(function (v) { return v.indexOf(indiceElemento) !== -1; });

      $.each(filtroSolucion, function (i, v) {
          if ((celdas.eq(v[0]).text() === celdas.eq(v[1]).text())
          && (celdas.eq(v[0]).text() === celdas.eq(v[2]).text())) {
            ganadorFlag = true;
          }
      });
      return ganadorFlag;
    };

    mensaje = function (contenido) {
      $('p.mensaje').html(contenido);
    };

    nuevoJuego = function () {
      finalJuegoFlag = false;
      mensaje('');
      limpiarTablero();
    };

    limpiarTablero = function () {
      tablero = [' ', ' ', ' ',
               ' ', ' ', ' ',
               ' ', ' ', ' '];

      $.each(tablero, function (i, v) {
        celdas.eq(i).html(v);
      });
    };

    iniciarJuego = function () {
      nuevoJuego();
      var intentos=0;
      $('#celdas').on('click', 'div', function () {
        intentos+=1;
        if (this.innerHTML === " " && !finalJuegoFlag) {
          this.innerHTML = simboloActual;
          if (verificarJuego($(this).index())) {
            mensaje('Jugador ' + jugadorActual + ' ganó!');
            intentos = 0;
            finalJuegoFlag = true;
          } else {
            cambiarJugador();
          }
        }

        if(intentos==9)
          mensaje('Intenta de nuevo!');
      });

      $('p.juego').on('click', nuevoJuego);
    };

    return {
      play: iniciarJuego
    };
  }());

  TicTacToe.play();
});
