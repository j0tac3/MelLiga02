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
    }
}

let equipos = [];
let jugadores = [];

/*********************** Equipos ***********************/

const listaEquipos = document.getElementById('lista_equipos');

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
        if (equipo.id === jugador.equipo_id){
            equipo.jugadores.push(new Jugador(jugador));
        }
    }
}

const crearTarjetaJugador = () => {
    let fragment = document.createDocumentFragment();
    
}

const cargaInicial = async () => {
    cargarEquipos().then(res=>console.log(res));
    cargarJugadores().then(res => cargarEquiposJugadores())
}

cargaInicial();