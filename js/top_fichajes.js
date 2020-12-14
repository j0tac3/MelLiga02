const jugadoresContainer = document.getElementById('jugadores-card');
let jugadores = new Array();

let equipos = new Array();

const getEquipos = async () => {
    return new Promise ((resolve, reject) => {
        axios({
            method : 'GET',
            url: 'https://immense-mountain-28279.herokuapp.com/api/equipos',
        }).then (res => {
            resolve(res.data);
        }).catch (error => console.error(error));
    })
}

const getAllPlayer = async () => {
    return new Promise ((resolve, reject)  => {
        fetch('https://immense-mountain-28279.herokuapp.com/api/jugadores')
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
}

const cargarTarjetasJugadores = (jugadores) => {
    let fragment = document.createDocumentFragment();
    for (let jugador of jugadores) {
        let header = crearImagenJugador(jugador);
        let cuerpo = crearCuerpoTarjeta(jugador);

        let tarjetaJugador = document.createElement('DIV');
        tarjetaJugador.appendChild(header);
        tarjetaJugador.appendChild(cuerpo);
        tarjetaJugador.classList.add('serie-diez');
        tarjetaJugador.classList.add('jugador-prueba-no-encontrado');

        fragment.appendChild(tarjetaJugador);
    }
    jugadoresContainer.appendChild(fragment);
}
const crearImagenJugador = (jugador) => {
    let imagenJugador = document.createElement('IMG');
    imagenJugador.src = `media/jugadores_perfil/${jugador.apodo}.png`;
    imagenJugador.alt = `${jugador.apodo}`;
    imagenJugador.onerror = cargarImagenPorDefecto(imagenJugador);
    let header = document.createElement('HEADER');
    header.classList.add('prueba-img');
    header.appendChild(imagenJugador);
    return header;
}
const cargarImagenPorDefecto = (e) => {
    e.onerror = null;
    e.src = `media/jugadores_perfil/jugador.svg`;
}
const crearCuerpoTarjeta = (jugador) => {
    let cuerpoTarjeta = document.createElement('DIV');
    cuerpoTarjeta.appendChild(crearSeccionNombre(jugador));
    cuerpoTarjeta.appendChild(crearSeccionDatosJugador(jugador));
    cuerpoTarjeta.classList.add('prueba-cuerpo');
    return cuerpoTarjeta
}
const crearSeccionNombre = (jugador) => {
    let nombreJugador = document.createElement('P');
    nombreJugador.textContent = jugador.apodo;
    nombreJugador.classList.add('prueba-nombre');
    return nombreJugador;
}
const crearSeccionDatosJugador = (jugador) => {
    let escudo = document.createElement('IMG');
    let nombreEscudo = (equipos.filter(equipo => equipo.id == jugador.equipo_id))[0].escudo;
    escudo.src = `media/equipos/${nombreEscudo}`;
    escudo.classList.add('prueba-escudo');

    let nCromo = document.createElement('SPAN');
    nCromo.textContent = jugador.numero;
    
    let edicio = document.createElement('SPAN');
    edicio.textContent = numEdicion(jugador.edicion);

    let checkColeccion = document.createElement('INPUT');
    checkColeccion.type = 'checkbox';
    checkColeccion.id = `check${jugador.numero}`;
    checkColeccion.addEventListener('click', marcarDesmarcarJugador);

    let datos = document.createElement('P');
    datos.appendChild(escudo);
    datos.appendChild(nCromo);
    datos.appendChild(edicio);
    datos.appendChild(checkColeccion);
    datos.classList.add('prueba-datos');
    return datos;
}
const numEdicion = (edicion) => {
    let message
    switch (edicion){
        case 1:
            message = 'Primera';
            break;
        case 2:
            message = "Segunda";
            break;
        case 3:
            message = 'Tercerta';
            break;
        case 4:
            message = 'Cuarta';
            break;
    }
    message += '  Edición';
    return message;
}

const marcarDesmarcarJugador = (e) =>{
    let elementoPadre = e.target.parentElement.parentElement.parentElement;
    if (e.target.checked){
        elementoPadre.classList.replace('jugador-prueba-no-encontrado', 'jugador-prueba-encontrado');
    }
    else{
        elementoPadre.classList.replace('jugador-prueba-encontrado', 'jugador-prueba-no-encontrado');
    }
}

const cargaInicial = async () => {
    jugadores = await getAllPlayer();
    jugadores = jugadores.filter(jugador => (jugador.seccion).toLowerCase() == 'serie 10')
    equipos = await getEquipos();
    cargarTarjetasJugadores(jugadores);
    console.log(jugadores);
    return 'Jugadores Cargados';
}

cargaInicial();