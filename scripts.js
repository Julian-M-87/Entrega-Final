let video = $('video')[0]
let botonPlay = $('#play')
let botonPausa = $('#pausa')
let botonReiniciar = $('#reiniciar')
let ventana = $(window)
let contador = 0


ventana.on('scroll', function () {
    if (ventana.height() * 0.5 < ventana.scrollTop()) {
        $('nav').addClass('fondoNav');
    } else {
        $('nav').removeClass('fondoNav');
    }
});

function mostrarTiempoVideo(tiempo) {
    if (tiempo < 60) {
        if (tiempo.toFixed(0) < 10) {
            return `00:0${tiempo.toFixed(0)}`
        }
        return `00:${tiempo.toFixed(0)}`
    } else {
        let minutos = parseInt(tiempo / 60)
        let segundos = (tiempo / 60 - minutos)
        if (segundos < 10) {
            return `${minutos}:${segundos.toFixed(0)}`
        }
        return `${minutos}:${segundos.toFixed(0)}`
    }
}

let tiempoTranscurrido;

setTimeout(function () {
    $('#tiempoVideo').html("Duracion video 04:41")
}, 100);

botonPlay.on('click', function () {
    video.play()
    tiempoTranscurrido = setInterval(function () {
        $('#tiempoVideo').html(`${mostrarTiempoVideo(video.currentTime)}`)
    }, 1000)
})

botonPausa.on('click', function () {
    video.pause()
    clearInterval(mostrarTiempoVideo)
})

botonReiniciar.on('click', reiniciar)

function inicio() {
    var imagenes = $('#img-box img')
    let soltarImg = $('#drop-box')
    let soltarImg2 = $('#drop-box2')
    let soltarImg3 = $('#drop-box3')
    console.log(imagenes.length)
    console.log(imagenes)
    let soltarImgs = [soltarImg, soltarImg2, soltarImg3]


    imagenes.each(function () {
        $(this).on('dragstart', arrastrar);
    });

    soltarImgs.forEach((imagen) => {
        imagen.on('dragenter', function (event) {
            event.preventDefault();
        });
        imagen.on('dragover', function (event) {
            event.preventDefault();
        });
        imagen.on('drop', soltar);
    });
};

function arrastrar(event) {
    let elemento = event.target;
    event.originalEvent.dataTransfer.setData('Text', elemento.getAttribute('id'));
}
async function soltar(event) {
    event.preventDefault();
    console.log(event)
    let id = event.originalEvent.dataTransfer.getData('Text');
    let imagen = $('#' + id)
    imagen.css('display', 'none')
    $(event.target).html('<img src="' + imagen.attr('src') + '" height="400px" width="275px">');
    contador++;
}
function reiniciar() {
    window.location.reload();
}

$(document).ready(function () {
    inicio();
})
