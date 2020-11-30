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
    listaEquipos.classList.add('lista_equipos');
}

const cargarEquipos = async () => {
    let equiposData = await getEquipos();
    equiposData.forEach(equipo => {
        equipos.push(new Equipo(equipo));
    });
    rellenarMenuEquipos(equipos);
    return `Todos los equipos han sido agregados.`;
}

cargarEquipos();