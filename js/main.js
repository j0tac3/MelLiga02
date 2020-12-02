class Equipo{
    constructor(equipo){
        this.id = equipo.id;
        this.escudo = equipo.escudo;
        this.nombre = equipo.nombre;
        this.estadio = equipo.estadio;
        this.fundacion = equipo.fundacion;
        this.presidente = equipo.presidente;
        this.jugadores = [];
    }
    agregarJugador(jugador){
        this.jugadores.push(jugador);
    }
    agregarJugadores(jugadores){
        jugadores.forEach(jugador => {
            this.jugadores.push(jugador);
        });
    }
}
class Jugador{
    constructor(jugador){
        this.nombre = jugador.nombre;
        this.apellidos = jugador.apellidos;
        this.equipo_id = jugador.equipo_id;
        this.apodo = jugador.apodo;
        this.nacionalidad = jugador.nacionalidad;
        this.posicion = jugador.posicion;
        this.dorsal = jugador.dorsal;
        this.seccion = jugador.seccion;
        this.fecha_nacimiento = jugador.fecha_nacimiento;
    }
}

let equipos = [];
let jugadores = [];

/*********************** Equipos ***********************/

const listaEquipos = document.getElementById('lista_equipos');
const equiposCard = document.getElementById('jugadores-card');

const getEquipos = async () => {
    return new Promise((resolve, reject) => {
        axios({
            method : 'GET',
            url: 'https://immense-mountain-28279.herokuapp.com/api/equipos',
        }).then (res => {
            resolve (res.data);
        }).catch (error => console.error(error));
    })
}
const rellenarMenuEquipos = (equipos) => {
    let fragment = document.createDocumentFragment();
    for (const equipo of equipos){
        let elemento = document.createElement('LI');
        let escudo = document.createElement('IMG');
        escudo.src = `media/equipos/${equipo.escudo}`;
        escudo.alt = equipo.nombre;
        escudo.classList.add('icono-menu-equipo');
        elemento.appendChild(escudo);
        fragment.appendChild(elemento);
    }
    listaEquipos.appendChild(fragment);
}
const cargarEquipos = async () => {
    let equiposData = await getEquipos();
    equiposData.forEach(equipo => {
        equipos.push(new Equipo(equipo));
    });
    rellenarMenuEquipos(equipos);
    listaEquipos.classList.add('lista_equipos');
    return `Todos los equipos han sido agregados.`;
}

/*******************Jugadores **************************/
const getAllJugadores = async () => {
    return new Promise((resolve, reject) => {
        axios({
            method : 'GET',
            url : 'https://immense-mountain-28279.herokuapp.com/api/jugadores'
        }).then(res => {
            resolve(res.data);
        }).catch(error => console.log(error));
    })
}
const cargarJugadores = async () => {
    jugadores = await getAllJugadores();
    return 'Todos los jugadores han sido agregados.';
}
const cargarEquiposJugadores = async () => {
    for (let equipo of equipos) {
        rellenarEquipoJugadores(jugadores, equipo);
    }
}
rellenarEquipoJugadores = (jugadores, equipo) => {
    for (let jugador of jugadores) {
        if (equipo.id === jugador.equipo_id && jugador.seccion == 'Base'){
            equipo.jugadores.push(new Jugador(jugador));
        }
    }
}
const crearTarjetaJugador = () => {
    let fragment = document.createDocumentFragment();

}
const cargaInicial = async () => {
    cargarEquipos().then(res=>console.log(res));
    cargarJugadores().then(res => {
        cargarEquiposJugadores();
        if (window.location.pathname == '/index.html'){
            cargarTarjetasJugadores();
        }
    })
}
const cargarTarjetasJugadores = () => {
    let fragment = document.createDocumentFragment();
    for (let equipo of equipos){
        for (let jugador of equipo.jugadores) {
            let imagenJugador = document.createElement('IMG');
            imagenJugador.src = `media/jugadores_perfil/${jugador.apodo}.png`;
            imagenJugador.alt = `${jugador.nombre}`;
            let header = document.createElement('HEADER');
            header.classList.add('jugador_imagen');
            header.appendChild(imagenJugador);

            let infoNombre = document.createElement('SPAN');
            infoNombre.textContent = jugador.apodo;
            infoNombre.classList.add('info_nombre');
            let infoEdad = document.createElement('SPAN');
            infoEdad.textContent = jugador.fecha_nacimiento;
            infoEdad.classList.add('info_edad');
            let infoPersonal = document.createElement('DIV');
            infoPersonal.classList.add('info_personal');
            infoPersonal.appendChild(infoNombre);
            infoPersonal.appendChild(infoEdad);

            let jugadorEscudo = document.createElement('IMG');
            jugadorEscudo.src = `media/equipos/${equipo.escudo}`;
            jugadorEscudo.alt = `${equipo.nombre}`;
            jugadorEscudo.classList.add('jugador_escudo');
            let infoNumero = document.createElement('SPAN');
            infoNumero.textContent = jugador.numero;
            infoNumero.classList.add('info_numero');
            //infoNumero.classList.add('info_numero');
            let posicion = document.createElement('SPAN');
            posicion.textContent = jugador.posicion;
            let infoPosicion = document.createElement('DIV');
            infoPosicion.classList.add('info_posicion');
            infoPosicion.appendChild(infoNumero);
            infoPosicion.appendChild(posicion);
            let infoEquipo = document.createElement('DIV');
            infoEquipo.classList.add('info_equipo');
            infoEquipo.appendChild(infoPosicion);
            infoEquipo.appendChild(jugadorEscudo);

            let jugadorInfo = document.createElement('DIV');
            jugadorInfo.classList.add('jugador_info');
            jugadorInfo.appendChild(infoPersonal);
            jugadorInfo.appendChild(infoEquipo);

            let jugadorCard = document.createElement('DIV');
            jugadorCard.classList.add('jugador');
            jugadorCard.appendChild(header);
            jugadorCard.appendChild(jugadorInfo);
            fragment.appendChild(jugadorCard);
        }
    }
    equiposCard.appendChild(fragment);
}

cargaInicial();